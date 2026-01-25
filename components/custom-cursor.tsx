"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const pos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })

  const hoverScale = useRef(1)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    let raf: number
    const animate = () => {
      // Heavy inertia
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12

      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.35
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.35

      // Hover detection (NO React state)
      const el = document.elementFromPoint(
        target.current.x,
        target.current.y
      ) as HTMLElement | null

      const isHover =
        el?.closest("a, button, [data-hoverable]") !== null

      hoverScale.current += ((isHover ? 1.6 : 1) - hoverScale.current) * 0.15

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
    animate()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
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
