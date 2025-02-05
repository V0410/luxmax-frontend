<template>
  <div
    v-if="!isCookiesAccepted"
    class="fixed bottom-0 w-full bg-p1 py-8 px-20 hidden laptop:flex justify-between items-center gap-10 z-40"
  >
    <div
      v-text="
        $t(
          'We use cookies to provide you the best experience on our website. By continuing to use our site, we will assume you are happy with it.'
        )
      "
    />
    <div class="flex items-center gap-4 [&>*]:w-[125px]">
      <BaseButton :text="$t('Accept')" @click="acceptCookies" />
      <NuxtLink :to="{ name: 'cookie' }">
        <BaseButton styleType="outlined" :text="$t('Cookies List')" />
      </NuxtLink>
    </div>
  </div>
  <BaseBottomSheet
    isMobileOnly
    :isShow="!isCookiesAccepted"
    title=""
    background="p1"
  >
    <template #body>
      <div
        class="flex flex-col gap-8 w-full text-start"
        v-text="
          $t(
            'We use cookies to provide you the best experience on our website. By continuing to use our site, we will assume you are happy with it.'
          )
        "
      />
      <div class="flex items-center gap-4 [&>*]:w-full mt-10 w-full">
        <BaseButton :text="$t('Accept')" @click="acceptCookies" />
        <NuxtLink :to="{ name: 'cookie' }">
          <BaseButton styleType="outlined" :text="$t('Cookies List')" />
        </NuxtLink>
      </div>
    </template>
  </BaseBottomSheet>
</template>

<script setup>
const isCookiesAccepted = useCookie("isCookiesAccepted",{maxAge: 31536000});
const acceptCookies = () => {
  isCookiesAccepted.value = true;
};
</script>
