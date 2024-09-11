<template>
  <div class="grid grid-cols-1 overflow-hidden cursor-default lg:grid-cols-2 text-stone-900 dark:text-white sm:rounded-3xl h-fit dark:bg-transparent dark:border dark:border-white rounded-2xl">
    <!-- Left Section -->
    <div class="p-5 bg-white sm:p-8 dark:bg-transparent">
      <p class="tracking-[.25em] lg:mb-10 mb-4 xs:mb-6 text-xs xs:text-base xl:text-lg font-bold ">
        {{ $t('work.core.item1') }}
      </p>
      <div class="space-y-3 text-lg font-extrabold lg:space-y-5 xs:text-2xl sm:text-3xl lg:sm:text-4xl text-stone-400 dark:text-stone-400">
        <!-- Project Buttons -->
        <button
          v-for="tab in [1, 2, 3, 4]"
          :key="tab"
          type="button"
          class="inline-flex w-full leading-normal text-left transition-colors duration-300 ease-in-out"
          :class="{
            'text-stone-900 dark:text-white': activeTab === tab,
            'focus:text-stone-900 hover:text-stone-900 dark:focus:text-white dark:hover:text-white': activeTab !== tab
          }"
          @click="selectTab(tab)"
        >
          <p class="whitespace-nowrap">{{ `0${tab} -` }}&nbsp;</p>
          {{ $t(`project${tab}.core.title`) }}
        </button>
      </div>
    </div>

    <!-- Right Section -->
    <div class="h-72 sm:h-96 lg:h-auto">
      <SkeletonLoader v-if="loading" size="full" />
      <TabTransition v-else>
        <!-- Project 1 -->
        <WorkDetail
          v-if="activeTab === 1"
          :key="1"
          :activeTab="activeTab"
          @selectTab="selectTab"
          year="2024"
          :title="$t('project1.core.title')"
          :desc="$t('project1.core.desc')"
          :tag="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]"
          linkTo="/work/project1"
          backgroundImage="https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <!-- Project 2 -->
        <WorkDetail
          v-if="activeTab === 2"
          :key="2"
          :activeTab="activeTab"
          @selectTab="selectTab"
          year="2024"
          :title="$t('project2.core.title')"
          :desc="$t('project2.core.desc')"
          :tag="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]"
          linkTo="/list_1"
          backgroundImage="https://images.unsplash.com/photo-1724271366205-62a20f7cb4e2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <!-- Project 3 -->
        <WorkDetail
          v-if="activeTab === 3"
          :key="3"
          :activeTab="activeTab"
          @selectTab="selectTab"
          year="1111"
          :title="$t('project3.core.title')"
          :desc="$t('project3.core.desc')"
          :tag="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]"
          linkTo="/list_1"
          backgroundImage="https://images.unsplash.com/photo-1723904186792-2db5de01a347?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <!-- Project 4 -->
        <WorkDetail
          v-if="activeTab === 4"
          :key="4"
          :activeTab="activeTab"
          @selectTab="selectTab"
          year="1111"
          :title="$t('project4.core.title')"
          :desc="$t('project4.core.desc')"
          :tag="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]"
          linkTo="/list_1"
          backgroundImage="https://images.unsplash.com/photo-1688297969982-2d46e66ba2f2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </TabTransition>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const data = ref(null);
    const activeTab = ref(1);

    const selectTab = (tab) => {
      activeTab.value = tab;
    };

    onMounted(async () => {
      // Simulate a delay for loading data
      setTimeout(async () => {
        data.value = 'Loaded content here';
        loading.value = false;
      }, 2000);
    });

    return {
      activeTab,
      selectTab,
      loading,
      data,
    };
  },
};
</script>
