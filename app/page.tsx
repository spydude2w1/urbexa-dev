import Link from "next/link"
import { HeroSection } from "@/components/home/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Trust Signal Section */}
      <section className="py-16 md:py-20 border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="animate-settle opacity-0">
              <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-3">Operating Regions</h3>
              <p className="text-base text-foreground leading-relaxed">
                Bengaluru & Select Tamil Nadu Regions
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-100">
              <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-3">Project Types</h3>
              <p className="text-base text-foreground leading-relaxed">
                Residential & Select Commercial
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-200">
              <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-3">Delivery Model</h3>
              <p className="text-base text-foreground leading-relaxed">
                Execution-only and Cradle-to-Completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Projects Break Down */}
      <section className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-20 animate-settle opacity-0">
            Why Residential Projects Break Down
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="animate-settle opacity-0 animation-delay-200">
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Fragmented responsibility across multiple vendors and consultants
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Approvals handled separately from planning and design coordination
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Design disconnected from execution realities and site constraints
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-300">
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Too many vendors and handovers creating coordination gaps
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Hidden costs and pricing changes during project execution
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Lack of end-to-end accountability for project outcomes
              </p>
            </div>
          </div>
          <div className="max-w-3xl animate-settle opacity-0 animation-delay-400">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Urbexa Projects exists to manage residential construction as one continuous process rather than isolated services.
            </p>
          </div>
        </div>
      </section>
      
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Urbexa Projects operates as a single execution entity, managing the complete lifecycle of residential construction — from initial approvals through final handover.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our house construction approach in Bengaluru and select Tamil Nadu regions focuses on coordinated execution, where planning, approvals, material specification, and construction work as one integrated process rather than separate vendor relationships.
            </p>
          </div>
        </div>
      </section>

      {/* End-to-End Capability Overview */}
      <section className="py-32 md:py-40 section-gradient">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-24 animate-settle opacity-0">
            What We Take Responsibility For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="animate-settle opacity-0 animation-delay-200">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Cradle-to-Completion House Development</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete residential delivery managed under single accountability from approvals through final handover.
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-300">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Approvals & Regulatory</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Statutory clearances coordinated within project timeline and execution framework.
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-400">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Architectural Planning & Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Planning and design development aligned with site realities and regulatory requirements.
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-500">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Front Elevation Development</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Elevation and façade development focused on proportion and long-term architectural relevance.
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-600">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Residential Construction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Structural execution and finishing works delivered under coordinated trade management.
              </p>
            </div>
            <div className="animate-settle opacity-0 animation-delay-700">
              <h3 className="font-serif text-xl font-light text-foreground mb-6">Commercial Construction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Small to mid-scale commercial execution with defined scope and coordination requirements.
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
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-20 animate-settle opacity-0">
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

      {/* Our Work */}
      <section className="py-32 md:py-40 section-gradient">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 animate-settle opacity-0">
            Our Work
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-20 animate-settle opacity-0 animation-delay-200">
            Our Work reflects selected residential and commercial projects delivered under defined execution scope.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="animate-settle opacity-0 animation-delay-300">
              <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(239,210,162,0.1)]">
                <div className="relative aspect-4/3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-card to-muted" />
                  <div className="absolute inset-0 bg-background/20" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-light text-foreground mb-2">Private Residence</h3>
                  <p className="text-sm text-muted-foreground">Bengaluru • Residential</p>
                </div>
              </div>
            </div>
            <div className="animate-settle opacity-0 animation-delay-400">
              <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(239,210,162,0.1)]">
                <div className="relative aspect-4/3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-card to-muted" />
                  <div className="absolute inset-0 bg-background/20" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-light text-foreground mb-2">Weekend Retreat</h3>
                  <p className="text-sm text-muted-foreground">Tamil Nadu • Residential</p>
                </div>
              </div>
            </div>
            <div className="animate-settle opacity-0 animation-delay-500">
              <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(239,210,162,0.1)]">
                <div className="p-6 text-center">
                  <Link
                    href="/work"
                    className="inline-block text-sm tracking-widest uppercase text-gold pb-2 transition-all duration-500 hover:text-gold/80"
                    style={{
                      borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
                    }}
                    data-hoverable
                  >
                    View All Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl animate-settle opacity-0 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Residential construction is treated as a complete system, not a collection of isolated tasks.
            </p>
          </div>
          <div className="animate-settle opacity-0 animation-delay-200">
            <Link
              href="/contact"
              className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 transition-all duration-500 hover:text-gold"
              style={{
                borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
              }}
              data-hoverable
            >
              Discuss a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
