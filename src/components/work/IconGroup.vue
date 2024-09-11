<!-- src/components/IconGroup.vue -->
<template>
    <div class="flex flex-col space-y-5 text-2xl text-white ">
        <fa6-solid-envelope v-if="iconsVisible[0]" aria-hidden="true" />
        <fa6-solid-apple-whole v-if="iconsVisible[1]"  aria-hidden="true" />
        <fa6-solid-apple-whole v-if="iconsVisible[2]"  aria-hidden="true" />
        <fa6-solid-apple-whole v-if="iconsVisible[3]"  aria-hidden="true" />
        <fa6-solid-apple-whole v-if="iconsVisible[4]"  aria-hidden="true" />
    </div>
  </template>
  
  <script>
  export default {
    name: "IconGroup",
    props: {
      iconsVisible: {
        type: Array,
        default: () => [false, false, false, false, false], // Default to all hidden
        validator: (value) => value.length === 5 && value.every((item) => typeof item === 'boolean'),
      },
    },
  };
  </script>
