<template>
    <div class="gridClass mb-6 laptop:mb-12">
        <div
            class="laptop:max-w-[802px] mx-auto w-full flex flex-col gap-6 laptop:gap-10 text-center items-center"
        >
            <div class="flex flex-col gap-4 text-p8">
                <div
                    class="font-medium laptop:text-[28px] leading-normal"
                    v-text="$t('Checking the items that need repairs')"
                />
                <div
                    class="text-sm laptop:text-lg"
                    v-text="
                        $t(
                            'Our AI has tracked the specified items, if there are others we have missed please select yourself (For some items, you can specify a number)'
                        )
                    "
                />
            </div>
            <div class="w-full flex flex-col gap-16">
                <div class="flex flex-col gap-10 w-full items-center">
                    <div class="flex flex-col gap-10 w-full">
                        <repairIssueCategory
                            v-for="issueCategory in issues?.data"
                            :key="issueCategory.id"
                            v-model="suggestedIssues.details"
                            :details="issueCategory"
                        />
                    </div>
                    <div
                        v-if="selectedCategory !== 'clothes'"
                        class="w-full flex flex-col gap-6"
                    >
                        <div
                            v-text="'Colour change'"
                            class="w-full text-start text-lg"
                        />
                        <div
                            class="w-full p-3 bg-p1 flex flex-col gap-4 rounded-xl"
                            :class="
                                colorChangeSelected ? 'border-2 border-p7' : ''
                            "
                        >
                            <BaseInputCheckbox
                                v-model="colorChangeSelected"
                                hasIcon
                                text="Colour change or dye"
                            />
                            <div
                                v-if="colorChangeSelected"
                                class="flex flex-col gap-4"
                            >
                                <div
                                    v-text="
                                        'please simply Select the new colour:'
                                    "
                                    class="text-t6 text-sm w-full text-start"
                                />
                                <div
                                    class="grid grid-cols-4 mobile-s:grid-cols-5 mobile-m:grid-cols-6 mobile-l:grid-cols-7 tablet:grid-cols-11 gap-4 w-full bg-p1 flex-wrap"
                                >
                                    <RepairColor
                                        v-for="color in suggestedColors"
                                        :key="color.id"
                                        :value="color.text"
                                        :isSelected="
                                            selectedColor === color.text
                                        "
                                        @click="selectedColor = color.text"
                                        :rgb="color.rgb"
                                        :text="color.text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-6">
                        <div
                            v-text="'Custom work'"
                            class="w-full text-start text-lg"
                        />
                        <div
                            class="w-full px-4 py-3 bg-[#65ACF01A] flex items-center justify-between gap-4 rounded-xl"
                        >
                            <div
                                v-text="
                                    'Only for custom work please simply call us.'
                                "
                                class="text-[#0D0D0D]"
                            />
                            <a
                                href="/contact"
                                target="_blank"
                                class="rounded-full"
                            >
                                <BaseButton
                                    text="Call Us"
                                    size="s"
                                    classes="!bg-info"
                                />
                            </a>
                        </div>
                    </div>
                    <BaseInputTextarea
                        :maxlength="1000"
                        :label="`*Anything we need to know about your ${selectedCategory}`"
                        v-model="description"
                        :placeholder="$t('Description')"
                        class="w-full"
                    />
                </div>
            </div>
            <div
                class="flex gap-4 w-full justify-center [&>*]:w-full laptop:[&>*]:w-[120px]"
            >
                <BaseButton
                    buttonId="identify-select-issues"
                    styleType="outlined"
                    :text="$t('Back')"
                    @click="$emit('back')"
                />
                <BaseButton
                    buttonId="identify-back-issues"
                    :text="$t('Next')"
                    @click="selectIssues"
                    :isDisabled="!description"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    selectedCategory: String,
    suggestedIssues: Object,
    desc: String,
});
const { problems } = useItem();
const { data: issues } = problems(1, 50, props.selectedCategory);
const emits = defineEmits(['issuesSelected']);
const { t } = useI18n();

const description = ref(props.desc || '');
const colorChangeSelected = ref(false);

const selectedColor = ref(null);
const suggestedColors = ref([
    { id: 0, value: 'Black', text: t('Black'), rgb: '#000000' },
    { id: 1, value: 'White', text: t('White'), rgb: '#ffffff' },
    { id: 2, value: 'Gray', text: t('Gray'), rgb: '#A3A3A3' },
    { id: 3, value: 'Yellow', text: t('Yellow'), rgb: '#F5CF06' },
    { id: 5, value: 'Olive', text: t('Olive'), rgb: '#7B9925' },
    { id: 5, value: 'Green', text: t('Green'), rgb: '#0B8110' },
    { id: 3, value: 'Red', text: t('Red'), rgb: '#FF1414' },
    { id: 3, value: 'Pink', text: t('Pink'), rgb: '#FF68B3' },
    { id: 4, value: 'Purple', text: t('Purple'), rgb: '#7C0E8D' },
    { id: 6, value: 'Blue', text: t('Blue'), rgb: '#1163DF' },
    { id: 7, value: 'Teal', text: t('Teal'), rgb: '#0CBBBB' },
    { id: 8, value: 'Brown', text: t('Brown'), rgb: '#673302' },
    { id: 9, value: 'Beige', text: t('Beige'), rgb: '#C7A685' },
    { id: 10, value: 'Cream', text: t('Cream'), rgb: '#FDF4DF' },
]);

const selectIssues = () => {
    const details = {};
    Object.keys(props.suggestedIssues.details)
        .filter((key) => props.suggestedIssues.details[key])
        .forEach(
            (el) =>
                (details[el] = Number.isInteger(
                    props.suggestedIssues.details[el]
                )
                    ? props.suggestedIssues.details[el]
                    : props.suggestedIssues.details[el]
                    ? 1
                    : 0)
        );
    const payload = {
        details: details,
        description: description.value,
    };
    if (selectedColor.value) {
        payload.changedColor = selectedColor.value;
    }
    emits('issuesSelected', payload);
};

watch(
    () => colorChangeSelected.value,
    () => (selectedColor.value = null)
);
</script>
