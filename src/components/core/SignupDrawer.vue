<template>
    <Drawer :isOpen="isOpen" @close="closeDrawer" :header="drawerHeader">
      <template v-if="!isLoggedIn">
        <Login @login-success="handleLoginSuccess" />
      </template>
      <template v-else>
        <div class="user-panel">
          <div class="mb-2">
            <p class="">{{ displayName }}</p>
            <p class="email">{{ userEmail }}</p>
          </div>
          <!-- Profile -->
          <RouterLink to="/profile">
            <div class="flex gap-2 text-xl">
              <SolarHeartLinear />
              <p>個人資料</p>
            </div>
          </RouterLink>
          <!-- Wishlist -->
          <RouterLink to="/orders">
            <div class="flex gap-2 text-xl">
              <SolarHeartLinear />
              <p>我的訂單</p>
            </div>
          </RouterLink>
          <!-- Wishlist -->
          <RouterLink to="/wishlist">
            <div class="flex gap-2 text-xl">
              <SolarHeartLinear />
              <p>收藏清單</p>
            </div>
          </RouterLink>
          <button @click="handleLogoutClick" class="mt-2 logout-btn">Logout</button>
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
  