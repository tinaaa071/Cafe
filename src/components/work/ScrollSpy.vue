<template>
    <nav class="sticky top-0 left-0 hidden xl:block">
      <div class="absolute pt-5 ml-6 text-xs w-fit md:ml-10 xl:ml-20">
        <ul class="p-0 list-none">
        <li
          v-for="section in sections"
          :key="section.id"
          :class="['my-3', activeSection === section.id ? 'text-B1 font-bold dark:text-white' : 'text-stone-300 dark:text-stone-400']"
        >
          <a
            :href="'#' + section.id"
            class="no-underline transition-colors hover:text-stone-400"
          >
          {{ $t(section.name) }}
          </a>
        </li>
      </ul>
      </div>
    </nav>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  
  export default {
    props: {
      sections: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const activeSection = ref('');
  
      const onScroll = () => {
        let currentSection = '';
        props.sections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (
            element &&
            element.getBoundingClientRect().top <= window.innerHeight / 2 &&
            element.getBoundingClientRect().bottom > window.innerHeight / 2
          ) {
            currentSection = section.id;
          }
        });
        activeSection.value = currentSection;
      };
  
      // Throttle the scroll event handler
      const throttledOnScroll = throttle(onScroll, 100);
  
      onMounted(() => {
        window.addEventListener('scroll', throttledOnScroll);
        throttledOnScroll(); // Initial check to set the active section
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', throttledOnScroll);
      });
  
      return {
        activeSection,
      };
    },
  };
  
  // Helper function to throttle scroll events
  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  }
  </script>
 
  