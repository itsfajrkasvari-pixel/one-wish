# ONE WISH

> ONE CARD. ONE CHOICE. ONE CONSEQUENCE.

Party card game PWA. React + Vite + TypeScript + Tailwind + Framer Motion.
Tidak ada backend, tidak ada database, tidak ada API. Semua kartu, logic,
dan asset ada di dalam bundle sehingga game bisa dimainkan 100% offline
setelah pertama kali dimuat.

---

## 1. Struktur Project

```
one-wish/
├── index.html
├── package.json
├── vite.config.ts          # konfigurasi Vite + vite-plugin-pwa
├── tailwind.config.ts      # design tokens (warna, font, animasi)
├── postcss.config.js
├── tsconfig.json
├── scripts/
│   └── generate-icons.mjs  # regenerasi icon PNG dari favicon.svg (opsional)
├── public/
│   ├── favicon.svg
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       ├── icon-maskable-192.png
│       └── icon-maskable-512.png
└── src/
    ├── main.tsx             # entry point + registrasi service worker
    ├── App.tsx              # routing antar screen + persistensi
    ├── index.css            # Tailwind layers + safe-area handling
    ├── vite-env.d.ts
    ├── types/
    │   └── game.ts           # semua TypeScript types
    ├── data/
    │   ├── cards.ts          # 71 kartu (6 kategori)
    │   └── wishes.ts         # 8 Wish Card
    ├── game/
    │   ├── deck.ts            # shuffle & reshuffle
    │   ├── effects.ts         # helper efek & giliran
    │   └── gameEngine.ts      # engine murni (tidak bergantung React)
    ├── hooks/
    │   ├── useLocalStorage.ts
    │   ├── useOnlineStatus.ts
    │   └── useInstallPrompt.ts
    ├── components/
    │   ├── Button.tsx
    │   ├── Modal.tsx
    │   ├── Card.tsx           # kartu dengan flip animation
    │   ├── GameHeader.tsx
    │   ├── PlayerSelector.tsx
    │   ├── TargetModal.tsx
    │   ├── WishToken.tsx
    │   ├── OfflineIndicator.tsx
    │   └── InstallButton.tsx
    └── pages/
        ├── Home.tsx
        ├── Setup.tsx          # pilih pemain → pilih mode
        ├── Game.tsx           # gameplay utama
        ├── HowToPlay.tsx
        └── SettingsPage.tsx
```

---

## 2. Menjalankan (development)

Project ini dibuat di lingkungan sandbox tanpa akses internet, jadi
`npm install` **belum** dijalankan / diverifikasi di sini. Jalankan di
komputer kamu sendiri:

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173`) di
browser desktop, atau buka lewat IP lokal di HP yang tersambung ke Wi-Fi
yang sama untuk tes langsung di smartphone.

---

## 3. Build Production

```bash
npm run build
```

Perintah ini menjalankan `tsc -b` (type-check) lalu `vite build`. Jika ada
error TypeScript, build akan berhenti — perbaiki dulu sebelum lanjut.
Hasil build ada di folder `dist/`, berisi HTML/CSS/JS yang sudah
di-minify, `manifest.webmanifest`, service worker, dan semua icon.

Cek hasilnya secara lokal sebelum deploy:

```bash
npm run preview
```

> **Catatan jujur:** karena sandbox ini tidak punya akses ke npm registry,
> saya tidak bisa menjalankan `npm install` / `npm run build` di sini untuk
> membuktikan hasilnya 100% bebas error. Kode sudah saya tulis dan
> saya periksa manual dengan hati-hati (types, import, path alias `@/`
> sudah didaftarkan baik di `tsconfig.json` maupun `vite.config.ts`), tapi
> tolong jalankan `npm run build` di sisi kamu sebagai langkah verifikasi
> terakhir. Kalau ada error, kirim pesan errornya ke saya dan saya bantu
> perbaiki.

---

## 4. Hosting sebagai Static Website

Isi folder `dist/` adalah situs statis murni — tidak butuh Node.js atau
server saat runtime. Upload folder `dist/` ke layanan static hosting
apa pun, misalnya:

- **Netlify / Vercel**: drag-and-drop folder `dist/`, atau hubungkan repo
  dan set build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: push isi `dist/` ke branch `gh-pages`.
- **Cloudflare Pages**: build command `npm run build`, output `dist`.
- Server statis apa pun (Nginx, Apache, S3 + CloudFront, dsb).

Karena `base: './'` sudah diset di `vite.config.ts`, hasil build memakai
path relatif, jadi aman di-host di root domain maupun di sub-folder
(misalnya `namadomain.com/one-wish/`).

**Wajib HTTPS** (atau `localhost`) — service worker & "Add to Home
Screen" tidak akan aktif di HTTP biasa.

---

## 5. Membuka dari iPhone

1. Deploy `dist/` ke hosting HTTPS.
2. Buka link-nya di **Safari** (bukan Chrome — di iOS, install PWA cuma
   bisa lewat Safari).
3. Mainkan dulu satu kali sambil online supaya semua asset ke-cache.
4. Tap ikon **Share** (kotak dengan panah ke atas) di toolbar Safari.
5. Scroll, tap **"Add to Home Screen"**, lalu tap **"Add"**.
6. Buka ONE WISH dari Home Screen — sekarang bisa dimainkan tanpa
   internet (coba aktifkan Airplane Mode untuk memastikan).

Tombol **"Install ONE WISH"** di halaman Settings otomatis mendeteksi:
di Android/Chrome dia memicu prompt instalasi asli lewat
`beforeinstallprompt`; di iOS Safari (yang tidak mendukung event itu)
dia menampilkan instruksi manual di atas.

---

## 6. Menambahkan Kartu Baru

Edit `src/data/cards.ts` (kartu biasa) atau `src/data/wishes.ts` (Wish
Card). Tambahkan satu object baru ke array, misalnya:

```ts
{
  id: 'd13',                       // harus unik
  category: 'DARE',                // DARE | TRUTH | SOCIAL | CHAOS | OBSESSION | CURSE
  modes: ['CHILL', 'PERSONAL'],    // salah satu mode ini harus aktif agar kartu muncul
  title: 'Judul Kartu',
  description: 'Isi tantangan atau pertanyaannya.',
  requiresTarget: true,            // opsional — tampilkan modal pilih pemain
  allowSelfTarget: false,          // opsional — boleh pilih diri sendiri?
  effect: 'grantToken',            // opsional — lihat src/types/game.ts (EffectType)
}
```

Gunakan `{target}` di dalam `description` untuk menyisipkan nama pemain
yang dipilih (hanya berlaku jika `requiresTarget: true`). Tidak perlu
mengubah kode UI atau engine sama sekali — semuanya otomatis terbaca.

---

## 7. Mengubah Tema Visual

Semua warna, font, dan efek glow ada di **satu tempat**:
`tailwind.config.ts` → `theme.extend.colors` dan `theme.extend.fontFamily`.

- Ganti hex value di `colors.void`, `colors.wish`, `colors.ember`,
  `colors.mist`, `colors.curse` untuk mengubah palet warna.
- Ganti `fontFamily.display` / `fontFamily.body` untuk mengganti font
  (tetap gunakan font sistem/lokal — jangan menambahkan Google Fonts,
  supaya game tetap 100% offline dan ringan).
- Ganti warna `theme_color` / `background_color` di `vite.config.ts`
  (bagian `VitePWA({ manifest: {...} })`) supaya status bar & splash
  screen ikut berubah.
- Untuk mengubah icon aplikasi: edit `public/favicon.svg`, lalu jalankan
  `npm run generate:icons` untuk membuat ulang semua file PNG icon.

---

## Checklist Verifikasi Manual (per FINAL TEST di brief)

Berikut yang **sudah** saya lakukan di sandbox ini (tanpa akses internet,
jadi tanpa `npm install`):

- [x] Struktur file lengkap sesuai `src/` di atas
- [x] Semua import memakai alias `@/` yang konsisten dan sudah didaftarkan
      di `tsconfig.json` **dan** `vite.config.ts` (`resolve.alias`)
- [x] 71 kartu (DARE 12, TRUTH 12, SOCIAL 11, CHAOS 12, OBSESSION 12,
      CURSE 12) + 8 Wish Card, semua dengan `id` unik
- [x] Manifest PWA (nama, icons, theme_color, display: standalone,
      orientation: portrait) dikonfigurasi lewat `vite-plugin-pwa`
- [x] Service worker precache semua HTML/CSS/JS/asset (`globPatterns`)
      supaya main offline setelah load pertama
- [x] Icon PNG (192/512, termasuk versi maskable) sudah digenerate nyata,
      bukan placeholder
- [x] Layout mobile-first dengan `safe-area-inset-*`, minimum touch
      target 44×44px, tanpa horizontal scroll

Yang **belum** bisa saya pastikan dari sini (perlu kamu jalankan sendiri):

- [ ] `npm install` berhasil tanpa error versi
- [ ] `npm run build` (termasuk `tsc -b`) benar-benar lolos tanpa error
- [ ] Tampilan aktual di 320px–430px (saya desain mobile-first, tapi
      belum bisa screenshot langsung dari sandbox ini)
- [ ] Perilaku offline nyata di perangkat/browser asli

Kalau `npm run build` gagal di sisi kamu, kirim pesan error lengkapnya
dan saya bantu perbaiki cepat.

---

## 8. Audit & Perbaikan (sesi ini)

Sesi ini adalah audit menyeluruh atas project yang sudah ada (bukan
rewrite). Sandbox ini **masih tidak punya akses internet** (`npm install`
gagal 403 dari registry), jadi `npm run build` / `npm run lint` / `npm run
dev` tetap belum bisa dijalankan langsung di sini — audit dilakukan lewat
pembacaan manual yang ketat terhadap seluruh `src/`, dengan penalaran
tipe TypeScript baris-per-baris. Lihat laporan lengkap yang saya kirim di
chat untuk detail PASS/FAIL per area dan daftar file yang diubah beserta
alasannya.
