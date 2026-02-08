import Link from "next/link"
import { Play } from "lucide-react"

import { PageShell } from "@/components/page-shell"

export default function Home() {
  return (
    <PageShell title="Beranda" firstPanelGradient={false}>
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-secondary/40 p-5 shadow-sm sm:p-6 md:p-8">
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 size-80 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative mb-5 h-20 md:mb-10 md:h-28">
          <img
            src="/images/bumi-panas.png"
            alt="Ilustrasi bumi panas"
            className="pointer-events-none absolute left-0 top-0 h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-28 md:w-28"
          />
          <div className="pointer-events-none absolute inset-x-0 top-1.5 flex items-start justify-center gap-3 sm:top-2 sm:gap-6 md:top-3 md:gap-14">
            <img
              src="/images/co2.png"
              alt="Ikon CO2"
              className="h-9 w-9 object-contain sm:h-12 sm:w-12 md:h-16 md:w-16"
            />
            <img
              src="/images/ch4.png"
              alt="Ikon CH4"
              className="h-9 w-9 object-contain sm:h-12 sm:w-12 md:h-16 md:w-16"
            />
            <img
              src="/images/n2o.png"
              alt="Ikon N2O"
              className="h-9 w-9 object-contain sm:h-12 sm:w-12 md:h-16 md:w-16"
            />
          </div>
          <img
            src="/images/tenaga-surya.png"
            alt="Ilustrasi tenaga surya"
            className="pointer-events-none absolute right-0 top-0 h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-28 md:w-28"
          />
        </div>
        <div className="relative max-w-3xl space-y-4 md:space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-4 sm:text-xs">
            Media Pembelajaran IPA
            <span className="size-1.5 rounded-full bg-primary" />
            STEM-ESD
          </span>
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Simulasi Komputer Berbasis STEM-ESD
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              Simulasi komputer berbasis STEM-ESD merupakan media pembelajaran
              IPA berbentuk web yang dirancang untuk membahas isu-isu lingkungan
              dan perubahan iklim secara kontekstual. Melalui aktivitas
              interaktif yang mengintegrasikan aspek STEM (Sains, Teknologi,
              Engineering, dan Matematika) serta dengan berbasis Education for
              Sustainable (ESD) media ini diharapkan mampu membantu siswa
              memahami IPA sekaligus meningkatkan literasi perubahan iklim yang
              dibutuhkan pada era saat ini.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/cp-tp"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 md:px-6 md:py-3"
            >
              <Play className="size-4" />
              Mulai Belajar
            </Link>
            <span className="text-xs text-muted-foreground">
              Lihat CP & TP sebelum memulai simulasi
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Kontekstual & Interaktif",
            desc: "Skenario lingkungan nyata yang divisualkan melalui simulasi agar siswa aktif mengeksplorasi konsep.",
          },
          {
            title: "Terintegrasi STEM",
            desc: "Menghubungkan sains, teknologi, engineering, dan matematika untuk membangun pemahaman yang utuh.",
          },
          {
            title: "Berbasis ESD",
            desc: "Menumbuhkan kepedulian dan aksi nyata terhadap isu perubahan iklim dan keberlanjutan.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border bg-background/70 p-4 shadow-sm md:p-5"
          >
            <h2 className="text-lg font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  )
}
