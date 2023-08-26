<template>
  <div class="flex-grow flex flex-col justify-center p-2">
    <main
      v-if="commit"
      class="p-4 md:p-8 shadow-md max-w-[500px] w-full mx-auto border-[1px] border-gray-600 rounded-md"
    >
      <header class="relative flex flex-row items-center gap-4">
        <NuxtTime
          class="absolute font-cal tabular-nums right-0 top-0"
          :datetime="commit.commit.author.date"
          year="numeric"
        />
        <img
          class="rounded-full h-16 w-16"
          :src="commit.author.avatar_url"
          :alt="`Avatar for ${commit.author.login}`"
        >
        <div class="flex flex-col items-start gap-2">
          <span class="leading-none text-lg font-cal font-semibold">{{ commit.commit.author.name }}</span>
          <span class="leading-none opacity-50 text-sm">@{{ commit.author.login }}</span>
        </div>
      </header>
      <hr class="my-4">
      <div class="flex flex-row items-center justify-between gap-4">
        <NuxtLink
          class="flex flex-col gap-2 line-clamp-1" 
          :href="commit.html_url"
        >
          <span class="line-clamp-1">{{ commit.commit.message }}</span>
          <span class="text-xs">
            <span class="flex flex-row gap-2">
              <img
                class="rounded-full h-4 w-4"
                :src="commit.repository.owner.avatar_url"
                :alt="`Avatar for ${commit.repository.owner.login}`"
              >
              {{ commit.repository.full_name }}
            </span>
          </span>
        </NuxtLink>
        <div class="flex flex-row gap-2">
          <!-- share to twitter url -->
          <NuxtLink
            class="flex-shrink-0 rounded border-transparent border-2 bg-black text-white hover:border-black hover:bg-white hover:text-black text-sm shadow px-2 py-1 md:px-3 md:py-2 flex flex-row gap-2 items-center transition-colors"
            :href="shareLink"
            @click.prevent="nativeShare"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="m13.12 17.023l-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .958 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.2 2.29a4 4 0 1 1-.959 1.755ZM6 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm11-6a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
            /></svg>
            Share
          </NuxtLink>
        </div>
      </div>
    </main>
    <nav class="flex flex-row justify-center">
      <NuxtLink
        class="p-4 text-sm"
        href="/"
      >
        &laquo; go back
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import 'cal-sans'

definePageMeta({
  alias: ['/commit/:username'],
  middleware: to => {
    if (to.path !== to.path.toLowerCase()) {
      return to.path.toLowerCase()
    }
  }
})


const route = useRoute('username')
const username = route.params.username

const { data: commit } = await useFetch(`/api/${username}`)

useServerSeoMeta({
  title: 'firstcommit.is - @' + username,
  description: 'The first commit of ' + username + ' on GitHub',
  // TODO: show OG image with commit/PR metadata
  ogImage: commit.value?.author.avatar_url,
})

const user = useCookie('github-user')
const message = computed(() => {
  if (user.value === username) {
    return `Check out my first commit on GitHub!`
  }
  
  return `Check out ${username}'s first commit on GitHub.`

})
const shareLink = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(message.value + `\n\nhttps://firstcommit.is/${username}`)}`)

async function nativeShare() {
  try {
    if (navigator.share) {
      return await navigator.share({
        title: 'firstcommit.is',
        text: message.value,
        url: `https://firstcommit.is/${username}`,
      })
    }
  } catch {
    // ignore errors sharing to native share and fall back directly to Twitter
  }
  return navigateTo(shareLink.value, { external: true, open: { target: '_blank' } })
}
</script>
