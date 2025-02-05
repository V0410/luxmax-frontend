<template>
  <div
    class="flex items-center text-start gap-4 text-t9 text-sm"
    :class="isDisabled ? 'cursor-not-allowed' : modelValue ? 'cursor-default' : 'cursor-pointer'"
    @click="toggleChecked"
  >
    <div
      class="rounded-full border flex justify-center items-center"
      :class="[
        isDisabled ? 'border-t4' : ' border-t6 hover:border-t7',
        size === 'l'
          ? 'h-6 w-6'
          : size === 'm'
          ? 'h-5 w-5'
          : size === 's'
          ? 'h-4 w-4'
          : '',
      ]"
      @click="toggleChecked"
    >
      <div
        class="rounded-full flex justify-center items-center w-full aspect-square m-[0.0625rem]"
        :class="[
          modelValue ? (isDisabled ? 'bg-p4' : 'bg-p8') : '',
        ]"
      >
        <IconTick
          v-if="hasIcon"
          :class="[
            isDisabled ? 'stroke-t2' : 'stroke-white',
            size === 'l'
              ? 'h-[14px] w-[14px]'
              : size === 'm'
              ? 'h-[10px] w-[10px]'
              : size === 's'
              ? 'h-[8px] w-[8px]'
              : '',
          ]"
        />
      </div>
    </div>
    <div v-if="text" v-text="text" class="select-none capitalize" />
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  size: {
    type: String,
    default: "m",
  },
  name: String,
  hasIcon: Boolean,
  isDisabled: Boolean,
  text: String,
  noUpdate: Boolean
});

const toggleChecked = () => {
  if (!props.isDisabled && !props.noUpdate) {
    handleChange(!props.modelValue);
  }
};

const name = toRef(props, "name");

const { handleChange, errorMessage } = useField(name, undefined, {
  initialValue: props.modelValue,
});
</script>
