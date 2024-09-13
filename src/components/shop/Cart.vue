<template>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50"
        @click="$emit('close-cart')"
      ></div>
    </transition>
  
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-50 h-full p-4 transition-transform transform bg-white shadow-lg w-80"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
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
            class="flex flex-col pb-2 mb-2 border-b"
          >
          <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
            <div class="flex items-center justify-between">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="flex items-center mt-1 space-x-2">
              <button
                @click="updateQuantity(item.name, item.quantity - 1)"
                class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                :disabled="item.quantity === 1"
              >
                -
              </button>
              <input
                v-model.number="item.quantity"
                @input="updateQuantity(item.name, item.quantity)"
                class="w-12 text-center border rounded"
                min="1"
              />
              <button
                @click="updateQuantity(item.name, item.quantity + 1)"
                class="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
              >
                +
              </button>
              <button
                @click="removeFromCart(item.name)"
                class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
        <p v-if="!cartItems.length" class="text-center text-gray-500">
          Your cart is empty.
        </p>
        <div class="mt-4">
          <div class="flex items-center justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          <router-link to="/checkout">
            <button
              @click="navigateToCheckout"
              class="w-full py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
              :disabled="!cartItems.length"
            >
              Checkout
            </button>
          </router-link>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { computed, defineEmits } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['close-cart']);
  
  const cartItems = computed(() => store.getters.cartItems);
  const cartTotal = computed(() => store.getters.cartTotal);
  
  function updateQuantity(itemName, quantity) {
    store.dispatch('updateQuantity', { itemName, quantity });
  }
  
  function removeFromCart(itemName) {
    store.dispatch('removeFromCart', itemName);
  }
  
  function navigateToCheckout() {
    emit('close-cart');
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
  