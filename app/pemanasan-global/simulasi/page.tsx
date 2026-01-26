"use client"

import * as React from "react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

export default function PemanasanGlobalSimulasiPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [pageIndex, setPageIndex] = React.useState(0)

  const pages = [
    "Kamu baru saja sampai di tahun 2065",
    "Lihatlah di sekitarmu, lingkungannya tampak berbeda",
    "Mari jelajahi dan cari tau apa yang sebenarnya terjadi!",
  ]

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

  const handleNext = () => {
    setPageIndex((prev) => Math.min(2, prev + 1))
  }

  return (
    <PageShell title="Simulasi Pemanasan Global">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simulasi Interaktif
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Pemanasan Global
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Area ini akan menampilkan simulasi pemanasan global.
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
              href="/pemanasan-global"
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
        <div className={`relative w-full ${isFullscreen ? "h-full" : "p-4 md:p-5"}`}>
          <div
            className={`relative w-full overflow-hidden rounded-xl border bg-white/80 shadow-sm ${
              isFullscreen ? "h-full" : "aspect-video"
            }`}
          >
            <div className="absolute inset-0 flex flex-col justify-between bg-[#f7f5f0]">
              <div className="absolute left-6 top-6 w-[70%] max-w-md rounded-lg bg-[#bcd4dd] p-4 text-sm text-slate-800 shadow">
                {pages[pageIndex]}
              </div>

              {pageIndex === 2 ? (
                <div className="absolute left-6 top-[45%] w-[75%] max-w-lg rounded-lg bg-[#bcd4dd] p-4 text-sm text-slate-800 shadow">
                  <p>
                    Dunia telah banyak berubah akibat krisis iklim. Lingkungan,
                    kota, dan kehidupan manusia tidak lagi seperti yang kita
                    kenal sekarang. Saatnya kamu menjelajah dan mencari tahu apa
                    yang terjadi!
                  </p>
                  <p className="mt-3 font-semibold">
                    Tantangan: Pergilah ke wilayah A-F untuk menyelesaikan misi!
                  </p>
                </div>
              ) : null}

              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
                {pageIndex === 2 ? (
                  <Link
                    href="/pemanasan-global/simulasi/peta"
                    className="rounded-full bg-yellow-400 px-6 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300"
                  >
                    Lihat mapnya &gt;
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-full bg-yellow-400 px-6 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300"
                  >
                    Lanjut
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
