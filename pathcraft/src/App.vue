<script setup>
import { useTheme } from './composables/useTheme.js'
import AppNav from './components/AppNav.vue'

// init theme (applies dark class to <html> on load)
useTheme()
</script>

<template>
  <div class="min-h-screen transition-colors duration-300">
    <!-- Warm gradient blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div
        class="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full"
        style="
          background: radial-gradient(circle, rgba(200,84,44,0.2) 0%, transparent 70%);
          filter: blur(40px);
          animation: float 8s ease-in-out infinite;
        "
      />
      <div
        class="absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full"
        style="
          background: radial-gradient(circle, oklch(0.85 0.1 55) 0%, transparent 70%);
          filter: blur(50px);
          animation: float 11s ease-in-out infinite reverse;
        "
      />
    </div>

    <AppNav />

    <main>
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          leave-active-class="transition-all duration-200 ease-in"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="mt-16 py-8 text-center">
      <p
        class="font-mono text-[10px] uppercase tracking-[.2em]"
        style="color: rgba(150,100,60,0.5)"
      >
        Antoine Caps · {{ new Date().getFullYear() }} · Fait avec Vue 3 &amp; Tailwind
      </p>
    </footer>
  </div>
</template>
