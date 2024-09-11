<template>
    <RouterLink :to="linkTo" >
      <div class="group">
        <div class="relative w-full overflow-hidden rounded-lg aspect-video dark:border dark:border-white/20">
        <div 
        v-if="showTag"
        class="absolute bottom-4 right-4 z-10 px-1.5 py-1 rounded  bg-stone-50  text-stone-600 whitespace-nowrap text-xs font-normal',">
          {{ post.category }}
        </div>
        <img 
        :src="post.image" 
        :alt="post.title" 
        class="object-cover object-center w-full h-full transition-all duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      
      <p 
      v-if="showDate"
      class="px-2 py-2 text-xs font-normal tracking-widest border-b md:py-3 xl:px-4 border-stone-200 dark:border-stone-500 text-stone-500 dark:text-stone-400"
      >
        {{ post.date }}
      </p>
      <p class="px-2 py-2 text-base font-medium text-justify md:text-sm xl:text-base xl:px-4 line-clamp-3 dark:text-white">
        {{ post.title }}
      </p>
      </div>
    </RouterLink>
  </template>
  
  <script>
  export default {
    name: "PostItem",
    props: {
      linkTo: {
        type: String,
        required: true,
      },  
      post: {
        type: Object,
        required: true,
      },
      showTag: {
        type: Boolean,
        required: true,
      },
      showDate: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>