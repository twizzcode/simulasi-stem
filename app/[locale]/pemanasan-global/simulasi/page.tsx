"use client"

import Image from "next/image"
import * as React from "react"
import { BookOpenTextIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

import { PageShell } from "@/components/page-shell"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

const GUIDE_STORAGE_KEY = "global-warming-simulation-guide-dismissed"

export default function PemanasanGlobalSimulasiPage() {
  const t = useTranslations("PemanasanGlobalSimulasi")
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
  const [openGuide, setOpenGuide] = React.useState(false)
  const [visitedIslands, setVisitedIslands] = React.useState<Set<string>>(
    () => new Set()
  )
  const finishTimeoutRef = React.useRef<number | null>(null)

  const islandName = (id: string) => {
    const key = `island${id.toUpperCase()}` as const
    return t(key)
  }

  const translatedContent: Record<string, { title: string; steps: string[]; sceneImages?: string[] }> = {
    a: {
      title: t("islandA"),
      sceneImages: contentById.a.sceneImages,
      steps: [t("islandAStep1"), t("islandAStep2")],
    },
    b: {
      title: t("islandB"),
      sceneImages: contentById.b.sceneImages,
      steps: [t("islandBStep1"), t("islandBStep2")],
    },
    c: {
      title: t("islandC"),
      sceneImages: contentById.c.sceneImages,
      steps: [t("islandCStep1"), t("islandCStep2")],
    },
    d: {
      title: t("islandD"),
      sceneImages: contentById.d.sceneImages,
      steps: [t("islandDStep1"), t("islandDStep2")],
    },
    e: {
      title: t("islandE"),
      sceneImages: contentById.e.sceneImages,
      steps: [t("islandEStep1"), t("islandEStep2")],
    },
    f: {
      title: t("islandF"),
      sceneImages: contentById.f.sceneImages,
      steps: [t("islandFStep1"), t("islandFStep2")],
    },
  }

  const introPages = [
    t("intro1"),
    t("intro2"),
    t("intro3"),
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
    const dismissed = window.localStorage.getItem(GUIDE_STORAGE_KEY)
    if (dismissed !== "true") {
      setOpenGuide(true)
    }
  }, [])

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
          await (screen.orientation as any).unlock()
        } catch {}
      }
      return
    }
    await containerRef.current.requestFullscreen()
    if (isCompactDevice) {
      try {
        await (screen.orientation as any).lock("landscape")
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

  const islandContent = translatedContent[selectedIslandId] || translatedContent.a
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

  const handleGuideChange = (nextOpen: boolean) => {
    setOpenGuide(nextOpen)
    if (!nextOpen) {
      window.localStorage.setItem(GUIDE_STORAGE_KEY, "true")
    }
  }

  return (
    <>
      <Dialog open={openGuide} onOpenChange={handleGuideChange}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="items-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BookOpenTextIcon className="size-6" />
            </div>
            <div className="text-center">
              <DialogTitle>{t("guideTitle")}</DialogTitle>
              <DialogDescription className="mt-2">
                {t("guideDescription")}
              </DialogDescription>
            </div>
          </DialogHeader>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            {[
              t("guideItem1"),
              t("guideItem2"),
              t("guideItem3"),
              t("guideItem4"),
            ].map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="shrink-0 text-sm font-semibold text-primary">
                  {index + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>

      <button
        type="button"
        onClick={() => setOpenGuide(true)}
        className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg transition hover:bg-primary/90"
        aria-label={t("guideTitle")}
      >
        ?
      </button>

      <PageShell title={t("title")}>
      <section
        className={`rounded-2xl border bg-card p-6 shadow-sm md:p-8 ${
          isFullscreen ? "hidden" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("subtitle")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {isFullscreen ? t("exitFullScreen") : t("fullScreen")}
            </button>
            <Link
              href="/pemanasan-global"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {t("back")}
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
            {t("exitFullScreen")}
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
                  <div className="absolute inset-0">
                    <Image
                      src={
                        pageIndex < 2
                          ? "/images/2065.png"
                          : "/images/jalan.png"
                      }
                      alt=""
                      fill
                      sizes="80vw"
                      priority
                      className="object-cover"
                    />
                    <div className="absolute left-3 top-3 w-[78%] max-w-md rounded-lg bg-[#bcd4dd] p-3 text-xs text-slate-800 shadow md:left-6 md:top-6 md:w-[70%] md:p-4 md:text-sm">
                      {introPages[pageIndex]}
                    </div>
                    {pageIndex === 2 ? (
                      <div className="absolute left-3 top-[43%] w-[84%] max-w-lg rounded-lg bg-[#bcd4dd] p-3 text-xs text-slate-800 shadow md:left-6 md:top-[45%] md:w-[75%] md:p-4 md:text-sm">
                        <p>
                          {t("introExtra")}
                        </p>
                        <p className="mt-2 font-semibold md:mt-3">
                          {t("introChallenge")}
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
                          {t("viewMap")}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setPageIndex((prev) => Math.min(2, prev + 1))
                          }
                          className="rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-900 shadow transition hover:bg-yellow-300 md:px-6"
                        >
                          {t("continue")}
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
                  className="relative h-full w-full overflow-hidden rounded-2xl border"
                >
                  <Image
                    src="/images/pulau/bg.png"
                    alt=""
                    fill
                    sizes="80vw"
                    priority
                    className="object-cover"
                  />
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
                      <span className="sr-only">{islandName(island.id)}</span>
                      <Image
                        src={island.imageSrc}
                        alt={islandName(island.id)}
                        width={144}
                        height={144}
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

                  <Image
                    src="/images/kapal.png"
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
                    className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg transition-[top,left] duration-700 ease-in-out md:h-12 md:w-12"
                    style={{ top: `${userPos.y}%`, left: `${userPos.x}%` }}
                  />

                  {pendingIsland ? (
                    <div
                      className="absolute bottom-4 left-4 rounded-xl border bg-white/90 p-4 text-sm text-slate-700 shadow-lg"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <p className="font-semibold text-slate-900">
                        {islandName(pendingIsland.id)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("clickToVisit")}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPendingIsland(null)}
                          className="rounded-full border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                        >
                          {t("cancel")}
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
                          {t("exploreIsland")}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {showCompletion ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
                        <h3 className="text-lg font-semibold text-foreground">
                          {t("congratulations")}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("allMissionsComplete")}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => setShowCompletion(false)}
                            className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                          >
                            {t("close")}
                          </button>
                          <Link
                            href="/pemanasan-global/sertifikat"
                            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                          >
                            {t("downloadCertificate")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {scene === "island" ? (
                <div
                  className="relative h-full w-full overflow-hidden rounded-2xl border bg-white/80"
                >
                  {islandScene ? (
                    <Image
                      src={islandScene}
                      alt=""
                      fill
                      sizes="80vw"
                      className="object-cover"
                    />
                  ) : null}
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
                        {t("backToMap")}
                      </button>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          {t("stepOf", { current: islandStepIndex + 1, total: islandContent.steps.length })}
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
                            {t("next")}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowFinishConfirm(true)}
                            className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-white shadow transition hover:bg-emerald-400"
                          >
                            {t("finishMission")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {showFinishConfirm ? (
                    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/45 p-4">
                      <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-center shadow-xl">
                        <h3 className="text-base font-semibold text-foreground">
                          {t("finishMissionConfirm")}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("progressSaved")}
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowFinishConfirm(false)}
                            className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                          >
                            {t("cancel")}
                          </button>
                          <button
                            type="button"
                            onClick={finishIsland}
                            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                          >
                            {t("yesFinish")}
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
                          {t("missionComplete")}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("progressSavedMsg")}
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
    </>
  )
}
