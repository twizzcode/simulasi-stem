export type Question = {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export const questions: Question[] = [
  {
    id: "q4",
    text: "Sebagai agen perubahan iklim, jenis kendaraan apa yang akan kamu pilih?",
    options: [
      "Kereta berbahan bakar batu bara",
      "Mobil berbahan bakar minyak bumi",
      "Sepeda",
      "Motor berbahan bakar fosil",
    ],
    correctIndex: 2,
    explanation: "Sepeda tidak menghasilkan emisi gas rumah kaca.",
  },
  {
    id: "q5",
    text: "Upaya mitigasi perubahan iklim yang sebaiknya saya lakukan sebelum meninggalkan ruang kelas adalah....",
    options: [
      "Mematikan lampu dan kipas",
      "Memanggil petugas kebersihan untuk membereskan ruangan",
      "Meninggalkan kelas begitu saja",
      "Saya tidak tahu",
    ],
    correctIndex: 0,
    explanation: "Mematikan peralatan listrik dapat menghemat energi dan mengurangi emisi.",
  },
  {
    id: "q6",
    text: "Gas metana (CH₄) salah satu penyebab gas rumah kaca. Berikut ini sumber penghasil gas metana, kecuali....",
    options: [
      "Pembusukan sampah sayur dan buah",
      "Memasak dengan kompor listrik",
      "Produksi bahan bakar fosil",
      "Kotoran hewan ternak",
    ],
    correctIndex: 1,
    explanation: "Kompor listrik tidak menghasilkan gas metana.",
  },
  {
    id: "q7",
    text: "Langkah mana yang paling inovatif untuk mengurangi jejak karbon di atmosfer adalah....",
    options: [
      "Mengurangi jumlah tempat sampah umum",
      "Membatasi pembangunan infrastruktur transportasi",
      "Memfokuskan investasi pada bahan bakar fosil",
      "Memasang panel surya di bangunan publik",
    ],
    correctIndex: 3,
    explanation: "Panel surya menghasilkan energi bersih tanpa emisi karbon.",
  },
  {
    id: "q8",
    text: "Ketika telah selesai menggunakan komputer, saya akan....",
    options: [
      "Langsung meninggalkannya tanpa melakukan apa pun",
      "Mematikan komputer terlebih dahulu",
      "Membiarkan komputer tetap menyala tetapi layarnya dimatikan",
      "Saya tidak mengetahui apa yang harus dilakukan",
    ],
    correctIndex: 1,
    explanation: "Mematikan komputer menghemat energi listrik.",
  },
  {
    id: "q9",
    text: "Mengapa beberapa produk memiliki label energi?",
    options: [
      "Untuk membantu membandingkan produk mana yang menggunakan lebih banyak atau lebih sedikit energi",
      "Untuk menampilkan harga produk",
      "Untuk menjelaskan dimana produk tersebut harus dicolokkan",
      "Untuk menjelaskan fungsi produk",
    ],
    correctIndex: 0,
    explanation: "Label energi membantu konsumen memilih produk yang lebih hemat energi.",
  },
  {
    id: "q10",
    text: "Salah satu upaya mitigasi perubahan iklim saat saya pergi berlibur ke luar kota bersama keluarga adalah....",
    options: [
      "Menggunakan mobil pribadi",
      "Menyewa mobil untuk perjalanan",
      "Menggunakan transportasi umum",
      "Tidak ada jawaban yang tepat",
    ],
    correctIndex: 2,
    explanation: "Transportasi umum mengurangi emisi per orang.",
  },
  {
    id: "q11",
    text: "Manakah langkah kecil yang bisa dilakukan individu untuk mengurangi dampak perubahan iklim?",
    options: [
      "Meningkatkan konsumsi makanan impor",
      "Menggunakan lebih banyak kendaraan pribadi",
      "Membeli barang tanpa memperhatikan keberlanjutan produksinya",
      "Mengurangi penggunaan plastik sekali pakai",
    ],
    correctIndex: 3,
    explanation: "Mengurangi plastik sekali pakai membantu menekan polusi dan emisi.",
  },
  {
    id: "q12",
    text: "Pemanasan global menyebabkan mencairnya es di kutub. Mitigasi yang tepat untuk melindungi penduduk pesisir adalah....",
    options: [
      "Mengembangkan teknologi pemecah es di kutub",
      "Menanam pohon bakau sebagai penahan abrasi",
      "Membiarkan dampak ini terjadi sebagai proses alami",
      "Menghentikan semua kegiatan transportasi laut",
    ],
    correctIndex: 1,
    explanation: "Mangrove melindungi pesisir dari abrasi dan kenaikan air laut.",
  },
  {
    id: "q13",
    text: "Saya percaya bahwa setiap tindakan kecil untuk menjaga lingkungan dapat membantu mengurangi dampak perubahan iklim.",
    options: [
      "Ya, saya yakin",
      "Tidak, hanya pemerintah yang bisa melakukannya",
      "Saya ragu-ragu",
      "Tidak ada jawaban yang tepat",
    ],
    correctIndex: 0,
    explanation: "Perubahan kecil dari individu dapat berdampak besar jika dilakukan bersama.",
  },
]

