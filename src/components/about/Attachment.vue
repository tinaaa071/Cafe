<template>
    <div class="relative w-full cursor-pointer aspect-video group" >
      <!-- Modal Button -->
      <Tag
        v-if="showModalBtn"
        :tag="[$t('work.core.item5')]"
        class="absolute z-10 hidden transition-all duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 bg-white cursor-pointer top-1/2 left-1/2 group-hover:block dark:backdrop-blur"
        @click.stop="openModal"
      />
      <!-- Link Button -->
      <a
        v-if="showLinkBtn"
        :href="linkTo"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute z-10 hidden transition-all duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:block dark:backdrop-blur"
      >
        <Tag 
        :tag="[$t('work.core.item5')]" 
        class="bg-white cursor-pointer "
        />
      </a>
      <!-- Image -->
      <img
        class="object-cover transition-all duration-300 ease-in-out rounded-lg md:rounded-2xl group-hover:brightness-75"
        :src="imgSrc"
        alt=""
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imgSrc: {
        type: String,
        required: true
      },
      modalId: {
        type: [String, Number],
        required: true
      },
      showModalBtn: {
        type: Boolean,
        default: true
      },
      showLinkBtn: {
        type: Boolean,
        default: true
      },
      linkTo: {
        type: String,
        default: '/'
      }
    },
    methods: {
      openModal() {
        this.$emit('open-modal', this.modalId);
      }
    }
  }
  </script>
  