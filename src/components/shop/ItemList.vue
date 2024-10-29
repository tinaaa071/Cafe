<template>
  <div class="flex flex-col gap-3 justify-end mb-8 sm:justify-between sm:flex-row sm:gap-4 sm:mb-12">
    <!-- Tab -->
    <div 
    ref="tabsContainer"
    class="flex overflow-hidden overflow-x-auto flex-nowrap gap-3 text-sm font-bold sm:gap-4">
      <button @click="resetFilter" :class="{'bg-stone-900 text-white dark:bg-white dark:text-stone-900': isAllItemsActive(), 'bg-white dark:bg-transparent dark:text-white': !isAllItemsActive()}" class="px-3 py-3 whitespace-nowrap border-2 transition-colors duration-300 sm:px-6 border-stone-900 hover:bg-stone-500 hover:text-white dark:border-white dark:hover:bg-stone-700 dark:hover:text-white">
        所有商品
      </button>
      <button v-for="type in uniqueTypes" :key="type" @click="filterByType(type)" :class="{'bg-stone-900 text-white dark:bg-white dark:text-stone-900': isTypeActive(type), 'bg-white dark:bg-transparent dark:text-white': !isTypeActive(type)}" 
      class="px-3 py-3 whitespace-nowrap border-2 transition-colors duration-300 sm:px-6 border-stone-900 hover:bg-stone-500 hover:text-white dark:border-white dark:hover:bg-stone-700 dark:hover:text-white">
        {{ type }}
      </button>
    </div>
    <!-- 篩選金額 -->
    <select @change="sortByPrice" class="px-3 py-2.5 w-full h-12 text-sm font-bold leading-none bg-white border-2 transition-colors duration-300 appearance-none sm:w-40 sm:h-16 sm:px-6 border-stone-900 dark:border-white dark:bg-transparent dark:text-white">
      <option value="">價格篩選</option>
      <option value="asc">價格：由低到高</option>
      <option value="desc">價格：由高到低</option>
    </select>
  </div>

  <!-- 商品卡片 -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 sm:gap-y-12 lg:gap-x-16">
    <div v-for="(item, index) in filteredItems" :key="index" class="flex flex-col items-center p-6 bg-white group dark:bg-transparent dark:border-2 dark:border-white dark:text-white">
      <!-- 圖片 -->
      <div class="relative mb-5 sm:mb-6 w-full border-2 aspect-[5/4] border-stone-900 overflow-hidden flex items-center justify-center dark:border-2 dark:border-white text-stone-900">
        <img :src="item.image" :alt="item.name" class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" />
        <!-- 加入最愛 -->
        <button @click="toggleWishlist(item)" 
        class="absolute top-0 right-0 p-4 text-white"
        >
        <component
          :is="isInWishlist(item) ? 'SolarHeartBold' : 'SolarHeartLinear'"
          :class="isInWishlist(item) ? 'text-pink-200' : 'text-white'"
          class="text-xl transition-colors duration-300"
        />
        </button>
        <!-- 標籤 -->
        <p class="absolute right-4 bottom-4 px-3 py-1 text-sm font-medium whitespace-nowrap rounded-full cursor-default bg-B3 text-stone-500 h-fit dark:bg-stone-500 dark:text-white">
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
        <div class="flex gap-2">
          <!-- 查看更多 -->
          <router-link :to="{ path: `/item/${item.id}` }" class="w-full">
            <button class="text-sm button-main">
              查看更多
            </button>
          </router-link>
          <!-- 加入購物車 -->
          <button @click="addToCart(item)" class="px-4 bg-white border-2 transition-colors duration-300 border-stone-900 hover:bg-stone-200 dark:bg-transparent dark:border-2 dark:border-white dark:hover:bg-stone-700">
            <SolarCart3Linear class="text-xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- 加入最愛 Modal -->
    <Modal :show="isModalVisible" @close="isModalVisible = false">
      <div class="p-5 text-base font-bold text-center md:text-xl">
        <img :src="selectedItem ? selectedItem.image : ''" alt="" class="object-cover mb-4 border-2 aspect-[5/4] border-stone-900 md:mb-6">
        <p class="mb-3 text-stone-500">
          {{ selectedItem.name }}
        </p>
        <p>
          已加入願望清單！
        </p>
      </div>
    </Modal>

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
  </div>
</template>

<script>
import { useStore } from 'vuex';
import SolarHeartBold from '~icons/solar/heart-bold';
import SolarHeartLinear from '~icons/solar/heart-linear';
import { ref, onMounted } from "vue";
import { database } from "@/firebaseConfig"; // 引入 Firebase 設定
import { ref as dbRef, onValue } from "firebase/database"; // 使用 Firebase database 的 ref 和 onValue

export default {
  components: {
    SolarHeartBold,
    SolarHeartLinear
  },
  data() {
    return {
      items: [], // 將 itemsData 改為從 Firebase 獲取資料
      filteredItems: [], // 新增篩選後的項目
      isModalVisible: false,
      isRemovalModalVisible: false,
      selectedItem: null,
      uniqueTypes: [], // 儲存唯一的 type
      activeType: null,
    };
  },
  computed: {
    store() {
      return useStore();
    }
  },
  mounted() {
    // 從 Firebase 讀取資料
    const itemsRef = dbRef(database, 'items'); // 指向 'items' 路徑
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      this.items = data ? Object.entries(data).map(([id, item]) => ({ id, ...item })) : [];
      this.filteredItems = this.items; // 初始化篩選項目
      this.uniqueTypes = [...new Set(this.items.map(item => item.type))]; // 獲取唯一的 type
    });
    
    const container = this.$refs.tabsContainer;

    container.addEventListener('wheel', (e) => {
      e.preventDefault(); // 禁止垂直滾動
      container.scrollLeft += e.deltaY; // 讓滾輪控制水平滾動
    });
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch('addToCart', item);
      this.$emit('add-to-cart');
    },
    toggleWishlist(item) {
      if (this.isInWishlist(item)) {
        this.selectedItem = item;
        this.isRemovalModalVisible = true;
      } else {
        this.store.dispatch('addToWishlist', item);
        this.selectedItem = item;
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 2000);
      }
    },
    isInWishlist(item) {
      return this.store.getters.wishlistItems.some((i) => i.id === item.id);
    },
    removeFromWishlist() {
      this.store.dispatch('removeFromWishlist', this.selectedItem.id);
      this.isRemovalModalVisible = false;
    },
    filterByType(type) {
      this.filteredItems = this.items.filter(item => item.type === type);
      this.activeType = type; // 設定當前選擇的類型
    },
    resetFilter() {
      this.filteredItems = this.items;
      this.activeType = null; // 重置當前選擇的類型
    },
    isAllItemsActive() {
      return this.activeType === null; // 判斷是否為所有商品
    },
    isTypeActive(type) {
      return this.activeType === type; // 判斷當前類型是否為選擇的類型
    },
    sortByPrice(event) {
    const order = event.target.value;
    if (order === 'asc') {
      this.filteredItems.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      this.filteredItems.sort((a, b) => b.price - a.price);
    }
  },
  }
};
</script>

<style scoped>
.flex {
  -ms-overflow-style: none;  /* IE 和 Edge */
  scrollbar-width: none;     /* Firefox */
}

.flex::-webkit-scrollbar {
  display: none; /* Chrome, Safari 和 Opera */
}
</style>
