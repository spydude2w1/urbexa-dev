"use client"

import { useEffect, useRef, useState } from "react"

const sections = [
  {
    content:
      "Construction in India is chaotic. Timelines slip, budgets balloon, and too many projects begin without the clarity they need to succeed.",
  },
  {
    content:
      "Most problems don't start on the construction site — they start before work begins. Poor planning, unclear agreements, and misaligned expectations set the foundation for failure.",
  },
  {
    content:
      "BK Buildworks exists to change this. We focus on bringing clarity, structure, and calm execution to construction projects that matter.",
  },
  {
    content:
      "Our approach is simple: understand before we act, document before we build, and communicate before problems arise. This discipline creates predictability in an industry known for surprises.",
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
