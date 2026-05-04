<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme.js'
import { useUnsplash } from '../composables/useUnsplash.js'

const { dark } = useTheme()
const router = useRouter()
const { photo, loading, refresh } = useUnsplash('developer workspace')

const muted = computed(() => dark.value ? 'rgba(253,230,200,0.65)' : 'rgba(42,26,12,0.65)')
const cardBg = computed(() => dark.value ? '#231811' : '#fff8ec')
const borderColor = computed(() => dark.value ? 'rgba(255,255,255,0.08)' : 'rgba(42,26,12,0.08)')
const pageBg = computed(() => dark.value ? '#1a120c' : '#faf3e8')
</script>

<template>
  <div class="stagger max-w-3xl mx-auto px-6 py-8 space-y-6">

    <section class="relative pt-6 pb-10 rounded-2xl overflow-hidden">

      <Transition
        enter-active-class="transition-opacity duration-700"
        enter-from-class="opacity-0"
      >
        <div v-if="photo" class="absolute inset-0 z-0 pointer-events-none">
          <img
            :src="photo.url"
            alt=""
            aria-hidden="true"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0"
            :style="{
              background: dark
                ? `linear-gradient(105deg, ${pageBg} 38%, rgba(26,18,12,0.45))`
                : `linear-gradient(105deg, ${pageBg} 38%, rgba(250,243,232,0.45))`,
            }"
          />
        </div>
      </Transition>

      <div class="relative z-10 px-6">
        <div
          class="font-mono text-[10px] uppercase tracking-[.3em] mb-5 flex items-center gap-2"
          :style="{ color: muted }"
        >
          <span class="w-6 h-px inline-block" style="background: var(--accent)" />
          Portfolio · Édition 2026
        </div>

        <h1
          class="font-display leading-[0.92] tracking-tight"
          :style="{
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            color: dark ? '#fde6c8' : '#2a1a0c',
          }"
        >
          Développeur<br />
          <em style="color: var(--accent)">reconverti</em>,<br />
          passionné &amp; investi.
        </h1>

        <p class="mt-5 max-w-120 text-[15px] leading-relaxed" :style="{ color: muted }">
          Développeur web full-stack en alternance. Je crée des interfaces soignées
          en <em class="font-display">Vue</em>, des APIs propres
          en <em class="font-display">.NET</em>, et j'aime quand le code raconte une histoire.
        </p>

        <div class="flex items-center gap-3 mt-6 flex-wrap">
          <button
            @click="router.push('/portfolio')"
            class="px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[.18em] text-white transition-all hover:scale-[1.02] hover:opacity-90"
            style="background: var(--accent)"
          >
            Voir mes projets →
          </button>
          <button
            @click="router.push('/contact')"
            class="px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[.18em] transition hover:opacity-80"
            :style="{ border: '1px solid var(--accent)', color: 'var(--accent)' }"
          >
            Me contacter
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition-opacity duration-500"
        enter-from-class="opacity-0"
      >
        <div v-if="photo" class="absolute bottom-2.5 right-3 z-10 flex items-center gap-2">
          <div class="font-mono text-[8px] flex items-center gap-1" :style="{ color: muted }">
            <a
              :href="photo.photographerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:underline"
            >{{ photo.photographer }}</a>
            <span class="opacity-40">·</span>
            <a
              :href="photo.unsplashUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="opacity-60 hover:underline"
            >Unsplash</a>
          </div>
          <button
            @click="refresh"
            :disabled="loading"
            class="w-6 h-6 rounded-full flex items-center justify-center text-[13px] transition-all hover:opacity-80 disabled:opacity-30"
            :class="{ 'animate-spin': loading }"
            :style="{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: muted }"
            aria-label="Nouvelle photo Unsplash"
          >↺</button>
        </div>
      </Transition>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      <button
        @click="router.push('/about')"
        class="text-left rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md w-full"
        :style="{ background: cardBg, border: `1px solid ${borderColor}` }"
      >
        <div class="font-mono text-[9px] uppercase tracking-[.22em] mb-3" :style="{ color: muted }">
          01 · À propos
        </div>
        <div class="font-display text-2xl leading-tight mb-2" :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }">
          Le <em style="color: var(--accent)">parcours</em> derrière le code.
        </div>
        <div class="text-[12px] leading-relaxed" :style="{ color: muted }">
          Reconversion, BTS, alternance — quatre ans à apprendre, à casser, à recommencer.
        </div>
        <div class="mt-4 font-mono text-[10px]" style="color: var(--accent)">Lire la bio →</div>
      </button>

      <button
        @click="router.push('/portfolio')"
        class="text-left rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden w-full"
        :style="{
          background: dark
            ? 'linear-gradient(135deg, rgba(200,84,44,0.15), transparent)'
            : 'linear-gradient(135deg, rgba(200,84,44,0.12), transparent)',
          border: `1px solid ${borderColor}`,
        }"
      >
        <div class="font-mono text-[9px] uppercase tracking-[.22em] mb-3" :style="{ color: muted }">
          02 · Portfolio
        </div>
        <div class="font-display text-2xl leading-tight mb-2" :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }">
          <em>Quatre projets</em>,<br />quatre univers.
        </div>
        <div class="text-[12px] leading-relaxed" :style="{ color: muted }">
          TeintExpress, Tribuneo, PassionManga, TemplateCleanArchi.
        </div>
        <div class="mt-4 font-mono text-[10px]" style="color: var(--accent)">Explorer →</div>
      </button>
    </section>

    <section
      class="rounded-2xl p-5"
      :style="{ background: cardBg, border: `1px solid ${borderColor}` }"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span
            class="w-1.5 h-1.5 rounded-full shrink-0"
            style="background: #22c55e; animation: blink 1.6s infinite"
          />
          <span class="font-mono text-[10px] uppercase tracking-[.22em]" :style="{ color: muted }">
            En ce moment
          </span>
        </div>
        <span class="font-mono text-[10px]" :style="{ color: muted }">mai · 2026</span>
      </div>
      <div
        class="mt-2 font-display text-lg leading-snug"
        :style="{ color: dark ? '#fde6c8' : '#2a1a0c' }"
      >
        TeintExpress — Mise en production chez le client.
      </div>
    </section>

  </div>
</template>
