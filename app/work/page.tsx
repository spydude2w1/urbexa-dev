import type { Metadata } from "next"
import { WorkGallery } from "@/components/work/work-gallery"

export const metadata: Metadata = {
  title: "Our Work — BK Buildworks",
  description: "Selected projects showcasing execution-led construction with clarity and long-term value.",
}

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Page header */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 opacity-0 animate-settle">
          Selected Work
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed opacity-0 animate-settle animation-delay-100">
          A curated selection of projects demonstrating our approach to thoughtful, execution-led construction.
        </p>
      </section>

      {/* Work gallery */}
      <WorkGallery />
    </div>
  )
}
