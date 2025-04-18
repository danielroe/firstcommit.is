<script setup lang="ts">
useServerSeoMeta({
  ogSiteName: 'firstcommit.is',
  twitterSite: '@danielcroe',
})
useServerHead({
  htmlAttrs: {
    lang: 'en',
  }
})
</script>

<template>
  <div class="min-h-[100svh] flex flex-col justify-stretch">
    <NuxtPage />
    <footer class="mt-auto p-2 text-center text-sm opacity-75 hover:opacity-100">
      <a
        class="hover:underline"
        href="https://github.com/danielroe/firstcommit.is"
      >
        source
      </a>
      &middot;
      made with ❤️ by <a
        class="font-semibold hover:underline"
        href="https://bsky.app/profile/danielroe.dev"
      >
        @danielroe.dev
      </a>
      &middot;
      inspiration <a
        class="font-semibold hover:underline"
        href="https://x.com/aleksandrasays"
      >
        @aleksandrasays
      </a>
    </footer>
  </div>
</template>
