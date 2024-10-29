<template>
  <Drawer :isOpen="isOpen" :header="selectedCafe?.name" @close="$emit('close')">
    <template #header>
      <h2 class="text-2xl font-bold line-clamp-1">{{ selectedCafe?.name }}</h2> 
    </template>

    <div class="flex flex-col min-h-full">
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else-if="selectedCafe" class="flex flex-col flex-grow gap-6">
        <!-- 標題 -->
        <h2 class="text-xl font-bold text-center sm:text-3xl">
          {{ selectedCafe.name }}
        </h2>
        <!-- 地址 -->
        <div class="flex flex-col gap-3 justify-center text-center md:flex-row">
          <div class="flex gap-3 justify-center" v-if="selectedCafe.mrt">
            <p class="px-3 py-1 text-sm font-medium whitespace-nowrap rounded-full cursor-default bg-B3 text-stone-500 h-fit dark:bg-stone-500 dark:text-white">
              {{ selectedCafe.mrt }}
            </p>
          </div>
          <p v-if="selectedCafe && selectedCafe.address" class="text-xl font-light">
            {{ selectedCafe.address }}
          </p>
        </div>
        <!-- Img -->
        <img v-if="selectedCafe?.imageUrl && selectedCafe.imageUrl !== 'https://via.placeholder.com/400'" :src="selectedCafe.imageUrl" alt="Cafe Image" class="object-cover w-full border-2 aspect-video border-stone-900 dark:border-white" />
        <!-- BTN -->
        <a v-if="selectedCafe && selectedCafe.url" :href="selectedCafe.url" target="_blank" class="button-main">
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
        <div class="border-2 border-stone-900 dark:border-white">
          <Map :cafes="[selectedCafe]" />
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script>


export default {

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
