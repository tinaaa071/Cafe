import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    Vue(),
    Pages(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: false,
        }),
        HeadlessUiResolver(),
      ]
    }),
    Icons({
      autoInstall: true, // Automatically install missing icon packages
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://cafenomad.tw/api/v1.2/cafes', // 目標 API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 將 /api 替換為空
      },
    },
  },
})
