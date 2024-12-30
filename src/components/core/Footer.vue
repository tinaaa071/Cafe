<template>
  <div class="flex flex-col gap-6 justify-between items-center px-6 py-8 sm:py-10 sm:flex-row sm:px-10 xl:px-28 bg-stone-900 dark:bg-B3">
    <!-- Icon Group -->
    <ul class="flex">
        <li v-for="item in menuItems" :key="item.to">
          <a :href="item.to" 
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center p-3.5 text-sm text-white rounded-full transition-colors duration-300 ease-in-out sm:text-xl sm:p-5 bg-stone-800 hover:bg-stone-700">
              <component :is="item.icon" />
          </a>
        </li>
    </ul>
    <p class="text-sm font-normal text-white cursor-default dark:text-stone-900">
      Copyright © {{ currentYear }} Tina Chen
    </p>
  </div>
</template>

<script>
import { computed } from 'vue';
import Fa6BrandsLinkedin from '~icons/fa6-brands/linkedin';
import Fa6BrandsDribbble from '~icons/fa6-brands/dribbble';
import Fa6BrandsMedium from '~icons/fa6-brands/medium';

export default {
  components: {
    Fa6BrandsLinkedin,
    Fa6BrandsDribbble,
    Fa6BrandsMedium
  },
  setup() {
    const menuItems = [
      { to: 'https://www.linkedin.com/in/chen-tina/', icon: 'fa6-brands-linkedin' },
      { to: 'https://medium.com/@tina.uiux', icon: 'fa6-brands-medium' },
      { to: 'https://dribbble.com/tinachen071', icon: 'fa6-brands-dribbble' },
    ];

    // 計算屬性以獲取當前年份
    const currentYear = computed(() => new Date().getFullYear());

    return { menuItems, currentYear };
  }
}
</script>