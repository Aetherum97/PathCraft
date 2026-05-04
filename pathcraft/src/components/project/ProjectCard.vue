<script setup>
import { useTheme } from '../../composables/useTheme.js'
import ProjectCover from './ProjectCover.vue'

defineProps({
  project: { type: Object, required: true },
  cardStyle: { type: String, default: 'stripes' },
})

const emit = defineEmits(['open'])
const { dark } = useTheme()
</script>

<template>
  <button
    @click="emit('open', project)"
    class="group text-left rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 w-full"
    :style="{
      background: dark ? '#231811' : '#fff8ec',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)'}`,
    }"
  >
    <!-- Cover -->
    <div :class="cardStyle === 'tall' ? 'h-32' : 'h-24'">
      <ProjectCover
        :project="project"
        :variant="cardStyle === 'block' ? 'block' : 'stripes'"
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      <div class="flex items-baseline justify-between gap-2">
        <h3
          class="font-display text-lg leading-tight"
          :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
        >{{ project.title }}</h3>
        <span
          class="font-mono text-[9px] tabular-nums shrink-0"
          :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
        >{{ project.year }}</span>
      </div>

      <div class="font-mono text-[10px] mt-1 mb-2.5" style="color: var(--accent)">
        {{ project.tagline }}
      </div>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="tech in project.stack.slice(0, 3)"
          :key="tech"
          class="font-mono text-[9px] px-1.5 py-0.5 rounded"
          :style="{
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)',
          }"
        >{{ tech }}</span>
        <span
          v-if="project.stack.length > 3"
          class="font-mono text-[9px] px-1.5 py-0.5"
          :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
        >+{{ project.stack.length - 3 }}</span>
      </div>
    </div>
  </button>
</template>
