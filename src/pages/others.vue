<template>
    <div class="bg-white sm:pb-10 dark:bg-stone-900 text-stone-900 ">
      <Navbar />
      <ProgressBar />
      <BackToTop class="z-20" />
      <div class="min-h-screen pt-24 pb-6 mx-auto sm:pt-28 md:pt-32">
        <Tabs
          :currentCategory="currentCategory"
          :categories="[
            $t('other.item1'),
            $t('other.item2'),
            $t('other.item3'),
            $t('other.item4'),
          ]"
          @category-changed="filterByCategory"
        />
  
        <div class="px-6 sm:px-10 xl:px-28">
          <div v-if="filteredPosts.length === 0" class="p-4 text-center">
            No data
          </div>
  
          <div v-else>
            <ModalList
              :modals="paginatedPosts"
              @open-modal="openModal"
            />
  
            <Paginator
              :totalItems="filteredPosts.length"
              :itemsPerPage="itemsPerPage"
              @page-changed="handlePageChange"
            />
          </div>
        </div>
      </div>
  
      <Modal
        v-if="currentModalId !== null"
        :show="currentModalId !== null"
        @close="closeModal"
        :modal="getModalById(currentModalId)"
      >
      <img 
        class="w-full aspect-video rounded-3xl h-[500px] object-cover object-center"
        :src="getModalById(currentModalId)?.image"
        alt="Modal Image">
      </Modal>
    </div>
    <Footer />
  </template>
  
  <script>
  export default {
    data() {
      return {
        modals: [
        {
            id: 1,
            title: "Post 1",
            category: this.$t('other.item1'),
            image: "https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        {
            id: 2,
            title: "Post 1",
            category: this.$t('other.item2'),
            image: "https://images.unsplash.com/photo-1725489892948-9ace0d73f9ad?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        {
            id: 3,
            title: "Post 1",
            category: this.$t('other.item3'),
            image: "https://images.unsplash.com/photo-1725628736546-6b334a2002d7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        {
            id: 4,
            title: "Post 1",
            category: this.$t('other.item4'),
            image: "https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
        currentPage: 1,
        itemsPerPage: 12,
        currentCategory: this.$t('other.item1'),
        currentModalId: null // Track the current open modal ID
      };
    },
    computed: {
      filteredPosts() {
        if (this.currentCategory === this.$t('other.item1')) {
          return this.modals;
        }
        return this.modals.filter(
          (post) => post.category === this.currentCategory
        );
      },
      paginatedPosts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredPosts.slice(start, end);
      }
    },
    methods: {
      handlePageChange(page) {
        this.currentPage = page;
      },
      filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1; // Reset to the first page when changing category
      },
      openModal(modalId) {
        this.currentModalId = modalId;
      },
      closeModal() {
        this.currentModalId = null;
      },
      getModalById(id) {
        return this.modals.find(modal => modal.id === id);
      }
    }
  };
  </script>
  