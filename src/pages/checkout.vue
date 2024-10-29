<template>
  <Layout>
    <template #content>
      <div class="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2 dark:text-white">
        <!-- 購物車總覽 -->
        <div v-if="!orderPlaced" class="cart-summary lg:overflow-y-auto lg:h-[calc(100vh-200px)]">
          <h2 class="pb-4 text-xl font-bold lg:z-10 lg:top-0 lg:sticky sm:text-3xl bg-B4 dark:bg-stone-900">
            購物車總覽
          </h2>
          <!-- 商品卡 -->
          <ul class="mb-4 md:mb-6">
            <li v-for="item in cartItems" :key="item.id" class="flex flex-row gap-4 items-center py-8 border-b lg:gap-6 border-stone-300">
              <!-- 圖片 -->
              <img :src="item.image" :alt="item.name" class="object-cover w-20 border-2 aspect-square border-stone-900 dark:border-white" />
              <!-- 商品 -->
              <div class="flex gap-10 justify-between items-start w-full">
                <!-- 商品資訊 -->
                <div class="flex flex-col gap-4 w-full lg:w-fit">
                  <!-- 商品名稱 -->
                  <span class="text-sm font-bold md:text-base">
                    {{ item.name }}
                  </span>
                  <!-- 數量按鈕 -->
                  <div class="flex items-center text-xs border-2 border-stone-900 text-stone-900 sm:text-sm w-fit dark:border-white dark:text-white">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="p-1.5 border-r-2 sm:py-2 sm:px-3 border-stone-900 dark:border-white"
                    :disabled="item.quantity <= 0"
                  >
                    <IcBaselineMinus />
                  </button>
                  <input
                    v-model.number="item.quantity"
                    @input="updateQuantity(item.id, item.quantity)"
                    class="w-8 h-8 text-center bg-transparent border-none appearance-none sm:w-10"
                    type="text"
                    min="1"
                  />
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="p-1.5 border-l-2 sm:py-2 sm:px-3 border-stone-900 dark:border-white"
                  >
                    <IcBaselinePlus />
                  </button>
                </div>
                </div>
                <!-- 刪除＆金額 -->
                <div class="flex flex-col gap-3 items-end md:gap-4">
                  <!-- 刪除按鈕 -->
                  <button
                  @click="removeFromCart(item.id)"
                  class="p-2 text-sm rounded-lg transition-colors duration-300 sm:rounded-xl sm:p-3 bg-stone-200 text-stone-500 sm:text-base hover:bg-stone-300"
                  >
                    <SolarTrashBinTrashLinear />
                  </button>
                  <!-- 價錢 -->
                  <span class="font-bold text-stone-500 dark:text-stone-400">
                    ${{ (item.price * item.quantity).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <!-- 總金額 -->
          <div class="flex justify-between items-center mb-6 font-bold sm:text-lg">
              <span>
                總金額：
              </span>
              <span class="text-stone-500 dark:text-stone-400">
                ${{ cartTotal.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
              </span>
            </div>
        </div>

        <!-- 結帳資訊 -->
        <div v-if="!orderPlaced" class="checkout-form">
          <h2 class="mb-4 text-xl font-bold sm:text-3xl sm:mb-6">
            結帳資訊
          </h2>
          <form @submit.prevent="handleSubmit">
            <!-- 姓名 -->
            <div class="mb-4">
              <label for="name" class="block mb-2">
                姓名：
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="input"
                required
              />
            </div>

            <!-- 電話 -->
            <div class="mb-4">
              <label for="phone" class="block mb-2">
                電話：
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="input"
                required
              />
            </div>

            <!-- 電子郵件 -->
            <div class="mb-4">
              <label for="email" class="block mb-2">
                電子郵件：
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="input"
                required
              />
            </div>

            <!-- 付款方式 -->
            <div class="mb-4">
              <label class="block mb-2">
                付款方式：
              </label>
              <div class="flex gap-4 items-center">
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.payment"
                    value="信用卡"
                    required
                    class="radio"
                  />
                  信用卡
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.payment"
                    value="Paypal"
                    class="radio"
                  />
                  PayPal
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.payment"
                    value="線上轉帳"
                    class="radio"
                  />
                  線上轉帳
                </label>
              </div>
            </div>

            <!-- 地址 -->
            <div class="mb-6 md:mb-10">
              <label for="address" class="block mb-2">
                地址：
              </label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                class="input"
                required
              />
            </div>

            <!-- 結帳按鈕 -->
            <button
              type="submit"
              class="button-main"
            >
              結帳
            </button>
          </form>
        </div>
      </div>

      <!-- 完成訂單 -->
      <div v-if="orderPlaced" class="mx-auto max-w-4xl order-card">
        <!-- 訂單資訊 -->
        <div class="p-6 bg-white border-2 cursor-default dark:border-white border-stone-900 dark:bg-transparent dark:text-white">
          <!-- 訂單編號 -->
          <div class="flex flex-col gap-1 justify-between mb-2 font-bold sm:items-center sm:flex-row sm:mb-3">
            <h2 class="text-lg md:text-xl">
              Order #{{ orderInfo.orderNumber }}
            </h2>
            <p class="order-first text-sm sm:text-base sm:order-last">
              {{ new Date(orderInfo.date).toLocaleDateString() }}
            </p>
          </div>
          <!-- 訂購人資料 -->
          <ul class="mb-5 list-disc list-inside text-stone-500 sm:mb-6 dark:text-stone-400">
            <li class="mb-0.5">
              姓名： 
              <span>{{ orderInfo.name }}</span>
            </li>
            <li class="mb-0.5">
              電話：
              <span>{{ orderInfo.phone }}</span>
            </li>
            <li class="mb-0.5">
              電子郵件：
              <span>{{ orderInfo.email }}</span>
            </li>
            <li class="mb-0.5">
              付款方式：
              <span>{{ orderInfo.payment }}</span>
            </li>
            <li class="mb-0.5">
              地址：
              <strong>{{ orderInfo.address }}</strong>
            </li>
          </ul>

          <hr class="mb-5 border-stone-300 sm:mb-6">

          <h3 class="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">
            商品資訊
          </h3>
          <ul class="mb-5 sm:mb-6">
            <li v-for="item in orderInfo.items" :key="item.id" class="flex gap-4 mb-2 sm:mb-3 sm:gap-6">
              <!-- 圖片 -->
              <img :src="item.image" :alt="item.name" class="object-cover w-14 border-2 aspect-square border-stone-900 dark:border-white" />
              <!-- 商品資訊 -->
              <div class="flex flex-col gap-2 justify-between w-full sm:items-center sm:flex-row">
                <!-- 商品名稱 -->
                <span class="text-sm font-bold md:text-xl">
                    {{ item.name }}
                  </span>
                <!-- 數量＆價格 -->
                <div class="flex justify-between items-center w-full sm:w-fit sm:gap-6">
                  <!-- 數量 -->
                  <span>
                    x{{ item.quantity }}
                  </span> 
                  <!-- 價格 -->
                  <span class="text-right text-stone-500 sm:w-16 dark:text-stone-400">
                  ${{ (item.price * item.quantity).toLocaleString('en-US') }}
                  </span>
                </div>
              </div>
            </li>
          </ul>

          <hr class="mb-5 border-stone-300 sm:mb-6">
          
          <div class="flex justify-between text-lg font-bold">
            <span>
              總金額
            </span> 
            ${{ orderInfo.total.toLocaleString('en-US') }}
          </div>
        </div>

        <!-- 返回訂單頁面按鈕 -->
        <div v-if="orderPlaced" class="mt-6">
          <RouterLink to="/orders" class="button-main">
            <SolarBillListLinear />
            <p>我的訂單</p>
          </RouterLink>
        </div>
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
.cart-summary::-webkit-scrollbar {
  display: none; /* 隱藏滾動條 */
}
</style>
