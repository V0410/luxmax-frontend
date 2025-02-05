<template>
  <div class="flex justify-start cursor-pointer" @click="toggleValue">
    <BaseInputRadio v-model="isSelected" size="s" :text="text" noUpdate />
  </div>
</template>
<script setup>
const props = defineProps({
  text: String,
  group: String,
  value: String,
});

const router = useRouter();
const isSelected = computed(() => props.value === router.currentRoute.value.query[props.group])


const toggleValue = () => {
  const query = { ...(router.currentRoute.value.query || {}) };
  query[props.group] = props.value;
  router.replace({ query: query });
};
</script>
