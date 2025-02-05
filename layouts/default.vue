<template>
    <div class="w-full min-h-[100vh] flex flex-col justify-between">
        <NuxtLoadingIndicator /> 
        <TheHeader/>
        <slot />
        <TheFooter class="bg-p10"/>
        <!-- <ModalCookie v-if="$route.name !== 'cookie' && $route.name !=='app'" /> -->
        <ModalToast />
    </div>
</template>