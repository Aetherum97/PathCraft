<script setup>
import { useTheme } from '../../composables/useTheme.js'

const props = defineProps({
  project: { type: Object, required: true },
  variant: { type: String, default: 'stripes' }, // 'stripes' | 'block'
})

const { dark } = useTheme()
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Real image if provided -->
    <img
      v-if="project.cover.image"
      :src="project.cover.image"
      :alt="project.title"
      class="w-full h-full object-contain"
      loading="lazy"
      decoding="async"
    />

    <!-- Stripes placeholder -->
    <div
      v-else-if="variant === 'stripes'"
      class="relative w-full h-full flex items-center justify-center"
      :style="{
        background: `repeating-linear-gradient(135deg,
          oklch(${dark ? '0.32 0.06' : '0.78 0.09'} ${project.cover.hue}) 0 14px,
          oklch(${dark ? '0.38 0.07' : '0.86 0.07'} ${project.cover.hue}) 14px 28px)`,
      }"
    >
      <span
        class="font-display italic text-5xl drop-shadow-sm select-none"
        :style="{ color: dark ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.78)' }"
      >{{ project.cover.label }}</span>
      <span
        class="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[.2em]"
        :style="{ color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)' }"
      >{{ project.id }}.cover</span>
    </div>

    <!-- Block placeholder -->
    <div
      v-else
      class="relative w-full h-full flex items-center justify-center"
      :style="{
        background: `oklch(${dark ? '0.32 0.06' : '0.78 0.09'} ${project.cover.hue})`,
      }"
    >
      <span
        class="font-mono text-xs uppercase tracking-[.2em]"
        :style="{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }"
      >{{ project.id }} · cover</span>
      <span
        class="absolute right-3 bottom-3 font-display italic text-3xl select-none"
        :style="{ color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)' }"
      >{{ project.cover.label }}</span>
    </div>
  </div>
</template>
