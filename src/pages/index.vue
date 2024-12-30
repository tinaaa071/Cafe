<template>
  <Layout :showProgress="false">
    <template #content>
      <!-- Hero 區塊 -->
      <div class="flex flex-col gap-8 items-center mb-12 text-center cursor-default lg:flex-row sm:gap-12 dark:text-white">
        <!-- Title -->
        <div class="w-1/2">
          <h1 class="mb-3 text-2xl font-bold sm:mb-6 sm:text-5xl lg:text-6xl">
            哈囉！
          </h1>
          <p class="text-sm font-normal sm:text-xl">
            歡迎來到 Paw Cafe
          </p>
        </div>
        <!-- Banner -->
        <div class="w-full lg:w-1/2">
          <div class="bg-cover bg-center border-2 border-stone-900 dark:border-white overflow-hidden mb-4 aspect-video bg-[url('https://i.pinimg.com/control/564x/b5/b4/f9/b5b4f9cad18a8a787c3dd9bd39fc2f5e.jpg')]">
          </div>
          <Marquee />
        </div>
      </div>
      <!-- Cafe 區塊 -->
      <CafeList />
    </template>
  </Layout>
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