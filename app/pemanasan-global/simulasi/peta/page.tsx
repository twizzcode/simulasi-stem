"use client"

import * as React from "react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

type Island = {
  id: string
  name: string
  top: number
  left: number
}

const islands: Island[] = [
  { id: "a", name: "Pulau A", top: 18, left: 18 },
  { id: "b", name: "Pulau B", top: 18, left: 60 },
  { id: "c", name: "Pulau C", top: 45, left: 35 },
  { id: "d", name: "Pulau D", top: 60, left: 12 },
  { id: "e", name: "Pulau E", top: 60, left: 68 },
  { id: "f", name: "Pulau F", top: 78, left: 40 },
]

export default function PemanasanGlobalPetaPage() {
  const mapRef = React.useRef<HTMLDivElement | null>(null)
  const [userPos, setUserPos] = React.useState({ x: 50, y: 50 })
  const [selectedIsland, setSelectedIsland] = React.useState<Island | null>(null)
  const [visitedIslands, setVisitedIslands] = React.useState<Set<string>>(
    () => new Set()
  )
  const [showCompletion, setShowCompletion] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem("pemanasan-global-visited")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[]
        const nextSet = new Set(parsed)
        setVisitedIslands(nextSet)
        if (nextSet.size >= islands.length) {
          setShowCompletion(true)
        }
      } catch {
        setVisitedIslands(new Set())
      }
    }
    const storedPos = localStorage.getItem("pemanasan-global-user-pos")
    if (storedPos) {
      try {
        const parsed = JSON.parse(storedPos) as { x: number; y: number }
        if (
          typeof parsed.x === "number" &&
          typeof parsed.y === "number" &&
          Number.isFinite(parsed.x) &&
          Number.isFinite(parsed.y)
        ) {
          setUserPos({ x: parsed.x, y: parsed.y })
        }
      } catch {
        // ignore invalid storage
      }
    }
  }, [])

  React.useEffect(() => {
    if (visitedIslands.size >= islands.length) {
      setShowCompletion(true)
    }
  }, [visitedIslands])

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value))

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setSelectedIsland(null)
    const nextPos = { x: clamp(x, 4, 96), y: clamp(y, 6, 94) }
    setUserPos(nextPos)
    localStorage.setItem("pemanasan-global-user-pos", JSON.stringify(nextPos))
  }

  return (
    <PageShell title="Peta Pulau">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simulasi Interaktif
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Peta Pulau
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Klik area peta untuk berjalan. Klik pulau untuk melihat opsi
              kunjungan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/pemanasan-global/simulasi"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              Kembali
            </Link>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border bg-[#f1ecdc] p-4 shadow-sm md:p-5">
        <div
          ref={mapRef}
          onClick={handleMapClick}
          className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_60%),linear-gradient(120deg,#3b5d7a,#8fb1c8_45%,#d6d4c8_80%)]"
        >
          {islands.map((island) => (
            <button
              key={island.id}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setSelectedIsland(island)
                const nextPos = { x: island.left, y: island.top }
                setUserPos(nextPos)
                localStorage.setItem("pemanasan-global-user-pos", JSON.stringify(nextPos))
              }}
              className={`absolute flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-semibold text-white shadow-md transition hover:scale-105 ${
                visitedIslands.has(island.id)
                  ? "border-emerald-200 bg-emerald-700"
                  : selectedIsland?.id === island.id
                    ? "border-yellow-300 bg-emerald-600"
                    : "border-white/60 bg-emerald-500"
              }`}
              style={{ top: `${island.top}%`, left: `${island.left}%` }}
            >
              <span className="flex flex-col items-center gap-1">
                <span>{island.name}</span>
                {visitedIslands.has(island.id) ? (
                  <span className="text-sm">✓</span>
                ) : null}
              </span>
            </button>
          ))}

          <div
            className="absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-yellow-400 text-xs font-semibold text-slate-900 shadow-lg transition-[top,left] duration-700 ease-in-out"
            style={{ top: `${userPos.y}%`, left: `${userPos.x}%` }}
          >
            Kamu
          </div>

          {selectedIsland ? (
            <div
              className="absolute bottom-4 left-4 rounded-xl border bg-white/90 p-4 text-sm text-slate-700 shadow-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="font-semibold text-slate-900">
                {selectedIsland.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Klik untuk mengunjungi pulau ini.
              </p>
              <Link
                href={`/pemanasan-global/simulasi/peta/pulau/${selectedIsland.id}`}
                className="mt-3 inline-flex rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300"
                onClick={(event) => event.stopPropagation()}
              >
                Jelajahi Pulau
              </Link>
            </div>
          ) : null}
          {showCompletion ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
                <h3 className="text-lg font-semibold text-foreground">
                  Selamat!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Kamu sudah menyelesaikan semua misi. Terima kasih telah
                  menjelajah dan membantu memahami dampak krisis iklim.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCompletion(false)}
                    className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    Tutup
                  </button>
                  <Link
                    href="/pemanasan-global/sertifikat"
                    className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    Download Sertifikat
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageShell>
  )
}
