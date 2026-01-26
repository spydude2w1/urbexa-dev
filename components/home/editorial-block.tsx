"use client"

import { useEffect, useRef, useState } from "react"

export function EditorialBlock() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36"
    >
      {/* Subtle section gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, oklch(0.12 0.005 250) 0%, oklch(0.14 0.005 250) 30%, oklch(0.14 0.005 250) 70%, oklch(0.12 0.005 250) 100%)"
        }}
      />

      {/* Top separator - soft gradient line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, oklch(0.30 0.005 250) 50%, transparent 100%)"
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <div
          className={`transition-all duration-[1.2s] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-10 leading-relaxed">
            What This Site Is
          </h2>
          <div className="space-y-7 text-muted-foreground leading-relaxed">
            <p 
              className={`text-lg transition-all duration-[1.2s] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.1s"
              }}
            >
              This is not a contractor advertisement.
            </p>
            <p
              className={`transition-all duration-[1.2s] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.2s"
              }}
            >
              Urbexa Projects exists to bring clarity to construction — before money 
              is committed and mistakes are made.
            </p>
            <p
              className={`transition-all duration-[1.2s] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.3s"
              }}
            >
              We share structured knowledge, practical frameworks, and honest insight 
              because we believe informed clients build better projects.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, oklch(0.30 0.005 250) 50%, transparent 100%)"
        }}
      />
    </section>
  )
}
