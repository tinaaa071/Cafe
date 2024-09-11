<template>
  <div class="pb-6 text-sm bg-white sm:pb-10 dark:bg-stone-900 text-stone-900 dark:text-white xs:text-base">
    <Navbar />
    <ProgressBar />
    <BackToTop class="z-20" />
    <!-- Profile 區塊 -->
     <div class="pt-40 pb-8 mx-auto md:pb-16 md:px-10 xl:px-28 md:pt-44">
      <div class="w-10/12 mx-auto bg-white cursor-default dark:bg-stone-900 dark:text-white text-stone-800 ">
            <div class="flex flex-col items-center w-full gap-6 md:gap-10 md:flex-row">
              <!-- Img -->
              <div class="relative w-full h-64 xs:w-1/2 md:w-1/3 aspect-square">
                <div class="absolute z-10 w-52 -top-12 -left-4">
                  <ChatBubble />
                </div>
                <CardTilt class="shadow bg-center bg-cover  w-full rounded-[64px] h-full bg-[url('https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]" />
              </div>
              <!-- Content -->
               <div class="w-full md:w-2/3">
                <p class="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
                  {{ $t('project1.core.title') }}
                </p>
                <p class="font-medium text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eaque vero expedita quam explicabo beatae porro, saepe accusamus non minus, quaerat repellat voluptates! Exercitationem quod non commodi enim corporis quibusdam doloribus obcaecati, ducimus aut facere, cupiditate optio libero! Rerum quo consequuntur aperiam earum sunt sequi excepturi tempore aspernatur itaque ab.
                </p>
               </div>
            </div>
            
      </div>
     </div>
    <!-- Value 區塊 -->
    <aboutSection 
    :title="$t('about.value.T1')"
    class="bg-B4 dark:border-y dark:border-white/20 md:py-8"
    >
      <div class="flex flex-col">
      <!-- List Items -->
      <div class="flex flex-col overflow-hidden divide-y sm:rounded-3xl rounded-2xl dark:border dark:border-white">
        <!-- List Items -->
        <div
          v-for="(item, index) in [
            { title: 'about.value.S1', content: 'about.value.V1' },
            { title: 'about.value.S2', content: 'about.value.V2' },
            { title: 'about.value.S3', content: 'about.value.V3' }
          ]"
          :key="index"
          class="flex gap-6 p-6 text-xl font-semibold transition-colors duration-100 ease-in-out md:p-8 hover:bg-white dark:hover:bg-stone-800 "
        >
          <span>
            {{ index + 1 }}.
          </span>
          <div>
            <!-- Title -->
            <p class="mb-2">
              {{ $t(item.title) }}
            </p>
            <!-- Content -->
            <p class="text-base font-medium text-stone-700 dark:text-stone-300">
              {{ $t(item.content) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    </aboutSection>
    <!-- Skills 區塊 -->
    <aboutSection
    :title="$t('about.skill.T1')"
    class="md:py-8"
    >
      <div class="flex gap-2 sm:gap-3">
        <Tag
        :tag="[$t('about.skill.S1'), $t('about.skill.S2'), $t('about.skill.S3')]" 
        class="bg-B1/20"
        />
      </div>
    </aboutSection>
    <!-- Language 區塊 -->
    <aboutSection
    :title="$t('about.language.T1')"
    class="md:py-8"
    >
    <div class="grid grid-cols-1 gap-4 xs:gap-6 xs:grid-cols-2">
        <!-- List Items -->
        <div
          v-for="(item, index) in [
            { title: 'about.language.S1', content: 'about.language.L1' },
            { title: 'about.language.S2', content: 'about.language.L2' }
          ]"
          :key="index"
          class="flex w-full gap-6 px-6 py-5 font-semibold border shadow sm:rounded-3xl rounded-2xl border-B4"
        >
          <div>
            <!-- Title -->
            <p class="mb-2">
              {{ $t(item.title) }}
            </p>
            <!-- Content -->
            <p class="text-sm font-medium text-stone-500 dark:text-stone-300">
              {{ $t(item.content) }}
            </p>
          </div>
        </div>
      </div>
    </aboutSection>
    <!-- Education 區塊 -->
    <aboutSection
    :title="$t('about.education.T1')"
    class="md:py-8"
    >
    <div class="grid grid-cols-1 gap-4 xs:gap-6 xs:grid-cols-2">
        <!-- List Items -->
        <div
          class="flex w-full gap-6 px-6 py-5 font-semibold border shadow sm:rounded-3xl rounded-2xl border-B4"
        >
          <div>
            <!-- Title -->
            <p class="mb-2">
              {{ $t('about.education.S1') }}
            </p>
            <!-- Content -->
            <p class="text-sm font-medium text-stone-500 dark:text-stone-300">
              {{ $t('about.education.L1') }}
              <br />
              {{ $t('about.education.L2') }}
            </p>
          </div>
        </div>
      </div>
    </aboutSection>
    <!-- Learning 區塊 -->
    <aboutSection
    :title="$t('about.certificate.T1')"
    class="md:py-8"
    >
    <div class="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <!-- List Items -->
        <LearnCard
        v-for="(card, index) in [
        { title: $t('about.certificate.S1'), info: $t('about.certificate.L1'), cardSrc: 'https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { title: $t('about.certificate.S2'), info: $t('about.certificate.L2'), cardSrc: 'https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { title: $t('about.certificate.S3'), info: $t('about.certificate.L3'), cardSrc: 'https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        // Add more cards as needed
      ]"
      :key="index"
      :title="card.title"
      :info="card.info"
      :cardSrc="card.cardSrc"
    />
      </div>
    </aboutSection>
    <!-- Tools 區塊 -->
    <div class="py-8 mx-auto md:py-10 bg-B3 dark:bg-stone-800 xl:py-16">
      <p class="px-6 mb-8 text-xl font-semibold sm:px-10 xl:px-28">
        {{ $t('about.tool.T1') }}
      </p>
      <ToolMarquee />
    </div>
    <!-- Work 區塊 -->
    <aboutSection
    :title="$t('about.work.T1')"
    class="md:py-8 "
    >
      <WorkAccordion
      v-for="(section, index) in sections"
      :key="index"
      :title="section.title"
      :info="section.info"
      :desc="section.desc"
      :showLogo="section.showLogo"
      :logoSrc="section.logoSrc"
      :sections="section.sections"
      :showAtt="true"
      :items="section.items"
      :showModalBtn="section.showModalBtn"
      :showLinkBtn="section.showLinkBtn"
      />
      <Modal
          v-if="currentModalId !== null"
          :show="currentModalId !== null"
          @close="closeModal"
        >
        
        </Modal>
    </aboutSection>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      sections: [
        {
          title: 'Section 1',
          info: 'Info for section 1',
          desc: 'Description for section 1',
          showLogo: true,
          logoSrc: 'https://images.unsplash.com/photo-1628766416710-61d6f15f32b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          sections: [
            {
              listTitle: 'List Title 1',
              listItems: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
            },
            {
              listTitle: 'List Title 2',
              listItems: ['Item 2.1', 'Item 2.2'],
            }
          ],
          items: [
            { 
              id: 1, 
              imgSrc: 'https://images.unsplash.com/photo-1628766416710-61d6f15f32b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              linkTo: 'https://tailwindcss.com/docs/transition-duration',
              showModalBtn: true,
              showLinkBtn: false
            },
            { 
              id: 2, 
              imgSrc: 'https://images.unsplash.com/photo-1628766416710-61d6f15f32b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
              linkTo: 'https://tailwindcss.com/docs/transition-duration',
              showModalBtn: false,
              showLinkBtn: true
            }
          ],
          showModalBtn: false,
          showLinkBtn: true
        },
        // Add more section objects as needed
      ],
      currentModalId: ref(null)
    };
  },
  methods: {
    openModal(modalId) {
      this.currentModalId = modalId;
    },
    closeModal() {
      this.currentModalId = null;
    }
  }
};
</script>