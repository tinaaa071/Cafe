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
      class="fixed top-0 right-0 z-50 w-full h-full bg-white shadow-lg transition-transform transform xl:w-2/5 lg:w-1/2 md:w-2/3 dark:border-l-2 dark:border-white dark:bg-stone-900 dark:text-white"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      @click.stop
    >
      <div class="flex gap-4 justify-between items-center px-6 py-6 text-white bg-stone-900 sm:px-10 dark:bg-white dark:text-stone-900">
        <slot name="header">
          <h2 class="text-xl font-bold sm:text-2xl line-clamp-1">{{ header }}</h2>
        </slot>
        <button
          @click="$emit('close')"
          class="text-xl font-bold text-white transition-all duration-300 hover:rotate-90 dark:text-stone-900"
        >
          &times;
        </button>
      </div>

      <!-- 內容區塊 -->
      <div class="overflow-y-auto p-6 sm:px-10 y-6 max-h-[calc(100vh-100px)] drawer-content h-full flex flex-col justify-between">
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
