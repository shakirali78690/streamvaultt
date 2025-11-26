# Email Notification Setup

StreamVault sends email notifications for:
- **Content Requests** - When users request new shows/movies
- **Issue Reports** - When users report bugs or problems

All emails are sent to: **contact@streamvault.live**

## Setup Instructions

### 1. Get a Free Web3Forms Access Key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click "Get Started Free"
3. Enter your email: **contact@streamvault.live**
4. Verify your email
5. Copy your Access Key

### 2. Add to Environment Variables

Add this to your `.env` file:

```env
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### 3. Restart the Server

```bash
npm run dev
```

## How It Works

When a user submits a content request or issue report:

1. ✅ Data is saved to the database (persistent)
2. 📧 Email is sent to `contact@streamvault.live` with all details
3. 📊 You can view all requests in the admin panel

## Email Contents

### Content Request Email
- Content Type (Movie/Series)
- Title, Year, Genre
- Description & Reason
- User's email (if provided)
- Request count (how many times it's been requested)

### Issue Report Email
- Issue Type (Bug/Video Issue/etc.)
- Title & Description
- Page URL where the issue occurred
- User's email (if provided)

## Testing

To test if emails are working:

1. Submit a content request from the website
2. Check the server console for:
   - `✅ Email sent successfully to: contact@streamvault.live`
   - OR `⚠️ WEB3FORMS_ACCESS_KEY not set` (if not configured)

## Without Email Setup

If you don't set up the email service:
- ✅ Requests still work and are saved
- ✅ Data persists in the database
- ⚠️ You just won't get email notifications
- 📝 You can still view all requests in the admin panel

## Alternative Email Services

If you prefer a different service, you can modify `server/email-service.ts` to use:
- SendGrid
- Mailgun
- Resend
- AWS SES
- Or any SMTP service
