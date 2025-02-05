<template>
  <div
    class="flex flex-col gap-2 py-6 border-t border-t1"
    :class="selectedOptions.length > 0 ? 'pt-4' : ''"
  >
    <div class="flex items-center justify-between">
      <div class="text-t10" v-text="data.title" />
      <IconArrowRight class="w-5 h-5 fill-t6" />
    </div>
    <div class="text-start" v-show="selectedOptions.length > 0">
      <div class="text-t3 text-sm line-clamp-1">
        <template v-if="data.type === 'checkbox'">
          <template v-for="(option, i) in selectedOptions" :key="option">
            <span v-text="option" />
            <span v-if="i < selectedOptions.length - 1" v-text="`, `" />
          </template>
        </template>
        <template v-else-if="data.type === 'slider'">
          <template v-for="(option, i) in selectedOptions" :key="option">
            <span v-text="'£' + option.toLocaleString()" />
            <span
              v-if="i < selectedOptions.length - 1"
              v-text="' ' + $t(`to`) + ' '"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ data: Object });
const router = useRouter();
const selectedOptions = computed(() => {
  const query = router.currentRoute.value.query[props.data.value];
  if(props.data.type === 'checkbox'){
    if (query && props.data.options) {
      if (Array.isArray(query)) {
        return query.map(
          (el) => props.data.options.find((option) => option.value === el).text
          );
        } else {
          return [query].map(
            (el) => props.data.options.find((option) => option.value === el).text
            );
          }
        } else {
          return [];
        }
  } else if(props.data.type === 'slider'){
    return query?.split('-') || []
  }
  else{
    return []
  }
});

</script>
