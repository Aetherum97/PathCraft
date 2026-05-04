<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme.js'
import ThemeToggle from './ThemeToggle.vue'

const { dark } = useTheme()
const route = useRoute()
const mobileOpen = ref(false)

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header
    class="sticky top-0 z-40 px-6 py-4 flex items-center justify-between transition-colors"
    :style="{
      background: dark
        ? 'rgba(26,18,12,0.85)'
        : 'rgba(250,243,232,0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(42,26,12,0.06)'}`,
    }"
  >
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-2.5 no-underline">
      <img
        src="../assets/photo_profil.png"
        alt="Antoine Caps"
        class="w-7 h-7 rounded-lg object-cover select-none"
      />
      <div>
        <div
          class="font-display text-[15px] leading-none"
          :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
        >
          Antoine Caps<span style="color: var(--accent)">.</span>
        </div>
        <div
          class="font-mono text-[9px] uppercase tracking-[.22em] mt-0.5"
          :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
        >DevFolio · 2026</div>
      </div>
    </RouterLink>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-mono text-[11px] uppercase tracking-[.18em] px-3 py-1.5 rounded-full transition-all"
        :style="{
          background: isActive(link.to) ? 'var(--accent)' : 'transparent',
          color: isActive(link.to) ? '#fff' : (dark ? 'rgba(253,230,200,0.75)' : 'rgba(42,26,12,0.75)'),
        }"
      >{{ link.label }}</RouterLink>
      <ThemeToggle class="ml-2" />
    </nav>

    <!-- Mobile: theme + burger -->
    <div class="flex items-center gap-2 md:hidden">
      <ThemeToggle />
      <button
        @click="mobileOpen = !mobileOpen"
        class="w-9 h-9 rounded-full flex items-center justify-center transition"
        :style="{
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          color: dark ? '#fde6c8' : '#2a1a0c',
        }"
        aria-label="Menu"
      >
        <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition-all duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileOpen"
        class="absolute top-full left-0 right-0 p-4 flex flex-col gap-1 md:hidden"
        :style="{
          background: dark ? '#1a120c' : '#faf3e8',
          borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(42,26,12,0.06)'}`,
        }"
      >
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-mono text-[11px] uppercase tracking-[.18em] px-4 py-3 rounded-xl transition"
          :style="{
            background: isActive(link.to) ? 'var(--accent)' : (dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
            color: isActive(link.to) ? '#fff' : (dark ? '#fde6c8' : '#2a1a0c'),
          }"
          @click="mobileOpen = false"
        >{{ link.label }}</RouterLink>
      </nav>
    </Transition>
  </header>
</template>
