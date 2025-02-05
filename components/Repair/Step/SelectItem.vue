<template>
    <div>
        <div class="w-full flex flex-col mb-6 laptop:mb-0 gap-6 laptop:gap-12">
            <div class="gridClass">
                <div
                    class="mx-auto w-full flex flex-col gap-6 laptop:gap-10 text-center items-center"
                >
                    <div
                        class="text-p8 font-medium laptop:text-[28px] leading-normal"
                        v-text="$t('Choose your item category.')"
                    />
                    <div
                        class="w-full laptop:w-fit gap-4 laptop:gap-8 laptop:grid grid-cols-3 hidden"
                    >
                        <RepairItem
                            v-for="item in categoryList?.data"
                            :key="`repairItem${item?.id}`"
                            :item="item"
                            :isLoading="isLoading"
                            @click="selectRepairItem(item?.id)"
                        />
                    </div>
                    <div class="w-full flex flex-col gap-4 laptop:hidden">
                        <BaseButton
                            v-for="item in categoryList?.data"
                            :key="`repairItem${item?.id}`"
                            styleType="outlined"
                            :text="item.name"
                            @click="selectRepairItem(item?.id)"
                        />
                    </div>
                </div>
            </div>
            <div class="laptop:pb-20 w-full laptop:py-20 laptop:bg-p1">
                <div
                    class="gridClass laptop:max-w-none laptop:w-full flex flex-col laptop:flex-row gap-4 justify-evenly"
                >
                    <template v-for="(item, i) in bottomFlow" :key="item.id">
                        <RepairFlow :text="item.text" :number="i + 1" />
                        <div class="hidden laptop:flex flex-col justify-center">
                            <IconArrowLeft
                                v-if="i < bottomFlow.length - 1"
                                class="rotate-180 fill-p9 h-6 w-6"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <ModalSelect
            :selectedItem="selectedItem"
            :items="items"
            :isShow="isSubCategoryModalShow"
            :title="$t('Accessory Type')"
            :desc="$t('Please Select The Accessory Type')"
            @itemSelected="subCategorySelected"
            @close="isSubCategoryModalShow = false"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    items: Array,
    selectedItem: String,
});

const isLoading = ref(false);
const emits = defineEmits(["itemSelected", "close"]);

const { t } = useI18n();

const bottomFlow = [
    {
        id: 0,
        text: t("Using our image recognition technology or guided search"),
    },
    {
        id: 1,
        text: t("Tell us a bit about your item, like its color and condition"),
    },
    { id: 2, text: t("Generate its current resale value in an instant") },
];

const categoryList = useState("categories");
if (!categoryList.value) {
    const { categories } = useItem();
    const { data, error } = await categories(1, 15);
}

const selectRepairItem = async (categoryId) => {
    isLoading.value = true;
    const { createProduct } = useItem();
    const payload = { body: { categoryId: categoryId } };
    const { data, error } = await createProduct(payload);
    if (data.value) {
        emits("itemSelected", data.value?.id);
    }
};

//// accessories modal

const subCategoryItems = ref([]);

const isSubCategoryModalShow = ref(false);

const subCategorySelected = (value) => {
    emits("itemSelected", value);
    isSubCategoryModalShow.value = false;
};
</script>
