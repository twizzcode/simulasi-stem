import { PageShell } from "@/components/page-shell"
import Link from "next/link"

export default function EfekRumahKacaPage() {
  return (
    <PageShell title="Efek Rumah Kaca">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Isu Lingkungan
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
          Efek Rumah Kaca
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Pemanasan global akibat peningkatan gas rumah kaca di atmosfer.
        </p>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Efek rumah kaca diartikan sebagai proses naiknya suhu bumi yang
          disebabkan perubahan komposisi atmosfer dan menyebabkan sinar
          matahari tetap berada di bumi serta tidak dapat dipantukan secara
          sempurna keluar atmosfer. Efek rumah kaca terjadi akibat aktivitas
          manusia yang menghasilkan gas buangan seperti karbon dioksida (CO₂),
          dinitrogen oksida (N₂O), uap air (H2O), dan metana (CH₄). Gas-gas ini
          terakumulasi di atmosfer yang menyebabkan energi Matahari terperangkap
          di Bumi dan tidak dapat dipantulkan ke luar angkasa lagi. Jika jumlah
          gas rumah kaca tersebut semakin meningkat maka panas yang terperangkap
          semakin banyak. Akibatnya, suhu Bumi naik atau disebut pemanasan global
          yang berdampak pada perubahan iklim.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/efek-rumah-kaca/materi"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Perdalam Materi
          </Link>
          <Link
            href="/efek-rumah-kaca/simulasi"
            className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/60 hover:text-primary/90"
          >
            Simulasi
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
