"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Our Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Smooth progress from 0 to 1 over first 100px of scroll
      const progress = Math.min(1, window.scrollY / 100)
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        // Apple-like glass effect with smooth transition
        background: `linear-gradient(180deg, 
          rgba(20, 20, 22, ${0.6 + scrollProgress * 0.35}) 0%, 
          rgba(20, 20, 22, ${0.4 + scrollProgress * 0.5}) 100%)`,
        backdropFilter: `blur(${scrollProgress * 20}px) saturate(${100 + scrollProgress * 80}%)`,
        WebkitBackdropFilter: `blur(${scrollProgress * 20}px) saturate(${100 + scrollProgress * 80}%)`,
        borderBottom: scrollProgress > 0.1 
          ? `1px solid rgba(239, 210, 162, ${scrollProgress * 0.15})` 
          : "1px solid transparent",
        transition: "border-color 0.5s ease-out",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: scrollProgress * 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
      
      <nav className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo with BK icon */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            data-hoverable
          >
            {/* BK Icon */}
            <div className="relative w-10 h-10 md:w-11 md:h-11">
              <Image
                src="/images/bk-icon.png"
                alt="BK Buildworks"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-serif text-lg md:text-xl tracking-wide text-foreground">
              Buildworks
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
                >
                  {item.label}
                  {pathname === item.href && (
                    <span 
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ backgroundColor: "var(--gold)" }}
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
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-out",
            isMobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          )}
        >
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
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
