<template>
    <div>
      <h2 class="mb-4 text-2xl font-bold">Item List</h2>
      <div v-for="(item, index) in items" :key="index" class="p-4 mb-4 border rounded">
        <h3 class="text-xl">{{ item.name }}</h3>
        <p class="text-lg">${{ item.price }}</p>
        <button @click="addToCart(item)" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const emit = defineEmits(['add-to-cart']);
  
  const items = [
    { name: 'Item 1', price: 20 },
    { name: 'Item 2', price: 30 },
    { name: 'Item 3', price: 40 },
  ];
  
  function addToCart(item) {
    store.commit('addToCart', item);
    emit('add-to-cart');
  }
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  