"use client"

import { Metadata } from "next"
import { useState } from "react"
import Link from "next/link"

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const services = [
    {
      id: "approvals",
      title: "Approvals & Regulatory",
      summary: "BBMP, BDA, and DTCP approval support aligned with project scope",
      content: `Statutory approval support for residential construction projects in Bengaluru and Tamil Nadu regions.

Includes coordination and procedural support for:
• BBMP plan approval and sanction processes
• BDA plan sanction for residential developments
• DTCP approval procedures in Tamil Nadu
• HNTDA coordination for Hosur region projects
• B Katha to A Katha conversion support
• Property title verification assistance

Approval timelines and outcomes remain subject to statutory authority processes and site-specific conditions.`
    },
    {
      id: "planning",
      title: "Architectural Planning & Design",
      summary: "Vastu-compliant planning aligned with site constraints and regulations",
      content: `Architectural planning and design development for independent house construction, aligned with site constraints, regulatory conditions, and execution feasibility.

Scope includes:
• Floor planning and layout optimization
• Vastu-compliant design integration
• Regulatory-compliant working drawings
• Structural coordination and planning
• Site analysis and constraint mapping
• Design-to-construction coordination

Planning integrates approval requirements with construction realities to reduce execution conflicts.`
    },
    {
      id: "elevation",
      title: "Front Elevation Development",
      summary: "Contemporary elevation design focused on proportion and context",
      content: `Elevation and façade development for luxury villa construction and independent houses, focused on proportion, materiality, and long-term architectural relevance.

Scope includes:
• Contemporary elevation concepts
• Massing and proportion studies
• Material strategy and specification
• Context-sensitive façade development
• Integration with structural requirements

Elevation development prioritizes timeless design over trending aesthetics.`
    },
    {
      id: "residential",
      title: "Residential Construction",
      summary: "Independent house builders specializing in quality execution",
      content: `Structured execution of independent house construction and residential buildings under comprehensive quality control frameworks.

Scope includes:
• Civil and structural execution
• Trade coordination and supervision
• Material quality control and specification
• Construction timeline monitoring
• Site safety and compliance management
• Progress documentation and reporting

Construction approach emphasizes material quality and execution discipline over cost reduction.`
    },
    {
      id: "commercial",
      title: "Commercial Construction",
      summary: "Small to mid-scale commercial building execution with residential standards",
      content: `Execution of small to mid-scale commercial buildings with defined scope and coordination requirements, applying residential construction quality standards.

Suitable for:
• Office buildings and professional spaces
• Mixed-use residential-commercial structures
• Support infrastructure for residential developments
• Institutional and utility buildings

Commercial projects maintain the same quality and coordination approach as residential work.`
    },
    {
      id: "cradle",
      title: "Turnkey House Construction",
      summary: "Complete residential delivery under single accountability framework",
      content: `Complete turnkey house construction managed under a single execution framework, eliminating fragmentation across project stages.

Includes:
• Statutory approvals and regulatory coordination
• Architectural planning and design development
• Civil construction and structural execution
• Front elevation and façade development
• Interior execution and finishing works
• Final handover and documentation

This integrated approach reduces vendor coordination gaps and maintains single-point accountability from concept to completion.`
    }
  ]

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <header className="mb-24 md:mb-9">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-settle opacity-0 mb-8">
            Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl animate-settle opacity-0 animation-delay-200">
            Services offered to cater every client needs, from individual scopes to integrated residential delivery.
          </p>
        </header>

        {/* Introductory Context */}
        <section className="mb-32 md:mb-40">
          <div className="max-w-3xl animate-settle opacity-0 animation-delay-300">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Urbexa Projects provides clearly defined construction services across approvals, planning, and execution for residential projects in Bengaluru and select Tamil Nadu regions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each service can operate independently or as part of an integrated turnkey construction framework, maintaining quality standards and execution discipline throughout.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-32 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <div key={service.id} className="animate-settle opacity-0" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                <div 
                  className="bg-card border border-border rounded-lg p-8 transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(239,210,162,0.1)] cursor-pointer"
                  onClick={() => toggleService(service.id)}
                >
                  <h3 className="font-serif text-xl font-light text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.summary}
                  </p>
                  <span className="text-xs text-gold tracking-wide uppercase">
                    View scope
                  </span>
                </div>
                
                {/* Expandable Panel */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-out ${
                    expandedService === service.id ? 'max-h-96 mt-6' : 'max-h-0'
                  }`}
                >
                  <div className="bg-card/50 border border-border/50 rounded-lg p-8">
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {service.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Our Approach Is Different */}
        <section className="mb-32 md:mb-40">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-16 animate-settle opacity-0">
              Why Our Approach Is Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div className="animate-settle opacity-0 animation-delay-200">
                <h3 className="font-serif text-xl font-light text-foreground mb-6">Limited Concurrent Projects</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  We intentionally limit the number of projects handled simultaneously to ensure direct oversight and quality control at each site.
                </p>
                <h3 className="font-serif text-xl font-light text-foreground mb-6">Market-Aligned Pricing</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Construction costs reflect actual material quality and execution standards rather than artificially reduced per-square-foot pricing that compromises scope or quality.
                </p>
              </div>
              <div className="animate-settle opacity-0 animation-delay-300">
                <h3 className="font-serif text-xl font-light text-foreground mb-6">Transparent Scope Definition</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Project scope is defined clearly upfront, avoiding hidden exclusions or scope changes that emerge during execution.
                </p>
                <h3 className="font-serif text-xl font-light text-foreground mb-6">Quality Materials as Standard</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Material specifications prioritize proven, high-grade options as the baseline rather than offering quality as an upgrade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded FAQ Section */}
        <section className="mb-32 md:mb-40">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-16 animate-settle opacity-0">
              Common Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-settle opacity-0 animation-delay-200">
                <h3 className="font-serif text-lg font-light text-foreground mb-4">
                  Why does Urbexa limit concurrent projects?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We intentionally limit project volume to ensure direct oversight, consistent quality control, and immediate response to site decisions across all active construction sites.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-settle opacity-0 animation-delay-300">
                <h3 className="font-serif text-lg font-light text-foreground mb-4">
                  How are construction costs determined?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pricing reflects actual material specifications, supervision standards, and comprehensive scope without hidden exclusions or artificially reduced per-square-foot rates.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-settle opacity-0 animation-delay-400">
                <h3 className="font-serif text-lg font-light text-foreground mb-4">
                  What makes turnkey construction different?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Integrated delivery eliminates vendor fragmentation by coordinating approvals, planning, construction, and finishing under single accountability rather than separate contracts.
                </p>
              </div>
            </div>
            <div className="mt-8 animate-settle opacity-0 animation-delay-500">
              <a
                href="/faq"
                className="text-sm text-gold hover:text-gold/80"
                style={{
                  transition: "color var(--motion-duration-normal) var(--motion-ease-out)"
                }}
              >
                View all questions →
              </a>
            </div>
          </div>
        </section>

        {/* Engagement Model */}
        <section className="mb-24 md:mb-32 section-gradient py-20 md:py-24 -mx-6 md:-mx-8 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 animate-settle opacity-0">
              Engagement Structure
            </h2>
            <div className="max-w-3xl animate-settle opacity-0 animation-delay-200">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Services may be engaged individually or as part of an integrated delivery model. Scope, responsibilities, and handovers are defined clearly at each stage to maintain execution clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="border-t border-border pt-16 md:pt-20">
          <div className="max-w-2xl animate-settle opacity-0 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Services are structured to integrate seamlessly, not operate in isolation.
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
              Request Project Review
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}