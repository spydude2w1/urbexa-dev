"use client"

import { useEffect, useRef } from "react"

// Time-based smoothing constants
const CURSOR_SMOOTHING = 8.0  // Main cursor responsiveness
const DOT_SMOOTHING = 15.0    // Inner dot responsiveness
const HOVER_SMOOTHING = 12.0  // Hover scale transition
const MAX_LAG_DISTANCE = 150  // Snap threshold for fast movements
const CLICK_SMOOTHING = 25.0  // Reduced inertia during clicks

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const pos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const hoverScale = useRef(1)
  const isPressed = useRef(false)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onMouseDown = () => {
      isPressed.current = true
    }

    const onMouseUp = () => {
      isPressed.current = false
    }

    let raf: number
    const animate = () => {
      const currentTime = performance.now()
      const deltaTime = (currentTime - lastTime.current) / 1000 // Convert to seconds
      lastTime.current = currentTime

      // Clamp deltaTime to prevent large jumps
      const clampedDelta = Math.min(deltaTime, 1/30) // Max 30fps equivalent

      // Choose smoothing based on click state
      const cursorSmoothing = isPressed.current ? CLICK_SMOOTHING : CURSOR_SMOOTHING
      const dotSmoothing = isPressed.current ? CLICK_SMOOTHING : DOT_SMOOTHING

      // Time-based exponential decay
      const cursorFactor = 1 - Math.exp(-cursorSmoothing * clampedDelta)
      const dotFactor = 1 - Math.exp(-dotSmoothing * clampedDelta)
      const hoverFactor = 1 - Math.exp(-HOVER_SMOOTHING * clampedDelta)

      // Check for excessive lag and snap if needed
      const cursorDistance = Math.sqrt(
        Math.pow(target.current.x - pos.current.x, 2) + 
        Math.pow(target.current.y - pos.current.y, 2)
      )
      
      if (cursorDistance > MAX_LAG_DISTANCE) {
        pos.current.x = target.current.x
        pos.current.y = target.current.y
      } else {
        pos.current.x += (target.current.x - pos.current.x) * cursorFactor
        pos.current.y += (target.current.y - pos.current.y) * cursorFactor
      }

      dotPos.current.x += (target.current.x - dotPos.current.x) * dotFactor
      dotPos.current.y += (target.current.y - dotPos.current.y) * dotFactor

      // Hover detection (NO React state)
      const el = document.elementFromPoint(
        target.current.x,
        target.current.y
      ) as HTMLElement | null

      const isHover = el?.closest("a, button, [data-hoverable]") !== null
      const targetScale = isHover ? 1.6 : 1
      hoverScale.current += (targetScale - hoverScale.current) * hoverFactor

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
          translate(-50%, -50%)
          scale(${hoverScale.current})
        `
        cursorRef.current.style.borderColor = isHover
          ? "var(--gold)"
          : "rgba(255,255,255,0.25)"
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)
          translate(-50%, -50%)
          scale(${isHover ? 0 : 1})
        `
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    animate()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "transparent",
          willChange: "transform",
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "var(--gold)",
          willChange: "transform",
        }}
      />
    </>
  )
}
