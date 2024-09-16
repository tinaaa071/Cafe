<template>
  <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />
  <div class="px-4 py-8 mx-auto">
    <h1 class="mb-6 text-3xl font-bold">My Wishlist</h1>
    
    <!-- If the wishlist is empty -->
    <div v-if="wishlistItems.length === 0" class="py-10 text-center">
      <p class="text-gray-500">Your wishlist is empty.</p>
    </div>
    
    <!-- Display wishlist items -->
    <div v-else class="grid grid-cols-3 gap-6 md:grid-cols-4">
      <div
        v-for="item in wishlistItems" :key="item.id"
        class="p-4 border rounded-md shadow-md"
      >
        <img :src="item.image" :alt="item.name" class="object-cover w-full h-48 rounded-md" />
        <h2 class="mt-4 text-xl font-semibold">{{ item.name }}</h2>
        <p class="mt-2 text-gray-600">${{ item.price }}</p>
        <!-- Use SolarHeartBold Icon -->
        <button
          class="p-2 mt-4 rounded-md"
          @click="confirmRemoveFromWishlist(item)"
        >
          <SolarHeartBold class="text-red-500" />
        </button>
        <!-- Use SolarHeartBold Icon -->
        <RouterLink
          :to="{ path: `/item/${item.id}` }"
          class="p-2 mt-4 rounded-md"
          @click="confirmRemoveFromWishlist(item)"
        >
          查看商品
        </RouterLink>
      </div>
    </div>

    <!-- Remove from Wishlist Confirmation Modal -->
    <Modal :show="isRemovalModalVisible" @close="isRemovalModalVisible = false">
      <div class="p-4 bg-white rounded">
        <h3 class="text-xl">Confirm Removal</h3>
        <p>Are you sure you want to remove {{ selectedItem?.name }} from your wishlist?</p>
        <div class="flex justify-end mt-4 space-x-4">
          <button @click="removeFromWishlist" class="px-4 py-2 text-white bg-red-500 rounded">
            Yes, Remove
          </button>
          <button @click="isRemovalModalVisible = false" class="px-4 py-2 text-white bg-gray-500 rounded">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  </div>
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
