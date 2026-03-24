import { NextResponse } from 'next/server'

const API_KEY = process.env.VIDEO_API_KEY || '253193aj21xkzmfj9o7b8'
const API_BASE_URL = process.env.VIDEO_API_BASE_URL || 'https://api.brazer.video/v1'

export async function GET() {
  console.log('[Categories API] Fetching categories...')

  try {
    const apiUrl = `${API_BASE_URL}/categories?api_key=${API_KEY}`
    console.log('[Categories API] Requesting:', apiUrl.replace(API_KEY, '***'))

    const response = await fetch(apiUrl, {
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

    console.log('[Categories API] Response status:', response.status)

    if (response.ok) {
      const data = await response.json()
      console.log('[Categories API] Success, categories count:', data.data?.length || data.categories?.length || 0)
      
      // Transform response to standard format
      const transformedData = transformCategoriesResponse(data)
      return NextResponse.json(transformedData)
    }

    console.log('[Categories API] Failed, using default categories')
    return NextResponse.json(getDefaultCategories())
    
  } catch (error) {
    console.error('[Categories API] Error:', error)
    return NextResponse.json(getDefaultCategories())
  }
}

// Transform different API response formats
function transformCategoriesResponse(data: any) {
  const categories = data.data || data.categories || data.results || []
  
  const transformedCategories = categories.map((cat: any, index: number) => ({
    id: cat.id || cat.slug || `cat-${index}`,
    name: cat.name || cat.title || 'Unknown',
    slug: cat.slug || cat.id || `cat-${index}`,
    count: cat.count || cat.video_count || cat.total || 0,
    icon: cat.icon || cat.emoji || getCategoryIcon(cat.name || cat.slug || ''),
  }))

  // Add "Semua" at the beginning if not present
  if (transformedCategories.length === 0 || transformedCategories[0].id !== 'all') {
    transformedCategories.unshift({
      id: 'all',
      name: 'Semua',
      slug: 'semua',
      count: 0,
      icon: '🎬'
    })
  }

  return {
    success: true,
    data: transformedCategories
  }
}

function getCategoryIcon(name: string): string {
  const iconMap: Record<string, string> = {
    'amateur': '📱',
    'asian': '🌏',
    'bbw': '💕',
    'bdsm': '🔗',
    'big-ass': '🍑',
    'big-tits': '💗',
    'blonde': '👱',
    'blowjob': '💋',
    'brunette': '👩',
    'compilation': '🎞️',
    'couple': '👫',
    'creampie': '🍰',
    'cumshot': '💦',
    'ebony': '🖤',
    'fetish': '👠',
    'gangbang': '👥',
    'gay': '🏳️‍🌈',
    'group': '👥',
    'hardcore': '🔥',
    'hentai': '🎌',
    'indian': '🇮🇳',
    'interracial': '🤝',
    'japanese': '🇯🇵',
    'latina': '🌶️',
    'lesbian': '👩‍❤️‍👩',
    'massage': '💆',
    'mature': '👩‍🦰',
    'milf': '👩‍👦',
    'pov': '👁️',
    'public': '🌳',
    'reality': '📸',
    'redhead': '👩‍🦰',
    'rough': '💪',
    'russian': '🇷🇺',
    'squirt': '💧',
    'teen': '🎓',
    'threesome': '👯',
    'toys': '🧸',
    'vintage': '📼',
    'webcam': '📹',
  }
  
  const lowerName = name.toLowerCase()
  return iconMap[lowerName] || '📂'
}

// Default categories for adult content platform
function getDefaultCategories() {
  return {
    success: true,
    data: [
      { id: 'all', name: 'Semua', slug: 'semua', count: 0, icon: '🎬' },
      { id: 'amateur', name: 'Amateur', slug: 'amateur', count: 1523, icon: '📱' },
      { id: 'asian', name: 'Asian', slug: 'asian', count: 2341, icon: '🌏' },
      { id: 'bbw', name: 'BBW', slug: 'bbw', count: 892, icon: '💕' },
      { id: 'bdsm', name: 'BDSM', slug: 'bdsm', count: 1245, icon: '🔗' },
      { id: 'big-ass', name: 'Big Ass', slug: 'big-ass', count: 3456, icon: '🍑' },
      { id: 'big-tits', name: 'Big Tits', slug: 'big-tits', count: 4521, icon: '💗' },
      { id: 'blonde', name: 'Blonde', slug: 'blonde', count: 2134, icon: '👱' },
      { id: 'blowjob', name: 'Blowjob', slug: 'blowjob', count: 5678, icon: '💋' },
      { id: 'brunette', name: 'Brunette', slug: 'brunette', count: 1987, icon: '👩' },
      { id: 'compilation', name: 'Compilation', slug: 'compilation', count: 654, icon: '🎞️' },
      { id: 'couple', name: 'Couple', slug: 'couple', count: 1567, icon: '👫' },
      { id: 'creampie', name: 'Creampie', slug: 'creampie', count: 2345, icon: '🍰' },
      { id: 'cumshot', name: 'Cumshot', slug: 'cumshot', count: 3456, icon: '💦' },
      { id: 'ebony', name: 'Ebony', slug: 'ebony', count: 1234, icon: '🖤' },
      { id: 'fetish', name: 'Fetish', slug: 'fetish', count: 987, icon: '👠' },
      { id: 'gangbang', name: 'Gangbang', slug: 'gangbang', count: 876, icon: '👥' },
      { id: 'gay', name: 'Gay', slug: 'gay', count: 1543, icon: '🏳️‍🌈' },
      { id: 'group', name: 'Group', slug: 'group', count: 1122, icon: '👥' },
      { id: 'hardcore', name: 'Hardcore', slug: 'hardcore', count: 4567, icon: '🔥' },
      { id: 'hentai', name: 'Hentai', slug: 'hentai', count: 2345, icon: '🎌' },
      { id: 'indian', name: 'Indian', slug: 'indian', count: 876, icon: '🇮🇳' },
      { id: 'interracial', name: 'Interracial', slug: 'interracial', count: 1678, icon: '🤝' },
      { id: 'japanese', name: 'Japanese', slug: 'japanese', count: 3456, icon: '🇯🇵' },
      { id: 'latina', name: 'Latina', slug: 'latina', count: 1432, icon: '🌶️' },
      { id: 'lesbian', name: 'Lesbian', slug: 'lesbian', count: 2567, icon: '👩‍❤️‍👩' },
      { id: 'massage', name: 'Massage', slug: 'massage', count: 987, icon: '💆' },
      { id: 'mature', name: 'Mature', slug: 'mature', count: 1876, icon: '👩‍🦰' },
      { id: 'milf', name: 'MILF', slug: 'milf', count: 3210, icon: '👩‍👦' },
      { id: 'pov', name: 'POV', slug: 'pov', count: 2134, icon: '👁️' },
      { id: 'public', name: 'Public', slug: 'public', count: 765, icon: '🌳' },
      { id: 'reality', name: 'Reality', slug: 'reality', count: 654, icon: '📸' },
      { id: 'redhead', name: 'Redhead', slug: 'redhead', count: 543, icon: '👩‍🦰' },
      { id: 'rough', name: 'Rough', slug: 'rough', count: 1234, icon: '💪' },
      { id: 'russian', name: 'Russian', slug: 'russian', count: 876, icon: '🇷🇺' },
      { id: 'squirt', name: 'Squirt', slug: 'squirt', count: 1567, icon: '💧' },
      { id: 'teen', name: 'Teen (18+)', slug: 'teen', count: 4321, icon: '🎓' },
      { id: 'threesome', name: 'Threesome', slug: 'threesome', count: 1987, icon: '👯' },
      { id: 'toys', name: 'Toys', slug: 'toys', count: 1456, icon: '🧸' },
      { id: 'vintage', name: 'Vintage', slug: 'vintage', count: 432, icon: '📼' },
      { id: 'webcam', name: 'Webcam', slug: 'webcam', count: 2345, icon: '📹' },
    ]
  }
}
