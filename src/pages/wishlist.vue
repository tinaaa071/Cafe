<template>
  <div class="h-screen bg-B4">
    <Layout>
      <template #content>
        <h1 class="mb-6 text-2xl font-bold text-center sm:text-4xl sm:mb-10 text-stone-900 dark:text-white">
          願望清單
        </h1>
        <!-- 願望清單無資料 -->
        <div v-if="wishlistItems.length === 0" class="flex flex-col gap-4 justify-center font-bold text-center sm:text-xl">
          <p class="text-stone-400">
            無收藏資料 
          </p>
          <router-link to="/shop" class="px-6 mx-auto button-main w-fit">
            回到商品頁
          </router-link>
        </div>
        
        <!-- 願望清單卡片 -->
        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 sm:gap-y-12 lg:gap-x-16">
          <div
            v-for="item in wishlistItems" :key="item.id"
            class="flex flex-col items-center p-6 bg-white group dark:bg-transparent dark:border-2 dark:border-white dark:text-white"
          >
            <div class="relative mb-5 sm:mb-6 w-full border-2 aspect-[5/4] border-stone-900 overflow-hidden dark:border-white text-stone-900 flex items-center justify-center">
              <!-- 圖片 -->
              <img :src="item.image" :alt="item.name" class="object-cover transition-all duration-300 group-hover:scale-110" />
              <!-- 加入最愛 -->
              <button
                class="absolute top-0 right-0 p-4"
                @click="confirmRemoveFromWishlist(item)"
              >
                <SolarHeartBold class="text-xl text-pink-200" />
              </button>
              <!-- 標籤 -->
              <p class="absolute right-4 bottom-4 px-3 py-1 text-sm font-medium rounded-full cursor-default bg-B3 text-stone-500 dark:bg-stone-500 dark:text-white">
                {{ item.type }}
              </p>
            </div>
            <!-- 資訊 -->  
            <div class="w-full text-center cursor-default">
              <h3 class="mb-2 text-lg font-bold">
                {{ item.name }}
              </h3>
              <p class="mb-4 font-bold text-stone-500 dark:text-stone-400">
                ${{ item.price.toLocaleString() }}
              </p>
              <!-- 按鈕 -->
              <RouterLink
                :to="{ path: `/item/${item.id}` }"
                class="w-full"
                @click="confirmRemoveFromWishlist(item)"
                >
                  <button class="py-3 w-full text-sm text-white transition-colors duration-300 bg-stone-900 hover:bg-stone-500 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-500 dark:hover:text-white">
                    查看更多
                  </button>
                </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </Layout>
  </div>
  
  <!-- 移除收藏 Modal -->
  <Modal :show="isRemovalModalVisible" @close="isRemovalModalVisible = false">
      <div class="p-5 text-base font-bold text-center md:text-xl">
        <img :src="selectedItem ? selectedItem.image : ''" alt="" class="object-cover mb-4 border-2 aspect-[5/4] border-stone-900 md:mb-6">
        <p class="mb-3 text-stone-500">
          {{ selectedItem.name }}
        </p>
        <p class="mb-6">
          確定要將此商品移除願望清單嗎？
        </p>
        <div class="grid grid-cols-2 gap-3 text-sm md:text-base">
          <!-- 取消 -->
          <button @click="isRemovalModalVisible = false" class="py-3 border-2 transition-colors duration-300 md:py-4 border-stone-900 hover:bg-stone-200">
            取消
          </button>
          <!-- 移除 -->
          <button @click="removeFromWishlist" class="py-3 text-white border-2 transition-colors duration-300 md:py-4 bg-stone-900 border-stone-900 hover:bg-stone-500">
            確認移除
          </button>
        </div>
      </div>
    </Modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SolarHeartBold from '~icons/solar/heart-bold'; // Import SolarHeartBold icon

// Access Vuex store
const store = useStore();

// Retrieve wishlist items from Vuex store using getter
const wishlistItems = computed(() => store.getters.wishlistItems);

// State variables for modal visibility and selected item
const isRemovalModalVisible = ref(false);
const selectedItem = ref(null);

// Show confirmation modal
const confirmRemoveFromWishlist = (item) => {
  selectedItem.value = item;
  isRemovalModalVisible.value = true;
};

// Dispatch action to remove item from wishlist
const removeFromWishlist = () => {
  if (selectedItem.value) {
    store.dispatch('removeFromWishlist', selectedItem.value.id);
    selectedItem.value = null;
    isRemovalModalVisible.value = false;
  }
};
</script>
