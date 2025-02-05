<template>
    <div class="w-full">
        <NuxtLoadingIndicator /> 
        <TheHeader/>
        <slot />
        <TheFooter class="bg-p10 hidden laptop:block"/>
        <!-- <ModalCookie v-if="$route.name !== 'cookie'  && $route.name !== 'app'" /> -->
        <ModalToast />
    </div>
</template>