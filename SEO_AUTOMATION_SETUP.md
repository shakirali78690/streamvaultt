# 🔍 SEO Automation Setup Guide

Automate URL submission to Bing (IndexNow) and Google Search Console for better SEO and faster indexing.

---

## 📋 Table of Contents

1. [IndexNow Setup (Bing, Yandex, etc.)](#indexnow-setup)
2. [Google Search Console Setup](#google-search-console-setup)
3. [Usage Examples](#usage-examples)
4. [Automation](#automation)
5. [Troubleshooting](#troubleshooting)

---

## 🔷 IndexNow Setup (Bing, Yandex, etc.)

IndexNow is a protocol supported by multiple search engines. Submit once, and it's shared across all participating search engines.

### Step 1: Generate API Key

Run the script once to generate an API key:

```bash
npm run submit-indexnow
```

This will:
- Generate a 32-character hexadecimal key
- Save it to `indexnow-key.txt`
- Create a verification file in `dist/public/`

### Step 2: Upload Verification File

The script creates a file named `{your-key}.txt` in `dist/public/`. 

**You need to upload this file to your website root:**

```
https://yourdomain.com/{your-key}.txt
```

The file should contain only the API key (32 characters).

### Step 3: Verify Setup

Visit your key file URL to ensure it's accessible:
```
https://yourdomain.com/{your-key}.txt
```

### Step 4: Submit URLs

```bash
# Submit all URLs
npm run submit-indexnow

# Or use the auto-submit script
npm run submit-urls all
```

### Supported Search Engines

- ✅ **Microsoft Bing**
- ✅ **Yandex**
- ✅ **Seznam.cz**
- ✅ **Naver**

### Rate Limits

- **No rate limits** for IndexNow
- Can submit up to **10,000 URLs per request**
- Instant submission

---

## 🔷 Google Search Console Setup

Google requires OAuth2 authentication via a Service Account.

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Note your project ID

### Step 2: Enable Indexing API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "**Web Search Indexing API**"
3. Click **Enable**

### Step 3: Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in details:
   - **Name**: StreamVault Indexing
   - **Description**: Service account for URL submission
4. Click **Create and Continue**
5. Skip optional steps, click **Done**

### Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Choose **JSON** format
5. Click **Create**
6. Save the downloaded JSON file as `google-service-account.json` in your project root

### Step 5: Add Service Account to Search Console

1. Copy the service account email from the JSON file (looks like: `name@project-id.iam.gserviceaccount.com`)
2. Go to [Google Search Console](https://search.google.com/search-console)
3. Select your property
4. Go to **Settings** > **Users and permissions**
5. Click **Add User**
6. Paste the service account email
7. Set permission to **Owner**
8. Click **Add**

### Step 6: Test Submission

```bash
npm run submit-google
```

### Rate Limits

- **200 requests per day** (free tier)
- **600 requests per minute**
- Use delays between requests (script includes 1-2 second delays)

---

## 🚀 Usage Examples

### Submit All Content

```bash
npm run submit-urls all
```

Submits:
- All static pages
- All shows and their episodes
- All movies
- To both Bing (IndexNow) and Google

### Submit Specific Show

```bash
npm run submit-urls show stranger-things
```

Submits:
- Show detail page
- All episode watch pages

### Submit Specific Movie

```bash
npm run submit-urls movie shawshank-redemption
```

Submits:
- Movie detail page
- Movie watch page

### Submit Single URL

```bash
npm run submit-urls url https://streamvault.com/shows
```

### Delete URL (Google only)

```typescript
import { deleteUrl } from './scripts/auto-submit-urls';

await deleteUrl('https://streamvault.com/show/removed-show');
```

---

## 🤖 Automation

### Automatic Submission on Content Changes

Integrate URL submission into your admin panel or API routes:

#### When Adding New Show

```typescript
// In your admin panel or API route
import { submitShow } from './scripts/auto-submit-urls';

// After adding show to database
await storage.addShow(newShow);

// Automatically submit to search engines
await submitShow(newShow.slug);
```

#### When Adding New Movie

```typescript
import { submitMovie } from './scripts/auto-submit-urls';

await storage.addMovie(newMovie);
await submitMovie(newMovie.slug);
```

#### When Updating Content

```typescript
import { submitUrl } from './scripts/auto-submit-urls';

await storage.updateShow(showId, updates);

// Notify search engines of update
await submitUrl(`https://streamvault.com/show/${show.slug}`);
```

#### When Deleting Content

```typescript
import { deleteUrl } from './scripts/auto-submit-urls';

const showUrl = `https://streamvault.com/show/${show.slug}`;
await storage.deleteShow(showId);

// Notify Google about deletion
await deleteUrl(showUrl);
```

### Scheduled Submissions (Cron Job)

Create a cron job to submit all URLs daily:

```bash
# Add to crontab (Linux/Mac)
0 2 * * * cd /path/to/streamvault && npm run submit-urls all

# Or use node-cron in your server
import cron from 'node-cron';
import { submitAllContent } from './scripts/auto-submit-urls';

// Run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running scheduled URL submission...');
  await submitAllContent();
});
```

---

## 🔧 Configuration

### Environment Variables

Add to your `.env` file:

```env
# Your website URL
SITE_URL=https://streamvault.com

# Google Service Account (path to JSON file)
GOOGLE_SERVICE_ACCOUNT_PATH=./google-service-account.json

# IndexNow API Key (auto-generated)
INDEXNOW_API_KEY=your-32-char-hex-key
```

### Update Site URL

Edit the scripts to use your domain:

```typescript
// In submit-to-indexnow.ts and submit-to-google.ts
const SITE_URL = 'https://yourdomain.com';
```

---

## 📊 Monitoring & Verification

### Check IndexNow Submissions

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site if not already added
3. Check **URL Inspection** tool
4. View **Index Status** reports

### Check Google Submissions

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Go to **URL Inspection** tool
4. Enter a submitted URL to check status
5. View **Coverage** report for overall indexing status

### Check Submission Logs

The scripts output detailed logs:

```
✅ Successfully submitted: https://streamvault.com/shows
✅ Batch 1/1 submitted successfully (50 URLs)
📊 Summary: 50/50 URLs submitted successfully
```

---

## 🐛 Troubleshooting

### IndexNow Issues

#### "Key file not found"
- Ensure `{key}.txt` file is uploaded to your website root
- Verify it's accessible at `https://yourdomain.com/{key}.txt`
- File should contain only the 32-character key

#### "Invalid key"
- Regenerate key by deleting `indexnow-key.txt` and running script again
- Ensure key is exactly 32 hexadecimal characters

### Google Issues

#### "Permission denied (403)"
- Verify service account email is added to Search Console as **Owner**
- Check that the correct property is selected
- Wait a few minutes after adding the service account

#### "Rate limit exceeded (429)"
- You've hit the 200 requests/day limit
- Wait 24 hours or upgrade to paid tier
- Reduce submission frequency

#### "Service account key not found"
- Ensure `google-service-account.json` exists in project root
- Check file path in the script
- Verify JSON file is valid

#### "API not enabled"
- Enable "Web Search Indexing API" in Google Cloud Console
- Go to APIs & Services > Library
- Search for "Web Search Indexing API" and enable it

### General Issues

#### "URLs not getting indexed"
- Indexing takes time (days to weeks)
- Ensure your site has proper sitemap.xml
- Check robots.txt isn't blocking search engines
- Verify pages are publicly accessible
- Check for crawl errors in webmaster tools

#### "Script fails silently"
- Check console for error messages
- Verify all dependencies are installed: `npm install`
- Ensure TypeScript is compiled: `npm run check`
- Check network connectivity

---

## 📈 Best Practices

### 1. Submit New Content Immediately
- Submit URLs as soon as content is published
- Don't wait for search engines to discover it

### 2. Batch Submissions
- Submit multiple URLs at once when possible
- Use batch APIs to reduce API calls

### 3. Rate Limiting
- Respect rate limits (especially Google's 200/day)
- Add delays between requests
- Consider upgrading to paid tier for high-volume sites

### 4. Monitor Results
- Check webmaster tools regularly
- Track indexing status
- Fix any crawl errors promptly

### 5. Update Sitemaps
- Keep sitemap.xml updated
- Submit sitemap to search engines
- Use dynamic sitemaps for large sites

### 6. Quality Over Quantity
- Only submit quality, unique content
- Don't submit duplicate or thin content
- Ensure pages are fully functional

---

## 🔗 Useful Links

- [IndexNow Documentation](https://www.indexnow.org/documentation)
- [Google Indexing API Docs](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Google Search Console](https://search.google.com/search-console)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## 📝 Summary

1. **IndexNow** (Bing, Yandex, etc.)
   - ✅ Free, unlimited submissions
   - ✅ No authentication required (just API key)
   - ✅ Instant submission
   - ✅ Up to 10,000 URLs per request

2. **Google Search Console**
   - ✅ Official Google API
   - ⚠️ 200 requests/day limit (free tier)
   - ⚠️ Requires service account setup
   - ✅ Supports deletion notifications

3. **Automation**
   - ✅ Submit on content creation/update
   - ✅ Scheduled daily submissions
   - ✅ Integrated with admin panel
   - ✅ Batch processing support

---

**Ready to boost your SEO? Run `npm run submit-urls all` to get started!** 🚀
