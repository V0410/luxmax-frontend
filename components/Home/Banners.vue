<template>
    <div class="gridClass select-none">
    <div class="grid grid-cols-1 laptop:grid-cols-2 gap-4 laptop-l:gap-6 w-full">
        <div class="grid grid-cols-1 gap-4 laptop-l:gap-6 flex-grow ">
            <NuxtImg alt="" width="648" height="239" loading="lazy" sizes="100vw laptop-l:50vw" src="/img/home/banner-1.webp" format="webp" quality="100" class="w-full cursor-pointer lazyload" @click="$router.push( {name: 'market'} )"  />
            <NuxtImg alt="" width="648" height="239" loading="lazy" sizes="100vw laptop-l:50vw" src="/img/home/banner-2.webp" format="webp" quality="100" class="w-full cursor-pointer lazyload" @click="$router.push( {name: 'market'} )" />
        </div>
        <div class="grid grid-cols-2 gap-4 laptop-l:gap-6 flex-grow ">
            <NuxtImg alt="" width="312" height="502" loading="lazy" sizes="50vw laptop-l:25vw" src="/img/home/banner-3.webp" format="webp" quality="100" class="w-full cursor-pointer lazyload" @click="$router.push( {name: 'market'} )"  />
            <NuxtImg alt="" width="312" height="502" loading="lazy" sizes="50vw laptop-l:25vw" src="/img/home/banner-4.webp" format="webp" quality="100" class="w-full cursor-pointer lazyload" @click="$router.push( {name: 'market'} )" />
        </div>
    </div>
    </div>
</template>