<template>
  <div class="flex-grow flex flex-col justify-center p-2 gap-6">
    <main
      v-if="errorMessage"
      class="p-4 md:p-8 shadow-md max-w-[500px] w-full mx-auto border-[1px] border-red-400 rounded-md"
    >
      <p class="text-red-600 text-sm">
        Oops! {{ errorMessage.toLowerCase() }}
      </p>
      <p class="text-red-500 text-sm">
        <small>Do you wish to try again?</small>
      </p>
    </main>
    <main
      v-else
      class="p-4 md:p-8 shadow-md max-w-[500px] w-full mx-auto border-[1px] border-gray-600 rounded-md transition-[padding] ease-out"
    >
      <header class="relative flex flex-row items-center gap-4">
        <div
          v-if="!commit"
          class="absolute font-cal tabular-nums right-0 top-0 h-6 w-16 animate-pulse bg-gray-400"
        />
        <NuxtTime
          v-else
          class="absolute font-cal tabular-nums right-0 top-0"
          :datetime="commit.date"
          year="numeric"
        />
        <div
          v-if="!commit"
          class="rounded-full h-16 w-16 animate-pulse bg-gray-400"
        />
        <img
          v-else
          class="rounded-full h-16 w-16"
          :src="commit.repo.avatar"
          :alt="`Avatar for ${commit.repo.owner}`"
        >
        <NuxtLink
          class="flex flex-col items-start gap-2"
          :to="commit?.repo.url"
        >
          <div
            v-if="!commit"
            class="leading-none text-lg font-cal font-semibold h-5 w-32 animate-pulse bg-gray-400"
          />
          <span
            v-else
            class="leading-none text-lg font-cal font-semibold"
          >
            {{ commit.repo.fullName }}
          </span>
          <div
            v-if="!commit"
            class="leading-none opacity-50 text-sm h-4 w-48 animate-pulse bg-gray-400"
          />
          <span
            v-else
            class="leading-none opacity-50 text-sm line-clamp-1"
          >
            {{ commit.repo.description }}
          </span>
        </NuxtLink>
      </header>
      <hr class="my-4">
      <div class="flex items-center justify-between gap-4">
        <NuxtLink
          class="flex flex-col gap-2 line-clamp-1"
          :href="commit?.link"
        >
          <div
            v-if="!commit"
            class="h-5 w-64 animate-pulse bg-gray-300"
          />
          <span
            v-else
            class="line-clamp-1"
          >
            {{ commit.message }}
          </span>
          <span class="text-xs">
            <span class="flex flex-row gap-2 items-center">
              <div
                v-if="!commit"
                class="rounded-full h-4 w-4 animate-pulse bg-gray-200"
              />
              <img
                v-else
                class="rounded-full h-4 w-4"
                :src="commit.authorAvatar"
                :alt="`Avatar for ${commit.authorLogin}`"
              >
              <div
                v-if="!commit"
                class="h-4 w-48 animate-pulse bg-gray-200"
              />
              <span
                v-else
                v-text="commit.author"
              />
            </span>
          </span>
        </NuxtLink>
        <div class="flex flex-row gap-2">
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
    <nav class="flex flex-row gap-2 justify-center max-w-[500px] w-full mx-auto">
      <NuxtLink
        class="rounded flex-shrink-0 bg-black text-white text-sm shadow px-3 py-2 flex flex-row gap-2 items-center"
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 14V5h2v7h10.172l-3.95-3.95l1.414-1.414L21 13l-6.364 6.364l-1.414-1.414l3.95-3.95H5Z"
          />
        </svg>
        Try another
      </NuxtLink>
      <UserNameForm
        v-model="newInput"
        :placeholder="`${owner}/${repo}`"
        density="compact"
        @submit="openCommit"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import 'cal-sans'

definePageMeta({
  middleware: to => {
    if (to.path !== to.path.toLowerCase()) {
      return to.path.toLowerCase()
    }
  }
})

const route = useRoute('owner-repo')
const owner = route.params.owner
const repo = route.params.repo
const fullName = `${owner}/${repo}`

const newInput = ref('')
function openCommit() {
  const val = newInput.value.toLowerCase()
  return navigateTo(val.includes('/') ? `/${val}` : `/${val}`)
}

const { data: commit, error } = await useFetch(`/api/commit/${owner}/${repo}`, { lazy: true })

useSeoMeta({ title: `firstcommit.is - ${fullName}` })

useServerSeoMeta({
  ogTitle: `firstcommit.is - ${fullName}`,
  twitterTitle: `firstcommit.is - ${fullName}`,
  description: `The first commit of ${fullName} on GitHub`,
  ogDescription: `The first commit of ${fullName} on GitHub`,
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('RepoCard', { title: fullName, commit })

const message = computed(() => `Check out the first commit of ${fullName}!`)

const errorMessage = computed(() => {
  if (error) {
    return error.value?.data.message || ''
  }
  return null
})

const shareLink = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(message.value + `\n\nhttps://firstcommit.is/${fullName}`)}`)

async function nativeShare() {
  try {
    if (navigator.share) {
      return await navigator.share({
        title: 'firstcommit.is',
        text: message.value,
        url: `https://firstcommit.is/${fullName}`,
      })
    }
  } catch {
    // fall back to Twitter
  }
  return navigateTo(shareLink.value, { external: true, open: { target: '_blank' } })
}
</script>
