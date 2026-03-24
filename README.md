# 🔞 Brazer - Adult Video Streaming Platform

Platform video streaming premium untuk konten dewasa (18+) dengan fitur lengkap dan tampilan modern.

![Brazer Preview](https://via.placeholder.com/1200x630/1a1a2e/ffffff?text=Brazer+18%2B+Video+Platform)

## ✨ Fitur Utama

- 🎬 **Video Streaming** - Player embedded, putar langsung tanpa redirect
- 🔍 **Pencarian Real-time** - Cari video berdasarkan judul/channel
- 🌍 **Filter Negara** - 15+ negara (Indonesia, Japan, Korea, dll)
- 🏷️ **40+ Kategori** - Asian, Amateur, MILF, Teen, dll
- 🌙 **Dark Mode** - Tema gelap modern
- 📱 **Responsive Design** - Optimal di desktop & mobile
- 🔄 **Auto Refresh** - Update video terbaru setiap 30 detik
- 🔞 **Age Verification** - Badge 18+ dan peringatan usia

## 🛠️ Tech Stack

| Teknologi | Versi |
|-----------|-------|
| Next.js | 16 (App Router) |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| shadcn/ui | Latest |
| Lucide React | Latest |

## 📁 Struktur Project

```
brazer/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Halaman utama
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── api/
│   │       ├── videos/       # API endpoint videos
│   │       └── categories/   # API endpoint categories
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   └── lib/
│       └── utils.ts          # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
├── .env                      # Environment variables
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Bun (recommended) atau npm

### Installation

```bash
# Clone repository
git clone https://github.com/ohmyno17-cmyk/Web18.git
cd Web18

# Install dependencies
bun install

# Run development server
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## ⚙️ Environment Variables

File `.env` sudah disertakan dengan konfigurasi:

```env
DATABASE_URL=file:./db/custom.db

# Video API Configuration
VIDEO_API_KEY=253193aj21xkzmfj9o7b8
VIDEO_API_BASE_URL=https://api.brazer.video/v1
```

## 📡 API Endpoints

### Videos
```http
GET /api/videos?page=1&limit=20&country=ID&search=keyword&category=asian
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Video Title",
      "thumbnail": "https://...",
      "video_url": "https://...",
      "channel": "Channel Name",
      "views": 125000,
      "viewsFormatted": "125K",
      "duration": "15:42",
      "country": "ID",
      "category": "asian"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Categories
```http
GET /api/categories
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "all",
      "name": "Semua",
      "slug": "semua",
      "count": 0,
      "icon": "🎬"
    },
    {
      "id": "asian",
      "name": "Asian",
      "slug": "asian",
      "count": 2341,
      "icon": "🌏"
    }
  ]
}
```

## 🏷️ Kategori Tersedia

| Icon | Kategori | Video Count |
|------|----------|-------------|
| 🎬 | Semua | - |
| 📱 | Amateur | 1.5K+ |
| 🌏 | Asian | 2.3K+ |
| 🍑 | Big Ass | 3.4K+ |
| 💗 | Big Tits | 4.5K+ |
| 💋 | Blowjob | 5.6K+ |
| 🔥 | Hardcore | 4.5K+ |
| 🎌 | Hentai | 2.3K+ |
| 🇯🇵 | Japanese | 3.4K+ |
| 👩‍❤️‍👩 | Lesbian | 2.5K+ |
| 👩‍👦 | MILF | 3.2K+ |
| 🎓 | Teen (18+) | 4.3K+ |
| ... | +28 kategori lainnya | |

## 🌍 Negara Tersedia

🇮🇩 Indonesia | 🇯🇵 Japan | 🇰🇷 Korea | 🇸🇬 Singapore | 🇲🇾 Malaysia | 🇹🇭 Thailand | 🇻🇳 Vietnam | 🇵🇭 Philippines | 🇺🇸 USA | 🇬🇧 UK | 🇩🇪 Germany | 🇫🇷 France | 🇧🇷 Brazil | 🇮🇳 India

## 🚀 Deploy ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ohmyno17-cmyk/Web18)

1. Klik tombol di atas
2. Login dengan GitHub
3. Tambahkan environment variables:
   - `VIDEO_API_KEY`
   - `VIDEO_API_BASE_URL`
4. Klik **Deploy**

## 📝 License

MIT License - © 2024 Brazer

## ⚠️ Disclaimer

**AKHTAR PENTING:**
- Situs ini hanya untuk pengguna berusia **18 tahun atau lebih**
- Dengan mengakses, Anda mengonfirmasi sudah cukup umur
- Konten bersumber dari platform pihak ketiga
- Segala pelanggaran hukum bukan tanggung jawab developer

---

Made with ❤️ by Brazer Team

🔗 **Repository:** [github.com/ohmyno17-cmyk/Web18](https://github.com/ohmyno17-cmyk/Web18)
