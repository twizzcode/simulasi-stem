"use client"

import * as React from "react"
import Image from "next/image"
import { BookOpenTextIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { PageShell } from "@/components/page-shell"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const GUIDE_STORAGE_KEY = "cp-tp-guide-dismissed"

export default function CpTpPage() {
  const t = useTranslations("CpTp")
  const [openGuide, setOpenGuide] = React.useState(false)

  React.useEffect(() => {
    const dismissed = window.localStorage.getItem(GUIDE_STORAGE_KEY)
    if (dismissed !== "true") {
      setOpenGuide(true)
    }
  }, [])

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
            {[t("guideItem1"), t("guideItem2")].map((item, index) => (
              <li key={item} className="flex items-start gap-3">
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
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-card to-secondary/40 p-5 pt-20 shadow-sm sm:p-6 sm:pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-4 sm:px-5 md:px-6">
          <Image
            src="/images/cp.png"
            alt="Ikon CP"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <Image
            src="/images/tp.png"
            alt="Ikon TP"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t("subtitle")}
          </p>
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            {t("heading")}
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            t("tagEfekRumahKaca"),
            t("tagPemanasanGlobal"),
            t("tagAktivitasManusia"),
            t("tagKebijakanLingkungan"),
            t("tagMitigasi"),
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {t("cpTitle")}
            </h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              CP
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {t("cpDesc")}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {t("tpTitle")}
            </h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              TP
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("tpDesc")}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">
          {t("detailHeading")}
        </h3>
        <div className="mt-6 grid gap-4">
          {[
            {
              title: t("detail1Title"),
              desc: t("detail1Desc"),
            },
            {
              title: t("detail2Title"),
              desc: t("detail2Desc"),
            },
            {
              title: t("detail3Title"),
              desc: t("detail3Desc"),
            },
            {
              title: t("detail4Title"),
              desc: t("detail4Desc"),
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="rounded-xl border bg-secondary/40 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </PageShell>
    </>
  )
}
