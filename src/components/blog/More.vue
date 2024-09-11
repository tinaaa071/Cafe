<template>
    <div class="flex flex-col gap-6 px-6 py-8 xs:px-16 md:px-32 lg:px-56 xl:px-80 xl:py-16 bg-B3 md:py-10 dark:bg-stone-800 dark:border-t dark:border-white/20" 
    v-if="showMore"
    >
      <div class="grid grid-cols-1 gap-8 xs:grid-cols-2 lg:grid-cols-4 xs:gap-x-4 xs:gap-y-8">
        <PostCard 
          v-for="post in sortedAndLimitedPosts" 
          :key="post.id" 
          :post="post" 
          :linkTo="post.link"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      posts: {
        type: Array,
        required: true
      },
      showMore: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      sortedAndLimitedPosts() {
        // Assuming 'date' is the property that determines the post's recency
        return this.posts
          .slice()  // Create a shallow copy of the array to avoid mutating the original array
          .sort((a, b) => new Date(b.date) - new Date(a.date))  // Sort posts by date, newest first
          .slice(0, 8);  // Limit to the top 8 posts
      }
    }
  };
  </script>
  