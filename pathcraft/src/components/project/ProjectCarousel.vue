<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../../composables/useTheme.js'
import { portfolioData } from '../../data/portfolio.js'
import ProjectCover from './ProjectCover.vue'

const emit = defineEmits(['open'])
const { dark } = useTheme()

const projects = portfolioData.projects
const current = ref(0)
const direction = ref('next')

const transitionName = computed(() => `slide-${direction.value}`)
const slide = computed(() => projects[current.value])

const muted = computed(() => dark.value ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)')
const surface = computed(() => dark.value ? '#231811' : '#fff8ec')
const border = computed(() => dark.value ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)')
const fg = computed(() => dark.value ? '#fde6c8' : '#2a1a0c')

function go(index) {
  if (index === current.value) return
  direction.value = index > current.value ? 'next' : 'prev'
  current.value = index
}

function prev() {
  direction.value = 'prev'
  current.value = (current.value - 1 + projects.length) % projects.length
}

function next() {
  direction.value = 'next'
  current.value = (current.value + 1) % projects.length
}

function onKey(e) {
  if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}
</script>

<template>
  <div
    class="rounded-2xl overflow-hidden outline-none"
    :style="{ background: surface, border: `1px solid ${border}` }"
    tabindex="0"
    @keydown="onKey"
    aria-label="Galerie des projets"
  >
    <div class="relative overflow-hidden" style="height: 430px">
      <Transition :name="transitionName">
        <div :key="current" class="carousel-slide absolute inset-0 flex flex-col">

          <button
            class="h-64 shrink-0 w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
            @click="emit('open', slide)"
            :aria-label="`Voir le détail de ${slide.title}`"
          >
            <ProjectCover :project="slide" variant="stripes" />
          </button>

          <div class="flex-1 px-6 py-4 flex flex-col justify-between overflow-hidden">
            <div>
              <div class="flex items-baseline justify-between gap-2 mb-1">
                <h3
                  class="font-display leading-tight truncate"
                  style="font-size: clamp(20px, 2.8vw, 28px)"
                  :style="{ color: fg }"
                >{{ slide.title }}</h3>
                <span class="font-mono text-[9px] tabular-nums shrink-0" :style="{ color: muted }">
                  {{ slide.year }}
                </span>
              </div>
              <p class="font-mono text-[11px] mb-3" style="color: var(--accent)">{{ slide.tagline }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in slide.stack"
                  :key="tech"
                  class="font-mono text-[9px] px-2 py-0.5 rounded"
                  :style="{
                    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    color: muted,
                  }"
                >{{ tech }}</span>
              </div>
            </div>

            <button
              @click="emit('open', slide)"
              class="self-start font-mono text-[10px] uppercase tracking-[.18em] px-3 py-1.5 rounded-lg transition-all duration-150 hover:opacity-80 active:scale-95"
              style="background: var(--accent); color: #fff"
            >Voir le détail →</button>
          </div>
        </div>
      </Transition>
    </div>

    <div
      class="flex items-center justify-between px-5 py-3"
      :style="{ borderTop: `1px solid ${border}` }"
    >
      <button
        @click="prev"
        class="w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-150 hover:opacity-70 active:scale-90"
        :style="{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: fg }"
        aria-label="Projet précédent"
      >←</button>

      <div class="flex items-center gap-2">
        <button
          v-for="(_, i) in projects"
          :key="i"
          @click="go(i)"
          class="h-1.5 rounded-full transition-all duration-300"
          :style="{
            width: current === i ? '20px' : '6px',
            background: current === i ? 'var(--accent)' : (dark ? 'rgba(253,230,200,0.22)' : 'rgba(42,26,12,0.18)'),
          }"
          :aria-label="`Projet ${i + 1}`"
          :aria-current="current === i ? 'true' : undefined"
        />
      </div>

      <button
        @click="next"
        class="w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-150 hover:opacity-70 active:scale-90"
        :style="{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: fg }"
        aria-label="Projet suivant"
      >→</button>
    </div>
  </div>
</template>

<style scoped>
.carousel-slide {
  width: 100%;
  height: 100%;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.32s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-next-enter-from  { transform: translateX(100%); opacity: 0; }
.slide-next-leave-to    { transform: translateX(-100%); opacity: 0; }
.slide-prev-enter-from  { transform: translateX(-100%); opacity: 0; }
.slide-prev-leave-to    { transform: translateX(100%); opacity: 0; }
</style>
