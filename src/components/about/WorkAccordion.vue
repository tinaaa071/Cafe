<template>
    <div class="overflow-hidden border shadow rounded-2xl sm:rounded-3xl border-B4">
      <!-- Title -->
      <button
        @click="toggle"
        :class="{
          'bg-B4 text-B1 dark:bg-stone-800 dark:border-b dark:border-white dark:text-white ': isOpen,
          'bg-stone-50 text-stone-600 dark:bg-transparent dark:text-stone-300 ': !isOpen
        }"
        class="relative flex items-center w-full px-4 py-3 overflow-hidden text-left transition-colors duration-300 ease-in-out xs:justify-between sm:px-5 sm:py-4 hover:bg-B4"
      >
        <div class="flex items-center gap-4 font-medium ">
          <!-- Logo -->
          <img
            v-if="showLogo"
            :src="logoSrc"
            alt="logo"
            class="object-cover w-16 h-16 border border-white rounded-2xl"
          />
          <!-- Company -->
          <div class="flex flex-col gap-2 font-medium">
            <!-- Title -->
            <p>
                {{ title }}
            </p>
            <!-- Info -->
            <p>
                {{ info }}
            </p>
            <!-- Desc -->
            <p>
                {{ desc }}
            </p>
          </div>
        </div>
        <PlusButton :isPlus="!isOpen" @toggle="toggle" 
        class="absolute z-10 right-4 top-4 xs:static"
        />
      </button>
      <!-- Content -->
      <TransitionFade>
        <div v-show="isOpen" class="p-6 space-y-6 bg-white dark:bg-transparent ">
        <!-- Inner -->
        <div class="flex">
          <div v-for="(section, index) in sections" :key="index" class="grow">
            <p class="mb-2 text-stone-800 dark:text-white">
              {{ section.listTitle }}
            </p>
            <ul class="font-normal list-disc list-inside text-stone-500 dark:text-stone-400">
              <li v-for="(item, index) in section.listItems" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Attachment -->
        <div 
        v-if="showAtt"
        class="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-4"
        >
          <Attachment
            v-for="item in items"
            :key="item.id"
            :modalId="item.id"
            :imgSrc="item.imgSrc"
            :linkTo="item.linkTo"
            :showModalBtn="item.showModalBtn"
            :showLinkBtn="item.showLinkBtn"
            @open-modal="openModal"
          />
          <Modal
            v-if="currentModalId !== null"
            :show="currentModalId !== null"
            @close="closeModal"
          >
          <img 
            class="w-full aspect-video rounded-3xl h-[500px]"
            src="https://images.unsplash.com/photo-1628766416710-61d6f15f32b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="">
          </Modal>
        </div>
      </div>
      </TransitionFade>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    logoSrc: {
      type: String,
      default: '',
    },
    sections: {
      type: Array,
      required: true,
      default: () => []
    },
    showAtt: {
        type: Boolean,
        default: true
      },
    items: {
      type: Array,
      required: true,
    }
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const currentModalId = ref(null);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    const openModal = (modalId) => {
      currentModalId.value = modalId;
    };

    const closeModal = () => {
      currentModalId.value = null;
    };

    return {
      isOpen,
      toggle,
      currentModalId,
      openModal,
      closeModal
    };
  }
  };
  </script>
  
  <style scoped>
  /* Assuming TransitionFade is a defined transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  </style>
  