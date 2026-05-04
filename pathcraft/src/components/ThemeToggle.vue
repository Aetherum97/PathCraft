<script setup>
import { useTheme } from '../composables/useTheme.js'

const { dark, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
    :style="{
      background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      color: dark ? '#fde6c8' : '#2a1a0c',
    }"
    :aria-label="dark ? 'Passer en mode clair' : 'Passer en mode sombre'"
  >
    <svg v-if="dark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  </button>
</template>
