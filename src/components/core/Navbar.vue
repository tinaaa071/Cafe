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
        'transition-colors ease-in-out duration-500'
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
                    <!-- Your SVG Path Here -->
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
                <li class="relative">
                  <button @click="$emit('toggle-cart')" class="relative p-2">
                    <!-- Cart Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3h2l.4 2m0 0L7 14m1.68 0h8.64m-8.64 0L5.4 5h13.2l-1.4 7H8.68zm8.64 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-9 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                      />
                    </svg>
                    <!-- Badge showing cart item count -->
                    <span
                      v-if="cartCount > 0"
                      class="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1"
                    >
                      {{ cartCount }}
                    </span>
                  </button>
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
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
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
    const router = useRouter();
    const store = useStore();
    const showMenu = ref(false);
    const isVisible = ref(true);
    const lastScrollY = ref(window.scrollY);

    const cartItems = computed(() => store.getters.cartItems);
    const cartCount = computed(() => cartItems.value.length);

    const toggleMenu = () => showMenu.value = !showMenu.value;

    // Update main menu items based on your pages structure
    const menuItems = [
      { to: '/', text: 'nav.item1' }, // Home page
      { to: '/work/works', text: 'nav.item2' }, // Work page
      { to: '/blog/blog', text: 'nav.item3' }, // Blog listing page
      { to: '/others', text: 'nav.item4' }, // Others page
      { to: '/test', text: 'nav.item5' }, // About page
    ];

    // Check if a menu item should be active based on the current route
    const isActive = (path) => {
      if (path === '/blog/blog') {
        return route.path.startsWith('/blog');
      }
      if (path === '/work/works') {
        return route.path.startsWith('/work');
      }
      return route.path === path;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.value = currentScrollY < lastScrollY.value || currentScrollY < 100;
      lastScrollY.value = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      showMenu,
      isVisible,
      toggleMenu,
      menuItems,
      isActive,
      cartCount,
    };
  },
};
</script>
