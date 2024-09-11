<template>
    <Section class="flex flex-col gap-4 px-6 text-center md:gap-8">
      <!-- Title -->
      <p class="text-2xl font-bold md:text-3xl">
        {{ $t('work.title.item2') }}
      </p>
      <!-- Brief -->
      <div class="grid gap-3 text-left sm:gap-4 sm:grid-cols-2">
        <div
          v-for="(brief, index) in briefs"
          :key="index"
          class="p-4 text-justify border rounded-lg sm:p-6 border-stone-200"
        >
          <p class="mb-2 font-semibold">
            {{ `${(index + 1).toString().padStart(2, '0')} ` }}&ensp;|&ensp;
            <span>
                {{ $t(brief.title) }}
            </span>
          </p>
          <p class="font-normal text-stone-700 dark:text-stone-300">
            {{ $t(brief.content) }}
          </p>
        </div>
      </div>
    </Section>
  </template>
  
  <script>
  export default {
    props: {
      briefs: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  