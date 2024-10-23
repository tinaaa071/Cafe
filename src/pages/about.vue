<template>
  <div class="h-screen bg-B4 text-stone-900 dark:text-white">
    <Layout>
      <template #content>
        <div class="flex flex-col gap-8 items-center lg:flex-row sm:gap-12">
          <!-- Banner -->
          <div class="w-full lg:w-1/2">
            <ChatBubble class="mb-4 w-52" />
            <!-- 圖片 -->
            <div class="bg-cover bg-center border-2 border-stone-900 dark:border-white overflow-hidden mb-4 aspect-[3/2] bg-[url('https://i.pinimg.com/control/564x/b5/b4/f9/b5b4f9cad18a8a787c3dd9bd39fc2f5e.jpg')]">
            </div>
          </div>
          <!-- Title -->
          <div class="w-full lg:w-1/2">
            <h1 class="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
              Hey，很高興認識你！
            </h1>
            <p class="text-sm font-medium sm:text-base text-stone-800 dark:text-stone-300">
              也善於將抽象的概念轉換成具體可行的設計成果。我也習慣以使用者為中心去思考問題，並且致力於帶給產品使用者更多的價值。 
            </p>
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
export default {
};
</script>