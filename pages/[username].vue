<template>
  <div class="min-h-screen flex flex-col justify-center">
    <main v-if="commit" class="p-8 m-2 shadow-md max-w-[500px] w-full mx-auto border-[1px] border-gray-600 rounded-md">
      <header class="flex flex-row items-center gap-4">
        <img class="rounded-full h-16 w-16" :src="commit.author.avatar_url" :alt="`Avatar for ${commit.author.login}`">
        <div class="flex flex-col items-start gap-2">
          <span class="leading-none text-lg font-cal font-semibold">{{ commit.commit.author.name }}</span>
          <span class="leading-none opacity-50 text-sm">@{{ commit.author.login }}</span>
        </div>
      </header>
      <hr class="my-4">
      <div class="flex flex-row justify-between items-center gap-4">
        <span class="font-sans leading-none whitespace-pre-wrap">{{ commit.commit.message }}</span>
        <NuxtLink :href="commit.html_url" class="rounded bg-black text-white text-sm shadow px-3 py-2">
          See it on GitHub
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import 'cal-sans'
const route = useRoute('username')
const username = route.params.username

const { data: commit } = await useFetch(`/api/${username}`)

// TODO: show OG image with commit/PR metadata
</script>
