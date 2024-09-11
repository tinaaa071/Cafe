<template>
  <div 
    class="px-3 py-2.5 border-2 rounded-full sm:py-3 sm:px-4 lg:hidden"
    :class="isOpen ? 'border-white dark:border-stone-900' : 'border-stone-900 dark:border-white'"
  >
    <div 
      @click="toggleMenu" 
      :class="{'open': isOpen}" 
      class="relative flex flex-col justify-between w-4 h-3 cursor-pointer sm:h-4 sm:w-6"
    >
      <!-- Top Bar -->
      <span 
        class="absolute left-0 block w-full h-0.5 transition-all duration-300 ease-[ease] origin-center rounded-full" 
        :class="{
          'transform rotate-45 top-1/2 w-full bg-white dark:bg-stone-900': isOpen,
          'top-0 bg-stone-900 dark:bg-white': !isOpen
        }"
      ></span>
      
      <!-- Bottom Bar -->
      <span 
        class="absolute left-0 block w-1/2 h-0.5 transition-all duration-300 ease-[ease] origin-center rounded-full"
        :class="{
          'transform -rotate-45 top-1/2 w-full bg-white dark:bg-stone-900': isOpen,
          'sm:top-4 top-3 w-[70%] bg-stone-900 dark:bg-white': !isOpen
        }"
      ></span>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    toggleMenu: {
      type: Function,
      required: true
    }
  }
}
</script>
  