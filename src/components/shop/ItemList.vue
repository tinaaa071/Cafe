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
  import itemsData from '@/data/items.json'; // Import the JSON file
  
  const store = useStore();
  const emit = defineEmits(['add-to-cart']);
  
  const items = itemsData; // Assign the imported data
  
  function addToCart(item) {
    store.commit('addToCart', item);
    emit('add-to-cart');
  }
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  