<template>
  <!-- Navbar with cart badge -->
  <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />
  <div v-if="item" class="p-4">
    <button @click="$router.back()" class="px-4 py-2 mb-4 text-white bg-gray-500 rounded">
      Back to List
    </button>
    
    <div class="flex items-center space-x-4">
      <img :src="item.image" :alt="item.name" class="object-cover w-48 h-48 rounded" />
      <div>
        <h1 class="text-3xl font-bold">{{ item.name }}</h1>
        <p class="text-xl">${{ item.price }}</p>
        <p class="mt-4">{{ item.description }}</p>
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
            class="w-12 text-center border rounded"
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
</template>

<script>
import itemsData from '@/data/items.json';
import SolarHeartBold from '~icons/solar/heart-bold';
import SolarHeartLinear from '~icons/solar/heart-linear';


export default {
  components: {
    SolarHeartBold,
    SolarHeartLinear,

  },
  data() {
    return {
      quantity: 1, // Default quantity
      isCartOpen: false,
      isModalVisible: false,
      isRemovalModalVisible: false,
      selectedItem: null
    };
  },
  computed: {
    item() {
      const id = parseInt(this.$route.params.id, 10);
      return itemsData[id] || null;
    },
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
    }
  }
};
</script>
