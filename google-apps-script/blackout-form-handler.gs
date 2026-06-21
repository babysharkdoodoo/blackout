const CONFIG = {
  // Leave blank if this script is opened from Extensions > Apps Script inside the Sheet.
  // If this is a standalone Apps Script project, paste the Google Sheet ID here.
  SPREADSHEET_ID: '1XVgW6knh74E5zQ0zoEZUt65PEkqA5C4DNIVnFeh9OL8',
  CONTACT_TAB: 'Contacts',
  SURVEY_TAB: 'Survey',
  NOTIFY_EMAIL: 'blackoutprojectirl@gmail.com',
  PROJECT_NAME: 'BLACKOUT Initiative',
  TIMEZONE: 'America/New_York',
}

const CONTACT_HEADERS = [
  'Timestamp',
  'Submission ID',
  'Name',
  'Email',
  'Topic',
  'Message',
  'Page URL',
  'User Agent',
  'Team Notification Sent',
  'Confirmation Sent',
]

const SURVEY_HEADERS = [
  'Timestamp',
  'Submission ID',
  'Survey',
  'Q1 Awareness',
  'Q2 Blackout Months',
  'Q3 Fertilizer Use',
  'Q4 Application Months',
  'Q5 Timing Intent',
  'Q6 Ordinance Source',
  'Q7 Lawn Care Info Source',
  'Raw JSON',
  'Page URL',
  'User Agent',
]

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'diagnose') {
    return jsonResponse_(diagnoseSetup_())
  }

  return jsonResponse_({
    ok: true,
    service: 'BLACKOUT form handler',
  })
}

function doPost(e) {
  const lock = LockService.getScriptLock()

  try {
    lock.waitLock(10000)

    const request = parseRequest_(e)
    const spreadsheet = getSpreadsheet_()

    if (request.action === 'contact') {
      return handleContact_(spreadsheet, request.payload)
    }

    if (request.action === 'survey') {
      return handleSurvey_(spreadsheet, request.payload)
    }

    throw new Error('Unknown action: ' + request.action)
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error),
    })
  } finally {
    try {
      lock.releaseLock()
    } catch (error) {
      // The lock may not exist if parsing failed before acquisition.
    }
  }
}

function setupTabs() {
  const spreadsheet = getSpreadsheet_()
  getSheet_(spreadsheet, CONFIG.CONTACT_TAB, CONTACT_HEADERS)
  getSheet_(spreadsheet, CONFIG.SURVEY_TAB, SURVEY_HEADERS)
}

function diagnoseSetup() {
  Logger.log(JSON.stringify(diagnoseSetup_(), null, 2))
}

function diagnoseSetup_() {
  const result = {
    ok: false,
    service: 'BLACKOUT form handler',
    configuredSpreadsheetId: normalizeSpreadsheetId_(CONFIG.SPREADSHEET_ID),
    activeSpreadsheet: null,
    spreadsheetAccess: null,
  }

  try {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()

    if (activeSpreadsheet) {
      result.activeSpreadsheet = {
        id: activeSpreadsheet.getId(),
        name: activeSpreadsheet.getName(),
        url: activeSpreadsheet.getUrl(),
      }
    }
  } catch (error) {
    result.activeSpreadsheet = {
      error: String(error && error.message ? error.message : error),
    }
  }

  try {
    const spreadsheet = getSpreadsheet_()

    result.ok = true
    result.spreadsheetAccess = {
      id: spreadsheet.getId(),
      name: spreadsheet.getName(),
      url: spreadsheet.getUrl(),
      sheets: spreadsheet.getSheets().map(function (sheet) {
        return sheet.getName()
      }),
    }
  } catch (error) {
    result.spreadsheetAccess = {
      error: String(error && error.message ? error.message : error),
    }
  }

  return result
}

function getSpreadsheet_() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()

  if (activeSpreadsheet) {
    return activeSpreadsheet
  }

  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(normalizeSpreadsheetId_(CONFIG.SPREADSHEET_ID))
  }

  throw new Error(
    'No active spreadsheet found. Open this script from the Google Sheet, or set CONFIG.SPREADSHEET_ID.',
  )
}

function normalizeSpreadsheetId_(value) {
  const text = clean_(value)
  const match = text.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)

  return match ? match[1] : text
}

function handleContact_(spreadsheet, payload) {
  const sheet = getSheet_(spreadsheet, CONFIG.CONTACT_TAB, CONTACT_HEADERS)
  const submissionId = createSubmissionId_('contact')
  const timestamp = formatTimestamp_(new Date())

  const teamSent = sendTeamContactEmail_(payload, submissionId, timestamp)
  const confirmationSent = sendContactConfirmation_(payload, submissionId)

  sheet.appendRow([
    timestamp,
    submissionId,
    clean_(payload.name),
    clean_(payload.email),
    clean_(payload.topic),
    clean_(payload.message),
    clean_(payload.pageUrl),
    clean_(payload.userAgent),
    teamSent ? 'Yes' : 'No',
    confirmationSent ? 'Yes' : 'No',
  ])

  return jsonResponse_({
    ok: true,
    action: 'contact',
    submissionId,
  })
}

function handleSurvey_(spreadsheet, payload) {
  const sheet = getSheet_(spreadsheet, CONFIG.SURVEY_TAB, SURVEY_HEADERS)
  const submissionId = createSubmissionId_('survey')
  const timestamp = formatTimestamp_(new Date())
  const responses = payload.responses || []

  sheet.appendRow([
    timestamp,
    submissionId,
    clean_(payload.survey),
    responseById_(responses, 'q1'),
    responseById_(responses, 'q2'),
    responseById_(responses, 'q3'),
    responseById_(responses, 'q4'),
    responseById_(responses, 'q5'),
    responseById_(responses, 'q6'),
    responseById_(responses, 'q7'),
    JSON.stringify(payload),
    clean_(payload.pageUrl),
    clean_(payload.userAgent),
  ])

  return jsonResponse_({
    ok: true,
    action: 'survey',
    submissionId,
  })
}

function parseRequest_(e) {
  if (!e) {
    throw new Error('Missing request event')
  }

  if (e.parameter && e.parameter.action) {
    return {
      action: e.parameter.action,
      payload: e.parameter.payload ? JSON.parse(e.parameter.payload) : {},
    }
  }

  if (e.postData && e.postData.contents) {
    const parsed = JSON.parse(e.postData.contents)

    return {
      action: parsed.action,
      payload: parsed.payload || {},
    }
  }

  throw new Error('Missing request payload')
}

function getSheet_(spreadsheet, tabName, headers) {
  let sheet = spreadsheet.getSheetByName(tabName)

  if (!sheet) {
    sheet = spreadsheet.insertSheet(tabName)
  }

  const existingHeaders = sheet
    .getRange(1, 1, 1, headers.length)
    .getValues()[0]
    .map(String)

  const needsHeaders = existingHeaders.join('') === ''

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    sheet.setFrozenRows(1)
  }

  return sheet
}

function sendTeamContactEmail_(payload, submissionId, timestamp) {
  const name = clean_(payload.name) || 'Website visitor'
  const topic = clean_(payload.topic) || 'General message'
  const email = clean_(payload.email)

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      replyTo: email || CONFIG.NOTIFY_EMAIL,
      name: CONFIG.PROJECT_NAME,
      subject: 'New BLACKOUT message: ' + topic,
      body:
        'A new message came in through the BLACKOUT website.\n\n' +
        'Name: ' +
        name +
        '\n' +
        'Email: ' +
        (email || 'Not provided') +
        '\n' +
        'Topic: ' +
        topic +
        '\n' +
        'Received: ' +
        timestamp +
        '\n' +
        'Reference: ' +
        submissionId +
        '\n\n' +
        'Message:\n' +
        clean_(payload.message) +
        '\n\n' +
        'Page: ' +
        clean_(payload.pageUrl),
      htmlBody: teamContactHtml_(payload, submissionId, timestamp),
    })

    return true
  } catch (error) {
    return false
  }
}

function sendContactConfirmation_(payload, submissionId) {
  const email = clean_(payload.email)
  const name = clean_(payload.name) || 'there'
  const topic = clean_(payload.topic) || 'General message'

  if (!email) return false

  try {
    MailApp.sendEmail({
      to: email,
      name: CONFIG.PROJECT_NAME,
      replyTo: CONFIG.NOTIFY_EMAIL,
      subject: 'We got your BLACKOUT message',
      body:
        'Hi ' +
        name +
        ',\n\n' +
        'Thanks for reaching out to BLACKOUT. Your message made it to our inbox, and we will read it soon.\n\n' +
        'Topic: ' +
        topic +
        '\n' +
        'Reference: ' +
        submissionId +
        '\n\nIf you need to add anything, reply to this email and keep the reference number in the thread.\n\n' +
        '- BLACKOUT Initiative',
      htmlBody: contactConfirmationHtml_(payload, submissionId),
    })

    return true
  } catch (error) {
    return false
  }
}

function teamContactHtml_(payload, submissionId, timestamp) {
  const name = clean_(payload.name) || 'Website visitor'
  const email = clean_(payload.email) || 'Not provided'
  const topic = clean_(payload.topic) || 'General message'
  const message = clean_(payload.message) || 'No message provided.'
  const pageUrl = clean_(payload.pageUrl) || 'Not provided'

  return (
    '<div style="margin:0;padding:0;background:#edf3ed;color:#17241f;font-family:Arial,Helvetica,sans-serif;">' +
    '<div style="max-width:680px;margin:0 auto;padding:28px 16px;">' +
    '<div style="overflow:hidden;border-radius:18px;background:#ffffff;border:1px solid #d9e3d8;box-shadow:0 16px 40px rgba(13,31,24,0.10);">' +
    '<div style="padding:24px 26px;background:#0b1712;color:#f8f3e8;">' +
    '<div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#bfd0aa;font-weight:700;">BLACKOUT inbox</div>' +
    '<h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;font-weight:700;">New message from ' +
    escapeHtml_(name) +
    '</h1>' +
    '<p style="margin:10px 0 0;color:#d6dfcd;font-size:14px;line-height:1.6;">Reply to this email to respond directly if an email address was provided.</p>' +
    '</div>' +
    '<div style="padding:24px 26px 26px;">' +
    '<div style="padding:18px 20px;border-radius:14px;background:#f7faf5;border:1px solid #dfe8dc;">' +
    '<div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#60705f;font-weight:700;">Message</div>' +
    '<p style="margin:8px 0 0;white-space:pre-wrap;color:#20352c;font-size:16px;line-height:1.7;">' +
    escapeHtml_(message) +
    '</p></div>' +
    '<div style="margin-top:18px;display:block;">' +
    emailRowHtml_('Name', name) +
    emailRowHtml_('Email', email) +
    emailRowHtml_('Topic', topic) +
    emailRowHtml_('Received', timestamp) +
    emailRowHtml_('Reference', submissionId) +
    emailRowHtml_('Page', pageUrl) +
    '</div>' +
    '<p style="margin:22px 0 0;color:#68766d;font-size:13px;line-height:1.6;">This message was also saved in the Contacts tab of the BLACKOUT response sheet.</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  )
}

function contactConfirmationHtml_(payload, submissionId) {
  const name = clean_(payload.name) || 'there'
  const topic = clean_(payload.topic) || 'General message'

  return (
    '<div style="margin:0;padding:0;background:#eef4ee;color:#17241f;font-family:Arial,Helvetica,sans-serif;">' +
    '<div style="max-width:680px;margin:0 auto;padding:30px 16px;">' +
    '<div style="overflow:hidden;border-radius:20px;background:#ffffff;border:1px solid #dbe5d9;box-shadow:0 18px 45px rgba(13,31,24,0.10);">' +
    '<div style="padding:30px 28px;background:#0b1712;color:#f8f3e8;">' +
    '<div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#bfd0aa;font-weight:700;">BLACKOUT Initiative</div>' +
    '<h1 style="margin:12px 0 0;font-size:31px;line-height:1.12;font-weight:700;">We got your message.</h1>' +
    '<p style="margin:12px 0 0;color:#d6dfcd;font-size:15px;line-height:1.7;">Thanks for reaching out. Your note is now in our project inbox.</p>' +
    '</div>' +
    '<div style="padding:28px;color:#17241f;">' +
    '<p style="margin:0;font-size:16px;line-height:1.8;">Hi ' +
    escapeHtml_(name) +
    ',</p>' +
    '<p style="margin:12px 0 0;font-size:16px;line-height:1.8;">We will read it soon and follow up if your message needs a reply. If you want to add anything, you can reply to this email.</p>' +
    '<div style="margin:24px 0;padding:18px 20px;border:1px solid #dfe8dc;border-radius:16px;background:#f7faf5;">' +
    '<div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#60705f;font-weight:700;">Message details</div>' +
    emailRowHtml_('Topic', topic) +
    emailRowHtml_('Reference', submissionId) +
    '</div>' +
    '<p style="margin:0;font-size:14px;line-height:1.7;color:#5b6b61;">BLACKOUT is a student-led project preparing local reminders, survey data, and field records around Brevard County&apos;s summer fertilizer rule.</p>' +
    '</div>' +
    '<div style="padding:18px 28px;background:#f7faf5;border-top:1px solid #dfe8dc;color:#60705f;font-size:13px;line-height:1.6;">Sent by BLACKOUT Initiative. Replies go to ' +
    escapeHtml_(CONFIG.NOTIFY_EMAIL) +
    '.</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  )
}

function emailRowHtml_(label, value) {
  return (
    '<div style="margin-top:13px;">' +
    '<div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#60705f;font-weight:700;">' +
    escapeHtml_(label) +
    '</div>' +
    '<div style="margin-top:4px;color:#1f352b;font-size:15px;line-height:1.55;">' +
    escapeHtml_(value || '') +
    '</div>' +
    '</div>'
  )
}

function rowHtml_(label, value) {
  return (
    '<div style="margin-top:12px;">' +
    '<div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6f8167;font-weight:bold;">' +
    escapeHtml_(label) +
    '</div>' +
    '<div style="margin-top:4px;font-size:15px;line-height:1.6;color:#173027;">' +
    escapeHtml_(value || '') +
    '</div>' +
    '</div>'
  )
}

function responseById_(responses, id) {
  for (let i = 0; i < responses.length; i += 1) {
    if (responses[i].id === id) {
      return clean_(responses[i].answer)
    }
  }

  return ''
}

function clean_(value) {
  if (value === null || value === undefined) return ''

  return String(value).trim()
}

function escapeHtml_(value) {
  return clean_(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function createSubmissionId_(prefix) {
  return (
    prefix +
    '-' +
    Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyyMMdd-HHmmss') +
    '-' +
    Utilities.getUuid().slice(0, 8)
  )
}

function formatTimestamp_(date) {
  return Utilities.formatDate(date, CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
