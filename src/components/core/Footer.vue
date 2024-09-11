<template>
  <div class="flex flex-col items-center justify-between gap-6 px-6 py-8 sm:py-10 sm:flex-row sm:px-10 xl:px-28 bg-stone-900 dark:bg-B3">
    <!-- Icon Group -->
    <ul class="flex">
        <li v-for="item in menuItems" :key="item.to">
            <RouterLink :to="item.to" 
            class="flex items-center p-3.5 text-sm text-white rounded-full sm:text-xl sm:p-5 bg-stone-800 hover:bg-stone-700 transition-colors ease-in-out duration-300"
            >
                <component :is="item.icon" />
            </RouterLink>
        </li>
    </ul>
     <p class="text-sm font-normal text-white dark:text-stone-900">
        Copyright © 2024 Tina Chen
     </p>
  </div>
</template>

<script>
import Fa6BrandsLinkedin from '~icons/fa6-brands/linkedin';
import Fa6BrandsDribbble from '~icons/fa6-brands/dribbble';
import Fa6SolidEnvelope from '~icons/fa6-solid/envelope';

export default {
  components: {
    Fa6BrandsLinkedin,
    Fa6BrandsDribbble,
    Fa6SolidEnvelope
  },
  setup() {
    const menuItems = [
      { to: '/', icon: 'fa6-brands-linkedin' },
      { to: '/posts', icon: 'fa6-brands-dribbble' },
      { to: '/setting', icon: 'fa6-solid-envelope' },
    ]

    return { menuItems }
  }
}
</script>