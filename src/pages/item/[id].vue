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
        <!-- Quantity control -->
        <div class="flex items-center mt-1 space-x-2">
          <button
            @click="updateQuantity(-1)"
            class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            :disabled="quantity <= 1"
          >
            -
          </button>
          <input
            v-model.number="quantity"
            @input="handleInput"
            class="w-12 text-center border rounded"
            min="1"
          />
          <button
            @click="updateQuantity(1)"
            class="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
        <button @click="addToCart" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
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
import itemsData from '@/data/items.json';

const route = useRoute();
const store = useStore();

const isCartOpen = ref(false);
const quantity = ref(1); // Default quantity

const item = computed(() => {
  const id = parseInt(route.params.id, 10);
  return itemsData[id] || null;
});

const updateQuantity = (change) => {
  quantity.value = Math.max(quantity.value + change, 1); // Ensure quantity is at least 1
};

const handleInput = (event) => {
  quantity.value = Math.max(Number(event.target.value) || 1, 1); // Ensure quantity is at least 1
};

const addToCart = () => {
  if (item.value) {
    const itemData = {
      id: item.value.id,
      name: item.value.name,
      price: item.value.price,
      image: item.value.image,
    };
    // 调用 Vuex action，传递商品的完整信息和数量
    store.dispatch('addOrUpdateCart', { id: item.value.id, quantity: quantity.value, itemData });
    isCartOpen.value = true; // 打开购物车
  }
};

const closeCart = () => {
  isCartOpen.value = false;
};
</script>
