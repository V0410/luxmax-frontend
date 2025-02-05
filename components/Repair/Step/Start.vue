<template>
  <div class="w-full flex flex-col mb-6 laptop:mb-0 gap-6 laptop:gap-12">
    <div class="gridClass laptop:max-w-[672px]">
      <div
        class="mx-auto w-full flex flex-col gap-6 laptop:gap-10 text-center items-center"
      >
        <div
          class="text-p8 font-medium laptop:text-[28px] leading-normal"
          v-text="$t('Great! To begin')"
        />
        <div
          class="text-p8 font-medium text-sm laptop:text-xl"
          v-text="
            $t(
              'Luxmax offers an amazing AI engine that allows for easy identification of product details by simply uploading photos.'
            )
          "
        />
        <div class="flex justify-center w-full">
          <BaseButton
            buttonId="identify-start"
            class="w-full laptop:w-fit"
            :text="$t('Choose your Product Type')"
            @click="$emit('startRepair')"
          />
        </div>
      </div>
    </div>
    <div class="laptop:pb-20 w-full laptop:py-20 laptop:bg-p1">
      <div
        class="gridClass laptop:max-w-none laptop:w-full flex flex-col laptop:flex-row gap-4 justify-evenly"
      >
        <template v-for="(item, i) in bottomFlow" :key="item.id">
          <RepairFlow :text="item.text" :number="i + 1" />
          <div class="hidden laptop:flex flex-col justify-center">
            <IconArrowLeft
              v-if="i < bottomFlow.length - 1"
              class="rotate-180 fill-p9 h-6 w-6"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array,
  selectedItem: String,
  isLoading: Boolean,
});

const { t } = useI18n();

const bottomFlow = [
  { id: 0, text: t("Using our image recognition technology or guided search") },
  {
    id: 1,
    text: t("Tell us a bit about your item, like its color and condition"),
  },
  { id: 2, text: t("Generate its current resale value in an instant") },
];
</script>
