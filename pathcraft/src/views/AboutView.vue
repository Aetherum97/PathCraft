<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import { portfolioData } from '../data/portfolio.js'
import SkillGroup from '../components/skills/SkillGroup.vue'
import Timeline from '../components/Timeline.vue'

const { dark } = useTheme()
const muted = computed(() => dark.value ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)')
const cardBg = computed(() => dark.value ? '#231811' : '#fff8ec')
const borderColor = computed(() => dark.value ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)')
</script>

<template>
  <div class="stagger max-w-3xl mx-auto px-6 py-8 space-y-8">

    <section class="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-5 items-start">
      <div class="aspect-3/4 rounded-2xl overflow-hidden">
        <img
          src="../assets/photo_profil.png"
          alt="Antoine Caps"
          class="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <div>
        <div
          class="font-mono text-[10px] uppercase tracking-[.22em] mb-3 flex items-center gap-2"
          :style="{ color: muted }"
        >
          <span class="w-6 h-px inline-block" style="background: var(--accent)" />
          Bio
        </div>
        <h2
          class="font-display leading-none mb-3"
          :style="{
            fontSize: 'clamp(32px, 4.4vw, 48px)',
            color: dark ? '#fde6c8' : '#2a1a0c',
          }"
        >
          Du cuisinier <em style="color: var(--accent)">au clavier</em>.
        </h2>
        <p class="text-[13px] leading-relaxed" :style="{ color: muted }">
          J'ai pivoté vers le code en 2022. BTS DWWM, Bachelor Concepteur développeur d'application, Master Architecte de Systèmes d'information en alternance —
          j'avance par projets concrets, en cherchant toujours le détail qui rend
          une interface naturelle. Je crois aux APIs propres, aux composants
          réutilisables, et au Clean Code.
        </p>
      </div>
    </section>

    <section>
      <div
        class="font-mono text-[10px] uppercase tracking-[.22em] mb-5 flex items-center gap-2"
        :style="{ color: muted }"
      >
        <span class="w-6 h-px inline-block" style="background: var(--accent)" />
        Compétences
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        <SkillGroup
          v-for="group in portfolioData.skillGroups"
          :key="group.id"
          :group="group"
        />
      </div>
    </section>

    <section>
      <div
        class="font-mono text-[10px] uppercase tracking-[.22em] mb-5 flex items-center gap-2"
        :style="{ color: muted }"
      >
        <span class="w-6 h-px inline-block" style="background: var(--accent)" />
        Parcours
      </div>

      <Timeline :entries="portfolioData.timeline" />
    </section>

    <section
      class="rounded-2xl p-5 flex flex-wrap gap-3"
      :style="{ background: cardBg, border: `1px solid ${borderColor}` }"
    >
      <a
        :href="`https://github.com/${portfolioData.identity.github}`"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-2 font-mono text-[11px] px-4 py-2 rounded-full transition hover:opacity-80"
        :style="{
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          color: dark ? '#fde6c8' : '#2a1a0c',
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub
      </a>
      <a
        :href="`https://linkedin.com/in/${portfolioData.identity.linkedin}`"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-2 font-mono text-[11px] px-4 py-2 rounded-full transition hover:opacity-80"
        :style="{
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          color: dark ? '#fde6c8' : '#2a1a0c',
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
      <a
        :href="portfolioData.identity.cvUrl"
        download
        class="flex items-center gap-2 font-mono text-[11px] px-4 py-2 rounded-full text-white transition hover:opacity-90"
        style="background: var(--accent)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
        Télécharger le CV
      </a>
    </section>

  </div>
</template>
