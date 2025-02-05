<template>
  <div dir="ltr" class="flex flex-col">
    <label
      :for="name"
      v-text="label"
      class="mb-1 text-start select-none"
      :class="[
        size === 'l'
          ? 'text-base'
          : size === 'm'
          ? 'text-sm'
          : size === 's'
          ? 'text-xs'
          : '',
        isDisabled ? 'text-t2' : ' text-t9',
      ]"
    />
    <div class="relative">
      <input
        type="text"
        ref="phoneInputRef"
        :value="modelValue"
        :maxlength="maxlength"
        @input="handleChange"
        @focus="handleFocus"
        @blur="blur($event)"
        :id="name"
        :name="name"
        :disabled="isDisabled"
        class="w-full border  shadow-[0px -1px 0px 0px #D7DEDD inset] rounded-lg"
        :class="[
          size === 'l'
            ? 'text-base ps-36 pe-2 h-14'
            : size === 'm'
            ? 'text-sm ps-32 pe-2 h-12'
            : size === 's'
            ? ' text-xs ps-28 pe-2 h-10'
            : '',
          isDisabled ? 'cursor-not-allowed text-t2 border-t1' :errorMessage ? 'border-danger text-danger' : 'border-t9 text-t10 focus:border-t10',
        ]"
      />
      <div
        :class="[
          isDisabled ? 'fill-t2' : 'fill-t9',
          size === 'l'
            ? 'top-4 start-4'
            : size === 'm'
            ? 'top-3.5 start-3.5'
            : size === 's'
            ? 'top-3 start-3'
            : '',
        ]"
        class="absolute flex flex-row items-center"
      >
        <div
          class="border-e  pe-2 flex flex-row items-center "
          :class="[errorMessage ? 'border-danger' : 'border-t2', noCountryChange ? ' cursor-not-allowed' : 'cursor-pointer']"
          @click="toggleDropdown"
        >
          <div
            class="fi"
            :class="[
              size === 'l'
                ? 'scale-150'
                : size === 'm'
                ? 'scale-125'
                : size === 's'
                ? 'scale-100'
                : '',
              `fi-${selectedCountryName?.toLowerCase()}`,
            ]"
          />
          <IconArrowDown
            :class="[
              size === 'l'
                ? 'h-6 w-6 ms-4'
                : size === 'm'
                ? 'h-5 w-5 ms-3'
                : size === 's'
                ? 'h-4 w-4 ms-2'
                : '', errorMessage ? 'fill-danger' : 'fill-t5']
            "
          />
        </div>
        <div class="ps-2" :class="errorMessage ? 'text-danger' :''" v-text="'+' + selectedCountryCode" />
      </div>
      <div
        v-show="isShow"
        class="absolute bg-white w-full z-30 p-2 shadow-s-3 overflow-auto"
        :class="
          size === 'l'
            ? 'max-h-[240px]'
            : size === 'm'
            ? 'max-h-[176px]'
            : size === 's'
            ? 'max-h-[176px]'
            : ''
        "
      >
        <ul>
          <li
            v-for="option in countryCodesArray"
            :key="option.isoCode2"
            @click="selectOption(option.countryCodes[0])"
            class="cursor-pointer flex items-center text-sm font-light hover:bg-p1"
            :class="
              size === 'l'
                ? 'px-4 h-14'
                : size === 'm'
                ? 'px-3 h-12'
                : size === 's'
                ? 'px-3 h-10'
                : ''
            "
          >
            <div
              class="fi"
              :class="[
                size === 'l'
                  ? 'scale-150'
                  : size === 'm'
                  ? 'scale-125'
                  : size === 's'
                  ? 'scale-100'
                  : '',
                `fi-${option.isoCode2?.toLowerCase()}`,
              ]"
            />
            <div
              class="border-e border-t2 pe-2"
              :class="
                size === 'l'
                  ? 'ms-4'
                  : size === 'm'
                  ? 'ms-2'
                  : size === 's'
                  ? ''
                  : ''
              "
              v-text="option.country"
            />
            <div class="ps-2" v-text="`+` + option?.countryCodes[0]" />
          </li>
        </ul>
      </div>
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
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useField } from "vee-validate";
import countryCodes from "country-calling-code";

const countryCodesArray = Array.isArray(countryCodes)
  ? countryCodes
  : countryCodes.codes;

const phoneInputRef = ref(null);

const emits = defineEmits(["update:modelValue", "focus", "blur", 'selectCountry']);
const props = defineProps({
  modelValue: String,
  label: String,
  maxlength: Number,
  selectedCountryCode: String,
  name: String,
  size: {
    type: String,
    default: "m",
  },
  isDisabled: Boolean,
  noCountryChange: Boolean
});

const isShow = ref(false);

const toggleDropdown = () => {
  if (!props.isDisabled && !props.noCountryChange) {
    isShow.value = !isShow.value;
  }
};

const selectedCountry = ref(props.selectedCountryCode);

const selectedCountryName = computed (() => 
  countryCodesArray.find(el => el.countryCodes[0] === selectedCountry.value)?.isoCode2
)

const selectOption = (optionValue) => {
  selectedCountry.value = optionValue;
  toggleDropdown();
};

watch(() => selectedCountry.value , (newVal) => {
  emits('selectCountry', newVal)
}, {immediat: true})

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
