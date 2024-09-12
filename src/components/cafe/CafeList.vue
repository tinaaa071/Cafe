<template>
  <div>
    <div class="flex items-center mb-4">
      <label for="city-select" class="mr-2">Select City:</label>
      <select
        id="city-select"
        v-model="selectedCity"
        @change="handleCityChange"
        class="city-select"
      >
        <option value="all">全部城市</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <input
        v-model="searchQuery"
        @input="filterCafes"
        placeholder="Search cafes..."
        class="ml-4 search-input"
      />
    </div>
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
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="filteredCafes.length" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        v-for="(cafe, index) in paginatedCafes"
        :key="cafe.id"
        class="cafe-card"
      >
        <h2>{{ cafe.name }}</h2>
        <img
          :src="getImageUrl(index)"
          :alt="getImageAlt(index)"
          class="object-cover w-full rounded-lg shadow-md aspect-video"
        />
        <p>Address: {{ cafe.address }}</p>
        <p>Open Time: {{ cafe.open_time }}</p>
        <p>Limited Time: {{ cafe.limited_time ? 'Yes' : 'No' }}</p>
        <p>Socket Availability: {{ cafe.socket }}</p>
        <p>Standing Desk: {{ cafe.standing_desk ? 'Yes' : 'No' }}</p>
        <p>Music: {{ cafe.music }}</p>
        <p>Wifi: {{ cafe.wifi }}</p>
        <p>Seat: {{ cafe.seat }}</p>
        <p>Quiet: {{ cafe.quiet }}</p>
        <p>Tasty: {{ cafe.tasty }}</p>
        <p>Price: {{ cafe.cheap }}</p>
        <p>MRT: {{ cafe.mrt }}</p>
        <p>Url: {{ cafe.url }}</p>
        <Map :cafes="[cafe]" />
      </div>
    </div>
    <p v-else-if="hasSearched">無搜尋結果</p>
    <p v-else>Loading...</p>
    <Paginator
      :total-items="filteredCafes.length"
      :items-per-page="itemsPerPage"
      @page-changed="handlePageChanged"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getCafes } from '../../apiService.js';
import Map from './Map.vue'; // 確保正確引用 Map 元件

const cafes = ref([]);
const allCafes = ref([]); // 用來存儲所有咖啡館數據
const images = ref([]);
const searchQuery = ref('');
const cityName = ref('台北市'); // Default city
const displayTitle = ref(cityName.value);
const error = ref(null);
const isLoading = ref(true);
const itemsPerPage = ref(6); // 每頁顯示 6 筆資料
const hasSearched = ref(false); // 用來跟蹤是否已經進行過搜尋

const cities = ['台北市', '新竹市', '台中市', '高雄市', '台南市', '花蓮縣'];

const selectedCity = ref(cityName.value);

const filteredCafes = computed(() => {
  const searchQueryLower = searchQuery.value.toLowerCase();

  // 過濾符合條件的咖啡館
  const filtered = allCafes.value.filter((cafe) => {
    const matchesCity =
      selectedCity.value === 'all' || cafe.address.includes(selectedCity.value);
    const matchesQuery = cafe.name
      .toLowerCase()
      .includes(searchQueryLower);
    return matchesCity && matchesQuery;
  });

  // 去除 cafe.name 重複的項目
  const uniqueCafes = [];
  const cafeNames = new Set();
  filtered.forEach(cafe => {
    if (!cafeNames.has(cafe.name)) {
      cafeNames.add(cafe.name);
      uniqueCafes.push(cafe);
    }
  });

  return uniqueCafes;
});

const paginatedCafes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCafes.value.slice(start, end);
});

const currentPage = ref(1);

const handlePageChanged = (page) => {
  currentPage.value = page;
};

const fetchCafes = async (city) => {
  error.value = null;
  isLoading.value = true;
  cityName.value = city;
  selectedCity.value = city;
  displayTitle.value = city;
  searchQuery.value = '';
  hasSearched.value = true; // Set to true after fetching cafes
  try {
    const cityCafes = await getCafes(city);
    allCafes.value = [...new Set([...allCafes.value, ...cityCafes])]; // 更新 allCafes
    cafes.value = cityCafes;
    await fetchCafeImages();
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
  selectedCity.value = 'all';
  displayTitle.value = '全部城市';
  searchQuery.value = '';
  hasSearched.value = true; // Set to true after fetching all cafes

  try {
    const promises = cities.map((city) => getCafes(city));
    const results = await Promise.all(promises);
    const all = results.flat();

    // 去除 cafe.name 重複的項目
    const uniqueCafes = [];
    const cafeNames = new Set();
    all.forEach(cafe => {
      if (!cafeNames.has(cafe.name)) {
        cafeNames.add(cafe.name);
        uniqueCafes.push(cafe);
      }
    });

    allCafes.value = uniqueCafes;
    cafes.value = uniqueCafes;
    await fetchCafeImages();
  } catch (err) {
    error.value = 'Failed to load cafes.';
  } finally {
    isLoading.value = false;
  }
};

async function fetchCafeImages() {
  const accessKey = '_9F7po_Bi4VFYiC6StcE3DhxvqlOSyldaXLdHTzBpNI';
  const query = 'cafe';
  const count = 8;

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${query}&count=${count}`
    );
    images.value = await response.json();
  } catch (error) {
    console.error('Error fetching the images:', error);
  }
}

const getImageUrl = (index) => {
  return images.value[index]?.urls.regular || 'https://via.placeholder.com/400';
};

const getImageAlt = (index) => {
  return images.value[index]?.alt_description || 'Cafe Image';
};

// Watch for changes in selectedCity to fetch cafes accordingly
watch(selectedCity, (newCity) => {
  if (newCity === 'all') {
    fetchAllCafes();
  } else {
    fetchCafes(newCity);
  }
});

onMounted(() => {
  fetchCafes(cityName.value);
});

const handleCityChange = () => {
  // Trigger fetching cafes when city changes from the select
  if (selectedCity.value === 'all') {
    fetchAllCafes();
  } else {
    fetchCafes(selectedCity.value);
  }
};
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

.city-select {
  padding: 5px;
}

.search-input {
  padding: 5px;
}
</style>
