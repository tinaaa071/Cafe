import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import i18n from './i18n';

// router
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
// 使用 .use 匯入 plugin
.use(router)
.use(i18n)
.mount('#app')
