<template>
    <div 
    class="relative inline-block overflow-hidden align-bottom h-7"
    
    >
        <span 
        class="block vslide" 
        v-for="(text, index) in texts" 
        :key="index" 
        >
         {{ text }}
        </span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        texts: [
          'AAA',
          'BBB',
          'CCC',
          'DDD',
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  @keyframes animateWords {
    0% { transform: translateY(0%); }
    20% { transform: translateY(-100%); }
    40% { transform: translateY(-100%); }
    60% { transform: translateY(-200%); }
    70% { transform: translateY(-200%); }
    85% { transform: translateY(-300%); }
    100% { transform: translateY(-300%); }
  }

  
  .vslide {
    animation: animateWords 4s infinite ease;
  }
  

  </style>
  