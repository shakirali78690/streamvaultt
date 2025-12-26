/**
 * Google Search Console API - Automated URL Submission (streamvault.in + www)
 * Supports both bare domain and www subdomain
 */

import { google } from "googleapis";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Configuration for both domains
const SITES = {
  bare: {
    url: "https://streamvault.in",
    trackingFile: "google-submitted-urls-in.json",
  },
  www: {
    url: "https://www.streamvault.in",
    trackingFile: "google-submitted-urls-www.json",
  },
};

const SERVICE_ACCOUNT_KEY_FILE = join(process.cwd(), "google-service-account.json");

// Scopes required for the Indexing API
const SCOPES = ["https://www.googleapis.com/auth/indexing"];

function getTrackingFilePath(domain: keyof typeof SITES): string {
  return join(process.cwd(), "scripts", SITES[domain].trackingFile);
}

function loadSubmittedUrls(domain: keyof typeof SITES): {
  submittedUrls: string[];
  lastSubmission: string | null;
  totalSubmitted: number;
} {
  try {
    const filePath = getTrackingFilePath(domain);
    if (existsSync(filePath)) {
      const data = readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    console.log(`⚠️ Could not load submitted URLs tracking file (${domain}), starting fresh`);
  }
  return { submittedUrls: [], lastSubmission: null, totalSubmitted: 0 };
}

function saveSubmittedUrls(
  domain: keyof typeof SITES,
  data: {
    submittedUrls: string[];
    lastSubmission: string | null;
    totalSubmitted: number;
  }
) {
  try {
    const filePath = getTrackingFilePath(domain);
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`⚠️ Could not save submitted URLs tracking file (${domain}):`, error);
  }
}

function getAuthClient() {
  try {
    const keyFile = readFileSync(SERVICE_ACCOUNT_KEY_FILE, "utf-8");
    const keys = JSON.parse(keyFile);
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: SCOPES,
    });
    return auth;
  } catch (error) {
    console.error("❌ Error loading service account key file for Google");
    throw error;
  }
}

async function submitUrlToGoogle(
  domain: keyof typeof SITES,
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<boolean> {
  try {
    const auth = getAuthClient();
    const indexing = google.indexing({ version: "v3", auth });
    const response = await indexing.urlNotifications.publish({
      requestBody: { url, type },
    });

    if (response.status === 200) {
      console.log(`✅ Successfully submitted to Google (${domain}): ${url}`);
      return true;
    } else {
      console.error(
        `❌ Failed to submit (${domain}) ${url}: ${response.status} ${response.statusText}`
      );
      return false;
    }
  } catch (error: any) {
    console.error(`❌ Error submitting (${domain}) ${url}:`, error.message);
    return false;
  }
}

async function submitBatchToGoogle(
  domain: keyof typeof SITES,
  urls: string[],
  delayMs: number = 1000
): Promise<{ success: number; failed: number }> {
  console.log(`📦 Submitting ${urls.length} URLs to Google (${domain})...`);
  let successCount = 0;
  let failedCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${domain.toUpperCase()} ${i + 1}/${urls.length}] Submitting: ${url}`);
    const success = await submitUrlToGoogle(domain, url);
    if (success) successCount++;
    else failedCount++;

    if (i < urls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.log(`📊 Summary (${domain}): ✅ ${successCount} ❌ ${failedCount}`);
  return { success: successCount, failed: failedCount };
}

async function generateUrlsForDomain(domain: keyof typeof SITES): Promise<string[]> {
  const siteUrl = SITES[domain].url;
  const urls: string[] = [];
  const { storage } = await import("../server/storage.js");

  const staticPages = [
    "",
    "/shows",
    "/movies",
    "/browse-shows",
    "/browse-movies",
    "/search",
    "/watchlist",
    "/about",
    "/contact",
    "/help",
    "/faq",
    "/privacy",
    "/terms",
    "/dmca",
  ];

  // Add static pages
  staticPages.forEach((page) => {
    urls.push(`${siteUrl}${page}`);
  });

  // Add show pages
  console.log(`📺 Fetching shows from database (${domain})...`);
  const shows = await storage.getAllShows();
  for (const show of shows) {
    urls.push(`${siteUrl}/show/${show.slug}`);
    const episodes = await storage.getEpisodesByShowId(show.id);
    episodes.forEach((episode: any) => {
      urls.push(
        `${siteUrl}/watch/${show.slug}?season=${episode.season}&episode=${episode.episodeNumber}`
      );
    });
  }

  // Add movie pages
  console.log(`🎬 Fetching movies from database (${domain})...`);
  const movies = await storage.getAllMovies();
  movies.forEach((movie: any) => {
    urls.push(`${siteUrl}/movie/${movie.slug}`);
    urls.push(`${siteUrl}/watch-movie/${movie.slug}`);
  });

  return urls;
}

async function submitForDomain(domain: keyof typeof SITES) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🌐 Processing domain: ${SITES[domain].url}`);
  console.log(`${"=".repeat(60)}\n`);

  try {
    const tracking = loadSubmittedUrls(domain);
    console.log(`📊 Previously submitted (${domain}): ${tracking.totalSubmitted} URLs\n`);

    const allUrls = await generateUrlsForDomain(domain);
    console.log(`📋 Total URLs found (${domain}): ${allUrls.length}`);

    const pendingUrls = allUrls.filter((url) => !tracking.submittedUrls.includes(url));

    if (pendingUrls.length === 0) {
      console.log(`🎉 All ${domain} URLs already submitted!\n`);
      return;
    }

    const urlsToSubmit = pendingUrls.slice(0, 200);
    console.log(`📤 Submitting next ${urlsToSubmit.length} URLs (${domain})\n`);

    const result = await submitBatchToGoogle(domain, urlsToSubmit, 1000);

    const successfulUrls = urlsToSubmit.slice(0, result.success);
    tracking.submittedUrls.push(...successfulUrls);
    tracking.totalSubmitted += result.success;
    tracking.lastSubmission = new Date().toISOString();
    saveSubmittedUrls(domain, tracking);
  } catch (error) {
    console.error(`❌ Error (${domain}):`, error);
  }
}

async function main() {
  console.log("🚀 Google URL Submission Tool for StreamVault\n");
  console.log("📍 Domains: www.streamvault.in + streamvault.in\n");

  try {
    // Submit URLs for both domains sequentially - WWW FIRST
    await submitForDomain("www");
    await submitForDomain("bare");

    console.log("\n" + "=".repeat(60));
    console.log("✨ Submission complete for all domains!");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
}

export { submitUrlToGoogle, submitBatchToGoogle, submitForDomain };

main().catch(console.error);

