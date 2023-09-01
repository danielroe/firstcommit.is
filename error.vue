<script setup lang="ts">
import type { NuxtError } from '#app'

useServerSeoMeta({
  ogSiteName: 'firstcommit.is',
  twitterSite: '@danielcroe',
})
useServerHead({
  htmlAttrs: {
    lang: 'en',
  }
})
defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="min-h-[100svh] flex flex-col justify-stretch">
    <div class="flex-grow flex flex-col mx-auto justify-center p-2 ">
      <main class="p-8 m-2 max-w-[500px] w-full mx-auto flex-col flex items-center gap-4">
        <div>
          {{ error?.statusCode === 404 ? "Sorry, we couldn't find that commit." : error?.message ?? 'Unknown error' }}
        </div>
        <hr class="border-t-2 border-gray-400 w-2 h-0 mb-1 inline-block">
        <NuxtLink
          class="rounded bg-black text-white shadow px-3 py-2 flex flex-row gap-2 items-center"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 0 0 0-12H8Z"
          /></svg>
          Go back
        </NuxtLink>
      </main>
    </div>
    <footer class="mt-auto p-2 text-center text-sm opacity-75 hover:opacity-100">
      made with ❤️ by <a
        class="font-semibold hover:underline"
        href="https://x.com/danielcroe"
      >
        @danielcroe
      </a>
      &middot;
      <a
        class="hover:underline"
        href="https://github.com/danielroe/firstcommit.is"
      >
        edit on GitHub
      </a>
    </footer>
  </div>
</template>
