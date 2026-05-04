import { ref, onMounted } from 'vue'
import { portfolioData } from '../data/portfolio.js'

const CACHE_KEY = 'gh-cache-v2'
const CACHE_TTL = 3600 * 1000 // 1h

const GQL_QUERY = `
query($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      nodes {
        ... on Repository {
          name
          description
          primaryLanguage { name color }
          stargazerCount
          forkCount
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
      }
    }
  }
}
`

const LANG_COLORS = {
  TypeScript: '#3178c6', 'C#': '#9b4f96', Vue: '#41b883',
  JavaScript: '#f1e05a', PHP: '#777bb4', Python: '#3572A5',
}

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
      } catch {}
    }

    loading.value = true
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers: authHeaders }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers: authHeaders }),
      ])
      if (!userRes.ok || !reposRes.ok) throw new Error('REST API error')

      const user = await userRes.json()
      const repos = await reposRes.json()

      const langCounts = {}
      repos.forEach((r) => {
        if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
      })
      const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1
      const topLanguages = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          pct: Math.round((count / total) * 100),
          color: LANG_COLORS[name] || '#888',
        }))

      let contributionsLastYear = portfolioData.githubStats.contributionsLastYear
      let pinnedRepos = portfolioData.githubStats.pinnedRepos

      if (token) {
        const gqlRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: GQL_QUERY, variables: { login: username } }),
        })
        if (gqlRes.ok) {
          const { data } = await gqlRes.json()
          if (data?.user) {
            contributionsLastYear =
              data.user.contributionsCollection.contributionCalendar.totalContributions

            const pinned = data.user.pinnedItems.nodes
            if (pinned.length > 0) {
              pinnedRepos = pinned.map((r) => ({
                name: r.name,
                lang: r.primaryLanguage?.name ?? 'Other',
                stars: r.stargazerCount,
                forks: r.forkCount,
                desc: r.description ?? '',
              }))
            }
          }
        }
      }

      const fresh = {
        publicRepos: user.public_repos,
        followers: user.followers,
        contributionsLastYear,
        topLanguages,
        pinnedRepos,
      }

      stats.value = fresh
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: fresh, ts: Date.now() }))
    } catch {
      cached.value = true
    } finally {
      loading.value = false
    }
  })

  return { stats, cached, loading }
}
