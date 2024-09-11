<template>
  <div :class="[
      'fixed z-20 w-full px-6 pt-6 xl:px-28 md:px-10 transition-transform duration-300',
      isVisible ? 'translate-y-0' : '-translate-y-full',
      showMenu ? 'h-full ' : 'h-fit',
    ]" >
    <!-- Navbar -->
    <div 
    :class="[
        showMenu ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-white/20 dark:bg-stone-500/30 backdrop-blur-md',
        showMenu ? 'rounded-3xl ' : 'rounded-full',
        'shadow-md',
        'bg-blur-lg',
        'transition-colors ease-in-out duration-500'  // Add transition classes here
    ]"
    >
      <div class="relative flex flex-row items-center justify-between w-full px-4 py-2.5 md:py-3.5 xl:text-stone-900 sm:flex-row dark:xl:text-white">
        <!-- Logo -->
        <div class="flex items-center justify-between w-full">
          <div class="inline-flex items-center space-x-3.5 group">
            
            <RouterLink to="/" class="">
              <!-- Your SVG Logo -->
              <div :class="showMenu ? 'text-white dark:text-stone-900' : 'text-stone-900 dark:text-white'" class="flex items-center gap-3 group">
                <div class="flex items-center transition-colors duration-300 md:block group-hover:text-stone-400">
                  <svg 
                  class="h-9 sm:h-11" 
                  xmlns="http://www.w3.org/2000/svg"  fill="currentColor" 
                  viewBox="0 0 32 40"
                  >
                  <path class="" fill="currentColor" fill-rule="evenodd" d="M17.868 2.984c6.627 0 11.438 5.343 10.745 11.934h.02a33.237 33.237 0 0 1-.462 3.475c-.433 2.289-1.172 4.704-2.323 6.12-2.314 2.846-5.925 2.903-7.625 2.903a7.42 7.42 0 0 1-1.471-.136c.524-.918.989-1.985 1.374-3.218a95.84 95.84 0 0 0 .954-3.368c.237-.877.473-1.75.706-2.545.434-1.484.891-2.836 1.417-3.958.314.085.627.155.93.2.721.106 1.59.098 2.422-.376 1.647-.94 2-2.704 1.394-3.987A2.737 2.737 0 0 0 24.38 8.6c-.766-.268-1.614-.176-2.396.24-.817.432-1.491 1.056-2.055 1.767-1.595-.52-3.67-1.096-6.199-1.096-1.976 0-3.754.844-4.956 1.588a14.26 14.26 0 0 0-1.89 1.404l-.117.107-.035.032-.011.011-.004.004-.002.002s-.001.001 1.023 1.058c1.025 1.056 1.024 1.057 1.024 1.057l-.001.001.013-.012.071-.065a11.11 11.11 0 0 1 1.45-1.074c.986-.611 2.177-1.122 3.33-1.122 1.834 0 3.373.361 4.737.78-.58 1.295-1.048 2.725-1.457 4.122-.28.955-.523 1.859-.757 2.728-.293 1.087-.57 2.12-.887 3.132-.378 1.21-.826 2.169-1.3 2.927-.693-.323-1.421-.645-2.086-.843-1.066-.317-2.52-.487-3.769.569-1.42 1.2-1.819 2.897-1.154 4.288.632 1.326 2.123 2.104 3.78 1.781 1.28-.248 2.71-.885 4.03-2.134.913.324 1.971.554 3.355.554h.065c1.667 0 6.667.003 9.971-4.06 1.68-2.067 2.523-5.157 2.966-7.501a36.26 36.26 0 0 0 .523-4.045l.017-.264.003-.072.001-.02v-.01h-.008C32.242 6.419 26.303 0 18.181 0 9.897 0 2.48 6.679 1.613 14.918L.568 24.863C-.298 33.102 5.716 39.781 14 39.781c5.993 0 11.533-3.496 14.466-8.549h-3.418c-2.477 3.345-6.462 5.565-10.734 5.565-6.628 0-11.439-5.343-10.746-11.934l1.045-9.945C5.306 8.327 11.24 2.984 17.868 2.984Zm-6.942 25.234c.249.074.504.17.775.282a4.611 4.611 0 0 1-1.443.552c-.36.07-.533-.094-.586-.206a.294.294 0 0 1-.017-.209c.02-.08.091-.25.347-.467l.003-.003c.038-.032.192-.166.921.05Z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h1 :class="showMenu ? 'text-white dark:text-stone-900' : 'text-stone-900 dark:text-white'" class="text-xl font-medium transition-colors duration-300 group-hover:text-stone-400">
                  <SlideText />
                </h1>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Web Menu -->
        <div class="flex items-center justify-center gap-10">
          <div class="hidden lg:block">
            <div class="sm:flex sm:flex-row sm:justify-between whitespace-nowrap">
              <ul class="flex flex-col items-center gap-2 text-sm font-semibold sm:flex-row">
                <!-- Menu -->
                <li v-for="item in menuItems" :key="item.to">
                  <RouterLink :to="item.to" 
                    class="flex items-center px-4 py-2.5 transition-colors duration-200 sm:px-5 whitespace-nowrap"
                    :class="isActive(item.to) ? 'text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-900 dark:hover:text-white'">
                    {{ $t(item.text) }}
                  </RouterLink>
                </li>
                <!-- Resume -->
                <li>
                  <DefaultButton 
                   :to="'/'"
                   :showLeftIcon="false"
                   :showRightIcon="true"
                   :icon="icon"
                   :text="$t('nav.item6')"
                   class="border-stone-900 dark:border-white hover:bg-B3/80 dark:hover:bg-stone-600/50 dark:text-white"
                  />
                </li>
                <!-- Language -->
                <LanguageSwitcher />
                <!-- Dark Toggle -->
                <DarkModeToggle />
              </ul>
            </div>
          </div>
        </div>
        <!-- Pass the toggleMenu method and isOpen state -->
        <Hamburger :toggleMenu="toggleMenu" :isOpen="showMenu" />
      </div>
      <!-- Mobile Menu -->
      <div class="lg:hidden">
        <div v-if="showMenu" class="fixed inset-0 bg-black/20 -z-10 xl:hidden backdrop-blur-lg" @click="toggleMenu"></div>
        <div v-if="showMenu" class="z-20 flex flex-col justify-between p-2.5 md:p-5 whitespace-nowrap">
          <ul class="flex flex-col gap-2 text-sm font-semibold">
            <!-- Menu -->
            <li v-for="item in menuItems" :key="item.to">
              <RouterLink :to="item.to" 
                class="flex items-center px-2 py-2.5 transition-colors duration-200 whitespace-nowrap"
                :class="isActive(item.to) ? 'text-white dark:text-stone-900' : 'text-stone-500 hover:text-white'">
                {{ $t(item.text) }}
              </RouterLink>
            </li>
            
            <li class="flex gap-2">
              <!-- Resume -->
              <DefaultButton 
                   :to="'/'"
                   :showLeftIcon="false"
                   :showRightIcon="true"
                   :icon="icon"
                   :text="$t('nav.item6')"
                   class="w-full border-white bg-stone-50 dark:border-stone-900 text-stone-800 hover:bg-B3/80 dark:hover:bg-stone-800/50 dark:hover:text-white"
                  />
              <!-- Language -->
              <LanguageSwitcher class="border-2 border-stone-50" />
              <!-- Dark Toggle -->
              <DarkModeToggle class="border-2 border-stone-50" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from 'vue-router';
import MingcuteEarth3Fill from '~icons/mingcute/earth-3-fill';

export default {
  components: {
    MingcuteEarth3Fill,
  },
  data() {
    return {
      icon: MingcuteEarth3Fill, 
    };
  },
  setup() {
    const route = useRoute();
    const showMenu = ref(false);
    const isVisible = ref(true);
    const lastScrollY = ref(window.scrollY);
    const toggleMenu = () => showMenu.value = !showMenu.value;

    // Update main menu items based on your pages structure
    const menuItems = [
      { to: '/', text: 'nav.item1' },             // Home page
      { to: '/work/works', text: 'nav.item2' },             // work page
      { to: '/blog/blog', text: 'nav.item3' },         // Blog listing page
      { to: '/others', text: 'nav.item4' },       // Others page
      { to: '/test', text: 'nav.item5' },        // About page
    ];

    // Check if a menu item should be active based on the current route
    const isActive = (path) => {
  if (path === '/blog/blog') {
    return route.path.startsWith('/blog')
  }
  if (path === '/work/works') {
    return route.path.startsWith('/work')
  }
  return route.path === path
}

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.value = currentScrollY < lastScrollY.value || currentScrollY <= 0; // Show navbar when scrolling up or at the top
      lastScrollY.value = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { showMenu, toggleMenu, menuItems, isActive, isVisible };
  }
};
</script>

<style scoped>
.fixed {
  transition: transform 0.4s ease-in-out;
}
</style>
