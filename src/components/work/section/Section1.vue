<!-- componentB.vue -->
<template>
    <Section class="px-6">
      <div class="grid gap-6 xl:grid-cols-10 xl:gap-10 xs:grid-cols-8">
        <!-- Left -->
        <InfoCard
          class="xs:col-span-3"
          :info1="info1"
          :info2="info2"
          :info3="info3"
          :info4="info4"
        />
        <!-- Right -->
        <div class="xl:col-span-7 xs:col-span-5">
          <p class="mb-6 font-normal">
            {{ content }}
          </p>
          <CardTilt>
            <img 
            :src="bannerSrc"
            alt="Avatar"
            class="object-cover w-full xl:rounded-3xl aspect-video rounded-2xl "
          >
          </CardTilt>
          
        </div>
      </div>
    </Section>
  </template>
  
  <script>
  export default {
    props: {
      info1: {
        type: String,
        required: true,
      },
      info2: {
        type: Array,
        required: true,
      },
      info3: {
        type: String,
        required: true,
      },
      info4: {
        type: Array,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      bannerSrc: {
        type: String,
        default: '',
      },
    },
  };
  </script>
  