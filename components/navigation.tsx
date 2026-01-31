"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/approvals", label: "Approvals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const rafRef = useRef<number>()

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      
      rafRef.current = requestAnimationFrame(() => {
        const progress = Math.min(1, window.scrollY / 120)
        setScrollProgress(progress)
      })
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const glassStyle = {
    background: `linear-gradient(180deg, 
      rgba(15, 15, 17, ${0.35 + scrollProgress * 0.15}) 0%, 
      rgba(12, 12, 14, ${0.6 + scrollProgress * 0.1}) 100%)`,
    backdropFilter: `blur(${4 + scrollProgress * 6}px) saturate(${90 + scrollProgress * 20}%) brightness(${0.85 - scrollProgress * 0.1})`,
    WebkitBackdropFilter: `blur(${4 + scrollProgress * 6}px) saturate(${90 + scrollProgress * 20}%) brightness(${0.85 - scrollProgress * 0.1})`,
    borderBottom: scrollProgress > 0.1 
      ? `1px solid rgba(255, 255, 255, ${0.08 + scrollProgress * 0.04})` 
      : "1px solid rgba(255, 255, 255, 0.04)",
    boxShadow: scrollProgress > 0.2 
      ? `0 1px 0 0 rgba(255, 255, 255, 0.03) inset, 0 1px 20px -6px rgba(0, 0, 0, ${0.2 + scrollProgress * 0.1})` 
      : "0 1px 0 0 rgba(255, 255, 255, 0.02) inset",
    transform: `scale(${1.002 + scrollProgress * 0.008})`,
    transformOrigin: "top center",
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={glassStyle}
    >
      {/* Glass refraction gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            rgba(255, 255, 255, ${0.015 + scrollProgress * 0.01}) 0%, 
            transparent 30%, 
            rgba(0, 0, 0, ${0.05 + scrollProgress * 0.02}) 100%)`,
          opacity: 0.4 + scrollProgress * 0.2,
        }}
      />
      
      <nav className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo with BK icon */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            data-hoverable
            style={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11">
              <Image
                src="/images/bk-icon.png"
                alt="Urbexa Projects"
                fill
                className="object-contain"
                priority
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                }}
              />
            </div>
            <span className="font-serif text-lg md:text-xl tracking-wide text-foreground">
              Urbexa Projects
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-sm tracking-wide transition-all duration-300",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-hoverable
                  style={{
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span 
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ 
                        backgroundColor: "var(--gold)",
                        boxShadow: "0 0 4px rgba(239, 210, 162, 0.3)",
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground transition-opacity duration-300 hover:opacity-70"
            aria-label="Toggle menu"
            data-hoverable
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-out",
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          <div className="relative z-50 max-h-80 overflow-y-auto">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block text-sm tracking-wide transition-all duration-300 py-2",
                      pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{
                      borderLeft: pathname === item.href ? "2px solid var(--gold)" : "2px solid transparent",
                      paddingLeft: "12px",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
