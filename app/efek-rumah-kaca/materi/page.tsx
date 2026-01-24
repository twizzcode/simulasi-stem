"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { PageShell } from "@/components/page-shell"
import { useIsMobile } from "@/hooks/use-mobile"

const steps = [
  {
    title: "Step 1 · Perumpamaan Rumah Kaca",
    desc: "Bumi diibaratkan sebagai rumah kaca, sedangkan manusia, hewan, tumbuhan, dan seluruh aktivitas kehidupan di dalamnya diibaratkan sebagai tanaman yang berada di dalam rumah kaca.",
    image: "/images/rumah-kaca-1.png",
  },
  {
    title: "Step 2 · Cahaya Matahari Masuk",
    desc: "Cahaya Matahari masuk ke Bumi seperti sinar yang menembus kaca pada rumah kaca.",
    video: "/video/step-1.mp4",
  },
  {
    title: "Step 3 · Radiasi Inframerah & Pemanasan",
    desc: "Sebagian radiasi diserap oleh Bumi dan sebagian dipantulkan dalam bentuk radiasi inframerah. Saat radiasi inframerah ke atas akan terkena kaca; sebagian bisa keluar dan sebagian memantul kembali ke rumah kaca.",
    video: "/video/step-2.mp4",
  },
  {
    title: "Step 4 · Suhu Semakin Meningkat",
    desc: "Hal ini terus berulang hingga suhu di dalam rumah kaca itupun semakin meningkat.",
    video: "/video/step-3.mp4",
  },
  {
    title: "Step 5 · Studi Kasus Bumi",
    desc: "Kondisi ini sama halnya dengan yang berada di Bumi. Panas dari Matahari masuk ke atmosfer. Sebagian radiasi diserap oleh Bumi dan sebagian dipantulkan dalam bentuk radiasi inframerah. Saat radiasi inframerah ke atas akan terkena gas rumah kaca. Sebagian radiasi inframerah bisa keluar, sebagian memantul masuk kembali ke Bumi. Siklus pemantulan dan penyerapan ini terus berulang dan menyebabkan suhu Bumi meningkat.",
    image: "/images/bumi.png",
  },
  {
    title: "Step 6 · Penjelasan Gas Rumah Kaca",
    desc: "Gas rumah kaca adalah gas-gas yang terdapat di atmosfer Bumi dan berperan dalam menahan panas Matahari agar tidak seluruhnya lepas kembali ke angkasa. Ketika sinar Matahari mencapai permukaan Bumi, sebagian energi diserap dan diubah menjadi panas, lalu dipancarkan kembali dalam bentuk radiasi inframerah. Gas rumah kaca seperti uap air, karbon dioksida (CO₂), metana (CH₄), dinitrogen oksida (N₂O), dan CFC menyerap serta memantulkan kembali radiasi inframerah tersebut ke permukaan Bumi, sehingga suhu Bumi tetap hangat dan mendukung kehidupan. Namun, jika jumlah gas rumah kaca berlebihan akibat aktivitas manusia, panas yang terperangkap menjadi terlalu banyak dan menyebabkan pemanasan global.",
    image: "/images/gas-rumah-kaca.png",
  },
  {
    title: "Step 7 · Asal Gas Rumah Kaca",
    desc: "Gas rumah kaca berasal dari proses alami dan aktivitas manusia, seperti penguapan air, pernapasan makhluk hidup, pembakaran bahan bakar fosil, kegiatan industri, pertanian, dan penggunaan bahan kimia buatan. Gas-gas ini berperan menahan panas di atmosfer, namun jika jumlahnya berlebihan dapat meningkatkan suhu Bumi dan memicu pemanasan global.",
    image: "/images/asal.png",
  },
]

export default function EfekRumahKacaMateriPage() {
  const [index, setIndex] = React.useState(0)
  const current = steps[index] ?? steps[0]
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()
  const shouldRotate = isFullscreen && isMobile
  const showOverlay = !(isMobile && !isFullscreen)

  React.useEffect(() => {
    if (index > steps.length - 1) {
      setIndex(steps.length - 1)
    }
  }, [index])

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

  const handleNext = async () => {
    if (index >= steps.length - 1) {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
      router.push("/efek-rumah-kaca")
      return
    }
    setIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const overlayInline = (
    <div
      className={`absolute inset-x-0 bottom-0 flex ${
        shouldRotate ? "p-3" : "p-5 md:p-6"
      } ${
        index < 4 ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`w-full rounded-xl border border-white/10 bg-black/50 text-white shadow-md backdrop-blur-sm ${
          shouldRotate ? "p-2" : "p-3 md:p-4"
        } ${isFullscreen ? (shouldRotate ? "max-w-sm" : "max-w-3xl") : "max-w-xl"} ${
          index < 4 ? "" : "md:ml-auto"
        }`}
      >
        <h2
          className={`font-semibold ${
            shouldRotate ? "text-[10px]" : "text-sm md:text-base"
          }`}
        >
          {current.title}
        </h2>
        <p
          className={`mt-2 text-white/80 ${
            shouldRotate ? "text-[8px] leading-relaxed" : "text-xs md:text-sm"
          }`}
        >
          {current.desc}
        </p>

        <div
          className={`flex flex-wrap items-center justify-between gap-3 ${
            shouldRotate ? "mt-3" : "mt-4"
          }`}
        >
          <button
            type="button"
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            disabled={index === 0}
            className={`rounded-full border border-white/40 font-semibold text-white transition hover:border-white disabled:opacity-40 ${
              shouldRotate ? "px-2.5 py-1 text-[8px]" : "px-3 py-1.5 text-[11px]"
            }`}
          >
            Sebelumnya
          </button>
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {isFullscreen ? (
              <button
                type="button"
                onClick={handleFullscreen}
                className={`rounded-full border border-white/40 font-semibold text-white transition hover:border-white ${
                  shouldRotate ? "px-2.5 py-1 text-[8px]" : "px-3 py-1.5 text-[11px]"
                }`}
              >
                Keluar
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleNext}
              className={`rounded-full bg-white font-semibold text-black transition hover:bg-white/90 ${
                shouldRotate ? "px-2.5 py-1 text-[8px]" : "px-3 py-1.5 text-[11px]"
              }`}
            >
              {index >= steps.length - 1 ? "Selesai" : "Berikutnya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <PageShell title="Materi Efek Rumah Kaca">
      {!current ? (
        <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
          Konten materi belum tersedia.
        </div>
      ) : (
        <>
          <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Materi Efek Rumah Kaca
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
                  {current.title}
                </h1>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  Ringkasan materi per langkah untuk memahami proses efek rumah
                  kaca.
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
        className={`relative w-full overflow-hidden bg-black shadow-sm ${
          isFullscreen ? "rounded-none border-0" : "rounded-2xl border"
        }`}
      >
        <div className={`relative w-full ${isFullscreen ? "h-full" : "aspect-video"}`}>
          <div
            className={`absolute inset-0 ${
              shouldRotate ? "flex items-center justify-center" : ""
            }`}
          >
            <div
              className={
                shouldRotate
                  ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"
                  : "absolute inset-0"
              }
              style={
                shouldRotate
                  ? {
                      width: "min(100vh, calc(100vw * 16 / 9))",
                      height:
                        "calc(min(100vh, calc(100vw * 16 / 9)) * 9 / 16)",
                    }
                  : undefined
              }
            >
              {current.video ? (
                <video
                  src={current.video}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={current.image}
                  alt="Materi efek rumah kaca"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {showOverlay ? overlayInline : null}
            </div>
          </div>
        </div>
      </div>
      {!showOverlay ? (
        <div className="mt-4 rounded-2xl border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">
            {current.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {current.desc}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              disabled={index === 0}
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground disabled:opacity-40"
            >
              Sebelumnya
            </button>
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === index ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {index >= steps.length - 1 ? "Selesai" : "Berikutnya"}
            </button>
          </div>
        </div>
      ) : null}
        </>
      )}
    </PageShell>
  )
}
