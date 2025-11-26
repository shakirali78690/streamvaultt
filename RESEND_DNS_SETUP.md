# Resend DNS Configuration for streamvault.live

## Records to Add to Your Domain Registrar

### ✅ Already Verified:
- **DKIM (TXT)** - resend._domainkey - ✅ Verified

### ⏳ Pending - Need to Add:

### 1. SPF TXT Record
```
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all
TTL: Auto (or 3600)
```

### 2. MX Record
```
Type: MX
Name: send
Value: feedback-smtp.ap-northeast-1.amazonses.com
Priority: 10
TTL: Auto (or 3600)
```

---

## Where to Add These Records

### Option 1: Cloudflare (if you use Cloudflare)
1. Go to: https://dash.cloudflare.com
2. Select: streamvault.live
3. Click: DNS → Records
4. Click: Add record
5. Add both records above
6. Set Proxy status to: DNS only (gray cloud)
7. Save

### Option 2: Namecheap
1. Go to: https://ap.www.namecheap.com/domains/list
2. Click: Manage next to streamvault.live
3. Click: Advanced DNS
4. Click: Add New Record
5. Add both records above
6. Save

### Option 3: GoDaddy
1. Go to: https://dcc.godaddy.com/manage/dns
2. Select: streamvault.live
3. Click: Add (under DNS Records)
4. Add both records above
5. Save

### Option 4: Google Domains
1. Go to: https://domains.google.com
2. Select: streamvault.live
3. Click: DNS
4. Scroll to: Custom records
5. Click: Manage custom records
6. Add both records above
7. Save

### Option 5: Hostinger
1. Go to: https://hpanel.hostinger.com
2. Select: streamvault.live
3. Click: DNS / Name Servers
4. Click: Manage
5. Add both records above
6. Save

---

## Verification

After adding the records:
1. Wait 5-30 minutes for DNS propagation
2. Go back to Resend dashboard
3. Click the refresh icon next to the pending records
4. They should change from "Pending" to "Verified"

---

## Important Notes

- **Name field:** Some registrars want just `send`, others want `send.streamvault.live`
  - Try `send` first
  - If it doesn't work, try `send.streamvault.live`

- **Proxy Status (Cloudflare only):** Must be "DNS only" (gray cloud), not proxied (orange cloud)

- **TTL:** Use "Auto" or "3600" (1 hour)

---

## After Verification

Once both records show "Verified" in Resend:

1. Open: `server/email-service.ts`
2. Change line 8:
   ```typescript
   const DOMAIN_FULLY_VERIFIED = false;
   ```
   to:
   ```typescript
   const DOMAIN_FULLY_VERIFIED = true;
   ```
3. Restart your server
4. Emails will now be sent from `noreply@streamvault.live` to `contact@streamvault.live`!

---

## Need Help?

If you're not sure which registrar you use:
1. Go to: https://who.is/whois/streamvault.live
2. Look for "Registrar" field
3. That's where you need to add the DNS records
