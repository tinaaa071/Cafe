<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">Item List</h2>
    <div v-for="(item, index) in items" :key="index" class="flex items-center p-4 mb-4 space-x-4 border rounded">
      <!-- Display Item Image -->
      <img :src="item.image" :alt="item.name" class="object-cover w-24 h-24 rounded" />
      <div>
        <h3 class="text-xl">{{ item.name }}</h3>
        <p class="text-lg">${{ item.price }}</p>
        <router-link :to="{ path: `/item/${item.id}` }">
          <button class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
              View Details
          </button>
        </router-link>
        <button @click="addToCart(item)" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
          Add to Cart
        </button>
        <!-- Add to Wishlist Button -->
        <button @click="toggleWishlist(item)" class="px-4 py-2 mt-2 text-white rounded">
          <component
            :is="isInWishlist(item) ? 'SolarHeartBold' : 'SolarHeartLinear'"
            class="text-red-500"
          />
        </button>
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
      isModalVisible: false,
      isRemovalModalVisible: false,
      selectedItem: null
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
    }
  }
};
</script>
