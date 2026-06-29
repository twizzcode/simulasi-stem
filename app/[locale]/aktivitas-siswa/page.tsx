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

const GUIDE_STORAGE_KEY = "aktivitas-siswa-guide-dismissed"

export default function AktivitasSiswaPage() {
  const t = useTranslations("AktivitasSiswa")
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
            src="/images/aktivitas-1.png"
            alt="Ikon aktivitas 1"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <Image
            src="/images/aktivitas-2.png"
            alt="Ikon aktivitas 2"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>
        <div className="relative">
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
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            {t("projectGoals")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {[t("goal1"), t("goal2"), t("goal3"), t("goal4"), t("goal5")].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            {t("presentationTitle")}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("presentationDesc")}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[t("tagPPT"), t("tagPoster"), t("tagInfografis"), t("tagVideo"), t("tagKreatif")].map((tag, i) => (
              <span
                key={i}
                className="rounded-full border bg-secondary/40 px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {t("edpTitle")}
        </h2>
        <div className="mt-6 grid gap-4">
          {[
            { step: t("edpAsk"), title: t("edpAskTitle"), desc: t("edpAskDesc") },
            { step: t("edpResearch"), title: t("edpResearchTitle"), desc: t("edpResearchDesc") },
            { step: t("edpImagine"), title: t("edpImagineTitle"), desc: t("edpImagineDesc") },
            { step: t("edpPlan"), title: t("edpPlanTitle"), desc: t("edpPlanDesc") },
            { step: t("edpCreate"), title: t("edpCreateTitle"), desc: t("edpCreateDesc") },
            { step: t("edpTest"), title: t("edpTestTitle"), desc: t("edpTestDesc") },
            { step: t("edpImprove"), title: t("edpImproveTitle"), desc: t("edpImproveDesc") },
          ].map((item, index) => (
            <div
              key={item.step}
              className="rounded-xl border bg-secondary/30 p-4 md:p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-xs font-semibold text-primary-foreground">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.step}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {t("contentTitle")}
        </h2>
        <div className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          {[t("content1"), t("content2"), t("content3"), t("content4"), t("content5"), t("content6"), t("content7"), t("content8")].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border bg-background/60 p-3"
            >
              <span className="mt-1 size-2 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {t("assessmentTitle")}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("assessmentDesc")}
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              <tr>
                <th className="w-1/3 px-4 py-3">{t("assessmentAspek")}</th>
                <th className="px-4 py-3">{t("assessmentDeskripsi")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { title: t("assess1Title"), desc: t("assess1Desc") },
                { title: t("assess2Title"), desc: t("assess2Desc") },
                { title: t("assess3Title"), desc: t("assess3Desc") },
                { title: t("assess4Title"), desc: t("assess4Desc") },
              ].map((row, i) => (
                <tr key={i} className="bg-background">
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {row.title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </PageShell>
    </>
  )
}
