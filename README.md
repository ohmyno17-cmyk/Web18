# 🔞 Brazer - Video Streaming Platform

Platform video premium untuk hiburan dewasa dengan konten berkualitas dari berbagai sumber terpercaya.

## ✨ Fitur

- 🎬 **Video Streaming** - Player embedded tanpa redirect ke situs asli
- 🔍 **Pencarian** - Cari video berdasarkan judul atau channel
- 🌍 **Filter Negara** - 15+ negara tersedia
- 🏷️ **Kategori Dinamis** - 40+ kategori dari API
- 🌙 **Dark Mode** - Tema gelap/terang
- 📱 **Responsive** - Tampilan optimal di semua perangkat
- 🔄 **Auto Refresh** - Update video terbaru setiap 30 detik
- 🔞 **Age Verification** - Badge 18+ dan peringatan usia

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📁 Struktur Project

```
src/
├── app/
│   ├── page.tsx           # Halaman utama
│   ├── layout.tsx         # Layout
│   ├── globals.css        # Global styles
│   └── api/
│       ├── videos/        # API video
│       └── categories/    # API kategori
├── components/
│   └── ui/                # shadcn/ui components
└── lib/
    └── utils.ts           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

```bash
# Clone repository
git clone https://github.com/USERNAME/brazer.git
cd brazer

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env

# Run development server
bun run dev
```

### Environment Variables

Buat file `.env` dengan konfigurasi berikut:

```env
DATABASE_URL=file:./db/custom.db
VIDEO_API_KEY=your_api_key_here
VIDEO_API_BASE_URL=https://api.example.com/v1
```

## 📡 API Endpoints

### Videos
```
GET /api/videos?page=1&limit=20&country=ID&search=tutorial&category=asian
```

### Categories
```
GET /api/categories
```

## 📝 License

MIT License - © 2024 Brazer

## ⚠️ Disclaimer

Situs ini hanya untuk pengguna berusia 18 tahun atau lebih. Dengan mengakses situs ini, Anda mengonfirmasi bahwa Anda sudah cukup umur sesuai hukum yang berlaku di wilayah Anda.

---

Made with ❤️ by Brazer Team
