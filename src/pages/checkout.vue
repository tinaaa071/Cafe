<template>
  <Layout>
    <template #content>
      <h1 class="mb-4 text-3xl font-bold">Checkout</h1>

    <!-- Cart Summary -->
    <div v-if="!orderPlaced" class="cart-summary">
      <h2 class="mb-2 text-2xl font-semibold">Cart Summary</h2>
      <ul class="pl-5 mb-4 list-disc">
        <li v-for="item in cartItems" :key="item.id" class="mb-2">
          <div class="flex justify-between items-center">
            <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
            <span>{{ item.name }} (x{{ item.quantity }})</span> - $
            {{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <div class="flex gap-2 items-center mt-2">
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
              class="w-12 text-center rounded border"
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

    <!-- Billing Information -->
    <div v-if="!orderPlaced" class="mt-6 checkout-form">
      <h2 class="mb-2 text-2xl font-semibold">Billing Information</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block mb-1">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="p-2 w-full rounded border border-gray-300"
            required
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-1">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="p-2 w-full rounded border border-gray-300"
            required
          />
        </div>

        <!-- Phone Field -->
        <div class="mb-4">
          <label for="phone" class="block mb-1">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="p-2 w-full rounded border border-gray-300"
            required
          />
        </div>

        <!-- Payment Radio Group -->
        <div class="mb-4">
          <label class="block mb-1">Payment Method</label>
          <div class="flex gap-4 items-center">
            <label>
              <input
                type="radio"
                v-model="form.payment"
                value="credit"
                required
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                v-model="form.payment"
                value="paypal"
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                v-model="form.payment"
                value="bank"
              />
              Bank Transfer
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label for="address" class="block mb-1">Address</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            class="p-2 w-full rounded border border-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          class="py-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>

    <!-- Order Confirmation Card -->
    <div v-if="orderPlaced" class="p-6 bg-gray-100 rounded shadow-md order-card">
      <h2 class="mb-4 text-2xl font-semibold">Order Confirmation</h2>
      <p class="mb-4">Thank you, <strong>{{ orderInfo.name }}</strong>, for your order!</p>
      <p class="mb-4">We will send a confirmation email to <strong>{{ orderInfo.email }}</strong> shortly.</p>
      <p class="mb-4">Phone: <strong>{{ orderInfo.phone }}</strong></p>
      <p class="mb-4">Payment Method: <strong>{{ orderInfo.payment }}</strong></p>
      <p class="mb-4">Shipping to: <strong>{{ orderInfo.address }}</strong></p>
      
      <!-- Display the order date -->
      <p class="mb-4"><strong>Order Date:</strong> {{ new Date(orderInfo.date).toLocaleDateString() }}</p> 

      <p class="mb-4"><strong>Order Number:</strong> {{ orderInfo.orderNumber }}</p>

      <h3 class="mb-2 text-xl font-semibold">Your Order:</h3>
      <ul class="pl-5 mb-4 list-disc">
        <li v-for="item in orderInfo.items" :key="item.id" class="mb-2">
          <img :src="item.image" :alt="item.name" class="object-cover mr-4 w-16 h-16 rounded" />
          <span>{{ item.name }} (x{{ item.quantity }})</span> - $
          {{ (item.price * item.quantity).toFixed(2) }}
        </li>
      </ul>

      <div class="text-lg font-bold">
        <span>Total:</span> ${{ orderInfo.total.toFixed(2) }}
      </div>
    </div>

    <!-- Orders BTN -->
    <div v-if="orderPlaced" class="">
      <RouterLink to="/orders" class="flex gap-2 items-center p-4 text-xl bg-slate-300">
        <SolarHeartLinear />
        <p>我的訂單</p>
      </RouterLink>
    </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotal);

const form = ref({
  name: '',
  email: '',
  phone: '',  // Added phone field
  payment: '',  // Updated for radio group
  address: ''
});

const orderPlaced = ref(false);
const orderInfo = ref(null);

function handleSubmit() {
  // Generate the order info with the current order number
  const newOrderInfo = {
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    payment: form.value.payment,
    address: form.value.address,
    items: cartItems.value,
    total: cartTotal.value,
    date: new Date().toISOString()
  };

  // Place the order in Vuex store
  store.dispatch('placeOrder', newOrderInfo);

  // Empty the cart (optional)
  store.dispatch('clearCart');

  // Mark order as placed
  orderPlaced.value = true;

  // Store the order number in orderInfo for display
  orderInfo.value = {
    ...newOrderInfo,
    orderNumber: store.state.lastOrderNumber // Get the latest order number from Vuex state
  };
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

.order-card {
  margin-top: 20px;
}
</style>
