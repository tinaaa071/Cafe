<template>
  <div class="bg-B4 sm:pb-10 dark:bg-stone-900 text-stone-900">
    <!-- Navbar with cart badge -->
    <Navbar :cartItems="cartItems" @toggle-cart="toggleCart" />
    <BackToTop class="z-20" />
    <div class="px-6 pt-28 pb-6 mx-auto min-h-screen sm:pt-32 sm:px-10 xl:px-28">
      <div class="">
        <ItemList @add-to-cart="showCart" />
      </div>
    </div>
    

    <!-- Shopping Cart Drawer -->
    <Cart :isOpen="isCartOpen" @close-cart="isCartOpen = false" />
  </div>
  <Footer />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const cartItems = ref([]);
    const isCartOpen = ref(false);

    function showCart() {
      isCartOpen.value = true;
    }

    const addToCart = (item) => {
      cartItems.value.push(item);
      isCartOpen.value = true; // Automatically open the cart when an item is added
    };

    const removeFromCart = (index) => {
      cartItems.value.splice(index, 1);
    };

    const closeCart = () => {
      isCartOpen.value = false;
    };

    const toggleCart = () => {
      isCartOpen.value = !isCartOpen.value;
    };

    return {
      cartItems,
      isCartOpen,
      showCart,
      addToCart,
      removeFromCart,
      closeCart,
      toggleCart,
    };
  }
};
</script>



