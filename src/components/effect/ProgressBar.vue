<template>
    <div class="fixed top-0 left-0 w-full h-1.5 bg-stone-100/50  z-50">
      <div class="h-full transition-all duration-300 ease-in-out bg-stone-800 " :style="{ width: progress + '%' }"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const progress = ref(0);
  
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    progress.value = (scrollTop / docHeight) * 100;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', updateProgress);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress);
  });
  </script>

  