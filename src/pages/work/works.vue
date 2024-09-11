<template>
  <div class="bg-white sm:pb-10 dark:bg-stone-900 text-stone-900">
    <Navbar />
    <ProgressBar />
    <BackToTop class="z-20" />
    <div class="min-h-screen pt-24 pb-6 mx-auto sm:pt-28 md:pt-32">
      <Tabs
        :currentCategory="currentCategory"
        :categories="[
          $t('tag.item1'),
          $t('tag.item2'),
          $t('tag.item3'),
          $t('tag.item4'),
        ]"
        @category-changed="filterByCategory"
      />

      <div class="px-6 sm:px-10 xl:px-28">
        <!-- Display "No data" message if no posts are available -->
        <div v-if="filteredPosts.length === 0" class="p-4 text-center">
          No data
        </div>

        <!-- Display WorkList and Paginator only if there are posts -->
        <div v-else>
          <WorkList :posts="paginatedPosts" />

          <Paginator
            :totalItems="filteredPosts.length"
            :itemsPerPage="itemsPerPage"
            @page-changed="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: this.$t('project1.core.title'),
          category: this.$t('tag.item1'),
          image: 'https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: '2024．09．02',
          link: '/work/project1',
        },
        {
          id: 2,
          title: 'Post 2',
          category: this.$t('tag.item2'),
          image: 'https://images.unsplash.com/photo-1628768534895-ff9185e7edbc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: new Date().toLocaleDateString(),
          link: '/work/project1',
        },
        {
          id: 3, // Ensure unique ID
          title: 'Post 3',
          category: this.$t('tag.item3'),
          image: 'https://images.unsplash.com/photo-1628766416710-61d6f15f32b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: new Date().toLocaleDateString(),
          link: '/work/project1',
        },
        {
          id: 4, // Ensure unique ID
          title: 'Post 4',
          category: this.$t('tag.item4'),
          image: 'https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: new Date().toLocaleDateString(),
          link: '/work/project1',
        },
        {
          id: 5, // Ensure unique ID
          title: 'Post 5',
          category: this.$t('tag.item2'),
          image: 'https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: new Date().toLocaleDateString(),
          link: '/work/project1',
        },
      ],
      currentPage: 1,
      itemsPerPage: 12,
      currentCategory: this.$t('tag.item1'), // Set the default current category
    };
  },
  computed: {
    filteredPosts() {
      if (this.currentCategory === this.$t('tag.item1')) {
        return this.posts;
      }
      return this.posts.filter((post) => post.category === this.currentCategory);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPosts.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    filterByCategory(category) {
      this.currentCategory = category;
      this.currentPage = 1; // Reset to the first page when changing category
    },
  },
};
</script>
