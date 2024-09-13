import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cartItems: []
    };
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => state.cartItems.reduce((total, item) => total + item.price, 0)
  },
  mutations: {
    addToCart(state, item) {
      state.cartItems.push(item);
    },
    removeFromCart(state, index) {
      state.cartItems.splice(index, 1);
    }
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, index) {
      commit('removeFromCart', index);
    }
  }
});

export default store;
