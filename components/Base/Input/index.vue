<template>
  <div class="flex flex-col">
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
    <div class="relative flex flex-col"> 
    <input
      :value="modelValue"
      @input="handleChange"
      @focus="handleFocus"
      @blur="blur($event)"
      onkeypress="if(type === 'number' && min >= 0) return event.charCode >= 48"
      :type="
        type !== 'password' ? type : isPasswordVisible ? 'text' : 'password'
      "
      :id="name"
      :name="name"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="isDisabled"
      class="w-full border shadow-[0px -1px 0px 0px #D7DEDD inset] disabled:bg-white rounded-lg"
      :class="[
        size === 'l'
          ? 'text-sm placeholder:text-sm laptop:text-base laptop:placeholder:text-base h-12 laptop:h-14'
          : size === 'm'
          ? 'text-sm placeholder:text-sm h-12'
          : size === 's'
          ? 'text-xs placeholder:text-sm h-10'
          : '',
        ((type === 'password' ) || endIcon) ? 'ps-3 pe-12' : (startIcon || startText) ? 'ps-12 pe-2' : 'ps-3 pe-2',
        isDisabled
          ? 'cursor-default placeholder:text-t2 text-t2 border-t1'
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
          ? 'top-3 laptop:top-4'
          : size === 'm'
          ? 'top-3'
          : size === 's'
          ? 'top-2.5'
          : '',
        isDisabled
          ? 'stroke-t2'
          : errorMessage
          ? 'stroke-danger fill-white'
          : 'stroke-t9 fill-white',
      ]"
      @click="togglePasswordVisibility"
    >
      <IconVisible v-if="!isPasswordVisible" />
      <IconInvisible v-else />
    </div>
    <div
      v-else-if="endIcon"
      class="absolute w-fit cursor-pointer end-4"
      :class="[
        size === 'l'
          ? 'top-3 laptop:top-4'
          : size === 'm'
          ? 'top-3'
          : size === 's'
          ? 'top-2.5'
          : '',
        isDisabled
          ? 'stroke-t2'
          : errorMessage
          ? 'stroke-danger fill-white'
          : 'stroke-t9 fill-white',
      ]"
      @click="$emit('iconClicked')"
    >
      <IconViewer :name="endIcon" class="w-5 h-5" />
    </div>
    <div
      v-else-if="startIcon"
      class="absolute w-fit cursor-pointer start-4"
      :class="[
        size === 'l'
          ? 'top-3 laptop:top-4'
          : size === 'm'
          ? 'top-3'
          : size === 's'
          ? 'top-2.5'
          : '',
        isDisabled
          ? 'stroke-t2'
          : errorMessage
          ? 'stroke-danger fill-white'
          : 'stroke-t9 fill-white',
      ]"
      @click="$emit('iconClicked')"
    >
      <IconViewer :name="startIcon" class="w-5 h-5" />
    </div>
    <div
      v-else-if="startText"
      class="absolute w-fit cursor-pointer start-4 font-light"
      :class="[
        size === 'l'
          ? 'top-3 laptop:top-4 text-xl'
          : size === 'm'
          ? 'top-3 text-lg'
          : size === 's'
          ? 'top-2.5 text-base'
          : '',
        isDisabled
          ? 'text-t2'
          : errorMessage
          ? 'text-danger fill-white'
          : 'text-t9 fill-white',
      ]"
      @click="$emit('iconClicked')"
      v-text="startText" />
    <div v-if="!noErrorMessage" class="h-5 line-clamp-1">
      <div
        v-show="errorMessage && !isDisabled"
        v-text="errorMessage?.replaceAll('-',' ').replaceAll('_',' ')"
        class="ms-1 font-light text-xs mt-1 leading-normal text-danger select-none first-letter:capitalize "
      />
    </div>
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
  maxlength: Number,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  size: {
    type: String,
    default: "m",
  },
  min: Number,
  max: Number,
  isDisabled: Boolean,
  endIcon: String,
  startIcon: String,
  startText: String,
  noErrorMessage: Boolean
});

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

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
