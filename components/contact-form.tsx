'use client'

import { useState } from 'react'
import { submitToGoogleScript } from '@/lib/google-script'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await submitToGoogleScript('contact', {
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        topic: String(formData.get('topic') || ''),
        message: String(formData.get('message') || ''),
      })

      form.reset()
      setSubmitted(true)
    } catch {
      setError('Message could not be sent yet. Please email the team directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-[#ded6c8] bg-[#fbf8f1] p-6 text-[#173027] shadow-[0_18px_50px_rgba(7,16,13,0.08)] lg:p-8">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
          Message received
        </p>

        <h3 className="mb-3 text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
          Thank you.
        </h3>

        <p className="max-w-xl text-[14px] leading-[1.9] text-[#5e665d]">
          We received your message and sent a confirmation email. The team will
          review it through the project inbox.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#ded6c8] bg-[#fbf8f1] p-5 text-[#173027] shadow-[0_18px_50px_rgba(7,16,13,0.08)] sm:p-6 lg:p-8"
    >
      <div className="mb-8">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
          Contact form
        </p>

        <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#173027]">
          Send a message.
        </h3>

        <p className="mt-3 max-w-lg text-[14px] leading-[1.9] text-[#5e665d]">
          Choose a topic and write the message you want routed to the team. For
          direct delivery, use the email link in the directory above.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f8167]"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            autoComplete="name"
            className="w-full rounded-2xl border border-[#ded6c8] bg-white px-4 py-3.5 text-[15px] text-[#173027] outline-none placeholder:text-[#8a9285] transition focus:border-[#6f8167] focus:ring-4 focus:ring-[#6f8167]/15"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f8167]"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-2xl border border-[#ded6c8] bg-white px-4 py-3.5 text-[15px] text-[#173027] outline-none placeholder:text-[#8a9285] transition focus:border-[#6f8167] focus:ring-4 focus:ring-[#6f8167]/15"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f8167]"
          >
            Topic
          </label>

          <select
            id="topic"
            name="topic"
            required
            defaultValue="General Question"
            className="w-full rounded-2xl border border-[#ded6c8] bg-white px-4 py-3.5 text-[15px] text-[#173027] outline-none transition focus:border-[#6f8167] focus:ring-4 focus:ring-[#6f8167]/15"
          >
            <option>General Question</option>
            <option>Media Inquiry</option>
            <option>Retail Partnership</option>
            <option>County Coordination</option>
            <option>Academic Replication</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6f8167]"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={7}
            placeholder="Write your message..."
            className="w-full resize-none rounded-[1.25rem] border border-[#ded6c8] bg-white p-4 text-[15px] text-[#173027] outline-none placeholder:text-[#8a9285] transition focus:border-[#6f8167] focus:ring-4 focus:ring-[#6f8167]/15"
          />
        </div>
      </div>

      {error ? (
        <div
          className="mt-5 rounded-2xl border border-[#b5533c]/25 bg-[#fff3ed] px-4 py-3 text-[13px] leading-6 text-[#7a2f1f]"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 border-t border-[#ded6c8] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-6 text-[#657064]">
          Routed to the BLACKOUT project inbox.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#173027] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#f5efe3] transition hover:-translate-y-0.5 hover:bg-[#07100d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </form>
  )
}