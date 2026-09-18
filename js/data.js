/* ============================================================================
   DATA WEBSITE — SATU-SATUNYA FILE YANG PERLU DIEDIT
   ----------------------------------------------------------------------------
   Semua teks, link, dan angka di website diambil dari file ini.
   Cara edit: ganti teks di dalam tanda kutip. Jangan hapus tanda kutip,
   koma, atau kurung kurawal.

   Tanda  // CEK  = saya isi berdasarkan asumsi, tolong dipastikan.
   Tanda  // ISI  = datanya belum ada, tolong dilengkapi.

   Bagian yang datanya kosong (array kosong []) otomatis hilang dari website
   beserta menu navigasinya.
   ============================================================================ */

const DATA = {

  /* ==========================================================================
     1. IDENTITAS
     ========================================================================== */
  profil: {
    nama:        "Farhan Yusri",
    // Dipakai sebagai cadangan kalau foto profil kosong, dan untuk inisial
    // di kartu testimoni. Tidak lagi ditampilkan di navbar.
    inisial:     "FY",
    lokasi:      "Medan, Sumatera Utara",

    // Profesi yang berganti-ganti otomatis di hero.
    peran: [
      "Fullstack Android & Web Developer",
      "AI Animation Creator",
      "Web3 Contributor"
    ],

    // Motto — tampil sebagai baris tebal di bawah nama.
    moto:        "Membersamai dengan Solusi.",

    // Kalimat pendukung di bawah motto.
    tagline:     "Membangun aplikasi Android, website, dan video animasi AI untuk bisnis dan brand — dikerjakan cepat dengan bantuan AI, tanpa melepas kendali atas kualitas.",

    foto:        "assets/img/foto-profil.jpg",

    // CEK — angka ini saya ambil dari rentang pengalaman yang kamu sebutkan.
    // Kalau sudah tahu jumlah proyek/klien yang selesai, angka itu jauh lebih
    // meyakinkan. Contoh: { angka: "15+", label: "Proyek selesai" }
    statistik: [
      { angka: "2 Thn", label: "Kontribusi project Web3" },
      { angka: "1 Thn", label: "Aplikasi Android & Website" },
      { angka: "6 Bln", label: "Produksi video animasi AI" }
    ]
  },

  /* ==========================================================================
     2. TENTANG
     ========================================================================== */
  tentang: {
    paragraf: [
      "Saya Farhan Yusri, developer asal Medan yang berfokus pada pembuatan aplikasi Android dan website. Di samping itu saya aktif berkontribusi di berbagai project Web3 dan memproduksi video animasi berbasis AI.",
      "Dalam bekerja saya memanfaatkan AI sebagai alat bantu — mulai dari riset, penulisan kode, sampai produksi visual. Pendekatan ini membuat proses pengerjaan jauh lebih cepat, sementara keputusan teknis dan kendali atas kualitas hasil akhir tetap ada di tangan saya.",
      "Prinsip saya sederhana: membersamai dengan solusi. Pekerjaan saya tidak berhenti saat file diserahkan, tapi ikut memastikan apa yang dibangun benar-benar menjawab kebutuhan Anda."
    ],

    fakta: [
      { label: "Status",      nilai: "Tersedia untuk proyek baru" },
      { label: "Fokus",       nilai: "Android, Web, Video Animasi AI" },
      { label: "Metode",      nilai: "AI-assisted development" },
      { label: "Bahasa",      nilai: "Indonesia, Inggris" },
      { label: "Cara kerja",  nilai: "Remote & on-site (Medan)" }
    ]
  },

  /* ==========================================================================
     3. KEAHLIAN
     ----------------------------------------------------------------------------
     ISI — ini bagian yang paling perlu kamu lengkapi sebelum dipakai melamar
     kerja. Rekruter teknis mencari nama teknologi yang konkret. Tambahkan yang
     benar-benar kamu kuasai, misalnya: Kotlin, Java, Jetpack Compose, Firebase,
     React, Laravel, Supabase, Solidity, Midjourney, Runway, CapCut, dsb.
     Hapus juga yang menurutmu belum layak ditampilkan.

     ikon: pilih salah satu — "android", "web", "video", "web3", "flow",
           "code", "design", "database", "cloud", "chat".
     ========================================================================== */
  keahlian: [
    {
      grup: "Pengembangan Android",
      ikon: "android",
      items: ["Aplikasi Android", "Desain Antarmuka Mobile", "Integrasi API", "Rilis & Distribusi Aplikasi"]
    },
    {
      grup: "Pengembangan Web",
      ikon: "web",
      items: ["Website Company Profile", "Aplikasi Web", "Responsive Design", "Integrasi Database"]
    },
    {
      grup: "Video Animasi AI",
      ikon: "video",
      items: ["Naskah & Storyboard", "Generative Video AI", "Voice Over AI", "Editing & Rendering"]
    },
    {
      grup: "Web3",
      ikon: "web3",
      items: ["Kontribusi Project Web3", "Testing & Feedback", "Riset Ekosistem", "Manajemen Komunitas"]
    },
    {
      grup: "Alur Kerja",
      ikon: "flow",
      items: ["AI-Assisted Development", "Prompt Engineering", "Dokumentasi Proyek", "Komunikasi Klien"]
    }
  ],

  /* ==========================================================================
     3b. STRIP BERJALAN
     Deretan kata yang bergulir terus di bawah section Keahlian.
     Isi dengan kata kunci teknis yang ingin langsung terbaca pengunjung.
     Kosongkan dengan [] untuk menghilangkan stripnya.
     ========================================================================== */
  marquee: [
    "Android", "Website", "Web App", "Video Animasi AI", "Web3",
    "UI/UX", "AI-Assisted Development", "Prompt Engineering",
    "Responsive Design", "Storyboard", "Voice Over AI", "Integrasi API"
  ],

  /* ==========================================================================
     4. LAYANAN
     harga: dikosongkan karena belum ada datanya. Isi kalau mau ditampilkan,
     misalnya "Mulai Rp 3.000.000". Menampilkan harga menyaring calon klien
     yang tidak sesuai budget sejak awal, tapi juga bisa membatasi penawaran.
     ========================================================================== */
  layanan: [
    {
      nomor: "01",
      judul: "Pembuatan Aplikasi Android",
      ikon: "android",
      deskripsi: "Aplikasi Android sesuai kebutuhan bisnis Anda, dari perancangan alur sampai siap dipasang di perangkat pengguna.",
      poin: ["Perancangan alur & antarmuka", "Pengembangan fitur sesuai kebutuhan", "Pengujian & pendampingan rilis"],
      harga: ""                                    // ISI — opsional
    },
    {
      nomor: "02",
      judul: "Pembuatan Website",
      ikon: "web",
      deskripsi: "Website company profile maupun aplikasi web yang rapi, cepat diakses, dan nyaman dibuka dari ponsel.",
      poin: ["Desain menyesuaikan identitas brand", "Responsif di semua ukuran layar", "Struktur siap ditemukan di Google"],
      harga: ""                                    // ISI — opsional
    },
    {
      nomor: "03",
      judul: "Video Animasi AI",
      ikon: "video",
      deskripsi: "Video animasi untuk promosi, edukasi, maupun konten media sosial — diproduksi dengan teknologi AI sehingga cepat selesai dengan biaya yang lebih terjangkau.",
      poin: ["Penyusunan naskah & storyboard", "Animasi dan voice over berbasis AI", "Revisi hingga pesan tersampaikan"],
      harga: ""                                    // ISI — opsional
    }
  ],

  /* ==========================================================================
     5. KARYA / PORTFOLIO
     ----------------------------------------------------------------------------
     CEK — nama klien dan tahun perlu kamu pastikan.

     PENTING soal "gambar":
     Sementara ini diisi ILUSTRASI BUATAN, bukan tangkapan layar karya aslimu.
     Fungsinya hanya supaya kartu tidak kosong. Begitu punya screenshot asli
     aplikasi atau cuplikan videonya, simpan di assets/img/ lalu ganti path-nya.
     Karya asli jauh lebih meyakinkan daripada ilustrasi generik.

     Ilustrasi yang tersedia di assets/img/:
       cover-web.svg       — web app / website
       cover-video-ai.svg  — video animasi AI
       cover-web3.svg      — Web3
       cover-android.svg   — aplikasi Android (belum terpakai, siap kalau ada
                             proyek Android yang mau ditampilkan)

     Untuk video, isi juga "link" dengan URL YouTube/Drive-nya.
     ========================================================================== */
  karya: [
    {
      judul: "Pratama English Course",
      kategori: "Web App",
      klien: "Pratama English Course",
      tahun: "2025",                               // CEK
      peran: "Fullstack Developer",
      deskripsi: "Web app untuk lembaga kursus bahasa Inggris, memudahkan peserta mengakses materi dan informasi kelas dari ponsel maupun komputer.",
      hasil: "",                                   // ISI — hasil konkretnya apa? (mis. jumlah peserta terdaftar)
      tags: ["Web App", "Pendidikan", "Fullstack"],
      gambar: "assets/img/cover-web.svg",          // GANTI dengan screenshot asli situsnya
      link: "https://pratamaenglishcourse.online"
    },
    {
      judul: "Produksi Video Animasi AI",
      kategori: "Video Animasi AI",
      klien: "",                                   // dikosongkan, tidak ditampilkan
      tahun: "2026 — Sekarang",                    // CEK
      peran: "AI Animation Creator",
      deskripsi: "Kumpulan video animasi yang diproduksi sepenuhnya dengan bantuan AI, mulai dari penyusunan naskah dan storyboard, animasi, voice over, sampai rendering akhir.",
      hasil: "",                                   // ISI — mis. jumlah video, total penonton
      tags: ["Animasi AI", "Storyboard", "Voice Over AI"],
      gambar: "assets/img/cover-video-ai.svg",     // GANTI dengan cuplikan video aslinya
      link: "https://www.tiktok.com/@aselemene_in"
    },
    {
      judul: "Kontribusi Ekosistem Web3",
      kategori: "Web3",
      klien: "Berbagai project Web3",              // CEK — boleh disebut nama projectnya?
      tahun: "2024 — Sekarang",                    // CEK
      peran: "Contributor",
      deskripsi: "Terlibat aktif dalam pengujian, pemberian masukan, dan kegiatan komunitas pada sejumlah project Web3.",
      hasil: "",                                   // ISI
      tags: ["Web3", "Komunitas", "Testing"],
      gambar: "assets/img/cover-web3.svg",
      link: "https://x.com/0xHannyusri"
    }
  ],

  /* ==========================================================================
     6. PENGALAMAN KERJA
     CEK — periode saya susun dari lama pengalaman yang kamu sebutkan
           (2 tahun Web3, 1 tahun Android & Web, 6 bulan video AI),
           dihitung mundur dari September 2026.
     ========================================================================== */
  pengalaman: [
    {
      posisi: "Fullstack Android & Web Developer",
      instansi: "Freelance / Proyek Mandiri",      // CEK — ada nama perusahaan/brand sendiri?
      periode: "2025 — Sekarang",
      lokasi: "Medan",
      poin: [
        "Membangun aplikasi Android dan website dari perancangan hingga rilis, termasuk aplikasi Pratama English Course.",
        "Memanfaatkan AI sebagai alat bantu pengembangan sehingga waktu pengerjaan proyek jauh lebih singkat.",
        "Menangani komunikasi klien secara langsung, mulai dari penggalian kebutuhan sampai serah terima hasil."
      ]
    },
    {
      posisi: "AI Animation Creator",
      instansi: "Freelance / Proyek Mandiri",
      periode: "2026 — Sekarang",
      lokasi: "Medan",
      poin: [
        "Memproduksi video animasi berbasis AI untuk kebutuhan promosi, edukasi, dan konten media sosial.",
        "Mengerjakan keseluruhan proses produksi: naskah, storyboard, animasi, voice over, hingga rendering akhir.",
        "Menerjemahkan materi yang rumit menjadi tayangan singkat yang mudah dipahami penonton awam."
      ]
    },
    {
      posisi: "Kontributor Project Web3",
      instansi: "Berbagai Project Web3",
      periode: "2024 — Sekarang",
      lokasi: "Remote",
      poin: [
        "Berkontribusi selama 2 tahun pada sejumlah project Web3 melalui pengujian dan pemberian masukan.",
        "Aktif dalam kegiatan komunitas dan mengikuti perkembangan ekosistem secara berkelanjutan."
      ]
    }
  ],

  /* ==========================================================================
     7. PENDIDIKAN
     ========================================================================== */
  pendidikan: [
    {
      posisi: "S1 Teknik Informatika",
      instansi: "Universitas Malikussaleh",
      periode: "2022 — 2026",
      lokasi: "Lhokseumawe, Aceh",
      poin: []                                     // ISI — opsional: IPK, judul skripsi, prestasi
    }
  ],

  /* ==========================================================================
     8. SERTIFIKASI
     Dikosongkan karena belum ada datanya — section-nya otomatis tersembunyi.
     Kalau punya sertifikat (Dicoding, Coursera, Google, bootcamp, seminar),
     hapus tanda // pada baris contoh di bawah lalu isi datanya.
     ========================================================================== */
  sertifikasi: [
    // { nama: "Nama Sertifikat", penerbit: "Penerbit", tahun: "2025", link: "" }
  ],

  /* ==========================================================================
     9. TESTIMONI
     Dikosongkan karena belum ada datanya — section-nya otomatis tersembunyi.
     SARAN: minta 2–3 kalimat dari klien Pratama English Course atau dari klien
     video animasimu. Ini elemen paling meyakinkan untuk calon klien.
     ========================================================================== */
  testimoni: [
    // { kutipan: "...", nama: "Nama", jabatan: "Jabatan, Instansi" }
  ],

  /* ==========================================================================
     10. KONTAK & MEDIA SOSIAL
     ========================================================================== */
  kontak: {
    ajakan:   "Punya kebutuhan aplikasi, website, atau video animasi? Ceritakan saja dulu — saya biasanya membalas dalam 1×24 jam.",
    email:    "farhanyusri2013@gmail.com",
    whatsapp: "6285156885373",
    lokasi:   "Medan, Sumatera Utara",

    // ISI — simpan CV PDF di assets/docs/ lalu tulis path-nya di sini.
    // Contoh: "assets/docs/CV-Farhan-Yusri.pdf"
    // Selama kosong, tombol Download CV tidak ditampilkan.
    cv:       "",

    // Pilihan ikon: whatsapp, tiktok, x, linkedin, github, instagram, mail, web, link
    sosial: [
      { nama: "WhatsApp",        url: "https://wa.me/6285156885373",            ikon: "whatsapp" },
      { nama: "TikTok Animasi",  url: "https://www.tiktok.com/@aselemene_in",   ikon: "tiktok" },
      { nama: "X (Web3)",        url: "https://x.com/0xHannyusri",              ikon: "x" }
      // ISI — buka komentar di bawah dan isi username kalau akunnya ada.
      // GitHub penting untuk melamar kerja sebagai developer.
      // , { nama: "GitHub",    url: "https://github.com/USERNAME",       ikon: "github" }
      // , { nama: "LinkedIn",  url: "https://linkedin.com/in/USERNAME",  ikon: "linkedin" }
      // , { nama: "Instagram", url: "https://instagram.com/USERNAME",    ikon: "instagram" }
    ]
  },

  /* ==========================================================================
     11. PENGATURAN FORM KONTAK
     ----------------------------------------------------------------------------
     Kosong ("")  -> form membuka aplikasi email dengan pesan sudah terisi.
                     Langsung jalan, tanpa daftar apa pun.
     Diisi        -> pesan terkirim langsung ke email tanpa membuka aplikasi lain.
                     Cara: daftar gratis di https://formspree.io, buat form baru,
                     lalu tempel URL endpoint-nya di bawah ini.
     ========================================================================== */
  formEndpoint: ""
};
