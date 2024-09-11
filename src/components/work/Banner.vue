<template>
  <!-- bg -->
  <div
    class="bg-fixed top-0 left-0 w-full sm:h-[560px] h-[480px] bg-cover bg-bottom"
    :style="{ backgroundImage: `url(${bannerSrc})` }"
  >
  </div>
</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      bannerSrc: {
        type: String,
        default: '',
      },
      iconsVisible: {
      type: Array,
      default: () => [false, false, false, false, false],
    },
    },
  };
  </script>
  