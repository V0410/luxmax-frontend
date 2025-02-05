<template>
  <div v-show="isShow" class="shadow-s-5 z-30">
    <div
      @click.stop="() => {}"
      class="bg-white px-4 py-6 inset-0 fixed w-full laptop:static laptop:w-[200px] laptop-l:w-[400px] z-30 flex flex-col gap-6 justify-start h-full laptop:h-fit overflow-hidden"
    >
      <div
        class="p-5 ps-2 pb-2 flex gap-3 items-center border-b border-t1 laptop:hidden"
      >
        <IconArrowLeftLight
          class="fill-t9 w-8 h-8 p-2"
          @click="$emit('close')"
        />
        <input
          type="text"
          :maxlength="50"
          class="flex-grow text-t5 placeholder:text-xs placeholder:font-light first-letter:capitalize"
          :value="modelValue"
          @input="inputSearch"
          :placeholder="$t('Try searching “Gucci” or “Black tote”')"
        />
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <template v-if="!modelValue">
            <div
              v-if="
                searchHistory &&
                Array.isArray(searchHistory) &&
                searchHistory.length > 0
              "
              class="flex flex-col gap-4"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <IconSearchHistory class="w-5 h-5 fill-p7" />
                  <div
                    class="font-light text-black"
                    v-text="$t('Search History')"
                  />
                </div>
                <IconDelete
                  class="w-[18px] h-[18px] fill-t4 cursor-pointer"
                  @click="clearSearchHistory"
                />
              </div>
              <div class="flex gap-4 overflow-x-auto">
                <BaseTag
                  v-for="search in searchHistory"
                  :key="search"
                  :text="search?.name"
                  class="w-fit cursor-pointer"
                  @click="selectOption(search?.name)"
                />
              </div>
            </div>
            <div
              v-show="
                hotSearch && Array.isArray(hotSearch) && hotSearch.length > 0
              "
              class="flex flex-col gap-4"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <IconHotSearch class="w-5 h-5 fill-p7" />
                  <div
                    class="font-light text-black"
                    v-text="$t('Hot Search by Others')"
                  />
                </div>
              </div>
              <div class="flex gap-4 overflow-x-auto">
                <BaseTag
                  v-for="search in hotSearch"
                  :key="search"
                  :text="search?.name"
                  @click="selectOption(search?.name)"
                  class="w-fit cursor-pointer"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-4">
              <div
                class="flex justify-between items-center cursor-pointer overflow-hidden"
                @click="selectOption(modelValue)"
              >
                <div class="flex items-center gap-2">
                  <IconSquaresFour
                    class="min-w-7 max-w-7 min-h-7 max-h-7 w-7 h-7 fill-p7"
                  />
                  <div class="flex flex-grow flex-col gap-1">
                    <div
                      class="text-t10 w-full text-ellipsis capitalize"
                      v-text="modelValue"
                    />
                    <div
                      class="font-light text-t6 text-xs"
                      v-text="$t('In our market')"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              v-show="
                searchResults &&
                Array.isArray(searchResults) &&
                searchResults.filter((el) => el?.name).length > 0
              "
              class="flex flex-col gap-4"
            >
              <div class="border-b border-t1" />
              <div
                v-for="result in searchResults.filter((el) => el?.name)"
                :key="result?.name"
                class="flex justify-between items-center cursor-pointer"
                @click="selectOption(result?.name, { id: result.item_uid })"
              >
                <div class="flex items-center gap-2">
                  <IconSearch class="w-5 h-5 fill-p7" />
                  <div
                    class="font-light text-black capitalize"
                    v-text="result?.name"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["close", "open", "update:modelValue"]);
const props = defineProps({
  isShow: Boolean,
  modelValue: String,
});

const router = useRouter();

const { products } = useItem();

const inputSearch = ($event) => {
  emits("update:modelValue", $event.target.value);
};
const searchHistory = useCookie("searchHistory", { maxAge: 31536000 });

const clearSearchHistory = () => {
  searchHistory.value = null;
};
const selectOption = (keyword, options) => {
  if (options?.id) {
    router.push({ name: "single-product", params: { id: options.id } });
  } else {
    if (!searchHistory.value || !Array.isArray(searchHistory.value)) {
      searchHistory.value = [];
    }
    const searchHistorySet = new Set([keyword, ...searchHistory.value]);
    searchHistory.value = [...searchHistorySet];
    //////////
    router.push({ name: "market", query: { keyword: keyword } });
  }
  emits("update:modelValue", "");
  emits("close");
};

let interval = null;

const hotSearch = ref([]);
const searchResults = ref([]);

const searchKeyword = async (value) => {
  const { data, error } = await products({ body: { q: value, mine: true } });
  if (
    data.value?.data &&
    Array.isArray(data.value.data) &&
    data.value.data.length > 0
  ) {
    if (!value) {
      hotSearch.value = data.value.data;
    } else {
      searchResults.value = data.value.data;
    }
  } else {
    searchResults.value = [];
  }
};

await searchKeyword("");

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      emits("open");
    }
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(async () => {
      clearInterval(interval);
      if (newVal) {
        await searchKeyword(newVal);
      }
    }, 1000);
  }
);
</script>
