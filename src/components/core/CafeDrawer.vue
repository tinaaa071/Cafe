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
      class="fixed top-0 right-0 z-50 w-1/3 h-full bg-white shadow-lg transition-transform transform"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      @click.stop
    >
      <div class="flex justify-between items-center px-10 py-6 mb-4 text-white bg-stone-900">
        <h2 class="text-2xl font-bold">
            {{ selectedCafe?.name }}
          </h2> 
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div class="overflow-y-scroll px-10 py-6 h-full drawer-content">
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
              <p class="text-xl font-light">
                {{ selectedCafe.address }}
              </p>
            </div>
            <!-- Img -->
            <img v-if="selectedCafe?.imageUrl && selectedCafe.imageUrl !== 'https://via.placeholder.com/400'" :src="selectedCafe.imageUrl" alt="Cafe Image" class="object-cover mb-4 w-full border-2 aspect-video border-stone-900" />
            <!-- BTN -->
            <button @click="window.open(selectedCafe.url, '_blank')" class="py-4 w-full text-center text-white bg-stone-900">
              更多資訊
            </button>
            <!-- 其他資訊 -->
            <ul class="grid grid-cols-1 gap-4 list-disc list-inside sm:grid-cols-2">
              <li>營業時間：{{ selectedCafe.open_time }}</li>
              <li>限制時間：{{ selectedCafe.limited_time ? 'Yes' : 'No' }}</li>
              <li>提供插座：{{ selectedCafe.socket }}</li>
              <li>可站立工作：{{ selectedCafe.standing_desk ? 'Yes' : 'No' }}</li>
              <li>裝潢音樂：{{ selectedCafe.music }}</li>
              <li>Wifi 穩定：{{ selectedCafe.wifi }}</li>
              <li>通常有位：{{ selectedCafe.seat }}</li>
              <li>安靜程度：{{ selectedCafe.quiet }}</li>
              <li>東西好吃：{{ selectedCafe.tasty }}</li>
              <li>價格便宜：{{ selectedCafe.cheap }}</li>
              <li>Url: {{ selectedCafe.url }}</li>
            </ul>
            <Map :cafes="[selectedCafe]" />
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