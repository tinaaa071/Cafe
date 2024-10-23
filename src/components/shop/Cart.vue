<template>
  <Drawer :isOpen="isOpen" @close="closeCart" header="購物車">
    <!-- 商品區塊 -->
    <div class="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hidden">
      <ul>
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="flex flex-row gap-4 items-center py-4 border-b sm:py-6 md:gap-6 border-stone-300"
        >
          <!-- 圖片 -->
          <img :src="item.image" :alt="item.name" class="object-cover w-20 border-2 aspect-square border-stone-900 dark:border-white" />
          <!-- 商品 -->
          <div class="flex gap-10 items-start w-full">
            <!-- 商品資訊 -->
            <div class="flex flex-col gap-4 w-full">
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
      <p v-if="!cartItems.length" class="text-center text-stone-400 md:text-xl">
        您的購物車是空的
      </p>
    </div>
    <!-- 總金額區塊 -->
    <div class="sticky bottom-0 left-0 pt-6">
      <!-- 金額 -->
      <div class="flex justify-between items-center mb-6 font-bold sm:text-lg">
        <span>
          總金額：
        </span>
        <span class="text-stone-500 dark:text-stone-400">
          ${{ cartTotal.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
        </span>
      </div>
      <!-- 按鈕 -->
      <router-link to="/checkout">
        <button
          @click="navigateToCheckout"
          class="button-main"
          :disabled="!cartItems.length"
        >
          結帳
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

<style scoped>
.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
</style>