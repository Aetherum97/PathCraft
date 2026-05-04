<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { dark } = useTheme()

const vals = reactive({ name: '', email: '', message: '' })
const touched = reactive({ name: false, email: false, message: false })
const status = ref('idle') // idle | sending | ok | err

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = "Ton nom, s'il te plaît."
  else if (v.name.trim().length < 2) e.name = 'Un peu court, non ?'
  if (!v.email.trim()) e.email = 'Email requis.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Format d'email invalide."
  if (!v.message.trim()) e.message = 'Dis-moi un mot.'
  else if (v.message.trim().length < 10) e.message = 'Au moins 10 caractères.'
  return e
}

const errs = computed(() => validate(vals))

function onBlur(field) { touched[field] = true }

async function submit(e) {
  e.preventDefault()
  touched.name = touched.email = touched.message = true
  if (Object.keys(validate(vals)).length) return

  status.value = 'sending'
  try {
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: vals.name, email: vals.email, message: vals.message }),
      })
    } else {
      await new Promise((r) => setTimeout(r, 900))
    }
    status.value = 'ok'
    vals.name = vals.email = vals.message = ''
    touched.name = touched.email = touched.message = false
    setTimeout(() => { status.value = 'idle' }, 4000)
  } catch {
    status.value = 'err'
    setTimeout(() => { status.value = 'idle' }, 4000)
  }
}

function inputStyle(field) {
  const hasErr = touched[field] && errs.value[field]
  return {
    background: dark.value ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
    border: `1px solid ${hasErr ? '#e07a5f' : (dark.value ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)')}`,
    color: dark.value ? '#fde6c8' : '#2a1a0c',
    outline: 'none',
  }
}
</script>

<template>
  <!-- Success state -->
  <div
    v-if="status === 'ok'"
    class="rounded-2xl p-8 text-center"
    :style="{
      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
      border: `1px dashed var(--accent)`,
      animation: 'popIn 0.3s',
    }"
  >
    <div class="text-4xl mb-2" style="color: var(--accent)">✓</div>
    <div class="font-display text-xl mb-1">Message envoyé.</div>
    <div class="font-mono text-[11px] opacity-60">Je te réponds sous 48h.</div>
  </div>

  <!-- Error state -->
  <div
    v-else-if="status === 'err'"
    class="rounded-2xl p-6 text-center"
    :style="{
      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
      border: '1px dashed #e07a5f',
    }"
  >
    <div class="text-2xl mb-2 text-[#e07a5f]">!</div>
    <div class="font-display text-lg mb-1">Erreur d'envoi.</div>
    <div class="font-mono text-[11px] opacity-60">Essaie par email directement.</div>
  </div>

  <!-- Form -->
  <form v-else @submit="submit" class="space-y-4" novalidate>
    <div>
      <label class="font-mono text-[10px] uppercase tracking-[.2em] opacity-60 block mb-1.5">
        Nom
      </label>
      <input
        v-model="vals.name"
        @blur="onBlur('name')"
        type="text"
        placeholder="Antoine"
        class="w-full font-mono text-sm rounded-lg px-3 py-2.5 transition"
        :style="inputStyle('name')"
        :aria-invalid="!!(touched.name && errs.name)"
        :aria-describedby="errs.name ? 'err-name' : undefined"
      />
      <p v-if="touched.name && errs.name" id="err-name" class="font-mono text-[10px] mt-1" style="color: #e07a5f">
        {{ errs.name }}
      </p>
    </div>

    <div>
      <label class="font-mono text-[10px] uppercase tracking-[.2em] opacity-60 block mb-1.5">
        Email
      </label>
      <input
        v-model="vals.email"
        @blur="onBlur('email')"
        type="email"
        placeholder="hello@..."
        class="w-full font-mono text-sm rounded-lg px-3 py-2.5 transition"
        :style="inputStyle('email')"
        :aria-invalid="!!(touched.email && errs.email)"
        :aria-describedby="errs.email ? 'err-email' : undefined"
      />
      <p v-if="touched.email && errs.email" id="err-email" class="font-mono text-[10px] mt-1" style="color: #e07a5f">
        {{ errs.email }}
      </p>
    </div>

    <div>
      <label class="font-mono text-[10px] uppercase tracking-[.2em] opacity-60 block mb-1.5">
        Message
      </label>
      <textarea
        v-model="vals.message"
        @blur="onBlur('message')"
        rows="4"
        placeholder="Parle-moi de ton projet…"
        class="w-full font-mono text-sm rounded-lg px-3 py-2.5 resize-none transition"
        :style="inputStyle('message')"
        :aria-invalid="!!(touched.message && errs.message)"
        :aria-describedby="errs.message ? 'err-msg' : undefined"
      />
      <p v-if="touched.message && errs.message" id="err-msg" class="font-mono text-[10px] mt-1" style="color: #e07a5f">
        {{ errs.message }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="status === 'sending'"
      class="w-full rounded-lg font-mono text-xs uppercase tracking-[.18em] py-3 text-white transition hover:opacity-90 disabled:opacity-60"
      style="background: var(--accent)"
    >
      {{ status === 'sending' ? 'Envoi…' : 'Envoyer →' }}
    </button>
  </form>
</template>
