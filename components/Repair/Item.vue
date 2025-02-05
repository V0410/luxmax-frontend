<template>
  <div
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="flex flex-col justify-center items-center relative laptop:w-fit"
    :class="isLoading ? 'cursor-progress' : 'cursor-pointer'"
    >
    <!-- :class="
      (props.item?.isDisabled) 
        ? 'border-t2 cursor-not-allowed'
        : isLoading.item ? 'border-t2 cursor-progress' : 'border-p8 cursor-pointer'
    " -->
    <NuxtImg alt=""
      v-if="props?.item?.file?.url"
      :src="config.public.BASE_URL + props?.item?.file?.url"
      quality="100"
      format="webp"
      class="m-5 w-[200px] hidden laptop:block"
    />
    <!-- :class="(props.item?.isDisabled) ? 'grayscale' : ''" -->
    <!-- <BaseTooltip
      v-if="props.item?.isDisabled"
      v-show="isHover"
      type="bottom-center"
      :text="$t('Coming soon!')"
      class="absolute inset-auto top-10 hidden laptop:block"
    /> -->
    <div
      class="my-2 laptop:my-6 flex justify-center items-center gap-2"
      >
      <!-- :class="props.item?.isDisabled ? 'fill-t3 text-t3' : 'fill-p9 text-[#0D0D0D]'" -->
      <div class="laptop:text-xl" v-text="props.item?.name" />
      <IconArrowDown
        class="rotate-[270deg] w-[20px] h-[20px] hidden laptop:block"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  isLoading: Boolean,
});

const categoryImage = ref(null)
const config = useRuntimeConfig();

const { getFile } = useItem();
if (props.item?.fileId) {
  const { data, error } = getFile(props.item?.fileId)
  categoryImage.value = data?.value?.url
}

const isHover = ref(false);
</script>
