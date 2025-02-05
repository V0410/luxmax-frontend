<template>
    <div class="w-full">
        <NuxtLoadingIndicator /> 
        <TheHeader/>
        <slot />
        <!-- <ModalCookie v-if="$route.name !== 'cookie' && $route.name !== 'app'" /> -->
        <ModalToast />
    </div>
</template>
