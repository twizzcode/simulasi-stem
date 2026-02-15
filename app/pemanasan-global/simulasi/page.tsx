"use client"

import * as React from "react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"

type Island = {
  id: string
  name: string
  top: number
  left: number
  imageSrc: string
}

type PulauContent = {
  title: string
  steps: string[]
  sceneImages?: string[]
}

const islands: Island[] = [
  { id: "a", name: "Pulau A", top: 47, left: 40, imageSrc: "/images/pulau/p-kebakaranhutan.png" },
  { id: "b", name: "Pulau B", top: 73, left: 12, imageSrc: "/images/pulau/p-petanigaram.png" },
  { id: "c", name: "Pulau C", top: 18, left: 16, imageSrc: "/images/pulau/p-kutub.png" },
  { id: "d", name: "Pulau D", top: 18, left: 59, imageSrc: "/images/pulau/p-banjir.png" },
  { id: "e", name: "Pulau E", top: 34, left: 86, imageSrc: "/images/pulau/p-petanigagal.png" },
  { id: "f", name: "Pulau F", top: 78, left: 72, imageSrc: "/images/pulau/p-polusiudara.png" },
]

const contentById: Record<string, PulauContent> = {
  a: {
    title: "Pulau A",
    sceneImages: ["/images/detail-pulau/kebakaran-1.png", "/images/detail-pulau/kebakaran-2.png"],
    steps: [
      "Penduduk desa hidup dengan keadaan yang sangat sulit. Banyak keluarga yang kehilangan rumah akibat kebakaran hutan beberapa tahun lalu.",
      "Kami sedang berusaha menata hidup kembali, tetapi kekeringan yang panjang dan suhu yang sangat tinggi tahun ini membuat kami takut bencana serupa akan terulang.",
    ],
  },
  b: {
    title: "Pulau B",
    sceneImages: ["/images/detail-pulau/petani-garam-1.png", "/images/detail-pulau/petani-garam-2.png"],
    steps: [
      "Kami para petani garam sangat bergantung pada cuaca. Namun, akibat pemanasan global dan perubahan iklim, cuaca menjadi tidak menentu. Hujan datang tiba-tiba saat seharusnya musim panas, sehingga proses penguapan terganggu dan hasil panen garam kami menurun drastis.",
      "Sebagai petani garam, kami membutuhkan panas Matahari untuk menghasilkan garam. Tapi sekarang cuaca sering berubah-ubah. Karena hujan turun tak terduga, garam tidak sempat mengering dan panen kami jadi sedikit.",
    ],
  },
  c: {
    title: "Pulau C",
    sceneImages: ["/images/detail-pulau/kutub-1.png", "/images/detail-pulau/kutub-2.png"],
    steps: [
      "Meningkatnya suhu Bumi secara drastis mengakibatkan es di kutub mencair dengan cepat. Pencairan es ini menyebabkan permukaan air laut naik dan merusak ekosistem kutub, termasuk habitat hewan seperti beruang kutub dan anjing laut.",
      "Kami cemas masa depan kutub akan semakin rusak jika dalam beberapa dekade ke depan suhu Bumi terus meningkat.",
    ],
  },
  d: {
    title: "Pulau D",
    sceneImages: ["/images/detail-pulau/banjir-1.png", "/images/detail-pulau/banjir-2.png"],
    steps: [
      "Kami tinggal di dekat pantai. Tapi sekarang air laut sering naik ke darat. Karena pemanasan global, es di kutub mencair dan laut menjadi lebih tinggi. Rumah kami sering kebanjiran, dan hidup jadi semakin sulit.",
      "Kami khawatir jika keadaan ini terus berlanjut, suatu hari kami tidak lagi bisa tinggal di tempat ini dan harus meninggalkan kampung halaman kami.",
    ],
  },
  e: {
    title: "Pulau E",
    sceneImages: ["/images/detail-pulau/petani-gagal-1.png", "/images/detail-pulau/petani-gagal-2.png"],
    steps: [
      "Kami bekerja sebagai petani untuk menghidupi keluarga. Tapi sekarang alam tidak lagi bisa diprediksi. Kadang hujan turun tiba-tiba, lalu panas datang berkepanjangan. Tanaman di sawah dan ladang tidak tumbuh dengan baik, banyak yang rusak bahkan mati.",
      "Karena sering gagal panen, penghasilan kami berkurang dan kami kesulitan memenuhi kebutuhan sehari-hari. Tidak hanya itu, di masa yang akan datang dapat terjadi kelangkaan pangan yang melanda secara global.",
    ],
  },
  f: {
    title: "Pulau F",
    sceneImages: ["/images/detail-pulau/polusi-1.png", "/images/detail-pulau/polusi-2.png"],
    steps: [
      "Saya seorang dokter di rumah sakit setempat, dan gelombang panas bulan lalu berdampak buruk pada kota kami. Tragisnya, sejumlah pasien meninggal dunia karena penyebab yang berhubungan dengan panas.",
      "Saya juga melihat peningkatan jumlah pasien dengan penyakit paru-paru dan asma, dan saya pikir ini ada hubungannya dengan polusi dan asap kebakaran hutan di udara.",
    ],
  },
}

type Scene = "intro" | "map" | "island"

export default function PemanasanGlobalSimulasiPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const mapRef = React.useRef<HTMLDivElement | null>(null)
  const [isCompactDevice, setIsCompactDevice] = React.useState(false)
  const [isPortrait, setIsPortrait] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [scene, setScene] = React.useState<Scene>("intro")
  const [pageIndex, setPageIndex] = React.useState(0)
  const [selectedIslandId, setSelectedIslandId] = React.useState<string>("a")
  const [islandStepIndex, setIslandStepIndex] = React.useState(0)
  const [showCompletion, setShowCompletion] = React.useState(false)
  const [pendingIsland, setPendingIsland] = React.useState<Island | null>(null)
  const [showFinishConfirm, setShowFinishConfirm] = React.useState(false)
  const [showMissionDone, setShowMissionDone] = React.useState(false)
  const [userPos, setUserPos] = React.useState({ x: 50, y: 50 })
  const [visitedIslands, setVisitedIslands] = React.useState<Set<string>>(
    () => new Set()
  )
  const finishTimeoutRef = React.useRef<number | null>(null)

  const introPages = [
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
    return () => document.removeEventListener("fullscreenchange", handleChange)
  }, [])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)")
    const syncOrientation = () => setIsPortrait(mediaQuery.matches)
    syncOrientation()
    mediaQuery.addEventListener("change", syncOrientation)
    return () => mediaQuery.removeEventListener("change", syncOrientation)
  }, [])

  React.useEffect(() => {
    const syncCompact = () => {
      setIsCompactDevice(window.innerWidth < 768 || window.innerHeight < 768)
    }
    syncCompact()
    window.addEventListener("resize", syncCompact)
    return () => window.removeEventListener("resize", syncCompact)
  }, [])

  React.useEffect(() => {
    if (visitedIslands.size >= islands.length) {
      setShowCompletion(true)
    }
  }, [visitedIslands])

  React.useEffect(() => {
    return () => {
      if (finishTimeoutRef.current) {
        window.clearTimeout(finishTimeoutRef.current)
      }
    }
  }, [])

  const shouldRotateFullscreenMobile =
    isFullscreen && isCompactDevice && isPortrait

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      if (isCompactDevice) {
        try {
          await (screen.orientation as ScreenOrientation).unlock()
        } catch {}
      }
      return
    }
    await containerRef.current.requestFullscreen()
    if (isCompactDevice) {
      try {
        await (screen.orientation as ScreenOrientation).lock("landscape")
      } catch {}
    }
  }

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setUserPos({
      x: Math.min(96, Math.max(4, x)),
      y: Math.min(94, Math.max(6, y)),
    })
  }

  const openIsland = (id: string, left: number, top: number) => {
    setSelectedIslandId(id)
    setIslandStepIndex(0)
    setShowFinishConfirm(false)
    setShowMissionDone(false)
    setUserPos({ x: left, y: top })
    setPendingIsland(null)
    setScene("island")
  }

  const islandContent = contentById[selectedIslandId] || contentById.a
  const islandScene =
    islandContent.sceneImages?.[
      Math.min(islandStepIndex, (islandContent.sceneImages?.length ?? 1) - 1)
    ]

  const finishIsland = () => {
    setVisitedIslands((prev) => {
      const next = new Set(prev)
      next.add(selectedIslandId)
      return next
    })
    setShowFinishConfirm(false)
    setShowMissionDone(true)
    finishTimeoutRef.current = window.setTimeout(() => {
      setShowMissionDone(false)
      setScene("map")
    }, 1200)
  }

  return (
    <PageShell title="Simulasi Pemanasan Global">
      <section
        className={`rounded-2xl border bg-card p-6 shadow-sm md:p-8 ${
          isFullscreen ? "hidden" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simulasi Interaktif
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Pemanasan Global
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Jelajahi dari cerita awal, peta, sampai tiap pulau dalam satu
              alur.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleFullscreen}
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
            onClick={toggleFullscreen}
            className="absolute right-4 top-4 z-30 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-white"
          >
            Keluar Full Screen
          </button>
        ) : null}

        <div className={`relative w-full ${isFullscreen ? "h-full" : "aspect-video"}`}>
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
              } ${isFullscreen ? "" : "p-4 md:p-5"}`}
            >
              {scene === "intro" ? (
                <div className="relative h-full w-full overflow-hidden rounded-xl border bg-white/80 shadow-sm">
                  <div
                    className={`absolute inset-0 ${
                      pageIndex < 2
                        ? "bg-[url('/images/2065.png')] bg-cover bg-center bg-no-repeat"
                        : "bg-[url('/images/jalan.png')] bg-cover bg-center bg-no-repeat"
                    }`}
                  >
                    <div className="absolute left-3 top-3 w-[78%] max-w-md rounded-lg bg-[#bcd4dd] p-3 text-xs text-slate-800 shadow md:left-6 md:top-6 md:w-[70%] md:p-4 md:text-sm">
                      {introPages[pageIndex]}
                    </div>
                    {pageIndex === 2 ? (
                      <div className="absolute left-3 top-[43%] w-[84%] max-w-lg rounded-lg bg-[#bcd4dd] p-3 text-xs text-slate-800 shadow md:left-6 md:top-[45%] md:w-[75%] md:p-4 md:text-sm">
                        <p>
                          Dunia telah banyak berubah akibat krisis iklim.
                          Lingkungan, kota, dan kehidupan manusia tidak lagi
                          seperti yang kita kenal sekarang.
                        </p>
                        <p className="mt-2 font-semibold md:mt-3">
                          Tantangan: Pergilah ke wilayah A-F untuk
                          menyelesaikan misi!
                        </p>
                      </div>
                    ) : null}
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center md:bottom-6">
                      {pageIndex === 2 ? (
                        <button
                          type="button"
                          onClick={() => setScene("map")}
                          className="rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300 md:px-6"
                        >
                          Lihat mapnya &gt;
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setPageIndex((prev) => Math.min(2, prev + 1))
                          }
                          className="rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300 md:px-6"
                        >
                          Lanjut
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              {scene === "map" ? (
                <div
                  ref={mapRef}
                  onClick={handleMapClick}
                  className="relative h-full w-full overflow-hidden rounded-2xl border bg-[url('/images/pulau/bg.png')] bg-cover bg-center bg-no-repeat"
                >
                  {islands.map((island) => (
                    <button
                      key={island.id}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        setPendingIsland(island)
                        setUserPos({ x: island.left, y: island.top })
                      }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 transition duration-200 hover:scale-105"
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
                        }`}
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

                  {pendingIsland ? (
                    <div
                      className="absolute bottom-4 left-4 rounded-xl border bg-white/90 p-4 text-sm text-slate-700 shadow-lg"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <p className="font-semibold text-slate-900">
                        {pendingIsland.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Klik untuk mengunjungi pulau ini.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPendingIsland(null)}
                          className="rounded-full border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openIsland(
                              pendingIsland.id,
                              pendingIsland.left,
                              pendingIsland.top
                            )
                          }
                          className="rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300"
                        >
                          Jelajahi Pulau
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {showCompletion ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
                        <h3 className="text-lg font-semibold text-foreground">
                          Selamat!
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Kamu sudah menyelesaikan semua misi.
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
              ) : null}

              {scene === "island" ? (
                <div
                  className="relative h-full w-full overflow-hidden rounded-2xl border bg-white/80 bg-cover bg-center"
                  style={
                    islandScene ? { backgroundImage: `url('${islandScene}')` } : undefined
                  }
                >
                  {islandScene ? <div className="absolute inset-0 bg-black/25" /> : null}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="max-w-2xl rounded-xl bg-white/90 p-5 text-sm text-muted-foreground shadow">
                      {islandContent.steps[islandStepIndex]}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setScene("map")}
                        className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                      >
                        Kembali ke Peta
                      </button>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          Langkah {islandStepIndex + 1} dari {islandContent.steps.length}
                        </span>
                        {islandStepIndex < islandContent.steps.length - 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setIslandStepIndex((prev) =>
                                Math.min(islandContent.steps.length - 1, prev + 1)
                              )
                            }
                            className="rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowFinishConfirm(true)}
                            className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-white shadow transition hover:bg-emerald-400"
                          >
                            Selesaikan Misi
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {showFinishConfirm ? (
                    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/45 p-4">
                      <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-center shadow-xl">
                        <h3 className="text-base font-semibold text-foreground">
                          Selesaikan misi ini?
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Progress pulau akan ditandai selesai.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowFinishConfirm(false)}
                            className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={finishIsland}
                            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                          >
                            Ya, Selesaikan
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {showMissionDone ? (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
                        <div className="relative mx-auto mb-4 flex size-20 items-center justify-center">
                          <span className="absolute inline-flex size-20 animate-ping rounded-full bg-emerald-200/80" />
                          <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white shadow-lg">
                            ✓
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          Misi Selesai!
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Progress pulau sudah tersimpan.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
