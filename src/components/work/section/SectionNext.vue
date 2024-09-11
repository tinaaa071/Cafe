<template>
    <Section
      class="flex flex-col items-center w-full py-8 text-center xl:py-20 md:py-10 "
    >
      <!-- Title -->
      <p class="mb-6 font-semibold md:text-xl text-stone-500 md:mb-12 dark:text-white">
        {{ $t('work.title.item2') }}
      </p>
      <!-- Project -->
      <p
        :class="[
          'mb-6 text-xl sm:text-2xl font-semibold md:text-4xl lg:text-5xl md:mb-12 transition-colors duration-300 ease-in-out',
          isHovered ? 'text-stone-300 dark:text-stone-500 blur-sm' : 'text-stone-500 dark:text-stone-300'
        ]"
      >
        {{ title }}
      </p>
      <!-- Project -->
      <div class="relative flex justify-center w-full h-44 sm:h-72 xl:h-96">
        <CursorDot />
        <!-- Img -->
        <RouterLink
          to="/"
          class="w-[280px] sm:w-[420px] xl:w-[560px] absolute bottom-0 z-0 transition-all duration-300 ease-in-out transform -translate-x-1/2 left-1/2  md:hover:bottom-20 hover:bottom-6 xs:hover:bottom-8 sm:hover:bottom-12"
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <img
            src="https://images.unsplash.com/photo-1688297969982-2d46e66ba2f2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            class=" aspect-video rounded-2xl md:rounded-3xl"
          />
        </RouterLink>
        <!-- Mask -->
        <div
          class="absolute bottom-0 left-0 z-10 w-full h-20 bg-white border-t dark:bg-stone-900 border-B2/70 md:h-32"
        ></div>
        <!-- Button -->
      <MagneticButton
        :linkTo="linkTo"
        :icon="icon"
        :showIcon="showIcon"
        :text="$t('work.core.item5')"
        class="absolute bottom-0 z-10"
      />
      </div>
    </Section>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      linkTo: {
        type: String,
        required: true,
      },
      icon: {
        type: [Object, Function],
        required: true,
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isHovered: false, // State to track hover
      };
    },
  };
  </script>
  