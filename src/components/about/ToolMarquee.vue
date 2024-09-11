<template>
  <div class="w-full overflow-hidden dark:bg-transparent">
    <div
      class="flex items-center p-1 sm:py-2 whitespace-nowrap marquee-content w-[200%] gap-6 md:gap-8"
    >
      <ToolIcon
        v-for="(iconSrc, index) in repeatedIconSources"
        :key="index"
        :iconSrc="iconSrc"
        class="tool-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconSources: [
        'https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-1024.png',
        'https://w7.pngwing.com/pngs/854/555/png-transparent-vue-js-hd-logo-thumbnail.png',
        'https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo.png',
      ],
    };
  },
  computed: {
    repeatedIconSources() {
      return Array.from({ length: 10 }, () => this.iconSources).flat();
    },
  },
};
</script>

<style>
.marquee-content {
  animation: marquee-slide 20s linear infinite;
  animation-timing-function: linear;
}

.marquee-content:hover {
  animation-play-state: paused; /* Pauses the animation on hover */
}

@keyframes marquee-slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
