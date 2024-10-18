<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50"
      @click="$emit('close')"
    ></div>
  </transition>

  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 z-50 w-full h-full bg-white shadow-lg transition-transform transform lg:w-1/3 sm:w-2/3"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      @click.stop
    >
      <div class="flex justify-between items-center px-10 py-6 text-white bg-stone-900">
        <!-- 標題 -->
        <h2 class="text-2xl font-bold line-clamp-1">
          {{ selectedCafe?.name }}
        </h2> 
        <!-- 關閉按鈕 -->
        <button
          @click="$emit('close')"
          class="text-xl font-bold text-white transition-all duration-300 hover:rotate-90"
        >
          &times;
        </button>
      </div>

      <div class="overflow-y-scroll px-10 py-6 h-screen">
        <div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-else-if="selectedCafe" class="space-y-6">
            <!-- 標題 -->
            <h2 class="mb-6 text-4xl font-bold text-center">
              {{ selectedCafe.name }}
            </h2>
            <!-- 地址 -->
            <div class="flex gap-3 justify-center">
              <div class="flex gap-3 justify-center" v-if="selectedCafe.mrt">
                <p class="px-3 py-1 text-sm font-medium rounded-full bg-B3 text-stone-500">
                  {{ selectedCafe.mrt }}
                </p>
              </div>
              <p 
              v-if="selectedCafe && selectedCafe.address"
              class="text-xl font-light"
              >
                {{ selectedCafe.address }}
              </p>
            </div>
            <!-- Img -->
            <img v-if="selectedCafe?.imageUrl && selectedCafe.imageUrl !== 'https://via.placeholder.com/400'" :src="selectedCafe.imageUrl" alt="Cafe Image" class="object-cover mb-4 w-full border-2 aspect-video border-stone-900" />
            <!-- BTN -->
            <a v-if="selectedCafe && selectedCafe.url" :href="selectedCafe.url" target="_blank" class="block py-4 w-full text-center text-white transition-colors duration-300 bg-stone-900 hover:bg-stone-500">
              更多資訊
            </a>
            <!-- 其他資訊 -->
            <ul class="grid grid-cols-1 gap-4 list-disc list-inside sm:grid-cols-2">
              <li v-if="selectedCafe && selectedCafe.open_time">
                營業時間：{{ selectedCafe.open_time }}
              </li>
              <li v-if="selectedCafe && selectedCafe.limited_time">
                限制時間：{{ selectedCafe.limited_time ? '是' : '否' }}
              </li>
              <li v-if="selectedCafe && selectedCafe.socket">
                提供插座：{{ selectedCafe.socket ? '是' : '否' }}
              </li>
              <li v-if="selectedCafe && selectedCafe.standing_desk">
                可站立工作：{{ selectedCafe.standing_desk ? '是' : '否' }}
              </li>
              <li v-if="selectedCafe && selectedCafe.music">
                裝潢音樂：⭐️&nbsp;{{ selectedCafe.music }}
              </li>
              <li v-if="selectedCafe && selectedCafe.wifi">
                Wifi 穩定：⭐️&nbsp;{{ selectedCafe.wifi }}
              </li>
              <li v-if="selectedCafe && selectedCafe.seat">
                通常有位：⭐️&nbsp;{{ selectedCafe.seat }}
              </li>
              <li v-if="selectedCafe && selectedCafe.quiet">
                安靜程度：⭐️&nbsp;{{ selectedCafe.quiet }}
              </li>
              <li v-if="selectedCafe && selectedCafe.tasty">
                東西好吃：⭐️&nbsp;{{ selectedCafe.tasty }}
              </li>
              <li v-if="selectedCafe && selectedCafe.cheap">
                價格便宜：⭐️&nbsp;{{ selectedCafe.cheap }}
              </li>
            </ul>
            <div class="border-2 border-stone-900">
              <Map :cafes="[selectedCafe]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>


export default {
  components: {
    Map,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    selectedCafe: { // 新增 props 以接收所選咖啡館
      type: Object,
      default: null,
    },
  },
  emits: ['close'],
};
</script>

<style scoped>
/* Slide animation for the drawer */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Fade animation for the overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>