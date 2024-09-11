<template>
    <RouterLink :to="linkTo" class="">
        <div class="relative flex items-center justify-center overflow-hidden border-2 border-white rounded-full group w-fit" @mouseover="toggleHover(true)" @mouseleave="toggleHover(false)">
        <div 
        :class="['text-white z-10 relative transition-colors ease-in-out duration-300 group-hover:text-stone-900', { 'hovered': isHovered }]"
        class="text-sm font-bold sm:px-6 sm:py-3.5 inline-flex items-center px-4 py-2.5"
        >
            {{ $t('work.core.item2') }}
            <mingcute-arrow-right-line class="ml-2 text-lg" />
        </div>
        <div 
        class="absolute top-0 flex items-center justify-center w-full h-full rounded-full z-1 -left-[100%] card-content"
        style="transition: transform 0.4s, left 0.4s" 
        :class="{ 'is-hovered': isHovered }"
        >
            <div class="flex items-center justify-center w-full h-full bg-white rounded-full text-stone-900">
            </div>
        </div>
        </div>
    </RouterLink>
  </template>
  
  <script>
export default {
  props: {
    linkTo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    toggleHover(status) {
      this.isHovered = status;
    },
  },
};
</script>
  
  <style scoped>
  @keyframes shake {
    100% { transform: translateX(0); }
    20% { transform: translateX(-120px); }
    40% { transform: translateX(120px); }
    60% { transform: translateX(-80px); }
    80% { transform: translateX(40px); }
  }

  .card-content.is-hovered {
    left: 0;
    animation: shake 0.8s ease-in-out;
  }

  </style>
  