<template>
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-6 text-2xl font-bold text-center sm:text-4xl sm:mb-10 dark:text-white">
        我的訂單
      </h1>
  
      <div v-if="orders.length > 0" class="grid grid-cols-1 gap-6">
        <div
          v-for="order in reversedOrders"
          :key="order.orderNumber"
          class="p-6 bg-white border-2 cursor-default border-stone-900 order-card dark:border-white dark:bg-transparent dark:text-white"
        >
          <!-- 訂單編號 -->
          <div class="flex flex-col gap-1 justify-between mb-2 font-bold sm:items-center sm:flex-row sm:mb-3">
            <h2 class="mb-2 text-xl font-semibold">
              Order #{{ order.orderNumber }}
            </h2>
            <p class="order-first text-sm sm:text-base sm:order-last">
              {{ new Date(order.date).toLocaleDateString() }}
              </p>
          </div>
          
          <!-- 訂購人資料 -->
          <ul class="mb-5 list-disc list-inside text-stone-500 sm:mb-6 dark:text-stone-400">
            <li class="mb-0.5">
              姓名： 
              <span>{{ order.name }}</span>
            </li>
            <li class="mb-0.5">
              電話：
              <span>{{ order.phone }}</span>
            </li>
            <li class="mb-0.5">
              電子郵件：
              <span>{{ order.email }}</span>
            </li>
            <li class="mb-0.5">
              付款方式：
              <span>{{ order.payment }}</span>
            </li>
            <li class="mb-0.5">
              地址：
              <strong>{{ order.address }}</strong>
            </li>
          </ul>
          
          <hr class="mb-5 border-stone-300 sm:mb-6">
          
          <h3 class="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">
            商品資訊
          </h3>
          <ul class="mb-5 sm:mb-6">
            <li
              v-for="item in order.items"
              :key="item.id"
              class="flex gap-4 items-center mb-2"
            >
              <!-- 圖片 -->
              <img
                :src="item.image"
                :alt="item.name"
                class="object-cover w-14 border-2 aspect-square border-stone-900 dark:border-white"
              />
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
            ${{ order.total.toLocaleString('en-US') }}
          </div>
        </div>
      </div>
  
      <div v-else class="flex flex-col gap-4 justify-center font-bold text-center sm:text-xl" >
        <p class="text-stone-400">
          無訂單資料 
        </p>
        <router-link to="/shop" class="px-6 mx-auto w-fit button-main">
          回到商品頁
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const orders = computed(() => store.state.orders);
  // Create a reversedOrders computed property
  const reversedOrders = computed(() => [...orders.value].reverse());
  </script>

  