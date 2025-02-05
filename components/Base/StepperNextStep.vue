<template>
  <div v-if="steps.find((step) => step.value === currentStep + 1)" class="flex items-center">
    <div class="w-full border-b border-t2 border-dashed" />
    <div
      v-text="$t('Next step ') + steps.find((step) => step.value === currentStep + 1)?.text"
      class="ps-2 text-xs text-t2 font-medium whitespace-nowrap"
    />
  </div>
</template>

<script setup>
defineProps({
  steps: Array,
  currentStep: {
    type: Number,
    default: 0,
  },
  isDisable: Boolean,
});
</script>
