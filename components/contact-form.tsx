// components/contact-form.tsx
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] p-6 lg:p-8">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">
          Message received
        </p>
        <h3 className="mb-3 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
          Thank you.
        </h3>
        <p className="max-w-xl text-[14px] leading-[1.9] text-[#a6ad9f]">
          This is a demonstration form. In the live version, messages will be delivered directly to the BLACKOUT team inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] p-2 sm:p-4 lg:p-6">
      <div className="mb-8">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">
          Contact form
        </p>
        <h3 className="font-sans text-3xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
          Send a message.
        </h3>
        <p className="mt-3 max-w-lg text-[14px] leading-[1.9] text-[#a6ad9f]">
          Questions, partnership inquiries, media requests, or feedback. Complete the form below and a member of the team will review it.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-[#8f978a]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full border-0 border-b border-white/10 bg-transparent px-0 py-3 text-[15px] text-[#f3efe5] outline-none placeholder:text-[#70786c] focus:border-[#a3b18a]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-[#8f978a]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full border-0 border-b border-white/10 bg-transparent px-0 py-3 text-[15px] text-[#f3efe5] outline-none placeholder:text-[#70786c] focus:border-[#a3b18a]"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-[#8f978a]"
          >
            Topic
          </label>
          <select
            id="topic"
            className="w-full border-0 border-b border-white/10 bg-transparent px-0 py-3 text-[15px] text-[#f3efe5] outline-none focus:border-[#a3b18a]"
          >
            <option className="bg-[#0a0f0d]">General Question</option>
            <option className="bg-[#0a0f0d]">Media Inquiry</option>
            <option className="bg-[#0a0f0d]">Retail Partnership</option>
            <option className="bg-[#0a0f0d]">County Coordination</option>
            <option className="bg-[#0a0f0d]">Academic Replication</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-[#8f978a]"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={7}
            placeholder="Write your message..."
            className="w-full resize-none rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 text-[15px] text-[#f3efe5] outline-none placeholder:text-[#70786c] focus:border-[#a3b18a]"
          />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
        <p className="text-[11px] text-[#8f978a]">Demonstration form</p>
        <button
          type="submit"
          className="rounded-full bg-[#efe8d6] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          Send message
        </button>
      </div>
    </form>
  )
}