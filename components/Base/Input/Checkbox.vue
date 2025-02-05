<template>
  <div
    class="flex items-center gap-2 text-t9 text-sm"
    :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    @click="toggleChecked"
  >
    <div
      class="rounded border flex justify-center items-center"
      :class="[
        isDisabled ? 'border-t4 ' : ' border-t6 hover:border-t7 ',
        
      ]"
    >
      <div
        class="rounded-sm flex justify-center items-center"
        :class="[
          modelValue ? (isDisabled ? 'bg-p4' : 'bg-p8') : '',
          size === 'l'
            ? 'h-[18px] w-[18px]'
            : size === 'm'
            ? 'h-[15px] w-[15px]'
            : size === 's'
            ? 'h-[12px] w-[12px]'
            : '',
        ]"
      >
        <template v-if="hasIcon">
          <IconMinus
            v-if="allSelected"
            :class="[
              isDisabled ? 'stroke-t2' : modelValue ? 'stroke-white' : 'stroke-transparent',
              size === 'l'
                ? 'h-[14px] w-[14px]'
                : size === 'm'
                ? 'h-[10px] w-[10px]'
                : size === 's'
                ? 'h-[8px] w-[8px]'
                : '',
            ]"
          />
          <IconTick
            v-else
            :class="[
              isDisabled ?( modelValue ? 'stroke-t2' : 'stroke-transparent' ): modelValue ? 'stroke-white' : 'stroke-transparent',
              size === 'l'
                ? 'h-[14px] w-[14px]'
                : size === 'm'
                ? 'h-[10px] w-[10px]'
                : size === 's'
                ? 'h-[8px] w-[8px]'
                : '',
            ]"
          />
        </template>
      </div>
    </div>
    <div :class="[isEllipsis ? ' line-clamp-1' : '', size === 's' ? ' text-sm' : '', isDisabled ? 'text-t2': '']" class="select-none">
      <span v-if="text" v-text="text" />
      <span v-if="clickableText" v-text="' ' + clickableText + ' '" class="text-p7 underline underline-offset-4" @click.stop="$emit('clickableTextClick')" />
      <span v-if="text2" v-text="text2" />
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
  size: {
    type: String,
    default: "m",
  },
  name: String,
  text: String,
  clickableText: String,
  text2: String,
  hasIcon: Boolean,
  allSelected: Boolean,
  isDisabled: Boolean,
  noUpdate: Boolean,
  isEllipsis: Boolean
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
