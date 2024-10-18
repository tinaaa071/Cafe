<template>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50"
        @click="$emit('close')"
      ></div>
    </transition>
  
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-50 w-full h-full bg-white shadow-lg transition-transform transform lg:w-1/3 sm:w-2/3"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
        @click.stop
      >
        <div class="flex justify-between items-center px-10 py-6 text-white bg-stone-900">
          <slot name="header">
            <h2 class="text-2xl font-bold">{{ header }}</h2>
          </slot>
          <button
          @click="$emit('close')"
          class="text-xl font-bold text-white transition-all duration-300 hover:rotate-90"
        >
            &times;
          </button>
        </div>
  
        <div class="overflow-y-scroll px-10 py-6 h-screen drawer-content">
          <slot>
            <!-- Default slot content goes here -->
            <p>Your drawer content goes here.</p>
          </slot>
        </div>

      </div>
    </transition>
  </template>
  
  <script setup>
  const props = defineProps({
    header: {
      type: String,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['close']);
  </script>
  
  <style scoped>
  /* Slide animation for the drawer */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  
  /* Fade animation for the overlay */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  