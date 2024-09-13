<template>
    <div>
      <h2 class="mb-4 text-2xl font-bold">Item List</h2>
      <div v-for="(item, index) in items" :key="index" class="flex items-center p-4 mb-4 space-x-4 border rounded">
        <!-- Display Item Image -->
        <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
        <div>
          <h3 class="text-xl">{{ item.name }}</h3>
          <p class="text-lg">${{ item.price }}</p>
          <button @click="addToCart(item)" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const emit = defineEmits(['add-to-cart']);
  
  const items = [
    { 
        name: 'Item 1', 
        price: 20, 
        image: 'https://images.unsplash.com/photo-1725714354934-2977a57f8fd5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
        name: 'Item 2', 
        price: 30, 
        image: 'https://images.unsplash.com/photo-1726134212431-c794fd3d0c34?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
        name: 'Item 3', 
        price: 40, 
        image: 'https://images.unsplash.com/photo-1726047306929-acb47a105e82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D' 
    },
  ];
  
  function addToCart(item) {
    store.commit('addToCart', item);
    emit('add-to-cart');
  }
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  