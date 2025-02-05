<template>
    <div class="w-full h-full">
        <NuxtLoadingIndicator /> 
        <slot />
        <!-- <ModalCookie v-if="$route.name !== 'cookie' && $route.name !=='app'" /> -->
        <ModalToast />
    </div>
</template>