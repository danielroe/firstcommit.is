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
          :src="commit.avatar"
          :alt="`Avatar for ${commit.username}`"
        >
        <NuxtLink
          class="flex flex-col items-start gap-2"
          :to="commit?.authorUrl"
        >
          <div
            v-if="!commit"
            class="leading-none text-lg font-cal font-semibold h-5 w-32 animate-pulse bg-gray-400"
          />
          <span
            v-else
            class="leading-none text-lg font-cal font-semibold"
          >
            {{ commit.author }}
          </span>
          <div
            v-if="!commit"
            class="leading-none opacity-50 text-sm h-4 w-24 animate-pulse bg-gray-400"
          />
          <span
            v-else
            class="leading-none opacity-50 text-sm"
          >
            @{{ commit.username }}
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
                :src="commit.org.avatar"
                :alt="`Avatar for ${commit.org.name}`"
              >
              <div
                v-if="!commit"
                class="h-4 w-48 animate-pulse bg-gray-200"
              />
              <span
                v-else
                v-text="commit.org.repository"
              />
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
    <nav class="flex flex-row gap-2 justify-center max-w-[500px] w-full mx-auto">
      <NuxtLink
        class="rounded flex-shrink-0 bg-black text-white text-sm shadow px-3 py-2 flex flex-row gap-2 items-center"
        href="/connect/github"
        external
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"
          />
        </svg>
        Find yours
      </NuxtLink>
      <UserNameForm
        v-model="newUsername"
        :placeholder="username"
        density="compact"
        @submit="openCommit"
      />
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

const newUsername = ref('')
function openCommit () {
  return navigateTo(`/${newUsername.value.toLowerCase()}`)
}

const { data: commit, error } = await useFetch(`/api/commit/${username}`, {
  lazy: true
})

useSeoMeta({
  title: 'firstcommit.is - @' + username,
})

useServerSeoMeta({
  ogTitle: 'firstcommit.is - @' + username,
  twitterTitle: 'firstcommit.is - @' + username,
  description: 'The first commit of ' + username + ' on GitHub',
  ogDescription: 'The first commit of ' + username + ' on GitHub',
  twitterCard: 'summary_large_image',
})

defineOgImageComponent('UserCard', {
  title: username,
  commit,
})

const user = useCookie('github-user')
const message = computed(() => {
  if (user.value === username) {
    return `Check out my first commit on GitHub!`
  }

  return `Check out ${username}'s first commit on GitHub.`
})

const errorMessage = computed(()=>{
  if (error) {
    return error.value?.data.message || ''
  }
  return null
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
