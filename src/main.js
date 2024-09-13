import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';
import i18n from './i18n';
import store from './store'; // Import the Vuex store

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App)
  .use(router)
  .use(i18n)
  .use(store) // Make sure store is used here
  .mount('#app');
