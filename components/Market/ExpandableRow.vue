<template>
    <div v-if="(options.type === 'list' && data[options.dataName] && Array.isArray(data[options.dataName]) && data[options.dataName].length > 0) || (options.type === 'desc' && data[options.dataName]) || (options.type === 'seller-info' &&  data[options.dataName]?.seller_uid) || options.type === 'carbon'" class="py-4 border-b border-t3 flex flex-col cursor-pointer" @click.stop="$emit('update:modelValue', !modelValue)">
        <div class="text-p9 text-lg laptop:text-xl flex justify-between items-center first-letter:capitalize">
            <div v-text="options.title" />
            <transition name="rotate" mode="out-in">
                <IconArrowDown v-if="modelValue" class="w-6 h-6 fill-p9 rotate-180" />
                <IconArrowDown v-else class="w-6 h-6 fill-p9" />
            </transition>
        </div>
        <div class="overflow-auto">
        <transition mode="out-in">
        <div v-show="modelValue" class="px-4 mt-4 relative whitespace-pre-wrap" >
            <template v-if="options.type === 'list' && data[options.dataName] && Array.isArray(data[options.dataName]) && data[options.dataName].length > 0">
                <ul class="list-disc ps-4 first-letter:capitalize">
                    <li v-for="option in data[options.dataName]" :key="option" v-text="option" />
                </ul>
            </template>
            <template v-else-if="options.type === 'desc' && data[options.dataName]">
                {{ data[options.dataName] }}
            </template>
            <template v-else-if="options.type === 'seller-info'">
                <div class="flex flex-col gap-10">
                    <div class="flex gap-6 items-center " :class="data[options.dataName]?.seller_uid ? 'cursor-pointer' : ''" @click.stop="data[options.dataName].seller_uid? $router.push({name: 'seller', params: { id: data[options.dataName].seller_uid  }}) : () => {}">
                        <NuxtImg alt="" v-if="data[options.dataName]?.avatar" format="webp" quality="100" :src="data[options.dataName].avatar" class="w-20 h-20 rounded-full" />
                        <div class="flex flex-col gap-2">
                            <div class="text-t9 font-bold text-lg" v-text="data[options.dataName].name" />
                            <div class="text-t6 text-sm" v-text="$t('Member since', dateToShow(data[options.dataName]?.time || Date.now() /1000))" />
                        </div>
                    </div>
                    <div class="flex justify-center gap-10">
                        <div class="flex flex-col items-center gap-2">
                            <div class="text-3xl text-p7 font-semibold" v-text="(data[options.dataName]?.satisfaction || 100) + '%'" />
                            <div class=" text-xs" v-text="$t('Buyer satisfaction')" />
                        </div>
                        <div class="w-[1px] bg-p2 my-2" />
                        <div class="flex flex-col items-center gap-2">
                            <div class="text-3xl text-p7 font-semibold" v-text="data[options.dataName].performance || $t('Great')" />
                            <div class=" text-xs" v-text="$t('Seller performance')" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="options.type === 'carbon'">
                <BaseCarbonFootPrintChart
                    :data="data[options?.dataName]"
                    type="doughnut"
                    id="carbonFootPrint2"
                />
            </template>
        </div>
        </transition>
        </div>
    </div>
</template>

<script setup>
defineEmits(['update:modelValue'])
defineProps({
    modelValue: Boolean,
    options: Object,
    data: Object
})
const dateToShow = (date) => {
  return {
    month: date
      ? new Intl.DateTimeFormat("en-US", { month: "short" }).format(
          +date * 1000
        )
      : "",
    year: date
      ? new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
          +date * 1000
        )
      : "",
  };
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease-in-out;
  top: 0;
}

.v-enter-from,
.v-leave-to{
  opacity: 0;
  top: -50px;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all .8s ease-in-out;
}

.rotate-leave-to{
    rotate: 540deg
}

</style>