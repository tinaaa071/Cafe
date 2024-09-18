<template>
    <Drawer :isOpen="isOpen" @close="closeDrawer" :header="drawerHeader">
      <template v-if="!isLoggedIn">
        <Login @login-success="handleLoginSuccess" />
      </template>
      <template v-else>
        <div class="user-panel">
          <p class="email">Email: {{ userEmail }}</p>
          <!-- Profile -->
          <RouterLink to="/profile">
            <div class="flex gap-2 text-xl">
              <SolarHeartLinear />
              <p>個人資料</p>
            </div>
          </RouterLink>
          <!-- Wishlist -->
          <RouterLink to="/wishlist">
            <div class="flex gap-2 text-xl">
              <SolarHeartLinear />
              <p>收藏清單</p>
            </div>
          </RouterLink>
          <button @click="handleLogoutClick" class="logout-btn">Logout</button>
        </div>
      </template>
    </Drawer>
  </template>
  
  <script setup>
  import { ref, onMounted, inject, watch } from 'vue';
  import { auth } from '@/firebaseConfig';

  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['close']);
  
  // Inject displayName and make it reactive
  const displayName = inject('displayName', ref('Guest'));
  
  // Reactive states
  const isLoggedIn = ref(false);
  const userEmail = ref('');
  const drawerHeader = ref(displayName.value || 'Guest'); // Set initial drawerHeader
  
  // Watch for changes in displayName and update the drawer header
  watch(displayName, (newName) => {
    drawerHeader.value = newName || 'Guest'; // Update header when displayName changes
  });
  
  const checkAuthState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        isLoggedIn.value = true;
        userEmail.value = user.email;
        drawerHeader.value = displayName.value || user.email; // Update header with email or displayName
      } else {
        isLoggedIn.value = false;
        userEmail.value = '';
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
    drawerHeader.value = displayName.value || email;
    closeDrawer();
  };
  
  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      isLoggedIn.value = false;
      userEmail.value = '';
      drawerHeader.value = '登入';
      closeDrawer();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };
  
  // Check authentication state on component mount
  onMounted(() => {
    checkAuthState();
  });
  </script>
  
  <style scoped>
  .user-panel {
    padding: 1rem;
  }
  .email {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .logout-btn {
    display: block;
    margin: 0.5rem 0;
  }
  </style>
  