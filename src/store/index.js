import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [], // To store items added from ItemList.vue with default quantity
    cart: [],      // To store items added from [id].vue with specific quantity
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) =>
      state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
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
    ADD_OR_UPDATE_CART(state, { id, quantity }) {
      const existingItem = state.cartItems.find((i) => i.id === id);
      if (existingItem) {
        existingItem.quantity += quantity; // Adjust quantity
      } else {
        state.cartItems.push({ id, quantity }); // Add new item with specific quantity
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
  },
});
