<template>
  <div class="min-h-screen flex flex-col justify-center">
    <main v-if="commit" class="p-8 m-2 shadow-md max-w-[500px] w-full mx-auto border-[1px] border-gray-600 rounded-md">
      <header class="relative flex flex-row items-center gap-4">
        <NuxtTime class="absolute font-cal tabular-nums right-0 top-0" :datetime="commit.commit.author.date" year="numeric" />
        <img class="rounded-full h-16 w-16" :src="commit.author.avatar_url" :alt="`Avatar for ${commit.author.login}`">
        <div class="flex flex-col items-start gap-2">
          <span class="leading-none text-lg font-cal font-semibold">{{ commit.commit.author.name }}</span>
          <span class="leading-none opacity-50 text-sm">@{{ commit.author.login }}</span>
        </div>
      </header>
      <hr class="my-4">
      <div class="flex flex-row items-center justify-between gap-4">
        <div class="flex flex-col gap-2 line-clamp-1">
          <span class="line-clamp-1">{{ commit.commit.message }}</span>
          <span class="text-xs">
            <span class="flex flex-row gap-2">
              <img class="rounded-full h-4 w-4" :src="commit.repository.owner.avatar_url" :alt="`Avatar for ${commit.repository.owner.login}`">
              {{ commit.repository.full_name }}
            </span>
          </span>
        </div>
        <NuxtLink :href="commit.html_url" class="flex-shrink-0 rounded bg-black text-white text-sm shadow px-3 py-2 flex flex-row gap-2 items-center">
          See full commit
        </NuxtLink>
      </div>
      <!-- <hr class="my-4"> -->
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
