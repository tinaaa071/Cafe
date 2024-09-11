<template>
    <section
      :id="id"
      class="px-6 py-8 mx-auto sm:px-10 xl:px-28 md:py-10 dark:bg-stone-900 xl:py-16"
    >
      <p class="mb-6 text-xl font-semibold md:mb-8">
        {{ title }}
      </p>
      <slot></slot>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  };
  </script>

  