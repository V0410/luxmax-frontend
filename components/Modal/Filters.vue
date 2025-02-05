<template>
    <BaseModal
        class="laptop:hidden"
        type="center"
        :isShow="isShow"
        @close="$emit('close')"
        @back="selectedFilter = null"
        :title="
            selectedFilter ? selectedFilterData.title : $t('Filter and Sort')
        "
        :hasClose="!selectedFilter"
        :hasBack="selectedFilter"
        isFullHeight
    >
        <template #body>
            <template v-if="!selectedFilter">
                <div class="flex flex-col w-full overflow-y-auto">
                    <MarketModalFilterRow
                        v-for="filter in filtersToShow"
                        :key="filter.id"
                        :data="filter"
                        @click="selectedFilter = filter.value"
                    />
                </div>
                <div class="w-full mt-8 flex [&>*]:flex-grow gap-3">
                    <BaseButton
                        :text="$t(`Clear All`)"
                        styleType="outlined"
                        size="s"
                        @click="clearFilters"
                        buttonId="clear-all-filters"
                    />
                    <BaseButton
                        :text="$t(`Apply`)"
                        size="s"
                        @click="submitForm"
                        buttonId="aplly-filter"
                    />
                </div>
            </template>
            <template v-else>
                <div
                    v-if="selectedFilterData.type === 'checkbox'"
                    class="flex flex-col gap-8 w-full"
                >
                    <div class="w-full flex flex-col [&>*]:py-4">
                        <MarketCheckboxRow
                            v-for="option in selectedFilterData.options"
                            :key="option.id"
                            :text="option.text"
                            :count="option.count"
                            :value="option.value"
                            :group="selectedFilterData.value"
                            :modelValue="values[selectedFilter][option.value]"
                            @update:modelValue="update"
                        />
                    </div>
                    <div class="w-full mt-auto flex [&>*]:flex-grow gap-3">
                        <BaseButton
                            :text="$t(`Clear Filters`)"
                            styleType="outlined"
                            size="s"
                            @click="clearFilters"
                        />
                        <BaseButton
                            :text="$t(`Apply`)"
                            size="s"
                            @click="submitForm"
                        />
                    </div>
                </div>
                <div
                    v-if="selectedFilterData.type === 'radio'"
                    class="flex flex-col gap-8 w-full"
                >
                    <div class="w-full flex flex-col [&>*]:py-4">
                        <MarketRadioRow
                            v-for="option in selectedFilterData.options"
                            :key="option.id"
                            :text="option.text"
                            :count="option.count"
                            :value="option.value"
                            :group="selectedFilterData.value"
                        />
                    </div>
                    <div class="w-full mt-auto flex [&>*]:flex-grow gap-3">
                        <BaseButton
                            :text="$t(`Reset`)"
                            styleType="outlined"
                            size="s"
                            @click="clearFilters"
                        />
                        <BaseButton
                            :text="$t(`Apply`)"
                            size="s"
                            @click="submitForm"
                        />
                    </div>
                </div>
                <div
                    v-if="selectedFilterData.type === 'slider'"
                    class="flex flex-col gap-8 w-full"
                >
                    <div class="w-full flex flex-col [&>*]:py-4">
                        <MarketSliderRow
                            :min="selectedFilterData.min"
                            :max="selectedFilterData.max"
                            :group="selectedFilterData.value"
                        />
                    </div>
                    <div class="w-full mt-auto flex [&>*]:flex-grow gap-3">
                        <BaseButton
                            :text="$t(`Reset`)"
                            styleType="outlined"
                            size="s"
                            @click="clearFilters"
                        />
                        <BaseButton
                            :text="$t(`Apply`)"
                            size="s"
                            @click="submitForm"
                        />
                    </div>
                </div>
            </template>
        </template>
    </BaseModal>
</template>

<script setup>
const props = defineProps({
    isShow: Boolean,
    filters: Array,
    values: Object,
    sort: Array,
});

const { t } = useI18n();

const filtersToShow = computed(() => {
    return [
        ...props.filters,
        {
            id: 1000,
            title: t("Sort by"),
            value: "sort",
            type: "radio",
            options: props.sort,
        },
    ];
});
const emits = defineEmits(["close", "updateFilters", "clearFilters"]);
const selectedFilter = ref(null);
const selectedFilterData = computed(() =>
    filtersToShow.value.find((el) => el.value === selectedFilter.value)
);
const submitForm = async () => {
    selectedFilter.value = null;
    emits("close");
};
const clearFilters = async () => {
    selectedFilter.value = null;
    emits("clearFilters");
};
const update = (newVal, key) => {
    emits("updateFilter", newVal, key, selectedFilter.value);
};
</script>
