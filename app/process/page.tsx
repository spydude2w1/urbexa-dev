import { Metadata } from "next"
import { ProcessSteps } from "@/components/process/process-steps"

export const metadata: Metadata = {
  title: "Our Process — BK Buildworks",
  description: "How BK Buildworks approaches construction projects with clarity, control, and long-term accountability.",
}

export default function ProcessPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <header className="mb-16 md:mb-24">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 animate-settle opacity-0">
            How We Approach Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-settle opacity-0 animation-delay-100">
            A structured, disciplined approach to execution that prioritizes 
            clarity and accountability at every stage.
          </p>
        </header>
        <ProcessSteps />
      </div>
    </div>
  )
}
