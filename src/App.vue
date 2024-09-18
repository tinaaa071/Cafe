<template>
  <!-- 全域註冊 -->
  <RouterView />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebaseConfig'; 

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

onMounted(() => {
  checkAuthState();
});
</script>