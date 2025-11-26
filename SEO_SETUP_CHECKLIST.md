# ✅ SEO Automation Setup Checklist

Use this checklist to set up automated URL submission to Bing and Google.

---

## 📋 Pre-Setup

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Copy environment variables**
  ```bash
  cp .env.example .env
  ```

- [ ] **Update SITE_URL in `.env`**
  ```env
  SITE_URL=https://yourdomain.com
  ```

---

## 🔷 IndexNow Setup (Bing, Yandex, etc.)

### Step 1: Generate API Key

- [ ] **Run the IndexNow script**
  ```bash
  npm run submit-indexnow
  ```

- [ ] **Note the generated key** (32 characters)
  - Location: `indexnow-key.txt`
  - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### Step 2: Upload Verification File

- [ ] **Find the verification file**
  - Location: `dist/public/{your-key}.txt`
  - Contains: Your 32-character API key

- [ ] **Upload to website root**
  - Upload to: `https://yourdomain.com/{your-key}.txt`
  - Must be publicly accessible

- [ ] **Verify file is accessible**
  - Visit: `https://yourdomain.com/{your-key}.txt`
  - Should display: Your 32-character key

### Step 3: Test Submission

- [ ] **Run test submission**
  ```bash
  npm run submit-indexnow
  ```

- [ ] **Check for success messages**
  - Look for: `✅ Successfully submitted`
  - Look for: `📊 Summary: X/X URLs submitted successfully`

### Step 4: Verify in Webmaster Tools (Optional)

- [ ] **Add site to Bing Webmaster Tools**
  - URL: https://www.bing.com/webmasters
  - Add your property

- [ ] **Check URL Inspection**
  - Use URL Inspection tool
  - Verify URLs are being discovered

---

## 🔷 Google Search Console Setup

### Step 1: Create Google Cloud Project

- [ ] **Go to Google Cloud Console**
  - URL: https://console.cloud.google.com/

- [ ] **Create new project**
  - Click: "Select a project" → "New Project"
  - Name: "StreamVault SEO"
  - Click: "Create"

- [ ] **Note your Project ID**
  - Example: `streamvault-seo-123456`

### Step 2: Enable Indexing API

- [ ] **Go to APIs & Services → Library**
  - In Google Cloud Console

- [ ] **Search for "Web Search Indexing API"**

- [ ] **Click "Enable"**

- [ ] **Wait for API to be enabled** (takes ~1 minute)

### Step 3: Create Service Account

- [ ] **Go to APIs & Services → Credentials**

- [ ] **Click "Create Credentials" → "Service Account"**

- [ ] **Fill in service account details**
  - Name: `streamvault-indexing`
  - Description: `Service account for URL submission`

- [ ] **Click "Create and Continue"**

- [ ] **Skip optional steps**
  - Click "Done"

### Step 4: Create Service Account Key

- [ ] **Click on the service account** you just created

- [ ] **Go to "Keys" tab**

- [ ] **Click "Add Key" → "Create New Key"**

- [ ] **Choose "JSON" format**

- [ ] **Click "Create"**

- [ ] **Save the downloaded JSON file**
  - Save as: `google-service-account.json`
  - Location: Project root directory
  - ⚠️ Keep this file secure!

### Step 5: Get Service Account Email

- [ ] **Open the JSON file**

- [ ] **Copy the "client_email" value**
  - Example: `streamvault-indexing@project-id.iam.gserviceaccount.com`

### Step 6: Add to Google Search Console

- [ ] **Go to Google Search Console**
  - URL: https://search.google.com/search-console

- [ ] **Select your property**
  - Or add new property if needed

- [ ] **Go to Settings → Users and permissions**

- [ ] **Click "Add User"**

- [ ] **Paste service account email**

- [ ] **Set permission to "Owner"** (not Editor!)

- [ ] **Click "Add"**

- [ ] **Wait 2-5 minutes** for permissions to propagate

### Step 7: Test Submission

- [ ] **Verify JSON file location**
  - File: `google-service-account.json`
  - Location: Project root

- [ ] **Run test submission**
  ```bash
  npm run submit-google
  ```

- [ ] **Check for success messages**
  - Look for: `✅ Successfully submitted to Google`
  - Look for: `📊 Summary: Success: X`

- [ ] **If errors occur, check:**
  - [ ] Service account added as Owner (not Editor)
  - [ ] Waited 2-5 minutes after adding
  - [ ] API is enabled
  - [ ] JSON file is in correct location

### Step 8: Verify in Search Console (Optional)

- [ ] **Go to URL Inspection tool**
  - In Google Search Console

- [ ] **Enter a submitted URL**

- [ ] **Check status**
  - May show "URL is not on Google" initially
  - Will be crawled within days

---

## 🚀 Submit All Content

### Initial Submission

- [ ] **Submit all URLs to both search engines**
  ```bash
  npm run submit-urls all
  ```

- [ ] **Wait for completion**
  - IndexNow: Instant
  - Google: May take 5-10 minutes for many URLs

- [ ] **Check summary**
  - IndexNow: Should show all URLs submitted
  - Google: Should show success count (max 200/day)

### Verify Submission

- [ ] **Check console output**
  - Look for success messages
  - Note any errors

- [ ] **Check webmaster tools** (after 24-48 hours)
  - Bing Webmaster Tools
  - Google Search Console

---

## 🤖 Set Up Automation (Optional)

### Option 1: Admin Panel Integration

- [ ] **Add to admin panel code**
  ```typescript
  import { submitShow, submitMovie } from './scripts/auto-submit-urls';
  
  // When adding show
  await submitShow(show.slug);
  
  // When adding movie
  await submitMovie(movie.slug);
  ```

### Option 2: Scheduled Submissions

- [ ] **Install node-cron**
  ```bash
  npm install node-cron
  ```

- [ ] **Add to server code**
  ```typescript
  import cron from 'node-cron';
  import { submitAllContent } from './scripts/auto-submit-urls';
  
  // Run daily at 2 AM
  cron.schedule('0 2 * * *', async () => {
    await submitAllContent();
  });
  ```

---

## 🔐 Security Checklist

- [ ] **Verify `.gitignore` includes:**
  - [ ] `google-service-account.json`
  - [ ] `indexnow-key.txt`
  - [ ] `*.txt`

- [ ] **Never commit sensitive files**

- [ ] **Keep service account JSON secure**

- [ ] **Upload only verification file to website**
  - File: `{key}.txt`
  - Location: Website root

---

## 📊 Monitoring Checklist

### Daily (First Week)

- [ ] **Check Bing Webmaster Tools**
  - URL: https://www.bing.com/webmasters
  - Check: URL Inspection
  - Check: Index Status

- [ ] **Check Google Search Console**
  - URL: https://search.google.com/search-console
  - Check: Coverage Report
  - Check: URL Inspection

### Weekly

- [ ] **Monitor indexing progress**

- [ ] **Check for crawl errors**

- [ ] **Submit new content immediately**

### Monthly

- [ ] **Review indexing statistics**

- [ ] **Optimize based on data**

- [ ] **Update sitemaps if needed**

---

## 🎯 Success Criteria

### IndexNow (Bing)

- [ ] ✅ API key generated
- [ ] ✅ Verification file uploaded
- [ ] ✅ URLs submitted successfully
- [ ] ✅ No errors in console
- [ ] ✅ Site added to Bing Webmaster Tools

### Google Search Console

- [ ] ✅ Service account created
- [ ] ✅ API enabled
- [ ] ✅ Service account added as Owner
- [ ] ✅ URLs submitted successfully
- [ ] ✅ No permission errors
- [ ] ✅ Site verified in Search Console

### Overall

- [ ] ✅ All static pages submitted
- [ ] ✅ All show pages submitted
- [ ] ✅ All movie pages submitted
- [ ] ✅ No errors in submission logs
- [ ] ✅ Automation set up (optional)
- [ ] ✅ Monitoring in place

---

## 📝 Notes & Troubleshooting

### Common Issues

**IndexNow: "Key file not found"**
- Solution: Upload `{key}.txt` to website root
- Verify: Visit `https://yourdomain.com/{key}.txt`

**Google: "Permission denied (403)"**
- Solution: Add service account as **Owner** in Search Console
- Wait: 2-5 minutes after adding

**Google: "Rate limit exceeded (429)"**
- Solution: You've hit 200/day limit
- Wait: 24 hours
- Use: IndexNow for additional submissions

**"Module not found: googleapis"**
- Solution: Run `npm install googleapis`

---

## 🎉 Completion

Once all checkboxes are complete:

- ✅ Your site is set up for automated URL submission
- ✅ New content will be indexed faster
- ✅ SEO performance will improve
- ✅ Search engines will be notified of updates immediately

---

## 📚 Next Steps

1. **Read the documentation**
   - [SEO_AUTOMATION_SETUP.md](./SEO_AUTOMATION_SETUP.md) - Complete guide
   - [QUICK_SEO_GUIDE.md](./QUICK_SEO_GUIDE.md) - Quick reference

2. **Set up monitoring**
   - Add site to webmaster tools
   - Check indexing status regularly

3. **Automate submissions**
   - Integrate with admin panel
   - Set up scheduled submissions

4. **Monitor results**
   - Track indexing progress
   - Optimize based on data

---

**Congratulations! Your SEO automation is now set up!** 🚀

**Questions?** Check the full documentation in the project root.
