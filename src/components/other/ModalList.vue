<template>
  <div class="grid grid-cols-1 gap-8 mb-8 lg:mb-16 xs:grid-cols-3 lg:grid-cols-4 xs:gap-x-6 xs:gap-y-10 lg:gap-x-10 lg:gap-y-16">
    <ModalCard 
      v-for="modal in modals" 
      :key="modal.id" 
      :modal="modal" 
      :modalId="modal.id"
      @open-modal="openModal"
    />
  </div>
</template>

<script>
import { ref } from 'vue'; // Ensure ref is imported from Vue

export default {
  name: "ModalList",
  props: {
    modals: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const currentModalId = ref(null);

    const openModal = (modalId) => {
      currentModalId.value = modalId;
      emit('open-modal', modalId); // Emit event to parent if needed
    };

    const closeModal = () => {
      currentModalId.value = null;
    };

    const getModalById = (id) => {
      return props.modals.find(modal => modal.id === id);
    };

    return {
      currentModalId,
      openModal,
      closeModal,
      getModalById
    };
  }
};
</script>
