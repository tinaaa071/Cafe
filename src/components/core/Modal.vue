<template>
    <TransitionFade name="fade">
      <div
        v-if="show"
        class="flex fixed inset-0 z-50 justify-center items-center p-6 w-full text-right backdrop-blur-lg bg-black/30"
        @click="handleOverlayClick"
      >
        <div
          class="mx-auto w-full text-right bg-white border-2 md:max-w-sm border-stone-900"
          @click.stop
        >
          <button
            type="button"
            class="pt-5 pr-5 text-stone-900 group"
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
  