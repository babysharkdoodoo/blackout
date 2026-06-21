"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteLayout } from "@/components/site-layout";

const heroImages = [
  {
    src: "/heroes/team-1.webp",
    label: "Student planning session",
  },
  {
    src: "/heroes/team-2.webp",
    label: "Project planning",
  },
  {
    src: "/heroes/team-3.webp",
    label: "Team discussion",
  },
  {
    src: "/heroes/team-4.webp",
    label: "Operations plan",
  },
];

const snapshot = [
  {
    label: "Team",
    value: "5 students",
    note: "Small enough for clear ownership.",
  },
  {
    label: "Status",
    value: "In planning",
    note: "Field work is being prepared around the blackout window.",
  },
  {
    label: "Launch",
    value: "Summer 2026",
    note: "Aligned with the fertilizer blackout window.",
  },
  {
    label: "School",
    value: "West Shore",
    note: "Melbourne, Brevard County, Florida.",
  },
];

const projectNotes = [
  "Planned as a full project cycle, not a last-minute campaign.",
  "Wave 1 closes before any drain markings, retail tags, or public outreach begin.",
  "Every role owns a specific part of the field system and the records attached to it.",
];

const roles = [
  {
    name: "Student Name",
    role: "Project Lead",
    summary:
      "Coordinates the full BLACKOUT timeline and keeps the team aligned with county-facing requirements.",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80",
    links: [
      { label: "Project plan", href: "/impact" },
      { label: "County contact log", href: "/contact" },
    ],
    work: "Owns the timeline, county correspondence, team coordination, and public-facing project structure.",
    deliverables:
      "Master schedule, meeting notes, county communication record, and final handoff coordination.",
  },
  {
    name: "Student Name",
    role: "Survey Lead",
    summary:
      "Designs the baseline and follow-up surveys so the project can measure awareness before and after outreach.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    links: [
      { label: "Survey instrument", href: "/survey" },
      { label: "Awareness report", href: "/impact" },
    ],
    work: "Builds both survey waves, manages distribution, tracks responses, and prepares the compliance gap analysis.",
    deliverables:
      "Wave 1 dataset, Wave 2 dataset, response logs, and pre/post awareness report.",
  },
  {
    name: "Student Name",
    role: "Retail Partnership Lead",
    summary:
      "Builds store partnerships and manages the planned shelf-tag rollout where fertilizer purchasing decisions happen.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    links: [
      { label: "Partner packet", href: "/retail-partners" },
      { label: "Store reach log", href: "/impact" },
    ],
    work: "Prepares store outreach, partner agreements, and the planned Manatee Safe shelf tag rollout.",
    deliverables:
      "Partner agreements, planned tag placement photos, weekly reach logs, and partner summary.",
  },
  {
    name: "Student Name",
    role: "Field Operations Lead",
    summary:
      "Leads city-approved drain mapping and planned marker records so fieldwork creates usable GPS and photo documentation.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    links: [
      { label: "Drain map", href: "/storm-drains" },
      { label: "Field protocol", href: "/storm-drains" },
    ],
    work: "Maps approved drains, prepares GPS data, calculates mortality distance, and coordinates marking sessions.",
    deliverables:
      "Drain database, before/after photo archive, marker notes, and county-ready map layer.",
  },
  {
    name: "Student Name",
    role: "Documentation Lead",
    summary:
      "Maintains the project archive and converts field records into a clean handoff package for future teams.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    links: [
      { label: "Photo archive", href: "/resources" },
      { label: "Replication guide", href: "/resources" },
    ],
    work: "Keeps files organized, uploads field photos, maintains records, and prepares the final archive.",
    deliverables:
      "Shared drive structure, photo naming system, website updates, and replication guide.",
  },
];

const principles = [
  {
    title: "Existing law, new visibility",
    body: "BLACKOUT does not ask the county to create a new ordinance. It makes a real rule easier to see, understand, and follow.",
  },
  {
    title: "Evidence first",
    body: "The project will rely on survey data, retail reach, drain documentation, and partner records instead of broad claims.",
  },
  {
    title: "Built to keep going",
    body: "The handoff package, field protocols, and documentation structure are designed so the work can continue after the team steps away.",
  },
];

const process = [
  {
    n: "01",
    title: "Find the gap",
    body: "The ordinance already protects the lagoon, but public awareness is weak. The first job is to measure that gap clearly.",
  },
  {
    n: "02",
    title: "Make it visible",
    body: "The team is preparing surveys, shelf tags, and drain markers to place the ordinance where people make decisions.",
  },
  {
    n: "03",
    title: "Document everything",
    body: "Every planned field activity creates records: forms, photos, partner notes, GPS coordinates, and session logs.",
  },
  {
    n: "04",
    title: "Leave something usable",
    body: "The planned final result is a repeatable program and a handoff package that can keep working without the original team.",
  },
];

const contextRows = [
  {
    label: "Institution",
    value: "West Shore Jr./Sr. High School",
  },
  {
    label: "Location",
    value: "Melbourne, Brevard County, Florida",
  },
  {
    label: "Watershed",
    value: "Indian River Lagoon",
  },
  {
    label: "Field season",
    value: "June 1 - September 30, 2026",
  },
];

const closingPoints = [
  "Every deliverable has a named owner.",
  "Every field activity has a protocol.",
  "Every dataset has a methodology note.",
  "Every partner interaction is logged.",
];

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

function LightSection({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="bg-[#f7f2e8] px-6 py-16 text-[#173027] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function DarkSection({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="bg-[#07100d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div>
      <Reveal>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${dark ? "text-[#a8b98c]" : "text-[#6f8167]"
            }`}
        >
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={`mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em] ${dark ? "text-[#f5efe3]" : "text-[#173027]"
            }`}
        >
          {title}
        </h2>
      </Reveal>

      {body ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-2xl text-base leading-8 sm:text-[1.05rem] ${dark ? "text-white/62" : "text-[#5e665d]"
              }`}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return

      setIndex((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const activeImage = heroImages[index];

  return (
    <section
      id="top"
      className="relative isolate h-[100svh] overflow-hidden bg-[#07100d] text-white"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage.src}
            src={activeImage.src}
            alt=""
            draggable={false}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? { opacity: 0.34, scale: 1, filter: 'none' } : { opacity: 0, scale: 1.03, filter: 'blur(14px)' }}
            animate={{
              opacity: 0.34,
              scale: reduceMotion ? 1 : 1.07,
              filter: reduceMotion ? 'none' : 'blur(0px)',
            }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 5.2, ease: "easeOut" },
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#07100d] via-[#07100d]/82 to-[#07100d]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07100d] via-transparent to-[#07100d]/20" />
      </div>

      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.14 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 sm:px-10 lg:px-12"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9c89c]"
        >
          Team
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Five students.
          <br />
          Defined roles.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          Five students own defined roles tied to the planned field sequence and
          handoff records.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="#roles"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Roles
          </Link>

          <Link
            href="#context"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Context
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 flex max-w-2xl flex-wrap gap-2 text-xs text-white/58"
        >
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Student-led
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            County-facing
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Built for handoff
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-6 right-6 z-10 mx-auto flex max-w-6xl items-center justify-between text-xs text-white/42 sm:left-10 sm:right-10 lg:left-12 lg:right-12">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeImage.label}
            initial={{ opacity: 0, y: 4, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -4, filter: 'blur(6px)' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {activeImage.label}
          </motion.span>
        </AnimatePresence>

        <div className="flex gap-2">
          {heroImages.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show ${image.label}`}
              aria-pressed={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${imageIndex === index
                  ? "w-8 bg-[#f5efe3]"
                  : "w-3 bg-white/25 hover:bg-white/45"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Snapshot"
              title="Clear team structure."
              body="Each student has a defined role, planned field responsibilities, and documentation to produce for the final handoff."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
                {snapshot.map((item) => (
                  <div key={item.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                      {item.label}
                    </p>

                    <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#173027]">
                      {item.value}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#657064]">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                The team is small on purpose: fewer people, clearer ownership,
                cleaner records, and a stronger handoff.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="roles">
          <SectionHeader
            dark
            eyebrow="Role map"
            title="Roles own deliverables."
            body="The team structure prevents responsibilities from drifting. Each person has a dedicated section with their name, picture, summary, links, responsibilities, and deliverables."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((member, index) => (
              <Reveal key={member.role} delay={index * 0.05}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition hover:border-white/20 hover:bg-white/[0.055]">
                  <div className="relative h-64 overflow-hidden bg-white/[0.04]">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={800}
                      className="h-full w-full object-cover opacity-90 transition duration-500 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07100d]/82 via-[#07100d]/10 to-transparent" />

                    <p className="absolute left-5 top-5 font-mono text-xs text-[#f5efe3]/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                      {member.name}
                    </p>

                    <h3 className="mt-2 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                      {member.role}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/62">
                      {member.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {member.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-semibold text-white/64 transition hover:border-white/30 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                        Work owned
                      </p>

                      <p className="mt-2 text-sm leading-7 text-white/56">
                        {member.work}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                        Deliverables
                      </p>

                      <p className="mt-2 text-sm leading-7 text-white/52">
                        {member.deliverables}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="context">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Institutional context"
              title="Built for public work."
              body="BLACKOUT is based at West Shore Jr./Sr. High School and operates around Brevard County's fertilizer blackout window."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Operational facts
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {contextRows.map((item, index) => (
                    <div
                      key={item.label}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#6f8167]">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c8576]">
                          {item.label}
                        </p>

                        <p className="mt-1 text-sm font-semibold leading-7 text-[#173027]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {projectNotes.map((note, index) => (
              <Reveal key={note} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6">
                  <p className="font-mono text-xs text-[#6f8167]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-[#5e665d]">
                    {note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="principles">
          <SectionHeader
            dark
            eyebrow="Operating principles"
            title="Student-led, structured."
            body="The project uses a simple operating frame: make the existing rule visible, measure the work clearly, and leave behind materials that can keep working."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="sequence">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Sequence"
              title="Simple work order."
              body="The sequence matters because it protects the baseline and keeps the final result credible. The team does not start with outreach. It starts with measurement."
            />

            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {process.map((step, index) => (
                <Reveal key={step.n} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_11rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs text-[#6f8167]">{step.n}</p>

                    <h3 className="text-sm font-semibold text-[#173027]">
                      {step.title}
                    </h3>

                    <p className="max-w-3xl text-sm leading-7 text-[#5e665d]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </LightSection>

        <DarkSection id="closing">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Closing"
              title="Complete program."
              body="BLACKOUT is structured around named owners, field protocols, datasets, partner records, and a handoff plan."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  What this structure protects
                </p>

                <div className="mt-5 divide-y divide-[#d8d0c2]">
                  {closingPoints.map((point, index) => (
                    <div
                      key={point}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#607357]">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <p className="text-sm leading-7 text-[#526052]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
              <Link
                href="/survey"
                className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
              >
                See the survey work
              </Link>

              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/72 transition hover:border-white/30 hover:text-white"
              >
                View shared project files
              </Link>
            </div>
          </Reveal>
        </DarkSection>
      </main>
    </SiteLayout>
  );
}

export default TeamPageClient;
