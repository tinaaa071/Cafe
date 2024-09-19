import { createStore } from 'vuex';

const WISHLIST_STORAGE_KEY = 'wishlist';

export default createStore({
  state: {
    cartItems: [], // Items added from ItemList.vue with default quantity
    cart: [],      // Items added from [id].vue with specific quantity
    wishlist: JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [], // Load wishlist from local storage
    orders: []     // Store for orders
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) =>
      state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    wishlistItems: (state) => state.wishlist,  // Getter to retrieve wishlist items
    orders: (state) => state.orders  // Getter to retrieve orders
  },
  mutations: {
    // Mutation to add item from ItemList.vue
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; // Default increment by 1
      } else {
        state.cartItems.push({ ...item, quantity: 1 }); // Default quantity of 1
      }
    },
    // Mutation to add or update item from [id].vue
    ADD_OR_UPDATE_CART(state, { id, quantity, itemData }) {
      const existingItem = state.cartItems.find((i) => i.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...itemData, id, quantity }); // Add complete product info
      }
    },
    REMOVE_FROM_CART(state, id) {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    UPDATE_ITEM_QUANTITY(state, { id, quantity }) {
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    // New Mutation to add items to the wishlist
    ADD_TO_WISHLIST(state, item) {
      const existingItem = state.wishlist.find((i) => i.id === item.id);
      if (!existingItem) {
        state.wishlist.push(item);
      }
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist)); // Save wishlist to local storage
    },
    // New Mutation to remove items from the wishlist
    REMOVE_FROM_WISHLIST(state, id) {
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist)); // Save updated wishlist to local storage
    },
    // New Mutation to add an order
    ADD_ORDER(state, order) {
      state.orders.push(order); // Add order to the state
    },
    // Clear cart after placing an order
    CLEAR_CART(state) {
      state.cartItems = [];
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    }
  },
  actions: {
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_ITEM_QUANTITY', payload);
    },
    addOrUpdateCart({ commit }, payload) {
      commit('ADD_OR_UPDATE_CART', payload);
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_FROM_CART', id);
    },
    // New action to add item to wishlist
    addToWishlist({ commit }, item) {
      commit('ADD_TO_WISHLIST', item);
    },
    // New action to remove item from wishlist
    removeFromWishlist({ commit }, id) {
      commit('REMOVE_FROM_WISHLIST', id);
    },
    // New action to load wishlist from local storage
    loadWishlistFromStorage({ commit }) {
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
      wishlist.forEach((item) => {
        commit('ADD_TO_WISHLIST', item);
      });
    },
    // New action to place an order
    placeOrder({ commit, state }, orderDetails) {
      const order = {
        ...orderDetails,
        items: state.cartItems,
        total: state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        date: new Date().toISOString(),
      };
      commit('ADD_ORDER', order);
      commit('CLEAR_CART'); // Clear cart after placing an order
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    }
  },
});
