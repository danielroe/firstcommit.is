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
    <header
      class="relative flex flex-row items-center w-full"
      style="gap: 2rem"
    >
      <NuxtTime
        style="font-family: Cal Sans;"
        class=" absolute text-5xl font-semibold right-8 top-8"
        :datetime="commit.date"
        year="numeric"
      />
      <img
        class="rounded-full h-48 w-48"
        :src="commit.avatar"
        :alt="`Avatar for ${commit.username}`"
      >
      <div
        class="flex flex-col items-start"
        style="gap: 1rem;"
      >
        <span
          style="font-family: Cal Sans;"
          class=" leading-none text-5xl font-semibold"
        >{{ commit.author }}</span>
        <span class="leading-none text-4xl opacity-50">@{{ commit.username }}</span>
      </div>
    </header>
    <hr class="my-16 w-full">
    <div
      class="flex flex-row w-full items-center justify-between"
      style="gap: 1rem;"
    >
      <div
        class="flex flex-col overflow-hidden max-w-[800px]"
        style="gap: 2rem" 
      >
        <span class="text-4xl overflow-hidden">{{ commit.message }}</span>
        <span class="text-3xl">
          <span
            class="flex flex-row items-center"
            style="gap: 1rem;"
          >
            <img
              class="rounded-full h-12 w-12"
              :src="commit.org.avatar"
            >
            {{ commit.org.repository }}
          </span>
        </span>
      </div>
      <div
        class="flex flex-row"
        style="gap: 0.5rem;"
      >
        <div
          class="text-4xl flex-shrink-0 rounded-lg border-transparent border-2 bg-black text-white shadow px-6 py-5 flex flex-row items-center"
          style="gap: 1rem;"
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
.font-sans {
  font-family: 'Inter';
  font-weight: 400;
}
</style>
