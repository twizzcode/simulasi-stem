"use client"

import { useEffect, useRef } from "react"

type EnergyWavesProps = {
  isPlaying: boolean
  groundPx?: number
  ghgLevel?: number
}

export default function EnergyWaves({
  isPlaying,
  groundPx = 190,
  ghgLevel = 50,
}: EnergyWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const ghgRef = useRef(ghgLevel)

  useEffect(() => {
    ghgRef.current = ghgLevel
  }, [ghgLevel])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ensurePaper = () => {
      const win = window as any
      if (win.paper) return Promise.resolve(win.paper)
      if (win.__paperLoadPromise) return win.__paperLoadPromise
      win.__paperLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "/libs/paper-full.min.js"
        script.async = true
        script.onload = () => resolve(win.paper)
        script.onerror = () => reject(new Error("Paper.js failed to load"))
        document.head.appendChild(script)
      })
      return win.__paperLoadPromise
    }

    let cancelled = false
    let cleanup: (() => void) | undefined

    const init = (paper: any) => {
      if (cancelled) return

      // Setup sekali
      paper.setup(canvas)
      const view = paper.view

      const parent = canvas.parentElement as HTMLElement | null
      if (!parent) return

    // Resize yang benar: pakai devicePixelRatio + ukuran parent real
    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const cssW = Math.max(1, Math.round(rect.width))
      const cssH = Math.max(1, Math.round(rect.height))

      const dpr = Math.max(1, window.devicePixelRatio || 1)

      // ukuran internal canvas (px) = css * dpr
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)

      // ukuran tampil canvas (css)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`

      // viewSize pakai CSS size (koordinat Paper enak)
      view.viewSize = new paper.Size(cssW, cssH)

      // scale agar stroke tetap tajam di retina
      view.zoom = dpr
    }

    resize()

    const skyBottom = () => Math.max(0, view.size.height - groundPx)
    const W = () => view.size.width
    const H = () => view.size.height

    // Bersihin kalau ada sisa
    paper.project.clear()

    type Wave = { update(dt: number): void; remove(): void }
    const waves: Wave[] = []

    function createWave(
      xRatio: number,
      speed: number,
      color: string,
      direction: "up" | "down",
      kind: "sunlight" | "infrared"
    ): Wave {
      const path = new paper.Path()
      path.strokeColor = new paper.Color(color)
      path.strokeWidth = 4
      path.strokeCap = "round"
      path.opacity = 0.95

      const pathNew = kind === "infrared" ? new paper.Path() : null
      const clipRect = kind === "infrared" ? new paper.Path.Rectangle(new paper.Rectangle(0, 0, 1, 1)) : null
      const clipGroup =
        kind === "infrared" && pathNew && clipRect
          ? new paper.Group([clipRect, pathNew])
          : null

      if (pathNew && clipRect) {
        pathNew.strokeColor = new paper.Color(color)
        pathNew.strokeWidth = 4
        pathNew.strokeCap = "round"
        pathNew.opacity = 0.95
        clipRect.clipMask = true
      }

      const state = {
        phase: Math.random() * Math.PI * 2,
        offsetY:
          direction === "up"
            ? -H() * (1.2 + Math.random() * 0.8)
            : H() * (1.2 + Math.random() * 0.8),
        transitionY: 0,
        targetWidth: 4,
      }

      const rebuild = () => {
        path.removeSegments()
        if (pathNew) pathNew.removeSegments()

        // amplitude & wavelength dibuat RELATIF biar selalu keliatan “wavy”
        const amp = Math.max(14, W() * 0.018)          // ~18px di 1000px width
        const wavelength = Math.max(1, H() / 100)
     // makin tinggi layar, makin “pas”

        const step = 8
        const bottom = skyBottom()

        for (let y = 0; y <= bottom; y += step) {
          const yy = y + state.offsetY
          const xx = W() * xRatio + Math.sin(yy / wavelength + state.phase) * amp
          const point = new paper.Point(xx, y)
          path.add(point)
          if (pathNew) pathNew.add(point)
        }

        path.smooth({ type: "continuous" })
        if (pathNew) pathNew.smooth({ type: "continuous" })
      }

      rebuild()

      return {
        update(dt: number) {
          if (kind === "infrared" && pathNew && clipRect) {
            const level = Math.max(0, Math.min(100, ghgRef.current))
            const maxWidth = 6
            const minWidth = 1.5
            const t = 1 - level / 100
            const desiredWidth = minWidth + (maxWidth - minWidth) * t

            if (Math.abs(desiredWidth - state.targetWidth) > 0.05) {
              // mulai transisi dari kondisi terakhir ke target baru
              path.strokeWidth = pathNew.strokeWidth
              state.targetWidth = desiredWidth
              pathNew.strokeWidth = desiredWidth
              state.transitionY = 0
            }

            const sweepSpeed = 280 // px/s
            state.transitionY = Math.min(H(), state.transitionY + sweepSpeed * dt)
            const top = Math.max(0, H() - state.transitionY)
            clipRect.bounds = new paper.Rectangle(0, top, W(), state.transitionY)
          }

          const dir = direction === "up" ? -1 : 1
          state.offsetY += dir * speed * dt
          state.phase += dt * 1.2

          if (direction === "up" && state.offsetY > H() * 0.9) {
            state.offsetY = -H() * (1.2 + Math.random() * 0.8)
            state.phase = Math.random() * Math.PI * 2
          }

          if (direction === "down" && state.offsetY < -H() * 0.9) {
            state.offsetY = H() * (1.2 + Math.random() * 0.8)
            state.phase = Math.random() * Math.PI * 2
          }

          rebuild()
        },
        remove() {
          path.remove()
          if (pathNew) pathNew.remove()
          if (clipRect) clipRect.remove()
          if (clipGroup) clipGroup.remove()
        },
      }
    }

    // Kalau isPlaying false, kita stop animasi tapi tetap bisa resize
    let running = isPlaying

    waves.push(createWave(0.05, 20, "#d8db47", "up", "sunlight"))
    waves.push(createWave(0.50, 25, "#d8db47", "up", "sunlight"))
    waves.push(createWave(0.95, 30, "#d8db47", "up", "sunlight"))
    waves.push(createWave(0.2, 18, "#d7332f", "down", "infrared"))
    waves.push(createWave(0.7, 22, "#d7332f", "down", "infrared"))


    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now

      if (running) {
        waves.forEach((w) => w.update(dt))
        view.draw()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    // 🔥 Ini kunci: pantau ukuran parent berubah (flex, fullscreen, dll)
    const ro = new ResizeObserver(() => resize())
    ro.observe(parent)

    // update running kalau prop berubah (tanpa recreate semuanya)
    running = isPlaying

      return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      waves.forEach((w) => w.remove())
      paper.project.clear()
      view.zoom = 1
      }
    }

    ensurePaper()
      .then((paper: any) => {
        cleanup = init(paper)
      })
      .catch(() => {
        if (!cancelled) {
          console.error("Paper.js belum ke-load")
        }
      })

    return () => {
      cancelled = true
      if (cleanup) cleanup()
    }
  }, [isPlaying, groundPx])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
    />
  )
}
