<template>
    <div>
        <div
            v-if="
                items?.error === 'subcategories-differences-error' &&
                !isManualSelectShow
            "
            class="flex flex-col items-center gap-10 py-12"
        >
            <div class="flex flex-col items-center">
                <NuxtImg src="/img/repair/ghost.png" class="w-52 h-52" />

                <div
                    v-text="
                        $t(
                            `You have selected the ${selectedCategory} category, but our AI has not recognized any ${selectedCategory}.`
                        )
                    "
                    class="text-center text-danger text-2xl max-w-[60%]"
                />
            </div>
            <div class="flex gap-4 items-center">
                <BaseButton
                    buttonId="identify-try-again"
                    text="Try Again"
                    styleType="outlined"
                    @click="router.push({ name: 'identify' })"
                />
                <div v-text="'or'" />
                <div
                    v-text="'Search for it'"
                    class="text-p7 cursor-pointer"
                    @click="isManualSelectShow = true"
                />
            </div>
        </div>
        <div
            v-else-if="
                items?.error !== 'subcategories-differences-error' &&
                !isManualSelectShow
            "
            ref="container"
            class="gridClass flex flex-col mb-6 laptop:mb-12 gap-6 laptop:gap-12 text-center items-center"
        >
            <div
                class="mb-6 flex flex-col gap-10 text-center items-center w-full"
            >
                <div
                    class="text-p8 font-medium laptop:text-[28px] leading-normal select-none px-5 laptop:px-0"
                    v-text="
                        $t(
                            'Our AI detected the items below, kindly confirm the correct item'
                        )
                    "
                />
                <div class="w-full max-w-[672px]">
                    <div class="flex flex-col gap-10 w-full">
                        <div class="flex flex-col gap-10 relative">
                            <div
                                class="flex justify-center items-center w-12 h-12 border rounded-full border-p7 absolute top-1/2 start-0 cursor-pointer"
                                @click="goToPrevProduct"
                            >
                                <IconArrowDown class="rotate-90 fill-p7" />
                            </div>
                            <div
                                class="flex justify-center items-center w-12 h-12 border rounded-full border-p7 absolute top-1/2 end-0 cursor-pointer"
                                @click="goToNextProduct"
                            >
                                <IconArrowDown
                                    class="rotate-[270deg] fill-p7"
                                />
                            </div>
                            <div class="flex flex-col gap-2 select-none">
                                <div class="flex justify-center">
                                    <template v-if="productToShow?.img">
                                        <div
                                            v-show="isImageLoading"
                                            class="flex justify-center items-center h-[200px]"
                                        >
                                            <IconSpinner
                                                class="animate-spin fill-p8"
                                            />
                                        </div>
                                        <NuxtImg
                                            alt=""
                                            v-show="!isImageLoading"
                                            class="h-[150px] laptop:h-[200px]"
                                            :src="productToShow?.img"
                                            format="webp"
                                            quality="100"
                                            @load="imageLoaded"
                                        />
                                    </template>
                                    <lottie-player
                                        v-else-if="productToShow?.json"
                                        autoplay
                                        loop
                                        style="width: 200px; height: 200px"
                                        :src="productToShow?.json"
                                        speed="1"
                                    />
                                </div>
                                <div class="flex flex-col gap-4 select-none">
                                    <div
                                        class="font-title text-xl laptop:text-2xl leading-normal text-t10"
                                        v-text="productToShow?.brand"
                                    />
                                    <div
                                        class="leading-normal text-sm laptop:text-base text-t7"
                                        v-text="productToShow?.model"
                                    />
                                </div>
                            </div>
                            <div class="flex justify-center select-none">
                                <BaseButton
                                    :buttonId="`identify-select-${productToShow?.button?.text}`"
                                    :text="productToShow?.button?.text"
                                    size="m"
                                    :styleType="
                                        productToShow?.button?.styleType
                                    "
                                    class="w-1/2 laptop:w-[200px]"
                                    @click="modelSelected"
                                />
                            </div>
                        </div>
                        <div
                            class="w-full flex gap-4 justify-around items-center overflow-hidden"
                        >
                            <div
                                v-if="itemsToShow[0]"
                                class="grid grid-cols-3 laptop:grid-cols-5 gap-4 justify-around"
                            >
                                <div
                                    v-for="(item, i) in itemsToShow[0]"
                                    :key="item?.id"
                                    @click="productNumberToShow = i"
                                    class="cursor-pointer flex-col gap-5 items-center w-[100px] laptop:w-[120px] select-none"
                                    :class="
                                        i === productNumberToShow ||
                                        i === productNumberToShow + 1 ||
                                        i === productNumberToShow - 1 ||
                                        (productNumberToShow === 0 &&
                                            i === 2) ||
                                        (productNumberToShow ===
                                            itemsToShow.length - 1 &&
                                            i === itemsToShow.length - 3)
                                            ? 'flex'
                                            : 'hidden laptop:flex'
                                    "
                                >
                                    <div
                                        class="flex flex-col gap-2 items-center p-3 border-2 rounded-lg"
                                        :class="
                                            productNumberToShow === i
                                                ? 'border-p8'
                                                : 'border-transparent'
                                        "
                                        style="background: linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%);'"
                                    >
                                        <NuxtImg
                                            :src="item?.img"
                                            format="webp"
                                            width="120"
                                            height="120"
                                            :quality="100"
                                            class="w-[120px] aspect-square"
                                            :class="
                                                item?.id === productToShow?.id
                                                    ? ''
                                                    : ' opacity-40'
                                            "
                                        />
                                        <div
                                            class="text-xs font-bold font-static lowercase line-clamp-1"
                                            :class="
                                                item?.id === productToShow?.id
                                                    ? ''
                                                    : 'text-t3'
                                            "
                                            v-text="item?.brand"
                                        />
                                    </div>
                                    <div
                                        class="w-full h-1"
                                        :class="
                                            item?.id === productToShow?.id
                                                ? 'bg-p8'
                                                : 'bg-p2'
                                        "
                                    />
                                </div>
                            </div>
                            <!-- <div
                                    v-if="itemsToShow[0]"
                                    class="grid laptop:hidden grid-cols-2 laptop:grid-cols-5 gap-4 justify-around"
                                >
                                    <div
                                        v-for="(item, i) in itemsToShow[0]"
                                        :key="item?.id"
                                        @click="productNumberToShow = i"
                                        class="cursor-pointer flex-col gap-5 items-center w-[100px] laptop:w-[120px] select-none"
                                        :class="
                                            i === productNumberToShow ||
                                            i === productNumberToShow + 1 ||
                                            (productNumberToShow ===
                                                itemsToShow.length - 1 &&
                                                i === itemsToShow.length - 3)
                                                ? 'flex'
                                                : 'hidden laptop:flex'
                                        "
                                    >
                                        <div
                                            class="flex flex-col gap-2 items-center p-3 border-2 rounded-lg"
                                            :class="
                                                productNumberToShow === i
                                                    ? 'border-p8'
                                                    : 'border-transparent'
                                            "
                                            style="background: linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%);'"
                                        >
                                            <NuxtImg
                                                :src="item?.img"
                                                format="webp"
                                                width="120"
                                                height="120"
                                                :quality="100"
                                                class="w-[120px] aspect-square"
                                                :class="
                                                    item?.id ===
                                                    productToShow?.id
                                                        ? ''
                                                        : ' opacity-40'
                                                "
                                            />
                                            <div
                                                class="text-xs font-bold font-static lowercase line-clamp-1"
                                                :class="
                                                    item?.id ===
                                                    productToShow?.id
                                                        ? ''
                                                        : 'text-t3'
                                                "
                                                v-text="item?.brand"
                                            />
                                        </div>
                                        <div
                                            class="w-full h-1"
                                            :class="
                                                item?.id === productToShow?.id
                                                    ? 'bg-p8'
                                                    : 'bg-p2'
                                            "
                                        />
                                    </div>
                                </div> -->
                        </div>
                        <div
                            class="flex flex-col laptop:flex-row items-center pb-6 px-4 laptop:pb-0 laptop:px-0 laptop:pe-6 bg-p1 w-full laptop:w-fit mx-auto mt-6"
                        >
                            <lottie-player
                                autoplay
                                loop
                                class="w-[120px] h-[120px] laptop:w-[160px] laptop:h-[160px]"
                                src="/json/notDetect.json"
                                speed="1"
                            />
                            <div class="flex flex-col my-auto gap-6">
                                <div
                                    class="text-[20px]"
                                    v-text="
                                        $t(
                                            'Also you can find your item manually'
                                        )
                                    "
                                />
                                <div class="flex gap-4 items-center">
                                    <BaseButton
                                        buttonId="identify-select-manually"
                                        styleType="text"
                                        size="m"
                                        class="flex-grow"
                                        :text="$t('Submit Manually')"
                                        @click="$emit('modelSelected', {})"
                                    />
                                    <div v-text="$t('or')" />
                                    <BaseButton
                                        buttonId="identify-search-crawler"
                                        styleType="outlined"
                                        size="m"
                                        class="flex-grow"
                                        :text="$t('Search for it')"
                                        @click="isManualSelectShow = true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            ref="container"
            class="gridClass flex flex-col mb-6 laptop:mb-12 gap-6 laptop:gap-12 text-center items-center"
        >
            <RepairFindItem
                :selectedCategory="selectedCategory"
                @selected="crawlerSelected"
                @cantFind="$emit('modelSelected', {})"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    selectedCategory: String,
    isManualSelect: Boolean,
});
const emits = defineEmits(["modelSelected", "loaded", "back", "loading"]);
emits("loading");

const isManualSelectShow = ref(false);

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const { productIdentify } = useItem();
const { data: items, error } = await productIdentify(route.params.id);
if (error.value) {
    setTimeout(() => {
        emits("back");
    }, 100);
}
const container = ref();
const isImageLoading = ref(false);

const itemsToShow = ref([
    items.value?.similar_items.map((el) => {
        return {
            id: el.id,
            brand: el.crawler_data?.brand,
            crawler_id: el.crawler_data?.id,
            model: el.crawler_data?.name,
            exteriorColor: el.crawler_data?.details?.exteriorColor,
            exteriorMaterial: el.crawler_data?.details?.exteriorMaterial,
            handDropColor: el.crawler_data?.details?.handDropColor,
            handDropMaterial: el.crawler_data?.details?.handDropMaterial,
            interiorColor: el.crawler_data?.details?.interiorColor,
            interiorMaterial: el.crawler_data?.details?.interiorMaterial,
            img: el.image_url,
            button: { text: t("Select") },
        };
    }),
    {
        id: "not found",
        brand: t("We didn’t find your item"),
        model: t("You can find your item manually"),
        json: "/json/notDetect.json",
        button: { styleType: "outlined", text: t("Search for it") },
    },
]);

const productNumberToShow = ref(0);

watch(
    () => productNumberToShow.value,
    () => {
        isImageLoading.value = true;
    }
);

const goToPrevProduct = () => {
    if (productNumberToShow.value > 0) {
        productNumberToShow.value = productNumberToShow.value - 1;
    }
};

const goToNextProduct = () => {
    if (
        itemsToShow.value[0] &&
        productNumberToShow.value < itemsToShow.value[0].length - 1
    ) {
        productNumberToShow.value = productNumberToShow.value + 1;
    }
};

const productToShow = computed(() => {
    if (itemsToShow.value[0]) {
        return itemsToShow.value[0][productNumberToShow.value];
    }
});

const scrollToTop = () => {
    window.scrollTo({
        top: container.value?.offsetTop - 100,
        behavior: "smooth",
    });
};

const imageLoaded = () => {
    isImageLoading.value = false;
};

const modelSelected = async (isSearched) => {
    const selectedItemId = itemsToShow?.value[0][productNumberToShow.value]?.id;
    if (selectedItemId !== "not found") {
        const { editProduct } = useItem();
        const { data: editPro, error: editErr } = await editProduct(
            route.params.id,
            { body: { crawlId: productToShow.value.crawler_id} }
        );
        if (editPro.value) {
            emits("modelSelected", productToShow.value);
        }
    } else {
        isManualSelectShow.value = true;
        scrollToTop();
    }
};

const crawlerSelected = async (model) => {
    const item = {
        id: model.id,
        brand: model?.brand?.name,
        crawler_id: model?.id,
        model: model?.name,
        exteriorColor: model?.exteriorColor,
        exteriorMaterial: model?.exteriorMaterial,
        handDropColor: model?.handDropColor,
        handDropMaterial: model?.handDropMaterial,
        interiorColor: model?.interiorColor,
        interiorMaterial: model?.interiorMaterial,
        img: model?.images[0]?.url,
        button: { text: t("Select") },
    };
    const { editProduct } = useItem();
    const { data: editPro, error: editErr } = await editProduct(
        route.params.id,
        {
            body: { crawlId: model.id.toString() },
        }
    );
    if (editPro.value) {
        emits("modelSelected", item);
    }
};

emits("loaded");
</script>
