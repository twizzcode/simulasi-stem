"use client"

import Image from "next/image"
import * as React from "react"
import { useTranslations } from "next-intl"
import { PageShell } from "@/components/page-shell"
import { Link } from "@/i18n/navigation"
import {
  busPlacement,
  carbonTariffPlacements,
  carbonCapturePlacement,
  educationPlacement,
  farmPlacements,
  getIconSizeClass,
  housePlacements,
  nuclearPlacement,
  panganPeoplePlacements,
  solarPanelPlacements,
  treePlacements,
  windTurbinePlacements,
} from "./icons"

const checklistCardFrames = [
  "border-amber-400 bg-amber-100/90",
  "border-yellow-400 bg-yellow-100/90",
  "border-lime-400 bg-lime-100/90",
  "border-cyan-400 bg-cyan-100/90",
]

export default function SmartTownPage() {
  const t = useTranslations("SmartTown")

  const storyPages = [
    {
      title: t("story1Title"),
      body: [t("story1Body")],
    },
    {
      title: t("story2Title"),
      body: [t("story2Body1"), t("story2Body2"), t("story2Body3")],
    },
    {
      title: t("story3Title"),
      body: [t("story3Body1"), t("story3Body2")],
    },
    {
      title: t("story4Title"),
      body: [t("story4Body1"), t("story4Body2")],
    },
    {
      title: t("story5Title"),
      body: [] as string[],
      checklist: [
        { id: "hemat-energi", cost: 6, label: t("action1Label"), impactPercent: 12, detail: t("action1Detail") },
        { id: "penghijauan", cost: 4, label: t("action2Label"), impactPercent: 6, detail: t("action2Detail") },
        { id: "pertanian", cost: 4, label: t("action3Label"), impactPercent: 6, detail: t("action3Detail") },
        { id: "transportasi", cost: 8, label: t("action4Label"), impactPercent: 17, detail: t("action4Detail") },
        { id: "pangan", cost: 7, label: t("action5Label"), impactPercent: 2, detail: t("action5Detail") },
        { id: "nuklir", cost: 9, label: t("action6Label"), impactPercent: 20, detail: t("action6Detail") },
        { id: "carbon-capture", cost: 9, label: t("action7Label"), impactPercent: 10, detail: t("action7Detail") },
        { id: "energi-terbarukan", cost: 9, label: t("action8Label"), impactPercent: 25, detail: t("action8Detail") },
        { id: "edukasi", cost: 5, label: t("action9Label"), impactPercent: 2, detail: t("action9Detail") },
        { id: "tarif-karbon", cost: 7, label: t("action10Label"), impactPercent: 13, detail: t("action10Detail") },
      ],
    },
    {
      title: t("story6Title"),
      body: [t("story6Body1"), t("story6Body2")],
    },
  ]

  const checklistOptions = storyPages.find((page) => page.checklist)?.checklist ?? []

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isCompactDevice, setIsCompactDevice] = React.useState(false)
  const [isPortrait, setIsPortrait] = React.useState(false)
  const [isViewportPortrait, setIsViewportPortrait] = React.useState(false)
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
  const showPangan = selectedActions.includes("pangan")
  const showPertanian = selectedActions.includes("pertanian")
  const showCarbonCapture = selectedActions.includes("carbon-capture")
  const showEnergiTerbarukan = selectedActions.includes("energi-terbarukan")
  const showEdukasi = selectedActions.includes("edukasi")
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
    const syncViewport = () => {
      setIsCompactDevice(window.innerWidth < 768 || window.innerHeight < 768)
      setIsViewportPortrait(window.innerHeight >= window.innerWidth)
    }
    syncViewport()
    window.addEventListener("resize", syncViewport)
    return () => window.removeEventListener("resize", syncViewport)
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
    ? "absolute inset-y-0 left-0 z-[10] flex h-full w-[360px] flex-col overflow-hidden bg-black/75 p-5 text-white"
    : "absolute inset-y-0 left-0 z-[10] flex h-full w-[220px] flex-col overflow-hidden bg-black/75 p-3 text-white sm:w-[260px]"
  const sidebarTypographyClass = isFullscreen
    ? "[&_h2]:text-2xl [&_p]:text-base [&_.sidebar-page]:text-sm [&_.sidebar-text]:text-base [&_.sidebar-nav]:text-base"
    : "[&_h2]:text-xl [&_p]:text-sm [&_.sidebar-page]:text-xs [&_.sidebar-text]:text-sm [&_.sidebar-nav]:text-sm"

  const sidebarContent = (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1">
        <div className="space-y-2">
          <p className="sidebar-page font-semibold uppercase tracking-[0.2em] text-white/70">
            {t("page", { current: pageIndex + 1, total: storyPages.length })}
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
                  <div
                    key={item.id}
                    role="checkbox"
                    aria-checked={checked}
                    aria-disabled={disabled}
                    tabIndex={-1}
                    onClick={() => {
                      if (!disabled) handleToggleAction(item.id, item.cost)
                    }}
                    className={`block select-none ${
                      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`group relative aspect-square rounded-lg border-2 p-0.5 shadow transition duration-200 ring-2 sm:hover:-translate-y-0.5 sm:hover:shadow-md ${
                        checked ? "ring-emerald-300" : "ring-transparent"
                      } ${frameClass}`}
                    >
                      <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/95 via-white/90 to-slate-100/80" />
                      <div className="relative flex h-full flex-col rounded-lg border-2 border-slate-700/80 bg-white/90 p-1.5 text-slate-800 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1 rounded-full border border-slate-300/80 bg-white px-1.5 py-0.5 font-semibold text-slate-700 shadow-sm ${isFullscreen ? "text-xs" : "text-[10px]"}`}>
                            {item.cost} {t("coin")}
                          </span>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
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
                        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow-md">
                            ✓
                          </span>
                        </span>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
          </div>
        </div>
      </div>
    </>
  )
  const shouldRotateFullscreenMobile =
    isFullscreen &&
    isCompactDevice &&
    (isPortrait || isViewportPortrait)

  return (
    <PageShell title={t("title")}>
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("subtitle")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/climate-action"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {t("back")}
            </Link>
            <Link
              href="/climate-action/kuis"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {t("goToQuiz")}
            </Link>
          </div>
        </div>
      </section>

      <div
        ref={containerRef}
        className={`relative w-full bg-[#f1ecdc] shadow-sm ${
          isFullscreen ? "overflow-hidden rounded-none border-0" : "overflow-hidden rounded-2xl border"
        } ${isFullscreen ? "h-full" : "aspect-video"}`}
      >
        <div
          className={`absolute inset-0 ${
            shouldRotateFullscreenMobile
              ? "flex items-center justify-center bg-black"
              : ""
          }`}
        >
          <div
            className={`${
              shouldRotateFullscreenMobile
                ? "absolute left-1/2 top-1/2 h-dvw w-dvh -translate-x-1/2 -translate-y-1/2 origin-center -rotate-90"
                : "relative h-full w-full"
            }`}
          >
            <div
              className={`overflow-hidden ${
                shouldRotateFullscreenMobile ? "h-full w-full" : "absolute inset-0"
              }`}
              style={{ touchAction: "manipulation" }}
            >
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
                <Image
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/rumah1.png"
                  alt="Rumah hemat energi"
                  width={200}
                  height={200}
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
                <Image
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/pohon.png"
                  alt="Pohon penghijauan"
                  width={120}
                  height={120}
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
            <Image
              src="/images/bis.png"
              alt="Bus transportasi umum bersih"
              width={200}
              height={200}
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
                <Image
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/uang.png"
                  alt="Tarif karbon pada sektor industri"
                  width={100}
                  height={100}
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
            <Image
              src="/images/nuklir.png"
              alt="Pembangkit listrik nuklir"
              width={200}
              height={200}
              className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                isFullscreen,
                nuclearPlacement,
              )}`}
              style={{ left: nuclearPlacement.left, top: nuclearPlacement.top }}
            />
          ) : null}
          {showPangan ? (
            <>
              {panganPeoplePlacements.map((placement, index) => (
                <Image
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/people.png"
                  alt="Sosialisasi pengolahan pangan"
                  width={100}
                  height={100}
                  className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{ left: placement.left, top: placement.top }}
                />
              ))}
            </>
          ) : null}
          {showPertanian ? (
            <>
              {farmPlacements.map((placement, index) => (
                <Image
                  key={`${placement.left}-${placement.top}-${index}`}
                  src="/images/sawah.png"
                  alt="Pertanian ramah lingkungan"
                  width={120}
                  height={120}
                  className={`absolute z-[2] object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{
                    left: placement.left,
                    top: placement.top,
                    transform: `translate(-50%, -50%) rotate(${placement.rotateDeg ?? 0}deg)`,
                  }}
                />
              ))}
            </>
          ) : null}
          {showCarbonCapture ? (
            <Image
              src="/images/karbon.png"
              alt="Pengurangan emisi karbon"
              width={160}
              height={160}
              className={`absolute z-[2] object-contain drop-shadow ${getIconSizeClass(
                isFullscreen,
                carbonCapturePlacement,
              )}`}
              style={{
                left: carbonCapturePlacement.left,
                top: carbonCapturePlacement.top,
                transform: `translate(-50%, -50%) rotate(${carbonCapturePlacement.rotateDeg ?? 0}deg)`,
              }}
            />
          ) : null}
          {showEnergiTerbarukan ? (
            <>
              {solarPanelPlacements.map((placement, index) => (
                <Image
                  key={`solar-${placement.left}-${placement.top}-${index}`}
                  src="/images/panel.png"
                  alt="Panel surya"
                  width={120}
                  height={120}
                  className={`absolute z-[4] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{ left: placement.left, top: placement.top }}
                />
              ))}
              {windTurbinePlacements.map((placement, index) => (
                <Image
                  key={`wind-${placement.left}-${placement.top}-${index}`}
                  src="/images/angin.png"
                  alt="Turbin angin"
                  width={120}
                  height={120}
                  className={`absolute z-[2] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow ${getIconSizeClass(
                    isFullscreen,
                    placement,
                  )}`}
                  style={{ left: placement.left, top: placement.top }}
                />
              ))}
            </>
          ) : null}
          {showEdukasi ? (
            <Image
              src="/images/school.png"
              alt="Edukasi di sekolah"
              width={120}
              height={120}
              className={`absolute z-[2] object-contain drop-shadow ${getIconSizeClass(
                isFullscreen,
                educationPlacement,
              )}`}
              style={{
                left: educationPlacement.left,
                top: educationPlacement.top,
                transform: `translate(-50%, -50%) rotate(${educationPlacement.rotateDeg ?? 0}deg)`,
              }}
            />
          ) : null}

          {/* Layer 4: Sidebar panel — fixed position, won't shift */}
          {isSidebarOpen ? (
            <div
              className={`${sidebarPanelClass} ${sidebarTypographyClass}`}
              style={{ transform: "translateZ(0)", willChange: "transform", contain: "layout size" }}
            >
              {sidebarContent}
            </div>
          ) : null}

          {/* Layer 5: HUD (coins, results) */}
          <div className="absolute right-3 top-3 z-[15] flex items-center gap-2 sm:right-6 sm:top-6 sm:gap-3">
            <span className="text-2xl font-bold text-yellow-300 drop-shadow sm:text-5xl">
              {remainingCoins}
            </span>
            <div className="flex size-8 items-center justify-center rounded-full bg-yellow-300 text-base font-bold text-yellow-800 shadow sm:size-12 sm:text-xl">
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
                    {t("result")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {submitted ? impactPercent : 0}%
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {t("emissionReduction")}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Layer 6: Bottom nav buttons */}
          <div className="absolute bottom-3 right-3 z-[15] flex flex-wrap items-center justify-end gap-2 text-white/90 sm:bottom-6 sm:right-6 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="inline-flex w-auto items-center justify-center gap-1 rounded-xl bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-900 shadow transition hover:bg-slate-100 sm:w-28 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
              >
                {isSidebarOpen ? t("closePanel") : t("openPanel")}
              </button>
              <button
                type="button"
                onClick={handlePrev}
                disabled={pageIndex === 0}
                className="inline-flex w-auto items-center justify-center gap-1 rounded-xl bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-900 shadow transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-28 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
              >
                ◀ Back
              </button>
              {isChecklistPage ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-auto items-center justify-center gap-1 rounded-xl bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-900 shadow transition hover:bg-slate-100 sm:w-28 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
                >
                  Submit ▶
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLastPage}
                  className="inline-flex w-auto items-center justify-center gap-1 rounded-xl bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-900 shadow transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-28 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
                >
                  Next ▶
                </button>
              )}
              <button
                type="button"
                onClick={handleFullscreen}
                className={`inline-flex size-8 items-center justify-center rounded-xl shadow transition sm:size-10 ${
                  isFullscreen
                    ? "bg-yellow-300 text-yellow-900 hover:bg-yellow-200"
                    : "bg-white text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Image
                  src="/images/full.png"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="h-4 w-4 object-contain sm:h-5 sm:w-5"
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
                          {info.label} ({info.cost} {t("coin")})
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
                  {t("confirmTitle")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedActions.length
                    ? t("confirmWithActions")
                    : t("confirmWithoutActions")}
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(false)}
                    className="rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="button"
                    onClick={confirmSubmit}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                  >
                    {t("send")}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
