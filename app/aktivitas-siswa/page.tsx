import { PageShell } from "@/components/page-shell"

export default function AktivitasSiswaPage() {
  return (
    <PageShell title="Aktivitas Siswa">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Project Based Learning
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
          Aktivitas Siswa: Proyek STEM–ESD
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          Pada aktivitas ini, siswa diajak untuk memahami isu-isu lingkungan dan
          merancang solusi berkelanjutan dalam bentuk proyek. Pemahaman konsep
          IPA yang diperoleh melalui simulasi komputer tentang pemanasan global
          dan perubahan iklim dimanfaatkan sebagai dasar dalam merancang solusi
          berkelanjutan dengan pendekatan STEM–ESD. Proyek dilaksanakan melalui
          tahapan Engineering Design Process (EDP) agar siswa mampu menerapkan
          konsep IPA secara nyata dan sistematis.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Tujuan Proyek
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {[
              "Mengidentifikasi permasalahan lingkungan perubahan iklim akibat aktivitas manusia.",
              "Menjelaskan hubungan sebab–akibat pemanasan global dan perubahan iklim secara ilmiah.",
              "Membandingkan berbagai alternatif solusi mitigasi perubahan iklim.",
              "Merancang solusi berbasis Sains, Teknologi, Engineering, dan Matematika (STEM).",
              "Menunjukkan sikap tanggung jawab terhadap lingkungan sesuai prinsip Education for Sustainable Development (ESD).",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Presentasi Hasil Proyek
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Setelah prototype selesai dibuat dan diuji, setiap kelompok
            menyiapkan bahan presentasi untuk memaparkan proses, hasil, dan
            dampak solusi yang dikembangkan dengan pendekatan STEM-ESD.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "PowerPoint (PPT)",
              "Poster ilmiah",
              "Infografis",
              "Video singkat",
              "Bentuk kreatif lainnya",
            ].map((tag) => (
              <span
                key={tag}
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
          Alur Proyek Sesuai Engineering Design Process (EDP)
        </h2>
        <div className="mt-6 grid gap-4">
          {[
            {
              step: "Ask",
              title: "Identifikasi Kebutuhan & Kendala",
              desc: "Identifikasi masalah (pemborosan energi, sampah, emisi karbon), tujuan solusi, serta batasan bahan, biaya, waktu, dan dampak lingkungan.",
            },
            {
              step: "Research",
              title: "Meneliti Masalah",
              desc: "Mengumpulkan informasi dari berbagai sumber tentang penyebab, dampak, dan solusi perubahan iklim.",
            },
            {
              step: "Imagine",
              title: "Mengembangkan Ide Solusi",
              desc: "Menghasilkan ide kreatif untuk merancang produk/sistem mitigasi perubahan iklim berbasis STEM-ESD.",
            },
            {
              step: "Plan",
              title: "Merencanakan Solusi Terbaik",
              desc: "Memilih ide paling efektif, membuat sketsa, langkah kerja, alat-bahan, dan cara kerja solusi.",
            },
            {
              step: "Create",
              title: "Membangun Prototipe",
              desc: "Membuat prototype sesuai rencana dengan menerapkan konsep IPA, teknologi, teknik, dan matematika.",
            },
            {
              step: "Test",
              title: "Menguji dan Mengevaluasi",
              desc: "Menguji kinerja prototype, mengumpulkan data, dan menilai efektivitas serta keberlanjutan.",
            },
            {
              step: "Improve",
              title: "Mendesain Ulang atau Perbaikan",
              desc: "Mengevaluasi kelebihan/kelemahan dan memperbaiki desain agar lebih optimal dan berdampak.",
            },
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
          Isi Presentasi yang Disarankan
        </h2>
        <div className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          {[
            "Latar belakang masalah",
            "Tujuan proyek",
            "Proses EDP (Ask–Research–Imagine–Plan–Create–Test–Improve)",
            "Deskripsi prototype",
            "Hasil uji coba",
            "Kelebihan dan keterbatasan solusi",
            "Dampak terhadap mitigasi perubahan iklim",
            "Kesimpulan dan saran pengembangan",
          ].map((item) => (
            <div
              key={item}
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
          Penilaian Proyek
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Proyek dinilai berdasarkan aspek berikut:
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              <tr>
                <th className="w-1/3 px-4 py-3">Aspek Penilaian</th>
                <th className="px-4 py-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                {
                  title: "Inovasi Produk",
                  desc: "Produk menunjukkan ide baru untuk membantu mengurangi dampak perubahan iklim. Siswa mampu menjelaskan alasan mengapa produk tersebut penting bagi keberlanjutan.",
                },
                {
                  title: "Kegunaan (Usabilitas)",
                  desc: "Produk dapat digunakan dengan mudah dan aman. Alat/solusi bekerja sesuai fungsinya dan memberi manfaat nyata.",
                },
                {
                  title: "Kreativitas",
                  desc: "Produk dirancang secara kreatif dari segi bentuk, fungsi, atau cara kerja. Siswa menggabungkan ide IPA dengan aspek STEM untuk membuat solusi yang efektif dan efisien.",
                },
                {
                  title: "Ketahanan & Kualitas",
                  desc: "Produk cukup kuat dan rapi. Dapat digunakan lebih dari sekali dan tetap berfungsi dengan baik.",
                },
              ].map((row) => (
                <tr key={row.title} className="bg-background">
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
  )
}
