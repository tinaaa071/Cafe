<template>
    <div class="max-w-4xl py-8 mx-auto orders-container">
      <h1 class="mb-6 text-3xl font-bold">Your Orders</h1>
  
      <div v-if="orders.length > 0" class="grid grid-cols-1 gap-6">
        <div
          v-for="(order, index) in orders"
          :key="index"
          class="p-6 bg-gray-100 rounded shadow-md order-card"
        >
          <h2 class="mb-2 text-xl font-semibold">Order #{{ index + 1 }}</h2>
          <p><strong>Name:</strong> {{ order.name }}</p>
          <p><strong>Email:</strong> {{ order.email }}</p>
          <p><strong>Address:</strong> {{ order.address }}</p>
  
          <h3 class="mt-4 text-lg font-semibold">Items:</h3>
          <ul class="pl-5 list-disc">
            <li v-for="item in order.items" :key="item.id" class="flex items-center gap-4 mb-2">
              <!-- Add the image here -->
              <img :src="item.image" :alt="item.name" class="object-cover w-16 h-16 rounded" />
              <div>
                <span>{{ item.name }} (x{{ item.quantity }})</span> - $
                {{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </li>
          </ul>
  
          <p class="mt-4 font-bold">Total: ${{ order.total.toFixed(2) }}</p>
        </div>
      </div>
  
      <div v-else>
        <p>No orders yet. <router-link to="/">Go back to the shop</router-link>.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const orders = computed(() => store.state.orders);
  </script>
  
  <style scoped>
  .orders-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  </style>
  