<template>
  <div class="p-2 flex justify-between cursor-pointer">
    <div v-text="text" />
    <IconArrowDown class="rotate-[270deg] h-4 w-4" />
  </div>
</template>

<script setup>
    defineProps({
        text: String
    })
</script>
