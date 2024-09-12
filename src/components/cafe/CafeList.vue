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
      <div v-else-if="paginatedCafes.length" class="grid grid-cols-3 gap-4">
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
          <p>Url: {{ cafe.url }}</p>
          <Map :cafes="[cafe]" />
        </div>
      </div> 
      <p v-else>Loading...</p>
      <Paginator
        :total-items="filteredCafes.length"
        :items-per-page="itemsPerPage"
        @page-changed="handlePageChanged"
      />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCafes } from '../../apiService.js';
import Map from './Map.vue'; // 確保正確引用 Map 元件

const cafes = ref([]);
const images = ref([]);
const searchQuery = ref('');
const cityName = ref('台北市'); // Default city
const displayTitle = ref(cityName.value);
const error = ref(null);
const isLoading = ref(true);
const itemsPerPage = ref(6); // 每頁顯示 6 筆資料

const cities = ['台北市', '新竹市', '台中市', '高雄市', '台南市', '花蓮縣'];

const filteredCafes = computed(() => {
  return cafes.value.filter((cafe) => {
    const matchesCity =
      cityName.value === 'all' || cafe.address.includes(cityName.value);
    const matchesQuery = cafe.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCity && matchesQuery;
  });
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
  displayTitle.value = city;
  searchQuery.value = '';
  try {
    cafes.value = await getCafes(city);
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
  displayTitle.value = 'All Cities';
  cafes.value = [];
  searchQuery.value = '';

  try {
    const promises = cities.map((city) => getCafes(city));
    const results = await Promise.all(promises);
    cafes.value = results.flat();
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

onMounted(() => {
  fetchCafes(cityName.value);
});
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

.cafe-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.cafe-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
