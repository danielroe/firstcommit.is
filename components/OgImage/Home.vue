<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps({
  title: String
})
</script>

<template>
  <div class="font-sans w-full h-full flex flex-col justify-end text-black bg-white items-center px-16 py-24">
    <div
      class="flex flex-row w-full items-center justify-between"
      style="gap: 1rem;"
    >
      <div
        class="flex flex-col overflow-hidden max-w-[800px]"
        style="gap: 2rem" 
      >
        <span class="text-5xl overflow-hidden font-bold">firstcommit.is</span>
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
          Check yours out
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-heading {
  font-family: 'Inter';
  font-weight: 700;
}
.font-sans {
  font-family: 'Inter';
  font-weight: 400;
}
</style>
