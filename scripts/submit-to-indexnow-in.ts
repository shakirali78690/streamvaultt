/**
 * IndexNow API - Automated URL Submission (streamvault.in)
 */

import { readFileSync } from "fs";
import { join } from "path";

// Configuration
const SITE_URL = "https://streamvault.in"; // host where txt is live
const FIXED_API_KEY = "d3f0e531922e4e1785c3e8617e27eee6";

const API_KEY_FILE = join(process.cwd(), "indexnow-key-in.txt");

// Official shared IndexNow endpoint
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function getOrCreateApiKey(): string {
  try {
    const existing = readFileSync(API_KEY_FILE, "utf-8").trim();
    if (existing === FIXED_API_KEY) {
      console.log("✅ Using existing IndexNow API key (.in)");
      return existing;
    }
  } catch {
    // ignore missing file
  }

  console.log("✅ Using fixed IndexNow API key (.in):", FIXED_API_KEY);
  return FIXED_API_KEY;
}

async function submitBatchToIndexNow(
  urls: string[],
  apiKey: string,
): Promise<boolean> {
  if (urls.length === 0) {
    console.log("⚠️ No URLs to submit");
    return true;
  }

  const payload = {
    host: new URL(SITE_URL).hostname, // streamvault.in
    key: apiKey,
    keyLocation: `${SITE_URL}/${apiKey}.txt`,
    urlList: urls, // all must be https://streamvault.in/...
  };

  console.log(
    `📦 Submitting ${urls.length} URLs to IndexNow for ${payload.host}...`,
  );

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("🔎 Status:", response.status, response.statusText);
    console.log("🔎 Response body:", text);

    if (response.status === 200 || response.status === 202) {
      console.log("✅ URLs submitted successfully to IndexNow");
      return true;
    } else {
      console.error("❌ IndexNow submission failed");
      return false;
    }
  } catch (error) {
    console.error("❌ Error submitting to IndexNow:", error);
    return false;
  }
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

  console.log("📺 Fetching shows from database...");
  const shows = await storage.getAllShows();
  console.log(` Found ${shows.length} shows`);

  for (const show of shows) {
    urls.push(`${SITE_URL}/show/${show.slug}`);

    const episodes = await storage.getEpisodesByShowId(show.id);
    episodes.forEach((episode: any) => {
      urls.push(
        `${SITE_URL}/watch/${show.slug}?season=${episode.season}&episode=${episode.episodeNumber}`,
      );
    });
  }

  console.log("🎬 Fetching movies from database...");
  const movies = await storage.getAllMovies();
  console.log(` Found ${movies.length} movies`);

  movies.forEach((movie: any) => {
    urls.push(`${SITE_URL}/movie/${movie.slug}`);
    urls.push(`${SITE_URL}/watch-movie/${movie.slug}`);
  });

  return urls;
}

async function main() {
  console.log("🚀 IndexNow URL Submission Tool for streamvault.in\n");

  const apiKey = getOrCreateApiKey();

  const allUrls = await generateAllUrls();
  console.log(`📋 Total URLs available: ${allUrls.length}`);

  // FIRST: test with a very small batch
  const testUrls = allUrls.slice(0, 3);
  console.log("\n🧪 Testing IndexNow with first 3 URLs:");
  console.log(testUrls.join("\n"));

  const testOk = await submitBatchToIndexNow(testUrls, apiKey);
  if (!testOk) {
    console.log(
      "\n⚠️ Test batch failed. Check the status/response above before sending all URLs.",
    );
    return;
  }

  // If test passed, you can now safely send the full list.
  console.log("\n✅ Test batch succeeded. Submitting all URLs...\n");
  await submitBatchToIndexNow(allUrls, apiKey);
}

export { getOrCreateApiKey, submitBatchToIndexNow };

main().catch(console.error);
