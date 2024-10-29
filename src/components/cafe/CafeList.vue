<template>
  <div>
    <!-- 搜尋欄 -->
    <div class="flex items-center mb-4 font-bold">
      <div class="flex w-full">
        <select
          id="city-select"
          v-model="selectedCity"
          @change="handleCityChange"
          class="py-2.5 border-2 sm:py-4 border-stone-900 bg-B3 dark:border-white"
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
          class="py-2.5 w-full bg-white border-2 border-l-0 sm:py-4 border-stone-900 placeholder:text-stone-400 placeholder:font-medium dark:border-white dark:bg-stone-900 dark:text-white"
        />
      </div>
      <button type="button" class="px-3 py-2.5 text-white whitespace-nowrap border-2 sm:py-4 sm:px-6 bg-stone-900 border-stone-900 dark:bg-white dark:border-white dark:text-stone-900">
        搜尋
      </button>
    </div>
    <!-- Tab -->
    <div
      ref="tabsContainer"
      class="flex overflow-hidden overflow-x-auto flex-nowrap gap-3 mb-8 text-sm font-bold whitespace-nowrap sm:mb-12 sm:gap-4"
    >
      <button
        @click="fetchAllCafes"
        :class="[
          'px-3 py-2.5 sm:px-6 sm:py-4 border-2 transition-colors duration-300 hover:bg-stone-700 font-bold dark:border-white hover:text-white', 
          cityName === 'all' ? 'bg-stone-900 border-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-B3 border-stone-900 text-stone-900   dark:border-white dark:hover:bg-stone-700 dark:hover:text-white'
        ]"
        style="position: sticky; left: 0; z-index: 10;"
      >
        全部城市
      </button>
      <button
        v-for="city in cities"
        :key="city"
        @click="fetchCafes(city)"
        :class="[
          'px-3 py-2.5 sm:px-6 sm:py-4 border-2 transition-colors duration-300 hover:bg-stone-500 font-bold dark:border-white hover:text-white dark:hover:bg-stone-700 dark:hover:text-white', 
          city === cityName ? 'bg-stone-900 border-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-white border-stone-900 text-stone-900 dark:bg-transparent dark:text-white  '
        ]"
      >
        {{ city }}
      </button>
    </div>
    <!-- Cafe 卡片 -->
    <div class="mb-16 dark:text-white">
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else-if="filteredCafes.length" class="grid grid-cols-1 gap-y-12 gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(cafe, index) in paginatedCafes"
          :key="cafe.id"
          class="text-center cafe-card"
          @click="selectCafe(cafe)"
        >
          <div class="w-full rounded-full border-2 aspect-[3/2] border-stone-900 mb-4 overflow-hidden cursor-pointer dark:border-white">
            <img
              :src="getImageUrl(index)"
              :alt="getImageAlt(index)"
              class="object-cover w-full h-full transition-all duration-300 hover:scale-110"
            />
          </div>
          <h2 class="text-lg font-bold cursor-default">
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
      cities: ['台北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '宜蘭縣', '台中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '高雄市', '台南市', '嘉義市', '嘉義縣', '屏東縣', '花蓮縣', '台東縣', '澎湖縣'],
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
    const container = this.$refs.tabsContainer;

    container.addEventListener('wheel', (e) => {
      e.preventDefault(); // 禁止垂直滾動
      container.scrollLeft += e.deltaY; // 讓滾輪控制水平滾動
    });
  },
};
</script>

<style scoped>
.city-button.active {
  background-color: #0c0a09;
  color: white;
}
.flex {
  -ms-overflow-style: none;  /* IE 和 Edge */
  scrollbar-width: none;     /* Firefox */
}

.flex::-webkit-scrollbar {
  display: none; /* Chrome, Safari 和 Opera */
}
</style>