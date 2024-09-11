<template>
  <RouterLink :to="linkTo">
    <div class="relative inline-block m-2 text-lg font-bold text-center bg-white border border-white rounded-full bg-opacity-20 hover sm:w-14 sm:h-14 w-10 h-10 backdrop-blur-md arrow sm:leading-[56px] leading-10 rotate-45" :data-hover="hoverIcon">
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
      hoverIcon: '↑'
    };
  }
};
</script>

<style scoped>
.arrow.hover::before,
.arrow.hover::after {
  content: attr(data-hover);
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.3s;
}

.arrow.hover::before {
  opacity: 1;
  color: white;
}

.arrow.hover::after {
  color: white;
  margin-top: 1em;
}

.arrow.hover:hover::before {
  opacity: 0;
  margin-top: -1em;
}

.arrow.hover:hover::after {
  opacity: 1;
  margin-top: 0;
}
</style>
  