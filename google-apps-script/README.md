# BLACKOUT Google Apps Script Setup

Use one Google Sheet with two tabs:

## Tab 1: Contacts

Tab name: `Contacts`

Headers, in this exact order:

| Column | Header |
| --- | --- |
| A | Timestamp |
| B | Submission ID |
| C | Name |
| D | Email |
| E | Topic |
| F | Message |
| G | Page URL |
| H | User Agent |
| I | Team Notification Sent |
| J | Confirmation Sent |

## Tab 2: Survey

Tab name: `Survey`

Headers, in this exact order:

| Column | Header |
| --- | --- |
| A | Timestamp |
| B | Submission ID |
| C | Survey |
| D | Q1 Awareness |
| E | Q2 Blackout Months |
| F | Q3 Fertilizer Use |
| G | Q4 Application Months |
| H | Q5 Timing Intent |
| I | Q6 Ordinance Source |
| J | Q7 Lawn Care Info Source |
| K | Raw JSON |
| L | Page URL |
| M | User Agent |

## Deployment

1. Create a Google Sheet.
2. Open `Extensions > Apps Script`.
3. Paste the contents of `blackout-form-handler.gs`.
4. Run `setupTabs` once from Apps Script to create the two tabs and headers.
5. Deploy as a web app:
   - Execute as: `Me`
   - Who has access: `Anyone`
6. Copy the web app URL.
7. Add it to the website environment:

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

The contact form writes to `Contacts`, sends a team email to `blackoutprojectirl@gmail.com`, and sends the visitor a custom HTML confirmation email.

The survey form writes to `Survey`.

## Quick Test

Open the deployed `/exec` URL in an incognito browser window.

Working response:

```json
{"ok":true,"service":"BLACKOUT form handler"}
```

If you see a Google sign-in page or a `401 Unauthorized` response, the deployment is not public yet. Go to `Deploy > Manage deployments`, edit the web app deployment, and confirm:

- Execute as: `Me`
- Who has access: `Anyone`

Then deploy a new version and update `GOOGLE_SCRIPT_URL` if Google gives you a new URL.

If `Anyone` is not available, the Google account is probably restricted by a school or Workspace admin. Deploy the script from a personal Google account or ask the admin to allow public web apps.

After changing `.env.local`, restart the local dev server or rebuild/redeploy the site.

## If You See `No active spreadsheet` or `getSheetByName`

That means the Apps Script project is not bound to the Google Sheet.

Best fix: open the Google Sheet first, then go to `Extensions > Apps Script`, and paste the script there.

Alternative fix: keep the standalone Apps Script project and paste the Sheet ID into `CONFIG.SPREADSHEET_ID`. The updated script also accepts the full Google Sheet URL, but the ID alone is cleaner:

```js
const CONFIG = {
  SPREADSHEET_ID: 'PASTE_THE_GOOGLE_SHEET_ID_HERE',
  CONTACT_TAB: 'Contacts',
  SURVEY_TAB: 'Survey',
  NOTIFY_EMAIL: 'blackoutprojectirl@gmail.com',
  PROJECT_NAME: 'BLACKOUT Initiative',
  TIMEZONE: 'America/New_York',
}
```

The Sheet ID is the long value in the Sheet URL:

```txt
https://docs.google.com/spreadsheets/d/SHEET_ID_IS_HERE/edit
```

After changing the script, deploy a new web app version and test the `/exec` URL again.

## If You See `Service Spreadsheets failed while accessing document`

The Sheet ID can be correct and this can still happen. It usually means the
deployed Apps Script account cannot open that file, the script is still running
an older deployment version, or the file is not a native Google Sheet.

Fastest fix:

1. Open the actual Google Sheet.
2. Go to `Extensions > Apps Script`.
3. Paste `blackout-form-handler.gs` there.
4. Leave `SPREADSHEET_ID: ''`.
5. Run `setupTabs`.
6. Deploy a new web app version with `Execute as: Me` and `Who has access: Anyone`.

To diagnose the current deployment, open:

```txt
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=diagnose
```

Or run `diagnoseSetup` inside the Apps Script editor and read the execution log.
If `spreadsheetAccess.error` appears, the website is not the failing part; the
Apps Script deployment cannot open the Google Sheet yet.
