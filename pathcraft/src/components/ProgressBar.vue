<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const props = defineProps({
  value: { type: Number, required: true },
})

const { dark } = useTheme()
const width = ref(0)

onMounted(() => {
  setTimeout(() => { width.value = props.value }, 120)
})
</script>

<template>
  <div
    class="w-full h-1.25 rounded-full overflow-hidden"
    :style="{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }"
  >
    <div
      class="h-full rounded-full transition-all duration-1000 ease-out"
      :style="{ width: `${width}%`, background: 'var(--accent)' }"
    />
  </div>
</template>
