<template>
    <div
        class="gridClass mb-[208px] laptop:mb-12 flex justify-center laptop:gap-12"
        @drop.prevent="dropFile"
        @dragenter.prevent
        @dragover.prevent
    >
        <div
            v-show="
                currentStep?.id !== 'confirm' &&
                !imageUploadLoading &&
                !imageUploadError
            "
            class="w-[208px] border border-transparent hidden laptop:flex"
        />
        <div
            class="laptop:max-w-[672px] w-full flex flex-col gap-6 laptop:gap-8 text-center items-center"
        >
            <div
                class="text-p8 font-medium laptop:text-[28px] leading-normal"
                v-text="
                    currentStep?.id === 'confirm'
                        ? $t(`Great! Let's Start the AI Identification`)
                        : $t('Capture or upload images of your', {
                              item:
                                  selectedCategory === 'handbag'
                                      ? $t('Bag')
                                      : selectedCategory === 'shoe'
                                      ? $t('Shoes')
                                      : selectedCategory === 'ready_to_wear'
                                      ? $t('ready to wear')
                                      : $t('Item'),
                          })
                "
            />
            <div class="flex flex-col mb-16 gap-12 w-full">
                <div
                    v-show="!imageUploadError"
                    class="w-full flex flex-col justify-center laptop:flex-row gap-4 laptop:gap-10"
                >
                    <RepairImageStep
                        v-for="(step, i) in stepperData"
                        :id="step?.id.toString()"
                        :key="step?.id"
                        :text="step?.text"
                        :isOptional="step?.optional"
                        :number="i + 1"
                        :img="images[step?.id]"
                        :isCurrent="currentStep?.id === step?.id"
                        :isLoading="imageUploadLoading"
                        @delete="deleteImage"
                        @uploadImage="uploadClicked"
                    />
                </div>
                <div ref="button">
                    <template
                        v-if="
                            currentStep?.id === 'confirm' &&
                            !imageUploadError &&
                            !imageUploadLoading
                        "
                    >
                        <div class="flex flex-col gap-10">
                            <div
                                class="text-p8 font-medium text-xl"
                                v-text="
                                    $t(
                                        'Our AI is ready to analyze and recognize your item from the uploaded photos.'
                                    )
                                "
                            />
                        </div>
                    </template>
                    <template v-if="imageUploadLoading">
                        <div
                            class="flex flex-col items-center justify-center gap-4 cursor-wait"
                        >
                            <lottie-player
                                autoplay
                                loop
                                style="width: 200px; height: 200px"
                                src="/json/loading.json"
                                speed="1"
                            />
                            <div
                                class="text-t10 font-medium text-[28px]"
                                v-text="$t('Identifying your item')"
                            />
                        </div>
                    </template>
                    <template v-else-if="imageUploadError">
                        <div
                            class="flex flex-col justify-center items-center gap-4 pb-8 mt-6 w-full"
                        >
                            <lottie-player
                                autoplay
                                loop
                                style="width: 200px; height: 200px"
                                src="/json/AINotDetect.json"
                                speed="1"
                            />
                            <div
                                class="text-t10 text-3xl"
                                v-text="imageUploadError"
                            />
                        </div>
                        <div
                            class="justify-center mt-6 gap-4 items-center hidden laptop:flex"
                        >
                            <BaseButton
                                buttonId="identify-search-item"
                                :text="$t('Search for your item')"
                                styleType="text"
                                class="w-fit"
                                @click="$emit('goToSelectManual')"
                            />
                            <BaseButton
                                buttonId="identify-try-again-item"
                                :text="$t('Try again')"
                                styleType="outlined"
                                class="w-fit"
                                @click="resetUploadImages"
                            />
                        </div>
                    </template>
                    <template v-else>
                        <div class="w-full">
                            <div
                                v-if="currentStep?.id !== 'confirm'"
                                class="flex-col justify-center gap-4 pb-4 cursor-pointer hidden laptop:flex h-[320px] bg-p1"
                                @click="uploadClicked"
                            >
                                <IconImage class="fill-p8 mx-auto" />
                                <div
                                    class="font-bold text-p8 text-opacity-20 text-3xl"
                                    v-text="$t('Drag And Drop Here')"
                                />
                                <div
                                    class="w-full flex flex-col relative text-center gap-6 mt-6"
                                >
                                    <div
                                        class="hidden laptop:flex flex-col gap-8"
                                    >
                                        <div class="border-b border-t2" />
                                        <div
                                            class="text-t10 absolute -top-3 flex justify-center w-full"
                                        >
                                            <div
                                                v-text="$t('or')"
                                                class="bg-p1 px-4"
                                            />
                                        </div>
                                        <div
                                            class="flex justify-center items-center flex-col gap-2"
                                        >
                                            <BaseButton
                                                buttonId="identify-upload-image"
                                                :text="$t('Upload Image')"
                                                size="l"
                                                class="w-fit hidden laptop:block"
                                                styleType="text"
                                                @click="uploadClicked"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    class="w-full flex-col relative text-center gap-6 mt-6 hidden laptop:flex"
                                >
                                    <BaseButton
                                        buttonId="identify-start-ai"
                                        class="w-fit mx-auto"
                                        :text="$t('Start AI Identification')"
                                        @click="uploadImages"
                                        :isDisabled="
                                            !stepperData
                                                .filter((el) => !el?.optional)
                                                .every((el) => images[el?.id])
                                        "
                                    />
                                </div>
                                <input
                                    type="file"
                                    ref="imageInput"
                                    class="hidden"
                                    accept="image/jpeg, image/png"
                                    @change="uploadFile"
                                />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div
            v-show="
                currentStep?.id !== 'confirm' &&
                !imageUploadLoading &&
                !imageUploadError
            "
            class="flex-col justify-center hidden laptop:flex"
        >
            <div class="w-[208px] border border-p2 p-6 flex-col gap-8 flex">
                <div
                    class="text-p9 text-xl text-center font-medium"
                    v-text="$t('Examples')"
                />
                <div
                    v-for="item in picFeatures"
                    :key="item?.id"
                    class="flex flex-col relative gap-2 text-center"
                >
                    <NuxtImg alt="" :src="item?.img" class="w-full" />
                    <BaseBadge
                        v-if="item?.badge?.text"
                        :text="item.badge.text"
                        size="s"
                        :color="item.badge.color"
                        class="absolute start-2 top-2 w-10"
                    />
                    <div
                        class="text-[#0D0D0D] text-sm leading-normal"
                        v-text="item.text"
                    />
                </div>
                <!-- <BaseButton size="m" styleType="text" :text="$t('Read more')" /> -->
            </div>
        </div>
        <div
            class="flex fixed bottom-0 flex-col gap-4 w-full laptop:hidden p-6 bg-p1"
            :class="imageUploadError ? '' : 'pt-2'"
        >
            <template v-if="!imageUploadError">
                <BaseButton
                    buttonId="identify-hints"
                    v-if="!imageUploadLoading"
                    :text="$t('Hints')"
                    size="m"
                    class="flex-grow"
                    styleType="text"
                    endIcon="IconArrowDown"
                    rotateIcon
                    @click="isBottomSheetShow = true"
                />
                <BaseButton
                    v-if="currentStep?.id !== 'confirm'"
                    styleType="outlined"
                    buttonId="identify-capture-or-upload-image"
                    :text="$t('Capture or Upload Image')"
                    :isDisabled="imageUploadLoading"
                    class="flex-grow"
                    @click="uploadClicked"
                />
                <BaseButton
                    buttonId="identify-start-ai"
                    :text="$t('Start AI Identification')"
                    @click="uploadImages"
                    class="flex-grow"
                    :isLoading="imageUploadLoading"
                    :isDisabled="
                        !stepperData
                            .filter((el) => !el.optional)
                            .every((el) => images[el?.id])
                    "
                />
                <!-- <BaseButton
        :text="$t('Back')"
        styleType="text"
        size="l"
        class="w-full"
        @click="$emit('back')"
        /> -->
            </template>
            <template v-else>
                <BaseButton
                    buttonId="identify-searc-for-item"
                    :text="$t('Search for your item')"
                    styleType="text"
                    class="flex-grow"
                    @click="$emit('goToSelectManual')"
                />
                <BaseButton
                    buttonId="identify-try-again"
                    :text="$t('Try again')"
                    size="l"
                    styleType="outlined"
                    class="flex-grow"
                    @click="resetUploadImages"
                />
            </template>
        </div>
        <BaseBottomSheet
            isMobileOnly
            :isShow="isBottomSheetShow"
            @close="isBottomSheetShow = false"
            :title="$t('Hints')"
        >
            <template #body>
                <div class="flex flex-col gap-10 text-justify w-full">
                    <div class="grid grid-cols-2 gap-8">
                        <div
                            v-for="item in picFeatures"
                            :key="item?.id"
                            class="flex flex-col relative gap-2 text-center"
                        >
                            <NuxtImg alt="" :src="item?.img" class="w-full" />
                            <BaseBadge
                                v-if="item?.badge?.text"
                                :text="item.badge.text"
                                size="s"
                                :color="item.badge.color"
                                class="absolute start-2 top-2 w-10"
                            />
                            <div
                                class="text-[#0D0D0D] text-sm leading-normal"
                                v-text="item.text"
                            />
                        </div>
                    </div>
                    <div class="w-full flex [&>*]:w-full gap-3">
                        <BaseButton
                            buttonId="identify-cancel"
                            :text="$t('Cancel')"
                            styleType="outlined"
                            size="s"
                            @click="isBottomSheetShow = false"
                        />
                    </div>
                </div>
            </template>
        </BaseBottomSheet>
    </div>
</template>

<script setup>
import Compressor from 'compressorjs';

const props = defineProps({
    selectedCategory: String,
    category: String,
    imageUploadError: String,
});

const imageUploadLoading = ref(false);

// const additionalImages = ref([
//   {id: 1, text: 'Front', optional: false},
//   {id: 2, text: 'Side', optional: false},
// ])
const stepperData = ref([
    {
        id: 0,
        text: 'Front',
        optional: false,
    },
    {
        id: 1,
        text: 'Label',
        optional: true,
    },
]);

const route = useRoute();
const { product } = useItem();
const productDetail = ref(null);
const productCategory = ref('');
setTimeout(async () => {
    if (route.params?.id) {
        const { data, error } = await product(route.params?.id);
        productDetail.value = data.value;
        productCategory.value = data.value?.category?.name;
    }
}, 500);

const emits = defineEmits(['imagesUploaded', 'uploadImage', 'resetError']);

const { t } = useI18n();

const isBottomSheetShow = ref(false);
const maximumImageSizeInMB = 5;
const minimumImageSizeInMB = 0.02;

const images = reactive({});

const button = ref();

const picFeatures = computed(() => {
    if (productCategory.value === 'Handbag') {
        return [
            {
                id: 0,
                text: t('Front'),
                img: '/img/repair/hints/bag-front.webp',
            },
            {
                id: 1,
                text: t('Label'),
                img: '/img/repair/hints/bag-label.webp',
            },
        ];
    } else if (productCategory.value === 'Shoe') {
        return [
            {
                id: 0,
                text: t('Front'),
                img: '/img/repair/hints/shoe-front.webp',
            },
            {
                id: 1,
                text: t('Label'),
                img: '/img/repair/hints/shoe-label.webp',
            },
        ];
    } else if (productCategory.value === 'Ready to Wear') {
        return [
            {
                id: 0,
                text: t('Front'),
                img: '/img/repair/hints/wear-front.webp',
            },
            {
                id: 1,
                text: t('Label'),
                img: '/img/repair/hints/wear-label.webp',
            },
        ];
    } else {
        return [];
    }
});

const currentStep = computed(() =>
    stepperData?.value.find((el) => !images[el?.id])
);

stepperData?.value.forEach((el) => {
    images[el?.id] = null;
});

const imageInput = ref();

const uploadImages = async () => {
    const { file, editProduct } = useItem();
    imageUploadLoading.value = true;
    //// send images to file api
    let files = [];
    const formFile = new FormData();
    formFile.append('file', images[0]);
    const { data, error } = await file({ body: formFile });
    if (data.value) {
        files.push({ type: 'FRONT', fileId: data.value?.id });
    } else {
    }
    if (images[1]) {
        const formFile2 = new FormData();
        formFile2.append('file', images[1]);
        const { data } = await file({ body: formFile2 });
        if (data.value) {
            files.push({ type: 'LABEL', fileId: data.value?.id });
        }
    }
    //// edit product images
    const { data: productData, error: productError } = await editProduct(
        route.params?.id,
        { body: { images: files, problems: [] } }
    );
    if (productData.value) {
        emits('imagesUploaded');
    }
    button.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
    imageUploadLoading.value = false;
};

const uploadClicked = () => {
    imageInput.value.click();
};

const dropFile = (e) => {
    addPhoto(e.dataTransfer.files[0]);
};

const uploadFile = () => {
    addPhoto(imageInput.value.files[0]);
};

const addPhoto = (photo) => {
    // console.dir(photo)
    if (photo?.type !== 'image/jpeg' && photo?.type !== 'image/png') {
        const { create } = useToast();
        create({
            id: Math.random(),
            type: 'danger',
            title: t('Your image format is not supported'),
            desc: t('We just support PNG and JPG.'),
            noClose: true,
            time: 5,
        });
    } else if ( +photo.size > + maximumImageSizeInMB * 1024 * 1024) {
        const { create } = useToast();

        create({
            id: Math.random(),
            type: 'danger',
            title: t(
                `Your image exceeds the size limit of ${maximumImageSizeInMB} MB.`
            ),
            noClose: true,
            time: 5,
        });

        
    } else if (+photo.size < +minimumImageSizeInMB * 1024 * 1024) {
        const { create } = useToast();
        create({
            id: Math.random(),
            type: 'danger',
            title: t(
                `Images must be at least ${
                    minimumImageSizeInMB * 1000
                } KB in size.`
            ),
            noClose: true,
            time: 5,
        });
    } else {
        new Compressor(photo, {
            quality: 0.6,
            maxHeight: 1200,
            maxWidth: 1200,
            mimeType: 'image/jpeg',
            success(result) {
                images[currentStep.value?.id] = new File(
                    [result],
                    result.name,
                    {
                        type: 'image/jpeg',
                    }
                );
            },
            error(err) {},
        });
    }
    imageInput.value.value = null;
};

const deleteImage = (id) => {
    if (!props.imageUploadLoading) {
        images[id] = null;
        imageInput.value.value = null;
    }
};

const resetUploadImages = () => {
    stepperData?.value.forEach((el) => {
        images[el?.id] = null;
    });
    emits('resetError');
};
</script>
