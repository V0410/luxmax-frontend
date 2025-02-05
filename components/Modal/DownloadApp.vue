<template>
  <div v-show="isShow" class="shadow-s-5 absolute top-16 -left-[110px] hidden laptop:block z-10">
    <div
      class="bg-white p-4 max-w-[252px] text-center flex flex-col gap-4 justify-start overflow-y-auto"
    >
      <BaseQRCode :link="`${config.public.BASE_URL}/guide/download-app`" />
      <div v-text="$t('To download the iOS or Android app, simply scan the QR code.')" />
      <BaseButton :text="$t('More Option')" fakeButton endIcon="IconArrowCircleRight" @click="goToDonwloadPage" />
    </div>
  </div>
  <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
      :title="$t('Download Application')"
    >
      <template #body>
        <div v-text="$t('To download the iOS or Android app, simply scan the QR code.')" />
        <BaseQRCode :link="`${config.public.BASE_URL}/guide/download-app`" />
          <BaseButton class="w-full" fakeButton :text="$t('More Option')" endIcon="IconArrowCircleRight"  @click="goToDonwloadPage" />
        </template>
    </BaseBottomSheet>
</template>

<script setup>
const emits = defineEmits(["close"]);
defineProps({
  isShow: Boolean,
});

const config = useRuntimeConfig();
const router = useRouter()
const goToDonwloadPage = () => {
  router.push({ name: 'downloadApp' })
  emits('close')
}
</script>
