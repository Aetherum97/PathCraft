<script setup>
import { useTheme } from '../composables/useTheme.js'

defineProps({
  entries: { type: Array, required: true },
})

const { dark } = useTheme()

const kindColors = {
  milestone: '#C8542C',
  school: '#D89A3D',
  project: '#7c6bff',
  work: '#22c55e',
  now: 'var(--accent)',
}
</script>

<template>
  <div class="relative pl-6">
    <!-- Vertical line -->
    <div
      class="absolute left-2.5 top-1 bottom-1 w-px"
      :style="{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }"
    />

    <div class="space-y-5">
      <div v-for="(entry, i) in entries" :key="i" class="relative">
        <!-- Dot -->
        <div
          class="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full transition-all"
          :style="{
            background: entry.kind === 'now' ? 'var(--accent)' : (dark ? '#231811' : '#fff8ec'),
            border: `1.5px solid var(--accent)`,
            animation: entry.kind === 'now' ? 'pulsering 2s ease-in-out infinite' : 'none',
          }"
        />

        <!-- Content -->
        <div class="flex items-baseline gap-3 flex-wrap">
          <span
            class="font-mono text-[10px] tabular-nums"
            style="color: var(--accent)"
          >{{ entry.year }}</span>

          <span
            class="font-display text-lg"
            :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
          >{{ entry.title }}</span>

          <span
            class="font-mono text-[9px] uppercase tracking-[.2em] px-1.5 py-0.5 rounded"
            :style="{
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)',
            }"
          >{{ entry.label }}</span>
        </div>

        <p
          class="text-[12px] mt-1 leading-relaxed"
          :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
        >{{ entry.description }}</p>
      </div>
    </div>
  </div>
</template>
