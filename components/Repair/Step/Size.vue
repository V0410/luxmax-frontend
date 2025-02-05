<template>
    <div class="gridClass mb-6 laptop:mb-12">
        <div
            ref="container"
            class="laptop:max-w-[672px] mx-auto w-full flex flex-col gap-6 laptop:gap-10 text-center items-center"
        >
            <template v-if="!isAddSizeManual">
                <div class="w-full flex flex-col gap-12">
                    <div
                        class="text-p8 font-medium laptop:text-[28px] leading-normal"
                        v-text="steps[currentStep]?.label"
                    />
                    <div class="w-full flex flex-col gap-16">
                        <div class="flex flex-col gap-12 w-full items-center">
                            <div
                                class="flex flex-col items-center gap-12 w-full"
                            >
                                <!-- <NuxtImg alt=""
                  class="w-[200px]"
                  :src="maskImage || steps[currentStep]?.img"
                  format="webp"
                  quality="100"
                /> -->
                                <div
                                    v-if="selectedCategory !== 'handbag'"
                                    class="laptop:p-6 w-full"
                                >
                                    <div
                                        class="p-4 bg-p1 flex flex-col laptop:flex-row gap-2.5 w-full items-center text-start"
                                    >
                                        <div
                                            class="text-t7"
                                            v-text="
                                                $t(
                                                    'Having trouble with sizing, you can refer to size guidelines.'
                                                )
                                            "
                                        />
                                        <div
                                            class="flex justify-end w-full laptop:w-fit"
                                        >
                                            <NuxtLink
                                                target="_blank"
                                                :to="{
                                                    name:
                                                        selectedCategory.toLowerCase() ===
                                                        'shoe'
                                                            ? 'shoe-guide'
                                                            : selectedCategory.toLowerCase() ===
                                                                  'ready to wear' ||
                                                              selectedCategory ===
                                                                  'Clothes'
                                                            ? 'ready_to_wear-women-guide'
                                                            : '',
                                                }"
                                            >
                                                <BaseButton
                                                    buttonId="identify-size-guide"
                                                    startIcon="IconRuler"
                                                    :text="$t('Size Guide')"
                                                    styleType="text"
                                                />
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <BaseSegmentedButton
                                        v-model="sizeUnit"
                                        :options="segemntedOptions"
                                        size="s"
                                    />
                                </div>
                            </div>
                            <div
                                class="grid gap-4 w-full mx-auto"
                                :class="
                                    selectedCategory === 'handbag'
                                        ? 'laptop:grid-cols-2'
                                        : 'grid-cols-2 laptop:grid-cols-4'
                                "
                            >
                                <RepairSize
                                    v-for="size in sizes[sizeUnit]"
                                    :key="size?.id"
                                    :isSelected="selectedSize === size?.value"
                                    @click="selectedSize = size?.value"
                                    class="min-w-full laptop:min-w-[110px]"
                                    :text="size?.text"
                                    :desc="size?.desc"
                                />
                            </div>
                            <div
                                v-if="
                                    selectedCategory !== 'shoe' &&
                                    currentStep === 0
                                "
                                class="hidden w-full justify-end"
                            >
                                <BaseButton
                                    size="m"
                                    buttonId="identify-know-size"
                                    styleType="text"
                                    :text="
                                        $t('I know Actual Size of my', {
                                            item:
                                                selectedCategory === 'handbag'
                                                    ? $t('bag')
                                                    : selectedCategory.toLowerCase() ===
                                                      'ready to wear'
                                                    ? $t('cloth')
                                                    : $t('item'),
                                        })
                                    "
                                    @click="isAddSizeManual = true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="w-full flex flex-col gap-12">
                    <div
                        class="text-p8 font-medium laptop:text-[28px] leading-normal"
                        v-text="steps[currentStep]?.label"
                    />
                    <div class="w-full flex flex-col gap-16">
                        <div class="flex flex-col gap-12 w-full items-center">
                            <div
                                class="flex flex-col items-center gap-12 w-full"
                            >
                                <NuxtImg
                                    alt=""
                                    v-if="selectedCategory === 'handbag'"
                                    class="w-[200px]"
                                    src="/img/repair/manualSize-bag.webp"
                                    format="webp"
                                    quality="100"
                                />
                                <div
                                    v-else-if="
                                        selectedCategory === 'ready_to_wear'
                                    "
                                    class="flex flex-col w-full gap-6"
                                >
                                    <NuxtImg
                                        alt=""
                                        class="w-full"
                                        src="/img/repair/manualSize-cloth-man.webp"
                                        format="webp"
                                        quality="100"
                                    />
                                    <NuxtImg
                                        alt=""
                                        class="w-full"
                                        src="/img/repair/manualSize-cloth-woman.webp"
                                        format="webp"
                                        quality="100"
                                    />
                                </div>
                                <div
                                    v-if="selectedCategory !== 'handbag'"
                                    class="laptop:p-6 w-full"
                                >
                                    <div
                                        class="p-4 bg-p1 flex gap-2.5 w-full items-center text-start"
                                    >
                                        <div
                                            class="text-t7"
                                            v-text="
                                                $t(
                                                    'Including all the details is not compulsory, but doing so can assist prospective buyers in making a decision about your product.'
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                                <div
                                    class="flex flex-col gap-8 w-full items-center"
                                >
                                    <div class="w-fit">
                                        <BaseSegmentedButton
                                            v-model="manualSizeUnit"
                                            :options="manualSizingUnitOptions"
                                            size="s"
                                        />
                                    </div>
                                    <div
                                        class="grid gap-x-4 gap-y-8 w-full mx-auto laptop:grid-cols-2"
                                    >
                                        <template
                                            v-if="
                                                selectedCategory ==
                                                'ready_to_wear'
                                            "
                                        >
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.shoulder
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Shoulder Width ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 16.7')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.chest
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Chest/Bust ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 7.3')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.waist
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Waist ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.hips
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Hips ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.sleeve
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Sleeve Length ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.dressLength
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Dress Length ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    readyToWearManualSizing.skirtLength
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Pant/Skirt Length ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                        </template>
                                        <template
                                            v-else-if="
                                                selectedCategory == 'handbag'
                                            "
                                        >
                                            <BaseInput
                                                v-model="bagManualSizing.height"
                                                :maxlength="30"
                                                :label="
                                                    $t('Height ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 16.7')"
                                            />
                                            <BaseInput
                                                v-model="bagManualSizing.width"
                                                :maxlength="30"
                                                :label="
                                                    $t('Width ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 7.3')"
                                            />
                                            <BaseInput
                                                v-model="bagManualSizing.depth"
                                                :maxlength="30"
                                                :label="
                                                    $t('Depth ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                            <BaseInput
                                                v-model="
                                                    bagManualSizing.handleDrop
                                                "
                                                :maxlength="30"
                                                :label="
                                                    $t('Handle Drop ()', {
                                                        unit: unit,
                                                    })
                                                "
                                                :placeholder="$t('e.g 2.5')"
                                            />
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div
                class="laptop:mt-16 flex gap-4 w-full justify-center [&>*]:w-full laptop:[&>*]:w-[120px]"
            >
                <BaseButton
                    buttonId="identify-back-size"
                    styleType="outlined"
                    :text="$t('Back')"
                    @click="currentStep > 0 ? currentStep-- : $emit('back')"
                />
                <BaseButton
                    buttonId="identify-select-size"
                    :text="$t('Next')"
                    @click="selectSize"
                    :isDisabled="isAddSizeManual ? false : !selectedSize"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    selectedCategory: String,
    sizes: Array,
    selectedSize: String,
    maskImage: String,
    steps: Array,
    segemntedOptions: Array,
    manualSizingUnitOptions: Array,
});

const emits = defineEmits(['sizeSelected']);

const selectedSize = ref(props?.selectedSize);

const isAddSizeManual = ref(false);

const currentStep = ref(0);

const container = ref();

const scrollToTop = () => {
    window.scrollTo({
        top: container?.value?.offsetTop - 100,
        behavior: 'smooth',
    });
};

watch(
    () => currentStep.value,
    () => {
        scrollToTop();
    }
);

const selectedSizes = ref({});

const manualSizeUnit = ref(props?.manualSizingUnitOptions[0]?.value);
const sizeUnit = ref(props?.segemntedOptions[0]?.value);

const bagManualSizing = reactive({
    height: '',
    width: '',
    depth: '',
    handleDrop: '',
});

const readyToWearManualSizing = reactive({
    shoulder: '',
    chest: '',
    waist: '',
    hips: '',
    sleeve: '',
    dressLength: '',
    skirtLength: '',
});

const selectSize = () => {
    emits('sizeSelected', selectedSize);
};
</script>
