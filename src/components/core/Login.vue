<template>
    <div class="space-y-10 text-center">
      <h2 class="text-xl font-bold sm:text-4xl">
        {{ isLogin ? '登入' : '註冊' }}
      </h2>
      <form @submit.prevent="isLogin ? login() : register()" class="space-y-5 text-sm font-bold text-left sm:text-xl">
        <!-- 信箱 -->
        <div class="flex flex-col">
          <label class="block mb-2">
            信箱：
          </label>
          <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          class="p-2 w-full border-2 border-stone-900"
          required />
        </div>
        <!-- 密碼 -->
        <div class="flex flex-col">
          <label class="block mb-2">
            密碼：
          </label>
          <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          class="p-2 w-full border-2 border-stone-900"
          required />
        </div>
        <!-- 按鈕 -->
        <button type="submit" class="py-3 w-full font-bold text-white transition-colors duration-300 sm:text-xl sm:py-4 bg-stone-900 hover:bg-stone-500">
          {{ isLogin ? '登入' : '註冊' }}
        </button>
      </form>
      <!-- 錯誤訊息 -->
      <p class="text-red-500">{{ error }}</p>
      <p class="text-sm font-bold cursor-default sm:text-xl">
        {{ isLogin ? '還沒有帳號？' : '已經有帳號？' }}
        <button @click="toggleAuthMode" class="mt-4 transition duration-300 text-stone-500 hover:text-stone-400">
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
          console.error(error); // 打印完整錯誤對象以便調試
          this.handleAuthError(error); // Handle error with custom message
        }
      },
      async register() {
        try {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.$emit('login-success', this.email); // Emit event on successful registration
        } catch (error) {
          this.handleAuthError(error);
        }
      },
      handleAuthError(error) {
        switch (error.code) {
          case 'auth/invalid-credential':
            this.error = '請檢查您的電子郵件或密碼是否正確。'; // 更具體的錯誤提示
            break;
          default:
            this.error = '發生錯誤，請稍後再試。';
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
  