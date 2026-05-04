<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme.js'
import ProjectCover from './ProjectCover.vue'

const props = defineProps({
  project: { type: Object, default: null },
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
const { dark } = useTheme()

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && project"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        :style="{
          background: dark ? 'rgba(20,12,8,0.72)' : 'rgba(40,20,8,0.42)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }"
        @click.self="emit('close')"
      >
        <div
          class="relative w-[88%] max-w-140 rounded-2xl overflow-hidden"
          :style="{
            background: dark ? '#1a120c' : '#fdf8f1',
            color: dark ? '#fde6c8' : '#2a1a0c',
            boxShadow: dark
              ? '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)'
              : '0 30px 80px rgba(80,40,20,0.25), 0 0 0 1px rgba(0,0,0,0.04)',
            animation: 'popIn 0.25s cubic-bezier(.2,.8,.3,1.2)',
          }"
        >
          <button
            @click="emit('close')"
            class="absolute right-3 top-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-lg leading-none transition hover:scale-110"
            :style="{
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            }"
            aria-label="Fermer"
          >x</button>

          <div class="h-36 relative">
            <ProjectCover :project="project" variant="stripes" />
          </div>

          <div class="px-6 pt-5 pb-6">
            <div class="flex items-baseline justify-between gap-3 mb-1">
              <h3 class="font-display text-2xl leading-tight">{{ project.title }}</h3>
              <span class="font-mono text-[10px] uppercase tracking-[.2em] opacity-60 shrink-0">
                {{ project.year }}
              </span>
            </div>

            <p class="font-mono text-[11px] uppercase tracking-[.18em] mb-4" style="color: var(--accent)">
              {{ project.tagline }}
            </p>

            <p class="text-sm leading-relaxed mb-4 opacity-85">{{ project.description }}</p>

            <div class="mb-4">
              <div class="font-mono text-[10px] uppercase tracking-[.2em] opacity-50 mb-2">Highlights</div>
              <ul class="space-y-1.5 text-sm">
                <li v-for="h in project.highlights" :key="h" class="flex gap-2">
                  <span style="color: var(--accent)">—</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>

            <div class="mb-5">
              <div class="font-mono text-[10px] uppercase tracking-[.2em] opacity-50 mb-2">Stack</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="s in project.stack"
                  :key="s"
                  class="font-mono text-[10px] px-2 py-1 rounded-md"
                  :style="{
                    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  }"
                >{{ s }}</span>
              </div>
            </div>

            <div class="flex gap-2">
              <a
                v-if="project.links.live"
                :href="project.links.live"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 rounded-lg font-mono text-xs text-white transition hover:opacity-90"
                style="background: var(--accent)"
              >Voir le live →</a>
              <span
                v-else
                class="px-4 py-2 rounded-lg font-mono text-xs opacity-40 cursor-default"
                :style="{
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                }"
              >Live non disponible</span>

              <a
                v-if="project.links.repo"
                :href="project.links.repo"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 rounded-lg font-mono text-xs transition hover:opacity-80"
                :style="{
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                  color: dark ? '#fde6c8' : '#2a1a0c',
                }"
              >Code source</a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
