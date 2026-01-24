"use client"

import * as React from "react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

export default function EfekRumahKacaSimulasiPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    handleChange()
    document.addEventListener("fullscreenchange", handleChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleChange)
    }
  }, [])

  const handleFullscreen = async () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }
    await containerRef.current.requestFullscreen()
  }

  return (
    <PageShell title="Simulasi Efek Rumah Kaca">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simulasi Interaktif
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Efek Rumah Kaca
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Dummy text: nantinya area ini akan berisi simulasi interaktif.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFullscreen}
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {isFullscreen ? "Keluar Full Screen" : "Full Screen"}
            </button>
            <Link
              href="/efek-rumah-kaca"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              Kembali
            </Link>
          </div>
        </div>
      </section>

      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-[#f1ecdc] shadow-sm ${
          isFullscreen ? "rounded-none border-0" : "rounded-2xl border"
        }`}
      >
        <div
          className={`relative w-full ${
            isFullscreen ? "h-full" : "min-h-[60vh]"
          }`}
        >
          <div className="absolute inset-0 flex flex-col gap-4 p-4 md:flex-row md:p-5">
            <div className="relative flex-1 overflow-hidden rounded-xl border bg-gradient-to-b from-[#2c5b6e] via-[#2d8fb9] to-[#7bc5dd] shadow-sm">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[#98a964]" />
              <div className="absolute inset-x-0 bottom-12 h-24 rounded-t-[70%] bg-[#7a9a5f]" />
              <div className="absolute inset-x-0 bottom-16 h-20 rounded-t-[60%] bg-[#5f7f7f]" />
              <div className="absolute inset-x-0 bottom-20 h-16 rounded-t-[50%] bg-[#486a78]" />

              <div className="absolute left-24 top-28 h-10 w-24 rounded-full bg-white/80 shadow-sm" />
              <div className="absolute left-20 top-30 h-8 w-16 rounded-full bg-white/90 shadow-sm" />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 800 450"
                preserveAspectRatio="none"
              >
                <path
                  d="M120 40 C 100 120, 140 200, 120 300"
                  stroke="#d8db47"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M240 10 C 220 130, 260 210, 240 340"
                  stroke="#d8db47"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M360 30 C 340 140, 380 230, 360 360"
                  stroke="#d8db47"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M500 40 C 480 150, 520 230, 500 360"
                  stroke="#d8db47"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M180 80 C 160 170, 200 250, 180 380"
                  stroke="#d7332f"
                  strokeWidth="5"
                  fill="none"
                />
                <path
                  d="M420 60 C 400 170, 440 260, 420 380"
                  stroke="#d7332f"
                  strokeWidth="5"
                  fill="none"
                />
                <path
                  d="M650 70 C 630 170, 670 260, 650 380"
                  stroke="#d7332f"
                  strokeWidth="5"
                  fill="none"
                />
              </svg>

              <div className="absolute left-5 bottom-6 flex flex-col items-center gap-2">
                <div className="relative h-40 w-8 rounded-full border-4 border-black bg-white">
                  <div className="absolute bottom-2 left-1/2 h-16 w-3 -translate-x-1/2 rounded-full bg-red-600" />
                  <div className="absolute -bottom-2 left-1/2 size-10 -translate-x-1/2 rounded-full border-4 border-black bg-red-700" />
                </div>
                <div className="rounded-full border bg-white/90 px-3 py-1 text-xs font-semibold">
                  3.0 °C
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border bg-white/80 px-3 py-2 text-xs font-semibold">
                <span className="inline-flex size-4 items-center justify-center rounded-sm border bg-white" />
                Energy Balance
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-64">
              <div className="rounded-2xl border bg-black/90 p-4 text-white shadow-sm">
                <h3 className="text-center text-sm font-semibold">Energy</h3>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span>Sunlight</span>
                  <span className="h-1.5 w-10 rounded-full bg-[#d8db47]" />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span>Infrared</span>
                  <span className="h-1.5 w-10 rounded-full bg-[#d7332f]" />
                </div>
              </div>

              <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
                <h3 className="text-sm font-semibold">
                  Greenhouse Gas Concentration
                </h3>
                <div className="mt-3 flex h-36 items-center justify-center">
                  <div className="relative h-full w-2 rounded-full bg-black/70">
                    <div className="absolute left-1/2 top-1/2 h-6 w-8 -translate-x-1/2 -translate-y-1/2 rounded bg-[#4a90b8] shadow-sm" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>None</span>
                  <span>Lots</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button className="rounded-lg border bg-white/90 px-3 py-2 text-xs font-semibold">
                    CO2
                  </button>
                  <button className="rounded-lg border bg-white/90 px-3 py-2 text-xs font-semibold">
                    CH4
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Cloud</span>
                  <span>Aktif</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex size-4 items-center justify-center rounded-sm border bg-white" />
                  Tampilkan Awan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
