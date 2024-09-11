<template>
  <div 
  class="relative w-full overflow-hidden font-semibold border shadow h-44 rounded-2xl sm:rounded-3xl aspect-video group border-B4 text-stone-800 dark:border-white dark:text-white"
  >
    <div class="absolute p-4">
    <!-- Title -->
    <p class="mb-2 text-white dark:text-stone-800 group-hover:hidden">
        {{ title }}
    </p>
    <!-- Hidden 區塊 -->
    </div>
    <div class="absolute w-full p-4 transition-all duration-300 ease-in-out bg-white dark:bg-stone-900 -top-32 group-hover:top-0">
    <p class="mb-1">
        {{ title }}
    </p>
    <p class="text-sm text-stone-400">
        {{ info }}
    </p>
    </div>
    <!-- Img -->
    <div class="h-full mt-0 transition-all duration-300 ease-in-out group-hover:mt-20">
      <img 
      class="object-cover w-full h-full"
      :src="cardSrc" 
      alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    cardSrc: {
      type: String,
      default: '',
    },
  }
};
</script>