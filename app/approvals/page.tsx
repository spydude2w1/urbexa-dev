import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Approvals — Urbexa Group",
  description: "Statutory approvals handled within defined regulatory scope for residential and development projects.",
}

export default function ApprovalsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <header className="mb-16 md:mb-20">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-settle opacity-0 mb-6">
            Approvals
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl animate-settle opacity-0 animation-delay-200">
            Statutory approvals handled within defined regulatory scope.
          </p>
        </header>

        {/* Introductory Context */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-3xl animate-settle opacity-0 animation-delay-300">
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Urbexa Projects provides BBMP plan approval, BDA plan sanction, and DTCP approval support for residential construction projects where regulatory clearances are required as part of execution.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our involvement is structured, region-specific, and limited to clearly defined statutory processes. We currently assist with approvals in Bengaluru and select regions of Tamil Nadu including Hosur.
            </p>
          </div>
        </section>

        {/* Bengaluru Approvals Grid */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-12 animate-settle opacity-0 animation-delay-400">
            Bengaluru & Metropolitan Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 transition-all duration-700 hover:border-gold/30 animate-settle opacity-0 animation-delay-500">
              <h3 className="font-serif text-xl font-light text-foreground mb-4">BBMP Plan Approval</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bruhat Bengaluru Mahanagara Palike plan approval and building plan sanction processes for residential construction within BBMP jurisdiction, including compliance documentation and procedural coordination.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 transition-all duration-700 hover:border-gold/30 animate-settle opacity-0 animation-delay-600">
              <h3 className="font-serif text-xl font-light text-foreground mb-4">BDA Plan Sanction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bangalore Development Authority plan sanction processes for layout planning, land development, and residential projects in regulated zones under BDA jurisdiction.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 transition-all duration-700 hover:border-gold/30 animate-settle opacity-0 animation-delay-700">
              <h3 className="font-serif text-xl font-light text-foreground mb-4">BMRDA Approval</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bangalore Metropolitan Region Development Authority approvals for developments outside BBMP limits within the metropolitan planning region.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 transition-all duration-700 hover:border-gold/30 animate-settle opacity-0 animation-delay-800">
              <h3 className="font-serif text-xl font-light text-foreground mb-4">DTCP Approval (Karnataka)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Directorate of Town and Country Planning approvals for regulated developments and planning compliance in designated areas.
              </p>
            </div>
          </div>
        </section>

        {/* Tamil Nadu Approvals Grid */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-12 animate-settle opacity-0 animation-delay-900">
            Tamil Nadu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 transition-all duration-700 hover:border-gold/30 animate-settle opacity-0 animation-delay-1000">
              <h3 className="font-serif text-xl font-light text-foreground mb-4">DTCP Approval Tamil Nadu</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Directorate of Town and Country Planning approval processes for residential layout and development compliance as per Tamil Nadu planning regulations and building bylaws.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 transition-all duration-700 hover:border-gold/30 animate-settle opacity-0 animation-delay-1100">
              <h3 className="font-serif text-xl font-light text-foreground mb-4">HNTDA Approval Hosur</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hosur New Town Development Authority approval coordination for residential and mixed-use developments within the Hosur planning jurisdiction and surrounding areas.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded FAQ Section */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-12 animate-settle opacity-0">
              Approval Process Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-settle opacity-0 animation-delay-200">
                <h3 className="font-serif text-lg font-light text-foreground mb-4">
                  How long do BBMP plan approvals typically take?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BBMP plan approval timelines depend on documentation completeness, site compliance, and authority processing schedules. We coordinate the process but cannot guarantee specific timeframes.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-settle opacity-0 animation-delay-300">
                <h3 className="font-serif text-lg font-light text-foreground mb-4">
                  What documents are required for BDA plan sanction?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BDA plan sanction requires site survey documents, title verification, architectural drawings, and compliance certificates. We assist with documentation coordination and submission processes.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-settle opacity-0 animation-delay-400">
                <h3 className="font-serif text-lg font-light text-foreground mb-4">
                  How are approvals coordinated with construction?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Approval processes are integrated with construction planning to prevent delays. Design development considers regulatory requirements from the outset rather than as separate activities.
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

        {/* Scope & Process Note */}
        <section className="mb-16 md:mb-20">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-8 animate-settle opacity-0 animation-delay-1200">
              Scope of Approval Support
            </h2>
            <div className="animate-settle opacity-0 animation-delay-1300">
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Approval assistance is provided as part of a defined scope aligned with project requirements. This includes coordination, documentation support, and procedural follow-up where applicable.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Approval timelines and outcomes remain subject to statutory authority processes and regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="border-t border-border pt-12">
          <div className="max-w-2xl animate-settle opacity-0 animation-delay-1400">
            <p className="text-base text-muted-foreground leading-relaxed">
              Approvals are handled as a structured part of execution, and a standalone service.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}