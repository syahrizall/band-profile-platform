# Whiteroompr — Digital Band Profile Static PoC

Website statis untuk profil band **Whiteroompr** (alternative pop, Bandung). Ini adalah proof of concept public website: tanpa backend, database, npm, atau build.

## Cara membuka

Buka `index.html` langsung di browser.

Untuk menyajikannya lewat server lokal:

```text
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## GitHub Pages

1. Push repository ini ke GitHub.
2. Di Settings → Pages, pilih branch dan folder `/` (root).
3. Website memakai path relatif, jadi navigasi dan aset tetap jalan di `github.io`.

File `.nojekyll` sudah ada supaya GitHub Pages tidak memproses situs ini dengan Jekyll.

## Halaman

- `index.html` — Home
- `about.html` — About
- `members.html` — Members
- `music.html` — Music
- `gallery.html` — Gallery, dengan lightbox
- `performance.html` — Performance
- `video.html` — Video, dengan pemutar modal
- `contact.html` — Contact

## Konten

Fakta yang dipakai berasal dari katalog publik, catatan rilis, dan pemberitaan pertunjukan: single *Can We Make It* (25 Maret 2022), EP *A Concise Everlasting Love Story, And Everything Turns Blue* (18 Agustus 2023), formasi Faza, Rafly, Rayhan, Pancha, dan Azmy, serta dua panggung Bandung di 2025 (Pestipalin dan Ardan Senja Syahdu Vol. 6).

Yang tidak ketemu dibiarkan sebagai dummy dan ditandai di halaman: email, WhatsApp, Instagram, TikTok, foto Azmy, dua kartu pertunjukan, dan klip video. Nama belakang Rafly, Rayhan, Pancha, dan Azmy tidak dipublikasikan. Sampul dan foto personel yang tampil adalah aset band. Foto konser lain dari Unsplash, dan video dari Pexels.

Di GitHub Pages atau server lokal, pemutar memakai `assets/video/session.mp4`. Jika situs dibuka langsung lewat `file://` dari folder yang namanya mengandung spasi, Chrome tidak memutar file itu, jadi tombol Watch memuat klip yang sama dari `assets/js/clip.js`.
