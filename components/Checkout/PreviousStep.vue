<template>
    <div class="flex flex-col gap-4">
        <div
            v-if="title"
            v-text="title"
            class="text-p9 text-xl font-medium leading-normal"
        />
        <div class="p-4 laptop:p-6 border border-p1 flex flex-col gap-6">
            <template v-if="type === 'payment' && data?.card_number">
                <div class="flex justify-between items-center">
                    <div class="flex text-t9">
                        <div class="flex gap-2 items-center">
                            <IconVisa
                                v-if="data?.type === 'visa'"
                                class="w-10 laptop:w-14"
                            />
                            <div
                                v-text="data?.card_number"
                                class="text-sm laptop:text-base"
                            />
                        </div>
                        <div class="border-r border-t1 mx-4 laptop:mx-6" />
                        <div class="flex items-center text-sm laptop:text-base">
                            <div
                                v-text="
                                    $t('EXP:', {
                                        month: data?.expiry?.split('/')[0],
                                        year: data?.expiry?.split('/')[1],
                                    })
                                "
                            />
                        </div>
                    </div>
                    <div v-if="isEditable" class="hidden laptop:block">
                        <BaseButton
                            styleType="text"
                            :text="$t('Edit')"
                            buttonId="edit-receiver-informations"
                            size="s"
                            @click="$emit('edit')"
                        />
                    </div>
                </div>
                <div v-if="data?.addressArray" class="flex flex-col gap-2">
                    <div
                        v-text="$t('Billing Address:')"
                        class="text-t9 font-medium"
                    />
                    <div class="text-t8 text-sm flex flex-wrap leading-normal">
                        <template
                            v-for="(item, i) in data?.addressArray"
                            :key="item"
                        >
                            <div v-text="item" />
                            <div
                                v-if="data?.addressArray.length - 1 > i"
                                class="border-r border-t8 mx-2"
                            />
                        </template>
                    </div>
                </div>
                <div v-if="isEditable" class="flex justify-end laptop:hidden">
                    <BaseButton
                        styleType="text"
                        :text="$t('Edit')"
                        size="s"
                        startIcon="IconPencil"
                        @click="$emit('edit')"
                    />
                </div>
            </template>
            <template v-if="type === 'deliveryInfo'">
                <div class="flex justify-between items-center">
                    <div class="flex text-t9 flex-col gap-2">
                        <div
                            v-text="data[0]?.text + ':'"
                            class="text-t9 font-medium"
                        />
                        <div class="flex flex-wrap text-t8 text-sm">
                            <template
                                v-for="(item, i) in data[0]?.array"
                                :key="item"
                            >
                                <div v-text="item" />
                                <div
                                    v-if="data[0]?.array.length - 1 > i"
                                    class="border-r border-t8 mx-2"
                                />
                            </template>
                        </div>
                    </div>
                    <div v-if="isEditable" class="hidden laptop:block">
                        <BaseButton
                            styleType="text"
                            :text="$t('Edit')"
                            size="s"
                            @click="$emit('edit')"
                        />
                    </div>
                </div>
                <div
                    v-for="row in data?.splice(1)"
                    :key="row.id"
                    class="flex flex-col gap-2"
                >
                    <div v-text="row.text + ':'" class="text-t9 font-medium" />
                    <div class="text-t8 text-sm flex flex-wrap leading-normal">
                        <template v-for="(item, i) in row.array" :key="item">
                            <div v-text="item" />
                            <div
                                v-if="row.array.length - 1 > i"
                                class="border-r border-t8 mx-2"
                            />
                        </template>
                    </div>
                </div>
                <div v-if="isEditable" class="flex justify-end laptop:hidden">
                    <BaseButton
                        styleType="text"
                        :text="$t('Edit')"
                        size="s"
                        startIcon="IconPencil"
                        @click="$emit('edit')"
                    />
                </div>
            </template>
            <template v-if="type === 'arrivalDate'">
                <div class="flex justify-between items-center">
                    <div class="flex text-t9" v-text="data" />
                    <div v-if="isEditable" class="hidden laptop:block">
                        <BaseButton
                            styleType="text"
                            :text="$t('Edit')"
                            size="s"
                            @click="$emit('edit')"
                        />
                    </div>
                </div>

                <div v-if="isEditable" class="flex justify-end laptop:hidden">
                    <BaseButton
                        styleType="text"
                        :text="$t('Edit')"
                        size="s"
                        startIcon="IconPencil"
                        @click="$emit('edit')"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: Object,
    title: String,
    type: String,
    isEditable: Boolean,
});
</script>
