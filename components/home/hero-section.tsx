"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    // Delayed visibility for settle effect
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 3D perspective effect
  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      
      mouseRef.current.x += (x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (y - mouseRef.current.y) * 0.05
    }

    const animate = () => {
      const rotateX = mouseRef.current.y * 8
      const rotateY = -mouseRef.current.x * 8
      const translateZ = Math.abs(mouseRef.current.x) * 50 + Math.abs(mouseRef.current.y) * 50
      
      bg.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
        scale(1.2)
      `
      
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D perspective background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg-home.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          opacity: 0.7,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(180deg, oklch(0.10 0.005 250 / 0.8) 0%, oklch(0.14 0.005 250 / 0.6) 50%, oklch(0.12 0.005 250 / 0.8) 100%)"
        }}
      />





      <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <div
          className={`transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-foreground mb-8">
            Urbexa Projects
          </h1>
        </div>

        <div
          className={`transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ 
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "0.15s"
          }}
        >
          <p className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed max-w-2xl mx-auto mb-4">
            End-to-end residential and commercial construction, delivered under one execution framework.
          </p>
        </div>

        <div
          className={`transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ 
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "0.3s"
          }}
        >
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-14">
            From statutory approvals and planning to construction, interiors, and final handover.
          </p>
        </div>

        <div
          className={`transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ 
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "0.5s"
          }}
        >
          <Link
            href="/process"
            className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 transition-all duration-500 hover:text-gold"
            style={{
              borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
            }}
            data-hoverable
          >
            Understand How We Deliver
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-[1.4s] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ 
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "0.8s"
        }}
      >
        <ChevronDown
          size={20}
          className="text-muted-foreground/50"
          style={{ 
            animation: "bounce 3s ease-in-out infinite"
          }}
        />
      </div>
    </section>
  )
}