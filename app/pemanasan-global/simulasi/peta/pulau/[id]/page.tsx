"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

import { usePetaProgress } from "../../peta-progress-context"

type PulauContent = {
  title: string
  steps: string[]
  sceneImages?: string[]
}

const contentById: Record<string, PulauContent> = {
  a: {
    title: "Pulau A",
    sceneImages: [
      "/images/detail-pulau/kebakaran-1.png",
      "/images/detail-pulau/kebakaran-2.png",
    ],
    steps: [
      "Penduduk desa hidup dengan keadaan yang sangat sulit. Banyak keluarga yang kehilangan rumah akibat kebakaran hutan beberapa tahun lalu.",
      "Kami sedang berusaha menata hidup kembali, tetapi kekeringan yang panjang dan suhu yang sangat tinggi tahun ini membuat kami takut bencana serupa akan terulang.",
    ],
  },
  b: {
    title: "Pulau B",
    sceneImages: [
      "/images/detail-pulau/petani-garam-1.png",
      "/images/detail-pulau/petani-garam-2.png",
    ],
    steps: [
      "Kami para petani garam sangat bergantung pada cuaca. Namun, akibat pemanasan global dan perubahan iklim, cuaca menjadi tidak menentu. Hujan datang tiba-tiba saat seharusnya musim panas, sehingga proses penguapan terganggu dan hasil panen garam kami menurun drastis.",
      "Sebagai petani garam, kami membutuhkan panas Matahari untuk menghasilkan garam. Tapi sekarang cuaca sering berubah-ubah. Karena hujan turun tak terduga, garam tidak sempat mengering dan panen kami jadi sedikit.",
    ],
  },
  c: {
    title: "Pulau C",
    sceneImages: [
      "/images/detail-pulau/kutub-1.png",
      "/images/detail-pulau/kutub-2.png",
    ],
    steps: [
      "Meningkatnya suhu Bumi secara drastis mengakibatkan es di kutub mencair dengan cepat. Pencairan es ini menyebabkan permukaan air laut naik dan merusak ekosistem kutub, termasuk habitat hewan seperti beruang kutub dan anjing laut.",
      "Kami cemas masa depan kutub akan semakin rusak jika dalam beberapa dekade ke depan suhu Bumi terus meningkat.",
    ],
  },
  d: {
    title: "Pulau D",
    sceneImages: [
      "/images/detail-pulau/banjir-1.png",
      "/images/detail-pulau/banjir-2.png",
    ],
    steps: [
      "Kami tinggal di dekat pantai. Tapi sekarang air laut sering naik ke darat. Karena pemanasan global, es di kutub mencair dan laut menjadi lebih tinggi. Rumah kami sering kebanjiran, dan hidup jadi semakin sulit.",
      "Kami khawatir jika keadaan ini terus berlanjut, suatu hari kami tidak lagi bisa tinggal di tempat ini dan harus meninggalkan kampung halaman kami.",
    ],
  },
  e: {
    title: "Pulau E",
    sceneImages: [
      "/images/detail-pulau/petani-gagal-1.png",
      "/images/detail-pulau/petani-gagal-2.png",
    ],
    steps: [
      "Kami bekerja sebagai petani untuk menghidupi keluarga. Tapi sekarang alam tidak lagi bisa diprediksi. Kadang hujan turun tiba-tiba, lalu panas datang berkepanjangan. Tanaman di sawah dan ladang tidak tumbuh dengan baik, banyak yang rusak bahkan mati.",
      "Karena sering gagal panen, penghasilan kami berkurang dan kami kesulitan memenuhi kebutuhan sehari-hari. Tidak hanya itu, di masa yang akan datang dapat terjadi kelangkaan pangan yang melanda secara global.",
    ],
  },
  f: {
    title: "Pulau F",
    sceneImages: [
      "/images/detail-pulau/polusi-1.png",
      "/images/detail-pulau/polusi-2.png",
    ],
    steps: [
      "Saya seorang dokter di rumah sakit setempat, dan gelombang panas bulan lalu berdampak buruk pada kota kami. Tragisnya, sejumlah pasien meninggal dunia karena penyebab yang berhubungan dengan panas.",
      "Saya juga melihat peningkatan jumlah pasien dengan penyakit paru-paru dan asma, dan saya pikir ini ada hubungannya dengan polusi dan asap kebakaran hutan di udara.",
    ],
  },
}

export default function PulauPage() {
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const content = (id && contentById[id]) || contentById.a
  const { markVisited } = usePetaProgress()
  const [stepIndex, setStepIndex] = React.useState(0)
  const [showMissionDone, setShowMissionDone] = React.useState(false)
  const [isFinishing, setIsFinishing] = React.useState(false)
  const finishTimeoutRef = React.useRef<number | null>(null)
  const currentScene =
    content.sceneImages && content.sceneImages.length > 0
      ? content.sceneImages[Math.min(stepIndex, content.sceneImages.length - 1)]
      : undefined

  React.useEffect(() => {
    return () => {
      if (finishTimeoutRef.current) {
        window.clearTimeout(finishTimeoutRef.current)
      }
    }
  }, [])

  const handleNext = () => {
    setStepIndex((prev) => Math.min(content.steps.length - 1, prev + 1))
  }

  const handleFinish = () => {
    if (!id || isFinishing) return
    setIsFinishing(true)
    markVisited(id)
    setShowMissionDone(true)
    finishTimeoutRef.current = window.setTimeout(() => {
      router.push("/pemanasan-global/simulasi/peta")
    }, 1500)
  }

  return (
    <PageShell title={content.title}>
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simulasi Interaktif
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              {content.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Cerita dan misi pulau.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/pemanasan-global/simulasi/peta"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              Kembali ke Peta
            </Link>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border bg-[#f1ecdc] p-4 shadow-sm md:p-5">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-white/80 bg-cover bg-center"
          style={currentScene ? { backgroundImage: `url('${currentScene}')` } : undefined}
        >
          {currentScene ? (
            <div className="absolute inset-0 bg-black/25" />
          ) : null}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="max-w-2xl rounded-xl bg-white/90 p-5 text-sm text-muted-foreground shadow">
              {content.steps[stepIndex]}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Langkah {stepIndex + 1} dari {content.steps.length}
              </span>
              {stepIndex < content.steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-white shadow transition hover:bg-emerald-400"
                >
                  Selesaikan Misi
                </button>
              )}
            </div>
          </div>
          {showMissionDone ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
                <div className="relative mx-auto mb-4 flex size-20 items-center justify-center">
                  <span className="absolute inline-flex size-20 animate-ping rounded-full bg-emerald-200/80" />
                  <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white shadow-lg">
                    ✓
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Misi Selesai!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Kerja bagus. Progress pulau sudah tersimpan untuk sesi ini.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/pemanasan-global/simulasi/peta")}
                  className="mt-5 rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                >
                  Kembali ke Peta
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageShell>
  )
}
