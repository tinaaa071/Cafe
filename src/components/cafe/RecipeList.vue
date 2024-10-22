<template>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 sm:gap-y-12 lg:gap-x-16">
      <!-- 食譜卡片 -->
      <router-link :to="{ path: `/item/${item.id}` }" v-for="(item, index) in filteredItems" :key="index" class="flex flex-col items-center p-6 bg-white group">
        <!-- 圖片 -->
        <div class="relative mb-5 sm:mb-6 w-full border-2 aspect-[3/2] border-stone-900 overflow-hidden">
          <img :src="item.image" :alt="item.name" class="object-cover transition-all duration-300 group-hover:scale-110" />
        </div>
        <!-- 資訊 -->
        <h3 class="mb-2 text-lg font-bold text-stone-900">
            {{ item.name }}
        </h3>
      </router-link>
    </div>
  </template>
  
  <script>
  import { database } from "@/firebaseConfig"; // 引入 Firebase 設定
  import { ref as dbRef, onValue } from "firebase/database"; // 使用 Firebase database 的 ref 和 onValue
  
  export default {
    data() {
        return {
            items: [], // 從 Firebase 獲取的資料
            filteredItems: [] // 初始化篩選項目
        };
    },
    mounted() {
      // 從 Firebase 讀取資料
      const itemsRef = dbRef(database, 'recipes');
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        this.items = data ? Object.entries(data).map(([id, item]) => ({ id, ...item })) : [];
        this.filteredItems = this.items; // 初始化篩選項目
        }, (error) => {
        console.error("Error fetching data: ", error);
        });
    }
  };
  </script>
  