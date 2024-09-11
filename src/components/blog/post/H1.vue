<template>
    <p class="text-xl font-bold md:text-2xl">
        {{ title }}
    </p>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: true
      },
    }
  };
  </script>
  