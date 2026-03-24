'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
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
  ChevronDown,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Types
interface Video {
  id: string
  title: string
  thumbnail: string
  video_url: string
  channel: string
  channelAvatar: string
  views: number
  viewsFormatted: string
  duration: string
  durationSeconds: number
  publishedAt: string
  publishedAtFormatted: string
  country: string
  category: string
  description: string
}

interface Category {
  id: string
  name: string
  slug: string
  count: number
  icon: string
}

const countries = [
  { code: 'all', name: 'Semua', flag: '🌐' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷' },
  { code: 'US', name: 'US', flag: '🇺🇸' },
  { code: 'GB', name: 'UK', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
]

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeCountry, setActiveCountry] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCountries, setShowCountries] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  
  const [videos, setVideos] = useState<Video[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Category pagination
  const [categoryPage, setCategoryPage] = useState(0)
  const categoriesPerPage = 12

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true)
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      if (data.success && data.data) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoadingCategories(false)
    }
  }, [])

  // Fetch videos from API
  const fetchVideos = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '20',
        country: activeCountry,
        search: searchQuery,
        category: activeCategory
      })
      
      const response = await fetch(`/api/videos?${params}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        setVideos(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    } finally {
      setLoading(false)
    }
  }, [activeCountry, searchQuery, activeCategory])

  // Initial fetch
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Fetch videos when filters change
  useEffect(() => {
    fetchVideos()
    
    // Auto-refresh for new videos every 30 seconds
    const interval = setInterval(fetchVideos, 30000)
    return () => clearInterval(interval)
  }, [fetchVideos])

  // Play video
  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video)
    setIsPlaying(true)
  }

  // Close video player
  const handleClosePlayer = () => {
    setIsPlaying(false)
    setSelectedVideo(null)
  }

  const activeCountryData = countries.find(c => c.code === activeCountry)
  const activeCategoryData = categories.find(c => c.id === activeCategory)

  // Paginated categories
  const paginatedCategories = categories.slice(
    categoryPage * categoriesPerPage,
    (categoryPage + 1) * categoriesPerPage
  )
  const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage)

  // Filter videos client-side for instant feedback
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory || video.category === activeCategoryData?.slug
    const matchesCountry = activeCountry === 'all' || video.country === activeCountry
    return matchesSearch && matchesCategory && matchesCountry
  })

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
                    <div className={`absolute right-0 top-full mt-1 w-44 rounded-lg border shadow-xl z-50 max-h-80 overflow-y-auto ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'}`}>
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => { setActiveCountry(c.code); setShowCountries(false) }}
                          className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left ${
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
        {/* Categories - Dynamic from API */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-sm font-semibold ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
              Kategori
            </h2>
            {categories.length > categoriesPerPage && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoryPage(Math.max(0, categoryPage - 1))}
                  disabled={categoryPage === 0}
                  className={`h-7 w-7 ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className={`text-xs px-2 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                  {categoryPage + 1}/{totalCategoryPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoryPage(Math.min(totalCategoryPages - 1, categoryPage + 1))}
                  disabled={categoryPage >= totalCategoryPages - 1}
                  className={`h-7 w-7 ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500'}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          
          {loadingCategories ? (
            <div className="flex items-center gap-2 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
              <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Memuat kategori...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {paginatedCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 h-8 text-sm shrink-0 ${
                    activeCategory === cat.id
                      ? darkMode 
                        ? 'bg-white text-gray-900 hover:bg-gray-100' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                      : darkMode 
                        ? 'text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700' 
                        : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.name}
                  {cat.count > 0 && (
                    <span className={`ml-1.5 text-xs ${activeCategory === cat.id ? (darkMode ? 'text-gray-600' : 'text-gray-400') : (darkMode ? 'text-zinc-500' : 'text-gray-400')}`}>
                      {cat.count > 999 ? `${(cat.count/1000).toFixed(1)}K` : cat.count}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Active Filters */}
        {(activeCategory !== 'all' || activeCountry !== 'all') && (
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Filter aktif:</span>
            {activeCategory !== 'all' && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'}`}>
                {activeCategoryData?.icon} {activeCategoryData?.name}
                <button onClick={() => setActiveCategory('all')} className="hover:text-rose-500 ml-1">×</button>
              </span>
            )}
            {activeCountry !== 'all' && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'}`}>
                {activeCountryData?.flag} {activeCountryData?.name}
                <button onClick={() => setActiveCountry('all')} className="hover:text-rose-500 ml-1">×</button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            {loading ? 'Memuat...' : `${filteredVideos.length} video ditemukan`}
          </p>
          {loading && <Loader2 className="w-4 h-4 animate-spin text-rose-500" />}
        </div>

        {/* Loading State */}
        {loading && videos.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          </div>
        )}

        {/* Video Grid */}
        {!loading || videos.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
            : 'space-y-3'
          }>
            {filteredVideos.map((video) => (
              viewMode === 'grid' ? (
                <div 
                  key={video.id} 
                  className={`group cursor-pointer rounded-lg overflow-hidden ${darkMode ? 'hover:bg-zinc-900' : 'hover:bg-gray-50'}`}
                  onClick={() => handlePlayVideo(video)}
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
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{video.viewsFormatted}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{video.publishedAtFormatted}</span>
                  </div>
                </div>
              ) : (
                <div 
                  key={video.id} 
                  className={`flex cursor-pointer rounded-lg overflow-hidden ${darkMode ? 'hover:bg-zinc-900' : 'hover:bg-gray-50'}`}
                  onClick={() => handlePlayVideo(video)}
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
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{video.viewsFormatted}</span>
                        <span>{video.publishedAtFormatted}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`shrink-0 rounded-full ${darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-400'}`}
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : null}

        {/* Empty */}
        {filteredVideos.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tidak ada video</p>
            <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Coba ubah filter pencarian</p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchQuery(''); setActiveCountry('all'); setActiveCategory('all') }}
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
              onClick={fetchVideos}
              disabled={loading}
              className={darkMode ? 'border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800' : ''}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Muat Lebih Banyak
            </Button>
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      <Dialog open={isPlaying} onOpenChange={handleClosePlayer}>
        <DialogContent className={`max-w-5xl w-[95vw] p-0 overflow-hidden ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white'}`}>
          {selectedVideo && (
            <div className="relative">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={selectedVideo.video_url + '?autoplay=1'}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedVideo.title}
                </h2>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <img src={selectedVideo.channelAvatar} className="w-8 h-8 rounded-full" alt={selectedVideo.channel} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedVideo.channel}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                    <Eye className="w-4 h-4" />
                    {selectedVideo.viewsFormatted} views
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                    <Clock className="w-4 h-4" />
                    {selectedVideo.publishedAtFormatted}
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
