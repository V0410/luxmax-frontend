<template>
  <div v-if="isShow" :class="isMobileOnly ? 'laptop:hidden' : ''">
    <div
      class="fixed inset-0 h-full z-50 bg-t10 bg-opacity-10 flex justify-center items-center"
      @click.stop="() => $emit('close')"
    >
      <div
        @click.stop="() => {}"
        :class="[background === 'p1' ? 'bg-p1' : 'bg-white', fixedHeight ? 'min-h-[80vh]' : '' ]"
        class="p-4 laptop:p-6 w-full mt-auto relative  flex flex-col text-center items-center rounded-t-3xl max-h-[80vh] overflow-y-auto shadow-[0px -8px 12px 0px #0000001F]"
      >
      <div class="mt-4 mb-2.5">
        <div class="flex flex-row gap-4">
          <div v-if="title" class="pb-2 text-center font-medium text-xl leading-normal">
            {{ title }}
          </div>
          <div class="w-4 h-4 mt-1 text-xl" @click="() => $emit('close')">
            <IconArrowDown class="text-p8"/>
          </div>

        </div>
  
        <div 
          v-if="desc" 
          class="text-t7 text-center font-medium text-base leading-normal" 
          v-text="desc" 
        />
      </div>
        <slot name="body" />
          <div v-if="buttonType" class="w-full mt-8 flex [&>*]:flex-grow gap-3">
            <BaseButton
              text="Cancel"
              styleType="outlined"
              size="s"
              @click="() => $emit('close')"
            />
            <BaseButton 
              v-if="buttonType === 'confirm'"
              text="Confirm" 
              size="s"
            />
            <BaseButton
              v-else-if="buttonType === 'delete'"
              color="danger"
              text="Delete"
              size="s"
            />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  isShow: Boolean,
  buttonType: String,
  isMobileOnly: Boolean,
  background: String,
  fixedHeight: Boolean
});
</script>
