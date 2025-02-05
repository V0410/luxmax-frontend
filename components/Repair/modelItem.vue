<template>
  <div
    class="p-4 pt-0 flex flex-col gap-4 w-[240px] h-[320px] bg-white shadow-[0px 10px 40px 0px rgba(118, 140, 116, 0.10)]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div>
      <NuxtImg
        alt=""
        v-if="data.images[0].url"
        :src="data.images[0].url"
        format="webp"
        quality="100"
        class="h-[200px]"
      />
    </div>
    <div class="my-auto flex flex-col gap-4">
      <div class="my-auto flex flex-col gap-2">
        <div
          class="flex justify-between items-center font-medium text-[10px] leading-normal"
        >
          <div class="text-t3" v-text="data.brandCategory?.category?.title" />
          <div class="text-p7" v-text="data.brandCategory?.brand?.name" />
        </div>
        <div
          class="text-sm text-t8 text-start leading-normal line-clamp-2"
          v-text="data.name"
        />
      </div>
      <BaseButton
        buttonId="identify-model-item-select"
        size="s"
        v-show="isHovered"
        :text="$t('Select')"
        @click="$emit('select')"
        class="hidden laptop:block"
      />
      <BaseButton
        buttonId="identify-model-item-select"
        size="s"
        :text="$t('Select')"
        @click="$emit('select')"
        class="laptop:hidden"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
const config = useRuntimeConfig();

const isHovered = ref(false);
</script>
