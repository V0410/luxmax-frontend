<template>
  <div
    ref="screen"
    class="gridClass flex flex-col gap-12 items-center overflow-scroll min-h-[800px]"
  >
    <div class="flex flex-col gap-8 items-center w-full laptop:w-[780px]">
      <div
        class="text-p8 font-medium laptop:text-[28px] leading-normal"
        v-text="$t('Find your item')"
      />
      <div
        class="flex flex-col laptop:flex-row gap-4 laptop:items-center w-full"
      >
        <BaseInputSearch
          v-model="searchText"
          :maxlength="50"
          noErrorMessage
          size="m"
          :placeholder="$t('Search')"
          class="flex-grow"
          @input="searchItem"
        />
        <div class="flex gap-4 items-center flex-wrap laptop:flex-nowrap">
          <div class="block laptop:hidden" v-text="$t('Filter: ')" />
          <div
            class="relative hidden laptop:block"
            @focus="focused"
            @blur="blur"
            :tabindex="0"
          >
            <BaseTag
              :text="
                $t('Category: ') +
                sortCategory.filter(
                  (category) => category.value === selectedCategory
                )[0]?.label
              "
              size="l"
              class="max-w-[160px] laptop:w-[160px] laptop:h-[48px]"
              @click="isSelectModalShow = true"
            />
            <ModalSelect
              v-if="isSelectModalShow"
              @blured="blured"
              mobileFloat
              floatLeft
              inputName="categorySelectModal"
              :selectedItem="selectedCategory"
              :items="sortCategory"
              :isShow="isSelectModalShow"
              :title="$t('Select category')"
              @itemSelected="categorySelected"
              @close="isSelectModalShow = false"
            />
          </div>
          <div class="relative laptop:hidden">
            <BaseTag
              :text="
                $t('Category: ') +
                sortCategory.filter(
                  (category) => category.value === selectedCategory
                )[0]?.label
              "
              size="l"
              class="max-w-[120px] laptop:w-[120px] laptop:h-[48px]"
              @click="isSelectModalShow = true"
            />
            <ModalSelect
              v-if="isSelectModalShow"
              mobileFloat
              floatLeft
              :selectedItem="selectedCategory"
              :items="sortCategory"
              :isShow="isSelectModalShow"
              :title="$t('Select Category')"
              @itemSelected="categorySelected"
              @close="isSelectModalShow = false"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex gap-6 flex-wrap mb-20 justify-center w-full max-w-[672px] laptop:max-w-[80%]"
    >
      <RepairModelItem
        v-for="model in crawlers"
        :key="model.id"
        :data="model"
        @select="$emit('selected', model)"
      />
    </div>
    <div
      class="fixed w-full bg-p1 shadow-s-1 bottom-0 p-6 flex flex-col laptop:flex-row justify-center items-center gap-4"
    >
      <div class="text-sm font-medium" v-text="$t(`Can't find your item?`)" />
      <BaseButton
        buttonId="identify-submit-manual-request"
        class="hidden laptop:block"
        size="s"
        :text="$t('Submit a manual request')"
        styleType="text"
        @click="$emit('cantFind')"
      />
      <BaseButton
        buttonId="identify-submit-manual-request"
        class="laptop:hidden"
        size="s"
        :text="$t('Submit a manual request')"
        styleType="outlined"
        @click="$emit('cantFind')"
      />
    </div>
  </div>
</template>

<script setup>
const crawlers = ref([]);

const { crawlerItems, categories } = useItem();
const { data: allCategories } = await categories();
const page = ref(1);

// const emits = defineEmits(["itemSelected", "close"]);


const getItems = async (q, categories) => {
  const { data } = await crawlerItems({ q, categories, page });
  crawlers.value = data.value.data;
};
getItems();

const props = defineProps({
  selectedCategory: String,
});

const { t } = useI18n();

const brands = ref([
  // { id: 0, value: "Chanel", label: "Chanel" },
]);
let isFocused = false;
const blured = () => {
  setTimeout(() => {
    if (isFocused) {
      isFocused = false;
    } else {
      isSelectModalShow.value = false;
    }
  }, 100);
};
const focused = () => {
  isFocused = true;
};
const blur = (e) => {
  isFocused = false;
  if (e.relatedTarget?.name !== "brandSelectModal") {
    isSelectModalShow.value = false;
  }
};

const screen = ref();

const isSelectModalShow = ref(false);

const selectedCategory = ref("All");
const searchText = ref("");

const categorySelected = async (category) => {
  selectedCategory.value = category;
  isSelectModalShow.value = false;
  if (selectedCategory.value === "All") {
    getItems(searchText.value);
  } else {
    getItems(searchText.value, selectedCategory.value);
  }
};

const searchItem = async () => {
  if (selectedCategory.value === "All") {
    getItems(searchText.value);
  } else {
    getItems(searchText.value, selectedCategory.value);
  }
};

brands.value = [{ id: -1, value: "", label: t("All") }];

const sortCategory = computed(() => {
  const data = [{ id: -1, label: "All", name: "All", value: "All" }];
  allCategories.value.data.forEach((el, index) => {
    data.push({});
    data[index + 1].id = el.id;
    data[index + 1].label = el.name;
    data[index + 1].value = el.slug;
  });
  return data;
});
</script>
