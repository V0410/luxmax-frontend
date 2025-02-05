<template>
  <div class="px-20 pt-8 pb-12 flex flex-col laptop:flex-row items-center laptop:items-start gap-20">
    <div class="text-3xl laptop:text-5xl font-semibold text-p8 mt-10" v-text="props.title" />
    <div class="flex flex-col gap-8 laptop:gap-0 laptop:flex-row w-full justify-between items-center laptop:items-end">
      <div
        v-for="(category, index) in props.categories"
        :key="category?.id"
        class="text-center flex flex-col-reverse laptop:flex-col gap-2 laptop:gap-6 cursor-pointer px-8"
        @click="CategoryClick(category?.slug)"
      >
        <NuxtImg 
          v-if="category?.file?.url"
          :alt="category?.name"
          :src="config.public.BASE_URL + category?.file?.url"
          format="webp"
          quality="100"
          loading="lazy"
          class="w-48 h-auto lazyload"
          sizes="192px"
        />
        <div v-else class="w-48 h-48 rounded-full inline-block bg-p2"/>
        <div class="text-p8 text-xl laptop:text-3xl" v-text="category?.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    categories: Array
});

const router = useRouter();
const config = useRuntimeConfig();
const CategoryClick = (category) => {
  router.push({ name: 'category-market', params: { id: category } })
}
</script>