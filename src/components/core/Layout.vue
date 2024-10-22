<template>
    <ProgressBar v-if="showProgress" />
    <Navbar class="z-10" />
    <BackToTop class="z-20" />
    <!-- 內容區塊 -->
    <section class="h-full">
      <div class="px-6 pt-24 pb-6 mx-auto h-full sm:pt-28 sm:px-10 xl:px-28 md:pt-32">
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