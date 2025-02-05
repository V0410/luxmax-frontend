<template>
    <div class="flex flex-row items-center">
        <div class="relative">
            <div v-if="isAdd" class=" flex justify-center items-center bg-p1 cursor-pointer" :class="[isSquare ? '' : 'rounded-full', size === 'xxl' ? 'w-20 h-20' : size === 'xl' ? 'w-14 h-14' : size === 'l' ? 'w-12 h-12' : size === 'm' ? 'w-8 h-8' : size === 's' ? 'w-6 h-6' : '']" @click.stop="$emit('click')">
                <IconCameraPlus class="fill-p8" :class="[size === 'xxl' ? 'w-12 h-12' : size === 'xl' ? 'w-8 h-8' : size === 'l' ? 'w-6 h-6' : size === 'm' ? 'w-4 h-4' : size === 's' ? 'w-3 h-3' : '']" />
            </div>
            <NuxtImg alt="" v-else-if="img" :src="img" format="webp" quality="100" class="cursor-pointer" :class="[isSquare ? '' : 'rounded-full', size === 'xxl' ? 'w-20 h-20' : size === 'xl' ? 'w-14 h-14' : size === 'l' ? 'w-12 h-12' : size === 'm' ? 'w-8 h-8' : size === 's' ? 'w-6 h-6' : '']" @click.stop="$emit('click')" />
            <div v-else-if="name" class="flex justify-center items-center bg-p7 cursor-default" :class="[isSquare ? '' : 'rounded-full', size === 'xxl' ? 'w-20 h-20' : size === 'xl' ? 'w-14 h-14' : size === 'l' ? 'w-12 h-12' : size === 'm' ? 'w-8 h-8' : size === 's' ? 'w-6 h-6' : '']" @click.stop="$emit('click')">
                <div v-text="(name?.first?.substring(0, 1) || '') + (name?.last?.substring(0, 1) || '')" class="uppercase font-semibold text-white" :class="[size === 'xxl' ? 'text-2xl' : size === 'xl' ? 'text-2xl' : size === 'l' ? 'text-xl' : size === 'm' ? 'text-sm' : size === 's' ? 'text-[10px]' : '']" />
            </div>
            <div v-else class=" flex justify-center items-center bg-p1 cursor-pointer" :class="[isSquare ? '' : 'rounded-full', size === 'xxl' ? 'w-20 h-20' : size === 'xl' ? 'w-14 h-14' : size === 'l' ? 'w-12 h-12' : size === 'm' ? 'w-8 h-8' : size === 's' ? 'w-6 h-6' : '']" @click.stop="$emit('click')">
                <IconPerson class="fill-p8" :class="[size === 'xxl' ? 'w-10 h-10' : size === 'xl' ? 'w-6 h-6' : size === 'l' ? 'w-6 h-6' : size === 'm' ? 'w-4 h-4' : size === 's' ? 'w-3 h-3' : '']" />
            </div>
            <div v-if="hasOnlineOrOffline" class="absolute bottom-0 end-0 border-white rounded-full" :class="[ isOnline ? 'bg-success' : 'bg-danger' ,(size === 'xxl' || size === 'xl' || size === 'l') ? 'w-[14px] h-[14px] border-2' : (size === 'm' || size === 's') ? 'w-[7px] h-[7px] border' : '']"/>
        </div>
        <div v-if="hasDetails" class="ms-4 flex flex-col ">
            <div v-text="name.first + ' ' + name.last" class="text-t9 font-bold capitalize" />
            <div v-text="text" class=" text-xs text-t6" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    img: String,
    name: Object,
    text: String,
    isSquare: Boolean,
    size: {
        type: String,
        default: 'm'
    },
    hasDetails: Boolean,
    hasOnlineOrOffline: Boolean,
    isOnline: Boolean,
    isAdd: Boolean
})
</script>