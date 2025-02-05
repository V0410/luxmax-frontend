<template>
    <div class="flex gap-[5px] items-center">
        <div v-if="dataArray.length > 3" class="flex gap-[5px] items-center cursor-default">
            <BaseBreadcrumbElement :hasBg="true" :icon="item?.icon || null" text="..." />
            <span v-text="`/`" class="font-medium text-t4 text-[10px]" />
        </div>
        <div v-for="(item,i) in dataArrayComputed" :key="item.id" class="flex gap-[5px] items-center cursor-pointer" >
            <BaseBreadcrumbElement :hasBg="hasBg" :icon="item?.icon || null" :action="item.action" :isLast="i === dataArrayComputed.length - 1" :text="item?.text || 'default text!'" />
            <span v-if="i < dataArrayComputed.length - 1" v-text="`/`" class=" font-medium text-t4 text-[10px]" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    hasBg: Boolean,
    dataArray: Array,
})
const dataArrayComputed = computed(()=>{
    if(props.dataArray.length < 3){
        return props.dataArray
    } else {
        return props.dataArray.slice(props.dataArray.length - 3)
    }
})
</script>