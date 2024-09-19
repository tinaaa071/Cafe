import { createStore } from 'vuex';

const WISHLIST_STORAGE_KEY = 'wishlist';
const LAST_RANDOM_NUMBER_KEY = 'lastRandomNumber'; // Key for storing the last random number

export default createStore({
  state: {
    cartItems: [],
    cart: [],
    wishlist: JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [],
    orders: [],
    lastOrderNumber: null, // Track the last order number
    lastRandomNumber: parseInt(localStorage.getItem(LAST_RANDOM_NUMBER_KEY), 10) || 0, // Initialize with the last stored random number or 0
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) =>
      state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    wishlistItems: (state) => state.wishlist,
    orders: (state) => state.orders,
    lastOrderNumber: (state) => state.lastOrderNumber, // Getter for the last order number
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    ADD_OR_UPDATE_CART(state, { id, quantity, itemData }) {
      const existingItem = state.cartItems.find((i) => i.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...itemData, id, quantity });
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
    ADD_TO_WISHLIST(state, item) {
      const existingItem = state.wishlist.find((i) => i.id === item.id);
      if (!existingItem) {
        state.wishlist.push(item);
      }
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist));
    },
    REMOVE_FROM_WISHLIST(state, id) {
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist));
    },
    ADD_ORDER(state, order) {
      state.orders.push(order);
      state.lastOrderNumber = order.orderNumber; // Update the last order number
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
    UPDATE_LAST_RANDOM_NUMBER(state, newNumber) {
      state.lastRandomNumber = newNumber;
      localStorage.setItem(LAST_RANDOM_NUMBER_KEY, newNumber); // Save to local storage
    },
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
    addToWishlist({ commit }, item) {
      commit('ADD_TO_WISHLIST', item);
    },
    removeFromWishlist({ commit }, id) {
      commit('REMOVE_FROM_WISHLIST', id);
    },
    loadWishlistFromStorage({ commit }) {
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
      wishlist.forEach((item) => {
        commit('ADD_TO_WISHLIST', item);
      });
    },
    placeOrder({ commit, state }, orderDetails) {
      // Generate a unique order number in the format YYYYMMDD-XXXX
      const now = new Date();
      const datePart = now.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
      const nextRandomNumber = state.lastRandomNumber + 1; // Increment the last random number
      const randomPart = nextRandomNumber.toString().padStart(4, '0'); // Ensure it is 4 digits
      const orderNumber = `${datePart}-${randomPart}`;

      const order = {
        ...orderDetails,
        items: state.cartItems,
        total: state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        date: new Date().toISOString(),
        orderNumber
      };

      commit('ADD_ORDER', order);
      commit('UPDATE_LAST_RANDOM_NUMBER', nextRandomNumber); // Update the last random number in the state and local storage
      commit('CLEAR_CART');
      return orderNumber; // Return the order number
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    }
  },
});
