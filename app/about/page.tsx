import { Metadata } from "next"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About — Urbexa Group",
  description: "Understanding the philosophy behind Urbexa Projects and our approach to construction in India.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <header className="mb-16 md:mb-20">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-settle opacity-0">
            About
          </h1>
        </header>
        <AboutContent />
      </div>
    </div>
  )
}
