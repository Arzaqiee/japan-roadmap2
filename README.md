# Japan Roadmap

**Mulai dari 0, sampai siap ke Jepang.**

Platform belajar bahasa Jepang mobile-first (React + TypeScript + Tailwind + Vite), dibangun untuk dibungkus jadi APK Android lewat Capacitor. Desain black & white, anime, card-based, dengan bottom navigation seperti aplikasi Android native.

## Apa yang sudah jadi di scaffold ini

- Struktur project lengkap, mobile-first, siap Capacitor
- Bottom navigation: Home, Roadmap, Practice, Review, Profile
- Home: level, XP, streak, daily goal, continue learning, review preview, achievement
- Roadmap: skill-tree visual (Hiragana → ... → Japan Ready) dengan status Locked/Available/Completed dan halaman detail stage
- Practice: grid 12 mini-game (placeholder UI, siap diisi logic per game)
- Review: antrian review harian berbasis spaced repetition (SM-2 ringan) dari IndexedDB
- Profile: stats card + achievement badges
- Local-first storage (Dexie/IndexedDB) sebagai source of truth UI, dengan sync queue ke Firestore
- Firebase config scaffold (auth + Firestore), aktif otomatis begitu `.env.local` diisi — sebelum itu app tetap jalan penuh secara lokal/offline
- Capacitor config: app name, package ID, splash screen, status bar, Android back-button handling

## Yang masih perlu dibangun bertahap (di luar scope satu scaffold)

Ini proyek besar (Duolingo-scale). Sengaja belum diisi penuh di pass pertama ini, supaya arsitekturnya benar dulu:
- Konten aktual: 46+46 kana, semua kategori vocabulary, database kanji N5–N1, materi grammar, soal JLPT/JFT-Basic — saat ini hanya seed data roadmap stage, bukan isi lesson
- Logic tiap 12 mini-game di Practice (saat ini kartu UI saja)
- Firebase Auth flow (email/password, Google, verifikasi email) — konfigurasi sudah ada, layar login/register belum dibuat
- Notification/reminder terjadwal (perlu `@capacitor/local-notifications`, sudah masuk dependency)
- Admin panel (CRUD vocabulary/kanji/grammar/lesson/quiz/user/achievement/roadmap)
- Audio pronunciation & stroke order kanji

Struktur (`src/features/*`, `src/lib/firebase/schema.ts`) sudah disiapkan supaya semua ini tinggal diisi tanpa mengubah arsitektur.

## Struktur Project

```
src/
  app/App.tsx           # routes + bottom nav + native back-button wiring
  pages/                 # 1 file per screen (Home, Roadmap, Practice, Review, Profile, StageDetail)
  components/
    layout/               # Screen wrapper, BottomNav
    ui/primitives.tsx     # Card, ProgressBar, Button, SealBadge (reusable)
    roadmap/StageCard.tsx
  features/               # tempat logic per fitur (auth, practice games, dst) — siap diisi
  hooks/useProgressStore.ts  # Zustand store, single source of truth XP/level/streak
  lib/
    storage/db.ts          # Dexie/IndexedDB (offline-first)
    srs/schedule.ts         # spaced repetition scheduler
    firebase/config.ts      # Firebase init (no-op tanpa .env)
    firebase/schema.ts      # dokumentasi struktur Firestore
    nativeBootstrap.ts       # Capacitor: back button, status bar, splash
  data/roadmapStages.ts    # seed data urutan roadmap
  types/index.ts
```

## Setup & Development

```bash
npm install
cp .env.example .env.local   # isi kredensial Firebase (opsional untuk dev lokal)
npm run dev
```

## Build APK Android

1. **Install dependency**
   ```bash
   npm install
   ```
2. **Build React (production bundle)**
   ```bash
   npm run build
   ```
3. **Tambahkan platform Android** (sekali saja, di awal project)
   ```bash
   npx cap add android
   ```
4. **Sync Capacitor** (setiap kali ada perubahan di `dist/` atau plugin baru)
   ```bash
   npx cap sync android
   ```
5. **Buka Android Studio**
   ```bash
   npx cap open android
   ```
6. **Build APK** — di Android Studio: `Build → Build Bundle(s) / APK(s) → Build APK(s)`
7. **Build release APK/AAB** (untuk Play Store) — `Build → Generate Signed Bundle / APK`, pilih App Bundle (AAB) atau APK, lalu buat/gunakan signing key

Shortcut: `npm run android:build` menjalankan langkah 2, 4, dan 5 sekaligus.

### Build APK tanpa install Android Studio (lewat GitHub Actions)

Kalau kamu tidak mau install Android Studio di laptop, repo ini sudah punya workflow otomatis:

1. Push project ini ke repository GitHub
2. Buka tab **Actions** di repo → workflow **"Build Android APK"** akan otomatis jalan setiap push ke `main` (atau klik **Run workflow** manual)
3. Setelah selesai (~5–10 menit), buka run tersebut → di bagian **Artifacts** ada `japan-roadmap-debug-apk` → download, isinya `app-debug.apk` yang bisa langsung di-install di HP Android

File workflow-nya di `.github/workflows/build-apk.yml`. Ini menghasilkan **debug APK** (cukup untuk testing/install manual). Untuk release APK/AAB yang di-signing untuk Play Store, tetap perlu langkah 7 di atas (signing key tidak aman disimpan di CI publik tanpa secrets).

### App identity

- Android App Name: `Japan Roadmap`
- Package ID: `com.japanroadmap.app`
- Splash & status bar: hitam (`#0A0A0B`), dikonfigurasi di `capacitor.config.ts`
- Safe area: ditangani via CSS `env(safe-area-inset-*)` di `src/index.css`
- Hardware back button: ditangani di `src/lib/nativeBootstrap.ts` (mundur satu layar, keluar app hanya dari Home)

Tidak ada bagian aplikasi yang bergantung pada browser desktop — routing pakai `HashRouter` (aman untuk WebView Capacitor), semua interaksi berbasis tap (bukan hover-only).
