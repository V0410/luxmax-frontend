<template>
  <div
    @click.stop="$emit('click')"
    :disabled="isDisabled"
    class="flex flex-row items-center justify-between whitespace-nowrap max-w-full rounded-lg"
    :class="[
      size === 'l'
        ? 'text-sm px-4 h-8'
        : size === 's'
        ? 'text-xs px-3 h-7'
        : '',
      isDisabled
        ? 'cursor-not-allowed text-t3 fill-t3 border border-t3 '
        : isSelected
        ? ' cursor-default border border-p9 bg-p2'
        : 'cursor-pointer text-t7 fill-t7 border border-t7 hover:border-p8 hover:bg-p2 hover:text-p8 hover:fill-p8 active:border-p9 active:bg-p3',
    ]"
  >
    <div v-if="startIcon" class="me-1 h-4 w-4 min-h-4 max-h-4 min-w-4 max-w-4">
      <IconViewer :name="startIcon" class="w-full h-full" />
    </div>
    <div v-text="text" class="text-ellipsis overflow-hidden capitalize select-none" />
    <div v-if="hasClose" class="ms-1 h-4 w-4 min-h-4 max-h-4 min-w-4 max-w-4">
    <IconViewer
      name="IconXCircle"
      @click.stop="isDisabled ? '' : $emit('close')"
    />
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
  startIcon: String,
  hasClose: Boolean,
  size: {
    type: String,
    default: "l",
  },
  isDisabled: Boolean,
  isSelected: Boolean,
});
defineEmits(["close"]);
</script>
