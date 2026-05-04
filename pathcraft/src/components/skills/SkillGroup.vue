<script setup>
import { useTheme } from '../../composables/useTheme.js'
import ProgressBar from '../ProgressBar.vue'

defineProps({
  group: { type: Object, required: true },
})

const { dark } = useTheme()
</script>

<template>
  <div>
    <div
      class="font-display text-lg mb-3"
      :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
    >{{ group.title }}</div>

    <div class="space-y-2.5">
      <div v-for="skill in group.items" :key="skill.name">
        <div class="flex items-baseline justify-between mb-1">
          <span
            class="text-[12px]"
            :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
          >{{ skill.name }}</span>
          <span
            class="font-mono text-[9px] tabular-nums"
            :style="{ color: dark ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)' }"
          >{{ skill.level }}</span>
        </div>
        <ProgressBar :value="skill.level" />
      </div>
    </div>
  </div>
</template>
