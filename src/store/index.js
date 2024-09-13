// store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cartItems: [],
    };
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) =>
      state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  mutations: {
    addToCart(state, item) {
      const existingItem = state.cartItems.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, itemName) {
      state.cartItems = state.cartItems.filter((item) => item.name !== itemName);
    },
    updateQuantity(state, { itemName, quantity }) {
      const item = state.cartItems.find((i) => i.name === itemName);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity <= 0) {
        state.cartItems = state.cartItems.filter((i) => i.name !== itemName);
      }
    },
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, itemName) {
      commit('removeFromCart', itemName);
    },
    updateQuantity({ commit }, payload) {
      commit('updateQuantity', payload);
    },
  },
});

export default store;
