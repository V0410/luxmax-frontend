<template>
    <div class="w-full">
        <NuxtLoadingIndicator /> 
        <TheHeader/>
        <slot />
        <TheFooter class="bg-p10 hidden laptop:block"/>
        <ModalToast />
    </div>
</template>
