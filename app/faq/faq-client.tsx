"use client"

import { useState } from "react"

const faqs = [
  {
    id: "construction-costs",
    question: "Why do construction costs vary widely in Bangalore?",
    answer: `Construction costs in Bangalore vary significantly based on material quality, execution standards, site conditions, and scope definition. Factors include:

• Material specifications and sourcing quality
• Level of supervision and quality control
• Complexity of approvals and site constraints
• Scope inclusions and exclusions
• Timeline and execution methodology

Market rates reflect these variables, making direct cost comparisons misleading without understanding the underlying scope and quality parameters.`
  },
  {
    id: "low-pricing",
    question: "Why is unusually low per-sqft pricing often misleading?",
    answer: `Low per-square-foot pricing typically indicates scope exclusions, material compromises, or execution shortcuts that emerge during construction:

• Essential items excluded from base pricing
• Lower-grade materials specified as standard
• Minimal supervision and quality control
• Hidden costs for approvals, utilities, or finishing
• Subcontracting chains that reduce accountability

Realistic pricing reflects actual material costs, proper supervision, and comprehensive scope without hidden exclusions.`
  },
  {
    id: "material-quality",
    question: "How does material quality affect long-term construction cost?",
    answer: `Material quality directly impacts maintenance, durability, and long-term performance:

• Higher-grade materials reduce maintenance frequency
• Proper waterproofing prevents structural damage
• Quality electrical components ensure safety and longevity
• Proven brands offer better warranty and service support
• Structural materials affect building lifespan and safety

Initial material cost differences are typically recovered through reduced maintenance and longer service life.`
  },
  {
    id: "scope-exclusions",
    question: "How does Urbexa avoid hidden scope exclusions?",
    answer: `Scope definition is established clearly before project commencement:

• Detailed scope documentation provided upfront
• Material specifications defined with brand references
• Inclusions and exclusions listed explicitly
• No surprise additions during execution
• Change requests handled through formal process

This approach eliminates scope ambiguity and prevents cost escalations during construction.`
  },
  {
    id: "approvals-coordination",
    question: "How are approvals and construction coordinated?",
    answer: `Approvals are integrated with construction planning rather than handled separately:

• Design development considers approval requirements
• Construction timeline accounts for approval processes
• Documentation prepared with execution feasibility in mind
• Regulatory compliance built into construction methodology
• Single-point coordination reduces delays and conflicts

This integration prevents approval-related construction delays and rework.`
  },
  {
    id: "project-clarification",
    question: "What should clients clarify before starting construction?",
    answer: `Key clarifications help establish realistic expectations:

• Complete scope definition and material specifications
• Timeline expectations and milestone dependencies
• Approval requirements and responsibility allocation
• Site access and utility availability
• Payment structure and change request process
• Quality standards and inspection protocols

Clear upfront communication prevents misunderstandings during execution.`
  },
  {
    id: "project-limits",
    question: "Why does Urbexa limit the number of concurrent projects?",
    answer: `Limited concurrent projects ensure quality control and direct oversight:

• Direct supervision at each construction site
• Consistent quality standards across all projects
• Immediate response to site issues and decisions
• Personal involvement in critical construction phases
• Reduced dependency on subcontractor chains

This approach prioritizes execution quality over project volume.`
  },
  {
    id: "construction-timeline",
    question: "What factors affect residential construction timelines in Bangalore?",
    answer: `Construction timelines depend on multiple coordinated factors:

• Approval processing times and documentation requirements
• Site conditions and access constraints
• Material availability and delivery coordination
• Weather conditions and seasonal factors
• Scope complexity and design requirements
• Quality control and inspection processes

Realistic timelines account for these variables rather than optimistic projections.`
  }
]

export function FAQClient() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-settle opacity-0 mb-6">
            Questions Clients Commonly Ask
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-settle opacity-0 animation-delay-200">
            Answers to common questions about residential construction, approvals, and project execution in Bangalore and Tamil Nadu.
          </p>
        </header>

        {/* FAQ List */}
        <section className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="animate-settle opacity-0" 
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 md:p-8 text-left hover:bg-card/50"
                  style={{
                    transition: "background-color var(--motion-duration-normal) var(--motion-ease-out)"
                  }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-lg md:text-xl font-light text-foreground leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                      expandedFAQ === faq.id ? 'rotate-45' : ''
                    }`}>
                      <div className="w-3 h-px bg-foreground"></div>
                      <div className="absolute w-px h-3 bg-foreground"></div>
                    </div>
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedFAQ === faq.id ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 md:px-8">
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="mt-20 md:mt-24 pt-12 border-t border-border">
          <div className="animate-settle opacity-0 animation-delay-1200">
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              For project-specific questions or detailed scope discussions, contact us directly.
            </p>
            <a
              href="/contact"
              className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 hover:text-gold"
              style={{
                borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
                transition: "color var(--motion-duration-normal) var(--motion-ease-out)"
              }}
              data-hoverable
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}