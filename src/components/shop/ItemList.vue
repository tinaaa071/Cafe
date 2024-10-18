<template>
  <div class="flex flex-col gap-3 justify-end sm:justify-between sm:flex-row sm:gap-4">
    <!-- Tab -->
    <div class="flex gap-3 text-sm font-bold sm:gap-4">
      <button @click="resetFilter" :class="{'bg-stone-900 text-white': isAllItemsActive(), 'bg-white': !isAllItemsActive()}" class="px-3 py-2.5 border-2 transition-colors duration-300 sm:py-4 sm:px-6 border-stone-900 hover:bg-stone-500 hover:text-white">
        所有商品
      </button>
      <button v-for="type in uniqueTypes" :key="type" @click="filterByType(type)" :class="{'bg-stone-900 text-white': isTypeActive(type), 'bg-white': !isTypeActive(type)}" class="px-3 py-2.5 border-2 transition-colors duration-300 sm:py-4 sm:px-6 border-stone-900 hover:bg-stone-500 hover:text-white">
        {{ type }}
      </button>
    </div>
    <!-- 篩選金額 -->
    <select @change="sortByPrice" class="px-3 py-2.5 w-full h-12 text-sm font-bold leading-none bg-white border-2 transition-colors duration-300 appearance-none sm:w-40 sm:h-16 sm:px-6 border-stone-900">
      <option value="">價格篩選</option>
      <option value="asc">價格：由低到高</option>
      <option value="desc">價格：由高到低</option>
    </select>
  </div>
  <div class="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 sm:gap-y-12 lg:gap-x-16">
    <div v-for="(item, index) in filteredItems" :key="index" class="flex flex-col items-center p-6 bg-white group">
      <!-- 圖片 -->
      <div class="relative mb-5 sm:mb-6 w-full border-2 aspect-[3/2] border-stone-900 overflow-hidden">
        <img :src="item.image" :alt="item.name" class="object-cover transition-all duration-300 group-hover:scale-110" />
        <!-- 加入最愛 -->
        <button @click="toggleWishlist(item)" 
        class="absolute top-0 right-0 p-4 text-white"
        >
          <component
            :is="isInWishlist(item) ? 'SolarHeartBold' : 'SolarHeartLinear'"
            class="text-xl text-white"
          />
        </button>
        <!-- 標籤 -->
        <p class="absolute right-4 bottom-4 px-3 py-1 text-sm font-medium rounded-full cursor-default bg-B3 text-stone-500">
          {{ item.type }}
        </p>
      </div>
      <!-- 資訊 -->
      <div class="w-full text-center cursor-default">
        <h3 class="mb-2 text-lg font-bold text-stone-900">
          {{ item.name }}
        </h3>
        <p class="mb-4 font-bold text-stone-500">
          ${{ item.price }}
        </p>
        <!-- 按鈕 -->
        <div class="flex gap-2">
          <!-- 查看更多 -->
          <router-link :to="{ path: `/item/${item.id}` }" class="w-full">
            <button class="py-3 w-full text-sm text-white transition-colors duration-300 bg-stone-900 hover:bg-stone-500">
              查看更多
            </button>
          </router-link>
          <!-- 加入購物車 -->
          <button @click="addToCart(item)" class="px-4 bg-white border-2 transition-colors duration-300 text-stone-900 border-stone-900 hover:bg-stone-200">
            <SolarCart3Linear class="text-xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add to Wishlist Modal -->
    <Modal :show="isModalVisible" @close="isModalVisible = false">
      <div class="p-4 bg-white rounded">
        <h3 class="text-xl">Item Added to Wishlist</h3>
        <p>{{ selectedItem.name }} has been added to your wishlist!</p>
      </div>
    </Modal>

    <!-- Remove from Wishlist Confirmation Modal -->
    <Modal :show="isRemovalModalVisible" @close="isRemovalModalVisible = false">
      <div class="p-4 bg-white rounded">
        <h3 class="text-xl">Confirm Removal</h3>
        <p>Are you sure you want to remove {{ selectedItem.name }} from your wishlist?</p>
        <button @click="removeFromWishlist" class="px-4 py-2 mt-2 text-white bg-red-500 rounded">
          Yes, Remove
        </button>
        <button @click="isRemovalModalVisible = false" class="px-4 py-2 mt-2 text-white bg-gray-500 rounded">
          Cancel
        </button>
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
        }, 1200);
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
