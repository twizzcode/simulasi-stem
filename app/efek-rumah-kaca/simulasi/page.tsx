"use client"

import dynamic from "next/dynamic"

const EnergyWaves = dynamic(() => import("@/components/energy-waves"), {
  ssr: false,
})

import * as React from "react"
import Link from "next/link"

import { Calendar, Pause, Play, SlidersVertical } from "lucide-react"

import { PageShell } from "@/components/page-shell"
import { Slider } from "@/components/ui/slider"

export default function EfekRumahKacaSimulasiPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isCompactDevice, setIsCompactDevice] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isPortrait, setIsPortrait] = React.useState(false)
  const [ghgLevel, setGhgLevel] = React.useState(50)
  const [showCloud, setShowCloud] = React.useState(false)
  const [ghgMode, setGhgMode] = React.useState<"slider" | "calendar">("slider")
  const [yearSelected, setYearSelected] = React.useState<
    "1990" | "2025" | "2050"
  >("2025")
  const [isPlaying, setIsPlaying] = React.useState(false)
  const yearLevels: Record<"1990" | "2025" | "2050", number> = {
    "1990": 25,
    "2025": 60,
    "2050": 85,
  }

  // Sync ghgLevel with year when in calendar mode
  React.useEffect(() => {
    if (ghgMode === "calendar") {
      setGhgLevel(yearLevels[yearSelected])
    }
  }, [ghgMode, yearSelected])

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

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)")
    const syncOrientation = () => setIsPortrait(mediaQuery.matches)
    syncOrientation()
    mediaQuery.addEventListener("change", syncOrientation)
    return () => {
      mediaQuery.removeEventListener("change", syncOrientation)
    }
  }, [])

  React.useEffect(() => {
    const syncCompact = () => {
      setIsCompactDevice(window.innerWidth < 768 || window.innerHeight < 768)
    }
    syncCompact()
    window.addEventListener("resize", syncCompact)
    return () => window.removeEventListener("resize", syncCompact)
  }, [])

  const handleFullscreen = async () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      if (isCompactDevice) {
        try {
          await (screen.orientation as ScreenOrientation).unlock()
        } catch {
          // Ignore orientation unlock failures on unsupported browsers.
        }
      }
      return
    }
    await containerRef.current.requestFullscreen()
    if (isCompactDevice) {
      try {
        await (screen.orientation as ScreenOrientation).lock("landscape")
      } catch {
        // Ignore orientation lock failures on unsupported browsers.
      }
    }
  }

  const shouldRotateFullscreenMobile =
    isFullscreen && isCompactDevice && isPortrait
  const simulationGroundPx = isFullscreen ? 190 : 100
  const simulationGroundRatio = isCompactDevice
    ? isFullscreen
      ? 0.86
      : 0.86
    : undefined

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
        {isFullscreen ? (
          <button
            type="button"
            onClick={handleFullscreen}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-white"
          >
            Keluar Full Screen
          </button>
        ) : null}
        <div
          className={`relative w-full ${
            isFullscreen ? "h-full" : "aspect-video md:aspect-auto md:min-h-[60vh]"
          }`}
        >
          <div
            className={`absolute inset-0 ${
              shouldRotateFullscreenMobile
                ? "flex items-center justify-center bg-black"
                : ""
            }`}
          >
            <div
              className={`relative h-full w-full ${
                shouldRotateFullscreenMobile
                  ? "h-[100vw] w-[100vh] -rotate-90"
                  : ""
              }`}
            >
              <div
                className="absolute inset-0 flex flex-row gap-4 p-4 md:p-5"
              >
                <div className="relative basis-3/4 flex-none overflow-hidden rounded-xl border bg-black shadow-sm">
              <img
                src={
                  ghgMode === "calendar"
                    ? yearSelected === "1990"
                      ? "/images/1.png"
                      : yearSelected === "2025"
                        ? "/images/2.png"
                        : "/images/3.png"
                    : showCloud
                      ? "/images/5.png"
                      : "/images/4.png"
                }
                alt="Simulasi efek rumah kaca"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <EnergyWaves
                isPlaying={isPlaying}
                groundPx={simulationGroundPx}
                groundRatio={simulationGroundRatio}
                ghgLevel={ghgLevel}
                isFullscreen={isFullscreen}
              />
            </div>

                <div className="flex h-full w-full basis-1/4 flex-none flex-col gap-3 overflow-auto">
              <div className="rounded-2xl border bg-white/80 p-4 text-foreground shadow-sm">
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
                {ghgMode === "slider" ? (
                  <>
                    <div className="mt-3 flex h-52 flex-col items-center justify-between">
                      <span className="text-xs text-muted-foreground">Lots</span>
                      <div className="flex h-36 items-center">
                        <Slider
                          orientation="vertical"
                          value={[ghgLevel]}
                          onValueChange={(value) =>
                            setGhgLevel(value[0] ?? 0)
                          }
                          className="w-10 [&_[data-slot=slider-track]]:bg-black/80 [&_[data-slot=slider-range]]:bg-black/80 [&_[data-slot=slider-thumb]]:h-3 [&_[data-slot=slider-thumb]]:w-10 [&_[data-slot=slider-thumb]]:rounded-md [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-[#0a83a8] [&_[data-slot=slider-thumb]]:bg-[#3a86a8]"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">None</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3 flex h-52 items-center justify-center gap-4">
                      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
                        <span>Lots</span>
                        <div className="relative h-36 w-8">
                          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-black/80" />
                          <div
                            className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                            style={{
                              top: `${100 - yearLevels[yearSelected]}%`,
                            }}
                          />
                        </div>
                        <span>None</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {(["2050", "2025", "1990"] as const).map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => setYearSelected(year)}
                            className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                              yearSelected === year
                                ? "border-primary bg-primary/10 text-primary"
                                : "bg-white/90 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGhgMode("slider")}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                      ghgMode === "slider"
                        ? "border-primary bg-primary/10 text-primary"
                        : "bg-white/90 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                    aria-pressed={ghgMode === "slider"}
                  >
                    <SlidersVertical className="inline-block h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGhgMode("calendar")
                      setShowCloud(false)
                    }}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                      ghgMode === "calendar"
                        ? "border-primary bg-primary/10 text-primary"
                        : "bg-white/90 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                    aria-pressed={ghgMode === "calendar"}
                  >
                    <Calendar className="inline-block h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Gelombang Energi</span>
                  <span>{isPlaying ? "Berjalan" : "Berhenti"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    isPlaying
                      ? "border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                  {isPlaying ? "Pause" : "Mulai Simulasi"}
                </button>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
