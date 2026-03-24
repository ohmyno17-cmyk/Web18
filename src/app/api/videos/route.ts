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

  try {
    // Fetch from external API
    const response = await fetch(`${API_BASE_URL}/videos?api_key=${API_KEY}&page=${page}&limit=${limit}&country=${country}&search=${search}&category=${category}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      // Return mock data if API fails
      return NextResponse.json({
        success: true,
        data: getMockVideos(),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 100,
          totalPages: 5
        }
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    
    // Return mock data on error
    return NextResponse.json({
      success: true,
      data: getMockVideos(),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 100,
        totalPages: 5
      }
    })
  }
}

// Mock video data for fallback
function getMockVideos() {
  return [
    {
      id: '1',
      title: 'Tutorial Next.js 16 - Membangun Aplikasi Modern',
      thumbnail: 'https://picsum.photos/seed/v1/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Tech Academy',
      channelAvatar: 'https://picsum.photos/seed/c1/100/100',
      views: 125000,
      viewsFormatted: '125K',
      duration: '15:42',
      durationSeconds: 942,
      publishedAt: '2024-01-15T10:00:00Z',
      publishedAtFormatted: '2 hari lalu',
      country: 'ID',
      category: 'Tutorial',
      description: 'Pelajari cara membangun aplikasi modern dengan Next.js 16'
    },
    {
      id: '2',
      title: 'React Hooks Deep Dive - useState, useEffect & Beyond',
      thumbnail: 'https://picsum.photos/seed/v2/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Code Master',
      channelAvatar: 'https://picsum.photos/seed/c2/100/100',
      views: 89000,
      viewsFormatted: '89K',
      duration: '22:18',
      durationSeconds: 1338,
      publishedAt: '2024-01-10T08:00:00Z',
      publishedAtFormatted: '1 minggu lalu',
      country: 'ID',
      category: 'Tutorial',
      description: 'Memahami React Hooks secara mendalam'
    },
    {
      id: '3',
      title: 'Design System dengan Tailwind CSS',
      thumbnail: 'https://picsum.photos/seed/v3/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'UI Labs',
      channelAvatar: 'https://picsum.photos/seed/c3/100/100',
      views: 234000,
      viewsFormatted: '234K',
      duration: '18:05',
      durationSeconds: 1085,
      publishedAt: '2024-01-13T12:00:00Z',
      publishedAtFormatted: '3 hari lalu',
      country: 'MY',
      category: 'Design',
      description: 'Membangun design system yang konsisten'
    },
    {
      id: '4',
      title: 'TypeScript Tips & Tricks untuk Developer',
      thumbnail: 'https://picsum.photos/seed/v4/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Dev Tips',
      channelAvatar: 'https://picsum.photos/seed/c4/100/100',
      views: 567000,
      viewsFormatted: '567K',
      duration: '12:30',
      durationSeconds: 750,
      publishedAt: '2024-01-12T15:00:00Z',
      publishedAtFormatted: '5 hari lalu',
      country: 'SG',
      category: 'Tips',
      description: 'Tips TypeScript yang wajib diketahui developer'
    },
    {
      id: '5',
      title: 'Building REST API dengan Node.js',
      thumbnail: 'https://picsum.photos/seed/v5/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Backend Pro',
      channelAvatar: 'https://picsum.photos/seed/c5/100/100',
      views: 78000,
      viewsFormatted: '78K',
      duration: '28:45',
      durationSeconds: 1725,
      publishedAt: '2024-01-15T06:00:00Z',
      publishedAtFormatted: '1 hari lalu',
      country: 'ID',
      category: 'Backend',
      description: 'Membangun REST API yang powerful'
    },
    {
      id: '6',
      title: 'CSS Animation Mastery - Create Stunning Effects',
      thumbnail: 'https://picsum.photos/seed/v6/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Frontend Hub',
      channelAvatar: 'https://picsum.photos/seed/c6/100/100',
      views: 156000,
      viewsFormatted: '156K',
      duration: '20:12',
      durationSeconds: 1212,
      publishedAt: '2024-01-11T09:00:00Z',
      publishedAtFormatted: '4 hari lalu',
      country: 'JP',
      category: 'Design',
      description: 'Kuasai animasi CSS untuk web yang menarik'
    },
    {
      id: '7',
      title: 'Database Design Best Practices',
      thumbnail: 'https://picsum.photos/seed/v7/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Data School',
      channelAvatar: 'https://picsum.photos/seed/c7/100/100',
      views: 92000,
      viewsFormatted: '92K',
      duration: '35:00',
      durationSeconds: 2100,
      publishedAt: '2024-01-09T14:00:00Z',
      publishedAtFormatted: '6 hari lalu',
      country: 'KR',
      category: 'Backend',
      description: 'Best practices dalam mendesain database'
    },
    {
      id: '8',
      title: 'Flutter vs React Native - Pilihan Terbaik 2024',
      thumbnail: 'https://picsum.photos/seed/v8/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Mobile Dev',
      channelAvatar: 'https://picsum.photos/seed/c8/100/100',
      views: 445000,
      viewsFormatted: '445K',
      duration: '16:55',
      durationSeconds: 1015,
      publishedAt: '2024-01-03T11:00:00Z',
      publishedAtFormatted: '2 minggu lalu',
      country: 'ID',
      category: 'Mobile',
      description: 'Perbandingan framework mobile terpopuler'
    },
    {
      id: '9',
      title: 'AI & Machine Learning untuk Pemula',
      thumbnail: 'https://picsum.photos/seed/v9/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'AI Academy',
      channelAvatar: 'https://picsum.photos/seed/c9/100/100',
      views: 312000,
      viewsFormatted: '312K',
      duration: '45:20',
      durationSeconds: 2720,
      publishedAt: '2024-01-14T07:00:00Z',
      publishedAtFormatted: '1 hari lalu',
      country: 'JP',
      category: 'Tutorial',
      description: 'Mulai perjalanan AI Anda di sini'
    },
    {
      id: '10',
      title: 'Cyber Security Fundamentals',
      thumbnail: 'https://picsum.photos/seed/v10/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'SecureCode',
      channelAvatar: 'https://picsum.photos/seed/c10/100/100',
      views: 198000,
      viewsFormatted: '198K',
      duration: '32:15',
      durationSeconds: 1935,
      publishedAt: '2024-01-12T16:00:00Z',
      publishedAtFormatted: '3 hari lalu',
      country: 'SG',
      category: 'Tips',
      description: 'Dasar-dasar keamanan siber'
    },
    {
      id: '11',
      title: 'Cloud Computing dengan AWS',
      thumbnail: 'https://picsum.photos/seed/v11/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Cloud Masters',
      channelAvatar: 'https://picsum.photos/seed/c11/100/100',
      views: 267000,
      viewsFormatted: '267K',
      duration: '28:50',
      durationSeconds: 1730,
      publishedAt: '2024-01-10T10:00:00Z',
      publishedAtFormatted: '5 hari lalu',
      country: 'MY',
      category: 'Backend',
      description: 'Kuasai AWS untuk infrastruktur cloud'
    },
    {
      id: '12',
      title: 'UI/UX Design Principles',
      thumbnail: 'https://picsum.photos/seed/v12/640/360',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      channel: 'Design Pro',
      channelAvatar: 'https://picsum.photos/seed/c12/100/100',
      views: 421000,
      viewsFormatted: '421K',
      duration: '19:30',
      durationSeconds: 1170,
      publishedAt: '2024-01-13T13:00:00Z',
      publishedAtFormatted: '2 hari lalu',
      country: 'KR',
      category: 'Design',
      description: 'Prinsip-prinsip desain UI/UX yang wajib diketahui'
    }
  ]
}
