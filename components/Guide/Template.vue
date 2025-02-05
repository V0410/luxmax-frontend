<template>
  <div
    class="gridClass py-6 relative laptop:py-24 flex flex-col laptop:flex-row gap-8 laptop:gap-28 justify-center"
  >
    <div class="gridClass laptop:hidden">
      <BaseBreadcrumb
        :dataArray="breadcrumbData"
        class="w-full laptop:max-w-[672px]"
      />
    </div>
    <div class="laptop:hidden">
      <BaseInputDropdown
        size="s"
        v-model="selectedCategory"
        :extraText="data.optionsExtraText"
        :options="data.categories"
      />
    </div>
    <div class=" z-0">
      <div class="absolute top-[86px] ">
        <div
          class="w-[235px] flex-col gap-6 hidden laptop:flex laptop:fixed bg-white"
        >
          <h1 class="text-t9 text-xl font-medium" v-text="data.title" />
          <div class="flex flex-col gap-2">
            <div
              v-for="(category, i) in data.categories"
              :key="category.id"
              class="px-3 py-2 text-sm border-s-2 first-letter:capitalize"
              :class="
                selectedCategory === i
                  ? 'border-p7 cursor-default'
                  : 'border-transparent cursor-pointer'
              "
              v-text="category.name"
              @click="selectedCategory = i"
            />
          </div>
        </div>
      </div>
      <div class="w-full laptop:ms-[235px] laptop:max-w-[790px]">
        <div class="flex flex-col gap-10">
          <div v-if="data.desc" class="" v-text="data.desc" />
          <div
            v-for="item in data.main"
            :id="item.id"
            :key="item.id"
            class="flex flex-col gap-4 text-t9 w-full"
          >
            <h2 class="text-[28px]" v-text="item.title" />
            <div class="" v-text="item.desc" />
            <div
              v-if="
                item.imgs && Array.isArray(item.imgs) && item.imgs.length > 0
              "
              class="w-full laptop:w-[560px] mx-auto grid grid-cols-1 laptop:grid-cols-2"
            >
              <NuxtImg
                alt=""
                width="1432"
                height="1572"
                v-for="img in item.imgs"
                :key="img"
                :src="img"
                quality="100"
                format="webp"
              />
            </div>
            <div class="w-full overflow-x-auto">
              <table v-if="item.tableData" class="w-full text-sm">
                <thead>
                  <td
                    class="p-4"
                    v-for="title in item.tableData.head"
                    :key="title"
                    v-text="title"
                  />
                </thead>
                <tbody>
                  <tr
                    v-for="row in item.tableData.body"
                    :key="row"
                    class="border-b border-t1"
                  >
                    <td
                      class="p-4"
                      v-for="value in row"
                      :key="value"
                      v-text="value"
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
  breadcrumbData: Array,
});
const selectedCategory = ref(0);
watch(
  () => selectedCategory.value,
  (newVal) => {
    document.getElementById(newVal).scrollIntoView({ behavior: "smooth", block: 'center' });
  }
);
</script>
