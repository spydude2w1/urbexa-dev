"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import project1Img from "./project-1.png"
import proj2 from "./project-2.jpg"
import proj3 from "./project-3.png"
import proj4 from "./project-4.png"
import proj5 from "./project-5.png"

const projects = [
  
  {
    id: 1,
    title: "Private Residence",
    type: "Ground-up Construction",
    scope: "4,200 sq ft",
    year: "2024",
  image: project1Img,
    featured: true,
  },
  {
    id: 2,
    title: "Weekend Retreat",
    type: "Renovation + Extension",
    scope: "2,800 sq ft",
    year: "2024",
    image: proj2,
    featured: false,
  },
  {
    id: 3,
    title: "Family Compound",
    type: "Multi-structure Development",
    scope: "8,600 sq ft",
    year: "2023",
    image: proj3,
    featured: true,
  },
  {
    id: 4,
    title: "Urban Townhouse",
    type: "Complete Renovation",
    scope: "3,100 sq ft",
    year: "2023",
    image: proj4,
    featured: false,
  },
  {
    id: 5,
    title: "Hillside Villa",
    type: "Ground-up Construction",
    scope: "5,400 sq ft",
    year: "2023",
    image: proj5,
    featured: true,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative ${project.featured ? "md:col-span-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hoverable
    >
      <div
        className={`relative overflow-hidden transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{
          transitionDelay: `${index * 100}ms`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Image container */}
        <div 
          className={`relative aspect-4/3 ${project.featured ? "md:aspect-video" : ""} overflow-hidden bg-card`}
        >
          {/* Image or placeholder */}
          <div 
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority={project.featured}
              />
            ) : (
              <div 
                className="w-full h-full"
                style={{
                  background: `linear-gradient(135deg, 
                    oklch(0.18 0.005 250) 0%, 
                    oklch(0.22 0.005 250) 50%,
                    oklch(0.16 0.005 250) 100%
                  )`,
                }}
              />
            )}

            {/* Architectural placeholder pattern (overlay) */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.2" />
                <line x1="20" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="0.2" />
                <line x1="40" y1="100" x2="100" y2="40" stroke="currentColor" strokeWidth="0.2" />
                <rect x="60" y="30" width="25" height="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
              </svg>
            </div>
          </div>

          {/* Hover overlay */}
          <div 
            className="absolute inset-0 bg-background/20 transition-opacity duration-500"
            style={{ opacity: isHovered ? 0 : 0.3 }}
          />

          {/* Gold accent line on hover */}
          <div 
            className="absolute bottom-0 left-0 h-0.5 transition-all duration-700 ease-out"
            style={{
              width: isHovered ? "100%" : "0%",
              backgroundColor: "var(--gold)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Project info */}
        <div className="mt-5 space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 
              className="font-serif text-xl md:text-2xl font-light transition-colors duration-500"
              style={{ color: isHovered ? "var(--gold)" : "var(--foreground)" }}
            >
              {project.title}
            </h3>
            <span className="text-sm text-muted-foreground/60 tabular-nums">
              {project.year}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{project.type}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{project.scope}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WorkGallery() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 pb-24 md:pb-32">
      {/* Gallery grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-24 pt-16 border-t border-border/30">
        <p className="text-muted-foreground/70 text-sm max-w-lg">
          Each project represents a commitment to clarity, control, and long-term value. 
          We work with a limited number of clients to ensure focused attention on execution.
        </p>
      </div>
    </section>
  )
}
