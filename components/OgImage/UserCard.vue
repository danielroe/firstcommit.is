<script setup lang="ts">
import type { InternalApi } from 'nitropack'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  commit: {
    type: Object as () => InternalApi['/api/commit/:username']['get'],
    required: true
  }
})
</script>

<template>
  <div class="font-sans w-full h-full flex flex-col justify-center text-black bg-white items-center px-16 py-24">
    <header class="relative flex flex-row items-center gap-8 w-full">
      <NuxtTime
        class="absolute font-cal text-5xl font-semibold tabular-nums right-8 top-8"
        :datetime="commit.date"
        year="numeric"
      />
      <img
        class="rounded-full h-48 w-48"
        :src="commit.avatar"
        :alt="`Avatar for ${commit.username}`"
      >
      <div class="flex flex-col items-start gap-4">
        <span class="leading-none text-5xl font-cal font-semibold">{{ commit.author }}</span>
        <span class="leading-none text-4xl opacity-50">@{{ commit.username }}</span>
      </div>
    </header>
    <hr class="my-16 w-full">
    <div class="flex flex-row w-full items-center justify-between gap-4">
      <div
        class="flex flex-col gap-8 line-clamp-1 max-w-[800px]" 
      >
        <span class="text-4xl line-clamp-1">{{ commit.message }}</span>
        <span class="text-3xl">
          <span class="flex flex-row gap-4 items-center">
            <img
              class="rounded-full h-12 w-12"
              :src="commit.org.avatar"
            >
            {{ commit.org.repository }}
          </span>
        </span>
      </div>
      <div class="flex flex-row gap-2">
        <div
          class="text-4xl flex-shrink-0 rounded-lg border-transparent border-2 bg-black text-white hover:border-black hover:bg-white hover:text-black shadow px-6 py-5 flex flex-row gap-4 items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M5 14V5h2v7h10.172l-3.95-3.95l1.414-1.414L21 13l-6.364 6.364l-1.414-1.414l3.95-3.95H5Z"
          /></svg>
          See more
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-cal {
  font-family: 'Cal Sans';
  font-weight: 800;
}
.font-sans {
  font-family: 'Inter';
  font-weight: 400;
}
</style>
