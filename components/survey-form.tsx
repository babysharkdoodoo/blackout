'use client';

import { useState } from 'react';

type Answers = Record<string, string | string[]>;

const questions = [
  {
    id: 'q1',
    section: 'Section A: Awareness',
    label: 'Are you aware that Brevard County has an ordinance restricting fertilizer application during certain months of the year?',
    type: 'radio' as const,
    options: ['Yes, I am aware of it', 'I have heard of something like this but am not sure of the details', 'No, I was not aware of any such ordinance'],
  },
  {
    id: 'q2',
    section: 'Section A: Awareness',
    label: 'Do you know during which months the Brevard County fertilizer blackout period is in effect?',
    type: 'radio' as const,
    options: ['Yes, I know the exact months', 'I have a general idea but am not certain', 'No, I do not know'],
  },
  {
    id: 'q3',
    section: 'Section B: Behavior',
    label: 'Does your household apply fertilizer to a lawn, garden, or landscaped area?',
    type: 'radio' as const,
    options: ['Yes, we apply it ourselves', 'Yes, we hire a lawn service that applies it', 'No, we do not apply fertilizer', 'Not applicable: no lawn or landscaped area'],
  },
  {
    id: 'q4',
    section: 'Section B: Behavior',
    label: 'During which months does your household typically apply fertilizer? (Select all that apply)',
    type: 'checkbox' as const,
    options: ['January - February', 'March - April', 'May', 'June - July', 'August - September', 'October - November', 'December', 'I am not sure / varies'],
  },
  {
    id: 'q5',
    section: 'Section B: Behavior',
    label: 'Now that you know the ordinance is in effect from June 1 through September 30, how likely are you to change your fertilizer application timing?',
    type: 'radio' as const,
    options: [
      'Very likely: I will stop applying fertilizer during those months',
      'Somewhat likely: I will try to adjust',
      'Unlikely: my current timing will not change',
      'Not applicable: I do not apply fertilizer during those months anyway',
    ],
  },
  {
    id: 'q6',
    section: 'Section C: Sources',
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
    section: 'Section C: Sources',
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
];

export function SurveyForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const q = questions[step];
  const isLast = step === questions.length - 1;
  const progress = Math.round(((step) / questions.length) * 100);

  function handleSingle(qId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  function handleMulti(qId: string, value: string) {
    setAnswers((prev) => {
      const existing = (prev[qId] as string[]) || [];
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [qId]: updated };
    });
  }

  function canAdvance() {
    const a = answers[q.id];
    if (!a) return false;
    if (Array.isArray(a)) return a.length > 0;
    return true;
  }

  function handleNext() {
    if (isLast) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  if (submitted) {
    return (
      <div className="border border-black/10 bg-white p-8 lg:p-10">
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.18em] text-black/40 uppercase">Response recorded</span>
        </div>
        <h3 className="font-serif text-2xl text-black mb-4 leading-[1.25]">
          Thank you for completing the Wave 1 survey.
        </h3>
        <p className="text-[15px] text-black/70 leading-[1.8] mb-8">
          Your responses are part of the pre-intervention baseline dataset. Wave 2 will be
          administered after all BLACKOUT field activities are complete. The gap between
          the two waves is the primary outcome metric for this initiative.
        </p>
        <div className="border-t border-black/10 pt-6">
          <p className="text-[11px] text-black/50 leading-[1.65]">
            This survey is administered as part of the BLACKOUT initiative at West Shore Jr./Sr. High School,
            Melbourne, Florida. Responses are anonymous. Data is used for community impact documentation
            and submitted as part of the county program handoff package.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-black/10 bg-white">
      {/* Progress bar */}
      <div className="h-px bg-black/10 relative">
        <div
          className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
        <span className="text-[10px] tracking-[0.18em] text-black/50 uppercase">{q.section}</span>
        <span className="font-mono text-[11px] text-black/40">
          {step + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="px-6 lg:px-8 py-7 lg:py-9">
        <p className="text-[15px] text-black leading-[1.7] mb-8">{q.label}</p>

        <div className="space-y-2.5">
          {q.options.map((opt) => {
            const answer = answers[q.id];
            const isSelected = q.type === 'checkbox'
              ? Array.isArray(answer) && answer.includes(opt)
              : answer === opt;

            return (
              <button
                key={opt}
                onClick={() =>
                  q.type === 'checkbox' ? handleMulti(q.id, opt) : handleSingle(q.id, opt)
                }
                className={`w-full text-left px-4 py-3.5 border transition-all text-[13px] leading-[1.55] ${isSelected
                    ? 'border-black/70 bg-black/5 text-black'
                    : 'border-black/10 text-black/70 hover:border-black/30 hover:bg-black/5'
                  }`}
              >
                <span className="flex items-start gap-3">
                  <span className={`shrink-0 mt-[2px] w-3.5 h-3.5 border flex items-center justify-center ${isSelected ? 'border-black bg-black' : 'border-black/30'
                    } ${q.type === 'checkbox' ? '' : 'rounded-full'}`}>
                    {isSelected && (
                      <span className={`${q.type === 'checkbox' ? 'w-1.5 h-1.5 bg-white' : 'w-1.5 h-1.5 rounded-full bg-white'}`} />
                    )}
                  </span>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-black/10">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-[12px] text-black/50 hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &larr; Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canAdvance()}
          className="px-5 py-2 text-[12px] tracking-wide uppercase border border-black/70 text-black hover:bg-black hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLast ? 'Submit response' : 'Next question'}
        </button>
      </div>
    </div>
  );
}