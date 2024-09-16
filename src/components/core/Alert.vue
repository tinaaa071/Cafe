<template>
  <div v-if="visible" class="fixed flex items-center p-4 text-white bg-blue-500 rounded-lg shadow-lg top-4 right-4">
    <span class="flex-1">{{ message }}</span>
    <button @click="close" class="text-white hover:text-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

const visible = ref(true);

const close = () => {
  visible.value = false;
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
