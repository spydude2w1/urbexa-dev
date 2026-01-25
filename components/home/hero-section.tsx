// ...existing code...
"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    // Delayed visibility for settle effect
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Hero-specific mesh with more presence
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      // Reset transform and apply pixel-ratio scaling once (prevents cumulative scaling)
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const gridSize = 60
    // Increased amplitude for a more obvious warp
    const amplitude = 36

    const draw = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      // Stronger follow so warp responds more noticeably to the pointer
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04

      ctx.clearRect(0, 0, width, height)

      const cols = Math.ceil(width / gridSize) + 2
      const rows = Math.ceil(height / gridSize) + 2

      // Draw architectural grid with stronger warp visibility
      ctx.lineWidth = 0.7

      // Horizontal lines
      for (let row = 0; row < rows; row++) {
        ctx.beginPath()
        for (let col = 0; col <= cols; col++) {
          const x = col * gridSize
          const y = row * gridSize

          const dx = (col / cols) - mouseRef.current.x
          const dy = (row / rows) - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          // Broaden influence radius and increase oscillation frequency for a more visible warp
          const warpFactor = Math.max(0, 1 - dist * 1.1)
          const warpY = y + Math.sin(dist * 8 - Date.now() * 0.0005) * amplitude * warpFactor

          // Stronger base alpha and more aggressive gold tint when pointer is nearby
          const goldTint = warpFactor > 0.12 ? warpFactor * 0.18 : 0
          if (goldTint > 0) {
            ctx.strokeStyle = `rgba(239, 210, 162, ${Math.min(goldTint, 0.35)})`
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + warpFactor * 0.12})`
          }

          if (col === 0) {
            ctx.moveTo(x, warpY)
          } else {
            ctx.lineTo(x, warpY)
          }
        }
        ctx.stroke()
      }

      // Vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath()
        for (let row = 0; row <= rows; row++) {
          const x = col * gridSize
          const y = row * gridSize

          const dx = (col / cols) - mouseRef.current.x
          const dy = (row / rows) - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          const warpFactor = Math.max(0, 1 - dist * 1.1)
          const warpX = x + Math.sin(dist * 8 - Date.now() * 0.0005) * amplitude * warpFactor

          const goldTint = warpFactor > 0.12 ? warpFactor * 0.18 : 0
          if (goldTint > 0) {
            ctx.strokeStyle = `rgba(239, 210, 162, ${Math.min(goldTint, 0.35)})`
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + warpFactor * 0.12})`
          }

          if (row === 0) {
            ctx.moveTo(warpX, y)
          } else {
            ctx.lineTo(warpX, y)
          }
        }
        ctx.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, oklch(0.10 0.005 250) 0%, oklch(0.14 0.005 250) 50%, oklch(0.12 0.005 250) 100%)"
        }}
      />

      {/* Concrete texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Interactive mesh canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Subtle radial gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, oklch(0.12 0.005 250 / 0.6) 100%)"
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <div
          className={`transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-foreground mb-8">
            BK 
            BUILDWORKS
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
            Execution-led construction with clarity, control, and long-term value.
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
            Structured insight for landowners and serious builders.
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
            href="/work"
            className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 transition-all duration-500 hover:text-gold"
            style={{
              borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
            }}
            data-hoverable
          >
            View Our Work
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
// ...existing