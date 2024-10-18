<template>
  <div class="bg-B4 sm:pb-10 dark:bg-stone-900 text-stone-900">
    <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />
    <BackToTop class="z-20" />
    <div v-if="item" class="px-6 pt-24 pb-6 mx-auto min-h-screen sm:pt-28 md:pt-32 sm:px-10 xl:px-28">
      <!-- <button @click="$router.back()" class="px-4 py-2 mb-4 text-white bg-gray-500 rounded">
        Back to List
      </button> -->
      
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex flex-col gap-2">
          <!-- 主圖 -->
          <img :src="currentImage" :alt="item.name" class="object-cover w-full aspect-[3/2] border-2 border-stone-900" />
          <!-- 切換圖 -->
          <div class="grid grid-cols-4 gap-2">
            <img @click="changeImage(item.image)" :src="item.image" :alt="item.name" class="object-cover w-full aspect-[3/2] cursor-pointer border-2 border-stone-900" />
            <img @click="changeImage(item.image1)" :src="item.image1" :alt="item.name" class="object-cover w-full aspect-[3/2] cursor-pointer border-2 border-stone-900" />
            <img @click="changeImage(item.image2)" :src="item.image2" :alt="item.name" class="object-cover w-full aspect-[3/2] cursor-pointer border-2 border-stone-900" />
            <img @click="changeImage(item.image3)" :src="item.image3" :alt="item.name" class="object-cover w-full aspect-[3/2] cursor-pointer border-2 border-stone-900" />
          </div>
        </div>
        <div>
          <h1 class="text-3xl font-bold">
            {{ item.name }}
          </h1>
          <p class="text-xl">
            ${{ item.price }}
          </p>
          <p class="mt-4">
            {{ item.description }}
          </p>
          <!-- Quantity control -->
          <div class="flex items-center mt-1 space-x-2">
            <button
              @click="updateQuantity(-1)"
              class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              :disabled="quantity <= 1"
            >
              -
            </button>
            <input
              v-model.number="quantity"
              @input="handleInput"
              class="w-12 text-center rounded border"
              min="1"
            />
            <button
              @click="updateQuantity(1)"
              class="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
          <button @click="addToCart" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
            Add to Cart
          </button>
          
          <!-- Add to Wishlist Button -->
          <button @click="toggleWishlist" class="px-4 py-2 mt-4 text-white rounded">
            <component
              :is="isInWishlist ? 'SolarHeartBold' : 'SolarHeartLinear'"
              class="text-red-500"
            />
          </button>
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
