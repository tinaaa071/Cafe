<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-20">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 transition-opacity bg-black/30 backdrop-blur-lg" />
      </TransitionChild>

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0 ">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative overflow-hidden text-left transition-all transform shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
            >
              <!-- Header -->
              <div class="text-right text-white">
                <button
                  type="button"
                  class="p-3 transition-colors bg-white border-2 border-white rounded-xl hover:text-stone-900 bg-stone-900/10"
                  @click="closeModal"
                >
                  <span class="sr-only">Close</span>
                  <fa6-solid-xmark />
                </button>
              </div>
              <!-- Content -->
              <div class="">
                <Spline />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { useVModel } from "@vueuse/core";

// Define props and emits for the component
const props = defineProps({
  modelValue: Boolean,
  title: String,
});

const emit = defineEmits(["update:modelValue"]);

// Create a reactive two-way binding with modelValue using useVModel
const isOpen = useVModel(props, "modelValue", emit);

// Functions to open and close the modal
const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>
