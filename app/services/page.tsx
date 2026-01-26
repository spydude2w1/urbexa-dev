"use client"

import { Metadata } from "next"
import { useState } from "react"

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const services = [
    {
      id: "approvals",
      title: "Approvals & Regulatory",
      summary: "Statutory approval support aligned with project scope",
      content: `Approval support aligned with statutory requirements and defined project scope.

Includes coordination and procedural support for:
• BBMP
• BDA
• BMRDA
• DTCP
• HNTDA

Approval timelines and outcomes remain subject to statutory authority processes.`
    },
    {
      id: "planning",
      title: "Architectural Planning & Design",
      summary: "Planning and design aligned with site constraints",
      content: `Planning and architectural development aligned with site constraints, regulatory conditions, and execution feasibility.

Scope includes:
• Floor planning
• Layout optimization
• Regulatory-compliant drawings
• Coordination between design intent and construction realities`
    },
    {
      id: "elevation",
      title: "Front Elevation Development",
      summary: "Elevation and façade development focused on proportion",
      content: `Elevation and façade development focused on proportion, materiality, and long-term relevance rather than trends.

Scope includes:
• Elevation concepts
• Massing studies
• Material strategy
• Context-sensitive façade development`
    },
    {
      id: "residential",
      title: "Residential Construction",
      summary: "Structured execution of independent residential buildings",
      content: `Execution of independent residential buildings under a structured construction framework.

Scope includes:
• Civil and structural execution
• Trade coordination
• Quality control
• Timeline and scope monitoring`
    },
    {
      id: "commercial",
      title: "Commercial Construction",
      summary: "Small to mid-scale commercial building execution",
      content: `Execution of small to mid-scale commercial buildings with defined scope and coordination requirements.

Suitable for:
• Office buildings
• Mixed-use structures
• Support infrastructure linked to residential developments`
    },
    {
      id: "cradle",
      title: "Cradle-to-Completion House Development",
      summary: "Complete residential delivery under single framework",
      content: `Complete residential delivery managed under a single execution framework.

Includes:
• Statutory approvals
• Architectural planning and design
• Civil construction
• Front elevation development
• Interior execution
• Final handover coordination

This service is designed to reduce fragmentation and maintain accountability across all stages.`
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
              Urbexa Projects provides clearly defined services across approvals, planning, construction, and complete residential delivery.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each service can operate independently or as part of an integrated cradle-to-completion framework.
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
          <div className="max-w-2xl animate-settle opacity-0">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Services are structured to integrate seamlessly, not operate in isolation.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}