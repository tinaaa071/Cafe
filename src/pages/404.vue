<template>
  <div class="h-screen bg-B4 text-stone-900 dark:text-white">
    <Layout>
      <template #content>
        <div class="flex flex-col gap-8 items-center lg:flex-row sm:gap-12">
          <!-- Banner -->
          <div class="w-full lg:w-1/2">
            <div class="bg-cover bg-center border-2 border-stone-900 dark:border-white overflow-hidden mb-4 aspect-[3/2] bg-[url('https://i.pinimg.com/control/564x/b5/b4/f9/b5b4f9cad18a8a787c3dd9bd39fc2f5e.jpg')]">
            </div>
          </div>
          <!-- Title -->
          <div class="w-full text-center lg:w-1/2">
            <h1 class="mb-5 text-3xl font-bold sm:mb-8 sm:text-4xl">
              404
            </h1>
            <h2 class="mb-2 text-xl font-semibold sm:text-2xl">
              Oops! Page Not Found
            </h2>
            <p class="mb-5 text-sm font-medium sm:text-base text-stone-800 sm:mb-8 dark:text-stone-400">
              The page you are looking for does not exist or an error occurred.
            </p>
            <RouterLink to="/" class="inline-block px-6 py-3 text-white transition duration-300 ease-in-out bg-stone-900 hover:bg-stone-500 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-500 dark:hover:text-white">
              回到首頁
            </RouterLink>
          </div>
      </div>
      </template>
    </Layout>
  </div>
</template>

  