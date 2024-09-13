<template>
  <div v-if="item" class="p-4">
    <button @click="$router.back()" class="px-4 py-2 mb-4 text-white bg-gray-500 rounded">
      Back to List
    </button>
    
    <div class="flex items-center space-x-4">
      <img :src="item.image" :alt="item.name" class="object-cover w-48 h-48 rounded" />
      <div>
        <h1 class="text-3xl font-bold">{{ item.name }}</h1>
        <p class="text-xl">${{ item.price }}</p>
        <p class="mt-4">{{ item.description }}</p>
        <button @click="addToCart(item)" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
          Add to Cart
        </button>
      </div>
    </div>
    
    <!-- Shopping Cart Drawer -->
    <Cart :isOpen="isCartOpen" @close-cart="closeCart" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import itemsData from '@/data/items.json'; // Import the JSON file

const route = useRoute();
const router = useRouter();
const store = useStore();

const isCartOpen = ref(false);

const item = computed(() => {
  const id = parseInt(route.params.id, 10);
  return itemsData[id] || null;
});

const addToCart = (item) => {
  store.dispatch('addToCart', item); // Use Vuex action to add item to cart
  isCartOpen.value = true; // Automatically open the cart when an item is added
};

const closeCart = () => {
  isCartOpen.value = false;
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
