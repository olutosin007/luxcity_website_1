# Google Sheets Integration Setup Guide

This guide will help you set up Google Apps Script to receive form submissions and automatically add them to a Google Sheet.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "LuxCity Tool Submissions"
4. In the first row (Row 1), add these column headers:
   - `Timestamp`
   - `Date`
   - `Time`
   - `Name`
   - `Email`
   - `Company`
   - `Role`
   - `Tool Name`
   - `Growth Stage` (for AI Readiness)
   - `Technology Score` (for AI Readiness)
   - `Data Score` (for AI Readiness)
   - `Team Score` (for AI Readiness)
   - `Budget Score` (for AI Readiness)
   - `Avg Score` (for AI Readiness)
   - `Readiness Level` (for AI Readiness)
   - `Property Type` (for Compliance)
   - `Compliance Score` (for Compliance)
   - `Must Haves Completed` (for Compliance)
   - `Selected Scenarios` (for ROI)
   - `Top Scenario` (for ROI)
   - `Tool Data (JSON)` (for all raw data)

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code
3. Copy and paste the code from `google-apps-script-code.js` (see below)
4. Click **Save** (💾 icon) and name your project (e.g., "Tool Submissions Webhook")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: "Tool submissions webhook"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows the webhook to work)
4. Click **Deploy**
5. **Copy the Web App URL** - this is your webhook URL
6. Click **Authorize access** and grant permissions

## Step 4: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `TOOL_WEBHOOK_URL`
   - **Value**: Paste the Web App URL from Step 3
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

## Step 5: Test the Integration

1. Go to one of your tools (AI Readiness Assessment, etc.)
2. Complete the tool and submit the form
3. Check your Google Sheet - you should see a new row with the submission data

## Troubleshooting

- **No data appearing**: Check the Apps Script execution logs (View → Executions)
- **Permission errors**: Make sure "Who has access" is set to "Anyone"
- **Sheet not found**: Verify the Sheet ID in the script matches your sheet

## Security Note

The webhook URL is public, but you can add basic authentication by:
1. Adding a secret token to the script
2. Checking for the token in the request headers
3. Setting the token in your Vercel environment variables
