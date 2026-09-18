# Website Profil — Farhan Yusri

**Live:** https://hannyusri.github.io

Website profil satu halaman untuk promosi ke klien sekaligus lampiran CV saat melamar kerja.
Dibuat dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa proses build, tanpa install apa pun.

> **Status saat ini:** data asli sudah dimasukkan. Sebelum dipublikasikan, lengkapi dulu bagian yang ditandai `// ISI` dan pastikan yang ditandai `// CEK` di dalam `js/data.js`.

---

## Cara membuka

Klik dua kali `index.html`. Selesai.

Kalau pakai VS Code, lebih nyaman menggunakan ekstensi **Live Server** (klik kanan `index.html` → *Open with Live Server*) supaya halaman otomatis refresh setiap kali menyimpan perubahan.

---

## Cara mengganti isi

**Cukup edit satu file: `js/data.js`.**

Seluruh teks, angka, link, dan daftar di website diambil dari file itu. Buka dengan editor teks apa pun, ganti tulisan di dalam tanda kutip, lalu simpan dan refresh browser.

Aturan singkat saat mengedit:

- Ganti teks di dalam `" "` saja. Jangan menghapus tanda kutip, koma, kurung siku `[ ]`, atau kurung kurawal `{ }`.
- Untuk menambah item (misal proyek baru), salin satu blok `{ ... }` yang sudah ada lalu ubah isinya. Pastikan antar blok dipisah koma.
- Untuk menghilangkan satu bagian sepenuhnya, kosongkan daftarnya jadi `[]`. Contoh: `testimoni: []` akan menghapus section Testimoni beserta menunya secara otomatis.
- Kalau halaman jadi kosong setelah diedit, biasanya ada koma atau kurung yang kurang. Buka Developer Tools di browser (`F12`) → tab **Console** untuk melihat pesan errornya.

### Yang perlu diisi

| Bagian di `data.js` | Isinya |
|---|---|
| `profil` | Nama, inisial, lokasi, daftar profesi, tagline, foto, statistik |
| `tentang` | Paragraf bio dan fakta singkat |
| `keahlian` | Skill dikelompokkan per kategori |
| `layanan` | Jasa yang ditawarkan ke klien (+ harga, opsional) |
| `karya` | Portfolio proyek |
| `pengalaman` | Riwayat kerja |
| `pendidikan` | Riwayat pendidikan |
| `sertifikasi` | Sertifikat dan pelatihan |
| `testimoni` | Kutipan dari klien |
| `kontak` | Email, WhatsApp, sosial media, file CV |
| `formEndpoint` | Pengaturan form kontak (lihat di bawah) |

---

## Menaruh file pendukung

- **Foto profil** → sudah terpasang di `assets/img/foto-profil.jpg`. Untuk menggantinya, timpa file tersebut. Ukuran ideal potret 800×1000 px.
- **Gambar portfolio** → simpan di `assets/img/`, isi `gambar` pada tiap proyek di `data.js`. Ideal 1200×750 px. **Belum ada satu pun** — ini yang paling berpengaruh untuk meyakinkan calon klien.
- **CV PDF** → simpan di `assets/docs/`, lalu isi `kontak.cv` dengan `"assets/docs/nama-file.pdf"`.
  Saat ini `kontak.cv` kosong sehingga tombol Download CV tidak ditampilkan.
- **Favicon** → `assets/img/favicon.svg`.

---

## Logo

Konsepnya dua jalur yang bertemu menjadi satu — terbaca sebagai huruf **Y** (Yusri), sebagai **simpul jaringan** yang senada dengan efek partikel di hero, sekaligus mewakili motto *"membersamai dengan solusi"*: dua pihak berjalan bersama menuju satu titik.

| File | Kegunaan |
|---|---|
| `assets/img/logo.svg` | Logo lepas dengan warna tetap. Pakai untuk kop surat, profil media sosial, watermark video, atau lampiran CV. |
| `assets/img/favicon.svg` | Versi dalam kotak biru dengan garis lebih tebal, supaya tetap terbaca pada ukuran 16 piksel di tab browser. |
| Di dalam `index.html` | Versi navbar dan footer ditulis langsung sebagai SVG (bukan `<img>`), supaya warnanya ikut berubah saat tema terang/gelap diganti. |

Warna logo mengikuti variabel `--accent` dan `--accent-2` di `css/styles.css`, jadi ikut berubah otomatis kalau warna website diganti.

**Menghilangkan logo dari navbar:** hapus blok `<span class="nav__logo">` di dalam `<a class="nav__brand">` pada `index.html`. Nama "Farhan Yusri" tetap tampil.

**Butuh format PNG** (untuk WhatsApp, kartu nama, atau cetak): buka `logo.svg` di browser, atau unggah ke situs konversi SVG ke PNG. Karena berbasis vektor, ukurannya bisa diperbesar sampai berapa pun tanpa pecah.

---

## Form kontak

Ada dua mode, diatur lewat `formEndpoint` di baris paling bawah `js/data.js`:

1. **Dikosongkan (`""`)** — mode default. Saat pengunjung menekan Kirim, aplikasi email mereka terbuka dengan isi pesan yang sudah terisi otomatis. Langsung jalan, tanpa daftar apa pun.
2. **Diisi URL Formspree** — pesan terkirim langsung ke email tanpa membuka aplikasi lain.
   Caranya: daftar gratis di [formspree.io](https://formspree.io) → buat form baru → salin URL endpoint-nya (bentuknya `https://formspree.io/f/xxxxxxx`) → tempel sebagai nilai `formEndpoint`.

---

## Mengganti warna & font

Buka `css/styles.css`, cari blok `:root` di bagian paling atas.

**Warna** — ubah satu baris ini untuk mengganti nuansa seluruh website:

```css
--accent: #C2410C;   /* warna aksen mode terang */
```

Warna untuk mode gelap ada di blok `[data-theme="dark"]` tepat di bawahnya.

**Font** — website ini memakai font bawaan sistem (Segoe UI di Windows, San Francisco di Mac), tanpa mengunduh apa pun dari internet. Kalau suatu saat mau ganti, cukup ubah baris ini:

```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

---

## Publikasi ke internet (gratis)

Pilih salah satu:

- **Netlify Drop** — cara tercepat. Buka [app.netlify.com/drop](https://app.netlify.com/drop), seret folder ini ke halaman tersebut. Langsung dapat link.
- **GitHub Pages** — upload folder ini ke repository GitHub, lalu aktifkan Pages di Settings → Pages → source `main` / root.
- **Vercel** — import repository GitHub, tanpa konfigurasi tambahan.

Setelah punya domain sendiri, jangan lupa perbarui bagian SEO di `index.html`: `<title>`, `description`, dan tag `og:image` supaya tampilan link saat dibagikan ke WhatsApp/LinkedIn ikut rapi.

---

## Fitur

- One-page dengan navigasi scroll-spy dan scroll halus
- Mode terang/gelap, mengikuti setelan sistem dan tersimpan di browser
- Animasi reveal bertahap saat scroll
- Rotasi profesi otomatis di hero
- Filter portfolio berdasarkan kategori
- Form kontak dengan validasi
- Tombol salin email sekali klik
- Progress bar baca dan tombol kembali ke atas
- Responsif penuh sampai layar 320px
- Section otomatis tersembunyi bila datanya kosong
- Mendukung `prefers-reduced-motion` dan navigasi keyboard
- Punya gaya khusus saat di-print / disimpan sebagai PDF
