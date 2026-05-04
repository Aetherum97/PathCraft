<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import { portfolioData } from '../data/portfolio.js'
import ProjectCard from '../components/project/ProjectCard.vue'
import ProjectModal from '../components/project/ProjectModal.vue'
import GitHubStats from '../components/GitHubStats.vue'

const { dark } = useTheme()
const muted = computed(() => dark.value ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)')
const cardBg = computed(() => dark.value ? '#231811' : '#fff8ec')
const borderColor = computed(() => dark.value ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)')

const activeFilter = ref('all')
const openProject = ref(null)

const allTags = computed(() => {
  const tags = new Set(portfolioData.projects.flatMap(p => p.tags))
  return ['all', ...tags]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return portfolioData.projects
  return portfolioData.projects.filter(p => p.tags.includes(activeFilter.value))
})
</script>

<template>
  <div class="stagger max-w-3xl mx-auto px-6 py-8 space-y-8">

    <!-- Header -->
    <section>
      <div class="flex items-baseline justify-between mb-1">
        <h2
          class="font-display leading-[1]"
          :style="{
            fontSize: 'clamp(36px, 4.6vw, 52px)',
            color: dark ? '#fde6c8' : '#2a1a0c',
          }"
        >
          <em style="color: var(--accent)">Quatre</em> projets.
        </h2>
        <span class="font-mono text-[10px]" :style="{ color: muted }">2024 — 2026</span>
      </div>
      <p class="text-[13px] leading-relaxed mt-1 max-w-[460px]" :style="{ color: muted }">
        Une sélection — études, alternance et expérimentations. Clique pour le détail.
      </p>

      <!-- Tag filters -->
      <div class="flex flex-wrap gap-1.5 mt-4">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="activeFilter = tag"
          class="font-mono text-[10px] uppercase tracking-[.2em] px-2.5 py-1 rounded-full transition-all"
          :style="{
            background: activeFilter === tag ? 'var(--accent)' : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
            color: activeFilter === tag ? '#fff' : muted,
          }"
        >{{ tag }}</button>
      </div>
    </section>

    <!-- Project grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 translate-y-3"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          card-style="stripes"
          @open="openProject = $event"
        />
      </TransitionGroup>
    </section>

    <!-- GitHub Stats -->
    <section>
      <div
        class="font-mono text-[10px] uppercase tracking-[.22em] mb-4 flex items-center gap-2"
        :style="{ color: muted }"
      >
        <span class="w-6 h-px inline-block" style="background: var(--accent)" />
        Activité GitHub
      </div>
      <GitHubStats />
    </section>

    <!-- Modal (Teleport → body, doit être dans le root unique) -->
    <ProjectModal
      :project="openProject"
      :open="!!openProject"
      @close="openProject = null"
    />

  </div>
</template>
