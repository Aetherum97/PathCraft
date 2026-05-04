import { ref, watchEffect } from 'vue'

const dark = ref(
  localStorage.getItem('theme-dark') === 'true' ||
  (localStorage.getItem('theme-dark') === null &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
)

watchEffect(() => {
  document.documentElement.classList.toggle('dark', dark.value)
  localStorage.setItem('theme-dark', String(dark.value))
})

export function useTheme() {
  return {
    dark,
    toggle: () => { dark.value = !dark.value },
  }
}
