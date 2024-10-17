<template>
  <div class="sm:pb-10 bg-B4 dark:bg-stone-900 text-stone-900">
    <Layout :showProgress="false">
    <template #content>
      <!-- Hero 區塊 -->
      <div class="flex flex-col items-center mb-12 text-center sm:flex-row">
        <!-- Title -->
        <div class="w-1/2">
          <h1 class="mb-6 text-6xl font-bold">
            Paw Cafe
          </h1>
          <p class="text-xl font-light">
            Welcome to 
          </p>
        </div>
        <!-- Banner -->
         <div class="w-1/2">
          <div class="bg-cover bg-center border-2 border-stone-900 overflow-hidden mb-4 aspect-video bg-[url('https://i.pinimg.com/control/564x/b5/b4/f9/b5b4f9cad18a8a787c3dd9bd39fc2f5e.jpg')]">
          </div>
          <Marquee />
         </div>
      </div>
      <!-- Cafe 區塊 -->
      <CafeList />
    </template>
  </Layout>
  </div>
  <Footer />
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