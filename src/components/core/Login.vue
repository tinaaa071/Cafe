<template>
    <div>
      <h2>{{ isLogin ? '登入' : '註冊' }}</h2>
      <form @submit.prevent="isLogin ? login() : register()">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">{{ isLogin ? '登入' : '註冊' }}</button>
      </form>
  
      <p>{{ error }}</p>
      <p>
        {{ isLogin ? '還沒有帳號？' : '已經有帳號？' }}
        <button @click="toggleAuthMode">{{ isLogin ? '註冊' : '登入' }}</button>
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
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 10px;
  }
  </style>
  