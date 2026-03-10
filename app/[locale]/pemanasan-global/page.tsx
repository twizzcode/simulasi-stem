"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

import { PageShell } from "@/components/page-shell"

export default function PemanasanGlobalPage() {
  const t = useTranslations("PemanasanGlobal")

  return (
    <PageShell title={t("title")}>
      <section className="relative overflow-hidden rounded-2xl border bg-card p-5 pt-20 shadow-sm sm:p-6 sm:pt-24 md:p-8 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-4 sm:px-5 md:px-6">
          <Image
            src="/images/perubahan-iklim-1.png"
            alt="Ikon perubahan iklim 1"
            width={80}
            height={80}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <Image
            src="/images/perubahan-iklim-2.png"
            alt="Ikon perubahan iklim 2"
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
            {t("description")}
          </p>
          <div className="mt-5">
            <Link
              href="/pemanasan-global/simulasi"
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {t("openSimulation")}
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-semibold text-foreground">{t("weatherTitle")}</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-slate-600 px-4 py-1 text-xs font-semibold text-white">
              {t("weatherBadge")}
            </div>
            <p className="mt-3">
              {t("weatherDesc")}
            </p>
          </div>
          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-slate-600 px-4 py-1 text-xs font-semibold text-white">
              {t("climateBadge")}
            </div>
            <p className="mt-3">
              {t("climateDesc")}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
        <div className="relative w-full overflow-hidden rounded-2xl border bg-secondary/20 shadow-sm">
          <div className="relative aspect-[5/2] w-full">
            <Image
              src="/images/cuaca.png"
              alt="Ilustrasi cuaca dan iklim"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          {t("impactTitle")}
        </h2>
        <div className="mt-5 grid gap-5">
          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-emerald-600 px-4 py-1 text-xs font-semibold text-white">
              {t("tropicalBadge")}
            </div>
            <ul className="mt-3 space-y-2">
              {([t("tropical1"), t("tropical2"), t("tropical3"), t("tropical4"), t("tropical5")] as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-sky-600 px-4 py-1 text-xs font-semibold text-white">
              {t("fourSeasonBadge")}
            </div>
            <ul className="mt-3 space-y-2">
              {([t("fourSeason1"), t("fourSeason2"), t("fourSeason3"), t("fourSeason4"), t("fourSeason5")] as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
          <div className="inline-flex rounded-full bg-slate-700 px-4 py-1 text-xs font-semibold text-white">
            {t("seaLevelBadge")}
          </div>
          <p className="mt-3">
            {t("seaLevelDesc")}
          </p>
          <ul className="mt-3 space-y-2">
            {([t("seaLevel1"), t("seaLevel2"), t("seaLevel3"), t("seaLevel4"), t("seaLevel5"), t("seaLevel6")] as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-slate-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
        <div className="relative w-full overflow-hidden rounded-2xl border bg-secondary/20 shadow-sm">
          <div className="relative aspect-[5/2] w-full">
            <Image
              src="/images/iklim.png"
              alt="Ilustrasi iklim"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>


    </PageShell>
  )
}
