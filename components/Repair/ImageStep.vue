<template>
    <div class="flex flex-col" @click="isCurrent ? $emit('uploadImage') : () =>{}" :class="isLoading ? 'cursor-wait' : isCurrent ? ' cursor-pointer' : ' cursor-default'">
        <div class="h-8 text-start text-sm text-p7 hidden laptop:block">
            <div v-show="imageToShow" class="flex laptop:flex-col items-center justify-center gap-1">
                <div v-text="text" />
            </div>
        </div>
        <div class="flex border border-dashed laptop:w-[120px] laptop:h-[120px] overflow-hidden items-center gap-4" :class="[(isCurrent && !isLoading) ? 'border-p7 text-p7' : 'border-t2 text-t2', imageToShow ? 'justify-between' : 'justify-between laptop:justify-center']">
            <div :class="imageToShow ? 'laptop:hidden' : ''" class="flex laptop:flex-col items-center gap-4 p-4 laptop:p-0 ">
                <div v-text="number" class="rounded-full border laptop:border-none flex items-center justify-center w-8 h-8 min-w-[32px] min-h-[32px] laptop:text-4xl" :class="isCurrent ? 'border-p7' : 'border-t2'" />
                <div class="text-sm laptop:text-base leading-normal laptop:min-h-[42px] flex flex-col items-start laptop:items-center justify-center gap-1">
                    <div class="px-2" v-text="text + (isOptional ? ' ' + $t('(Optional)') : '')" />
                </div>
            </div>
            <div v-if="imageToShow" class="relative overflow-hidden">
                <NuxtImg alt="" format="webp" quality="100" :src="imageToShow" class="w-[180px] aspect-square object-cover" />
                <IconCloseCircle v-show="!isLoading && !cantDelete" class="fill-p10 absolute top-2 end-2 cursor-pointer" @click.stop="$emit('delete', id)" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineEmits(['delete', 'uploadImage'])
const props = defineProps({
    id: String | Number,
    text: String,
    number: Number,
    isCurrent: Boolean,
    img: String | File,
    isLoading: Boolean,
    isOptional: Boolean,
    cantDelete: Boolean,
})
const imageToShow = computed(() => props.img ? URL.createObjectURL(props.img) : null)
</script>
