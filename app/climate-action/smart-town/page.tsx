"use client"

import * as React from "react"
import { PageShell } from "@/components/page-shell"
import Link from "next/link"
import {
  busPlacement,
  carbonTariffPlacements,
  getIconSizeClass,
  housePlacements,
  nuclearPlacement,
  treePlacements,
} from "./icons"

const storyPages = [
  {
    title: "Selamat datang!",
    body: [
      "Kami membutuhkan bantuanmu untuk menghadapi permasalahan pemanasan global dan perubahan iklim.",
    ],
  },
  {
    title: "Pemanasan global dan perubahan iklim",
    body: [
      "Pemanasan global dan perubahan iklim terjadi akibat berbagai aktivitas manusia yang menghasilkan gas-gas rumah kaca, seperti karbon dioksida (CO₂), dinitrogen oksida (N₂O), uap air (H2O), dan metana (CH₄).",
      "Gas-gas ini terakumulasi di atmosfer dan menahan panas Matahari, sehingga suhu Bumi meningkat dan memicu perubahan iklim.",
      "Kami membutuhkan bantuanmu untuk mengurangi bertambahnya dampak negatif dari permasalahan ini.",
    ],
  },
  {
    title: "Misi Smart Town",
    body: [
      "Kamu memiliki 50 koin, gunakan koin tersebut untuk membangun kota pintar yang berorientasi pada pengurangan emisi gas rumah kaca dengan seefektif mungkin.",
      "Semangat!",
    ],
  },
  {
    title: "Tujuan misi",
    body: [
      "Misi ini bertujuan untuk mengurangi emisi gas rumah kaca. Langkah-langkah yang kamu pilih akan berpengaruh langsung terhadap laju peningkatan suhu global.",
      "Karena itu, gunakan strategi dan teknologi yang tepat untuk mewujudkan masa depan rendah karbon dan mencegah pemanasan global lebih parah!",
    ],
  },
  {
    title: "Tujuan misi",
    body: [
      "Misi ini bertujuan untuk mengurangi emisi gas rumah kaca. Langkah-langkah yang kamu pilih akan berpengaruh langsung terhadap laju peningkatan suhu global.",
      "Karena itu, gunakan strategi dan teknologi yang tepat untuk mewujudkan masa depan rendah karbon dan mencegah pemanasan global lebih parah!",
    ],
  },
  {
    title: "Pilih aksi (checkbox)",
    body: [],
    checklist: [
      {
        id: "hemat-energi",
        cost: 6,
        label: "Merancang bangun yang membantu menghemat energi",
        impactPercent: 12,
        detail:
          "Di Indonesia, sektor bangunan juga menjadi salah satu penyumbang emisi gas rumah kaca yang cukup besar. Bangunan yang hemat energi dirancang dengan ventilasi dan pencahayaan alami yang baik, menggunakan material yang mampu menahan panas, serta memanfaatkan teknologi pendingin dan penerangan yang lebih ramah lingkungan. Semua upaya ini bertujuan untuk mengurangi penggunaan energi dan menekan emisi ke atmosfer.",
      },
      {
        id: "penghijauan",
        cost: 4,
        label: "Menanam pohon untuk penghijauan",
        impactPercent: 6,
        detail:
          "Pohon dan hutan berperan penting dalam menyerap karbon dioksida dari udara. Selain itu, keberadaan pepohonan membantu menjaga kualitas udara tetap bersih dan menyediakan ruang hijau yang nyaman bagi masyarakat untuk beraktivitas dan beristirahat. Di Indonesia, upaya penanaman pohon dan pengembangan ruang terbuka hijau sangat penting untuk mendukung lingkungan yang sehat dan berkelanjutan.",
      },
      {
        id: "pertanian",
        cost: 4,
        label: "Meningkatkan strategi bercocok tanam dalam pertanian",
        impactPercent: 6,
        detail:
          "Emisi gas rumah kaca dari sektor pertanian juga menyumbang bagian yang cukup besar terhadap total emisi di Indonesia. Dengan mengubah cara petani menanam dan mengelola lahannya misalnya melalui pertanian ramah lingkungan, pengolahan tanah minimal, penggunaan pupuk organik, serta pengurangan pupuk berbasis bahan bakar fosil, emisi dapat ditekan sekaligus meningkatkan kesuburan dan kesehatan tanah dalam jangka panjang.",
      },
      {
        id: "transportasi",
        cost: 8,
        label: "Membangun transportasi umum bersih dan kendaraan listrik",
        impactPercent: 17,
        detail:
          "Sektor transportasi merupakan salah satu penyumbang emisi gas rumah kaca yang besar di Indonesia, terutama dari kendaraan berbahan bakar bensin dan solar. Dengan meningkatkan penggunaan kendaraan listrik serta memperluas dan memperbaiki sistem transportasi umum yang ramah lingkungan, emisi dari kendaraan konvensional dapat ditekan dan ketergantungan pada bahan bakar fosil seperti minyak dan gas bisa dikurangi.",
      },
      {
        id: "pangan",
        cost: 7,
        label: "Mensosialisasikan cara pengolahan pangan efisien kepada masyarakat",
        impactPercent: 2,
        detail:
          "Di Indonesia, pengolahan pangan yang kurang efisien masih menyebabkan pemborosan bahan makanan dan energi. Dengan mensosialisasikan cara mengolah, menyimpan, dan memanfaatkan pangan secara bijak kepada masyarakat, penggunaan sumber daya dapat ditekan, limbah makanan dapat dikurangi, serta emisi yang dihasilkan dari proses produksi dan distribusi pangan bisa diminimalkan.",
      },
      {
        id: "nuklir",
        cost: 9,
        label:
          "Mengganti pembangkit listrik tenaga batu bara dan gas dengan sumber energi nuklir",
        impactPercent: 20,
        detail:
          "Selama ini, Indonesia masih sangat bergantung pada pembangkit listrik berbahan bakar batu bara dan gas. Dengan mengembangkan pembangkit listrik tenaga nuklir sebagai sumber energi rendah karbon, Indonesia berpeluang menghasilkan listrik dalam jumlah besar dengan emisi yang jauh lebih kecil. Langkah ini dapat membantu mengurangi ketergantungan pada bahan bakar fosil sekaligus menekan emisi gas rumah kaca.",
      },
      {
        id: "carbon-capture",
        cost: 9,
        label: "Menggunakan teknologi untuk menangkap dan menyimpan karbon",
        impactPercent: 10,
        detail:
          "Pengembangan teknologi untuk menangkap dan menyimpan karbon dari pembangkit listrik berbahan bakar fosil serta industri berat dapat membantu Indonesia menekan emisi gas rumah kaca. Dengan penerapan teknologi ini secara bertahap, emisi yang dilepaskan ke atmosfer dapat dikurangi. Seiring meningkatnya biaya emisi karbon, teknologi penangkapan karbon akan semakin terjangkau dan lebih luas digunakan.",
      },
      {
        id: "energi-terbarukan",
        cost: 9,
        label:
          "Membangun sumber energi terbarukan seperti pembangkit listrik tenaga surya dan angin",
        impactPercent: 25,
        detail:
          "Energi terbarukan, seperti listrik tenaga surya dan angin, jauh lebih bersih dibandingkan minyak, gas, dan batu bara. Di Indonesia yang kaya akan sinar Matahari dan potensi angin di beberapa wilayah, pengembangan energi ini sangat penting untuk mengurangi emisi gas rumah kaca. Seiring meningkatnya biaya emisi karbon, teknologi energi terbarukan akan semakin terjangkau dan dapat dimanfaatkan lebih luas.",
      },
      {
        id: "edukasi",
        cost: 5,
        label: "Melakukan edukasi di sekolah terkait darurat polusi karbon",
        impactPercent: 2,
        detail:
          "Sekolah memiliki peran penting dalam membangun kesadaran generasi muda tentang bahaya polusi karbon dan dampaknya terhadap lingkungan. Dengan memberikan edukasi sejak dini mengenai pemanasan global, perubahan iklim, dan cara mengurangi jejak karbon, siswa di Indonesia dapat tumbuh menjadi agen perubahan yang peduli terhadap Bumi dan siap mengambil tindakan nyata untuk masa depan yang lebih berkelanjutan.",
      },
      {
        id: "tarif-karbon",
        cost: 7,
        label: "Memberlakukan tarif untuk pelepasan karbon pada sektor industri",
        impactPercent: 13,
        detail:
          "Dengan memberi nilai ekonomi pada pencemaran karbon, pelaku industri dan masyarakat akan terdorong untuk beralih ke sumber energi yang lebih bersih. Kebijakan ini membuka peluang bagi teknologi ramah lingkungan untuk digunakan lebih luas di Indonesia, sehingga seiring waktu biayanya menjadi semakin terjangkau dan dampak emisi dapat dikurangi secara signifikan.",
      },
    ],
  },
  {
    title: "Selamat!",
    body: [
      "Kamu telah berhasil menyelesaikan seluruh misi. Aksi dan keputusanmu membawa dampak besar bagi Bumi di masa depan.",
      "Terima kasih telah menjadi bagian dari Agen Perubahan Iklim. Teruslah menjadi penjaga lingkungan dan inspirasi bagi sekitar!",
    ],
  },
]

const checklistOptions = storyPages.find((page) => page.checklist)?.checklist ?? []
const checklistCardFrames = [
  "border-amber-400 bg-amber-100/90",
  "border-yellow-400 bg-yellow-100/90",
  "border-lime-400 bg-lime-100/90",
  "border-cyan-400 bg-cyan-100/90",
]

export default function SmartTownPage() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [pageIndex, setPageIndex] = React.useState(0)
  const [selectedActions, setSelectedActions] = React.useState<string[]>([])
  const [activeInfoId, setActiveInfoId] = React.useState<string | null>(null)
  const [showSubmitConfirm, setShowSubmitConfirm] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const currentPage = storyPages[pageIndex]
  const isLastPage = pageIndex === storyPages.length - 1
  const isChecklistPage = pageIndex === 5
  const totalCoins = 50
  const selectedCost = React.useMemo(() => {
    return selectedActions.reduce((sum, item) => {
      const entry = checklistOptions.find((option) => option.id === item)
      return sum + (entry ? entry.cost : 0)
    }, 0)
  }, [selectedActions])
  const remainingCoins = Math.max(0, totalCoins - selectedCost)
  const showHouse1 = selectedActions.includes("hemat-energi")
  const showTrees = selectedActions.includes("penghijauan")
  const showBus = selectedActions.includes("transportasi")
  const showCarbonTariff = selectedActions.includes("tarif-karbon")
  const showNuclear = selectedActions.includes("nuklir")
  const impactPercent = React.useMemo(() => {
    return selectedActions.reduce((sum, item) => {
      const entry = checklistOptions.find((option) => option.id === item)
      if (!entry) return sum
      const value = entry.impactPercent ?? 0
      return sum + (Number.isFinite(value) ? value : 0)
    }, 0)
  }, [selectedActions])

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

  const handlePrev = () => {
    setPageIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setPageIndex((prev) => Math.min(storyPages.length - 1, prev + 1))
  }

  const handleToggleAction = (item: string, cost: number) => {
    setSelectedActions((prev) => {
      if (prev.includes(item)) {
        return prev.filter((entry) => entry !== item)
      }
      if (remainingCoins < cost) return prev
      return [...prev, item]
    })
  }

  const handleSubmit = () => {
    setShowSubmitConfirm(true)
  }

  const confirmSubmit = () => {
    setShowSubmitConfirm(false)
    setSubmitted(true)
    setPageIndex(6)
  }

  const sidebarPanelClass = isFullscreen
    ? "absolute inset-y-0 left-0 z-[10] flex h-full w-full max-w-[360px] flex-col bg-black/75 p-5 text-white"
    : "absolute inset-y-0 left-0 z-[10] flex h-full w-full max-w-[260px] flex-col bg-black/75 p-3 text-white"
  const sidebarTypographyClass = isFullscreen
    ? "[&_h2]:text-2xl [&_p]:text-base [&_.sidebar-page]:text-sm [&_.sidebar-text]:text-base [&_.sidebar-nav]:text-base"
    : "[&_h2]:text-xl [&_p]:text-sm [&_.sidebar-page]:text-xs [&_.sidebar-text]:text-sm [&_.sidebar-nav]:text-sm"

  const sidebarContent = (
    <>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        <p className="sidebar-page font-semibold uppercase tracking-[0.2em] text-white/70">
          Halaman {pageIndex + 1} dari {storyPages.length}
        </p>
        <h2 className="font-semibold">{currentPage.title}</h2>
        <div className="sidebar-text space-y-2 text-white/80">
          {currentPage.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {currentPage.checklist ? (
            <div
              className="grid grid-cols-2 gap-2 pt-1.5"
            >
              {currentPage.checklist.map((item) => {
                const checked = selectedActions.includes(item.id)
                const disabled = !checked && remainingCoins < item.cost
                const frameClass =
                  checklistCardFrames[
                    currentPage.checklist.indexOf(item) % checklistCardFrames.length
                  ]
                return (
                  <label
                    key={item.id}
                    className={`block ${
                      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleAction(item.id, item.cost)}
                      disabled={disabled}
                      className="sr-only"
                    />
                    <div
                      className={`group relative aspect-square rounded-lg border-2 p-0.5 shadow transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                        checked ? "ring-2 ring-emerald-300" : ""
                      } ${frameClass}`}
                    >
                      <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/95 via-white/90 to-slate-100/80" />
                      <div className="relative flex h-full flex-col rounded-lg border-2 border-slate-700/80 bg-white/90 p-1.5 text-slate-800 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1 rounded-full border border-slate-300/80 bg-white px-1.5 py-0.5 font-semibold text-slate-700 shadow-sm ${isFullscreen ? "text-xs" : "text-[10px]"}`}>
                            {item.cost} koin
                          </span>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault()
                              setActiveInfoId(item.id)
                            }}
                            className={`flex items-center justify-center rounded-full border border-slate-500 bg-white font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 ${isFullscreen ? "size-4 text-[10px]" : "size-3.5 text-[8px]"}`}
                          >
                            ?
                          </button>
                        </div>
                        <span className={`mt-1 overflow-hidden font-semibold leading-snug text-slate-800 ${isFullscreen ? "max-h-[72px] text-xs" : "max-h-[56px] text-[10px]"}`}>
                          {item.label}
                        </span>
                        <div className="mt-auto" />
                      </div>
                      <span className="pointer-events-none absolute bottom-1 right-1 block size-4 rounded-tl-full border-l-2 border-t-2 border-slate-600 bg-slate-100/80" />
                      {checked ? (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow-md">
                            ✓
                          </span>
                        </span>
                      ) : null}
                    </div>
                  </label>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )

  return (
    <PageShell title="Smart Town">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Climate Action
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Merancang Smart Town
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
              Tantangan ini mengajak siswa merancang kota cerdas yang ramah
              lingkungan dengan memadukan prinsip STEM-ESD. Fokus pada solusi
              mitigasi perubahan iklim yang realistis dan dapat diterapkan di
              lingkungan sekitar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/climate-action"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              Kembali
            </Link>
            <Link
              href="/climate-action/kuis"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Lanjut ke Kuis
            </Link>
          </div>
        </div>
      </section>

      <div
        ref={containerRef}
        className={`relative w-full bg-[#f1ecdc] shadow-sm ${
          isFullscreen ? "overflow-hidden rounded-none border-0" : "overflow-hidden rounded-2xl border"
        }`}
        style={
          isFullscreen
            ? { height: "100%" }
            : { aspectRatio: "16 / 9", minHeight: "320px" }
        }
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Layer 1: Background map */}
          <img
            src="/images/peta-map.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Layer 2: Dark overlay */}
          <div className="absolute inset-0 z-[1] bg-black/15" />

          {/* Layer 3: Map objects (images) */}
          {showHouse1 ? (
            <>
              {housePlacements.map((placement, index) => (
                <img
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/rumah1.png"
                  alt="Rumah hemat energi"
                  className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{ left: placement.left, top: placement.top }}
                />
              ))}
            </>
          ) : null}
          {showTrees ? (
            <>
              {treePlacements.map((placement, index) => (
                <img
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/pohon.png"
                  alt="Pohon penghijauan"
                  className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{ left: placement.left, top: placement.top }}
                />
              ))}
            </>
          ) : null}
          {showBus ? (
            <img
              src="/images/bis.png"
              alt="Bus transportasi umum bersih"
              className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                isFullscreen,
                busPlacement,
              )}`}
              style={{ left: busPlacement.left, top: busPlacement.top }}
            />
          ) : null}
          {showCarbonTariff ? (
            <>
              {carbonTariffPlacements.map((placement, index) => (
                <img
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/uang.png"
                  alt="Tarif karbon pada sektor industri"
                  className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{ left: placement.left, top: placement.top }}
                />
              ))}
            </>
          ) : null}
          {showNuclear ? (
            <img
              src="/images/nuklir.png"
              alt="Pembangkit listrik nuklir"
              className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                isFullscreen,
                nuclearPlacement,
              )}`}
              style={{ left: nuclearPlacement.left, top: nuclearPlacement.top }}
            />
          ) : null}

          {/* Layer 4: Sidebar panel — fixed position, won't shift */}
          {isSidebarOpen ? (
            <div className={`${sidebarPanelClass} ${sidebarTypographyClass}`}>
              {sidebarContent}
            </div>
          ) : null}

          {/* Layer 5: HUD (coins, results) */}
          <div className="absolute right-6 top-6 z-[15] flex items-center gap-3">
            <span className="text-5xl font-bold text-yellow-300 drop-shadow">
              {remainingCoins}
            </span>
            <div className="flex size-12 items-center justify-center rounded-full bg-yellow-300 text-xl font-bold text-yellow-800 shadow">
              $
            </div>
          </div>

          {pageIndex === 6 ? (
            <div className="absolute right-6 top-20 z-[15]">
              <div className="flex flex-col items-center gap-3 rounded-xl bg-white/90 px-4 py-4 text-center shadow-lg">
                <div className="flex h-28 w-10 flex-col overflow-hidden rounded-full border border-emerald-200 bg-white">
                  <div
                    className="mt-auto w-full bg-emerald-500"
                    style={{
                      height: `${Math.min(100, submitted ? impactPercent : 0)}%`,
                    }}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Hasil
                  </p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {submitted ? impactPercent : 0}%
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Penurunan emisi
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Layer 6: Bottom nav buttons */}
          <div className="absolute bottom-6 right-6 z-[15] flex items-center gap-3 text-white/90">
              <button
                type="button"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="inline-flex w-28 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100"
              >
                {isSidebarOpen ? "Tutup Panel" : "Buka Panel"}
              </button>
              <button
                type="button"
                onClick={handlePrev}
                disabled={pageIndex === 0}
                className="inline-flex w-28 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ◀ Back
              </button>
              {isChecklistPage ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-28 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100"
                >
                  Submit ▶
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLastPage}
                  className="inline-flex w-28 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next ▶
                </button>
              )}
              <button
                type="button"
                onClick={handleFullscreen}
                className={`inline-flex size-10 items-center justify-center rounded-xl shadow transition ${
                  isFullscreen
                    ? "bg-yellow-300 text-yellow-900 hover:bg-yellow-200"
                    : "bg-white text-slate-900 hover:bg-slate-100"
                }`}
              >
                <img
                  src="/images/full.png"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 object-contain"
                />
              </button>
            </div>
          {activeInfoId ? (
            <div className="absolute inset-0 z-[30] flex items-center justify-center bg-black/50 p-4">
              <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                {(() => {
                  const info = checklistOptions.find(
                    (item) => item.id === activeInfoId
                  )
                  if (!info) return null
                  return (
                    <div className="space-y-4 text-foreground">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold">
                          {info.label} ({info.cost} koin)
                        </h3>
                        <button
                          type="button"
                          onClick={() => setActiveInfoId(null)}
                          className="rounded-lg border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                        >
                          Close ✖
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{info.detail}</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          ) : null}
          {showSubmitConfirm ? (
            <div className="absolute inset-0 z-[30] flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
                <h3 className="text-lg font-semibold text-foreground">
                  Konfirmasi Pilihan
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedActions.length
                    ? "Yakin ingin mengirim pilihan aksi ini?"
                    : "Belum ada aksi yang dipilih. Tetap kirim?"}
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(false)}
                    className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={confirmSubmit}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageShell>
  )
}
