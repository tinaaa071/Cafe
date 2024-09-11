<!-- src/components/CafeList.vue -->
<template>
    <div>
      <h1>{{ displayTitle }} Cafes</h1>
      <div>
        <button
          v-for="city in cities"
          :key="city"
          @click="fetchCafes(city)"
          :class="['city-button', { active: city === cityName }]"
        >
          {{ city }}
        </button>
        <button
          @click="fetchAllCafes"
          :class="['city-button', { active: cityName === 'all' }]"
        >
          全部城市
        </button>
      </div>
      <div>
        <input
          v-model="searchQuery"
          @input="filterCafes"
          placeholder="Search cafes..."
          class="search-input"
        />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-else-if="filteredCafes.length">
        <li v-for="cafe in filteredCafes" :key="cafe.id">
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
  import { ref, computed } from 'vue';
  import { getCafes } from '../apiService.js';
  
  const cafes = ref([]);
  const filteredCafes = computed(() => {
    if (!searchQuery.value) return cafes.value;
    return cafes.value.filter(cafe =>
      cafe.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  const searchQuery = ref('');
  const error = ref(null);
  const cityName = ref('taipei'); // 預設為 taipei
  const displayTitle = ref(cityName.value);
  const isLoading = ref(true);
  
  // 可選擇的城市列表
  const cities = ['taipei', 'taichung', 'kaohsiung', 'tainan', 'hualien'];
  
  const fetchCafes = async (city) => {
    error.value = null;
    isLoading.value = true;
    cityName.value = city;
    displayTitle.value = city;
    searchQuery.value = ''; // 搜尋框清空
    try {
      cafes.value = await getCafes(city);
    } catch (err) {
      error.value = 'Failed to load cafes.';
    } finally {
      isLoading.value = false;
    }
  };
  
  const fetchAllCafes = async () => {
    error.value = null;
    isLoading.value = true;
    cityName.value = 'all';
    displayTitle.value = 'All Cities';
    cafes.value = [];
    searchQuery.value = ''; // 搜尋框清空
  
    try {
      const promises = cities.map((city) => getCafes(city));
      const results = await Promise.all(promises);
      cafes.value = results.flat();
    } catch (err) {
      error.value = 'Failed to load cafes.';
    } finally {
      isLoading.value = false;
    }
  };
  
  // 初始加載台北的咖啡廳資料
  fetchCafes(cityName.value);
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .city-button {
    margin: 5px;
    padding: 8px 16px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .city-button:hover {
    background-color: #dcdcdc;
  }
  
  .city-button.active {
    background-color: #9e9e9e;
    color: white;
  }
  
  .search-input {
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  