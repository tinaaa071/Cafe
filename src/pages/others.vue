<template>
  <div class="relative">
    <!-- Navbar with cart badge -->
    <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />

    <!-- Main content area -->
    <div class="flex-1 p-4">
      <ItemList @add-to-cart="showCart" />
    </div>

    <!-- Shopping Cart Drawer -->
    <Cart :isOpen="isCartOpen" @close-cart="isCartOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const cartItems = ref([]);
const isCartOpen = ref(false);
function showCart() {
  isCartOpen.value = true;
}

const addToCart = (item) => {
  cartItems.value.push(item);
  isCartOpen.value = true; // Automatically open the cart when an item is added
};

const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
};

const closeCart = () => {
  isCartOpen.value = false;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};
</script>


