import { PageShell } from "@/components/page-shell"

export default function CpTpPage() {
  return (
    <PageShell title="CP & TP">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-card to-secondary/40 p-5 pt-20 shadow-sm sm:p-6 sm:pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-between px-4 sm:px-5 md:px-6">
          <img
            src="/images/cp.png"
            alt="Ikon CP"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <img
            src="/images/tp.png"
            alt="Ikon TP"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Bab Isu-Isu Lingkungan
          </p>
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            Media simulasi komputer berbasis STEM-ESD
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            Dirancang berdasarkan Capaian Pembelajaran (CP) dan Tujuan
            Pembelajaran (TP) agar siswa mampu memahami keterkaitan sistem Bumi,
            aktivitas manusia, serta solusi berkelanjutan melalui simulasi
            interaktif.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Efek Rumah Kaca",
            "Pemanasan Global",
            "Aktivitas Manusia",
            "Kebijakan Lingkungan",
            "Mitigasi Perubahan Iklim",
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
              Capaian Pembelajaran (CP)
            </h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              CP
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Siswa mampu menganalisis keterkaitan antara sistem Bumi dan aktivitas
            manusia serta dampaknya terhadap lingkungan, serta merancang solusi
            untuk mengurangi dampak negatif tersebut sebagai upaya pembangunan
            berkelanjutan.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Tujuan Pembelajaran (TP)
            </h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              TP
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Fokus pada pemahaman konsep, analisis dampak, evaluasi kebijakan,
            dan perancangan strategi mitigasi berbasis STEM.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">
          Rincian Tujuan Pembelajaran
        </h3>
        <div className="mt-6 grid gap-4">
          {[
            {
              title:
                "Mekanisme efek rumah kaca dan kaitannya dengan pemanasan global",
              desc: "Siswa dapat menjelaskan mekanisme efek rumah kaca menggunakan representasi visual pada simulasi komputer.",
            },
            {
              title:
                "Analisis pengaruh aktivitas manusia terhadap kenaikan suhu Bumi",
              desc: "Siswa menganalisis penggunaan energi fosil, deforestasi, dan transportasi terhadap perubahan suhu.",
            },
            {
              title: "Evaluasi skenario kebijakan lingkungan",
              desc: "Siswa mengevaluasi energi terbarukan, reboisasi, dan pengurangan emisi berdasarkan hasil simulasi.",
            },
            {
              title: "Perancangan strategi mitigasi perubahan iklim berbasis STEM",
              desc: "Siswa merancang strategi mitigasi dengan memanfaatkan hasil simulasi sebagai dasar keputusan berkelanjutan.",
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
  )
}
