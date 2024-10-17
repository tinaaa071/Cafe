```src/components/cafe/CafeList.vue
<template>
  <div>
    <!-- 搜尋欄 -->
    <div class="flex items-center mb-4">
      <div class="flex w-full">
        <select
          id="city-select"
          v-model="selectedCity"
          @change="handleCityChange"
          class="py-4 border-2 border-stone-900 focus:border-stone-500 bg-B4"
        >
          <option value="all">全部城市</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          @input="filterCafes"
          placeholder="輸入關鍵字"
          class="py-4 w-full bg-white border-2 border-l-0 border-stone-900 focus:border-stone-500 placeholder:text-stone-400"
        />
      </div>
      <button type="button" class="px-6 py-4 text-white whitespace-nowrap border-2 bg-stone-900 border-stone-900">
        搜尋
      </button>
    </div>
    <!-- Tab -->
    <div class="flex overflow-hidden overflow-x-auto flex-nowrap gap-4 mb-16 text-sm whitespace-nowrap">
      <button
        @click="fetchAllCafes"
        :class="['px-6 py-4 bg-white border-2 border-stone-900 transition-colors duration-300 hover:bg-stone-500 active:bg-stone-900 active:text-white text-stone-900 hover:text-white', { 'bg-gray-950 text-white': cityName === 'all' }]"
      >
        全部城市
      </button>
      <button
        v-for="city in cities"
        :key="city"
        @click="fetchCafes(city)"
        :class="['px-6 py-4 bg-white border-2 border-stone-900 transition-colors duration-300 hover:bg-stone-500 active:bg-stone-900 active:text-white text-stone-900 hover:text-white', { 'bg-gray-950 text-white': city === cityName }]"
      >
        {{ city }}
      </button>
    </div>
    <!-- Cafe 卡片 -->
    <div class="mb-16">
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else-if="filteredCafes.length" class="grid grid-cols-1 gap-y-12 gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(cafe, index) in paginatedCafes"
          :key="cafe.id"
          class="text-center cafe-card"
          @click="selectCafe(cafe)"
        >
          <div class="w-full rounded-full border-2 aspect-[3/2] border-stone-900 mb-4 overflow-hidden cursor-pointer">
            <img
              :src="getImageUrl(index)"
              :alt="getImageAlt(index)"
              class="object-cover transition-all duration-300 hover:scale-110"
            />
          </div>
          <h2 class="text-lg font-bold">
            {{ cafe.name }}
          </h2>
        </div>
      </div>
      <p v-else-if="hasSearched">無搜尋結果</p>
      <p v-else>Loading...</p>
    </div>
    <!-- 頁碼 -->
    <Paginator
      :total-items="filteredCafes.length"
      :items-per-page="itemsPerPage"
      @page-changed="handlePageChanged"
    />
    
    <!-- Cafe Drawer -->
    <CafeDrawer :isOpen="isDrawerOpen" :selectedCafe="selectedCafe" @close="isDrawerOpen = false" />
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { getCafes } from '../../apiService.js';


export default {

  data() {
    return {
      cafes: [],
      allCafes: [],
      images: [],
      searchQuery: '',
      cityName: '台北市',
      displayTitle: '台北市',
      error: null,
      isLoading: true,
      itemsPerPage: 6,
      hasSearched: false,
      cities: ['台北市', '新竹市', '台中市', '高雄市', '台南市', '花蓮縣'],
      selectedCity: '台北市',
      currentPage: 1,
      isDrawerOpen: false, // 控制抽屜的開關
      selectedCafe: null, // 存儲所選的咖啡館
    };
  },
  computed: {
    filteredCafes() {
      const searchQueryLower = this.searchQuery.toLowerCase();
      const filtered = this.allCafes.filter((cafe) => {
        const matchesCity =
          this.selectedCity === 'all' || cafe.address.includes(this.selectedCity);
        const matchesQuery = cafe.name.toLowerCase().includes(searchQueryLower);
        return matchesCity && matchesQuery;
      });
      const uniqueCafes = [];
      const cafeNames = new Set();
      filtered.forEach((cafe) => {
        if (!cafeNames.has(cafe.name)) {
          cafeNames.add(cafe.name);
          uniqueCafes.push(cafe);
        }
      });
      return uniqueCafes;
    },
    paginatedCafes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCafes.slice(start, end);
    },
  },
  methods: {
    async fetchCafes(city) {
      this.error = null;
      this.isLoading = true;
      this.cityName = city;
      this.selectedCity = city;
      this.displayTitle = city;
      this.searchQuery = '';
      this.hasSearched = true;

      try {
        const cityCafes = await getCafes(city);
        this.allCafes = [...new Set([...this.allCafes, ...cityCafes])];
        this.cafes = cityCafes;
        await this.fetchCafeImages();
      } catch (err) {
        this.error = 'Failed to load cafes.';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAllCafes() {
      this.error = null;
      this.isLoading = true;
      this.cityName = 'all';
      this.selectedCity = 'all';
      this.displayTitle = '全部城市';
      this.searchQuery = '';
      this.hasSearched = true;

      try {
        const promises = this.cities.map((city) => getCafes(city));
        const results = await Promise.all(promises);
        const all = results.flat();
        const uniqueCafes = [];
        const cafeNames = new Set();
        all.forEach((cafe) => {
          if (!cafeNames.has(cafe.name)) {
            cafeNames.add(cafe.name);
            uniqueCafes.push(cafe);
          }
        });
        this.allCafes = uniqueCafes;
        this.cafes = uniqueCafes;
        await this.fetchCafeImages();
      } catch (err) {
        this.error = 'Failed to load cafes.';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCafeImages() {
      const accessKey = '_9F7po_Bi4VFYiC6StcE3DhxvqlOSyldaXLdHTzBpNI';
      const query = 'cafe';
      const count = 8;

      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${query}&count=${count}`
        );
        this.images = await response.json();
      } catch (error) {
        console.error('Error fetching the images:', error);
      }
    },
    getImageUrl(index) {
      return this.images[index]?.urls.regular || 'https://via.placeholder.com/400';
    },
    getImageAlt(index) {
      return this.images[index]?.alt_description || 'Cafe Image';
    },
    selectCafe(cafe) {
      const imageUrl = this.getImageUrl(this.cafes.findIndex(c => c.id === cafe.id)); // 獲取所選咖啡館的圖片
      this.selectedCafe = {
        ...cafe,
        imageUrl // 使用從 `getImageUrl` 獲取的圖片 URL
      };
      this.isDrawerOpen = true; // 打開抽屜
    },
    handlePageChanged(page) {
      this.currentPage = page;
    },
    handleCityChange() {
      if (this.selectedCity === 'all') {
        this.fetchAllCafes();
      } else {
        this.fetchCafes(this.selectedCity);
      }
    },
  },
  watch: {
    selectedCity(newCity) {
      if (newCity === 'all') {
        this.fetchAllCafes();
      } else {
        this.fetchCafes(newCity);
      }
    },
  },
  mounted() {
    this.fetchCafes(this.cityName);
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>