<template>
  <div class="flex flex-col relative">
    <label
      :for="name"
      v-text="label"
      class="mb-1 text-start select-none"
      :class="[
        size === 'l'
          ? 'text-sm laptop:text-base'
          : size === 'm'
          ? 'text-sm'
          : size === 's'
          ? 'text-xs'
          : '',
        isDisabled ? 'text-t2' : ' text-t9',
      ]"
    />
    <input
      :value="modelValue"
      @input="handleChange"
      @focus="handleFocus"
      @blur="blur($event)"
      :type="type"
      :min="min"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      class="w-full border shadow-[0px -1px 0px 0px #D7DEDD inset] disabled:bg-white"
      :class="[
        size === 'l'
          ? 'text-sm placeholder:text-sm laptop:text-base laptop:placeholder:text-base ps-3 laptop:ps-4 pe-2 h-12 laptop:h-14'
          : size === 'm'
          ? 'text-sm placeholder:text-sm ps-3 pe-2 h-12'
          : size === 's'
          ? 'text-xs placeholder:text-sm ps-3 pe-2 h-10'
          : '',
        type === 'password' ? 'pe-12' : '',
        isDisabled
          ? 'cursor-not-allowed placeholder:text-t2 text-t2 border-t1'
          : errorMessage
          ? 'text-danger border-danger placeholder:text-danger'
          : 'text-t10 placeholder:text-t5 border-t9 focus:border-t10',
      ]"
    />
    <div
      v-if="type === 'password'"
      class="absolute w-fit cursor-pointer end-4"
      :class="[
        size === 'l'
          ? 'top-9 laptop:top-11'
          : size === 'm'
          ? 'top-9'
          : size === 's'
          ? 'top-7'
          : '',
        isDisabled
          ? 'stroke-t2'
          : errorMessage
          ? 'stroke-danger fill-white'
          : 'stroke-t9 fill-white',
      ]"
      @click="togglePasswordVisibility"
    >
      <IconVisible />
    </div>
    <div class="h-5 line-clamp-1">
      <div
        v-show="errorMessage && !isDisabled"
        v-text="errorMessage?.replaceAll('-',' ')"
        class="ms-1 font-light text-xs mt-1 leading-normal text-danger select-none first-letter:capitalize"
      />
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const emits = defineEmits(["update:modelValue", "focus", "blur"]);
const props = defineProps({
  modelValue: String,
  label: String,
  name: String,
  placeholder: String,
  type: {
    type: String,
    default: "date",
  },
  size: {
    type: String,
    default: "m",
  },
  isDisabled: Boolean,
  min: Date
});

const name = toRef(props, "name");
const { handleBlur, handleChange, errorMessage } = useField(name, undefined, {
  initialValue: props.modelValue,
});
const blur = ($event) => {
  emits("blur");
  handleBlur($event);
};
const handleFocus = () => {
  emits("focus");
};
</script>
