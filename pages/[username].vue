<template>
  <div class="min-h-screen grid place-content-center">
    <main v-if="event" class="p-8 m-2 shadow-md max-w-[500px] w-full mx-auto border-[1px] border-gray-600 rounded-md">
      <header class="flex flex-row items-center gap-4">
        <img class="rounded-full h-16 w-16" :src="event.actor.avatar_url" :alt="`Avatar for ${event.actor.display_login}`">
        <div class="flex flex-col items-start gap-2">
          <span class="leading-none text-lg font-cal font-semibold">{{ event.payload.commits[0].author.name }}</span>
          <span class="leading-none opacity-50 text-sm">{{ event.actor.display_login }}</span>
        </div>
      </header>
      <hr class="my-4">
      <ul class="flex flex-col gap-1 py-2">
        <li v-for="commit in event.payload.commits || []" class="flex flex-row justify-between items-start gap-4">
          <span class="font-sans leading-none whitespace-pre-wrap">{{ commit.message }}</span>
          <NuxtLink :href="commit.url" class="rounded bg-black text-white shadow px-3 py-2">
            See it on GitHub
          </NuxtLink>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import 'cal-sans'
const route = useRoute('username')
const username = route.params.username

const { data: event } = await useFetch(`/api/${username}`)

// TODO: show OG image with commit/PR metadata
</script>
