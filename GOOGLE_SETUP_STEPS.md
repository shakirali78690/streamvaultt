# 🔷 Google Search Console Setup - Step by Step

Follow these exact steps to set up Google Search Console API for StreamVault.

---

## ✅ **Step 1: Create Google Cloud Project**

1. **Go to Google Cloud Console**
   - URL: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click the project dropdown at the top
   - Click "**New Project**"
   - **Project Name**: `StreamVault SEO`
   - **Organization**: Leave as default
   - Click "**Create**"
   - Wait ~30 seconds for project creation

3. **Select Your Project**
   - Click the project dropdown again
   - Select "**StreamVault SEO**"

---

## ✅ **Step 2: Enable Web Search Indexing API**

1. **Go to APIs & Services**
   - In the left menu, click "**APIs & Services**" → "**Library**"
   - Or use this direct link: https://console.cloud.google.com/apis/library

2. **Search for Indexing API**
   - In the search box, type: `Web Search Indexing API`
   - Click on "**Web Search Indexing API**"

3. **Enable the API**
   - Click the blue "**Enable**" button
   - Wait ~10 seconds for it to enable
   - You'll see "API enabled" message

---

## ✅ **Step 3: Create Service Account**

1. **Go to Credentials**
   - Click "**APIs & Services**" → "**Credentials**"
   - Or use: https://console.cloud.google.com/apis/credentials

2. **Create Service Account**
   - Click "**+ Create Credentials**" at the top
   - Select "**Service Account**"

3. **Fill Service Account Details**
   - **Service account name**: `streamvault-indexing`
   - **Service account ID**: (auto-filled, leave as is)
   - **Description**: `Service account for URL submission to Google`
   - Click "**Create and Continue**"

4. **Skip Optional Steps**
   - **Grant this service account access to project**: Click "**Continue**" (skip)
   - **Grant users access to this service account**: Click "**Done**" (skip)

---

## ✅ **Step 4: Create Service Account Key (JSON)**

1. **Find Your Service Account**
   - You should see your service account in the list
   - Email looks like: `streamvault-indexing@streamvault-seo-XXXXXX.iam.gserviceaccount.com`
   - Click on the service account email

2. **Go to Keys Tab**
   - Click the "**Keys**" tab at the top

3. **Create New Key**
   - Click "**Add Key**" → "**Create new key**"
   - Select "**JSON**" format
   - Click "**Create**"

4. **Save the JSON File**
   - A JSON file will download automatically
   - **IMPORTANT**: Rename it to exactly: `google-service-account.json`
   - Move it to your StreamVault project root folder:
     ```
     C:\Users\yawar\Desktop\StreamVault\google-service-account.json
     ```

---

## ✅ **Step 5: Get Service Account Email**

1. **Open the JSON File**
   - Open `google-service-account.json` in a text editor
   - Find the line with `"client_email"`
   - Copy the email address (looks like):
     ```
     streamvault-indexing@streamvault-seo-XXXXXX.iam.gserviceaccount.com
     ```

2. **Keep This Email Handy**
   - You'll need it in the next step

---

## ✅ **Step 6: Add Service Account to Google Search Console**

1. **Go to Google Search Console**
   - URL: https://search.google.com/search-console
   - Sign in with your Google account

2. **Select Your Property**
   - If you haven't added `streamvault.live` yet:
     - Click "**Add Property**"
     - Enter: `https://streamvault.live`
     - Follow verification steps
   - If already added, select it from the list

3. **Go to Settings**
   - In the left menu, click "**Settings**" (gear icon at bottom)

4. **Add User**
   - Click "**Users and permissions**"
   - Click "**Add User**" button

5. **Enter Service Account Email**
   - Paste the service account email you copied earlier
   - **Permission level**: Select "**Owner**" (NOT Editor!)
   - Click "**Add**"

6. **Wait for Permissions**
   - Wait 2-5 minutes for permissions to propagate
   - This is important! Don't skip this wait.

---

## ✅ **Step 7: Test the Setup**

1. **Verify JSON File Location**
   - Make sure `google-service-account.json` is in:
     ```
     C:\Users\yawar\Desktop\StreamVault\google-service-account.json
     ```

2. **Run Test Submission**
   - Open terminal in StreamVault folder
   - Run:
     ```bash
     npm run submit-google
     ```

3. **Check for Success**
   - You should see:
     ```
     📺 Fetching shows from database...
        Found 201 shows
     🎬 Fetching movies from database...
        Found 202 movies
     
     📋 Total URLs found: 3138
     📤 Submitting first 200 URLs (Google free tier limit: 200/day)
     
     [1/200] Submitting: https://streamvault.live
     ✅ Successfully submitted to Google: https://streamvault.live
     ...
     ```

4. **If You See Errors**
   - **403 Permission Denied**: Service account not added as Owner, or wait 5 more minutes
   - **File Not Found**: JSON file not in correct location
   - **API Not Enabled**: Go back to Step 2

---

## 🎉 **Success!**

Once you see "✅ Successfully submitted to Google" messages, you're all set!

### **What Happens Next:**

- ✅ **200 URLs submitted per day** (free tier limit)
- ✅ Google will crawl your URLs within 1-14 days
- ✅ Check indexing status in Google Search Console
- ✅ Run the script daily to submit more URLs (200/day)

### **To Submit More URLs:**

Since you have 3,138 URLs total and can only submit 200/day:
- Day 1: URLs 1-200
- Day 2: URLs 201-400
- Day 3: URLs 401-600
- ... and so on

Or modify the script to track which URLs have been submitted.

---

## 📝 **Quick Reference**

**Service Account Email Format:**
```
streamvault-indexing@streamvault-seo-XXXXXX.iam.gserviceaccount.com
```

**JSON File Location:**
```
C:\Users\yawar\Desktop\StreamVault\google-service-account.json
```

**Test Command:**
```bash
npm run submit-google
```

**Google Cloud Console:**
https://console.cloud.google.com/

**Google Search Console:**
https://search.google.com/search-console

---

## ⚠️ **Important Notes**

1. **Never commit** `google-service-account.json` to Git (already in .gitignore)
2. Service account must be added as **Owner**, not Editor
3. Wait 2-5 minutes after adding service account
4. Free tier limit: **200 requests per day**
5. Keep the JSON file secure and private

---

**Ready? Start with Step 1!** 🚀
