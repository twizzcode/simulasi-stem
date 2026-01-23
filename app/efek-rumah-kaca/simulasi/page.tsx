"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { PageShell } from "@/components/page-shell"

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

export default function EfekRumahKacaSimulasiPage() {
  const [index, setIndex] = React.useState(0)
  const current = steps[index] ?? steps[0]
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const router = useRouter()

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

  return (
    <PageShell title="Simulasi Efek Rumah Kaca">
      {!current ? (
        <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
          Konten simulasi belum tersedia.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Simulasi Efek Rumah Kaca
          </p>
          <h1 className="text-lg font-semibold text-foreground">
            {current.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFullscreen}
            className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            Full Screen
          </button>
          <Link
            href="/efek-rumah-kaca"
            className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            Kembali
          </Link>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border bg-black shadow-sm"
      >
        <div className="relative aspect-video w-full">
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
              alt="Simulasi efek rumah kaca"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div
            className={`absolute inset-x-0 bottom-0 flex p-5 md:p-6 ${
              index < 4 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`w-full rounded-xl border border-white/10 bg-black/50 p-3 text-white shadow-md backdrop-blur-sm md:p-4 ${
                isFullscreen ? "max-w-3xl" : "max-w-xl"
              } ${index < 4 ? "" : "md:ml-auto"}`}
            >
              <h2 className="text-sm font-semibold md:text-base">
                {current.title}
              </h2>
              <p className="mt-2 text-xs text-white/80 md:text-sm">
                {current.desc}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={index === 0}
                  className="rounded-full border border-white/40 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:border-white disabled:opacity-40"
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
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black transition hover:bg-white/90"
                >
                  {index >= steps.length - 1 ? "Selesai" : "Berikutnya"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </PageShell>
  )
}
