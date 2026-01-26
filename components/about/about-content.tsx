"use client"

import { useEffect, useRef, useState } from "react"

const sections = [
  {
    content:
      "Urbexa Projects was formed with a clear intent: to bring structure, accountability, and continuity to residential construction. Over time, we observed that most housing projects do not fail due to lack of effort or intent, but due to fragmentation — approvals handled separately, planning disconnected from execution, construction split across multiple vendors, and responsibility diluted at every stage.",
  },
  {
    content:
      "What should be a controlled, linear process often becomes a series of handovers, assumptions, and compromises. Delays, cost overruns, and uncertainty are usually symptoms of this fragmented approach rather than isolated mistakes.",
  },
  {
    content:
      "Urbexa Projects was established to address this gap.",
  },
  {
    content:
      "From the outset, our focus has been on managing residential construction as a complete lifecycle rather than a collection of independent services. We operate across approvals, architectural planning, elevation development, civil construction, interiors, and final handover under a single execution framework. This allows scope, timelines, and responsibilities to remain aligned from the beginning of a project through its completion.",
  },
  {
    content:
      "Our role is not limited to building structures. We coordinate processes, decisions, and stakeholders so that each stage of work is informed by the next. Planning is developed with regulatory and execution realities in mind. Construction is carried out with clarity on design intent and finishing requirements. Interiors and final works are delivered without disconnect from earlier stages.",
  },
  {
    content:
      "By consolidating responsibility, Urbexa Projects reduces dependency on fragmented vendors and minimizes the uncertainty that homeowners typically face during construction. Each engagement is approached with defined scope, documented responsibilities, and a clear understanding of how one phase transitions into the next.",
  },
  {
    content:
      "Today, Urbexa Projects undertakes residential construction and development work across Bengaluru and select regions of Tamil Nadu. Projects range from execution-only engagements to complete cradle-to-completion delivery, depending on client requirements. Services may be engaged individually or as part of an integrated model, but the underlying principle remains the same: structured delivery, coordinated execution, and long-term accountability.",
  },
  {
    content:
      "Urbexa Projects continues to operate with the understanding that residential construction is not just about completion, but about responsibility that extends beyond handover. Our work is shaped by the belief that clarity at the start, discipline during execution, and accountability at the end are what ultimately define a successful project.",
  },
]

const visionSection = {
  title: "Looking Ahead",
  content:
    "Our vision extends beyond individual projects. We see a path from disciplined execution to strategic partnerships to development — all built on the foundation of trust and proven capability.",
}

export function AboutContent() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const [visionVisible, setVisionVisible] = useState(false)
  const sectionsRef = useRef<(HTMLParagraphElement | null)[]>([])
  const visionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers = sectionsRef.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, index])])
          }
        },
        { threshold: 0.4 }
      )

      observer.observe(ref)
      return observer
    })

    const visionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisionVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (visionRef.current) {
      visionObserver.observe(visionRef.current)
    }

    return () => {
      observers.forEach((observer) => observer?.disconnect())
      visionObserver.disconnect()
    }
  }, [])

  return (
    <div className="space-y-10">
      {/* Main content paragraphs */}
      {sections.map((section, index) => (
        <p
          key={index}
          ref={(el) => { sectionsRef.current[index] = el }}
          className={`text-lg text-muted-foreground leading-relaxed transition-all duration-[1.2s] ${
            visibleSections.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ 
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${index * 80}ms`
          }}
        >
          {section.content}
        </p>
      ))}

      {/* Vision section */}
      <div
        ref={visionRef}
        className={`mt-20 pt-16 relative transition-all duration-[1.2s] ${
          visionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Gradient separator */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, oklch(0.25 0.005 250) 0%, oklch(0.32 0.005 250) 50%, oklch(0.25 0.005 250) 100%)"
          }}
        />
        <h2 className="font-serif text-2xl font-light text-foreground mb-8">
          {visionSection.title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {visionSection.content}
        </p>
      </div>
    </div>
  )
}
