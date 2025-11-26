# 🔍 SEO Automation - Complete Package

Automated URL submission to **Bing (IndexNow)** and **Google Search Console** for StreamVault.

---

## 📦 What's Included

### Scripts Created

1. **`scripts/submit-to-indexnow.ts`**
   - Submit URLs to Bing, Yandex, Seznam, Naver
   - Auto-generate API key
   - Batch submission (up to 10,000 URLs)
   - No rate limits

2. **`scripts/submit-to-google.ts`**
   - Submit URLs to Google Search Console
   - Uses Google Indexing API
   - Rate limiting built-in
   - Supports deletion notifications

3. **`scripts/auto-submit-urls.ts`**
   - Unified submission to both platforms
   - Submit shows, movies, or all content
   - Automatic URL generation
   - Easy integration with admin panel

### Documentation

1. **`SEO_AUTOMATION_SETUP.md`** - Complete setup guide
2. **`QUICK_SEO_GUIDE.md`** - 5-minute quick start
3. **This file** - Overview and summary

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

Installs `googleapis` package for Google Search Console API.

### 2. Setup IndexNow (2 minutes)

```bash
npm run submit-indexnow
```

- Generates API key
- Creates verification file
- Submits all URLs

**Upload verification file:**
- File location: `dist/public/{key}.txt`
- Upload to: `https://yourdomain.com/{key}.txt`

### 3. Setup Google (3 minutes)

1. Create service account at [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "Web Search Indexing API"
3. Download JSON key → Save as `google-service-account.json`
4. Add service account email to [Search Console](https://search.google.com/search-console) as Owner

```bash
npm run submit-google
```

---

## 📋 Available Commands

```bash
# Submit all content to both search engines
npm run submit-urls all

# Submit specific show (with all episodes)
npm run submit-urls show stranger-things

# Submit specific movie
npm run submit-urls movie inception

# Submit single URL
npm run submit-urls url https://yourdomain.com/page

# IndexNow only (Bing, Yandex, etc.)
npm run submit-indexnow

# Google Search Console only
npm run submit-google
```

---

## 🔧 Configuration

### Environment Variables

Add to `.env`:

```env
# Your website URL
SITE_URL=https://streamvault.com

# Google Service Account (optional, defaults to ./google-service-account.json)
GOOGLE_SERVICE_ACCOUNT_PATH=./google-service-account.json
```

### Update Site URL

Edit these files to use your domain:

```typescript
// scripts/submit-to-indexnow.ts
const SITE_URL = 'https://yourdomain.com';

// scripts/submit-to-google.ts
const SITE_URL = 'https://yourdomain.com';
```

---

## 🤖 Automation Examples

### Integrate with Admin Panel

```typescript
import { submitShow, submitMovie, submitUrl } from './scripts/auto-submit-urls';

// When adding new show
async function addShow(showData) {
  const show = await storage.addShow(showData);
  
  // Automatically submit to search engines
  await submitShow(show.slug);
  
  return show;
}

// When adding new movie
async function addMovie(movieData) {
  const movie = await storage.addMovie(movieData);
  await submitMovie(movie.slug);
  return movie;
}

// When updating content
async function updateShow(showId, updates) {
  const show = await storage.updateShow(showId, updates);
  await submitUrl(`https://yourdomain.com/show/${show.slug}`);
  return show;
}
```

### Scheduled Daily Submissions

```typescript
import cron from 'node-cron';
import { submitAllContent } from './scripts/auto-submit-urls';

// Run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running scheduled URL submission...');
  await submitAllContent();
});
```

---

## 📊 Features & Limits

### IndexNow (Bing, Yandex, Seznam, Naver)

| Feature | Details |
|---------|---------|
| **Cost** | 100% Free |
| **Rate Limit** | Unlimited |
| **Batch Size** | Up to 10,000 URLs per request |
| **Speed** | Instant submission |
| **Authentication** | API key only (auto-generated) |
| **Setup Time** | 2 minutes |

### Google Search Console

| Feature | Details |
|---------|---------|
| **Cost** | Free (200/day limit) |
| **Rate Limit** | 200 requests/day, 600/minute |
| **Batch Size** | 1 URL per request |
| **Speed** | Immediate API response |
| **Authentication** | Service Account (OAuth2) |
| **Setup Time** | 3-5 minutes |
| **Deletion Support** | ✅ Yes |

---

## 🎯 What Gets Submitted

The scripts automatically generate and submit URLs for:

### Static Pages
- Homepage (`/`)
- Shows page (`/shows`)
- Movies page (`/movies`)
- Browse pages (`/browse-shows`, `/browse-movies`)
- Search page (`/search`)
- Watchlist (`/watchlist`)
- About, Contact, Help, FAQ
- Privacy, Terms, DMCA

### Dynamic Content
- All show detail pages (`/show/{slug}`)
- All episode watch pages (`/watch/{slug}?season=X&episode=Y`)
- All movie detail pages (`/movie/{slug}`)
- All movie watch pages (`/watch-movie/{slug}`)

### Example Output

```
📋 Found 1,247 URLs to submit

Static pages: 13
Shows: 10
Episodes: 1,200
Movies: 24

✅ All URLs submitted successfully!
```

---

## 🔐 Security

### Files to Keep Private

These files contain sensitive credentials and should **never** be committed to Git:

- ✅ `google-service-account.json` - Google API credentials
- ✅ `indexnow-key.txt` - IndexNow API key
- ✅ Already added to `.gitignore`

### Public Files

These files should be publicly accessible on your website:

- ✅ `{key}.txt` - IndexNow verification file (upload to website root)

---

## 📈 Monitoring & Verification

### Check Indexing Status

**Bing:**
1. [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. URL Inspection → Enter URL
3. View indexing status

**Google:**
1. [Google Search Console](https://search.google.com/search-console)
2. URL Inspection → Enter URL
3. Coverage Report → View all indexed pages

### Expected Timeline

- **IndexNow**: Crawled within 1-7 days
- **Google**: Crawled within 1-14 days
- **Indexing**: May take additional 1-30 days

---

## 🐛 Common Issues & Solutions

### IndexNow: "Key file not found"

**Problem:** Search engine can't verify your key file

**Solution:**
1. Upload `{key}.txt` to website root
2. Verify accessible: `https://yourdomain.com/{key}.txt`
3. File should contain only the 32-character key

### Google: "Permission denied (403)"

**Problem:** Service account not authorized

**Solution:**
1. Copy service account email from JSON file
2. Add to Search Console as **Owner** (not Editor)
3. Wait 2-5 minutes for permissions to propagate

### Google: "Rate limit exceeded (429)"

**Problem:** Hit 200 requests/day limit

**Solution:**
1. Wait 24 hours for limit reset
2. Reduce submission frequency
3. Consider upgrading to paid tier (if available)

### "Module not found: googleapis"

**Problem:** Missing dependency

**Solution:**
```bash
npm install googleapis
```

---

## 📚 Additional Resources

### Official Documentation

- [IndexNow Protocol](https://www.indexnow.org/documentation)
- [Google Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Bing Webmaster Tools](https://www.bing.com/webmasters/help/help-center-661b2d18)
- [Google Search Console Help](https://support.google.com/webmasters)

### Webmaster Tools

- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Google Search Console](https://search.google.com/search-console)
- [Yandex Webmaster](https://webmaster.yandex.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## ✅ Setup Checklist

- [ ] Install dependencies: `npm install`
- [ ] Run IndexNow script: `npm run submit-indexnow`
- [ ] Upload `{key}.txt` to website root
- [ ] Verify key file accessible online
- [ ] Create Google Cloud project
- [ ] Enable Web Search Indexing API
- [ ] Create service account
- [ ] Download JSON key → Save as `google-service-account.json`
- [ ] Add service account to Search Console as Owner
- [ ] Test Google submission: `npm run submit-google`
- [ ] Submit all content: `npm run submit-urls all`
- [ ] Verify in Bing Webmaster Tools
- [ ] Verify in Google Search Console
- [ ] (Optional) Add automation to admin panel
- [ ] (Optional) Set up scheduled submissions

---

## 🎉 Success!

Once setup is complete, your StreamVault URLs will be automatically submitted to search engines, improving:

- ✅ **Indexing Speed** - Get indexed faster
- ✅ **SEO Performance** - Better search rankings
- ✅ **Discoverability** - More organic traffic
- ✅ **Freshness** - Search engines know about updates immediately

---

## 💡 Pro Tips

1. **Submit immediately** when adding new content
2. **Use batch submissions** for efficiency
3. **Monitor webmaster tools** regularly
4. **Keep sitemaps updated** alongside URL submission
5. **Don't spam** - Only submit quality content
6. **Track results** - Monitor indexing status
7. **Automate** - Integrate with your admin panel

---

## 📞 Support

For issues or questions:

1. Check [SEO_AUTOMATION_SETUP.md](./SEO_AUTOMATION_SETUP.md) for detailed guide
2. Review [QUICK_SEO_GUIDE.md](./QUICK_SEO_GUIDE.md) for quick reference
3. Check official documentation links above
4. Review error messages in console output

---

**Ready to boost your SEO? Start with: `npm run submit-urls all`** 🚀
