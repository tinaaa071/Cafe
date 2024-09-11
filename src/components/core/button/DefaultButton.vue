<template>
  <RouterLink :to="linkTo" 
  class="text-center px-4 py-2.5 border-2  rounded-full transition-colors ease-in-out duration-300 flex items-center justify-center"
  >
    <!-- Left Icon -->
    <div v-if="showLeftIcon" class="mr-2">
        <component :is="icon" />
    </div>
    <!-- text -->
    <p>
        {{ text }}
    </p>
    <!-- Right Icon -->
    <div v-if="showRightIcon" class="ml-2">
        <component :is="icon" />
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
        showLeftIcon: {
            type: Boolean,
            default: true,
        },
        showRightIcon: {
            type: Boolean,
            default: true,
        },
        icon: {
            type: [Object, Function],
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
};
</script>