import { PageShell } from "@/components/page-shell"

export default function ProfilePengembangPage() {
  return (
    <PageShell title="Profile Pengembang">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-secondary/40 p-8 shadow-sm md:p-10">
        <div className="absolute -right-24 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-secondary/30 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Tim Pengembang
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
            Pengembang Media Simulasi Komputer
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Tim ini berfokus pada pengembangan media pembelajaran berbasis
            STEM-ESD untuk memperkuat literasi lingkungan dan pengambilan
            keputusan berkelanjutan melalui simulasi interaktif.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            name: "Tiara Dwi Wulandari, S.Pd.",
            initials: "TW",
          },
          {
            name: "Arif Widiyatmoko, S.Pd., M.Pd., Ph.D.",
            initials: "AW",
          },
          {
            name: "Associate Prof. Dr. Hutkemri Zulnaidi",
            initials: "HZ",
          },
        ].map((member) => (
          <article
            key={member.name}
            className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="absolute -right-16 -top-20 size-40 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
                  {member.initials}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {member.name}
                  </h2>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Kolaborasi & Pengembangan
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Terbuka untuk kolaborasi riset, uji coba pembelajaran, dan
              pengembangan modul berbasis simulasi.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/40 px-4 py-2 text-xs font-semibold text-secondary-foreground">
            STEM-ESD • Simulasi • Lingkungan
          </div>
        </div>
      </section>
    </PageShell>
  )
}
