<template>
  <button
    @click="toggleDarkMode"
    class="p-2 transition-all duration-300 ease-in-out rounded-full text-stone-900 bg-B3 dark:bg-stone-900 dark:text-stone-100 hover:bg-stone-300 dark:hover:bg-stone-700"
  >
    <WiNightClear v-if="!isDarkMode" class="text-2xl" />
    <WiDaySunny v-else class="text-2xl" />
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { setThemeCookie, applyThemeFromCookie } from '@/utils/themeCookieUtil.js';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    setThemeCookie('dark');
  } else {
    document.documentElement.classList.remove('dark');
    setThemeCookie('light');
  }
};

onMounted(() => {
  const theme = applyThemeFromCookie();
  if (theme) {
    isDarkMode.value = theme === 'dark';
  } else {
    // Initialize based on system preference
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    }
  }
});
</script>
