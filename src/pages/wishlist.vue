<template>
    <Navbar />
    <div class="px-4 py-8 mx-auto ">
      <h1 class="mb-6 text-3xl font-bold">My Wishlist</h1>
      
      <!-- If the wishlist is empty -->
      <div v-if="wishlistItems.length === 0" class="py-10 text-center">
        <p class="text-gray-500">Your wishlist is empty.</p>
      </div>
      
      <!-- Display wishlist items -->
      <div v-else class="grid grid-cols-3 gap-6 md:grid-cols-4 ">
        <div v-for="(item, index) in wishlistItems" :key="index" class="p-4 border rounded-md shadow-md">
          <img :src="item.image" :alt="item.name" class="object-cover w-full h-48 rounded-md" />
          <h2 class="mt-4 text-xl font-semibold">{{ item.name }}</h2>
          <p class="mt-2 text-gray-600">${{ item.price }}</p>
          <button
            class="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
            @click="removeFromWishlist(item.id)"
          >
            Remove from Wishlist
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  // Access Vuex store
  const store = useStore();
  
  // Retrieve wishlist items from Vuex store using getter
  const wishlistItems = computed(() => store.getters.wishlistItems);
  
  // Dispatch action to remove item from wishlist
  const removeFromWishlist = (id) => {
    store.dispatch('removeFromWishlist', id);
  };
  </script>
