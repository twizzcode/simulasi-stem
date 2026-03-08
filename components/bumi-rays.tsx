"use client"

import { useEffect, useRef } from "react"

/**
 * Animated canvas overlay for Step 5 (Studi Kasus Bumi).
 * Matches the bumi.png illustration:
 *   - Sun top-left → yellow rays down-right
 *   - Some rays reflect early off atmosphere (never reach ground)
 *   - Rest reach ground → bounce as infrared ↗
 *   - Infrared hits GHG layer → some escape, some bounce back ↘
 * Slower, more educational pace than the full simulation.
 */
export default function BumiRays({ isPlaying = true }: { isPlaying?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef(0)
  const playRef = useRef(isPlaying)

  useEffect(() => {
    playRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    if (!ctx) return
    const parent = canvas.parentElement as HTMLElement | null
    if (!parent) return

    let W = 0
    let H = 0

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      W = Math.round(rect.width)
      H = Math.round(rect.height)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(parent)

    // Layout positions adjusted for bumi.png (1536x1024, 3:2 ratio)
    // displayed in 16:9 aspect-video with object-cover.
    // Vertical crop: top/bottom ~8% each → visible range 8%~92% of original.
    // Positions below are % of the VISIBLE (cropped) canvas.
    const groundY = () => H * 0.82    // bumi surface
    const ghgY = () => H * 0.26       // GHG / atmosphere layer
    const earlyReflectY = () => H * 0.50 // some rays bounce here (partial atmosphere reflection)

    type Pt = { x: number; y: number }
    type Phase =
      | "sun-down"
      | "early-reflect"  // reflected by atmosphere before reaching ground
      | "ir-up"
      | "bounce-down"
      | "escape"
      | "fading"
      | "done"

    type Ray = {
      points: Pt[]
      hx: number
      hy: number
      vx: number
      vy: number
      phase: Phase
      speed: number
      bounces: number
      maxBounces: number
      trailLen: number
      opacity: number
      willReflectEarly: boolean
    }

    const SUN = ["#f5a623", "#f7c948", "#dba12a"]
    const IR = ["#d7332f", "#e8563a", "#d94545"]
    const BOUNCE = ["#e85a20", "#d94545"]
    const REFLECT = ["#f5a623", "#e8951a"] // early reflection keeps sun color
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]

    // Sun is at top-left of visible image, rays go down-right
    const ANGLE = (32 * Math.PI) / 180
    const SPEED = 80    // slow educational pace
    const DRAIN = 120
    const BATCH = 4
    const INTERVAL = 20 // 20 seconds between batches

    const rays: Ray[] = []
    let timer = 0

    function spawn() {
      for (let i = 0; i < BATCH; i++) {
        // Origin from top-left area (sun position in cropped view)
        const ox = W * 0.06 + i * W * 0.035
        const oy = -4 - i * 8
        const vx = Math.sin(ANGLE) * SPEED
        const vy = Math.cos(ANGLE) * SPEED
        // ~30% of rays reflect early off atmosphere
        const willReflectEarly = i === 0 || (i === 1 && Math.random() < 0.5)
        rays.push({
          points: [{ x: ox, y: oy }],
          hx: ox,
          hy: oy,
          vx,
          vy,
          phase: "sun-down",
          speed: SPEED,
          bounces: 0,
          maxBounces: 1 + Math.floor(Math.random() * 2),
          trailLen: Math.round(H * 0.5),
          opacity: 0.85,
          willReflectEarly,
        })
      }
    }

    spawn()

    function norm(x: number, y: number, s: number): [number, number] {
      const l = Math.sqrt(x * x + y * y) || 1
      return [(x / l) * s, (y / l) * s]
    }

    function update(r: Ray, dt: number) {
      if (r.phase === "done") return

      if (r.phase === "fading") {
        const n = Math.max(1, Math.round(DRAIN * dt))
        for (let i = 0; i < n && r.points.length > 0; i++) r.points.shift()
        if (r.points.length === 0) r.phase = "done"
        return
      }

      r.hx += r.vx * dt
      r.hy += r.vy * dt
      r.points.push({ x: r.hx, y: r.hy })
      while (r.points.length > r.trailLen) r.points.shift()

      const gy = groundY()
      const gy2 = ghgY()
      const ery = earlyReflectY()

      switch (r.phase) {
        case "sun-down":
          // Early atmosphere reflection
          if (r.willReflectEarly && r.hy >= ery) {
            r.hy = ery
            r.points.push({ x: r.hx, y: r.hy })
            // Reflect back up-left
            const [nvx, nvy] = norm(-Math.abs(r.vx) * 0.5, -Math.abs(r.vy), r.speed)
            r.vx = nvx
            r.vy = nvy
            r.phase = "early-reflect"
            r.trailLen = Math.round(H * 0.3)
            break
          }
          // Reach ground
          if (r.hy >= gy) {
            r.hy = gy
            r.points.push({ x: r.hx, y: r.hy })
            const [nvx, nvy] = norm(r.vx * 0.6, -Math.abs(r.vy), r.speed)
            r.vx = nvx
            r.vy = nvy
            r.phase = "ir-up"
            r.trailLen = Math.round(H * 0.28)
          }
          break
        case "early-reflect":
          // These rays just exit upward
          if (r.hy < -40 || r.hx < -40) {
            r.phase = "fading"
          }
          break
        case "ir-up":
          if (r.hy <= gy2) {
            r.hy = gy2
            r.points.push({ x: r.hx, y: r.hy })
            if (Math.random() < 0.5) {
              // Bounce back down
              const [nvx, nvy] = norm(r.vx, Math.abs(r.vy), r.speed)
              r.vx = nvx
              r.vy = nvy
              r.phase = "bounce-down"
            } else {
              // Escape through GHG
              r.phase = "escape"
            }
          }
          break
        case "bounce-down":
          if (r.hy >= gy) {
            r.hy = gy
            r.points.push({ x: r.hx, y: r.hy })
            r.bounces++
            if (r.bounces >= r.maxBounces) {
              r.phase = "fading"
            } else {
              const [nvx, nvy] = norm(r.vx, -Math.abs(r.vy), r.speed)
              r.vx = nvx
              r.vy = nvy
              r.phase = "ir-up"
            }
          }
          break
        case "escape":
          if (r.hy < -40) r.phase = "fading"
          break
      }
    }

    function colorFor(r: Ray): string {
      switch (r.phase) {
        case "sun-down": return pick(SUN)
        case "early-reflect": return pick(REFLECT)
        case "ir-up": case "escape": case "fading": return pick(IR)
        case "bounce-down": return pick(BOUNCE)
        default: return pick(SUN)
      }
    }

    function segColor(down: boolean, bounceCount: number, isEarlyReflect: boolean): string {
      if (isEarlyReflect && !down) return pick(REFLECT)
      if (down && bounceCount === 0) return pick(SUN)
      if (!down) return pick(IR)
      return pick(BOUNCE)
    }

    function draw(r: Ray) {
      if (r.points.length < 2) return

      let segStart = 0
      let prevDown = r.points[1].y >= r.points[0].y
      let bc = 0
      type Seg = { s: number; e: number; c: string }
      const segs: Seg[] = []

      for (let i = 1; i < r.points.length; i++) {
        const down = r.points[i].y >= r.points[i - 1].y
        if (down !== prevDown) {
          segs.push({ s: segStart, e: i, c: segColor(prevDown, bc, r.willReflectEarly && bc === 0 && !prevDown) })
          segStart = i - 1
          if (prevDown) bc++
          prevDown = down
        }
      }
      segs.push({ s: segStart, e: r.points.length, c: segColor(prevDown, bc, r.willReflectEarly && bc === 0 && !prevDown) })

      for (const seg of segs) {
        if (seg.e - seg.s < 2) continue
        ctx.save()
        ctx.globalAlpha = r.opacity
        ctx.strokeStyle = seg.c
        ctx.lineWidth = 3
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(r.points[seg.s].x, r.points[seg.s].y)
        for (let i = seg.s + 1; i < seg.e; i++) {
          ctx.lineTo(r.points[i].x, r.points[i].y)
        }
        ctx.stroke()
        ctx.restore()
      }

      // Arrowhead
      if (r.phase !== "done" && r.phase !== "fading" && r.points.length > 3) {
        const last = r.points[r.points.length - 1]
        const prev = r.points[Math.max(0, r.points.length - 6)]
        const angle = Math.atan2(last.y - prev.y, last.x - prev.x)
        const c = colorFor(r)
        ctx.save()
        ctx.globalAlpha = r.opacity
        ctx.translate(last.x, last.y)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(10, 0)
        ctx.lineTo(-5, -6)
        ctx.lineTo(-5, 6)
        ctx.closePath()
        ctx.fillStyle = c
        ctx.fill()
        ctx.restore()
      }
    }

    function drawGHGBand() {
      const y = ghgY()
      const bh = 14
      ctx.save()
      const g = ctx.createLinearGradient(0, y - bh / 2, 0, y + bh / 2)
      g.addColorStop(0, "rgba(120,210,240,0)")
      g.addColorStop(0.35, "rgba(140,220,250,0.15)")
      g.addColorStop(0.65, "rgba(140,220,250,0.15)")
      g.addColorStop(1, "rgba(120,210,240,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, y - bh / 2, W, bh)
      ctx.restore()
    }

    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, W, H)

      if (playRef.current) {
        timer += dt
        if (timer >= INTERVAL) {
          timer = 0
          spawn()
        }
        for (const r of rays) update(r, dt)
        for (let i = rays.length - 1; i >= 0; i--) {
          if (rays[i].phase === "done") rays.splice(i, 1)
        }
      }

      drawGHGBand()
      for (const r of rays) draw(r)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
      rays.length = 0
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10"
    />
  )
}
