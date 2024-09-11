<template>
    <TransitionFade name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center w-full p-6 text-right bg-black/30 backdrop-blur-lg"
        @click="handleOverlayClick"
      >
        <div
          class="relative w-full mx-auto sm:max-w-5xl"
          @click.stop
        >
        <button
            type="button"
            class="p-3 mb-4 text-white transition-colors border-2 border-white rounded-xl bg-white/10 group hover:bg-white/15"
            @click="$emit('close')"
          >
            <span class="sr-only">Close</span>
            <fa6-solid-xmark class="transition-all duration-200 ease-in-out group-hover:rotate-90" />
          </button>
          
          <slot></slot>
        </div>
      </div>
    </TransitionFade>
  </template>
  
<script setup>
const props = defineProps({
show: Boolean
});

const emit = defineEmits(['close']);

const handleOverlayClick = () => {
emit('close');
};
</script>
  