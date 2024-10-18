<template>
    <div class="space-y-10 text-center">
      <h2 class="text-xl font-bold sm:text-4xl">
        {{ isLogin ? '登入' : '註冊' }}
      </h2>
      <form @submit.prevent="isLogin ? login() : register()" class="space-y-5 text-left">
        <!-- 信箱 -->
        <div class="flex flex-col">
          <label class="mb-2 text-sm font-bold sm:text-xl">
            信箱：
          </label>
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <!-- 密碼 -->
        <div class="flex flex-col">
          <label class="mb-2 text-sm font-bold sm:text-xl">
            密碼：
          </label>
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <!-- 按鈕 -->
        <button type="submit" class="py-3 w-full font-bold text-white transition-colors duration-300 sm:text-xl sm:py-4 bg-stone-900 hover:bg-stone-500">
          {{ isLogin ? '登入' : '註冊' }}
        </button>
      </form>
  
      <p>{{ error }}</p>
      <p class="font-bold sm:text-xl">
        {{ isLogin ? '還沒有帳號？' : '已經有帳號？' }}
        <button @click="toggleAuthMode" class="text-stone-500">
          {{ isLogin ? '註冊' : '登入' }}
        </button>
      </p>
    </div>
  </template>
  
  <script>
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '@/firebaseConfig';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
        isLogin: true // Default to login mode
      };
    },
    methods: {
      async login() {
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$emit('login-success', this.email); // Emit event on successful login
        } catch (error) {
          this.error = error.message;
        }
      },
      async register() {
        try {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.$emit('login-success', this.email); // Emit event on successful registration
        } catch (error) {
          this.error = error.message;
        }
      },
      toggleAuthMode() {
        this.isLogin = !this.isLogin; // Toggle between login and register modes
        this.error = ''; // Clear error message
        this.$emit('auth-mode-changed', this.isLogin ? '登入' : '註冊'); // Emit event on auth mode change
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 10px;
  }
  </style>
  