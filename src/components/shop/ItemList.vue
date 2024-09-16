<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">Item List</h2>
    <div v-for="(item, index) in items" :key="index" class="flex items-center p-4 mb-4 space-x-4 border rounded">
      <!-- Display Item Image -->
      <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
      <div>
        <h3 class="text-xl">{{ item.name }}</h3>
        <p class="text-lg">${{ item.price }}</p>
        <router-link :to="{ path: `/item/${index}` }">
          <button class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
              View Details
          </button>
        </router-link>
        <button @click="addToCart(item)" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
          Add to Cart
        </button>
        <!-- Add to Wishlist Button -->
        <button @click="showModal(item)" class="px-4 py-2 mt-2 text-white bg-green-500 rounded">
          Add to Wishlist
        </button>
      </div>
    </div>
    
    <!-- Modal Component -->
    <Modal :show="isModalVisible" @close="isModalVisible = false">
      <div class="p-4 bg-white rounded">
        <h3 class="text-xl">Item Added to Wishlist</h3>
        <p>{{ selectedItem.name }} has been added to your wishlist!</p>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import itemsData from '@/data/items.json'; // Import the JSON file

const store = useStore();
const items = itemsData;

const isModalVisible = ref(false);
const selectedItem = ref(null);

function addToCart(item) {
  store.dispatch('addToCart', item);
}

function showModal(item) {
  store.dispatch('addToWishlist', item);
  selectedItem.value = item;
  isModalVisible.value = true;
}
</script>
