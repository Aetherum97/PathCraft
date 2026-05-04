<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import { portfolioData } from '../data/portfolio.js'
import ContactForm from '../components/ContactForm.vue'

const { dark } = useTheme()
const muted = computed(() => dark.value ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)')
const cardBg = computed(() => dark.value ? '#231811' : '#fff8ec')
const borderColor = computed(() => dark.value ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)')

const links = [
  {
    label: 'Email',
    val: portfolioData.identity.email,
    href: `mailto:${portfolioData.identity.email}`,
  },
  {
    label: 'GitHub',
    val: `@${portfolioData.identity.github}`,
    href: `https://github.com/${portfolioData.identity.github}`,
  },
  {
    label: 'LinkedIn',
    val: `/${portfolioData.identity.linkedin}`,
    href: `https://linkedin.com/in/${portfolioData.identity.linkedin}`,
  },
  {
    label: 'CV',
    val: 'Télécharger ↓',
    href: portfolioData.identity.cvUrl,
  },
]
</script>

<template>
  <div class="stagger max-w-3xl mx-auto px-6 py-8 space-y-6">

    <!-- Header -->
    <section class="pt-2">
      <div
        class="font-mono text-[10px] uppercase tracking-[.22em] mb-3 flex items-center gap-2"
        :style="{ color: muted }"
      >
        <span class="w-6 h-px inline-block" style="background: var(--accent)" />
        Contact
      </div>
      <h2
        class="font-display leading-[1]"
        :style="{
          fontSize: 'clamp(34px, 4.6vw, 52px)',
          color: dark ? '#fde6c8' : '#2a1a0c',
        }"
      >
        Un projet, une question,<br />
        <em style="color: var(--accent)">une opportunité</em> ?
      </h2>
      <p class="text-[13px] leading-relaxed mt-3 max-w-[440px]" :style="{ color: muted }">
        Je réponds sous 48h. Tu peux aussi me joindre directement sur les réseaux ci-dessous.
      </p>
    </section>

    <!-- Form + links -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
      <ContactForm />

      <!-- Direct links -->
      <div class="space-y-2.5">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :download="link.label === 'CV' ? '' : undefined"
          :target="link.label !== 'CV' && link.label !== 'Email' ? '_blank' : undefined"
          :rel="link.label !== 'CV' && link.label !== 'Email' ? 'noopener' : undefined"
          class="block rounded-xl px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:opacity-90 no-underline"
          :style="{
            background: cardBg,
            border: `1px solid ${borderColor}`,
          }"
        >
          <div
            class="font-mono text-[9px] uppercase tracking-[.2em]"
            :style="{ color: muted }"
          >{{ link.label }}</div>
          <div
            class="font-display text-base mt-0.5"
            :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
          >{{ link.val }}</div>
        </a>
      </div>
    </section>

  </div>
</template>
