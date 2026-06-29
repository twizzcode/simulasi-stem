"use client"

import * as React from "react"
import Image from "next/image"
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

const GUIDE_STORAGE_KEY = "climate-action-guide-dismissed"

export default function ClimateActionPage() {
  const t = useTranslations("ClimateAction")
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
            {[
              t("guideItem1"),
              t("guideItem2"),
              t("guideItem3"),
              t("guideItem4"),
              t("guideItem5"),
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
      <section className="relative overflow-hidden rounded-2xl border bg-card p-5 pt-20 shadow-sm sm:p-6 sm:pt-24 md:p-8 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-4 sm:px-5 md:px-6">
          <Image
            src="/images/action-1.png"
            alt="Ikon climate action 1"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <Image
            src="/images/action-2.png"
            alt="Ikon climate action 2"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("subtitle")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              {t("shortDesc")}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {t("longDesc")}
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/climate-action/smart-town"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {t("goToSmartTown")}
          </Link>
          <Link
            href="/climate-action/kuis"
            className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/60 hover:text-primary/90"
          >
            {t("goToQuiz")}
          </Link>
        </div>
      </section>
      </PageShell>
    </>
  )
}
