<template>
    <div class="flex flex-col gap-4 py-4 border-t border-t1 w-full">
        <div
            class="flex justify-between items-center cursor-pointer"
            @click="toggleOpen"
        >
            <div
                v-text="
                    data.title.charAt(0).toUpperCase() + data.title.slice(1)
                "
            />
            <IconArrowDown
                class="w-5 h-5"
                :class="isOpen ? 'rotate-180' : ''"
            />
        </div>
        <div
            v-show="isOpen"
            class="flex flex-col gap-6 max-h-[200px] overflow-y-auto"
        >
            <template
                v-if="
                    data.type === 'checkbox' &&
                    data.options &&
                    Array.isArray(data.options)
                "
            >
                <MarketCheckboxRow
                    v-for="option in data.options"
                    :key="option.id"
                    :text="option.id.name"
                    :slug="option.id.slug"
                    :count="option.count"
                    :value="option.value.slug"
                    :modelValue="values[option.value.slug || option.value.name]"
                    :values="values"
                    :group="data.value"
                    :type="data.title"
                    :subMenues="option.value.categories"
                    @update:modelValue="update"
                />
            </template>
            <template
                v-if="
                    data.type === 'radio' &&
                    data.options &&
                    Array.isArray(data.options)
                "
            >
                <MarketRadioButtonRow
                    v-for="option in data.options"
                    :key="option.id"
                    :text="option.text"
                    :count="option.count"
                    :value="option.value"
                    :modelValue="values[option.value]"
                    :group="data.value"
                    @update:modelValue="updateRadio"
                />
            </template>
            <template v-else-if="data.type === 'slider'">
                <MarketSliderRow
                    :min="data.min"
                    :max="data.max"
                    :group="data.value"
                />
            </template>
        </div>
        <div v-show="!isOpen && selectedOptions?.length > 0">
            <div class="text-t3 text-sm line-clamp-1">
                <template
                    v-if="data.type === 'checkbox' || data.type === 'radio'"
                >
                    <template
                        v-for="(option, i) in selectedOptions"
                        :key="option"
                    >
                        <span v-text="option?.replaceAll('-', ' ')" />
                        <span
                            v-if="i < selectedOptions?.length - 1"
                            v-text="`, `"
                        />
                    </template>
                </template>
                <template v-else-if="data.type === 'slider'">
                    <template
                        v-for="(option, i) in selectedOptions"
                        :key="option"
                    >
                        <span v-if="option" v-text="'£' + option" />
                        <span
                            v-if="
                                i < selectedOptions?.length - 1 &&
                                (selectedOptions[0] || selectedOptions[1])
                            "
                            v-text="' ' + $t(`to`) + ' '"
                        />
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['updateFilter']);
const props = defineProps({
    data: Object,
    values: Object,
    isInitialyOpen: Boolean,
});

const isOpen = ref(props.isInitialyOpen);
const toggleOpen = () => {
    isOpen.value = !isOpen.value;
};
const router = useRouter();
const route = useRoute();

const selectedOptions = computed(() => {
    const query = router.currentRoute.value.query[props?.data?.value];
    if (props?.data?.type === 'checkbox' || props?.data?.type === 'radio') {
        let test = null;
        props?.data.options.forEach((el) => {
            if (el.value.slug === route.params.id) {
                test = el.value.slug;
            } else if (el.value.categories) {
                el.value.categories.forEach((element) => {
                    if (element.slug === route.params.id) {
                        test = element.slug;
                    }
                });
            }
        });
        if (query || test) {
            if (Array.isArray(query)) {
                query.push(test);
                return query;
            } else {
                return [query, test];
            }
        }
    } else if (props?.data?.type === 'slider') {
        return query?.split('-') || [];
    } else {
        return [];
    }
});

const update = (newVal, key) => {
    emits('updateFilter', newVal, key, props.data.value);
};
const updateRadio = (newVal, key) => {
    emits('updateFilter', newVal, key, props.data.value);
    Object.keys(props.values || {})
        .filter((el) => el !== key)
        ?.forEach((key) => {
            emits('updateFilter', false, key, props.data.value);
        });
};
</script>
