<template>
    <Drawer :isOpen="isOpen" @close="closeDrawer">
      <template v-if="!isLoggedIn">
        <Login @login-success="handleLoginSuccess" />
      </template>
      <template v-else>
        <div class="user-panel">
          <p class="email">Email: {{ userEmail }}</p>
          <!-- Wishlist -->
            <RouterLink to="/wishlist" class="">
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
  import { ref, watch } from 'vue';
  import { auth } from '@/firebaseConfig'; // Import your Firebase configuration
  import Login from './Login.vue'; // Import the Login component
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['close']);
  
  const isLoggedIn = ref(false);
  const userEmail = ref('');
  
  const checkAuthState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        isLoggedIn.value = true;
        userEmail.value = user.email;
      } else {
        isLoggedIn.value = false;
        userEmail.value = '';
      }
    });
  };
  
  const closeDrawer = () => {
    emit('close');
  };
  
  const handleLoginSuccess = (email) => {
    userEmail.value = email;
    isLoggedIn.value = true;
    closeDrawer();
  };
  
  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      isLoggedIn.value = false;
      userEmail.value = '';
      closeDrawer();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };
  
  const handleOrderClick = () => {
    // Redirect or open orders page
    console.log('Order button clicked');
  };
  
  // Check auth state on component mount
  checkAuthState();
  </script>
  
  <style scoped>
  .user-panel {
    padding: 1rem;
  }
  .email {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .order-btn, .logout-btn {
    display: block;
    margin: 0.5rem 0;
  }
  </style>
