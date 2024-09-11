<template>
    <div 
      class="relative h-full"
      :class="animationClass"
    >
      <!-- Skeleton Loader Container -->
      <div :class="[' rounded-md overflow-hidden', sizeClass]">
        <div class="absolute top-0 left-0 w-full h-full animate-shimmer"></div>
      </div>
  
      <!-- Text Placeholder Skeletons -->
      <div v-if="!isCircle && size !== 'full'" class="mt-4 space-y-3">
        <div :class="['bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden', textSizeClass]">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-shimmer"></div>
        </div>
        <div :class="['bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden', textSizeClass]">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 animate-shimmer"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      size: {
        type: String,
        default: 'small' // Options: 'small', 'medium', 'large', 'circle', 'full'
      },
      textSize: {
        type: String,
        default: 'small' // Options: 'small', 'medium', 'large'
      },
      isCircle: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      sizeClass() {
        return {
          small: 'h-20 w-20',
          medium: 'h-32 w-full',
          large: 'h-48 w-full',
          circle: 'h-20 w-20 rounded-full',
          full: 'h-full w-full'
        }[this.size];
      },
      textSizeClass() {
        return {
          small: 'h-6 w-3/4',
          medium: 'h-8 w-1/2',
          large: 'h-10 w-full'
        }[this.textSize];
      },
      animationClass() {
        return this.isCircle ? 'animate-pulse' : 'animate-shimmer';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Define the shimmer animation */
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .animate-shimmer {
    background: linear-gradient(to right, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
    background-size: 2000px 100%;
    animation: shimmer 1.5s infinite;
  }
  </style>
  