import { NextResponse, type NextRequest } from 'next/server'

type FormAction = 'contact' | 'survey'

type FormRequest = {
  action?: FormAction
  payload?: Record<string, unknown>
}

const validActions = new Set<FormAction>(['contact', 'survey'])

export async function POST(request: NextRequest) {
  const endpoint =
    process.env.GOOGLE_SCRIPT_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
    ''

  if (!endpoint.trim()) {
    return NextResponse.json(
      { ok: false, error: 'Missing Google Script URL.' },
      { status: 500 },
    )
  }

  let body: FormRequest

  try {
    body = (await request.json()) as FormRequest
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    )
  }

  if (!body.action || !validActions.has(body.action)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid form action.' },
      { status: 400 },
    )
  }

  const formBody = new URLSearchParams()
  formBody.set('action', body.action)
  formBody.set('payload', JSON.stringify(body.payload || {}))

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formBody,
      cache: 'no-store',
    })

    const text = await response.text()
    let data: unknown = null

    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Google Script returned an error.',
          status: response.status,
        },
        { status: 502 },
      )
    }

    if (!data || typeof data !== 'object' || !('ok' in data)) {
      return NextResponse.json(
        { ok: false, error: 'Unexpected Google Script response.' },
        { status: 502 },
      )
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not reach Google Script.' },
      { status: 502 },
    )
  }
}
