<template>
    <div v-if="toastState && Array.isArray(toastState) && toastState.length > 0" class="fixed top-24 right-0 left-0 z-[60] flex flex-col-reverse gap-3 w-4/5 laptop:w-[552px] mx-auto">
        <BaseAlert v-for="toast in toastState" :key="toast.id" :type="toast.type" class="w-full shadow-s-6" :title="toast.title" :desc="toast.desc" :noClose="toast.noClose" :noIcon="toast.noIcon" />
    </div>
</template>

<script setup>
const toastState = useState("toasts");
</script>