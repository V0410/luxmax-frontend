<template>
    <div class="bg-white mx-auto">
    <div class=" p-6 flex flex-col bg-opacity-10 text-start" :class="type === 'success' ? 'bg-success' : type === 'warning' ? 'bg-warning' : type === 'danger' ? 'bg-danger' : type === 'info' ? 'bg-info': '' ">
        <div class="flex justify-between gap-2">
            <div class="flex-grow flex">
                <div v-if="!noIcon" class="w-8">
                    <IconViewer v-if="type === 'success'" name="IconCheckCircle" class="h-8 w-8 fill-success" />
                    <IconViewer v-else-if="type === 'warning'" name="IconWarningCircle" class="h-8 w-8 fill-warning" />
                    <IconViewer v-else-if="type === 'danger'" name="IconDanger" class="h-8 w-8 fill-danger" />
                    <IconViewer v-else-if="type === 'info'" name="IconInfo" class="h-8 w-8 fill-info" />
                </div>
                <div class="flex flex-col flex-grow ms-4 gap-2">
                    <div v-if="title" v-text="title" class="text-t8 font-medium text-xl mt-0.5 first-letter:capitalize" />
                    <div v-if="desc" v-text="desc" class=" first-letter:capitalize" :class="type === 'danger' ? 'text-danger': 'text-t6'" />
                </div>
            </div>
            <div v-if="!noClose">
                <IconViewer name="IconX" class="h-5 w-5 fill-t6 cursor-pointer" @click.stop="$emit('close')" />
            </div>
        </div>
        <div v-if="buttonText" class="flex justify-end mt-7">
            <button v-text="buttonText" @click.stop="$emit('click')" :class="type === 'success' ? 'text-success' : type === 'warning' ? 'text-warning' : type === 'danger' ? 'text-danger' : type === 'info' ? 'text-info': '' " />
        </div>
    </div>

    </div>
</template>

<script setup>
    defineProps({
        type: {
            type: String,
            default: 'success'
        },
        buttonText: String,
        title: String,
        desc: String,
        noIcon: Boolean,
        noClose: Boolean
    })
</script>