import { ref, onMounted } from 'vue'

const CACHE_KEY = 'unsplash-hero-v1'
const CACHE_TTL = 24 * 3600 * 1000 // 24h

export function useUnsplash(query = 'developer workspace') {
  const photo = ref(null)
  const loading = ref(false)

  async function loadPhoto(force = false) {
    const key = import.meta.env.VITE_UNSPLASH_KEY
    if (!key) return

    if (!force) {
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (raw) {
          const { data, ts } = JSON.parse(raw)
          if (Date.now() - ts < CACHE_TTL) {
            photo.value = data
            return
          }
        }
      } catch {}
    }

    loading.value = true
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${key}`
      )
      if (!res.ok) throw new Error('Unsplash API error')

      const json = await res.json()
      photo.value = {
        url: json.urls.regular,
        color: json.color,
        photographer: json.user.name,
        photographerUrl: `${json.user.links.html}?utm_source=PathCraft&utm_medium=referral`,
        unsplashUrl: `${json.links.html}?utm_source=PathCraft&utm_medium=referral`,
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: photo.value, ts: Date.now() }))
    } catch {
    } finally {
      loading.value = false
    }
  }

  onMounted(() => loadPhoto())

  return { photo, loading, refresh: () => loadPhoto(true) }
}
