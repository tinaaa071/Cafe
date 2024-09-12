<template>
  <div class="flex items-center justify-center text-center text-stone-900 dark:text-white">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="inline-block p-2 text-lg align-middle rounded-lg hover:bg-B3 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-stone-600"
    >
      <OcticonChevronLeft24 />
    </button>

    <!-- Render page numbers and the more icon -->
    <span
      v-for="(page, index) in pagesToShow"
      :key="index"
      class="rounded-lg cursor-pointer py-1.5 px-3.5 inline-block align-middle"
      :class="{
        ' bg-B3 text-B1 dark:bg-stone-600 dark:text-white': currentPage === page,
        ' hover:bg-B3 dark:hover:bg-stone-700': currentPage !== page,
      }"
      @click="page !== 'more' && goToPage(page)"
    >
      <template v-if="page === 'more'">
        <RiMoreLine />
      </template>
      <template v-else>
        {{ page }}
      </template>
    </span>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="inline-block p-2 text-lg align-middle rounded-lg hover:bg-B3 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-stone-600"
    >
      <OcticonChevronRight24 />
    </button>
  </div>
</template>

<script>

export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pagesToShow() {
      const pages = [];
      const totalPages = this.totalPages;

      // Always show the first three pages
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(i);
      }

      // Add "more" icon if the gap exists between first three pages and current page
      if (this.currentPage > 4) {
        pages.push('more');
      }

      // Add pages around the current page
      const start = Math.max(4, this.currentPage - 1);
      const end = Math.min(totalPages - 1, this.currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add "more" icon if the gap exists between current page and last page
      if (this.currentPage < totalPages - 3) {
        pages.push('more');
      }

      // Always show the last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }

      return pages;
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$emit('page-changed', this.currentPage);
    },
  },
};
</script>
