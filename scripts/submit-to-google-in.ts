/**
 * Google Search Console API - Automated URL Submission (streamvault.in)
 */

import { google } from "googleapis";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Configuration
const SITE_URL = "https://streamvault.in"; // .in domain
const SERVICE_ACCOUNT_KEY_FILE = join(process.cwd(), "google-service-account.json");

// separate tracking file so it doesn't overwrite .live
const SUBMITTED_URLS_FILE = join(process.cwd(), "scripts", "google-submitted-urls-in.json");

// Scopes required for the Indexing API
const SCOPES = ["https://www.googleapis.com/auth/indexing"];

function loadSubmittedUrls(): {
  submittedUrls: string[];
  lastSubmission: string | null;
  totalSubmitted: number;
} {
  try {
    if (existsSync(SUBMITTED_URLS_FILE)) {
      const data = readFileSync(SUBMITTED_URLS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    console.log("⚠️ Could not load submitted URLs tracking file (IN), starting fresh");
  }
  return { submittedUrls: [], lastSubmission: null, totalSubmitted: 0 };
}

function saveSubmittedUrls(data: {
  submittedUrls: string[];
  lastSubmission: string | null;
  totalSubmitted: number;
}) {
  try {
    writeFileSync(SUBMITTED_URLS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("⚠️ Could not save submitted URLs tracking file (IN):", error);
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
    console.error("❌ Error loading service account key file for Google (.in)");
    throw error;
  }
}

async function submitUrlToGoogle(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED",
): Promise<boolean> {
  try {
    const auth = getAuthClient();
    const indexing = google.indexing({ version: "v3", auth });
    const response = await indexing.urlNotifications.publish({
      requestBody: { url, type },
    });

    if (response.status === 200) {
      console.log(`✅ Successfully submitted to Google (.in): ${url}`);
      return true;
    } else {
      console.error(
        `❌ Failed to submit (.in) ${url}: ${response.status} ${response.statusText}`,
      );
      return false;
    }
  } catch (error: any) {
    console.error(`❌ Error submitting (.in) ${url}:`, error.message);
    return false;
  }
}

async function submitBatchToGoogle(
  urls: string[],
  delayMs: number = 1000,
): Promise<{ success: number; failed: number }> {
  console.log(`📦 Submitting ${urls.length} URLs to Google (.in)...`);
  let successCount = 0;
  let failedCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[IN ${i + 1}/${urls.length}] Submitting: ${url}`);
    const success = await submitUrlToGoogle(url);
    if (success) successCount++;
    else failedCount++;

    if (i < urls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.log(`📊 Summary (.in): ✅ ${successCount} ❌ ${failedCount}`);
  return { success: successCount, failed: failedCount };
}

async function generateAllUrls(): Promise<string[]> {
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

  staticPages.forEach((page) => {
    urls.push(`${SITE_URL}${page}`);
  });

  console.log("📺 Fetching shows from database (.in)...");
  const shows = await storage.getAllShows();
  for (const show of shows) {
    urls.push(`${SITE_URL}/show/${show.slug}`);
    const episodes = await storage.getEpisodesByShowId(show.id);
    episodes.forEach((episode: any) => {
      urls.push(
        `${SITE_URL}/watch/${show.slug}?season=${episode.season}&episode=${episode.episodeNumber}`,
      );
    });
  }

  console.log("🎬 Fetching movies from database (.in)...");
  const movies = await storage.getAllMovies();
  movies.forEach((movie: any) => {
    urls.push(`${SITE_URL}/movie/${movie.slug}`);
    urls.push(`${SITE_URL}/watch-movie/${movie.slug}`);
  });

  return urls;
}

async function main() {
  console.log("🚀 Google URL Submission Tool for streamvault.in\n");
  try {
    const tracking = loadSubmittedUrls();
    console.log(`📊 Previously submitted (.in): ${tracking.totalSubmitted} URLs\n`);

    const allUrls = await generateAllUrls();
    console.log(`📋 Total URLs found (.in): ${allUrls.length}`);

    const pendingUrls = allUrls.filter((url) => !tracking.submittedUrls.includes(url));
    if (pendingUrls.length === 0) {
      console.log("🎉 All .in URLs already submitted!");
      return;
    }

    const urlsToSubmit = pendingUrls.slice(0, 200);
    console.log(`📤 Submitting next ${urlsToSubmit.length} URLs (.in)\n`);

    const result = await submitBatchToGoogle(urlsToSubmit, 1000);

    const successfulUrls = urlsToSubmit.slice(0, result.success);
    tracking.submittedUrls.push(...successfulUrls);
    tracking.totalSubmitted += result.success;
    tracking.lastSubmission = new Date().toISOString();
    saveSubmittedUrls(tracking);
  } catch (error) {
    console.error("❌ Error (.in):", error);
    process.exit(1);
  }
}

export { submitUrlToGoogle, submitBatchToGoogle };

main().catch(console.error);
