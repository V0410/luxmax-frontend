<template>
    <div
        class="font-medium whitespace-nowrap bg-opacity-10 cursor-default text-center first-letter:capitalize"
        :class="[
            size === 'l'
                ? 'p-1.5 text-xs leading-3 rounded'
                : size === 'repair'
                ? 'py-2 px-3 text-sm font-medium leading-4 rounded-bl-lg'
                : 'p-1.5 text-[10px] leading-3 rounded',
            color === 'success'
                ? 'bg-success text-success'
                : color === 'info'
                ? 'bg-info text-info'
                : color === 'amber'
                ? 'bg-amber text-amber'
                : color === 'gray'
                ? 'bg-t4 text-t4'
                : color === 'gold'
                ? 'bg-gold text-gold'
                : color === 'blue'
                ? 'bg-blue text-blue'
                : color === 'purple'
                ? 'bg-purple text-purple'
                : color === 'green'
                ? 'bg-p8 text-p8'
                : color === 'REPAIR_AND_SELL_IN_OUR_COMMUNITY'
                ? 'bg-p8 text-p8'
                : color === 'INSTANT_SELL'
                ? 'bg-gold text-gold'
                : color === 'REPAIR_AND_GET_BACK'
                ? 'bg-[#8E6BFF] text-[#8E6BFF]'
                : color === 'SELL_WITHOUT_REPAIR'
                ? 'bg-[#316D98] text-[#316D98]'
                : '',
        ]"
        v-text="text"
    />
</template>

<script setup>
defineProps({
    text: String,
    size: {
        type: String,
        default: "s",
    },
    color: String,
});
</script>
