"use client"

import * as React from "react"

import { PageShell } from "@/components/page-shell"

const defaultName = "Nama Siswa"

const escapePdfText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")

const wrapText = (text: string, maxChars: number) => {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ""
  words.forEach((word) => {
    if (!current) {
      current = word
      return
    }
    if ((current + " " + word).length <= maxChars) {
      current += ` ${word}`
    } else {
      lines.push(current)
      current = word
    }
  })
  if (current) lines.push(current)
  return lines
}

const buildPageContent = (heading: string, lines: string[]) => {
  const headingLine = `(${escapePdfText(heading)}) Tj`
  const bodyLines = lines
    .map((line, index) =>
      index === 0 ? `(${escapePdfText(line)}) Tj` : `0 -16 Td (${escapePdfText(line)}) Tj`
    )
    .join("\n")

  return [
    "BT",
    "/F1 18 Tf",
    "48 790 Td",
    headingLine,
    "ET",
    "BT",
    "/F1 12 Tf",
    "48 760 Td",
    bodyLines,
    "ET",
  ].join("\n")
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

const dataUrlToBytes = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1] ?? ""
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

const buildCertificateImagePage = async (name: string) => {
  const img = await loadImage("/images/sertifikat.png")
  const canvas = document.createElement("canvas")
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas not supported")
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const displayName = name.trim() || defaultName
  ctx.fillStyle = "#2b2b2b"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.font = "bold 64px Arial"
  ctx.fillText(displayName, canvas.width / 2, canvas.height * 0.58)

  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92)
  return {
    bytes: dataUrlToBytes(jpegDataUrl),
    width: canvas.width,
    height: canvas.height,
  }
}

const buildImagePage = async (src: string) => {
  const img = await loadImage(src)
  const canvas = document.createElement("canvas")
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas not supported")
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92)
  return {
    bytes: dataUrlToBytes(jpegDataUrl),
    width: canvas.width,
    height: canvas.height,
  }
}

const buildPdf = async (name: string) => {
  const certificateImage = await buildCertificateImagePage(name)
  const page2Image = await buildImagePage("/images/sertifikat-1.png")
  const page3Image = await buildImagePage("/images/sertifikat-2.png")

  const contentPage1 = `q 842 0 0 595 0 0 cm /Im1 Do Q`
  const contentPage2 = `q 842 0 0 595 0 0 cm /Im2 Do Q`
  const contentPage3 = `q 842 0 0 595 0 0 cm /Im3 Do Q`

  const encoder = new TextEncoder()
  const chunks: BlobPart[] = []
  const offsets: number[] = Array(12).fill(0)
  let cursor = 0

  const addBytes = (bytes: Uint8Array) => {
    const buffer = Uint8Array.from(bytes).buffer
    chunks.push(buffer)
    cursor += bytes.length
  }

  const addText = (text: string) => {
    addBytes(encoder.encode(text))
  }

  const startObj = (id: number) => {
    offsets[id] = cursor
    addText(`${id} 0 obj\n`)
  }

  addText("%PDF-1.3\n")

  startObj(1)
  addText("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")

  startObj(2)
  addText("<< /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >>\nendobj\n")

  startObj(3)
  addText(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im1 6 0 R >> >> /Contents 9 0 R >>\nendobj\n"
  )

  startObj(4)
  addText(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im2 7 0 R >> >> /Contents 10 0 R >>\nendobj\n"
  )

  startObj(5)
  addText(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im3 8 0 R >> >> /Contents 11 0 R >>\nendobj\n"
  )

  startObj(6)
  addText(
    `<< /Type /XObject /Subtype /Image /Width ${certificateImage.width} /Height ${certificateImage.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${certificateImage.bytes.length} >>\nstream\n`
  )
  addBytes(certificateImage.bytes)
  addText("\nendstream\nendobj\n")

  startObj(7)
  addText(
    `<< /Type /XObject /Subtype /Image /Width ${page2Image.width} /Height ${page2Image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page2Image.bytes.length} >>\nstream\n`
  )
  addBytes(page2Image.bytes)
  addText("\nendstream\nendobj\n")

  startObj(8)
  addText(
    `<< /Type /XObject /Subtype /Image /Width ${page3Image.width} /Height ${page3Image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page3Image.bytes.length} >>\nstream\n`
  )
  addBytes(page3Image.bytes)
  addText("\nendstream\nendobj\n")

  startObj(9)
  addText(`<< /Length ${contentPage1.length} >>\nstream\n${contentPage1}\nendstream\nendobj\n`)

  startObj(10)
  addText(`<< /Length ${contentPage2.length} >>\nstream\n${contentPage2}\nendstream\nendobj\n`)

  startObj(11)
  addText(`<< /Length ${contentPage3.length} >>\nstream\n${contentPage3}\nendstream\nendobj\n`)

  const xrefOffset = cursor
  addText("xref\n0 12\n0000000000 65535 f \n")
  for (let i = 1; i <= 11; i += 1) {
    addText(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`)
  }
  addText(`trailer\n<< /Size 12 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

  return new Blob(chunks, { type: "application/pdf" })
}

export default function SertifikatPage() {
  const [name, setName] = React.useState("")

  const handleDownload = async () => {
    const blob = await buildPdf(name.trim() || defaultName)
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `sertifikat-${(name || "siswa").trim().replace(/\s+/g, "-").toLowerCase()}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PageShell title="Sertifikat">
      <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Penghargaan
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Sertifikat Penyelesaian
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Masukkan nama untuk ditampilkan pada sertifikat, lalu unduh
              sebagai PDF.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <label className="text-sm font-semibold text-foreground">
            Nama pada sertifikat
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Contoh: Aulia Rahma"
            className="mt-3 w-full rounded-xl border px-4 py-2 text-sm text-foreground shadow-sm focus:border-primary/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleDownload}
            className="mt-5 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Download PDF
          </button>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold text-foreground">Preview</p>
          <div className="mt-4 space-y-4">
            <div className="relative aspect-[297/210] w-full overflow-hidden rounded-2xl border bg-white shadow-inner">
              <img
                src="/images/sertifikat.png"
                alt="Sertifikat"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-1/2 top-[58%] w-full -translate-x-1/2 text-center">
                <p className="text-2xl font-semibold text-slate-800">
                  {name.trim() || defaultName}
                </p>
              </div>
            </div>

            <div className="relative aspect-[297/210] w-full overflow-hidden rounded-2xl border bg-white shadow-inner">
              <img
                src="/images/sertifikat-1.png"
                alt="Sertifikat halaman 2"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="relative aspect-[297/210] w-full overflow-hidden rounded-2xl border bg-white shadow-inner">
              <img
                src="/images/sertifikat-2.png"
                alt="Sertifikat halaman 3"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
