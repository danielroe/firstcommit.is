<script setup lang="ts">

defineProps<{
  placeholder?: string
  density?: 'compact' | 'default'
}>()

defineEmits(['submit'])

const usernameModel = defineModel<string>()
</script>

<template>
  <form
    class="grid grid-cols-[1fr_auto] gap-2 mx-auto border-black border-2 rounded-md shadow-sm leading-none w-full overflow-hidden"
    @submit.prevent="$emit('submit')"
  >
    <input
      v-model="usernameModel"
      type="text"
      class="overflow-hidden pl-2 py-2 lowercase"
      :placeholder="placeholder"
      autocapitalize="off"
    >
    <button
      :disabled="!usernameModel?.trim()"
      type="submit"
      :class="density === 'compact' ? 'my-1 mr-1' : 'my-2 mr-2'"
      class="flex-shrink-0 rounded border-transparent border-2 bg-black text-white
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
</template>
