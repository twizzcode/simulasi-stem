"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

type PulauContent = {
  title: string
  steps: string[]
}

const contentById: Record<string, PulauContent> = {
  a: {
    title: "Pulau A",
    steps: [
      "Penduduk desa hidup dengan keadaan yang sangat sulit. Banyak keluarga yang kehilangan rumah akibat kebakaran hutan beberapa tahun lalu.",
      "Kami sedang berusaha menata hidup kembali, tetapi kekeringan yang panjang dan suhu yang sangat tinggi tahun ini membuat kami takut bencana serupa akan terulang.",
    ],
  },
  b: {
    title: "Pulau B",
    steps: [
      "Kami para petani garam sangat bergantung pada cuaca. Namun, akibat pemanasan global dan perubahan iklim, cuaca menjadi tidak menentu. Hujan datang tiba-tiba saat seharusnya musim panas, sehingga proses penguapan terganggu dan hasil panen garam kami menurun drastis.",
      "Sebagai petani garam, kami membutuhkan panas Matahari untuk menghasilkan garam. Tapi sekarang cuaca sering berubah-ubah. Karena hujan turun tak terduga, garam tidak sempat mengering dan panen kami jadi sedikit.",
    ],
  },
  c: {
    title: "Pulau C",
    steps: [
      "Meningkatnya suhu Bumi secara drastis mengakibatkan es di kutub mencair dengan cepat. Pencairan es ini menyebabkan permukaan air laut naik dan merusak ekosistem kutub, termasuk habitat hewan seperti beruang kutub dan anjing laut.",
      "Kami cemas masa depan kutub akan semakin rusak jika dalam beberapa dekade ke depan suhu Bumi terus meningkat.",
    ],
  },
  d: {
    title: "Pulau D",
    steps: [
      "Kami tinggal di dekat pantai. Tapi sekarang air laut sering naik ke darat. Karena pemanasan global, es di kutub mencair dan laut menjadi lebih tinggi. Rumah kami sering kebanjiran, dan hidup jadi semakin sulit.",
      "Kami khawatir jika keadaan ini terus berlanjut, suatu hari kami tidak lagi bisa tinggal di tempat ini dan harus meninggalkan kampung halaman kami.",
    ],
  },
  e: {
    title: "Pulau E",
    steps: [
      "Kami bekerja sebagai petani untuk menghidupi keluarga. Tapi sekarang alam tidak lagi bisa diprediksi. Kadang hujan turun tiba-tiba, lalu panas datang berkepanjangan. Tanaman di sawah dan ladang tidak tumbuh dengan baik, banyak yang rusak bahkan mati.",
      "Karena sering gagal panen, penghasilan kami berkurang dan kami kesulitan memenuhi kebutuhan sehari-hari. Tidak hanya itu, di masa yang akan datang dapat terjadi kelangkaan pangan yang melanda secara global.",
    ],
  },
  f: {
    title: "Pulau F",
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
  const [stepIndex, setStepIndex] = React.useState(0)

  const handleNext = () => {
    setStepIndex((prev) => Math.min(content.steps.length - 1, prev + 1))
  }

  const handleFinish = () => {
    if (!id) return
    const stored = localStorage.getItem("pemanasan-global-visited")
    let parsed: string[] = []
    if (stored) {
      try {
        parsed = JSON.parse(stored) as string[]
      } catch {
        parsed = []
      }
    }
    const set = new Set<string>(parsed)
    set.add(id)
    localStorage.setItem("pemanasan-global-visited", JSON.stringify(Array.from(set)))
    router.push("/pemanasan-global/simulasi/peta")
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
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-white/80">
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
        </div>
      </div>
    </PageShell>
  )
}
