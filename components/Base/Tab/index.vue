<template>
  <div class="flex items-end w-full border-b border-p2">
    <template v-for="item in data" :key="item.id">
      <!-- <NuxtLink v-if="item.routeName" :to="{ name: item.routeName }">
        <BaseTabElement
          @click="clicked(item.value)"
          :text="item.text"
          :icon="noIcon ? '' : item.icon"
          :isSelected="item.value === modelValue"
          :isFullWidth="isFullWidth"
        />
      </NuxtLink> -->
      <BaseTabElement
        @click="clicked(item.value)"
        :text="item.text"
        :icon="noIcon ? '' : item.icon"
        :isSelected="item.value === modelValue"
        :isFullWidth="isFullWidth"
      />
    </template>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: [Number, String],
  data: Array,
  isFullWidth: Boolean,
  noIcon: Boolean,
});

const clicked = (value) => {
  emits("update:modelValue", value);
};
</script>
