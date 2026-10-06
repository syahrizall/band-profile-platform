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

Yang terpasang dari sumber band: single *Can We Make It*, EP *A Concise Everlasting Love Story, And Everything Turns Blue*, formasi Faza Alif Muhammad, Rafly Sanjaya, Rayhan, Pancha, dan M Azmy F, film di YouTube `@whiteroompr`, serta Instagram, TikTok, Spotify, dan Apple Music. Panggung yang tertulis: Pestipalin 2025, Ardan Senja Syahdu Vol. 6, dan resital di Luwes Theater, IKJ.

Foto Azmy belum ada, jadi kartunya memakai namanya. Video di halaman Video diputar dari YouTube resmi.
