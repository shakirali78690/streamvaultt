# 🌐 Domain Setup Guide - streamvault.live

## Overview
Connect your **streamvault.live** domain from Namecheap to your Railway deployment.

---

## 📋 Prerequisites

- ✅ Domain: streamvault.live (purchased on Namecheap)
- ✅ Railway deployment: streamvault.up.railway.app
- ✅ Access to Namecheap account
- ✅ Access to Railway dashboard

---

## 🚀 Step-by-Step Setup

### **Part 1: Get Railway Domain Settings**

1. **Go to Railway Dashboard**
   - Visit: https://railway.app
   - Login to your account
   - Select your StreamVault project

2. **Go to Settings**
   - Click on your deployment
   - Go to **Settings** tab
   - Scroll to **Domains** section

3. **Add Custom Domain**
   - Click **+ Add Domain**
   - Enter: `streamvault.live`
   - Click **Add Domain**

4. **Note the DNS Records**
   Railway will show you DNS records like:
   ```
   Type: CNAME
   Name: @
   Value: [your-app].up.railway.app
   
   Type: CNAME
   Name: www
   Value: [your-app].up.railway.app
   ```

---

### **Part 2: Configure Namecheap DNS**

#### **Option A: Using CNAME Records (Recommended)**

1. **Login to Namecheap**
   - Go to: https://www.namecheap.com
   - Login to your account

2. **Access Domain List**
   - Click **Domain List** in the left sidebar
   - Find **streamvault.live**
   - Click **Manage**

3. **Go to Advanced DNS**
   - Click on **Advanced DNS** tab

4. **Delete Default Records**
   - Delete any existing **A Records** or **CNAME Records**
   - Keep only the **URL Redirect Record** if you want www to redirect

5. **Add New CNAME Records**

   **Record 1 (Root Domain):**
   ```
   Type: CNAME Record
   Host: @
   Value: streamvault.up.railway.app
   TTL: Automatic
   ```

   **Record 2 (WWW Subdomain):**
   ```
   Type: CNAME Record
   Host: www
   Value: streamvault.up.railway.app
   TTL: Automatic
   ```

6. **Save Changes**
   - Click the green checkmark to save
   - Wait for DNS propagation (5-30 minutes)

---

#### **Option B: Using A Records (Alternative)**

If CNAME for root domain doesn't work:

1. **Get Railway IP Address**
   - In Railway, go to Settings > Networking
   - Note the IP address (if provided)

2. **Add A Records in Namecheap**

   **Record 1:**
   ```
   Type: A Record
   Host: @
   Value: [Railway IP Address]
   TTL: Automatic
   ```

   **Record 2:**
   ```
   Type: A Record
   Host: www
   Value: [Railway IP Address]
   TTL: Automatic
   ```

---

### **Part 3: Configure SSL Certificate**

Railway automatically provides SSL certificates for custom domains.

1. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Can take up to 48 hours in rare cases

2. **Verify SSL in Railway**
   - Go back to Railway dashboard
   - Check if SSL certificate is issued
   - Status should show "Active" with a green checkmark

3. **Test HTTPS**
   - Visit: https://streamvault.live
   - Should show secure padlock icon
   - Certificate should be valid

---

## 🔧 Detailed Namecheap Configuration

### **Step-by-Step with Screenshots Guide:**

1. **Login to Namecheap**
   ```
   URL: https://www.namecheap.com/myaccount/login/
   ```

2. **Navigate to Domain List**
   - Dashboard > Domain List
   - Or direct: https://ap.www.namecheap.com/domains/list/

3. **Click Manage on streamvault.live**

4. **Advanced DNS Tab**
   - Click "Advanced DNS" at the top

5. **Current Records (Default)**
   You'll see something like:
   ```
   Type: A Record | Host: @ | Value: Namecheap Parking IP
   Type: A Record | Host: www | Value: Namecheap Parking IP
   ```

6. **Delete These Records**
   - Click the trash icon next to each record
   - Confirm deletion

7. **Add New CNAME Records**
   
   **Click "Add New Record"**
   
   **First Record:**
   - Type: `CNAME Record`
   - Host: `@`
   - Value: `streamvault.up.railway.app`
   - TTL: `Automatic`
   - Click ✓ (checkmark)

   **Second Record:**
   - Click "Add New Record" again
   - Type: `CNAME Record`
   - Host: `www`
   - Value: `streamvault.up.railway.app`
   - TTL: `Automatic`
   - Click ✓ (checkmark)

8. **Final DNS Records Should Look Like:**
   ```
   Type          | Host | Value                        | TTL
   --------------|------|------------------------------|----------
   CNAME Record  | @    | streamvault.up.railway.app   | Automatic
   CNAME Record  | www  | streamvault.up.railway.app   | Automatic
   ```

---

## 🔍 Verification Steps

### **1. Check DNS Propagation**

Use online tools:
- https://dnschecker.org
- Enter: `streamvault.live`
- Check CNAME records globally

### **2. Test Domain**

```bash
# Test root domain
curl -I https://streamvault.live

# Test www subdomain
curl -I https://www.streamvault.live

# Check DNS
nslookup streamvault.live
```

### **3. Browser Test**

- Visit: https://streamvault.live
- Visit: https://www.streamvault.live
- Both should load your StreamVault app

---

## ⚙️ Update Application Configuration

### **1. Update Environment Variables**

In Railway dashboard:

```env
BASE_URL=https://streamvault.live
NODE_ENV=production
```

### **2. Update Code References**

Update these files:

**`server/sitemap.ts`:**
```typescript
const baseUrl = process.env.BASE_URL || "https://streamvault.live";
```

**`client/public/robots.txt`:**
```
Sitemap: https://streamvault.live/sitemap.xml
Sitemap: https://streamvault.live/sitemap-shows.xml
Sitemap: https://streamvault.live/sitemap-categories.xml
```

### **3. Redeploy**

```bash
git add .
git commit -m "Update domain to streamvault.live"
git push
```

Railway will automatically redeploy.

---

## 🎯 Common Issues & Solutions

### **Issue 1: CNAME Not Working for Root Domain**

**Solution:**
- Some DNS providers don't support CNAME for root (@)
- Use CNAME Flattening (Namecheap supports this)
- Or use A Records instead

### **Issue 2: SSL Certificate Not Issued**

**Solution:**
- Wait 30 minutes for DNS propagation
- Verify DNS records are correct
- Check Railway dashboard for SSL status
- Try removing and re-adding domain in Railway

### **Issue 3: www Not Working**

**Solution:**
- Ensure www CNAME record is added
- Check DNS propagation for www subdomain
- Add URL redirect in Namecheap if needed

### **Issue 4: Mixed Content Warnings**

**Solution:**
- Ensure all assets use HTTPS
- Update any hardcoded HTTP URLs
- Check browser console for errors

### **Issue 5: DNS Not Propagating**

**Solution:**
- Wait up to 48 hours
- Clear DNS cache: `ipconfig /flushdns` (Windows)
- Try different DNS servers (8.8.8.8, 1.1.1.1)
- Use incognito/private browsing

---

## 📊 DNS Propagation Time

| Location        | Typical Time |
|-----------------|--------------|
| Local ISP       | 5-30 minutes |
| Global          | 1-4 hours    |
| Full Propagation| 24-48 hours  |

---

## 🔐 Security Best Practices

### **1. Enable DNSSEC (Optional)**

In Namecheap:
- Advanced DNS > DNSSEC
- Enable DNSSEC
- Add DS records to Railway if required

### **2. Force HTTPS**

In Railway:
- Settings > Networking
- Enable "Force HTTPS"
- All HTTP requests redirect to HTTPS

### **3. Add Security Headers**

Update your server to add headers:
```javascript
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
```

---

## 📱 Mobile & Social Media

### **Update Meta Tags**

Update your HTML meta tags:

```html
<meta property="og:url" content="https://streamvault.live" />
<meta property="og:site_name" content="StreamVault" />
<link rel="canonical" href="https://streamvault.live" />
```

---

## 🎉 Post-Setup Checklist

- [ ] Domain resolves to Railway app
- [ ] SSL certificate is active (green padlock)
- [ ] www subdomain works
- [ ] Redirects from HTTP to HTTPS
- [ ] Updated robots.txt with new domain
- [ ] Updated sitemaps with new domain
- [ ] Submitted new sitemap to Google Search Console
- [ ] Updated social media links
- [ ] Tested on mobile devices
- [ ] Verified all pages load correctly

---

## 🔗 Important URLs

### **Namecheap:**
- Dashboard: https://ap.www.namecheap.com
- Domain List: https://ap.www.namecheap.com/domains/list/
- Support: https://www.namecheap.com/support/

### **Railway:**
- Dashboard: https://railway.app
- Docs: https://docs.railway.app
- Custom Domains: https://docs.railway.app/deploy/exposing-your-app#custom-domains

### **DNS Tools:**
- DNS Checker: https://dnschecker.org
- What's My DNS: https://www.whatsmydns.net
- DNS Propagation: https://dnspropagation.net

---

## 💰 Cost Breakdown

| Item                  | Cost      | Period  |
|-----------------------|-----------|---------|
| Domain (streamvault.live) | $2.98 | 1 year  |
| Railway Hosting       | $5/month  | Monthly |
| SSL Certificate       | Free      | Auto    |
| **Total Year 1**      | **$62.98**| -       |

---

## 📞 Support

### **If You Need Help:**

1. **Namecheap Support:**
   - Live Chat: Available 24/7
   - Ticket: https://support.namecheap.com

2. **Railway Support:**
   - Discord: https://discord.gg/railway
   - Docs: https://docs.railway.app

3. **DNS Issues:**
   - Check propagation first
   - Wait 24-48 hours
   - Contact Namecheap support

---

## 🎯 Quick Reference

### **Namecheap DNS Settings:**
```
CNAME | @ | streamvault.up.railway.app
CNAME | www | streamvault.up.railway.app
```

### **Railway Domain:**
```
Custom Domain: streamvault.live
```

### **Environment Variable:**
```
BASE_URL=https://streamvault.live
```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ https://streamvault.live loads your app
- ✅ Green padlock (SSL) in browser
- ✅ www.streamvault.live also works
- ✅ HTTP redirects to HTTPS
- ✅ No certificate warnings

---

**Congratulations on your new domain! 🎉**

Your StreamVault platform will now be accessible at:
- **https://streamvault.live**
- **https://www.streamvault.live**

**Estimated Setup Time:** 30 minutes + DNS propagation (5-30 minutes)
