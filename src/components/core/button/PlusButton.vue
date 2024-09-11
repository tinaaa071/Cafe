<template>
  <button
    @click="toggleIcon"
    :class="{
      'bg-B2/80 dark:bg-stone-600': !isPlus,
      'bg-B3 dark:bg-stone-700': isPlus,
      'sm:w-10 sm:h-10 w-9 h-9 rounded-full flex items-center justify-center': true,
      'transition-colors duration-300 ease-in-out': true
    }"
  >
    <div
      class="relative inline-flex items-center justify-center w-6 h-6"
    >
      <div
        class="absolute w-4 h-0.5 transition-transform duration-300 ease-in-out bg-stone-400 dark:bg-white rounded-full"
        :class="{ 'rotate-90': isPlus }"
      ></div>
      <div
        class="absolute w-4 h-0.5 transition-transform duration-300 ease-in-out bg-stone-400  dark:bg-white rounded-full"
        :class="{ 'rotate-0': isPlus }"
      ></div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isPlus: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle'],
  methods: {
    toggleIcon() {
      this.$emit('toggle');
    },
  },
};
</script>
