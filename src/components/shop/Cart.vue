<template>
  <Drawer :isOpen="isOpen" @close="closeCart"
  header="Cart"
  >
    <ul>
      <li
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-col pb-2 mb-2 border-b"
      >
        <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
        <div class="flex items-center justify-between">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="flex items-center mt-1 space-x-2">
          <button
            @click="updateQuantity(item.id, item.quantity - 1)"
            class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            :disabled="item.quantity <= 0"
          >
            -
          </button>
          <input
            v-model.number="item.quantity"
            @input="updateQuantity(item.id, item.quantity)"
            class="w-12 text-center border rounded"
            type="number"
            min="1"
          />
          <button
            @click="updateQuantity(item.id, item.quantity + 1)"
            class="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
          >
            +
          </button>
          <button
            @click="removeFromCart(item.id)"
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
  </Drawer>
</template>

<script setup>
import { computed } from 'vue';
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

function closeCart() {
  emit('close-cart');
}

function updateQuantity(id, quantity) {
  if (quantity <= 0) {
    removeFromCart(id);
  } else {
    store.dispatch('updateQuantity', { id, quantity });
  }
}

function removeFromCart(id) {
  store.dispatch('removeFromCart', id);
}

function navigateToCheckout() {
  emit('close-cart');
}
</script>
