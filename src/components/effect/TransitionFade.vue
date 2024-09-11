<template>
    <transition
      :name="name"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <slot></slot>
    </transition>
  </template>
  
  <script setup>
  const props = defineProps({
    name: {
      type: String,
      default: 'fade'
    }
  });
  
  const emit = defineEmits([]);
  
  const handleEnter = (el) => {
    el.style.opacity = 0;
    el.offsetHeight; // trigger reflow to restart the transition
    el.style.transition = 'opacity 0.2s ease-in-out';
    el.style.opacity = 1;
  };
  
  const handleLeave = (el) => {
    el.style.opacity = 1;
    el.style.transition = 'opacity 0.2s ease-in-out';
    el.style.opacity = 0;
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  