<template>
    <div class="rounded-lg relative border border-p1" :class="data?.plan ? 'pt-4' : ''">
        <div v-if="data?.plan" class="flex flex-row absolute top-0 start-0">
            <BaseBadge :color="data?.badge?.color || 'gold'" :text="data?.plan"
                :size="data?.badge?.size || 'l'" />
        </div>
        <div class="flex flex-col p-4">
            <div v-if="data?.status" class="flex justify-between laptop:items-center mb-8">
                <div class="flex flex-col laptop:flex-row laptop:items-center gap-2 laptop:gap-4">
                    <div class="flex items-center gap-2">
                        <IconViewer :name="data?.status?.icon" class="w-5 h-5"
                            :class="data?.isDisabled ? 'fill-t3' : data?.status.type === 'danger' ? 'fill-danger' : 'fill-p7'" />
                        <div class="text-sm font-semibold first-letter:capitalize"
                            :class="data?.isDisabled ? 'text-t3' : data?.status.type === 'danger' ? 'text-danger' : 'text-t8'"
                            v-text="data?.status" />
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="text-t4 text-sm first-letter:capitalize"
                            :class="data?.isDisabled ? 'text-t3' : 'text-t4'" v-text="data?.createdAt" />
                        <div class="w-1.5 h-1.5 rounded-full hidden laptop:block"
                            :class="data?.isDisabled ? 'bg-t3' : 'bg-[#D9D9D9]'" />
                        <div class="text-t4 text-sm first-letter:capitalize"
                            :class="data?.isDisabled ? 'text-t3' : 'text-t4'" v-text="`Order Number: ${data?.id}`" />
                    </div>
                </div>
            </div>
            <div v-for="item in data?.items" class="p-2 mt-4 laptop:mt-0 laptop:py-2 border border-p1 laptop:border-none flex flex-col laptop:flex-row items-center justify-between laptop:justify-start gap-4 laptop:gap-28"
                :class="data?.extraInfo ? 'border-b border-p1' : ''">
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-4 min-w-[100%] laptop:min-w-[400px]">
                        <NuxtImg alt="" v-if="item.product?.images" :class="data?.isDisabled ? 'grayscale' : ''"
                            class="h-[100px] w-[100px] object-contain"
                            :src="config.public.BASE_URL + item.product?.images[0]?.file?.url" format="webp"
                            quality="100" />
                        <div class="flex flex-col gap-2 justify-center">
                            <div class="font-medium text-xs text-t6" v-text="item.product?.brand.name || ''" />
                            <div class="font-medium text-xs text-t9" v-text="data?.features || ''" />
                            <div class="text-[10px] text-t4"
                                v-text="data?.itemData?.features?.map(el => el.text)?.join(' - ')" />
                        </div>
                    </div>
                </div>

                <div
                    class="flex flex-col gap-4 w-full laptop:w-fit laptop:flex-row laptop:justify-between laptop:me-28 laptop:gap-28 flex-grow">
                    <!-- <div class="flex justify-center">
                            <BaseBadge :text="data?.state?.title" :color="data?.state?.type" class="w-fit" />
                        </div> -->
                    <div v-if="item.product?.price || item.product?.price == 0"
                        class="flex text-t7 flex-col items-center justify-center"
                        v-text="'£ ' + item.product?.price.toLocaleString()" />
                    <div v-if="data?.buttons && Array.isArray(data?.buttons) && data?.buttons.length > 0"
                        class="flex flex-row gap-0 items-center">
                        <BaseButton v-for="button in data?.buttons" :key="button.id" :startIcon="button?.startIcon"
                            :isDisabled="button?.isDisabled" :styleType="button?.type" :size="button?.size"
                            :text="button?.text"
                            @click="$emit('buttonClick', { emit: button.emit, id: data?.itemData?.id })" />
                    </div>
                </div>
            </div>
            <div v-if="data?.extraInfo && (data?.extraInfo.title || data?.extraInfo.desc)">
                <div class="flex flex-col gap-4 mt-4">
                    <div v-if="data?.extraInfo.title" class="text-xs" :class="data?.isDisabled ? 'text-t3' : 'text-t6'"
                        v-text="data?.extraInfo.title" />
                    <div v-if="data?.extraInfo.items && Array.isArray(data?.extraInfo.items) && data?.extraInfo.items.length > 0"
                        class="flex gap-4 flex-wrap">
                        <div v-for="item in data?.extraInfo.items" :key="item" class="flex gap-1 items-center">
                            <div class="h-2 w-2 rounded-full" :class="data?.isDisabled ? 'bg-t3' : 'bg-t4'" />
                            <div class="text-[10px] laptop:text-xs font-medium" v-text="item"
                                :class="data?.isDisabled ? 'text-t3' : 'text-t4'" />
                        </div>
                    </div>
                    <div class="text-end font-medium text-sm" :class="data?.isDisabled ? 'text-t3' : 'text-t4'"
                        v-text="data?.extraInfo.desc" />
                </div>
            </div>
        </div>
        <div v-if="data?.desc && (data?.desc.text || (data?.desc.buttons && Array.isArray(data?.desc.buttons) && data?.desc.buttons.length > 0))"
            class="py-4 px-6 flex items-center text-xs laptop:text-sm"
            :class="[data?.desc.text ? 'justify-between' : 'justify-center laptop:justify-between', data?.isDisabled ? 'text-t3 bg-t1 bg-opacity-40' : data?.desc.type === 'info' ? 'text-info bg-[#F0F7FE]' : data?.desc.type === 'danger' ? 'text-danger bg-[#FEEDEB]' : data?.desc.type === 'success' ? 'bg-p1 text-p7' : data?.desc.type === 'gold' ? ' text-gold bg-[#F7F4EB]' : '']">
            <div v-text="data?.desc.text" />
            <div class="flex items-center gap-4 flex-col laptop:flex-row [&>*]:w-full [&>*]:laptop:w-fit"
                :class="data?.desc.text ? '' : 'w-full laptop:w-fit'"
                v-if="data?.desc.buttons && Array.isArray(data?.desc.buttons) && data?.desc.buttons.length > 0">
                <BaseButton v-for="button in data?.desc.buttons" :key="button.id" :isDisabled="data?.isDisabled"
                    :styleType="button.type" :size="button.size" :text="button.text"
                    @click="$emit('buttonClick', { emit: button.emit, id: data?.itemData?.id })" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    idDisabled: Boolean
})
const config = useRuntimeConfig()
</script>