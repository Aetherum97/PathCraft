import { ref, onMounted } from 'vue'
import { portfolioData } from '../data/portfolio.js'

const CACHE_KEY = 'gh-cache-v1'
const CACHE_TTL = 3600 * 1000 // 1h

export function useGitHub(username = portfolioData.identity.github) {
  const stats = ref(portfolioData.githubStats)
  const cached = ref(false)
  const loading = ref(false)

  onMounted(async () => {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      try {
        const { data, ts } = JSON.parse(raw)
        if (Date.now() - ts < CACHE_TTL) {
          stats.value = data
          cached.value = true
          return
        }
      } catch {
        // stale cache
      }
    }

    loading.value = true
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      ])
      if (!userRes.ok || !reposRes.ok) throw new Error('API limit or down')

      const user = await userRes.json()
      const repos = await reposRes.json()

      const langCounts = {}
      repos.forEach((r) => {
        if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
      })
      const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1
      const langColors = {
        TypeScript: '#3178c6', 'C#': '#9b4f96', Vue: '#41b883',
        JavaScript: '#f1e05a', PHP: '#777bb4', Python: '#3572A5',
      }
      const topLanguages = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          pct: Math.round((count / total) * 100),
          color: langColors[name] || '#888',
        }))

      const fresh = {
        publicRepos: user.public_repos,
        followers: user.followers,
        contributionsLastYear: portfolioData.githubStats.contributionsLastYear,
        topLanguages,
        pinnedRepos: portfolioData.githubStats.pinnedRepos,
      }

      stats.value = fresh
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: fresh, ts: Date.now() }))
    } catch {
      // fallback to static data — already set
      cached.value = true
    } finally {
      loading.value = false
    }
  })

  return { stats, cached, loading }
}
