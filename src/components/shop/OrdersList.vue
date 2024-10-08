<template>
    <div class="max-w-4xl py-8 mx-auto orders-container">
      <h1 class="mb-6 text-3xl font-bold">Your Orders</h1>
  
      <div v-if="orders.length > 0" class="grid grid-cols-1 gap-6">
        <div
          v-for="order in reversedOrders"
          :key="order.orderNumber"
          class="p-6 bg-gray-100 rounded shadow-md order-card"
        >
          <h2 class="mb-2 text-xl font-semibold">Order #{{ order.orderNumber }}</h2>
          
          <!-- Display the order date -->
          <p class="mb-2"><strong>Date:</strong> {{ new Date(order.date).toLocaleDateString() }}</p>
  
          <p><strong>Name:</strong> {{ order.name }}</p>
          <p><strong>Phone:</strong> {{ order.phone }}</p>
          <p><strong>Email:</strong> {{ order.email }}</p>
          <p><strong>Address:</strong> {{ order.address }}</p>
          <p><strong>Payment Method:</strong> {{ order.payment }}</p> <!-- Display Payment Method -->
  
          <h3 class="mt-4 text-lg font-semibold">Items:</h3>
          <ul class="pl-5 list-disc">
            <li
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4 mb-2"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="object-cover w-16 h-16 rounded"
              />
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
  // Create a reversedOrders computed property
  const reversedOrders = computed(() => [...orders.value].reverse());
  </script>
  
  <style scoped>
  .orders-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  </style>
  