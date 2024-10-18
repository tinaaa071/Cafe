<template>
    <Drawer :isOpen="isOpen" @close="closeDrawer" :header="drawerHeader">
      <template v-if="!isLoggedIn">
        <Login @login-success="handleLoginSuccess" />
      </template>
      <template v-else>
        <div class="user-panel">
          <div class="flex gap-4 mb-5 sm:mb-6">
            <!-- Avatar -->
            <img class="inline-block size-[62px] rounded-full border-2 border-stone-200" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Avatar">
            <!-- 個人資料 -->
            <div>
              <p class="text-xl font-bold text-stone-900 sm:text-3xl">
                {{ displayName }}
              </p>
              <p class="font-bold email text-stone-400">
                {{ userEmail }}
              </p>
            </div>
          </div>
          <!-- 按鈕 -->
          <!-- 控制台按鈕 -->
          <div class="flex flex-col gap-3 sm:gap-4">
            <!-- Profile -->
            <RouterLink to="/profile">
              <div class="flex gap-2 justify-center items-center py-3 w-full font-bold text-white transition-colors duration-300 sm:text-xl bg-stone-900 sm:py-4 hover:bg-stone-500">
                <SolarUserLinear />
                <p>個人資料</p>
              </div>
            </RouterLink>
            <!-- Bill -->
            <RouterLink to="/orders">
              <div class="flex gap-2 justify-center items-center py-3 w-full font-bold text-white transition-colors duration-300 sm:text-xl bg-stone-900 sm:py-4 hover:bg-stone-500">
                <SolarBillListLinear />
                <p>我的訂單</p>
              </div>
            </RouterLink>
            <!-- Wishlist -->
            <RouterLink to="/wishlist">
              <div class="flex gap-2 justify-center items-center py-3 w-full font-bold text-white transition-colors duration-300 sm:text-xl bg-stone-900 sm:py-4 hover:bg-stone-500">
                <SolarHeartLinear />
                <p>收藏清單</p>
              </div>
            </RouterLink>
            <!-- 登出 -->
            <button @click="handleLogoutClick" class="flex gap-2 justify-center items-center py-3 w-full font-bold bg-white border-2 transition-colors duration-300 text-stone-900 sm:text-xl sm:py-4 hover:bg-stone-200 logout-btn border-stone-900">
              登出
            </button>
          </div>
        </div>
      </template>
    </Drawer>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { auth } from '@/firebaseConfig';
  
  // Props and emits
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['close']);
  
  // Reactive states
  const isLoggedIn = ref(false);
  const userEmail = ref('');
  const displayName = ref('Guest'); // Initialize with default value "Guest"
  
  // Computed properties
  const drawerHeader = computed(() => displayName.value);
  
  // Check authentication state
  const checkAuthState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        isLoggedIn.value = true;
        userEmail.value = user.email;
        // Use localStorage to retrieve displayName only when logged in
        displayName.value = localStorage.getItem('displayName') || 'Guest';
        drawerHeader.value = displayName.value || user.email;
      } else {
        isLoggedIn.value = false;
        userEmail.value = '';
        displayName.value = 'Guest'; // Ensure displayName is set to "Guest" when logged out
        drawerHeader.value = '登入'; // Show 'Login' when not logged in
      }
    });
  };
  
  const closeDrawer = () => {
    emit('close');
  };
  
  const handleLoginSuccess = (email) => {
    userEmail.value = email;
    isLoggedIn.value = true;
    // Use localStorage to retrieve displayName on login success
    displayName.value = localStorage.getItem('displayName') || 'Guest';
    drawerHeader.value = displayName.value || email;
    closeDrawer();
  };
  
  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      // Reset states upon logout
      isLoggedIn.value = false;
      userEmail.value = '';
      displayName.value = 'Guest'; // Reset displayName to "Guest" upon logout
      drawerHeader.value = '登入'; // Reset drawer header
      closeDrawer();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };
  
  // Load the current displayName from localStorage on component mount
  onMounted(() => {
    // Initialize displayName from localStorage if logged in
    checkAuthState();
  });
  </script>
  