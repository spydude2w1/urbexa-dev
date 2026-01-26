import type { Metadata } from "next"
import { Mail, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact — Urbexa Group",
  description: "Get in touch with Urbexa Projects for serious construction projects.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <header className="mb-16 md:mb-20">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-8 opacity-0 animate-settle">
            Contact
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-settle animation-delay-100">
            If you are planning a serious construction project and want clarity 
            before committing, you can reach us here.
          </p>
        </header>

        <div className="space-y-6 opacity-0 animate-settle animation-delay-200">
          {/* Email */}
          <a
            href="mailto:enquire@urbexagroup.com"
            className="group relative flex items-center gap-6 p-6 md:p-8 overflow-hidden transition-all duration-700 ease-out"
            style={{
              background: "linear-gradient(135deg, oklch(0.16 0.005 250) 0%, oklch(0.18 0.005 250) 100%)",
            }}
          >
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "linear-gradient(135deg, oklch(0.18 0.005 250) 0%, oklch(0.20 0.005 250) 100%)",
              }}
            />
            {/* Border */}
            <div className="absolute inset-0 border border-border/30 group-hover:border-border/50 transition-colors duration-700" />
            
            <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary/30 group-hover:bg-secondary/50 transition-colors duration-700">
              <Mail
                size={20}
                className="text-muted-foreground group-hover:text-foreground transition-colors duration-700"
              />
            </div>
            <div className="relative">
              <p className="text-sm text-muted-foreground/70 mb-1">Email</p>
              <p className="text-lg text-foreground">enquire@urbexagroup.com</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919945356557"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-6 p-6 md:p-8 overflow-hidden transition-all duration-700 ease-out"
            style={{
              background: "linear-gradient(135deg, oklch(0.16 0.005 250) 0%, oklch(0.18 0.005 250) 100%)",
            }}
          >
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "linear-gradient(135deg, oklch(0.18 0.005 250) 0%, oklch(0.20 0.005 250) 100%)",
              }}
            />
            {/* Border */}
            <div className="absolute inset-0 border border-border/30 group-hover:border-border/50 transition-colors duration-700" />
            
            <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary/30 group-hover:bg-secondary/50 transition-colors duration-700">
              <MessageCircle
                size={20}
                className="text-muted-foreground group-hover:text-foreground transition-colors duration-700"
              />
            </div>
            <div className="relative">
              <p className="text-sm text-muted-foreground/70 mb-1">WhatsApp</p>
              <p className="text-lg text-foreground">+91 99453 56557</p>
            </div>
          </a>
        </div>

        {/* Closing note */}
        <p className="mt-16 text-sm text-muted-foreground/50 opacity-0 animate-settle animation-delay-300">
          No forms. No automation. Just direct communication.
        </p>
      </div>
    </div>
  )
}
