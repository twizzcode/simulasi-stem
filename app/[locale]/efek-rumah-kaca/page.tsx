"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { PageShell } from "@/components/page-shell"

export default function EfekRumahKacaPage() {
  const t = useTranslations("EfekRumahKaca")

  return (
    <PageShell title={t("title")}>
      <section className="relative overflow-hidden rounded-2xl border bg-card p-5 pt-20 shadow-sm sm:p-6 sm:pt-24 md:p-8 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-4 sm:px-5 md:px-6">
          <Image
            src="/images/rumahkaca-1.png"
            alt="Ikon rumah kaca 1"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <Image
            src="/images/rumahkaca-2.png"
            alt="Ikon rumah kaca 2"
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
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            {t("shortDesc")}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {t("longDesc")}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/efek-rumah-kaca/materi"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {t("deepenMaterial")}
          </Link>
          <Link
            href="/efek-rumah-kaca/simulasi"
            className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/60 hover:text-primary/90"
          >
            {t("simulation")}
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
