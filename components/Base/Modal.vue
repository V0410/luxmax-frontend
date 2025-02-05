<template>
  <div v-if="isShow" :class="isDesktopOnly ? 'hidden laptop:block' : ''">
    <div
      class="fixed inset-0 h-full z-50 bg-t10 bg-opacity-10 flex justify-center items-center"
      @click.stop="() => $emit('close')"
    >
      <div
        @click.stop="() => {}"
        class="p-4 laptop:p-6 pb-5 w-full mt-auto laptop:m-auto relative bg-white flex flex-col max-h-[100vh] laptop:max-h-[90vh] overflow-y-auto"
        :class="[
          size === 'm' ? 'laptop:w-[480px]': size === 'l' ? 'laptop:w-[640px]' : '',
          type === 'center' ? 'text-center  items-center' : '',
          isFullHeight? 'h-full': ''
        ]"
      >

        <IconArrowLeft v-if="hasBack" class="absolute start-4 top-4 h-6 w-6" @click.stop="() => $emit('back')" />
        <IconX v-if="hasClose" class="absolute end-4 top-4 cursor-pointer" @click.stop="() => $emit('close')" />
        <slot name="top" />
        <div
          class="flex mb-6"
          :class="[
            type === 'horizontal' ? 'flex-col laptop:flex-row' : 'flex-col',
            type === 'center' ? 'items-center' : '',
          ]"
        >
          <IconModalCheckCircle
            v-if="hasIcon"
            class="fill-success mb-3 laptop:mb-4 w-12 h-12"
            :class="type === 'horizontal' ? 'me-4' : ''"
          />
          <div class="w-full">
            <div class="mb-1 font-semibold text-lg text-t10" v-text="title" />
            <div class="text-sm text-t7" v-text="desc" />
          </div>
        </div>
        <slot name="body" />
        <div v-if="buttonType" class="w-full mt-8 flex [&>*]:flex-grow gap-3">
          <BaseButton
            text="Cancel"
            styleType="outlined"
            size="s"
            @click="() => $emit('close')"
          />
          <BaseButton v-if="buttonType === 'confirm'" text="Confirm" size="s" />
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
  type: {
    type: String,
    default: "left",
  },
  size: {
    type: String,
    default: 'm'
  },
  isShow: Boolean,
  buttonType: String,
  hasIcon: Boolean,
  hasClose: Boolean,
  hasBack: Boolean,
  isDesktopOnly: Boolean,
  isFullHeight: Boolean
});

defineEmits(['close']);
</script>
