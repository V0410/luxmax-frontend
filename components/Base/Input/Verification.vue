<template>
  <div class="w-full flex flex-col gap-6">
    <div class="w-full flex gap-12 pt-4 justify-center text-p7 text-2xl" dir="ltr">
      <input
        v-for="(i, index) in length"
        :key="index"
        autocomplete="one-time-code"
        ref="inputRef"
        type="number"
        :disabled="isLoading"
        inputmode="numeric"
        :name="Math.random()"
        maxlength=1
        @focus.prevent="focus"
        v-model="inputs[index]"
        @input="input"
        @paste.prevent="paste"
        class="border border-p7 focus:border-2 w-[48px] h-[48px] tablet:w-[48px] tablet:h-[48px] laptop:w-[48px] laptop:h-[48px] text-center focus:outline-none disabled:bg-white capitalize"
      />
    </div>
    <div class="h-5 line-clamp-1">
      <div
        v-if="errorMessage && !isDisabled"
        class="text-danger font-medium text-center select-none first-letter:capitalize"
        v-text="errorMessage?.replaceAll('-',' ')"
      />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue", "lastInput"]);
const props = defineProps({
  modelValue: String,
  length: Number,
  errorMessage: String,
  isLoading: Boolean
});

const input = (e) => {
  emits("update:modelValue", value.value);
  e.inputType === "insertText" &&
    e.target.nextElementSibling &&
    e.target.nextElementSibling.select();
  e.inputType === "insertText" && !e.target.nextElementSibling && lastInput();
  e.inputType === "deleteContentBackward" &&
    e.target.previousElementSibling &&
    e.target.previousElementSibling.select();
};

const inputRef = ref();

const value = computed(() => Object.values(inputs).join(""));

const lastInput = () => {
  if (value.value.length === +props.length) emits("lastInput", value.value);
};

const inputs = reactive({});
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      newVal.split("").forEach((number, index) => {
        inputs[index] = number;
      });
    } else {
      for (let i = 0; i < props.length; ++i) {
        inputs[i] = "";
      }
    }
  },
  { immediate: true }
);

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  inputRef.value[0].focus();
});
onBeforeUnmount(() => {
  isMounted.value = false;
});

window.addEventListener("keydown", (e) => {
  if (isMounted.value && inputRef.value.includes(document.activeElement)) {
    switch (e.key) {
      case "Backspace":
        removeOneNumber();
        break;
    }
  }
});

const removeOneNumber = () => {
  let selectedInputIndex = 0;
  for (let i = 0; i < props.length; i++) {
    if (inputs[i] !== "") {
      selectedInputIndex = i;
    }
  }
  if (
    selectedInputIndex >= 0 &&
    inputRef.value[selectedInputIndex + 1]?.value == ""
  ) {
    inputs[selectedInputIndex] = "";
    focus();
  }
};
const focus = () => {
  let selectedInputIndex = -1;
  for (let i = 0; i < props.length; i++) {
    if (inputs[i] !== "") {
      selectedInputIndex = i;
    }
  }
  if (selectedInputIndex < props.length - 1) {
    inputRef.value[selectedInputIndex + 1].focus();
  }
};

const reset = () => {
  for (let i = 0; i < props.length; ++i) {
    inputs[i] = "";
  }
  emits("update:modelValue", "");
  nextTick(() => {
    inputRef.value[0]?.focus();
  });
};

defineExpose({
  reset
});

const paste = (e) => {
  const pastedInput = e.clipboardData.getData("text").trim();
  const pastedInputArray = pastedInput.split("");

  for (let i = 0; i <= props.length; i++) {
    if (pastedInputArray[i]) {
      inputs[i] = pastedInputArray[i];
      focus();
    } else {
      inputs[i] = "";
    }
    emits("update:modelValue", value.value);
  }
  if (inputs[props.length - 1]) {
    emits("lastInput", value.value);
  }
};
</script>
