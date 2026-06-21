type GoogleScriptAction = 'contact' | 'survey'

type GoogleScriptPayload = Record<string, unknown>

export async function submitToGoogleScript(
  action: GoogleScriptAction,
  payload: GoogleScriptPayload,
) {
  const response = await fetch('/api/forms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action,
      payload: {
      ...payload,
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href,
      userAgent: window.navigator.userAgent,
      },
    }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || 'Form submission failed')
  }

  return data
}
