<template>
  <div class="checkout-container">
    <h1 class="mb-4 text-3xl font-bold">Checkout</h1>

    <div class="cart-summary">
      <h2 class="mb-2 text-2xl font-semibold">Cart Summary</h2>
      <ul class="pl-5 mb-4 list-disc">
        <li v-for="item in cartItems" :key="item.id" class="mb-2">
          <div class="flex items-center justify-between">
            <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
            <span>{{ item.name }} (x{{ item.quantity }})</span> - $
            {{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button
              @click="updateQuantity(item.id, item.quantity - 1)"
              class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              :disabled="item.quantity <= 0"
            >
              -
            </button>
            <input
              v-model.number="item.quantity"
              @change="updateQuantity(item.id, item.quantity)"
              class="w-12 text-center border rounded"
              type="number"
              min="1"
            />
            <button
              @click="updateQuantity(item.id, item.quantity + 1)"
              class="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
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
      <div class="flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span>${{ cartTotal.toFixed(2) }}</span>
      </div>
    </div>

    <div class="mt-6 checkout-form">
      <h2 class="mb-2 text-2xl font-semibold">Billing Information</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block mb-1">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-1">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block mb-1">Address</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotal);

const form = ref({
  name: '',
  email: '',
  address: ''
});

function handleSubmit() {
  console.log('Form submitted:', form.value);
  alert('Order placed successfully!');
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
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
