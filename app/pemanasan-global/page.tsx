import Link from "next/link"

import { PageShell } from "@/components/page-shell"

export default function PemanasanGlobalPage() {
  return (
    <PageShell title="Pemanasan Global & Perubahan Iklim">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Materi Inti
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
          Pemanasan Global & Perubahan Iklim
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Pemanasan global adalah meningkatnya suhu Bumi karena panas Matahari
          terjebak oleh gas rumah kaca di atmosfer. Akibat pemanasan global,
          terjadilah perubahan iklim, yaitu perubahan pola cuaca di Bumi. Musim
          menjadi tidak menentu, hujan dan panas ekstrem lebih sering terjadi,
          es di kutub mencair, dan permukaan laut naik. Pemanasan global dan
          perubahan iklim tidak hanya berdampak pada alam, tetapi juga pada
          kehidupan manusia. Pertanian terganggu karena musim sulit diprediksi,
          serta bencana seperti banjir dan kekeringan makin sering terjadi.
          Karena itu, memahami kedua konsep ini penting agar kita sadar bahwa
          tindakan manusia hari ini sangat menentukan kondisi Bumi di masa depan.
        </p>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-semibold text-foreground">Cuaca</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-slate-600 px-4 py-1 text-xs font-semibold text-white">
              Cuaca
            </div>
            <p className="mt-3">
              Keadaan udara atau atmosfer berupa temperatur, cahaya matahari,
              kelembapan, atau kecepatan angin yang diukur pada satu tempat
              tertentu dengan jangka waktu terbatas.
            </p>
          </div>
          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-slate-600 px-4 py-1 text-xs font-semibold text-white">
              Iklim
            </div>
            <p className="mt-3">
              Keadaan hawa, yang berupa suhu, kelembapan, awan, hujan, dan sinar
              matahari, yang diamati pada suatu daerah dalam jangka waktu lebih
              lama (sekitar 30 tahun).
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
        <div className="relative w-full overflow-hidden rounded-2xl border bg-secondary/20 shadow-sm">
          <div className="aspect-[5/2] w-full">
            <img
              src="/images/cuaca.png"
              alt="Ilustrasi cuaca dan iklim"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Dampak Perubahan Cuaca dan Iklim
        </h2>
        <div className="mt-5 grid gap-5">
          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-emerald-600 px-4 py-1 text-xs font-semibold text-white">
              Negara Tropis
            </div>
            <ul className="mt-3 space-y-2">
              {[
                "Terjadi perubahan waktu musim hujan dan musim kemarau.",
                "Terjadi kekeringan, tanaman sulit tumbuh, kurangnya air bersih, serta mudah terjadi kebakaran hutan.",
                "Udara semakin panas dan lembab, memengaruhi kesehatan manusia.",
                "Curah hujan tinggi, menyebabkan banjir dan tanah longsor.",
                "Memicu berkembang biaknya hewan-hewan merugikan.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
            <div className="inline-flex rounded-full bg-sky-600 px-4 py-1 text-xs font-semibold text-white">
              Negara 4 Musim
            </div>
            <ul className="mt-3 space-y-2">
              {[
                "Meningkatnya potensi gelombang panas, dehidrasi, serangan panas, dan korban jiwa.",
                "Musim dingin lebih pendek dan temperaturnya meningkat sehingga hari-hari bersalju berkurang.",
                "Musim gugur hangat dan kering, sehingga meningkatkan potensi kebakaran hutan.",
                "Musim semi datang lebih cepat.",
                "Terjadinya angin topan, badai, dan hujan es yang lebih sering.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border bg-secondary/20 p-5 text-sm text-muted-foreground shadow-sm">
          <div className="inline-flex rounded-full bg-slate-700 px-4 py-1 text-xs font-semibold text-white">
            Kenaikan Permukaan Air Laut
          </div>
          <p className="mt-3">
            Perubahan cuaca dan iklim di seluruh bumi membuat bumi menjadi lebih
            hangat yang mengakibatkan es di bumi akan mencair dan menjadi air di
            lautan. Dampak dari kenaikan permukaan air laut tersebut diantaranya:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "Mengganggu keberlangsungan hidup di sepanjang garis pantai.",
              "Tercampurnya air tanah dengan air laut, mengganggu pasokan air tanah untuk minum, mandi, mencuci dan kegiatan lainnya.",
              "Lambat laun kota-kota di pinggir pantai bisa tenggelam.",
              "Pulau-pulau kecil juga bisa tenggelam.",
              "Erosi tebing, pantai, dan bukit pasir di lautan akan menjadi lebih sering terjadi.",
              "Meningkatnya frekuensi banjir akibat air pasang.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-slate-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
        <div className="relative w-full overflow-hidden rounded-2xl border bg-secondary/20 shadow-sm">
          <div className="aspect-[5/2] w-full">
            <img
              src="/images/iklim.png"
              alt="Ilustrasi iklim"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Simulasi Interaktif
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Area simulasi pemanasan global akan ditampilkan di sini.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed bg-background/60 p-5 text-sm text-muted-foreground">
          <span>Placeholder simulasi.</span>
          <Link
            href="/pemanasan-global/simulasi"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Buka Simulasi
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
