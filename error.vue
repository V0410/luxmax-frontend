<template>
  <NuxtLayout name="header">
    <div class="gridClass flex flex-col justify-center items-center mb-24 mt-40 laptop:mt-0 ">
      <div class="relative flex justify-center items-center">
        <h1 class="text-[128px] laptop:text-[480px] text-p2 font-extrabold">{{ error?.statusCode || '000' }}</h1>
        <IconError class="w-[200px] h-[86px] laptop:w-[750px] laptop:h-[323px] absolute" />
      </div>
      <div class="flex flex-col gap-8 w-full max-w-[770px] text-center">
        <div class=" text-lg laptop:text-[2rem] font-medium" v-text="error?.statusCode === 404 ? $t(`Sorry, We couldn't find the page you're looking for.`) : $t(`We seem to have encountered a minor hiccup`)" />
        <div class=" laptop:text-xl text-t5 font-medium" v-text="$t(`It seems like you've wandered off the beaten path. The page you're looking for is currently unavailable or has been moved. Don't worry, we're on it!`)" />
        <BaseButton v-show="error?.statusCode === 404" class="w-fit mx-auto" @click="handleError" :text="$t('Home Page')" />
        {{ error.message }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
  const props = defineProps({
    error: Object
  });

  // props.error {message, statusCode, stack}

  console.log(props.error);

  const handleError = () => clearError({ redirect: '/' });
</script>