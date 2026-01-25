"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Understanding intent and constraints",
    description:
      "We begin by listening carefully to understand your vision, requirements, site conditions, and realistic constraints before any commitments are made.",
  },
  {
    number: "02",
    title: "Defining scope and responsibilities",
    description:
      "Clear documentation of what will be built, who is responsible for what, and how decisions will be made throughout the project.",
  },
  {
    number: "03",
    title: "Execution control and coordination",
    description:
      "Disciplined project management with systematic oversight of all trades, materials, and timelines to maintain quality and momentum.",
  },
  {
    number: "04",
    title: "Cost and timeline discipline",
    description:
      "Transparent budgeting, regular reporting, and proactive communication when adjustments are needed — no surprises.",
  },
  {
    number: "05",
    title: "Long-term relationship mindset",
    description:
      "We build with the understanding that our reputation depends on your satisfaction, not just at handover, but years later.",
  },
]

export function ProcessSteps() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = stepsRef.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => [...new Set([...prev, index])])
          }
        },
        { threshold: 0.2 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div
          key={index}
          ref={(el) => { stepsRef.current[index] = el }}
          className={`relative py-12 md:py-16 transition-all duration-[1.2s] ${
            visibleSteps.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ 
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${index * 50}ms`
          }}
        >
          {/* Separator line */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, oklch(0.25 0.005 250) 0%, oklch(0.30 0.005 250) 30%, oklch(0.25 0.005 250) 100%)"
            }}
          />

          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14">
            <div className="flex-shrink-0">
              <span className="font-serif text-4xl md:text-5xl font-light text-muted-foreground/30">
                {step.number}
              </span>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-light text-foreground">
                {step.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Closing statement */}
      <div
        className={`pt-16 md:pt-20 transition-all duration-[1.2s] ${
          visibleSteps.length === steps.length
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{ 
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "0.3s"
        }}
      >
        {/* Final separator */}
        <div 
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, oklch(0.25 0.005 250) 0%, oklch(0.30 0.005 250) 30%, oklch(0.25 0.005 250) 100%)"
          }}
        />
        <p className="text-lg text-foreground/80 font-light leading-relaxed max-w-xl pt-16">
          We take on limited projects to maintain control and accountability.
        </p>
      </div>
    </div>
  )
}
