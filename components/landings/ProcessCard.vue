<template>
    <div style="box-shadow: 2px 4px 8px 0px #0000000A;" class="flex flex-col gap-4 items-center p-4 laptop:p-6 border border-p4 rounded-xl laptop:rounded-xl">
        <div class="flex justify-center items-center p-4 rounded-full bg-p7 w-24 h-24 laptop:w-24 laptop:h-24">
            <div v-html="svg"></div>
        </div>
        <div class="font-semibold laptop:text-xl text-p8 text-center">
            {{ title }}
        </div>
        <div class="text-t7 text-center text-xs leading-0">
            {{ line1 }}
        </div>
        <div class="text-t7 text-center text-xs leading-0">
            {{ line2 }}
        </div>
        <div class="flex justify-center items-center p-1 rounded-full bg-p1 w-10 h-10">
            <div class="font-semibold text-md text-p8">{{ number }}</div>
        </div>
    </div>
  </template>
  
  <script setup>
    const props = defineProps({
      number: Number,
      title: String,
      line1: String,
      line2: String,
      svg: String
    })
  </script>