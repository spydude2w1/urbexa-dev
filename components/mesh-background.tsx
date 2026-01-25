"use client"

import { useEffect, useRef } from "react"

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // ===== VISUAL TUNING PARAMETERS =====
    const gridSize = 48            // mesh density (smaller = denser)
    const amplitude = 26           // surface deformation strength
    const baseOpacity = 0.07       // minimum visibility
    const maxOpacity = 0.18        // opacity ceiling
    const goldColor = "239,210,162" // Shoffr-style gold RGB

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Heavy inertia for mouse following (Apple-like)
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.03
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.03

      ctx.clearRect(0, 0, width, height)

      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1

      // ===== HORIZONTAL LINES =====
      for (let row = 0; row < rows; row++) {
        ctx.beginPath()

        for (let col = 0; col <= cols; col++) {
          const x = col * gridSize
          const y = row * gridSize

          const dx = col / cols - mouseRef.current.x
          const dy = row / rows - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const warpFactor = Math.max(0, 1 - dist * 1.4)

          const warpY =
            y +
            Math.sin(dist * 6 - Date.now() * 0.00025) *
              amplitude *
              warpFactor *
              0.8

          const opacity =
            baseOpacity + (maxOpacity - baseOpacity) * warpFactor

          const goldStrength = Math.pow(warpFactor, 1.8) * 0.25

          ctx.lineWidth = 0.35 + warpFactor * 0.4

          if (goldStrength > 0.03) {
            ctx.strokeStyle = `rgba(${goldColor}, ${goldStrength})`
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
          }

          if (col === 0) {
            ctx.moveTo(x, warpY)
          } else {
            ctx.lineTo(x, warpY)
          }
        }

        ctx.stroke()
      }

      // ===== VERTICAL LINES =====
      for (let col = 0; col < cols; col++) {
        ctx.beginPath()

        for (let row = 0; row <= rows; row++) {
          const x = col * gridSize
          const y = row * gridSize

          const dx = col / cols - mouseRef.current.x
          const dy = row / rows - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const warpFactor = Math.max(0, 1 - dist * 1.4)

          const warpX =
            x +
            Math.sin(dist * 6 - Date.now() * 0.00025) *
              amplitude *
              warpFactor *
              0.8

          const opacity =
            baseOpacity + (maxOpacity - baseOpacity) * warpFactor

          const goldStrength = Math.pow(warpFactor, 1.8) * 0.25

          ctx.lineWidth = 0.35 + warpFactor * 0.4

          if (goldStrength > 0.03) {
            ctx.strokeStyle = `rgba(${goldColor}, ${goldStrength})`
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 1,
      }}
    />
  )
}
