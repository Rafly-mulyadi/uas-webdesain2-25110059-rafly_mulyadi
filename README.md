# Website Company Profile — Bakso Laras Pekanbaru

**Nama :** Rafly Mulyadi
**NIM :** 25110059
**Matkul :** Web Desain 2 (MKK 123)
**UMKM :** Bakso Laras Pekanbaru (Bakso Sapi & Mie Ayam Premium)
**Lokasi :** Jl. Suka Karya, Kelurahan Sialang Munggu, Kec. Tampan, Kota Pekanbaru, Riau 28293

**Deskripsi:**
Website ini merupakan Company Profile untuk UMKM kuliner **Bakso Laras Pekanbaru**, sebuah warung bakso dan mie ayam dengan resep warisan keluarga, kaldu sapi cokelat kaya rasa, dan racikan sayur hijau segar alami. Website dibuat sebagai tugas UAS mata kuliah Web Desain 2, bertujuan mempromosikan katalog menu, keunggulan produk (100% halal, daging sapi asli, tanpa pengawet), serta mempermudah proses pemesanan pelanggan secara online melalui fitur keranjang belanja dan sistem checkout terintegrasi WhatsApp.

## 🥟 Halaman
- **Home** — Hero section dengan tagline, badge status buka/tutup warung real-time, dan keunggulan warung.
- **Menu** — Carousel menu terlaris, katalog menu Bakso & Mie Ayam serta Minuman Segar lengkap dengan foto, deskripsi, harga, tombol Detail, dan tombol Tambah ke Keranjang per item.
- **Tentang** — Brand identity/filosofi usaha (daging sapi asli, kaldu cokelat kaya rempah, sayuran segar) serta jam operasional.
- **Kontak & Katering** — Info kontak (WhatsApp, email, Instagram), form pemesanan/saran, kalkulator simulasi biaya katering, dan embed Google Maps lokasi warung.

## 🛒 Fitur Keranjang & Sistem Pemesanan
- **Tambah ke Keranjang** — Setiap item menu memiliki tombol "Tambah" yang langsung memasukkan produk ke keranjang, disertai notifikasi toast konfirmasi.
- **Keranjang Interaktif** — Modal keranjang menampilkan daftar produk, gambar, harga satuan, kontrol jumlah (+/-), subtotal per item, hingga penghapusan item.
- **Hitung Otomatis** — Subtotal dan total pembayaran dihitung dan diperbarui secara otomatis (format Rupiah) setiap kali jumlah/isi keranjang berubah.
- **Persistensi Data** — Isi keranjang disimpan di `localStorage`, sehingga tidak hilang meskipun halaman di-refresh.
- **Form Data Pemesan** — Nama, nomor WhatsApp, dan metode pemesanan (Ambil Sendiri / Diantar) dengan validasi wajib isi sebelum checkout, termasuk validasi alamat jika memilih Delivery.
- **Checkout ke WhatsApp** — Rincian pesanan (nama produk, jumlah, subtotal, total) beserta data pemesan otomatis disusun dan dikirim ke WhatsApp admin, lalu keranjang dikosongkan setelah pesanan terkirim.
- **Badge Keranjang** — Ikon keranjang di navbar menampilkan jumlah total item secara real-time.

## ⚙️ Fitur JavaScript Lainnya
- Bootstrap Carousel untuk slider menu terlaris.
- Modal "Detail Menu" untuk menampilkan deskripsi lengkap produk.
- Deteksi status buka/tutup warung secara real-time berdasarkan jam operasional.
- Kalkulator simulasi biaya katering otomatis.
- Validasi form kontak dan form pemesanan sebelum submit, terintegrasi langsung ke WhatsApp.
- Single Page Application (SPA) navigation dengan transisi halus antar halaman.

## 🛠️ Teknologi
- HTML5
- CSS3 + Bootstrap 4
- JavaScript (jQuery)

## 🔗 Live Demo
_(Tambahkan link GitHub Pages di sini setelah repository di-deploy, contoh: `https://<username>.github.io/<nama-repo>/`)_
