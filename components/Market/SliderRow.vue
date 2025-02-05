<template>
  <div class="flex justify-center items-center gap-2">
  <BaseInput v-model="minimum" size="s" :min="min || 0" :max="max || null" type="number" startText="£" class="w-full" noErrorMessage />
  <div class=" text-t9 text-sm" v-text="$t('To')" />
  <BaseInput v-model="maximum" size="s" :min="min || 0" :max="max || null" type="number" startText="£" class="w-full" noErrorMessage />
  </div>
</template>
<script setup>
const props = defineProps({
  min: Number,
  max: Number,
  group: String,
});

const router = useRouter();

const minimum = ref(router.currentRoute.value.query[props.group]?.split('-')[0] || props.min)
const maximum = ref(router.currentRoute.value.query[props.group]?.split('-')[1] || props.max)

watch(() => minimum.value, (newMin) => updateQuery(newMin, maximum.value))
watch(() => maximum.value, (newMax) => updateQuery(minimum.value, newMax))

const updateQuery = (min, max) => {
  const query = { ...(router.currentRoute.value.query || {}) };
  query[props.group] = `${min}-${max}`;
  router.replace({ query: query });
};
</script>
