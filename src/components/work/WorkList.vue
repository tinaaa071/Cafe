<template>
    <div class="grid grid-cols-1 gap-8 mb-8 lg:mb-16 xs:grid-cols-3 lg:grid-cols-4 xs:gap-x-6 xs:gap-y-10 lg:gap-x-10 lg:gap-y-16">
      <PostCard 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
      :showTag="false"
      :showDate="false"
      :linkTo="post.link"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: "PostList",
    props: {
      posts: {
        type: Array,
        default: () => [], // Set a default value to avoid undefined errors
      },
    },
  };
  </script>
  