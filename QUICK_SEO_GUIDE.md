# 🚀 Quick SEO Automation Guide

Get your StreamVault URLs indexed by Bing and Google automatically!

---

## ⚡ Quick Start (5 Minutes)

### 1️⃣ Install Dependencies

```bash
npm install
```

This installs `googleapis` for Google Search Console API.

---

### 2️⃣ Setup IndexNow (Bing) - 2 Minutes

```bash
# Generate API key and submit URLs
npm run submit-indexnow
```

**What happens:**
- ✅ Generates a unique API key
- ✅ Creates verification file
- ✅ Submits all your URLs to Bing, Yandex, etc.

**Upload the verification file:**
1. Find the file: `dist/public/{your-key}.txt`
2. Upload to your website root: `https://yourdomain.com/{your-key}.txt`
3. Done! ✅

---

### 3️⃣ Setup Google Search Console - 3 Minutes

#### A. Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable "Web Search Indexing API"
3. Create Service Account → Download JSON key
4. Save as `google-service-account.json` in project root

#### B. Add to Search Console

1. Copy service account email from JSON file
2. Go to [Search Console](https://search.google.com/search-console)
3. Settings → Users → Add User (as Owner)
4. Paste the service account email

#### C. Submit URLs

```bash
npm run submit-google
```

Done! ✅

---

## 📋 Common Commands

```bash
# Submit all content to both Bing and Google
npm run submit-urls all

# Submit specific show
npm run submit-urls show stranger-things

# Submit specific movie
npm run submit-urls movie inception

# Submit single URL
npm run submit-urls url https://yourdomain.com/shows

# IndexNow only (Bing, Yandex)
npm run submit-indexnow

# Google only
npm run submit-google
```

---

## 🤖 Automate on Content Changes

Add to your admin panel or API routes:

```typescript
import { submitShow, submitMovie, submitUrl } from './scripts/auto-submit-urls';

// When adding new show
await submitShow(newShow.slug);

// When adding new movie
await submitMovie(newMovie.slug);

// When updating any page
await submitUrl('https://yourdomain.com/page');
```

---

## 📊 Limits & Best Practices

### IndexNow (Bing)
- ✅ **Unlimited** submissions
- ✅ **10,000 URLs** per request
- ✅ **Instant** submission
- ✅ **No authentication** needed (just API key)

### Google Search Console
- ⚠️ **200 URLs/day** (free tier)
- ✅ **600 URLs/minute**
- ⚠️ Requires service account setup
- 💡 Script includes 1-2 second delays

### Tips
1. Submit new content immediately
2. Use batch submissions for efficiency
3. Monitor in webmaster tools
4. Keep sitemaps updated

---

## 🔍 Verify Submissions

### Bing
1. [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. URL Inspection → Check indexing status

### Google
1. [Google Search Console](https://search.google.com/search-console)
2. URL Inspection → Enter URL
3. Coverage Report → View all indexed pages

---

## 🐛 Troubleshooting

### IndexNow: "Key file not found"
- Upload `{key}.txt` to website root
- Verify accessible at `https://yourdomain.com/{key}.txt`

### Google: "Permission denied"
- Add service account email to Search Console as **Owner**
- Wait a few minutes after adding

### Google: "Rate limit exceeded"
- You've hit 200/day limit
- Wait 24 hours or reduce frequency

---

## 📚 Full Documentation

See [SEO_AUTOMATION_SETUP.md](./SEO_AUTOMATION_SETUP.md) for complete guide.

---

## ✅ Checklist

- [ ] Install dependencies: `npm install`
- [ ] Generate IndexNow key: `npm run submit-indexnow`
- [ ] Upload verification file to website root
- [ ] Create Google service account
- [ ] Download JSON key as `google-service-account.json`
- [ ] Add service account to Search Console
- [ ] Test Google submission: `npm run submit-google`
- [ ] Submit all content: `npm run submit-urls all`
- [ ] Verify in Bing Webmaster Tools
- [ ] Verify in Google Search Console
- [ ] Set up automation in admin panel (optional)
- [ ] Schedule daily submissions (optional)

---

**That's it! Your URLs are now being submitted automatically to search engines.** 🎉

**Questions?** Check the full guide: [SEO_AUTOMATION_SETUP.md](./SEO_AUTOMATION_SETUP.md)
