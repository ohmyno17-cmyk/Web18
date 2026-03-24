import { NextResponse } from 'next/server'

const API_KEY = process.env.VIDEO_API_KEY || '253193aj21xkzmfj9o7b8'
const API_BASE_URL = process.env.VIDEO_API_BASE_URL || 'https://api.brazer.video/v1'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '20'
  const country = searchParams.get('country') || 'all'
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'all'

  console.log('[Videos API] Fetching videos with params:', { page, limit, country, search, category })

  try {
    // Build API URL
    const apiUrl = new URL(`${API_BASE_URL}/videos`)
    apiUrl.searchParams.append('api_key', API_KEY)
    apiUrl.searchParams.append('page', page)
    apiUrl.searchParams.append('limit', limit)
    if (country !== 'all') apiUrl.searchParams.append('country', country)
    if (search) apiUrl.searchParams.append('search', search)
    if (category !== 'all') apiUrl.searchParams.append('category', category)

    console.log('[Videos API] Requesting:', apiUrl.toString().replace(API_KEY, '***'))

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Brazer/1.0',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    console.log('[Videos API] Response status:', response.status)

    if (response.ok) {
      const data = await response.json()
      console.log('[Videos API] Success, videos count:', data.data?.length || data.videos?.length || 0)
      
      // Transform response to standard format
      const transformedData = transformApiResponse(data)
      return NextResponse.json(transformedData)
    }

    console.log('[Videos API] Failed, using mock data')
    return NextResponse.json(getMockResponse(page, limit))
    
  } catch (error) {
    console.error('[Videos API] Error:', error)
    return NextResponse.json(getMockResponse(page, limit))
  }
}

// Transform different API response formats to standard format
function transformApiResponse(data: any) {
  // Handle different response formats
  const videos = data.data || data.videos || data.results || []
  
  const transformedVideos = videos.map((video: any, index: number) => ({
    id: video.id || video.video_id || `video-${index}`,
    title: video.title || video.name || 'Untitled',
    thumbnail: video.thumbnail || video.thumb || video.preview || `https://picsum.photos/seed/v${index}/640/360`,
    video_url: video.video_url || video.url || video.embed_url || video.src || '',
    channel: video.channel || video.uploader || video.author || 'Unknown',
    channelAvatar: video.channelAvatar || video.uploader_avatar || video.author_avatar || `https://picsum.photos/seed/c${index}/100/100`,
    views: video.views || video.view_count || video.views_count || 0,
    viewsFormatted: formatViews(video.views || video.view_count || 0),
    duration: video.duration || video.length || '00:00',
    durationSeconds: video.durationSeconds || video.duration_seconds || 0,
    publishedAt: video.publishedAt || video.created_at || video.date || new Date().toISOString(),
    publishedAtFormatted: formatDate(video.publishedAt || video.created_at || video.date),
    country: video.country || video.region || 'ID',
    category: video.category || video.tags?.[0] || 'General',
    description: video.description || video.desc || '',
  }))

  return {
    success: true,
    data: transformedVideos,
    pagination: data.pagination || {
      page: data.page || 1,
      limit: data.limit || 20,
      total: data.total || transformedVideos.length,
      totalPages: data.totalPages || Math.ceil((data.total || transformedVideos.length) / 20)
    }
  }
}

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Hari ini'
    if (days === 1) return 'Kemarin'
    if (days < 7) return `${days} hari lalu`
    if (days < 30) return `${Math.floor(days / 7)} minggu lalu`
    if (days < 365) return `${Math.floor(days / 30)} bulan lalu`
    return `${Math.floor(days / 365)} tahun lalu`
  } catch {
    return 'Baru saja'
  }
}

function getMockResponse(page: string, limit: string) {
  const allVideos = [
    {
      id: '1',
      title: 'Hot Asian Babe Gets Naughty in Tokyo Hotel',
      thumbnail: 'https://picsum.photos/seed/v1/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Tokyo Nights',
      channelAvatar: 'https://picsum.photos/seed/c1/100/100',
      views: 125000,
      viewsFormatted: '125K',
      duration: '15:42',
      durationSeconds: 942,
      publishedAt: '2024-01-15T10:00:00Z',
      publishedAtFormatted: '2 hari lalu',
      country: 'JP',
      category: 'asian',
      description: 'Steamy encounter in Tokyo hotel room'
    },
    {
      id: '2',
      title: 'Indonesian Couple Private Session Leaked',
      thumbnail: 'https://picsum.photos/seed/v2/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Jakarta Secrets',
      channelAvatar: 'https://picsum.photos/seed/c2/100/100',
      views: 89000,
      viewsFormatted: '89K',
      duration: '22:18',
      durationSeconds: 1338,
      publishedAt: '2024-01-10T08:00:00Z',
      publishedAtFormatted: '1 minggu lalu',
      country: 'ID',
      category: 'amateur',
      description: 'Private moment captured'
    },
    {
      id: '3',
      title: 'Korean BJ Girl Live Stream Premium',
      thumbnail: 'https://picsum.photos/seed/v3/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Seoul Premium',
      channelAvatar: 'https://picsum.photos/seed/c3/100/100',
      views: 234000,
      viewsFormatted: '234K',
      duration: '18:05',
      durationSeconds: 1085,
      publishedAt: '2024-01-13T12:00:00Z',
      publishedAtFormatted: '3 hari lalu',
      country: 'KR',
      category: 'webcam',
      description: 'Premium live stream content'
    },
    {
      id: '4',
      title: 'Thai Massage Parlor Hidden Camera',
      thumbnail: 'https://picsum.photos/seed/v4/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Bangkok Tales',
      channelAvatar: 'https://picsum.photos/seed/c4/100/100',
      views: 567000,
      viewsFormatted: '567K',
      duration: '12:30',
      durationSeconds: 750,
      publishedAt: '2024-01-12T15:00:00Z',
      publishedAtFormatted: '5 hari lalu',
      country: 'TH',
      category: 'massage',
      description: 'Sensual massage session'
    },
    {
      id: '5',
      title: 'Filipina Teen First Time On Camera',
      thumbnail: 'https://picsum.photos/seed/v5/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Manila Dreams',
      channelAvatar: 'https://picsum.photos/seed/c5/100/100',
      views: 78000,
      viewsFormatted: '78K',
      duration: '28:45',
      durationSeconds: 1725,
      publishedAt: '2024-01-15T06:00:00Z',
      publishedAtFormatted: '1 hari lalu',
      country: 'PH',
      category: 'teen',
      description: 'First time experience'
    },
    {
      id: '6',
      title: 'Vietnamese Model Private Photoshoot',
      thumbnail: 'https://picsum.photos/seed/v6/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Saigon Models',
      channelAvatar: 'https://picsum.photos/seed/c6/100/100',
      views: 156000,
      viewsFormatted: '156K',
      duration: '20:12',
      durationSeconds: 1212,
      publishedAt: '2024-01-11T09:00:00Z',
      publishedAtFormatted: '4 hari lalu',
      country: 'VN',
      category: 'amateur',
      description: 'Behind the scenes photoshoot'
    },
    {
      id: '7',
      title: 'Malaysian MILF Seduces Young Boy',
      thumbnail: 'https://picsum.photos/seed/v7/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'KL Nights',
      channelAvatar: 'https://picsum.photos/seed/c7/100/100',
      views: 92000,
      viewsFormatted: '92K',
      duration: '35:00',
      durationSeconds: 2100,
      publishedAt: '2024-01-09T14:00:00Z',
      publishedAtFormatted: '6 hari lalu',
      country: 'MY',
      category: 'milf',
      description: 'Mature woman fantasy'
    },
    {
      id: '8',
      title: 'Singapore Office Lady After Hours',
      thumbnail: 'https://picsum.photos/seed/v8/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'SG Confidential',
      channelAvatar: 'https://picsum.photos/seed/c8/100/100',
      views: 445000,
      viewsFormatted: '445K',
      duration: '16:55',
      durationSeconds: 1015,
      publishedAt: '2024-01-03T11:00:00Z',
      publishedAtFormatted: '2 minggu lalu',
      country: 'SG',
      category: 'reality',
      description: 'Office fantasy comes true'
    },
    {
      id: '9',
      title: 'Japanese Schoolgirl Cosplay Party',
      thumbnail: 'https://picsum.photos/seed/v9/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Tokyo Cosplay',
      channelAvatar: 'https://picsum.photos/seed/c9/100/100',
      views: 312000,
      viewsFormatted: '312K',
      duration: '45:20',
      durationSeconds: 2720,
      publishedAt: '2024-01-14T07:00:00Z',
      publishedAtFormatted: '1 hari lalu',
      country: 'JP',
      category: 'japanese',
      description: 'Cosplay party gone wild'
    },
    {
      id: '10',
      title: 'Thai Ladyboy Surprise Collection',
      thumbnail: 'https://picsum.photos/seed/v10/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Bangkok Special',
      channelAvatar: 'https://picsum.photos/seed/c10/100/100',
      views: 198000,
      viewsFormatted: '198K',
      duration: '32:15',
      durationSeconds: 1935,
      publishedAt: '2024-01-12T16:00:00Z',
      publishedAtFormatted: '3 hari lalu',
      country: 'TH',
      category: 'fetish',
      description: 'Special Thai collection'
    },
    {
      id: '11',
      title: 'Indonesian Hijab Girl Scandal',
      thumbnail: 'https://picsum.photos/seed/v11/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Jakarta Scandal',
      channelAvatar: 'https://picsum.photos/seed/c11/100/100',
      views: 267000,
      viewsFormatted: '267K',
      duration: '28:50',
      durationSeconds: 1730,
      publishedAt: '2024-01-10T10:00:00Z',
      publishedAtFormatted: '5 hari lalu',
      country: 'ID',
      category: 'amateur',
      description: 'Leaked scandal video'
    },
    {
      id: '12',
      title: 'Korean Student Dormitory Secrets',
      thumbnail: 'https://picsum.photos/seed/v12/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Seoul Dorms',
      channelAvatar: 'https://picsum.photos/seed/c12/100/100',
      views: 421000,
      viewsFormatted: '421K',
      duration: '19:30',
      durationSeconds: 1170,
      publishedAt: '2024-01-13T13:00:00Z',
      publishedAtFormatted: '2 hari lalu',
      country: 'KR',
      category: 'teen',
      description: 'Dormitory hidden secrets'
    }
  ]

  return {
    success: true,
    data: allVideos,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: 100,
      totalPages: 5
    }
  }
}
