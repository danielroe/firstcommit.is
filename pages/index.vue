<template>
  <div class="flex-grow flex flex-col mx-auto justify-center p-2 ">
    <main class="p-8 m-2 max-w-[500px] w-full mx-auto flex-col flex items-center gap-4">
      <NuxtLink
        class="rounded bg-black text-white shadow px-3 py-2 flex flex-row gap-2 items-center"
        href="/connect/github"
        external
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"
          />
        </svg>
        Find your first commit
      </NuxtLink>
      <span class="text-sm flex flex-row gap-2 items-center before:border-t-2 before:border-gray-400 before:content-[''] before:w-2 before:h-0 before:inline-block after:border-t-2 after:border-gray-400 after:content-[''] after:w-2 after:h-0 after:inline-block">
        or enter username
      </span>
      <form
        class="flex flex-row gap-2 mx-auto border-black border-2 rounded-md shadow-sm leading-none w-full overflow-hidden"
        @submit.prevent="openCommit"
      >
        <input
          v-model="username"
          type="text"
          class="flex-grow pl-2 py-2 lowercase"
          placeholder="danielroe"
          autocapitalize="off"
        >
        <button
          :disabled="!username.trim()"
          type="submit"
          class="my-2 mr-2 flex-shrink-0 rounded border-transparent border-2 bg-black text-white 
          hover:bg-white hover:text-black hover:border-black shadow transition-colors p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M5 14V5h2v7h10.172l-3.95-3.95l1.414-1.414L21 13l-6.364 6.364l-1.414-1.414l3.95-3.95H5Z"
          /></svg>
          <span class="sr-only">Find first commit</span>
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
defineOgImage({
  title: 'firstcommit.is',
  component: 'home'
})

useSeoMeta({
  title: 'firstcommit.is',
})

useServerSeoMeta({
  ogTitle: 'firstcommit.is',
  twitterTitle: 'firstcommit.is',
  description: 'Find your first open-source commit on on GitHub.',
  ogDescription: 'Find your first open-source commit on on GitHub.',
  twitterCard: 'summary_large_image',
})

const username = ref('')
function openCommit () {
  return navigateTo(`/${username.value.toLowerCase()}`)
}
</script>
