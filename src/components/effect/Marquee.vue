<template>
    <div class="overflow-hidden w-full bg-white rounded-full cursor-default dark:bg-transparent dark:border dark:border-stone-50">
        <div class="flex items-center p-1 sm:py-2 whitespace-nowrap marquee-content w-[200%] sm:text-xl font-semibold text-stone-900 dark:text-white text-base">
            <span class="inline-block">
              {{ spacedText }}{{ spacedText }}
            </span>
            <span class="inline-block">
              {{ spacedText }}{{ spacedText }}
            </span>
        </div>
    </div>
  </template>
  
  <script>
    export default {
    data() {
        return {
        text: "Welcome to Paw Cafe.",
        };
    },
    computed: {
        spacedText() {
        const repeatedText = Array(10).fill(this.text).join('   ');
        return repeatedText;
        }
    }
    };
    </script>
  
  <style>
  .marquee-content {
    animation: marquee-slide 20s linear infinite;
    animation-timing-function: linear;
  }
  
  @keyframes marquee-slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
  </style>
  