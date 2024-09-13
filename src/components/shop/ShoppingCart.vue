<template>
    <transition name="fade">
      <!-- Overlay that covers the screen when the cart is open -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50"
        @click="$emit('close-cart')"
      ></div>
    </transition>
  
    <transition name="slide">
      <!-- Shopping cart drawer -->
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-50 h-full p-4 overflow-y-auto bg-white shadow-lg w-80"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold">Shopping Cart</h2>
          <button
            @click="$emit('close-cart')"
            class="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <ul>
          <li
            v-for="(item, index) in cartItems"
            :key="index"
            class="flex items-center justify-between pb-2 mb-2 border-b"
          >
            <span>{{ item.name }}</span>
            <span>${{ item.price }}</span>
            <button
              @click="$emit('remove-from-cart', index)"
              class="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        </ul>
        <p v-if="!cartItems.length" class="text-center text-gray-500">
          Your cart is empty.
        </p>
        <div class="mt-4">
          <div class="flex items-center justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${{ cartTotal }}</span>
          </div>
          <button
            @click="$emit('checkout')"
            class="w-full py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
            :disabled="!cartItems.length"
          >
            Checkout
          </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { computed, defineProps } from 'vue';
  
  const props = defineProps({
    cartItems: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  
  const cartTotal = computed(() =>
    props.cartItems.reduce((total, item) => total + item.price, 0)
  );
  </script>
  
  <script>
  export default {
    emits: ['close-cart', 'remove-from-cart', 'checkout']
  }
  </script>
  
  <style scoped>
  /* Slide animation for the cart drawer */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  
  /* Fade animation for the overlay */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  