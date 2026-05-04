<script setup>
import { useTheme } from '../composables/useTheme.js'
import { useGitHub } from '../composables/useGitHub.js'
import { portfolioData } from '../data/portfolio.js'

const { dark } = useTheme()
const { stats, cached, loading } = useGitHub()
</script>

<template>
  <div
    class="rounded-2xl p-5"
    :style="{
      background: dark ? '#231811' : '#fff8ec',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)'}`,
    }"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="font-mono text-[10px] uppercase tracking-[.22em] flex items-center gap-2"
        :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
      >
        <span class="w-6 h-px" style="background: var(--accent)" />
        GitHub · @{{ portfolioData.identity.github }}
      </div>
      <span
        class="font-mono text-[9px] px-2 py-0.5 rounded-full"
        :style="{
          background: cached ? (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)') : 'rgba(34,197,94,0.15)',
          color: cached ? (dark ? 'rgba(253,230,200,0.4)' : 'rgba(42,26,12,0.4)') : '#16a34a',
        }"
      >{{ loading ? 'chargement…' : (cached ? 'cache' : 'live') }}</span>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-3 gap-4 mb-5">
      <div v-for="stat in [
        { label: 'Repos', val: stats.publicRepos },
        { label: 'Followers', val: stats.followers },
        { label: 'Contribs / an', val: stats.contributionsLastYear },
      ]" :key="stat.label">
        <div
          class="font-display tabular-nums leading-none text-[28px]"
          style="color: var(--accent)"
        >{{ stat.val }}</div>
        <div
          class="font-mono text-[9px] uppercase tracking-[.18em] mt-1"
          :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
        >{{ stat.label }}</div>
      </div>
    </div>

    <!-- Language bar -->
    <div class="flex h-2 rounded-full overflow-hidden mb-2.5">
      <div
        v-for="lang in stats.topLanguages"
        :key="lang.name"
        :style="{ width: `${lang.pct}%`, background: lang.color }"
        :title="`${lang.name} ${lang.pct}%`"
      />
    </div>

    <div class="flex flex-wrap gap-x-3 gap-y-1">
      <span
        v-for="lang in stats.topLanguages"
        :key="lang.name"
        class="font-mono text-[10px] flex items-center gap-1.5"
        :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
      >
        <span class="w-1.5 h-1.5 rounded-full" :style="{ background: lang.color }" />
        {{ lang.name }} {{ lang.pct }}%
      </span>
    </div>

    <!-- Pinned repos -->
    <div class="mt-5 space-y-2">
      <div
        class="font-mono text-[10px] uppercase tracking-[.2em] opacity-50 mb-2"
        :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
      >Repos épinglés</div>
      <a
        v-for="repo in stats.pinnedRepos"
        :key="repo.name"
        :href="`https://github.com/${portfolioData.identity.github}/${repo.name}`"
        target="_blank"
        rel="noopener"
        class="block rounded-xl px-3.5 py-2.5 transition hover:-translate-y-0.5 hover:opacity-90"
        :style="{
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        }"
      >
        <div class="flex items-center justify-between gap-2">
          <span
            class="font-mono text-[11px] font-semibold"
            :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
          >{{ repo.name }}</span>
          <div class="flex items-center gap-2">
            <span
              class="font-mono text-[9px] px-1.5 py-0.5 rounded"
              :style="{
                background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                color: dark ? 'rgba(253,230,200,0.6)' : 'rgba(42,26,12,0.6)',
              }"
            >{{ repo.lang }}</span>
            <span class="font-mono text-[9px]" :style="{ color: dark ? 'rgba(253,230,200,0.5)' : 'rgba(42,26,12,0.5)' }">
              ★ {{ repo.stars }}
            </span>
          </div>
        </div>
        <p class="text-[11px] mt-0.5 opacity-60">{{ repo.desc }}</p>
      </a>
    </div>
  </div>
</template>
