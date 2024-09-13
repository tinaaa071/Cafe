<template>
    <div class="checkout-container">
      <h1 class="mb-4 text-3xl font-bold">Checkout</h1>
      
      <div class="cart-summary">
        <h2 class="mb-2 text-2xl font-semibold">Cart Summary</h2>
        <ul class="pl-5 mb-4 list-disc">
          <li v-for="(item, index) in cartItems" :key="index" class="mb-2">
            <span>{{ item.name }}</span> - ${{ item.price }}
          </li>
        </ul>
        <div class="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${{ cartTotal }}</span>
        </div>
      </div>
  
      <div class="mt-6 checkout-form">
        <h2 class="mb-2 text-2xl font-semibold">Billing Information</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block mb-1">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-1">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="address" class="block mb-1">Address</label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const cartItems = computed(() => store.getters.cartItems);
  const cartTotal = computed(() => store.getters.cartTotal);
  
  const form = ref({
    name: '',
    email: '',
    address: ''
  });
  
  function handleSubmit() {
    // Handle form submission
    console.log('Form submitted:', form.value);
    alert('Order placed successfully!');
  }
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  </style>
  