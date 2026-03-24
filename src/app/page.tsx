'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Play,
  Clock,
  Eye,
  Grid3X3,
  List,
  Sun,
  Moon,
  Heart,
  ChevronDown
} from 'lucide-react'

// Mock data
const mockVideos = [
  { id: '1', title: 'Tutorial Next.js 16 - Membangun Aplikasi Modern', thumbnail: 'https://picsum.photos/seed/v1/640/360', channel: 'Tech Academy', channelAvatar: 'https://picsum.photos/seed/c1/100/100', views: '125K', duration: '15:42', publishedAt: '2 hari lalu', country: 'ID' },
  { id: '2', title: 'React Hooks Deep Dive', thumbnail: 'https://picsum.photos/seed/v2/640/360', channel: 'Code Master', channelAvatar: 'https://picsum.photos/seed/c2/100/100', views: '89K', duration: '22:18', publishedAt: '1 minggu lalu', country: 'ID' },
  { id: '3', title: 'Design System dengan Tailwind CSS', thumbnail: 'https://picsum.photos/seed/v3/640/360', channel: 'UI Labs', channelAvatar: 'https://picsum.photos/seed/c3/100/100', views: '234K', duration: '18:05', publishedAt: '3 hari lalu', country: 'MY' },
  { id: '4', title: 'TypeScript Tips & Tricks', thumbnail: 'https://picsum.photos/seed/v4/640/360', channel: 'Dev Tips', channelAvatar: 'https://picsum.photos/seed/c4/100/100', views: '567K', duration: '12:30', publishedAt: '5 hari lalu', country: 'SG' },
  { id: '5', title: 'Building REST API dengan Node.js', thumbnail: 'https://picsum.photos/seed/v5/640/360', channel: 'Backend Pro', channelAvatar: 'https://picsum.photos/seed/c5/100/100', views: '78K', duration: '28:45', publishedAt: '1 hari lalu', country: 'ID' },
  { id: '6', title: 'CSS Animation Mastery', thumbnail: 'https://picsum.photos/seed/v6/640/360', channel: 'Frontend Hub', channelAvatar: 'https://picsum.photos/seed/c6/100/100', views: '156K', duration: '20:12', publishedAt: '4 hari lalu', country: 'JP' },
  { id: '7', title: 'Database Design Best Practices', thumbnail: 'https://picsum.photos/seed/v7/640/360', channel: 'Data School', channelAvatar: 'https://picsum.photos/seed/c7/100/100', views: '92K', duration: '35:00', publishedAt: '6 hari lalu', country: 'KR' },
  { id: '8', title: 'Flutter vs React Native', thumbnail: 'https://picsum.photos/seed/v8/640/360', channel: 'Mobile Dev', channelAvatar: 'https://picsum.photos/seed/c8/100/100', views: '445K', duration: '16:55', publishedAt: '2 minggu lalu', country: 'ID' },
  { id: '9', title: 'AI & Machine Learning Basics', thumbnail: 'https://picsum.photos/seed/v9/640/360', channel: 'AI Academy', channelAvatar: 'https://picsum.photos/seed/c9/100/100', views: '312K', duration: '45:20', publishedAt: '1 hari lalu', country: 'JP' },
  { id: '10', title: 'Cyber Security Fundamentals', thumbnail: 'https://picsum.photos/seed/v10/640/360', channel: 'SecureCode', channelAvatar: 'https://picsum.photos/seed/c10/100/100', views: '198K', duration: '32:15', publishedAt: '3 hari lalu', country: 'SG' },
  { id: '11', title: 'Cloud Computing dengan AWS', thumbnail: 'https://picsum.photos/seed/v11/640/360', channel: 'Cloud Masters', channelAvatar: 'https://picsum.photos/seed/c11/100/100', views: '267K', duration: '28:50', publishedAt: '5 hari lalu', country: 'MY' },
  { id: '12', title: 'UI/UX Design Principles', thumbnail: 'https://picsum.photos/seed/v12/640/360', channel: 'Design Pro', channelAvatar: 'https://picsum.photos/seed/c12/100/100', views: '421K', duration: '19:30', publishedAt: '2 hari lalu', country: 'KR' },
]

const countries = [
  { code: 'all', name: 'Semua', flag: '🌐' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷' },
  { code: 'US', name: 'US', flag: '🇺🇸' },
  { code: 'GB', name: 'UK', flag: '🇬🇧' },
]

const categories = ['Semua', 'Tutorial', 'Design', 'Backend', 'Tips', 'Mobile']

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [activeCountry, setActiveCountry] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCountries, setShowCountries] = useState(false)

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'Semua'
    const matchesCountry = activeCountry === 'all' || video.country === activeCountry
    return matchesSearch && matchesCategory && matchesCountry
  })

  const activeCountryData = countries.find(c => c.code === activeCountry)

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center relative">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-amber-400 text-amber-900 rounded px-0.5">18+</span>
              </div>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Brazer</span>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
                <Input
                  placeholder="Cari video..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`h-9 pl-9 text-sm ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Country Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCountries(!showCountries)}
                  className={`gap-1.5 h-8 ${darkMode ? 'text-zinc-200 hover:text-white hover:bg-zinc-800' : 'text-gray-700'}`}
                >
                  <span>{activeCountryData?.flag}</span>
                  <span className="hidden sm:inline">{activeCountryData?.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
                
                {showCountries && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowCountries(false)} />
                    <div className={`absolute right-0 top-full mt-1 w-44 rounded-lg border shadow-xl z-50 ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'}`}>
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => { setActiveCountry(c.code); setShowCountries(false) }}
                          className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left first:rounded-t-lg last:rounded-b-lg ${
                            activeCountry === c.code 
                              ? (darkMode ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-gray-900') 
                              : (darkMode ? 'text-zinc-200 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-50')
                          }`}
                        >
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* View Toggle */}
              <div className={`hidden sm:flex items-center rounded-lg p-1 ${darkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('grid')} 
                  className={`h-7 w-7 rounded-md ${viewMode === 'grid' ? (darkMode ? 'bg-zinc-700 text-white' : 'bg-white shadow text-gray-900') : (darkMode ? 'text-zinc-400' : 'text-gray-500')}`}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('list')} 
                  className={`h-7 w-7 rounded-md ${viewMode === 'list' ? (darkMode ? 'bg-zinc-700 text-white' : 'bg-white shadow text-gray-900') : (darkMode ? 'text-zinc-400' : 'text-gray-500')}`}
                >
                  <List className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Dark Mode */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setDarkMode(!darkMode)} 
                className={`h-8 w-8 ${darkMode ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : ''}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
              <Input
                placeholder="Cari video..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`h-9 pl-9 text-sm ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 h-8 text-sm shrink-0 ${
                activeCategory === cat
                  ? darkMode 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                  : darkMode 
                    ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' 
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
          {filteredVideos.length} video ditemukan
        </p>

        {/* Video Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
          : 'space-y-3'
        }>
          {filteredVideos.map((video) => (
            viewMode === 'grid' ? (
              <div 
                key={video.id} 
                className={`group cursor-pointer rounded-lg overflow-hidden ${darkMode ? 'hover:bg-zinc-900' : 'hover:bg-gray-50'}`}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2.5">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-gray-900 fill-gray-900 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
                    {video.duration}
                  </span>
                </div>
                <h3 className={`text-sm font-medium line-clamp-2 mb-1.5 leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mb-1.5">
                  <img src={video.channelAvatar} className="w-5 h-5 rounded-full" alt={video.channel} />
                  <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{video.channel}</span>
                </div>
                <div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{video.views}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{video.publishedAt}</span>
                </div>
              </div>
            ) : (
              <div 
                key={video.id} 
                className={`flex cursor-pointer rounded-lg overflow-hidden ${darkMode ? 'hover:bg-zinc-900' : 'hover:bg-gray-50'}`}
              >
                <div className="relative w-40 sm:w-48 shrink-0">
                  <img src={video.thumbnail} className="w-full aspect-video object-cover rounded-lg" alt={video.title} />
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1 p-3 flex items-center">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium line-clamp-2 mb-1.5 leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-1.5">
                      <img src={video.channelAvatar} className="w-5 h-5 rounded-full" alt={video.channel} />
                      <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{video.channel}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                      <span>{video.views} views</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`shrink-0 rounded-full ${darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400'}`}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Empty */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tidak ada video</p>
            <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Coba ubah filter pencarian</p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchQuery(''); setActiveCountry('all') }}
              className={darkMode ? 'border-zinc-700 text-white hover:bg-zinc-800' : ''}
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredVideos.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              className={darkMode ? 'border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800' : ''}
            >
              Muat Lebih Banyak
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center relative">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-amber-400 text-amber-900 rounded px-0.5">18+</span>
                </div>
                <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Brazer</span>
              </div>
              <p className={`text-sm max-w-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                Platform video premium untuk hiburan dewasa. Konten berkualitas dari berbagai sumber terpercaya.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className={`font-semibold text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Navigasi</h4>
                <ul className="space-y-2">
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Beranda</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Trending</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Terbaru</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Kategori</a></li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Informasi</h4>
                <ul className="space-y-2">
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Tentang Kami</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>API Developer</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Kontak</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Kebijakan Privasi</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Syarat & Ketentuan</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>DMCA</a></li>
                  <li><a href="#" className={`text-sm transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Keamanan</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Age Warning */}
          <div className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${darkMode ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                <span className="text-lg font-bold text-amber-500">18+</span>
              </div>
              <div>
                <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Peringatan Usia</h4>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Situs ini hanya untuk pengguna berusia 18 tahun atau lebih. Dengan mengakses situs ini, Anda mengonfirmasi bahwa Anda sudah cukup umur sesuai hukum yang berlaku di wilayah Anda.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
              © 2024 Brazer. Semua hak dilindungi. Video bersumber dari platform pihak ketiga.
            </p>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Koneksi Aman</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Privasi Terlindungi</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
