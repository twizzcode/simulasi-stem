"use client"

import * as React from "react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"
import { Separator } from "@/components/ui/separator"
import { questions } from "./questions"

export default function ClimateActionQuizPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isCompactDevice, setIsCompactDevice] = React.useState(false)
  const [isPortrait, setIsPortrait] = React.useState(false)
  const [isViewportPortrait, setIsViewportPortrait] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [answers, setAnswers] = React.useState<Record<string, number | null>>(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  )
  const [submitted, setSubmitted] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [flagged, setFlagged] = React.useState<Record<string, boolean>>(
    Object.fromEntries(questions.map((q) => [q.id, false]))
  )

  const total = questions.length
  const current = questions[currentIndex]
  const correctCount = questions.reduce((acc, q) => {
    const answer = answers[q.id]
    return acc + (answer === q.correctIndex ? 1 : 0)
  }, 0)
  const score = Math.round((correctCount / total) * 100)
  const wrongCount = total - correctCount

  const handleSelect = (id: string, index: number) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [id]: index }))
  }

  const handleToggleFlag = (id: string) => {
    if (submitted) return
    setFlagged((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

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
      setIsViewportPortrait(window.innerHeight >= window.innerWidth)
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
          await (screen.orientation as any).unlock()
        } catch {
          // Ignore orientation unlock failures on unsupported browsers.
        }
      }
      return
    }

    await containerRef.current.requestFullscreen()
    if (isCompactDevice) {
      try {
        await (screen.orientation as any).lock("landscape")
      } catch {
        // Ignore orientation lock failures on unsupported browsers.
      }
    }
  }

  const shouldRotateFullscreenMobile =
    isFullscreen && isCompactDevice && (isPortrait || isViewportPortrait)

  return (
    <PageShell title="Kuis Climate Action">
      <section
        className={`rounded-2xl border bg-card p-6 shadow-sm md:p-8 ${
          isFullscreen ? "hidden" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Evaluasi Pemahaman
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Kuis Climate Action
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Template kuis pilihan ganda. Silakan ubah daftar soal pada data
              di bagian atas file ini.
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
              href="/climate-action"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              Kembali
            </Link>
          </div>
        </div>
      </section>

      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-card shadow-sm ${
          isFullscreen ? "rounded-none border-0" : "rounded-2xl border"
        } ${isFullscreen ? "h-full" : "aspect-video"}`}
      >
        {isFullscreen ? (
          <button
            type="button"
            onClick={handleFullscreen}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-white"
          >
            Keluar Full Screen
          </button>
        ) : null}

        <div className="relative h-full w-full">
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
                className={`h-full overflow-auto ${
                  isFullscreen ? "p-4 md:p-6" : "p-6 md:p-8"
                }`}
              >
                {!submitted ? (
                  <section className="rounded-2xl border bg-card shadow-sm p-6 md:p-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto_260px]">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Soal {currentIndex + 1} dari {total}
                        </p>
                        <h2 className="mt-2 text-base font-semibold text-foreground">
                          {current.text}
                        </h2>
                        <div className="mt-4 grid gap-2">
                          {current.options.map((option, optionIndex) => {
                            const selected = answers[current.id]
                            const isSelected = selected === optionIndex
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleSelect(current.id, optionIndex)}
                                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                                  isSelected
                                    ? "border-primary bg-primary/10 text-foreground"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                                }`}
                              >
                                <span className="flex size-7 items-center justify-center rounded-full border text-xs font-semibold">
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                                <span>{option}</span>
                              </button>
                            )
                          })}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentIndex === 0}
                            className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground disabled:opacity-50"
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentIndex((prev) => Math.min(prev + 1, total - 1))
                            }
                            disabled={currentIndex === total - 1}
                            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-60"
                          >
                            Next
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleFlag(current.id)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                              flagged[current.id]
                                ? "border-amber-400 bg-amber-100 text-amber-900"
                                : "border-primary/30 bg-background text-primary hover:border-primary/60"
                            }`}
                          >
                            {flagged[current.id] ? "Ragu-ragu" : "Tandai Ragu-ragu"}
                          </button>
                          {currentIndex === total - 1 ? (
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                            >
                              Submit
                            </button>
                          ) : null}
                        </div>
                      </div>

                      <Separator className="hidden lg:block" orientation="vertical" />

                      <aside>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Navigasi Soal
                        </p>
                        <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-7 lg:grid-cols-4">
                          {questions.map((q, idx) => {
                            const answered = answers[q.id] !== null
                            const isActive = idx === currentIndex
                            const isFlagged = flagged[q.id]
                            return (
                              <button
                                key={q.id}
                                type="button"
                                onClick={() => setCurrentIndex(idx)}
                                className={`flex h-9 items-center justify-center rounded-lg border text-xs font-semibold transition ${
                                  isActive
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:border-primary/40"
                                } ${
                                  answered && !isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : ""
                                } ${
                                  isFlagged
                                    ? "border-amber-400 bg-amber-50 text-amber-700"
                                    : ""
                                }`}
                              >
                                {idx + 1}
                              </button>
                            )
                          })}
                        </div>
                        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                          <p>• Hijau: sudah dijawab</p>
                          <p>• Kuning: ditandai ragu-ragu</p>
                          <p>• Biru: soal aktif</p>
                        </div>
                      </aside>
                    </div>
                  </section>
                ) : (
                  <>
                    <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
                      <div className="flex flex-col gap-6">
                        <div>
                          <h2 className="text-lg font-semibold text-foreground">Hasil Kuis</h2>
                          <p className="mt-1 text-sm text-muted-foreground">Ringkasan skor akhir.</p>
                        </div>
                        <div className="flex w-full flex-col items-center gap-4">
                          <div className="relative flex w-full items-center justify-center">
                            <svg viewBox="0 0 36 36" className="h-52 w-full max-w-[320px]">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                className="text-muted-foreground/20"
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                className="text-emerald-500"
                                strokeWidth="3"
                                strokeDasharray={`${score}, 100`}
                              />
                            </svg>
                            <span className="absolute text-base font-semibold text-foreground">{score}%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {correctCount} benar · {wrongCount} salah
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
                      <h3 className="text-lg font-semibold text-foreground">Pembahasan & Jawaban</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Berikut detail jawaban beserta pilihan yang benar.
                      </p>
                      <div className="mt-6 space-y-4">
                        {questions.map((q, idx) => {
                          const selected = answers[q.id]
                          return (
                            <article key={q.id} className="rounded-xl border bg-background/60 p-4">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Soal {idx + 1}
                              </p>
                              <h3 className="mt-2 text-base font-semibold text-foreground">{q.text}</h3>
                              <div className="mt-3 grid gap-2">
                                {q.options.map((option, optionIndex) => {
                                  const isSelected = selected === optionIndex
                                  const isCorrect = optionIndex === q.correctIndex
                                  return (
                                    <div
                                      key={option}
                                      className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                                        isCorrect
                                          ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                                          : "border-border bg-background text-muted-foreground"
                                      } ${
                                        isSelected && !isCorrect
                                          ? "border-red-400 bg-red-50 text-red-900"
                                          : ""
                                      }`}
                                    >
                                      <span className="flex size-6 items-center justify-center rounded-full border text-[11px] font-semibold">
                                        {String.fromCharCode(65 + optionIndex)}
                                      </span>
                                      <span className="flex-1">{option}</span>
                                      {isCorrect ? (
                                        <span className="text-[11px] font-semibold text-emerald-700">Benar</span>
                                      ) : null}
                                      {isSelected && !isCorrect ? (
                                        <span className="text-[11px] font-semibold text-red-700">Pilihanmu</span>
                                      ) : null}
                                    </div>
                                  )
                                })}
                              </div>
                              {q.explanation ? (
                                <p className="mt-3 text-xs text-muted-foreground">{q.explanation}</p>
                              ) : null}
                            </article>
                          )
                        })}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
