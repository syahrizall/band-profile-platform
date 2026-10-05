# Arunika — Digital Band Profile Static PoC

Website statis untuk profil band **Arunika** (alternative rock, Bandung). Ini adalah proof of concept public website: tanpa backend, database, npm, atau build.

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

## Konten demo

Nama, bio, rilisan, dan jadwal adalah data fiksi untuk presentasi. Email memakai domain `example`, jadi tidak mengarah ke kotak masuk sungguhan.

Foto berasal dari Unsplash. Video konser berasal dari Pexels dan dipakai sebagai placeholder. Di GitHub Pages atau server lokal, pemutar memakai `assets/video/session.mp4`. Jika situs dibuka langsung lewat `file://` dari folder yang namanya mengandung spasi, Chrome tidak memutar file itu, jadi tombol Watch memuat klip yang sama dari `assets/js/clip.js`.
