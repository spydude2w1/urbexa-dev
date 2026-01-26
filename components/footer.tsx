import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative border-t border-border/20">
      {/* Gold gradient separator */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(239, 210, 162, 0.3) 20%, rgba(239, 210, 162, 0.3) 80%, transparent 100%)"
        }}
      />

      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, oklch(0.12 0.005 250) 0%, oklch(0.10 0.005 250) 100%)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/bk-icon.png"
                  alt="Urbexa Projects Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl tracking-wide text-foreground">
                Urbexa Projects
              </span>
            </div>
            <p className="text-sm text-muted-foreground/70 max-w-sm leading-relaxed">
              Execution-led construction with clarity, control, and long-term value.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground transition-all duration-500 hover:text-gold"
              data-hoverable
            >
              Get in touch
            </Link>
            <Link
              href="/work"
              className="text-sm text-muted-foreground/60 transition-all duration-500 hover:text-gold"
              data-hoverable
            >
              View our work
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/20">
          <p className="text-xs text-muted-foreground/40">
            {new Date().getFullYear()} Urbexa Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
