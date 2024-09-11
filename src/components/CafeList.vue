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
      <li
        v-for="(cafe, index) in filteredCafes"
        :key="cafe.id"
        class="cafe-card"
      >
        <h2>{{ cafe.name }}</h2>
        <img
          :src="getImageUrl(index)"
          :alt="getImageAlt(index)"
          class="w-full h-full object-cover rounded-lg shadow-md aspect-video"
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
        <p>MRT: {{ cafe.mrt }}</p>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCafes } from '../apiService.js';

const cafes = ref([]);
const images = ref([]);
const filteredCafes = computed(() => {
  if (!searchQuery.value) return cafes.value;
  return cafes.value.filter((cafe) =>
    cafe.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const searchQuery = ref('');
const error = ref(null);
const cityName = ref('taipei'); // Default city
const displayTitle = ref(cityName.value);
const isLoading = ref(true);

// List of available cities
const cities = [
  'taipei',
  'hsinchu',
  'taichung',
  'kaohsiung',
  'tainan',
  'hualien',
];

// Fetch cafes for a specific city
const fetchCafes = async (city) => {
  error.value = null;
  isLoading.value = true;
  cityName.value = city;
  displayTitle.value = city;
  searchQuery.value = ''; // Clear search input
  try {
    cafes.value = await getCafes(city);
    await fetchCafeImages(); // Fetch images when cafes are loaded
  } catch (err) {
    error.value = 'Failed to load cafes.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch all cafes from all cities
const fetchAllCafes = async () => {
  error.value = null;
  isLoading.value = true;
  cityName.value = 'all';
  displayTitle.value = 'All Cities';
  cafes.value = [];
  searchQuery.value = ''; // Clear search input

  try {
    const promises = cities.map((city) => getCafes(city));
    const results = await Promise.all(promises);
    cafes.value = results.flat();
    await fetchCafeImages(); // Fetch images when all cafes are loaded
  } catch (err) {
    error.value = 'Failed to load cafes.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch images from Unsplash API
async function fetchCafeImages() {
  const accessKey = '_9F7po_Bi4VFYiC6StcE3DhxvqlOSyldaXLdHTzBpNI'; // Replace with your Unsplash Access Key
  const query = 'cafe'; // Theme for the images
  const count = 24; // Number of images to fetch

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${query}&count=${count}`
    );
    images.value = await response.json();
  } catch (error) {
    console.error('Error fetching the images:', error);
  }
}

// Get the image URL for the current cafe
const getImageUrl = (index) => {
  return images.value[index]?.urls.regular || 'https://via.placeholder.com/400';
};

// Get the alt description for the current cafe
const getImageAlt = (index) => {
  return images.value[index]?.alt_description || 'Cafe Image';
};

// Load default cafes when the component is mounted
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
