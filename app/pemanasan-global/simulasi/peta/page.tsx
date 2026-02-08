"use client"

import * as React from "react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

import { usePetaProgress } from "./peta-progress-context"

type Island = {
  id: string
  name: string
  top: number
  left: number
  imageSrc: string
}

const islands: Island[] = [
  {
    id: "a",
    name: "Pulau A",
    top: 47,
    left: 40,
    imageSrc: "/images/pulau/p-kebakaranhutan.png",
  },
  {
    id: "b",
    name: "Pulau B",
    top: 73,
    left: 12,
    imageSrc: "/images/pulau/p-petanigaram.png",
  },
  {
    id: "c",
    name: "Pulau C",
    top: 18,
    left: 16,
    imageSrc: "/images/pulau/p-kutub.png",
  },
  {
    id: "d",
    name: "Pulau D",
    top: 18,
    left: 59,
    imageSrc: "/images/pulau/p-banjir.png",
  },
  {
    id: "e",
    name: "Pulau E",
    top: 34,
    left: 86,
    imageSrc: "/images/pulau/p-petanigagal.png",
  },
  {
    id: "f",
    name: "Pulau F",
    top: 78,
    left: 72,
    imageSrc: "/images/pulau/p-polusiudara.png",
  },
]

export default function PemanasanGlobalPetaPage() {
  const mapRef = React.useRef<HTMLDivElement | null>(null)
  const { userPos, setUserPos, visitedIslands } = usePetaProgress()
  const [selectedIsland, setSelectedIsland] = React.useState<Island | null>(null)
  const [showCompletion, setShowCompletion] = React.useState(false)

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
          className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-[url('/images/pulau/bg.png')] bg-cover bg-center bg-no-repeat"
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
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 transition duration-200 hover:scale-105 ${
                selectedIsland?.id === island.id ? "scale-105" : ""
              }`}
              style={{ top: `${island.top}%`, left: `${island.left}%` }}
            >
              <span className="sr-only">{island.name}</span>
              <img
                src={island.imageSrc}
                alt={island.name}
                className={`h-[6.5rem] w-[6.5rem] object-contain drop-shadow-[0_8px_14px_rgba(15,23,42,0.38)] transition duration-200 sm:h-[7.5rem] sm:w-[7.5rem] md:h-36 md:w-36 ${
                  visitedIslands.has(island.id)
                    ? "brightness-110 saturate-110"
                    : "brightness-60 saturate-75 contrast-90 group-hover:brightness-75"
                } ${selectedIsland?.id === island.id ? "drop-shadow-[0_10px_20px_rgba(250,204,21,0.55)]" : ""}`}
              />
              {visitedIslands.has(island.id) ? (
                <span className="absolute left-1/2 top-1/2 inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white shadow-lg ring-2 ring-white/80">
                  ✓
                </span>
              ) : null}
            </button>
          ))}

          <img
            src="/images/kapal.png"
            alt=""
            aria-hidden="true"
            className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg transition-[top,left] duration-700 ease-in-out md:h-12 md:w-12"
            style={{ top: `${userPos.y}%`, left: `${userPos.x}%` }}
          />

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
