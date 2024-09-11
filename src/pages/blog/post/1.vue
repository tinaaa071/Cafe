<template>
  <div class="text-sm font-light bg-white cursor-default sm:pb-10 dark:bg-stone-900 text-stone-900 dark:text-white xs:text-base">
    <Layout :showProgress="true">
      <template #content>
        <div class="flex flex-col gap-6 mb-2">
          <Brief
          :post="{
          banner: 'https://media.istockphoto.com/id/692835304/photo/spiekeroog-in-germany.webp?a=1&s=612x612&w=0&k=20&c=RFKphgYjiUW9T-ewpx2b0VL2gqRvFZ8bTHJwr2Gl5u0=',
          credit: $t('project1.core.title'),
          category: $t('blog.item1'),
          date: '2024-09-10',
          title: $t('project1.core.title'),
          desc: $t('project1.core.title'),
          menu: [
            { menu: 'Introduction to Vue' },
            { menu: 'Vue Directives' },
            { menu: 'State Management' }
          ]
        }"
        :showCredit="true"
        :showMenu="true"
        >
        <template #brief>
          <p>
            This is a brief description that can be customized.
            This is a brief description that can be customized.
            This is a brief description that can be customized.
          </p>
        </template>
        </Brief>
        <Content>
          <H1 
          :title="$t('project1.core.title')"
          />
          <p>123</p>
          <Callout>
            <p>123</p>
          </Callout>
        </Content>
        </div>
      </template>
    </Layout>
  </div>
  <!-- More Like -->
  <More 
  :showMore="true"
  :posts="posts" 
  />
  <Footer />
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          link: '/',
          title: "Post 1",
          category: this.$t('blog.item1'),
          image: "https://images.unsplash.com/photo-1628768534904-cf74bc8b897d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: "2024．09．02",
        },
        {
          id: 2,
          link: '/about',
          title: "Post 2",
          category: this.$t('blog.item2'),
          image: "https://images.unsplash.com/photo-1628768534895-ff9185e7edbc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          link: '/post/1',
          title: "Post 2",
          category: this.$t('blog.item3'),
          image: "https://images.unsplash.com/photo-1628766416710-61d6f15f32b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          link: '/post/1',
          title: "Post 2",
          category: this.$t('blog.item4'),
          image: "https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          date: new Date().toLocaleDateString(),
        }
      ],
    };
  },
  computed: {
    filteredPosts() {
      // Optional: Apply any additional filtering here if needed
      return this.posts;
    }
  },
  created() {
    // Fetch or set posts data here if needed
  }
};
</script>