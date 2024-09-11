<template>
    <div class="flex flex-col gap-6 xs:px-10 md:px-24 lg:px-48 xl:px-72">
      <!-- Banner -->
      <div>
        <CardTilt>
          <img 
            class="object-cover object-center w-full mb-2 rounded-2xl sm:rounded-3xl aspect-video"
            :src="post.banner" 
            alt=""
          >
        </CardTilt>
        <p 
          v-if="showCredit"
          class="text-sm font-normal text-center text-stone-300 dark:text-stone-500">
          {{ post.credit }}
        </p>
      </div>
      <!-- Info -->
      <div>
        <!-- Category + Date -->
        <div class="flex items-center gap-4 mb-8 font-medium">
          <p class="text-B1">
            {{ post.category }}
          </p>
          <span class="w-0.5 h-6 bg-stone-200 dark:bg-stone-500"></span>
          <p class="text-stone-400 dark:text-stone-500">
            {{ post.date }}
          </p>
        </div>
        <!-- Title + Desc -->
        <div class="mb-6">
          <h1 class="mb-4 text-3xl font-bold">
            {{ post.title }}
          </h1>
          <p class="text-lg font-normal text-stone-500 dark:text-stone-400">
            {{ post.desc }}
          </p>
        </div>
        <!-- Brief -->
        <div class="p-6 text-lg text-center rounded-lg xl:px-32 bg-B4 dark:bg-stone-700">
          <slot name="brief"></slot>
        </div>
      </div>
      <!-- Divider -->
      <IconoirMoreHoriz class="w-full text-xl text-center" />
      <!-- Menu -->
      <div 
      v-if="showMenu"
      class="px-8 py-5 text-lg rounded-lg bg-B4 dark:bg-stone-700">
        <p class="mb-2">
          {{ $t('project1.core.title') }}
        </p>
        <ul class="grid gap-2 list-decimal list-inside">
          <li v-for="(item, index) in post.menu" :key="index">
            {{ item.menu }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
      showCredit: {
        type: Boolean,
        default: true,
      },
      showMenu: {
        type: Boolean,
        default: true,
      },
    },
  };
  </script>
  