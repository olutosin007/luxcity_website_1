# Product Interest Leads Setup Guide

## Current Status

Leads are now being **logged to Vercel console logs** even if email isn't configured. You can view them in your Vercel dashboard under the function logs.

## Where Leads Go

### Option 1: Email (Recommended)
Set these environment variables in Vercel:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=leads@yourdomain.com
```

**Note:** For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### Option 2: Webhook (Zapier/Make.com/Airtable)
Set this environment variable:

```
WEBHOOK_URL=https://your-webhook-url.com
```

This allows you to:
- Send leads to Zapier → Google Sheets, Airtable, CRM, etc.
- Send leads to Make.com → Any automation
- Send leads to Airtable directly
- Send leads to your CRM

### Option 3: View in Vercel Logs
Even without configuration, all leads are logged to Vercel function logs. You can:
1. Go to your Vercel dashboard
2. Navigate to your project
3. Click on "Functions" or "Logs"
4. Look for entries starting with "=== NEW PRODUCT INTEREST LEAD ==="

## Quick Setup Examples

### Zapier → Google Sheets
1. Create a Zapier account
2. Create a new Zap with "Webhooks by Zapier" as trigger
3. Copy the webhook URL
4. Set `WEBHOOK_URL` in Vercel to that URL
5. Add "Google Sheets" action to save the lead

### Make.com → Airtable
1. Create a Make.com scenario
2. Add "Webhooks" → "Custom webhook" trigger
3. Copy the webhook URL
4. Set `WEBHOOK_URL` in Vercel
5. Add "Airtable" → "Create a record" action

### Direct Email
1. Get Gmail App Password (or use another SMTP service)
2. Set all SMTP environment variables in Vercel
3. Leads will be sent to `SMTP_FROM_EMAIL` address

## Lead Data Structure

Each lead contains:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+44 20 1234 5678",
  "companyName": "Acme Inc.",
  "productName": "Proptii",
  "productUrl": "https://proptii-r1-1a-new.onrender.com/"
}
```

## Testing

1. Fill out the interest form on your Labs or Solutions page
2. Check Vercel logs to see the lead data
3. If email/webhook is configured, verify it was received

## Troubleshooting

**Leads not appearing?**
- Check Vercel function logs (they should always be there)
- Verify environment variables are set correctly
- Check webhook URL is accessible (if using webhook)

**Email not sending?**
- Verify SMTP credentials are correct
- For Gmail, ensure you're using an App Password
- Check spam folder
- Verify `SMTP_FROM_EMAIL` is set to your desired recipient
