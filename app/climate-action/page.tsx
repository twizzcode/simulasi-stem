import { PageShell } from "@/components/page-shell"
import Link from "next/link"

export default function ClimateActionPage() {
  return (
    <PageShell title="Climate Action">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-5 pt-20 shadow-sm sm:p-6 sm:pt-24 md:p-8 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-4 sm:px-5 md:px-6">
          <img
            src="/images/action-1.png"
            alt="Ikon climate action 1"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <img
            src="/images/action-2.png"
            alt="Ikon climate action 2"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Aksi Iklim
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Climate Action
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Ajak siswa bertindak nyata melalui aktivitas terarah yang relevan
              dengan isu pemanasan global dan perubahan iklim.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Climate Action merupakan bagian yang mengajak siswa untuk bertindak
          nyata dalam menghadapi pemanasan global dan perubahan iklim. Pada
          bagian ini terdapat dua aktivitas utama. Aktivitas pertama adalah
          merancang Smart Town, yaitu merancang kota cerdas yang ramah
          lingkungan dan mampu menanggulangi dampak pemanasan global serta
          perubahan iklim melalui pemanfaatan teknologi dan prinsip
          keberlanjutan. Aktivitas kedua adalah kuis refleksi, yang bertujuan
          membantu siswa meninjau kembali pemahaman mereka, mengevaluasi pilihan
          yang telah dibuat, serta menumbuhkan kesadaran dan komitmen sebagai
          agen perubahan iklim.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/climate-action/smart-town"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Lanjut ke Smart Town
          </Link>
          <Link
            href="/climate-action/kuis"
            className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/60 hover:text-primary/90"
          >
            Lanjut ke Kuis
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
