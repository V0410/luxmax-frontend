<template>
    <div class="flex flex-col">
        <label
            v-if="label"
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
                ref="input"
                :value="modelValue"
                @input="handleChange"
                @focus="handleFocus"
                @blur="blur($event)"
                :maxlength="maxlength"
                type="text"
                :id="name"
                :name="name"
                :placeholder="placeholder"
                :disabled="isDisabled"
                class="w-full disabled:bg-white rounded-lg"
                :class="[
                    outline ? 'border-[0.5px] border-t9' : 'bg-[#F4F4F4]',
                    size === 'l'
                        ? 'text-base placeholder:text-base ps-14 pe-2 h-14 rounded-2xl'
                        : size === 'm'
                        ? 'text-sm placeholder:text-sm ps-11 pe-2 h-12'
                        : size === 's'
                        ? 'text-xs placeholder:text-sm ps-9 pe-2 h-10 rounded-lg'
                        : '',
                    isDisabled
                        ? 'cursor-not-allowed placeholder:text-t2 text-t2 border-t1'
                        : errorMessage
                        ? 'text-danger border-danger placeholder:text-danger'
                        : 'placeholder:text-t5 focus:border-t10 text-t10 border-t9',
                ]"
            />
            <IconSearch
                :class="[
                    isDisabled
                        ? 'fill-t2'
                        : errorMessage
                        ? 'fill-danger'
                        : 'fill-t9',
                    size === 'l'
                        ? 'top-4 start-4 h-6 w-6'
                        : size === 'm'
                        ? 'top-3.5 start-3.5 h-5 w-5'
                        : size === 's'
                        ? 'top-3 start-3 h-4 w-4'
                        : '',
                ]"
                class="absolute"
            />
        </div>
        <div v-if="!noErrorMessage" class="h-5 line-clamp-1">
            <div
                v-show="errorMessage && !isDisabled"
                v-text="errorMessage?.replaceAll('-', ' ')"
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
    maxlength: Number,
    placeholder: String,
    noErrorMessage: Boolean,
    outline: Boolean,
    focusInput: Boolean,
    size: {
        type: String,
        default: "m",
    },
    isDisabled: Boolean,
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

const input = ref(null);
watch(
    () => props.focusInput,
    () => props.focusInput && input.value.focus()
);
</script>
