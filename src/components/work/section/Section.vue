<template>
    <section
      :id="id"
      class="flex justify-center py-8 bg-white cursor-default dark:bg-stone-900 xl:px-56 md:p-10"
    >
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

  