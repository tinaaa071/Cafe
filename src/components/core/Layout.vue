<template>
    <ProgressBar v-if="showProgress" />
    <Navbar class="z-10" />
    <BackToTop class="z-20" />
    <!-- 內容區塊 -->
    <section class="flex flex-col w-full min-h-screen bg-B4 dark:bg-stone-900">
      <div class="px-6 pt-28 pb-10 mx-auto w-full h-full sm:pt-32 sm:px-10 xl:px-28">
        <!-- <h1 class="mb-8 text-xl text-center md:mb-10 md:text-3xl">{{ title }}</h1> -->
        <slot name="content"></slot>
      </div>
    </section>
    <Footer />
  </template>
  
  <script>
  export default {
    props: {
      showProgress: {
        type: Boolean,
        default: false
      },
    }
  };
  </script>