<template>
  <div class="p-4 transition-all duration-100 ease-in-out bg-white border md:py-6 md:px-8 w-fit rounded-2xl dark:bg-transparent hover:bg-stone-50 dark:hover:bg-stone-700 sm:rounded-3xl dark:border-white/20">
        <img 
        class="object-cover object-center h-10 min-w-10 "
        :src="iconSrc" 
        alt="">
   </div>
</template>

<script>
export default {
  props: {
    iconSrc: {
      type: String,
      default: '',
    },
  }
};
</script>