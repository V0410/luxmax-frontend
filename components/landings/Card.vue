<template>
  <div style="box-shadow: 2px 4px 8px 0px #0000000A;" class="flex flex-col gap-4 items-center p-4 laptop:p-6 border border-p1 rounded-3xl laptop:rounded-[40px]">
    <div class="flex justify-center items-center p-2.5 rounded-full bg-p1 w-14 h-14 laptop:w-16 laptop:h-16">
      <IconViewer :name="src" class="w-full h-auto"/>
      <div v-show="number" v-text="number" class="font-semibold text-2xl text-p10"/>
    </div>
    <div v-text="title" class="font-semibold laptop:text-xl text-p8 text-center"/>
    <div v-text="description" class="text-t9 text-center text-xs laptop:text-base" />
  </div>
</template>

<script setup>
  const props = defineProps({
    src: String,
    number: Number,
    title: String,
    description: String,
  })
</script>