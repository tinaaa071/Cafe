<template>
  <div class="sm:pb-10 bg-B4 dark:bg-stone-900 text-stone-900">
    <Layout :showProgress="true">
    <template #content>
      <div class="space-y-5 sm:space-y-8">
        <!-- Works 區塊 -->
         <WorkCard />
      </div>
    </template>
  </Layout>
  </div>
  <Footer />
  <Modal :show="isModalOpen" @close="isModalOpen = false">
    <Spline />
  </Modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props) {
      const isModalOpen = ref(false)
      
      return { isModalOpen }
    }
};
</script>