import Link from "next/link"
import { HeroSection } from "@/components/home/hero-section"
import { EditorialBlock } from "@/components/home/editorial-block"
import { AudienceSection } from "@/components/home/audience-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <EditorialBlock />
      <AudienceSection />
    </div>
  )
}
