"use client"

import { useEffect, useRef, useState } from "react"

export function AudienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const forItems = [
    "First-time landowners",
    "NRIs planning construction in India",
    "Families building long-term homes",
    "Clients who value predictability and control",
  ]

  const notForItems = [
    "Lowest-price seekers",
    "Shortcut-driven projects",
    "Verbal-only construction deals",
  ]

  return (
    <section 
      ref={sectionRef} 
      className="relative py-28 md:py-36"
    >
      {/* Section gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, oklch(0.12 0.005 250) 0%, oklch(0.15 0.005 250) 50%, oklch(0.12 0.005 250) 100%)"
        }}
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-20 md:gap-28">
          {/* Who This Is For */}
          <div
            className={`transition-all duration-[1.2s] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-10">
              Who This Is For
            </h2>
            <ul className="space-y-5">
              {forItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-5 text-muted-foreground transition-all duration-[1s] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ 
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${index * 80 + 150}ms`
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who This Is Not For */}
          <div
            className={`transition-all duration-[1.2s] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ 
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.15s"
            }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-10">
              Who This Is Not For
            </h2>
            <ul className="space-y-5">
              {notForItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-5 text-muted-foreground/60 transition-all duration-[1s] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ 
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${index * 80 + 250}ms`
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-border/60 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
