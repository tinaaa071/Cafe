<template> 
     <div class="relative pb-6 text-sm sm:pb-10 bg-B4 dark:bg-stone-900 text-stone-800 xs:text-base dark:text-white">
      <Navbar />
      <ProgressBar />
      <BackToTop class="z-20" />
      <!-- Banner -->
      <Banner 
        title="123"
        bannerSrc="https://images.unsplash.com/photo-1688297969982-2d46e66ba2f2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <!-- Content -->
      <div class="absolute left-0 sm:top-[480px] top-[400px] w-full ">
        <!-- Info -->
        <Info 
        :title="$t('project1.core.title')"
        :info1="$t('work.core.item3')"
        :info2="$t('work.core.item3')"
        :info3="$t('work.core.item3')"
        :info4="$t('work.core.item3')"
        :tag="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]" 
        :iconsVisible="[true, false, true, true, false]"
        :linkTo="'/'"
        :icon="icon" 
        
        />
        <!-- Main Content -->
        <div>
          <ScrollSpy :sections="sections" />
          <!-- Section1 -->
          <Section1
          id="section1"
          :info1="$t('project1.infoContent.item1')"
          :info2="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]"
          :info3="[$t('project1.infoContent.item2'), $t('project1.infoContent.item3'), $t('project1.infoContent.item4')]"
          :info4="[
            { avatarSrc: 'https://images.unsplash.com/photo-1724942462164-7c30f103d91c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', job: 'Designer', name: 'John Doe' },
            { avatarSrc: 'https://images.unsplash.com/photo-1724748860101-589aa7ee8b29?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', job: 'Developer', name: 'Jane Smith' }
          ]"
          :content="$t('work.core.item5')"
          bannerSrc="https://images.unsplash.com/photo-1723904187003-807a2f7c8311?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <!-- Section2 -->
          <Section2
            id="section2"
            :briefs="[
            { title: $t('work.briefCard.item1'), content: $t('project1.briefCard.item1') },
            { title: $t('work.briefCard.item2'), content: $t('project1.briefCard.item2') },
            { title: $t('work.briefCard.item3'), content: $t('project1.briefCard.item3') },
            { title: $t('work.briefCard.item4'), content: $t('project1.briefCard.item4') }
          ]"
          />
          <Section3
            id="section3"
            :title="$t('work.title.item3')"
          >
            <template #content>
              <div>
                <p class="mb-6 font-normal">
                  {{ $t('project1.briefCard.item1') }}
                </p>
                <CardTilt>
                  <img 
                  src="https://images.unsplash.com/photo-1723904186120-aa63a2f7e63e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  class="object-cover w-full xl:rounded-3xl aspect-video rounded-2xl "
                >
                </CardTilt>
              </div>
            </template>
          </Section3>
          <Section3
            id="section4"
            :title="$t('work.title.item4')"
          >
            <template #content>
              <div class="grid grid-cols-1 overflow-hidden divide-y drop-shadow rounded-2xl xl:rounded-3xl dark:border dark:border-white dark:divide-white divide-B2">
                <!-- Color -->
                <Accordion
                :title="$t('work.designSystem.item1')"
                >
                  <CardTilt>
                    <img 
                    src="https://images.unsplash.com/photo-1723904186120-aa63a2f7e63e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    class="object-cover w-full xl:rounded-3xl aspect-video rounded-2xl "
                  >
                  </CardTilt>
                </Accordion>
                <!-- Typography -->
                <Accordion
                :title="$t('work.designSystem.item2')"
                >
                  <CardTilt>
                    <img 
                    src="https://images.unsplash.com/photo-1723904186120-aa63a2f7e63e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    class="object-cover w-full xl:rounded-3xl aspect-video rounded-2xl "
                  >
                  </CardTilt>
                </Accordion>
              </div>
            </template>  
          </Section3>
          <hr class="border-stone-300 dark:border-white/20">
          <SectionNext 
          :title="$t('project2.core.title')"
          :linkTo="'/'"
          :icon="icon" 
          :showIcon="false"
          :text="$t('work.core.item5')" 
          />
        </div>
        <Footer />
      </div>
    </div>
  </template>
  
  <script>
  import MingcuteEarth3Fill from '~icons/mingcute/earth-3-fill';
  
  export default {
  components: {
    MingcuteEarth3Fill,
  },
  data() {
    return {
      icon: MingcuteEarth3Fill, 
      sections: [
        { id: 'section1', name: 'work.title.item1' },
        { id: 'section2', name: 'work.title.item2' },
        { id: 'section3', name: 'work.title.item3' },
        { id: 'section4', name: 'work.title.item4' },
      ],
    };
  },
  
}

  </script>
  