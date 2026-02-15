"use client"

import { useEffect, useRef } from "react"

type EnergyWavesProps = {
  isPlaying: boolean
  groundPx?: number
  groundRatio?: number
  ghgLevel?: number
  isFullscreen?: boolean
}

type RayPhase =
  | "sunlight-down"
  | "infrared-up"
  | "erh-down"
  | "escape-up"
  | "fading"    // head stopped, tail still draining
  | "done"

type Pt = { x: number; y: number }

type Ray = {
  points: Pt[]
  headX: number
  headY: number
  vx: number
  vy: number
  phase: RayPhase
  speed: number
  sunColor: string
  irColor: string
  erhColor: string
  bounceCount: number
  maxBounces: number
  trailLen: number      // max visible trail length (in points)
  opacity: number
}

export default function EnergyWaves({
  isPlaying,
  groundPx = 190,
  groundRatio,
  ghgLevel = 50,
  isFullscreen = false,
}: EnergyWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)
  const ghgRef = useRef(ghgLevel)
  const playRef = useRef(isPlaying)
  const fullscreenRef = useRef(isFullscreen)

  useEffect(() => {
    ghgRef.current = ghgLevel
  }, [ghgLevel])
  useEffect(() => {
    playRef.current = isPlaying
  }, [isPlaying])
  useEffect(() => {
    fullscreenRef.current = isFullscreen
  }, [isFullscreen])

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

    const groundY = () => {
      if (typeof groundRatio === "number") {
        const ratio = Math.max(0, Math.min(1, groundRatio))
        return Math.max(60, H * ratio)
      }
      return Math.max(60, H - groundPx)
    }
    const ghgLayerY = () => H * 0.22

    const SUN_COLORS = ["#f5a623", "#f7c948", "#e8951a", "#dba12a"]
    const IR_COLORS = ["#d7332f", "#e8563a", "#c02020", "#d94545"]
    const ERH_COLORS = ["#e85a20", "#d94545", "#c02020"]

    function pick<T>(arr: T[]): T {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    function normalize(x: number, y: number, spd: number): [number, number] {
      const len = Math.sqrt(x * x + y * y) || 1
      return [(x / len) * spd, (y / len) * spd]
    }

    // ── Config ──
    const RAYS_PER_BATCH = 6
    const ANGLE = (25 * Math.PI) / 180
    const BASE_SPEED = 130

    // Trail length: proportional to screen height
    // Sunlight trail is longer, bounce trails are shorter
    function sunTrailLen() {
      return Math.round(H * 0.55)
    }
    function bounceTrailLen() {
      return Math.round(H * 0.30)
    }

    // Interval between batches: 15s fullscreen, 10s normal
    function getBatchInterval() {
      return fullscreenRef.current ? 15 : 10
    }

    const allRays: Ray[] = []
    let batchTimer = 0

    // Tail drain speed: how many points to remove per second
    const DRAIN_SPEED = 200

    function createBatch() {
      const sunColor = pick(SUN_COLORS)
      const irColor = pick(IR_COLORS)
      const erhColor = pick(ERH_COLORS)

      for (let i = 0; i < RAYS_PER_BATCH; i++) {
        const originX = W * 0.02 + i * W * 0.025
        const originY = -5 - i * 12

        const speed = BASE_SPEED
        const vx = Math.sin(ANGLE) * speed
        const vy = Math.cos(ANGLE) * speed

        allRays.push({
          points: [{ x: originX, y: originY }],
          headX: originX,
          headY: originY,
          vx,
          vy,
          phase: "sunlight-down",
          speed,
          sunColor,
          irColor,
          erhColor,
          bounceCount: 0,
          maxBounces: 2 + Math.floor(Math.random() * 2),
          trailLen: sunTrailLen(),
          opacity: 0.85,
        })
      }
    }

    createBatch()

    function getColor(ray: Ray): string {
      switch (ray.phase) {
        case "sunlight-down":
          return ray.sunColor
        case "infrared-up":
          return ray.irColor
        case "erh-down":
          return ray.erhColor
        case "escape-up":
        case "fading":
          return ray.irColor
        default:
          return ray.sunColor
      }
    }

    function updateRay(ray: Ray, dt: number) {
      if (ray.phase === "done") return

      // === FADING phase: head stopped, drain tail ===
      if (ray.phase === "fading") {
        const drain = Math.max(1, Math.round(DRAIN_SPEED * dt))
        for (let d = 0; d < drain && ray.points.length > 0; d++) {
          ray.points.shift()
        }
        if (ray.points.length === 0) {
          ray.phase = "done"
        }
        return
      }

      const gy = groundY()
      const ghgY = ghgLayerY()
      const level = Math.max(0, Math.min(100, ghgRef.current))
      const bounceChance = level / 100

      // Move head
      ray.headX += ray.vx * dt
      ray.headY += ray.vy * dt
      ray.points.push({ x: ray.headX, y: ray.headY })

      // Trim tail to trail length
      while (ray.points.length > ray.trailLen) {
        ray.points.shift()
      }

      switch (ray.phase) {
        case "sunlight-down": {
          if (ray.headY >= gy) {
            ray.headY = gy
            ray.points.push({ x: ray.headX, y: ray.headY })
            // Mirror reflection
            const [nvx, nvy] = normalize(ray.vx, -Math.abs(ray.vy), ray.speed)
            ray.vx = nvx
            ray.vy = nvy
            ray.phase = "infrared-up"
            // Shorter trail for bounces
            ray.trailLen = bounceTrailLen()
          }
          break
        }
        case "infrared-up": {
          if (ray.headY <= ghgY) {
            ray.headY = ghgY
            ray.points.push({ x: ray.headX, y: ray.headY })
            if (Math.random() < bounceChance) {
              const [nvx, nvy] = normalize(ray.vx, Math.abs(ray.vy), ray.speed)
              ray.vx = nvx
              ray.vy = nvy
              ray.phase = "erh-down"
            } else {
              ray.phase = "escape-up"
            }
          }
          break
        }
        case "erh-down": {
          if (ray.headY >= gy) {
            ray.headY = gy
            ray.points.push({ x: ray.headX, y: ray.headY })
            ray.bounceCount++
            if (ray.bounceCount >= ray.maxBounces) {
              // Stop head, start fading
              ray.phase = "fading"
            } else {
              const [nvx, nvy] = normalize(ray.vx, -Math.abs(ray.vy), ray.speed)
              ray.vx = nvx
              ray.vy = nvy
              ray.phase = "infrared-up"
            }
          }
          break
        }
        case "escape-up": {
          if (ray.headY < -50) {
            // Stop head, start fading tail out
            ray.phase = "fading"
          }
          break
        }
      }
    }

    function drawRay(ray: Ray) {
      if (ray.points.length < 2) return

      // Split into colored segments based on direction changes
      let segStart = 0
      let prevDir: "down" | "up" =
        ray.points[1].y >= ray.points[0].y ? "down" : "up"
      let bCount = 0

      const segments: { start: number; end: number; color: string }[] = []

      for (let i = 1; i < ray.points.length; i++) {
        const dy = ray.points[i].y - ray.points[i - 1].y
        const curDir: "down" | "up" = dy >= 0 ? "down" : "up"

        if (curDir !== prevDir) {
          const color =
            prevDir === "down" && bCount === 0
              ? ray.sunColor
              : prevDir === "up"
                ? ray.irColor
                : ray.erhColor

          segments.push({ start: segStart, end: i, color })
          segStart = i - 1
          if (prevDir === "down") bCount++
          prevDir = curDir
        }
      }

      const finalColor =
        prevDir === "down" && bCount === 0
          ? ray.sunColor
          : prevDir === "up"
            ? ray.irColor
            : ray.erhColor
      segments.push({ start: segStart, end: ray.points.length, color: finalColor })

      for (const seg of segments) {
        if (seg.end - seg.start < 2) continue
        ctx.save()
        ctx.globalAlpha = ray.opacity
        ctx.strokeStyle = seg.color
        ctx.lineWidth = 3.5
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(ray.points[seg.start].x, ray.points[seg.start].y)
        for (let i = seg.start + 1; i < seg.end; i++) {
          ctx.lineTo(ray.points[i].x, ray.points[i].y)
        }
        ctx.stroke()
        ctx.restore()
      }

      // Arrowhead
      if (ray.phase !== "done" && ray.phase !== "fading" && ray.points.length > 3) {
        const last = ray.points[ray.points.length - 1]
        const prev = ray.points[Math.max(0, ray.points.length - 6)]
        const angle = Math.atan2(last.y - prev.y, last.x - prev.x)
        const color = getColor(ray)

        ctx.save()
        ctx.globalAlpha = ray.opacity
        ctx.translate(last.x, last.y)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(12, 0)
        ctx.lineTo(-6, -7)
        ctx.lineTo(-6, 7)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        ctx.restore()
      }
    }

    function drawGHGLayer() {
      const level = Math.max(0, Math.min(100, ghgRef.current))
      if (level <= 0) return
      const ghgY = ghgLayerY()
      const layerH = 6 + (level / 100) * 35

      ctx.save()
      const grad = ctx.createLinearGradient(0, ghgY - layerH / 2, 0, ghgY + layerH / 2)
      const alpha = 0.06 + (level / 100) * 0.22
      grad.addColorStop(0, "rgba(100,200,235,0)")
      grad.addColorStop(0.3, `rgba(140,210,240,${alpha})`)
      grad.addColorStop(0.5, `rgba(160,220,250,${alpha * 1.3})`)
      grad.addColorStop(0.7, `rgba(140,210,240,${alpha})`)
      grad.addColorStop(1, "rgba(100,200,235,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, ghgY - layerH / 2, W, layerH)
      ctx.restore()
    }

    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, W, H)

      if (playRef.current) {
        // Spawn new batch periodically (multiple batches can coexist)
        batchTimer += dt
        if (batchTimer >= getBatchInterval()) {
          batchTimer = 0
          createBatch()
        }

        // Update all rays
        for (const r of allRays) updateRay(r, dt)

        // Remove fully done rays (trail drained)
        for (let i = allRays.length - 1; i >= 0; i--) {
          if (allRays[i].phase === "done") {
            allRays.splice(i, 1)
          }
        }
      }

      drawGHGLayer()
      for (const r of allRays) drawRay(r)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
      allRays.length = 0
    }
  }, [groundPx, groundRatio])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
    />
  )
}
