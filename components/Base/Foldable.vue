<template>
    <div class="w-full" >
        <div @click="toggleShow" class="flex flex-row items-center justify-between">
            <slot name="title" />
            <div v-if="!noArrowDown && !isAlwaysOpen" class="laptop:hidden ps-6">
                <IconArrowDown class="w-5 h-5 fill-p9 " :class="isShow ? ' rotate-180' : ''" />
            </div>
        </div>
        <div :class="(isShow || isAlwaysOpen) ? '' : 'hidden laptop:block'">
            <slot name="default" />
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    noArrowDown: Boolean,
    isAlwaysOpen: Boolean,
    isInitialyOpen: Boolean
})
const isShow = ref(props.isInitialyOpen)
const toggleShow = () => {
    isShow.value = !isShow.value
}
</script>