<template>
  <input
    type="range"
    :class="isDisabled ? 'slider-thumb-disabled' : 'slider-thumb'"
    class="slider-track"
    :style="`background: linear-gradient(to right, ${
      isDisabled ? '#C6D9DE' : '#000000'
    } 0%, ${
      isDisabled ? '#C6D9DE' : '#000000'
    } ${percentage}%, #e1eef5 ${percentage}%, #e1eef5 100%);`"
    :disabled="isDisabled"
    v-model="currentValue"
    :min="min"
    :max="max"
    :step="step"
  />
</template>

<script setup>

  const props = defineProps({
    min: {
      type: Number,
      default: 100,
    },
    max: {
      type: Number,
      default: 400,
    },
    value: {
      type: Number,
      default: 200,
    },
    step: {
      type: Number || null,
    },
    isDisabled: {
      type: Boolean,
    },
  })

  const currentValue = ref(props.value);
    const percentage = computed(() => {
      return ((currentValue.value - props.min) * 100) / (props.max - props.min);
    });
</script>

<style scoped>

.slider-thumb {
  @apply mx-4 my-6 h-4 w-full appearance-none rounded-full outline-none 
}

.slider-thumb::-webkit-slider-thumb {
  @apply appearance-none w-7 h-7 rounded-full cursor-col-resize bg-p4 ring-4 ring-p5 active:outline outline-offset-4 active:outline-4 active:outline-p3;
}

.slider-thumb-disabled {
  @apply mx-4 my-6 h-4 w-full appearance-none rounded-full outline-none 
}

.slider-thumb-disabled::-webkit-slider-thumb {
  @apply appearance-none w-7 h-7 rounded-full bg-p2 ring-4 ring-p4 cursor-not-allowed;
}
</style>