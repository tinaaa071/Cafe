<template>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 sm:gap-y-12 lg:gap-x-16">
      <!-- 食譜卡片 -->
      <router-link :to="{ path: `/recipes/${item.id}` }" v-for="(item, index) in filteredItems" :key="index" class="flex flex-col items-center p-6 bg-white transition duration-300 hover:bg-amber-100 group dark:border-2 dark:border-white dark:bg-transparent dark:hover:bg-amber-100 dark:text-white text-stone-900 dark:hover:text-stone-900">
        <!-- 圖片 -->
        <img 
            :src="item.image" 
            :alt="item.name" 
            class="object-cover p-4 mb-5 w-2/3 transition-all duration-300 group-hover:translate-y-[-10px] sm:mb-6 aspect-square"
        />
        <!-- 資訊 -->
        <h3 class="mb-3 text-xl font-bold">
            {{ item.name }}
        </h3>
        <p class="flex gap-3 items-center text-stone-500 dark:text-stone-400 dark:hover:text-stone-500">
            <SolarClockCircleLinear />
            {{ item.time }}
        </p>
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
  