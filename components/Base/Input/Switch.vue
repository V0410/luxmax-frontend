<template>
    <div class="rounded-[20px] flex items-center px-0.5" :class="[isChecked ? 'justify-end' : 'justify-start', isDisabled ? (isChecked ? 'bg-p4 cursor-not-allowed' : 'bg-t1 cursor-not-allowed') :(isChecked ? 'bg-p6 hover:bg-p7 cursor-pointer' : 'bg-p2 hover:bg-p3 cursor-pointer') , size === 'l' ? 'h-6 w-12' : size === 's' ? 'h-5 w-10' : '' ]" @click="toggleChecked">
        <div class="rounded-full flex justify-center items-center" :class="[isDisabled ? 'bg-p1' : 'bg-white',  size === 'l' ? 'h-5 w-5' : size === 's' ? 'h-4 w-4' : '' ]">
            <template v-if="hasIcon">
                <IconTick v-if="isChecked" :class="[isDisabled? 'stroke-t2' : 'stroke-p7', size === 'l' ? 'h-[12px] w-[12px]' : size === 's' ? 'h-[10px] w-[10px]' : '']" />
                <IconX v-else :class="[isDisabled? 'stroke-t2' : 'stroke-p3', size === 'l' ? 'h-[12px] w-[12px]' : size === 's' ? 'h-[10px] w-[10px]' : '']" />
            </template>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'm'
    },
    hasIcon: Boolean,
    isDisabled: Boolean
})
const isChecked = ref(false)

const toggleChecked = () => {
    if(!props.isDisabled){
        isChecked.value = !isChecked.value
    }
}

</script>