<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import ProjectModal from '../components/project/ProjectModal.vue'
import ProjectCarousel from '../components/project/ProjectCarousel.vue'
import GitHubStats from '../components/GitHubStats.vue'

const { dark } = useTheme()
const muted = computed(() => dark.value ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)')

const openProject = ref(null)
</script>

<template>
  <div class="stagger max-w-3xl mx-auto px-6 py-8 space-y-8">

    <section>
      <div class="flex items-baseline justify-between mb-1">
        <h2
          class="font-display leading-none"
          :style="{
            fontSize: 'clamp(36px, 4.6vw, 52px)',
            color: dark ? '#fde6c8' : '#2a1a0c',
          }"
        >
          <em style="color: var(--accent)">Quatre</em> projets.
        </h2>
        <span class="font-mono text-[10px]" :style="{ color: muted }">2024 — 2026</span>
      </div>
      <p class="text-[13px] leading-relaxed mt-1" :style="{ color: muted }">
        Une sélection — études, alternance et expérimentations. Clique pour le détail.
      </p>
    </section>

    <ProjectCarousel @open="openProject = $event" />

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

    <ProjectModal
      :project="openProject"
      :open="!!openProject"
      @close="openProject = null"
    />

  </div>
</template>
