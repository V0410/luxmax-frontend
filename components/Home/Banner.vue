<template>
    <div class="h-[410px] laptop:h-[800px] bg-[url('/img/home/banner.webp')] bg-cover bg-center laptop:bg-top flex flex-col items-center justify-end laptop:justify-start gap-4 laptop:gap-32 pb-6 laptop:pt-36">
        <div class="flex gap-2 laptop:gap-20 items-center text-white text-xl laptop:text-5xl">
            <div v-text="$t('What set')" />
            <div v-text="$t('us apart')" />
        </div>
        <!-- <button class="py-3 px-4 laptop:py-4 laptop:px-6 rounded-full bg-white text-p7 laptop:text-lg text-sm">
            Read More
        </button> -->
    </div>
</template>