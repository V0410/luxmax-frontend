<template>
    <div class="flex flex-col">
        
        <div class="flex items-center justify-center border bg-p2 border-p2 rounded-lg w-36 h-28 relative">
            <NuxtImg
                :src="src"
                class="mt-0 w-32 h-32 laptop:mt-0 absolute top-4 left-2"
            />
        </div>
     
        <div class="flex flex-col w-36 gap-4 items-center p-2 laptop:p-4 border border-p4 rounded-md -mt-4">
            <div v-text="title" class="mt-10 font-semibold laptop:text-xl text-center"/>
            <div class="text-t5 text-xxs text-center leading-0">From</div>

            <div class="mt-1 text-center text-xl text-p6 leading-0" >
                £{{ afterDiscount }}
            </div>
            <div class="text-t6 line-through text-center text-xs leading-0" >
                £{{ beforeDiscount }}
            </div>

            <div class="text-t4 text-center text-xxs leading-0" >
                per item
            </div>
        </div>
    </div>

</template>
  
<script setup>
    const props = defineProps({
        src: String,
        title: String,
        beforeDiscount: Number,
        afterDiscount: Number,
    });

</script>