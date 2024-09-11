<!-- src/components/CafeList.vue -->
<template>
    <div>
      <h1>{{ cityName }} Cafes</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-else-if="cafes.length">
        <li v-for="cafe in cafes" :key="cafe.id">
          <h2>{{ cafe.name }}</h2>
          <p>Address: {{ cafe.address }}</p>
          <p>Limited Time: {{ cafe.limited_time ? 'Yes' : 'No' }}</p>
          <p>Socket Availability: {{ cafe.socket }}</p>
          <p>Standing Desk: {{ cafe.standing_desk ? 'Yes' : 'No' }}</p>
          <p>Music: {{ cafe.music }}</p>
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getCafes } from '../apiService.js';
  
  const cafes = ref([]);
  const error = ref(null);
  const cityName = 'taipei'; // 可以更改為其他城市名稱
  
  onMounted(async () => {
    try {
      cafes.value = await getCafes(cityName);
    } catch (err) {
      error.value = 'Failed to load cafes.';
    }
  });
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  