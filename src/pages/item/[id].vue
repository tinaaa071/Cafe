<template>
  <div class="bg-B4 sm:pb-10 dark:bg-stone-900 text-stone-900">
    <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />
    <BackToTop class="z-20" />
    <div v-if="item" class="px-6 pt-24 pb-6 mx-auto min-h-screen sm:pt-28 md:pt-32 sm:px-10 xl:px-28">
      <!-- <button @click="$router.back()" class="px-4 py-2 mb-4 text-white bg-gray-500 rounded">
        Back to List
      </button> -->
      
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <!-- 主圖 -->
          <img :src="currentImage" :alt="item.name" class="object-cover w-full aspect-[3/2] border-2 border-stone-900" />
          <!-- 切換圖 -->
          <div class="grid grid-cols-4 gap-2">
            <img 
              v-for="(img, index) in item.image" 
              :key="index" 
              @click="changeImage(img)" 
              :src="img" 
              :alt="item.name" 
              class="object-cover w-full border-2 transition-all duration-300 cursor-pointer aspect-square border-stone-900 hover:brightness-75" 
            />
          </div>
        </div>
        <!-- 資訊 -->
        <div class="p-5 space-y-6 bg-white md:p-10 md:space-y-10">
          <!-- 商品資訊 -->
          <div class="flex justify-between items-start mb-3 md:mb-6">
            <!-- 資訊 -->
            <div class="">
              <!-- 標題 -->
              <h1 class="mb-2 text-lg font-bold md:text-3xl md:mb-4">
                {{ item.name }}
              </h1>
              <!-- 標籤 -->
              <p class="px-3 py-1 mb-3 text-sm font-medium rounded-full cursor-default bg-B3 text-stone-500 w-fit md:mb-6">
                {{ item.type }}
              </p>
              <!-- 價格 -->
              <p class="text-base font-bold md:text-3xl text-stone-500">
                ${{ item.price }}
              </p>
            </div>
            <!-- 我的最愛 -->
            <button @click="toggleWishlist" class="text-xl">
              <component
                :is="isInWishlist ? 'SolarHeartBold' : 'SolarHeartLinear'"
                class="text-stone-900"
              />
            </button>
          </div>
          <!-- 描述 -->
          <ul class="text-xs font-medium list-disc list-inside md:text-xl text-stone-500">
            <li v-for="(info, index) in item.info" :key="index">
              {{ info }}
            </li>
          </ul>
          <!-- 按鈕 -->
          <div class="flex flex-col gap-2 md:gap-4 md:flex-row">
            <!-- 數量 -->
            <div class="flex items-center border-2 border-stone-900 text-stone-900">
              <button
                @click="updateQuantity(-1)"
                class="px-3 py-2 border-r-2 border-stone-900"
                :disabled="quantity <= 1"
              >
                <IcBaselineMinus />
              </button>
              <input
                v-model.number="quantity"
                @input="handleInput"
                class="w-full text-center border-none"
                min="1"
              />
              <button
                @click="updateQuantity(1)"
                class="px-3 py-2 border-l-2 border-stone-900"
              >
                <IcBaselinePlus />
              </button>
            </div>
            <!-- 加入購物車 -->
            <button @click="addToCart" class="flex gap-2 justify-center items-center py-3 w-full text-sm text-white transition-colors duration-300 bg-stone-900 hover:bg-stone-500">
              加入購物車
              <SolarCart3Linear />
            </button>
          </div>
          <!-- 商品介紹 -->
          <div>
            <div class="flex gap-3 items-center">
              <h2 class="font-bold whitespace-nowrap md:text-2xl">
                商品介紹
              </h2>
              <hr class="w-full border-[1.5px] border-stone-900 dark:border-white">
            </div>
          </div>

        </div>
      </div>
      
      <!-- Shopping Cart Drawer -->
      <Cart :isOpen="isCartOpen" @close-cart="closeCart" />
      
      <!-- Modal Component for Add Wishlist -->
      <Modal :show="isModalVisible" @close="isModalVisible = false">
        <div class="p-4 bg-white rounded">
          <h3 class="text-xl">Item Added to Wishlist</h3>
          <p>{{ selectedItem?.name }} has been added to your wishlist!</p>
        </div>
      </Modal>
      
      <!-- Remove from Wishlist Confirmation Modal -->
      <Modal :show="isRemovalModalVisible" @close="isRemovalModalVisible = false">
        <div class="p-4 bg-white rounded">
          <h3 class="text-xl">Confirm Removal</h3>
          <p>Are you sure you want to remove {{ selectedItem?.name }} from your wishlist?</p>
          <button @click="removeFromWishlist" class="px-4 py-2 mt-2 text-white bg-red-500 rounded">
            Yes, Remove
          </button>
          <button @click="isRemovalModalVisible = false" class="px-4 py-2 mt-2 text-white bg-gray-500 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "@/firebaseConfig"; // 引入 Firebase 配置
import SolarHeartBold from '~icons/solar/heart-bold';
import SolarHeartLinear from '~icons/solar/heart-linear';

export default {
  components: {
    SolarHeartBold,
    SolarHeartLinear,
  },
  data() {
    return {
      item: null,
      quantity: 1, // Default quantity
      isCartOpen: false,
      isModalVisible: false,
      isRemovalModalVisible: false,
      selectedItem: null,
      currentImage: null
    };
  },
  computed: {
    isInWishlist() {
      return this.$store.getters.wishlistItems.some((i) => i.id === this.item?.id);
    }
  },
  methods: {
    updateQuantity(change) {
      this.quantity = Math.max(this.quantity + change, 1); // Ensure quantity is at least 1
    },
    handleInput(event) {
      this.quantity = Math.max(Number(event.target.value) || 1, 1); // Ensure quantity is at least 1
    },
    addToCart() {
      if (this.item) {
        const itemData = {
          id: this.item.id,
          name: this.item.name,
          price: this.item.price,
          image: this.item.image,
        };
        // Call Vuex action to add/update cart with item data and quantity
        this.$store.dispatch('addOrUpdateCart', { id: this.item.id, quantity: this.quantity, itemData });
        this.isCartOpen = true; // Open the cart
      }
    },
    closeCart() {
      this.isCartOpen = false;
    },
    toggleWishlist() {
      if (this.isInWishlist) {
        this.selectedItem = this.item;
        this.isRemovalModalVisible = true;
      } else {
        this.$store.dispatch('addToWishlist', this.item);
        this.selectedItem = this.item;
        this.isModalVisible = true;

        // Auto close the modal after 2 seconds
        setTimeout(() => {
          this.isModalVisible = false;
        }, 1200);
      }
    },
    removeFromWishlist() {
      if (this.selectedItem) {
        this.$store.dispatch('removeFromWishlist', this.selectedItem.id);
        this.isRemovalModalVisible = false;
      }
    },
    changeImage(image) {
      this.currentImage = image; // 更新主圖為點擊的圖片
    },
  },
  mounted() {
    const id = this.$route.params.id;

    // 從 Firebase 獲取商品資料
    const itemRef = dbRef(database, `items/item${id}`);
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
          this.item = { id, ...data };
          this.currentImage = this.item.image; // 初始化主圖為第一張圖片
        } else {
          this.item = null; // 處理不存在的商品
        }
    });
  }
};
</script>
