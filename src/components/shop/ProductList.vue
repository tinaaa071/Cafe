<template>
    <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in products"
        :key="product.id"
        class="p-4 transition border rounded shadow hover:shadow-lg"
      >
        <img
          :src="product.image"
          alt=""
          class="object-cover w-full h-40 mb-2 rounded"
        />
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <p class="text-gray-700">{{ product.description }}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-lg font-semibold">${{ product.price }}</span>
          <button
            class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            @click="addToCart(product)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineEmits } from 'vue';
  
  // Sample product data
  const products = ref([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
    },
  ]);
  
  // Emit event to parent component
  const emit = defineEmits(['add-to-cart']);
  
  // Function to add product to the cart
  const addToCart = (product) => {
    emit('add-to-cart', product);
  };
  </script>
  
  <style scoped>
  </style>
  