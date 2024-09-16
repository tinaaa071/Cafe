<template>
  <div :class="[
      'fixed z-20 w-full px-6 pt-6 xl:px-28 md:px-10 transition-transform duration-300',
      isVisible ? 'translate-y-0' : '-translate-y-full',
      showMenu ? 'h-full ' : 'h-fit',
    ]">
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
                <!-- Heart Icon for Wishlist -->
                <li class="">
                  <RouterLink to="/wishlist">
                    <!-- Heart Icon -->
                    <div class="p-2">
                      <SolarHeartLinear class="text-xl " />
                    </div>
                  </RouterLink>
                </li>
                <!-- Cart Icon -->
                <li class="relative">
                  <button @click="isCartOpen = !isCartOpen" class="relative">
                    <div class="p-2">
                      <SolarCart3Linear class="text-xl" />
                      <!-- Badge showing cart item count -->
                      <span
                        v-if="cartCount > 0"
                        class="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1"
                      >
                        {{ cartCount }}
                      </span>
                    </div>
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
        <!-- Heart Icon for Wishlist -->
        <RouterLink to="/wishlist" class="block lg:hidden">
          <!-- Heart Icon -->
          <div class="">
            <SolarHeartLinear class="text-xl " />
          </div>
        </RouterLink>
        <!-- Cart Icon -->
        <button @click="isCartOpen = !isCartOpen" class="relative block mx-4 lg:hidden">
            <div class="p-2">
              <SolarCart3Linear class="text-xl" />
              <!-- Badge showing cart item count -->
              <span
                v-if="cartCount > 0"
                class="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1"
              >
                {{ cartCount }}
              </span>
            </div>
          </button>
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
  <!-- Shopping Cart Drawer -->
  <Cart :isOpen="isCartOpen" @close-cart="isCartOpen = false" />
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
      isCartOpen: false, // Add this line to manage the cart drawer state
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
    const cartCount = computed(() => cartItems.value.reduce((acc, item) => acc + item.quantity, 0));

    const toggleMenu = () => showMenu.value = !showMenu.value;

    // Update main menu items based on your pages structure
    const menuItems = [
      { to: '/', text: 'nav.item1' }, // Home page
      { to: '/work/works', text: 'nav.item2' }, // Work page
      { to: '/blog/blog', text: 'nav.item3' }, // Blog listing page
      { to: '/others', text: 'nav.item4' }, // Other page
      { to: '/cafe', text: 'nav.item5' }, // Contact page
    ];

    const isActive = (path) => route.path === path;

    const handleScroll = () => {
      isVisible.value = window.scrollY <= 10;
      lastScrollY.value = window.scrollY;
    };

    onMounted(() => window.addEventListener('scroll', handleScroll));
    onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll));

    return { cartCount, menuItems, toggleMenu, isActive, showMenu, isVisible };
  },
};
</script>

<style scoped>
/* Add styles if needed */
</style>
