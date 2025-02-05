<template>
  <div class="flex flex-col gap-4 border-b border-t1 pb-4 cursor-pointer select-none" @click="$emit('update:modelValue', !modelValue)">
    <div class="text-black flex justify-between items-center">
      <div class="text-lg laptop:text-xl" v-text="question.title" />
      <div>
        <IconViewer name="IconArrowDown" :class="modelValue ? 'rotate-180' : ''" />
      </div>
    </div>
    <div v-show="modelValue" v-text="question.desc" class="" />
  </div>
</template>

<script setup>
defineEmits('update:modelValue')
defineProps({
    question: String,
    modelValue: Boolean
})
</script>