'use client'

import { useState } from 'react'
import { submitToGoogleScript } from '@/lib/google-script'

type Answers = Record<string, string | string[]>

const questions = [
  {
    id: 'q1',
    section: 'Section A  -  Awareness',
    label: 'Are you aware that Brevard County has an ordinance restricting fertilizer application during certain months of the year?',
    type: 'radio' as const,
    options: ['Yes, I am aware of it', 'I have heard of something like this but am not sure of the details', 'No, I was not aware of any such ordinance'],
  },
  {
    id: 'q2',
    section: 'Section A  -  Awareness',
    label: 'Do you know during which months the Brevard County fertilizer blackout period is in effect?',
    type: 'radio' as const,
    options: ['Yes, I know the exact months', 'I have a general idea but am not certain', 'No, I do not know'],
  },
  {
    id: 'q3',
    section: 'Section B  -  Behavior',
    label: 'Does your household apply fertilizer to a lawn, garden, or landscaped area?',
    type: 'radio' as const,
    options: ['Yes, we apply it ourselves', 'Yes, we hire a lawn service that applies it', 'No, we do not apply fertilizer', 'Not applicable  -  no lawn or landscaped area'],
  },
  {
    id: 'q4',
    section: 'Section B  -  Behavior',
    label: 'During which months does your household typically apply fertilizer? (Select all that apply)',
    type: 'checkbox' as const,
    options: ['January  -  February', 'March  -  April', 'May', 'June  -  July', 'August  -  September', 'October  -  November', 'December', 'I am not sure / varies'],
  },
  {
    id: 'q5',
    section: 'Section B  -  Behavior',
    label: 'Now that you know the ordinance is in effect from June 1 through September 30, how likely are you to change your fertilizer application timing?',
    type: 'radio' as const,
    options: [
      'Very likely  -  I will stop applying fertilizer during those months',
      'Somewhat likely  -  I will try to adjust',
      'Unlikely  -  my current timing will not change',
      'Not applicable  -  I do not apply fertilizer during those months anyway',
    ],
  },
  {
    id: 'q6',
    section: 'Section C  -  Sources',
    label: 'How did you learn about the Brevard County fertilizer blackout ordinance, if at all? (Select all that apply)',
    type: 'checkbox' as const,
    options: [
      'This survey is the first I have heard of it',
      'A neighbor or friend',
      'A retailer or lawn supply store',
      'A storm drain marker in my neighborhood',
      'Social media or local news',
      'Brevard County directly',
      'Other',
    ],
  },
  {
    id: 'q7',
    section: 'Section C  -  Sources',
    label: 'What is the primary source of information you rely on for lawn care decisions?',
    type: 'radio' as const,
    options: [
      'Packaging on fertilizer products',
      'A lawn care professional or service',
      'Online searches',
      'Neighbors or word of mouth',
      'County or government communications',
      'I do not actively seek lawn care information',
    ],
  },
]

export function SurveyForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const q = questions[step]
  const isLast = step === questions.length - 1
  const progress = Math.round(((step + 1) / questions.length) * 100)
  const questionId = `survey-question-${q.id}`

  function handleSingle(qId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  function handleMulti(qId: string, value: string) {
    setAnswers((prev) => {
      const existing = (prev[qId] as string[]) || []
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value]

      return { ...prev, [qId]: updated }
    })
  }

  function canAdvance() {
    const a = answers[q.id]
    if (!a) return false
    if (Array.isArray(a)) return a.length > 0
    return true
  }

  async function handleNext() {
    setSubmitError('')

    if (isLast) {
      setSubmitting(true)

      try {
        await submitToGoogleScript('survey', {
          survey: 'Wave 1 baseline',
          responses: questions.map((question) => {
            const answer = answers[question.id]

            return {
              id: question.id,
              section: question.section,
              question: question.label,
              answer: Array.isArray(answer) ? answer.join('; ') : answer || '',
            }
          }),
          answers,
        })

        setSubmitted(true)
      } catch {
        setSubmitError(
          'Survey response could not be sent yet. Please try again in a moment.',
        )
      } finally {
        setSubmitting(false)
      }
    } else {
      setStep((s) => s + 1)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-7 shadow-[0_18px_50px_rgba(7,16,13,0.08)] lg:p-10">
        <div className="mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
            Response recorded
          </span>
        </div>

        <h3 className="mb-4 text-2xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#173027]">
          Thank you for completing the Wave 1 survey.
        </h3>

        <p className="mb-8 text-[15px] leading-[1.8] text-[#5e665d]">
          Your responses are part of the planned Wave 1 baseline dataset. Wave 2
          is planned for the same campaign area after the outreach sequence, so
          the team can compare awareness before and after.
        </p>

        <div className="border-t border-[#ded6c8] pt-6">
          <p className="text-[11px] leading-[1.65] text-[#657064]">
            This survey is part of the BLACKOUT initiative at West Shore Jr./Sr.
            High School in Melbourne, Florida. Responses are anonymous and are
            intended for community impact documentation and the county handoff.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] shadow-[0_18px_50px_rgba(7,16,13,0.08)]">
      <div
        className="relative h-1 bg-[#ded6c8]"
        role="progressbar"
        aria-label="Survey progress"
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-valuenow={step + 1}
      >
        <div
          className="absolute left-0 top-0 h-full bg-[#173027] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between border-b border-[#ded6c8] px-6 py-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
          {q.section}
        </span>

        <span className="font-mono text-[11px] text-[#6f8167]">
          {step + 1} / {questions.length}
        </span>
      </div>

      <div className="px-6 py-7 lg:px-8 lg:py-9">
        <p
          id={questionId}
          className="mb-8 text-[1.15rem] font-semibold leading-[1.45] tracking-[-0.035em] text-[#173027]"
        >
          {q.label}
        </p>

        <div
          className="space-y-3"
          role={q.type === 'checkbox' ? 'group' : 'radiogroup'}
          aria-labelledby={questionId}
        >
          {q.options.map((opt) => {
            const answer = answers[q.id]
            const isSelected =
              q.type === 'checkbox'
                ? Array.isArray(answer) && answer.includes(opt)
                : answer === opt

            return (
              <button
                key={opt}
                type="button"
                role={q.type === 'checkbox' ? 'checkbox' : 'radio'}
                aria-checked={isSelected}
                onClick={() =>
                  q.type === 'checkbox'
                    ? handleMulti(q.id, opt)
                    : handleSingle(q.id, opt)
                }
                className={`w-full rounded-2xl border px-4 py-4 text-left text-[13px] leading-[1.55] transition-all ${isSelected
                  ? 'border-[#173027] bg-[#173027] text-[#f5efe3] shadow-[0_12px_30px_rgba(7,16,13,0.12)]'
                  : 'border-[#ded6c8] bg-white/55 text-[#5e665d] hover:border-[#b7c5aa] hover:bg-white'
                  }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center border ${isSelected
                      ? 'border-[#f5efe3] bg-[#f5efe3]'
                      : 'border-[#6f8167]/45 bg-transparent'
                      } ${q.type === 'checkbox' ? 'rounded-[4px]' : 'rounded-full'}`}
                  >
                    {isSelected && (
                      <span
                        className={`h-1.5 w-1.5 bg-[#173027] ${q.type === 'checkbox' ? 'rounded-[2px]' : 'rounded-full'
                          }`}
                      />
                    )}
                  </span>

                  <span>{opt}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#ded6c8] px-6 py-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-[12px] font-semibold text-[#6f8167] transition-colors hover:text-[#173027] disabled:cursor-not-allowed disabled:opacity-40"
        >
          &larr; Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance() || submitting}
          className="rounded-full bg-[#173027] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5efe3] transition hover:bg-[#07100d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? 'Submitting...' : isLast ? 'Submit response' : 'Next question'}
        </button>
      </div>

      {submitError ? (
        <p
          className="border-t border-[#ded6c8] px-6 py-4 text-[12px] leading-6 text-[#8d4b36]"
          role="alert"
          aria-live="polite"
        >
          {submitError}
        </p>
      ) : null}
    </div>
  )
}
