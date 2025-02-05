<template>
    <div v-show="toastState" class="absolute bottom-4 w-full flex justify-center">
        <div class="gridClass flex justify-center">
            <BaseAlert :type="toastState?.type" :noIcon="toastState?.noIcon" :title="toastState?.title" :desc="toastState?.desc" @close="toastState = null" />
        </div>
    </div>
</template>

<script setup>
const toastState = useState('toast')
</script>