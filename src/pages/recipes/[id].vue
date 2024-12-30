<template>
    <div class="">
      <Layout>
        <template #content>
          <div class="flex flex-col md:flex-row text-stone-900 dark:text-white">
            <!-- 圖片區塊 -->
            <div class="p-12 w-full bg-amber-100 xl:p-16 md:w-1/3">
                <img
              v-if="currentImage"
              :src="currentImage"
              :alt="item?.name"
              class="object-cover mx-auto"
            />
            </div>
            <!-- 資訊 -->
            <div class="w-full bg-white md:w-2/3 dark:bg-transparent dark:border-2 dark:border-white">
              <!-- 商品資訊 -->
              <div class="flex flex-col">
                <!-- 標題 -->
                <div class="flex justify-between items-center px-6 py-4 text-white dark:text-stone-900 dark:bg-white md:px-10 md:py-6 bg-stone-900">
                  <h1 class="text-lg font-bold md:text-3xl">
                    {{ item ? item.name : 'Loading...' }}
                  </h1>
                  <p class="flex gap-3 items-center">
                    <SolarClockCircleLinear />
                    {{ item?.time ? item.time : 'N/A' }}
                    </p>
                </div>
                <!-- 資訊 -->
                <div class="p-6 space-y-6 md:space-y-10 md:p-10">
                  <!-- 數量按鈕 -->
                  <div class="flex gap-6 items-center">
                    <p class="font-bold md:text-xl">
                        份數
                    </p>
                    <div class="flex items-center w-36 border-2 border-stone-900 text-stone-900 dark:border-white dark:text-white">
                      <button
                        @click="updateQuantity(-1)"
                        class="px-3 py-2 border-r-2 border-stone-900 dark:border-white"
                        :disabled="quantity <= 1"
                      >
                        <IcBaselineMinus />
                      </button>
                      <input
                        v-model.number="quantity"
                        @input="handleInput"
                        type="text"
                        class="w-full text-center bg-transparent border-none appearance-none"
                        min="1"
                      />
                      <button
                        @click="updateQuantity(1)"
                        class="px-3 py-2 border-l-2 border-stone-900 dark:border-white"
                      >
                        <IcBaselinePlus />
                      </button>
                    </div>
                  </div>
                  <!-- 食材 -->
                  <div>
                    <p class="mb-3 font-bold md:text-xl">
                        食材
                    </p>
                    <ul class="text-sm font-medium list-disc list-inside md:text-lg">
                      <li v-for="(ingredient, index) in adjustedIngredients" :key="index">
                        <template v-if="ingredient.quantity">
                          {{ ingredient.quantity }} {{ ingredient.unit || '' }} {{ ingredient.name }}
                        </template>
                        <template v-else>
                          {{ ingredient.name }}
                        </template>
                      </li>
                    </ul>
                  </div>
                  <!-- 如何製作 -->
                  <div>
                    <!-- 標題 -->
                    <div class="flex gap-3 items-center mb-3">
                        <h2 class="mb-3 font-bold whitespace-nowrap md:text-xl">
                            如何製作
                        </h2>
                        <hr class="w-full border-[1.5px] border-stone-900 dark:border-white">
                    </div>
                    <!-- 步驟 -->
                    <ul class="text-sm font-light md:text-lg">
                        <template v-if="item?.steps">
                            <li v-for="(step, index) in item.steps" :key="index">
                            <span class="font-bold">STEP {{ index + 1 }}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{ step }}
                            </li>
                        </template>
                        <li v-else>
                            Loading steps...
                        </li>
                    </ul>

                   </div>
                </div>
                
              </div>
            </div>
          </div>
          <div v-if="!item">
            <p>Loading...</p> <!-- 或者顯示錯誤訊息 -->
          </div>
        </template>
      </Layout>
    </div>
  </template>
  
  <script>
  import { ref as dbRef, onValue, update } from "firebase/database";
  import { database } from "@/firebaseConfig"; // 引入 Firebase 配置
  
  export default {
    data() {
      return {
        item: null,
        currentImage: null,
        quantity: 1, // 默認數量為 1
      };
    },
    computed: {
      adjustedIngredients() {
        if (!this.item) return [];
        
        return this.item.ingredients
          .filter((ingredient) => ingredient.name?.trim()) // 確保有名稱的食材才顯示
          .map((ingredient) => {
            const quantity = ingredient.quantity != null ? ingredient.quantity * this.quantity : null; // 如果 quantity 為空，設為 null
            return {
              name: ingredient.name,
              quantity, // 安全處理後的 quantity
              unit: ingredient.unit,
            };
          });
      },
    },
    methods: {
      updateQuantity(change) {
        const newQuantity = this.quantity + change;
        if (newQuantity < 1) return; // 確保份數不會低於 1
        this.quantity = newQuantity;
      },
      handleInput() {
        if (this.quantity < 1) {
          this.quantity = 1; // 限制最小數量為 1
        }
      },
      saveQuantityToFirebase() {
        // 將數量保存至 Firebase
        const itemRef = dbRef(database, `recipes/item${this.item.id}`);
        update(itemRef, { quantity: this.quantity })
          .then(() => {
            console.log("Quantity updated in Firebase.");
          })
          .catch((error) => {
            console.error("Error updating quantity:", error);
          });
      },
    },
    mounted() {
      const id = this.$route.params.id;
      console.log(`Fetching item with id: ${id}`); // 確認 id 獲取
  
      // 從 Firebase 獲取商品資料
      const itemRef = dbRef(database, `recipes/item${id}`);
      onValue(itemRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data); // 確認獲取的資料
        if (data) {
          this.item = { id, ...data };
          this.currentImage = this.item.image; // 初始化主圖為第一張圖片
          this.quantity = 1; // 初始化數量為 1，而非 Firebase 的數量
        } else {
          console.warn("No data found for the given id."); // 處理不存在的商品
          this.item = null; // 處理不存在的商品
        }
      });
    },
    
  };
  </script>
  