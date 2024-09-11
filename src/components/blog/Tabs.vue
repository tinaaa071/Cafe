<template>
    <div class="flex justify-start py-3 pl-6 mb-6 overflow-x-auto text-xs font-bold xs:pl-0 scrollbar-hidden xl:mb-8">
      <div class="flex justify-center gap-2 mx-auto xs:gap-4">
        <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="[
          'px-4 py-3 cursor-pointer bg-stone-50 rounded-full transition-colors duration-300 border border-stone-300 text-stone-900 whitespace-nowrap dark:bg-transparent dark:text-stone-300',
          currentCategory === category ? 'bg-stone-900 text-white dark:text-stone-900 dark:bg-white' : 'hover:bg-stone-200 dark:hover:bg-stone-700'
        ]"
      >
        {{ category }}
      </button>
      </div>
    </div>
  </template>
  
  <style>
  .scrollbar-hidden {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
  </style>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true,
      },
      currentCategory: {
        type: String,
        required: true,
      },
    },
    emits: ['category-changed'],
    methods: {
      selectCategory(category) {
        this.$emit('category-changed', category);
      },
    },
  };
  </script>
  