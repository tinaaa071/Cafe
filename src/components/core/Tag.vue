<template>
    <div
      v-bind="$attrs"
      v-for="(tag, index) in tag" :key="index"
      class="p-2 font-medium text-center rounded-full cursor-default sm:py-2 sm:px-3 text-xxs md:text-xs w-fit text-stone-500 xl:text-sm dark:bg-transparent dark:border dark:border-white dark:text-white"
    >
      {{ tag }}
    </div>
  </template>
  
  <script>
  export default {
    inheritAttrs: false,
    props: {
      tag: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  