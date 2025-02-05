<template>
    <div>
        <div
            class="bg-identify w-full h-[full] overflow-x-hidden bg-no-repeat bg-cover relative hidden laptop:block"
        >
            <div
                class="flex h-full text-center backdrop-blur-[6px] text-white bg-black bg-opacity-20 p-10 flex-col gap-10 w-fit mx-auto"
            >
                <div
                    class="font-title font-medium text-5xl uppercase select-none"
                    v-text="
                        step === 1
                            ? $t('Start Point')
                            : step === 10
                            ? $t('Choose Offer')
                            : $t(`Identify`)
                    "
                />
                <h1
                    class="text-xl text-p2 select-none"
                    v-text="
                        step === 10
                            ? $t(
                                  'Kindly indicate your preferred course of action for your exquisite possession.'
                              )
                            : $t(
                                  `Luxmax AI is capable of quickly detecting your valuable items.`
                              )
                    "
                />
            </div>
        </div>
        <div
            ref="container"
            class="pt-6 laptop:pt-12 flex flex-col items-center"
        >
            <div class="gridClass mb-4 laptop:hidden">
                <BaseBreadcrumb
                    :dataArray="breadcrumbData"
                    class="w-full laptop:max-w-[672px]"
                />
            </div>
            <RepairStepStart v-if="step === 1" @startRepair="startRepair" />
            <RepairStepSelectItem
                v-else-if="step === 2"
                @itemSelected="itemSelected"
            />
            <RepairStepUploadImage
                v-else-if="step === 3"
                @imagesUploaded="imagesUploaded"
            />
            <RepairStepSuggestModels
                v-else-if="step === 4"
                @modelSelected="modelSelected"
                :selectedCategory="productInfo.category.name"
                @loading="loadingSuggestModels = true"
                @loaded="loadingSuggestModels = false"
                @back="goToStep(4)"
            />
            <RepairStepSelectModel
                v-else-if="step === 5"
                :isLoading="isLoading"
                :model="AISuggest?.brand"
                @modelEnterd="modelEnterd"
                @back="goToStep(4)"
            />
            <RepairStepMaterialAndColor
                v-else-if="step === 6"
                :selectedColor="AISuggest?.exteriorColor"
                :selectedMaterial="AISuggest?.exteriorMaterial"
                @materialAndColorSelected="materialAndColorSelected"
                @back="goToStep(5)"
            />
            <RepairStepSize
                v-else-if="step === 7"
                :selectedCategory="productInfo.category.name"
                :maskImage="form.image"
                :sizes="suggestedSizes"
                :steps="sizingSteps"
                :selectedSize="form.size"
                :segemntedOptions="segemntedOptions"
                :manualSizingUnitOptions="manualSizingUnitOptions"
                @sizeSelected="sizeSelected"
                @back="goToStep(6)"
            />
            <RepairStepIssues
                v-else-if="step === 8"
                :selectedCategory="productInfo.category.slug"
                :suggestedIssues="suggestedIssues"
                :desc="form.problems?.description"
                @issuesSelected="issuesSelected"
                @back="sizingSteps.length > 0 ? goToStep(7) : goToStep(6)"
            />
            <RepairStepConfirm
                v-else-if="step === 9"
                :data="informations"
                :isLoading="isLoading"
                @confirm="confirm"
                @back="goToStep(8)"
            />
            <RepairStepOffer
                v-else-if="step === 10"
                :product="productInfo"
                :maskImage="form.image"
                :offerOptions="offerOptions"
                @offerSelected="offerSelected"
            />
            <RepairStepAdditionalImages
                v-else-if="step === 11"
                :additionalImages="additionalImages"
                @back="goToStep(10)"
                @next="
                    (img) => {
                        uploadAdditionalImages(img);
                    }
                "
            />
            <RepairStepFinal
                v-else-if="step === 12"
                :offers="offer"
                :selectedOffer="form.selectedOffer"
                @back="
                    form.selectedOffer == 'Repair and Sell in our community' ||
                    form.selectedOffer == 'Sell without repair'
                        ? goToStep(11)
                        : goToStep(10)
                "
            />
            <template v-if="step === 4 && loadingSuggestModels">
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
        </div>
        <!-- {{ form }} -->
        <!-- {{ offer }} -->
        <!-- {{ plans }} -->
    </div>
</template>

<script setup>
definePageMeta({
    name: 'identify-id',
    middleware: ['auth'],
    layout: 'header',
});

useHead({
    title: `LuxMax Identify: Discover with Precision`,
    meta: [
        {
            name: 'title',
            content: `Identify Your Luxury Item | LuxMax`,
        },
        {
            name: 'description',
            content:
                'Not sure what luxury product you have? The LuxMax team can provide free authentication and appraisals for your designer items.',
        },
    ],
});

const loadingSuggestModels = ref(true);
const config = useRuntimeConfig();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const productInfo = ref(null);
const container = ref();
const informations = ref({
    brandId: null,
    material: null,
    color: null,
    size: null,
    problems: [],
    images: [],
    brand: null,
    changedColor: null,
});

//// set step

const getProduct = async () => {
    const { product } = useItem();
    const { data: productDetail, error } = await product(route.params?.id);
    productInfo.value = productDetail?.value;
    switch (productDetail.value?.step) {
        case 'INITIAL':
            goToStep(2);
            router.push({ query: { step: step.value } });
            break;
        case 'IDENTIFY':
            goToStep(3);
            router.push({ query: { step: step.value } });
            break;
        case 'CONFIRM_INFO':
            goToStep(4);
            router.push({ query: { step: step.value } });
            break;
        case 'CHOOSE_PLAN':
            goToStep(10);
            router.push({ query: { step: step.value } });
            break;
        case 'REPAIR_REVIEW':
            goToStep(12);
            router.push({ query: { step: step.value } });
            break;
        case 'ADD_ADDITIONAL_IMAGES':
            goToStep(11);
            router.push({ query: { step: step.value } });
            break;
    }
};

if (route.params?.id) {
    setTimeout(() => {
        getProduct();
    }, 500);
}

//// step and form

const step = ref(3);
const isLoading = ref(false);
const AISuggest = ref(null);

const form = reactive({
    image: null,
    details: {},
    problems: {},
});

//// step 1 start repair

const startRepair = () => {
    //// change step
    goToStep(2);
};

//// step 2 select your item

const itemSelected = async (id) => {
    router.push(`/identify?id=${id}`);
    goToStep(3);
};

//// step 3 upload images

const imagesUploaded = () => {
    loadingSuggestModels.value = true;
    goToStep(4);
};

//// step 4 suggest products

const modelSelected = (model) => {
    AISuggest.value = model;
    goToStep(5);
};

//// step 5 select model

const modelEnterd = async (model) => {
    isLoading.value = true;
    const { brands } = useItem();
    const { data } = await brands(1, 50);
    data.value.data.forEach((el) => {
        if (el.name === model.brand_name) {
            informations.value.brandId = model.brandId;
            informations.value.brand = model.brand_name;
            AISuggest.value.brand = model.brand_name;
        }
    });
    goToStep(6);
    isLoading.value = false;
};

//// step 6 select material and color

const materialAndColorSelected = (details) => {
    informations.value.color = details?.color.value;
    informations.value.material = details?.material.value;
    AISuggest.value.exteriorColor = details?.color.value;
    AISuggest.value.exteriorMaterial = details?.material.value;
    if (
        productInfo.value.category.name.toLowerCase() == 'handbag' ||
        productInfo.value.category.name.toLowerCase() == 'bags'
    ) {
        goToStep(8);
    } else {
        goToStep(7);
    }
};

//// step 7 select size

const sizeSelected = (payload) => {
    informations.value.size = payload;
    goToStep(8);
};

const manualSizingUnitOptions = [
    { id: 0, text: 'inch', value: 'inch' },
    { id: 1, text: 'cm', value: 'cm' },
];

const sizingSteps = computed(() => {
    if (productInfo.value.category.name === 'handbag') {
        return [];
    } else if (
        productInfo.value.category.name === 'ready_to_wear' ||
        productInfo.value.category.name === 'Clothes'
    ) {
        return [
            {
                id: 'size',
                label: t('Submit Item Size'),
                img: '/img/repair/readyToWear.webp',
            },
        ];
    } else if (productInfo.value.category.name === 'shoe') {
        return [
            {
                id: 'size',
                label: t('Submit Item Size'),
                img: '/img/repair/upper-shoe.webp',
            },
        ];
    } else {
        return [];
    }
});

const segemntedOptions = computed(() => {
    if (productInfo.value.category.name === 'handbag') {
        return [];
    } else if (
        productInfo.value.category.name.toLowerCase() === 'ready to wear' ||
        productInfo.value.category.name === 'Clothes'
    ) {
        return [
            { id: 0, text: t('Text'), value: 'text' },
            { id: 1, text: t('Numeric'), value: 'numeric' },
        ];
    } else if (
        productInfo.value.category.name === 'Shoe' ||
        productInfo.value.category.name === 'Shoes'
    ) {
        return [
            { id: 0, text: 'UK', value: 'uk' },
            { id: 1, text: 'EU', value: 'eu' },
        ];
    } else {
        return [];
    }
});

const suggestedSizes = computed(() =>
    productInfo.value.category.name.toLowerCase() === 'shoe' ||
    productInfo.value.category.name.toLowerCase() === 'shoes'
        ? {
              uk: [
                  { id: 0, value: '2.5', text: '2.5', desc: 'UK' },
                  { id: 1, value: '3', text: '3', desc: 'UK' },
                  { id: 2, value: '3.5', text: '3.5', desc: 'UK' },
                  { id: 3, value: '4', text: '4', desc: 'UK' },
                  { id: 4, value: '4.5', text: '4.5', desc: 'UK' },
                  { id: 5, value: '5', text: '5', desc: 'UK' },
                  { id: 6, value: '5.5', text: '5.5', desc: 'UK' },
                  { id: 7, value: '6', text: '6', desc: 'UK' },
                  { id: 8, value: '6.5', text: '6.5', desc: 'UK' },
                  { id: 9, value: '7', text: '7', desc: 'UK' },
                  { id: 10, value: '7.5', text: '7.5', desc: 'UK' },
                  { id: 11, value: '8', text: '8', desc: 'UK' },
                  { id: 12, value: '8.5', text: '8.5', desc: 'UK' },
                  { id: 13, value: '9', text: '9', desc: 'UK' },
                  { id: 14, value: '9.5', text: '9.5', desc: 'UK' },
                  { id: 15, value: '10', text: '10', desc: 'UK' },
                  { id: 16, value: '10.5', text: '10.5', desc: 'UK' },
                  { id: 17, value: '11', text: '11', desc: 'UK' },
                  { id: 18, value: '11.5', text: '11.5', desc: 'UK' },
                  { id: 19, value: '12', text: '12', desc: 'UK' },
                  { id: 20, value: '12.5', text: '12.5', desc: 'UK' },
                  { id: 21, value: '13', text: '13', desc: 'UK' },
              ],
              eu: [
                  { id: 0, value: '35.5', text: '35.5', desc: 'EU' },
                  { id: 1, value: '36', text: '36', desc: 'EU' },
                  { id: 2, value: '36.5', text: '36.5', desc: 'EU' },
                  { id: 3, value: '37', text: '37', desc: 'EU' },
                  { id: 4, value: '37.5', text: '37.5', desc: 'EU' },
                  { id: 5, value: '38', text: '38', desc: 'EU' },
                  { id: 6, value: '38.5', text: '38.5', desc: 'EU' },
                  { id: 7, value: '39', text: '39', desc: 'EU' },
                  { id: 8, value: '39.5', text: '39.5', desc: 'EU' },
                  { id: 9, value: '40', text: '40', desc: 'EU' },
                  { id: 10, value: '40.5', text: '40.5', desc: 'EU' },
                  { id: 11, value: '41', text: '41', desc: 'EU' },
                  { id: 12, value: '41.5', text: '41.5', desc: 'EU' },
                  { id: 13, value: '42', text: '42', desc: 'EU' },
                  { id: 14, value: '42.5', text: '42.5', desc: 'EU' },
                  { id: 15, value: '43', text: '43', desc: 'EU' },
                  { id: 16, value: '43.5', text: '43.5', desc: 'EU' },
                  { id: 17, value: '44', text: '44', desc: 'EU' },
                  { id: 18, value: '44.5', text: '44.5', desc: 'EU' },
                  { id: 19, value: '45', text: '45', desc: 'EU' },
                  { id: 20, value: '45.5', text: '45.5', desc: 'EU' },
                  { id: 21, value: '46', text: '46', desc: 'EU' },
              ],
          }
        : productInfo.value.category.name.toLowerCase() === 'ready to wear' ||
          productInfo.value.category.name.toLowerCase() === 'clothes'
        ? {
              numeric: [
                  { id: 0, value: '2.5', text: '2.5' },
                  { id: 1, value: '3', text: '3' },
                  { id: 2, value: '3.5', text: '3.5' },
                  { id: 3, value: '4', text: '4' },
                  { id: 4, value: '4.5', text: '4.5' },
                  { id: 5, value: '5', text: '5' },
                  { id: 6, value: '5.5', text: '5.5' },
                  { id: 7, value: '6', text: '6' },
                  { id: 8, value: '6.5', text: '6.5' },
                  { id: 9, value: '7', text: '7' },
                  { id: 10, value: '7.5', text: '7.5' },
                  { id: 11, value: '8', text: '8' },
                  { id: 12, value: '8.5', text: '8.5' },
                  { id: 13, value: '9', text: '9' },
                  { id: 14, value: '9.5', text: '9.5' },
                  { id: 15, value: '10', text: '10' },
                  { id: 16, value: '10.5', text: '10.5' },
                  { id: 17, value: '11', text: '11' },
                  { id: 18, value: '11.5', text: '11.5' },
                  { id: 19, value: '12', text: '12' },
                  { id: 20, value: '12.5', text: '12.5' },
                  { id: 21, value: '13', text: '13' },
              ],
              text: [
                  { id: 0, value: 'xs', text: t('XS') },
                  { id: 1, value: 's', text: t('S') },
                  { id: 2, value: 'm', text: t('M') },
                  { id: 3, value: 'l', text: t('L') },
                  { id: 4, value: 'xl', text: t('XL') },
                  { id: 5, value: '2xl', text: t('2XL') },
                  { id: 6, value: '3xl', text: t('3XL') },
              ],
          }
        : productInfo.value.category.name.toLowerCase() === 'handbag'
        ? {
              // inch: [
              //   { id: 0, value: "0.5-2", text: "0.5-2", desc: "inch" },
              //   { id: 1, value: "2-4", text: "2-4", desc: "inch" },
              //   { id: 2, value: "4-6", text: "4-6", desc: "inch" },
              //   { id: 3, value: "6-8", text: "6-8", desc: "inch" },
              //   { id: 4, value: "8-10", text: "8-10", desc: "inch" },
              //   { id: 5, value: "10-12", text: "10-12", desc: "inch" },
              //   { id: 6, value: "12-14", text: "12-14", desc: "inch" },
              //   { id: 7, value: "14-16", text: "14-16", desc: "inch" },
              //   { id: 8, value: "16-18", text: "16-18", desc: "inch" }
              // ],
              // cm: [
              //   { id: 0, value: "0.5-2", text: "2-5", desc: "cm" },
              //   { id: 1, value: "2-4", text: "5-10", desc: "cm" },
              //   { id: 2, value: "4-6", text: "10-15", desc: "cm" },
              //   { id: 3, value: "6-8", text: "15-20", desc: "cm" },
              //   { id: 4, value: "8-10", text: "20-25", desc: "cm" },
              //   { id: 5, value: "10-12", text: "25-30", desc: "cm" },
              //   { id: 6, value: "12-14", text: "30-35", desc: "cm" },
              //   { id: 7, value: "14-16", text: "35-40", desc: "cm" },
              //   { id: 8, value: "16-18", text: "40-45", desc: "cm" }
              // ],
          }
        : {}
);

//// step 8 select issues

const issuesSelected = async (payload) => {
    Object.keys(payload.details).forEach((key) => {
        informations.value.problems.push({
            count: payload.details[key],
            problemId: key,
        });
    });
    informations.value.note = payload.description;
    informations.value.changedColor = payload.changedColor;
    const { sendNote } = useItem();
    const { data } = await sendNote({
        productId: route.params.id,
        description: payload.description,
    });
    goToStep(9);
};

const suggestedIssues = {
    details: {},
};

const issues = computed(() =>
    productInfo.value?.category?.name === 'shoe'
        ? [
              {
                  id: 'SHOE CLEANING SERVICES',
                  title: t('SHOE CLEANING SERVICES'),
                  childs: [
                      {
                          id: 'REMOVEING SCRATCHES',
                          text: t('REMOVING SCRATCHES'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CLEANING OUTSIDE',
                          text: t('CLEANING OUTSIDE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CLEANING INSIDE AND OUTSIDE',
                          text: t('CLEANING INSIDE AND OUTSIDE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'REMOVING STAIN',
                          text: t('REMOVING STAIN'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'POLISHING',
                          text: t('POLISHING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'SHOE SCUFFING, WEAR AND TEAR SERVICES',
                  title: t('SHOE SCUFFING, WEAR AND TEAR SERVICES'),
                  childs: [
                      {
                          id: 'STITICHING',
                          text: t('STITCHING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'LINING REPAIR',
                          text: t('LINING REPAIR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CLUING,EDGING REPAIR',
                          text: t('CLUING, EDGING REPAIR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'SHOE COMFORT, PROTECTION AND LONGEVITY',
                  title: t('SHOE COMFORT, PROTECTION AND LONGEVITY'),
                  childs: [
                      {
                          id: 'SHOE REHEELING',
                          text: t('SHOE REHEELING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CUSTOM WORK',
                          text: t('CUSTOM WORK'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'REPAIR ZIP',
                          text: t('REPAIR ZIP'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'NEW ZIP',
                          text: t('NEW ZIP'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'HARDWARE RELPATING',
                          text: t('HARDWARE REPLATING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SHOE RESOLING',
                          text: t('SHOE RESOLING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'REFASHION',
                  title: t('REFASHION'),
                  childs: [
                      {
                          id: 'RECOLOURING SAME COLOUR',
                          text: t('RECOLOURING SAME COLOUR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SUEDE DYE',
                          text: t('SUEDE DYE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'COLOUR CHANGE OR DYE',
                          text: t('COLOUR CHANGE OR DYE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
          ]
        : productInfo.value?.category?.name === 'ready_to_wear' ||
          productInfo.value.category.name === 'Clothes'
        ? [
              {
                  id: 'CLEANING SERVICES',
                  title: t('CLEANING SERVICES'),
                  childs: [
                      {
                          id: 'DRESS',
                          text: t('DRESS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'JACKET',
                          text: t('JACKET'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'COAT',
                          text: t('COAT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'KNITWEAR',
                          text: t('KNITWEAR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TROUSER',
                          text: t('TROUSER'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SUIT',
                          text: t('SUIT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TOPS',
                          text: t('TOPS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SHIRT',
                          text: t('SHIRT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SCARF',
                          text: t('SCARF'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'BOMBER JACKET',
                          text: t('BOMBER JACKET'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TILE',
                          text: t('TILE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'WEDDING DRESS',
                          text: t('WEDDING DRESS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'LEATHER JACKET',
                          text: t('LEATHER JACKET'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'LEATHER SKIRT',
                          text: t('LEATHER SKIRT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'LEAHTER COAT',
                          text: t('LEAHTER COAT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'LEATHER DRESS',
                          text: t('LEATHER DRESS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'REPAIRS SERVICES',
                  title: t('REPAIRS SERVICES'),
                  childs: [
                      {
                          id: 'INVISIBLE MENDING',
                          text: t('INVISIBLE MENDING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          hasCount: true,
                      },
                      {
                          id: 'RELINING SLEEVE',
                          text: t('RELINING SLEEVE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          // hasCount: true,
                      },
                      {
                          id: 'VISIBLE MENDING',
                          text: t('VISIBLE MENDING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          // hasCount: true,
                      },
                      {
                          id: 'LINGIN REPAIR',
                          text: t('LINGIN REPAIR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          // hasCount: true
                      },
                      {
                          id: 'RELINING JACKET',
                          text: t('RELINING JACKET'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          // hasCount: true
                      },
                      {
                          id: 'RELINIGN COAT',
                          text: t('RELINIGN COAT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'RELINIGN TROUSER',
                          text: t('RELINIGN TROUSER'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          // hasCount: true
                      },
                  ],
              },
              {
                  id: 'ALTERATIONS',
                  title: t('ALTERATIONS'),
                  childs: [
                      {
                          id: 'TROUSER SHORTENING',
                          text: t('TROUSER SHORTENING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TAPERING TROUSER',
                          text: t('TAPERING TROUSER'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TR WAIST IN OR OUT',
                          text: t('TR WAIST IN OR OUT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TROUSER LENGTHEN',
                          text: t('TROUSER LENGTHEN'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TROUSER PATCH',
                          text: t('TROUSER PATCH'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TROUSER STITCH',
                          text: t('TROUSER STITCH'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TROUSER NEW ZIP',
                          text: t('TROUSER NEW ZIP'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SHORTEN SLEEVS FROM CUFF',
                          text: t('SHORTEN SLEEVS FROM CUFF'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SHORTEN LENGTH',
                          text: t('SHORTEN LENGTH'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TAPRING SLEEVE',
                          text: t('TAPRING SLEEVE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CREATE HOLE BUTTON',
                          text: t('CREATE HOLE BUTTON'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          hasCount: true,
                      },
                      {
                          id: 'DRESS SHORETING',
                          text: t('DRESS SHORETING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TAPERING DRESS',
                          text: t('TAPERING DRESS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'REMOVE AND CLOSE POCKET',
                          text: t('REMOVE AND CLOSE POCKET'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'TAKE IN OR LET OUT SIDE OR CENTER SEAM',
                          text: t('TAKE IN OR LET OUT SIDE OR CENTER SEAM'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SHORTEN STARPS R LIFT SHOULDERS',
                          text: t('SHORTEN STARPS R LIFT SHOULDERS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SHORTEN SLEEVE JACKET',
                          text: t('SHORTEN SLEEVE JACKET'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
          ]
        : productInfo.value?.category?.name === 'handbag'
        ? [
              {
                  id: 'BAG CLEANING SERVICES',
                  title: t('BAG CLEANING SERVICES'),
                  childs: [
                      {
                          id: 'REMOVEING SCRATCHES',
                          text: t('REMOVING SCRATCHES'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CLEANING OUTSIDE',
                          text: t('CLEANING OUTSIDE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CLEANING INSIDE AND OUTSIDE',
                          text: t('CLEANING INSIDE AND OUTSIDE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'REMOVING STAIN',
                          text: t('REMOVING STAIN'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'POLISHING',
                          text: t('POLISHING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'BAG SCUFFING, WEAR AND TEAR SERVICES',
                  title: t('BAG SCUFFING, WEAR AND TEAR SERVICES'),
                  childs: [
                      {
                          id: 'STITICHING',
                          text: t('STITCHING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'BAG RESTORATIONS',
                          text: t('BAG RESTORATIONS'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'LINING REPAIR',
                          text: t('LINING REPAIR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CLUING,EDGING REPAIR',
                          text: t('CLUING, EDGING REPAIR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'BAG COMFORT, PROTECTION AND LONGEVITY',
                  title: t('BAG COMFORT, PROTECTION AND LONGEVITY'),
                  childs: [
                      {
                          id: 'HANDBAG STRAP HANDLES REPALCMENT',
                          text: t('HANDBAG STRAP HANDLES REPLACEMENT'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'CUSTOM WORK',
                          text: t('CUSTOM WORK'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'REPAIR ZIP',
                          text: t('REPAIR ZIP'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          hasCount: true,
                      },
                      {
                          id: 'NEW ZIP',
                          text: t('NEW ZIP'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                          hasCount: true,
                      },
                      {
                          id: 'HARDWARE RELPATING',
                          text: t('HARDWARE REPLATING'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
              {
                  id: 'REFASHION',
                  title: t('REFASHION'),
                  childs: [
                      {
                          id: 'RECOLOURING SAME COLOUR',
                          text: t('RECOLOURING SAME COLOUR'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'SUEDE DYE',
                          text: t('SUEDE DYE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                      {
                          id: 'COLOUR CHANGE OR DYE',
                          text: t('COLOUR CHANGE OR DYE'),
                          // tooltipText: t("The cost for zip is between 300 - 500"),
                      },
                  ],
              },
          ]
        : []
);

//// step 9 confirm
const plans = ref([]);
const item_id = ref('');

const confirm = async () => {
    isLoading.value = true;
    const { editProduct } = useItem();
    const body = {
        brandId: informations.value?.brandId,
        exteriorColor: informations.value?.color,
        exteriorMaterial: informations.value?.material,
        images: [],
        problems: informations.value?.problems,
        size: informations.value?.size,
        changedColor: informations.value?.changedColor,
    };
    const { data, error } = await editProduct(route.params?.id, { body: body });
    isLoading.value = false;
    if (!error.value) {
        goToStep(10);
    }
};

//// step 10 our Offers

const offer = computed(() => {
    return {
        img: config.public.BASE_URL + productInfo.value.images[0].file.url,
        brand: productInfo.value.brand?.name,
        images: productInfo.value.images,
        item_id: productInfo.value?.id,
        features: [
            ...new Set(
                Object.values(form.details).filter(
                    (el) => el && !el.startsWith('{')
                )
            ),
        ],
        mainOption:
            plans.value.find((el) => el.primary)?.title ||
            'Repair and get back',
        'Repair and get back': {
            isComingSoon:
                plans.value.find((el) => el.title === 'Repair and get back')
                    ?.comming_soon || false,
            amount:
                plans.value.find((el) => el.title === 'Repair and get back')
                    ?.repair_price > 0
                    ? '£ ' +
                      plans.value.find(
                          (el) => el.title === 'Repair and get back'
                      )?.repair_price
                    : 'in progress' || 0,
            payAtFirst:
                plans.value.find((el) => el.title === 'Repair and get back')
                    ?.payatfirst > 0
                    ? '£ ' +
                      plans.value.find(
                          (el) => el.title === 'Repair and get back'
                      )?.payatfirst
                    : 'in progress' || 0,
            isDisabled: !Boolean(
                plans.value.find((el) => el.title === 'Repair and get back')
            ),
        },
        'Repair and Sell in our community': {
            isComingSoon:
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )?.comming_soon || false,
            amount:
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )?.repair_price > 0 &&
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )?.sell_price > 0
                    ? '£ ' +
                      plans.value.find(
                          (el) =>
                              el.title === 'Repair and Sell in our community'
                      )?.repair_price
                    : 'in progress' || 0,
            sell_amount:
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )?.sell_price > 0 &&
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )?.sell_price > 0
                    ? '£ ' +
                      plans.value.find(
                          (el) =>
                              el.title === 'Repair and Sell in our community'
                      )?.sell_price
                    : 'in progress' || 0,
            payAtFirst:
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )?.payatfirst > 0
                    ? '£ ' +
                      plans.value.find(
                          (el) =>
                              el.title === 'Repair and Sell in our community'
                      )?.payatfirst
                    : 'in progress' || 0,
            isDisabled: !Boolean(
                plans.value.find(
                    (el) => el.title === 'Repair and Sell in our community'
                )
            ),
        },
        'instant Sell': {
            isComingSoon:
                plans.value.find((el) => el.title === 'instant Sell')
                    ?.comming_soon || false,
            amount:
                plans.value.find((el) => el.title === 'instant Sell')
                    ?.sell_price > 0
                    ? '£ ' +
                      plans.value.find((el) => el.title === 'instant Sell')
                          ?.sell_price
                    : 'in progress' || 0,
            isDisabled: !Boolean(
                plans.value.find((el) => el.title === 'instant Sell')
            ),
        },
        'Sell without repair': {
            isComingSoon:
                plans.value.find((el) => el.title === 'Sell without repair')
                    ?.comming_soon || false,
            amount:
                plans.value.find((el) => el.title === 'Sell without repair')
                    ?.sell_price > 0
                    ? '£ ' +
                      plans.value.find(
                          (el) => el.title === 'Sell without repair'
                      )?.sell_price
                    : 'in progress' || 0,
            isDisabled: !Boolean(
                plans.value.find((el) => el.title === 'Sell without repair')
            ),
        },
    };
});

const offerOptions = [
    {
        id: 'Repair and get back',
        title: t('Repair and get back'),
        desc: t('Estimate provided, final repair cost after expert inspection'),
        buttonText: t('Pay For Repair'),
        isPay: true,
    },
    {
        id: 'Repair and Sell in our community',
        title: t('Repair and Sell in our community'),
        desc: t('50% upfront payment, balance due upon item sale'),
        buttonText: t('Purchase'),
        isPay: true,
    },
    {
        id: 'instant Sell',
        title: t('instant Sell'),
        desc: t(
            'Sell your item to us and receive payment just 5 days after we receive it'
        ),
        buttonText: t('Sell to Luxmax'),
        isPay: false,
    },
    {
        id: 'Sell without repair',
        title: t('Sell without repair'),
        desc: t(
            'Sell your item to us and receive payment just 5 days after we receive it'
        ),
        buttonText: t('Sell in Community'),
        isPay: false,
    },
];

const offerSelected = async (offer) => {
    if (
        offer === 'REPAIR_AND_SELL_IN_OUR_COMMUNITY' ||
        offer === 'SELL_WITHOUT_REPAIR'.toUpperCase()
    ) {
        goToStep(11);
    } else {
        goToStep(12);
    }
};

const breadcrumbData = [
    {
        id: 0,
        text: t('Home'),
        action: () => {
            router.push({ name: 'home' });
        },
    },
    { id: 1, text: t('Identify'), action: () => {} },
];

//// step 11 additional images
const additionalImages = ref([
    { id: 1, text: 'Front', optional: false },
    { id: 2, text: 'Side', optional: false },
    { id: 3, text: 'Back', optional: false },
    { id: 4, text: 'Label', optional: false },
    { id: 5, text: 'Bottom', optional: false },
]);

const uploadAdditionalImages = () => {
    goToStep(12);
};

const goToStep = (value) => {
    step.value = value;
};

//// scroll and mounted

const scrollToTop = () => {
    window.scrollTo({
        top: container.value?.offsetTop - 100,
        behavior: 'smooth',
    });
};

watch(
    () => route.query.step,
    () => {
        if (Number.isNaN(route.query.step) || !route.query.step) {
            router.push('/identify?step=2');
        } else if (route.query.step != step.value) {
            step.value = parseInt(route.query.step);
        }
    }
);

watch(
    () => step.value,
    async (newVal) => {
        scrollToTop();
        if (route.params.id) {
            const { product } = useItem();
            const { data: productDetail, error } = await product(
                route.params?.id
            );
            productInfo.value = productDetail?.value;
            if (route.query.step != step.value) {
                router.push({ query: { step: step.value } });
            }
        }
    }
);
</script>
