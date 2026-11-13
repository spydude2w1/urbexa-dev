import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
  title: "Our Work — Urbexa Projects",
  description: "Selected residential and commercial construction projects delivered under defined execution scope in Bengaluru and Tamil Nadu.",
}

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <header className="mb-20 md:mb-24">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-settle opacity-0 mb-6">
            Our Work
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-settle opacity-0 animation-delay-200">
            Selected projects delivered under defined execution scope.
          </p>
        </header>

        {/* Project Grid */}
        <section className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group animate-settle opacity-0"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                data-hoverable
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden hover-lift">
                  {/* Hero Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-block px-3 py-1 text-xs tracking-wide uppercase bg-background/80 backdrop-blur-sm text-foreground rounded-full border border-border/50">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-light text-foreground mb-2 group-hover:text-gold"
                      style={{
                        transition: "color var(--motion-duration-normal) var(--motion-ease-out)"
                      }}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center text-xs text-gold tracking-wide uppercase group-hover:underline">
                      View Project
                      <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Closing Note */}
        <section className="border-t border-border pt-16 md:pt-20">
          <div className="max-w-2xl animate-settle opacity-0 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This archive represents selected projects executed under defined scope and delivery frameworks.
            </p>
          </div>
          <div className="animate-settle opacity-0 animation-delay-200">
            <Link
              href="/contact"
              className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 hover:text-gold"
              style={{
                borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
                transition: "color var(--motion-duration-normal) var(--motion-ease-out)"
              }}
              data-hoverable
            >
              Contact Urbexa Projects
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
