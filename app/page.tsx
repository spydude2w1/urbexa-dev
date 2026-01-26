import Link from "next/link"
import { HeroSection } from "@/components/home/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Core Positioning */}
      <section className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-20 animate-settle opacity-0">
            From Concept to Completion
          </h2>
          <div className="max-w-3xl animate-settle opacity-0 animation-delay-200">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Residential construction involves multiple stages, authorities, consultants, and trades. When handled in isolation, this fragmentation creates delays, cost overruns, and accountability gaps.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Urbexa Projects operates as a single execution entity, managing the complete lifecycle of residential construction — from initial approvals through final handover.
            </p>
          </div>
        </div>
      </section>

      {/* End-to-End Capability Overview */}
      <section className="py-32 md:py-40 section-gradient">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-24 animate-settle opacity-0">
            Complete Residential Delivery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="animate-settle opacity-0 animation-delay-200">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Approvals & Regulatory</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                BBMP, BDA, BMRDA, DTCP, HNTDA
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Statutory approvals aligned to project scope and region
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-300">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Planning & Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Architectural planning
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                3D Elevation development
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Design aligned with site constraints and client preferences
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-400">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Civil Construction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Structural execution
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Civil and finishing works
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trade coordination and quality control
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-500">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Interiors & Fit-Out</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Interior execution
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Fixed furniture and finishes
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Final detailing and coordination
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-600">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Completion & Handover</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Final checks and closures
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Documentation support
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Project completion alignment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Framework */}
      <section className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-24 animate-settle opacity-0">
            How Urbexa Projects Delivers
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-border"></div>
            <div className="space-y-16">
              <div className="relative flex gap-8 animate-settle opacity-0 animation-delay-200">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-card border border-gold flex items-center justify-center z-10">
                  <span className="text-sm font-light text-gold">01</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl font-light text-foreground mb-4">Definition</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Intent, site constraints, approvals, and scope are established before commitments are made.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-8 animate-settle opacity-0 animation-delay-300">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-card border border-gold flex items-center justify-center z-10">
                  <span className="text-sm font-light text-gold">02</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl font-light text-foreground mb-4">Planning</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    3D Elevation and House Plan, Floor plans drawings, and visualizations are developed in alignment with regulatory and execution realities.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-8 animate-settle opacity-0 animation-delay-400">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-card border border-gold flex items-center justify-center z-10">
                  <span className="text-sm font-light text-gold">03</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl font-light text-foreground mb-4">Execution</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Civil works and trades are coordinated through a defined execution framework.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-8 animate-settle opacity-0 animation-delay-500">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-card border border-gold flex items-center justify-center z-10">
                  <span className="text-sm font-light text-gold">04</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl font-light text-foreground mb-4">Finishing</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Interiors and final works are delivered in alignment with approved scope and design intent.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-8 animate-settle opacity-0 animation-delay-600">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-card border border-gold flex items-center justify-center z-10">
                  <span className="text-sm font-light text-gold">05</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl font-light text-foreground mb-4">Completion</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Projects are closed with documentation, checks, and long-term accountability in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accountability & Control */}
      <section className="py-32 md:py-40 section-gradient">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-11 animate-settle opacity-0">
            Structured Responsibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-settle opacity-0 animation-delay-200">
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Single-point execution responsibility
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Defined scope at each stage
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Controlled transitions between phases
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-300">
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Reduced dependency on fragmented vendors
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Long-term relationship mindset
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Scope */}
      <section className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-13 animate-settle opacity-0">
            Areas of Operation
          </h2>
          <div className="max-w-2xl animate-settle opacity-0 animation-delay-200">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Urbexa Projects currently undertakes residential construction in:
            </p>
            <ul className="text-base text-muted-foreground leading-relaxed space-y-3 mb-8">
              <li>• Bengaluru and the metropolitan region</li>
              <li>• Select regions of Tamil Nadu</li>
            </ul>
            <p className="text-base text-muted-foreground leading-relaxed">
              Project scope and approvals handled are aligned with regional regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl animate-settle opacity-0">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Residential construction is treated as a complete system, not a collection of isolated tasks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
