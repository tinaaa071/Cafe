<template>
  <div class="sm:pb-10 bg-B4 dark:bg-stone-900 text-stone-900">
    <Layout :showProgress="true">
    <template #content>
      <div class="space-y-5 sm:space-y-8">
        <!-- Hero 區塊 -->
        <div class="grid grid-flow-row-dense grid-cols-4 gap-2.5 sm:gap-4 cursor-default">
          <!-- 第一格 -->
          <div class="inline-flex flex-col justify-between col-span-4 gap-6 p-5 bg-white xs:gap-10 sm:p-8 sm:col-span-2 sm:rounded-3xl dark:bg-transparent dark:border dark:border-stone-50 text-stone-900 dark:text-white rounded-2xl">
            <div class="flex items-center gap-6 text-xl font-bold xs:text-2xl sm:text-3xl lg:text-4xl">
              <!-- 照片 -->
              <div class="hidden w-32 h-32 bg-center bg-cover rounded-full xl:block"
              style="background-image: url(https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)">
              </div>
              <div>
                <p class="mb-2 leading-tight sm:leading-normal text-balance">
                  {{ $t('hero.item1') }}
                </p>
                <p class="inline-flex leading-tight sm:flex-col md:flex-row sm:leading-normal">
                  {{ $t('hero.item2') }}
                  <Typewriter class="ml-2 md:ml-2 sm:ml-0" />
                </p>
              </div>
            </div>
            <div class="inline-flex justify-between w-full text-sm font-normal">
              <p>{{ $t('hero.item6') }}</p>
              <p class="hidden lg:block">{{ $t('hero.item7') }}</p>
              <p>{{ $t('hero.item8') }}</p>
            </div>
          </div>
          <!-- 第二格 -->
          <div class="col-span-2 overflow-hidden cursor-pointer sm:rounded-3xl lg:col-span-1 rounded-2xl"
          @click="isModalOpen = true"
          >
            <div class="relative w-full h-full ">
              <div class="absolute bottom-0 z-10 ">
                <ArrowButton link-to="" @click="isModalOpen = true" />
              </div>
              <div class="z-0 w-full h-full transition-transform duration-500 ease-in-out transform bg-center bg-cover rounded-3xl hover:scale-110"
              style="background-image: url(https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)">
              </div>
            </div>
          </div>
          <!-- 第三格 -->
          <RouterLink to="/" class="hidden row-span-2 overflow-hidden sm:rounded-3xl lg:block rounded-2xl">
            <div class="relative w-full h-full">
              <div class="absolute bottom-0 z-10 ">
                <ArrowButton link-to="/" />
              </div>
              <p class="absolute w-fit h-fit inset-0 z-10 flex items-center justify-center text-6xl font-bold tracking-[.4em] text-white text-outline mx-auto my-auto"
              style="writing-mode: vertical-lr; -webkit-writing-mode: vertical-lr;"
              >
              {{ $t('hero.item9') }}
              </p>
              <div class="w-full h-full transition-transform duration-500 ease-in-out transform bg-center bg-cover -z-10 rounded-3xl hover:scale-110 brightness-75"
              style="background-image: url(https://images.unsplash.com/photo-1724271366025-5bbfc5fbdb70?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)">
              </div>
            </div>
          </RouterLink>
          <!-- 第四格 -->
          <div class="col-span-4 lg:col-span-1 sm:col-span-2">
            <CodeTyping />
          </div>
          <!-- 第五格 -->
          <RouterLink to="/" class="hidden lg:block">
            <div class="inline-flex items-center justify-center w-full h-full transition-colors duration-200 ease-in-out bg-blue-200 aspect-square sm:rounded-3xl rounded-2xl hover:bg-blue-200/75 group">
              <entypo-social-linkedin class="text-6xl text-white transition-all duration-200 ease-in-out dark:text-stone-900 group-hover:text-7xl" />
            </div>
          </RouterLink>
          <!-- 第六格 -->
          <div class="col-span-2 p-5 bg-white md:p-8 sm:rounded-3xl dark:bg-transparent dark:border dark:border-stone-50 text-stone-900 dark:text-white lg:col-span-1 rounded-2xl">
            <p class="mb-4 text-xs font-bold sm:text-sm md:text-lg">
              {{ $t('hero.item10') }}
            </p>
            <p class="text-xl font-extrabold leading-normal sm:leading-normal xs:leading-normal xs:text-2xl sm:text-3xl lg:text-4xl lg:leading-normal">
              {{ $t('hero.item11') }}
            </p>
          </div>
          <!-- Marquee -->
          <div class="col-span-4">
            <Marquee />
          </div>
        </div>
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