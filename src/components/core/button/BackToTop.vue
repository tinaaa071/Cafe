<template>
    <transition name="fade">
      <button
        v-if="showButton"
        @click="scrollToTop"
        class="fixed inline-flex items-center justify-center gap-1.5 p-2.5 text-white transition-all duration-300 ease-in-out border-2 border-white rounded-full shadow-md sm:py-4 sm:px-3 sm:flex-col bg-stone-950/90 dark:bg-stone-950/90 backdrop-blur-md bottom-6 right-6 sm:bottom-8 sm:right-8 xl:bottom-12 xl:right-12 hover:bg-stone-200/20 mix-blend-difference group dark:hover:bg-stone-200/20"
      >
        <pajamas-arrow-up class="text-sm transition-transform transform group-hover:-translate-y-1 sm:text-md" />
        <p class="text-xs font-semibold tracking-widest">
          TOP
        </p>
      </button>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const showButton = ref(false);
  
  const checkScroll = () => {
    showButton.value = window.scrollY > 200; // Show button after 200px scroll
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    window.addEventListener('scroll', checkScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    @apply transition-opacity duration-500; /* Tailwind utility classes for smooth transitions */
  }
  .fade-enter-from, .fade-leave-to {
    @apply opacity-0; /* Start and end states for fade transition */
  }
  </style>
  