<template>
    <div class="flex flex-col gap-5 border-t border-p1 mb-4">
        <div class="flex justify-center ">
            <NuxtImg alt="" v-if="data.img" :src="data.img" format="webp" quality="100" class="w-[200px]" />
        </div>
        <div class="flex justify-between items-start">
            <div class="flex flex-col gap-2">
                <div class="text-t8 leading-normal" v-text="data.name" />
                <div class="text-t5 text-sm" v-text="data.desc" />
            </div>
            <div class="flex flex-col gap-2 items-end justify-end">
                <div v-if="data.date" class="text-xs text-t8" v-text="dateToShow(data.value)" />
                <!-- <BaseBadge :text="data.condition?.badge" size="s" :color="data.condition?.color" /> -->
            </div>
        </div>
        <div class="flex justify-between items-center min-h-[40px]">
            <div class="" v-text="data.price?.toLocaleString() + ' £'" />
            <div class="flex">
                <BaseButton v-for="action in data.actions" :key="action.id" :text="action?.text" size="s" :startIcon="action.startIcon" :styleType="action.mobileStyleType" @click="$emit(action.emit, data.id)" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps ({
    data: Object
})

//// dateToShow
const dateToShow = (date) => {
    const newDate = new Date(date)
    return newDate.toDateString().split(' ').splice(1).join(' ')
}
</script>