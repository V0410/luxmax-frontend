<template>
    <div
        class="flex flex-col"
        :class="
            size === 'l'
                ? 'text-base'
                : size === 'm'
                ? 'text-sm'
                : size === 's'
                ? 'text-xs'
                : ''
        "
    >
        <label
            v-text="label"
            class="mb-1 text-start select-none"
            :class="[isDisabled ? 'text-t2' : ' text-t9']"
        />
        <div
            class="relative"
            :tabindex="0"
            @focus="handleFocus"
            @blur="blur($event)"
        >
            <div
                @click="toggleDropdown"
                class="w-full border rounded-lg shadow-[0px -1px 0px 0px #D7DEDD inset] flex justify-between items-center"
                :class="[
                    size === 'l'
                        ? 'ps-4 pe-2 h-14'
                        : size === 'm'
                        ? 'ps-3 pe-2 h-12'
                        : size === 's'
                        ? 'ps-3 pe-2 h-10'
                        : '',
                    isDisabled
                        ? 'cursor-not-allowed text-t2 fill-t2 border-t1'
                        : errorMessage
                        ? 'cursor-pointer text-danger fill-danger border-danger'
                        : 'cursor-pointer text-t10 fill-t10 border-t9 focus:border-t10 ',
                ]"
            >
                <div
                    class="flex items-center gap-1"
                    :class="selected?.text ? '' : 'text-t5'"
                >
                    <span
                        v-if="selected?.extraText || extraText"
                        class="text-t5 font-light"
                        v-text="selected?.extraText || extraText"
                    />
                    <span v-text="selected?.text || placeholder" />
                </div>
                <IconArrowDown class="w-4 h-4 ms-2" />
            </div>
            <div
                v-show="isShow"
                class="absolute bg-white w-full z-30 p-2 shadow-s-3 max-h-40 overflow-scroll"
            >
                <ul>
                    <li
                        v-for="option in options"
                        :key="option.id"
                        @click="selectOption(option.value)"
                        class="cursor-pointer flex gap-1 items-center hover:bg-p1"
                        :class="
                            size === 'l'
                                ? 'p-4 h-fit'
                                : size === 'm'
                                ? 'p-3 h-fit'
                                : size === 's'
                                ? 'p-3 h-fit'
                                : ''
                        "
                    >
                        <span
                            v-if="option?.extraText || extraText"
                            class="text-t5 font-light"
                            v-text="option.extraText || extraText"
                        />
                        <span v-text="option.text" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="h-5 line-clamp-1">
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
    modelValue: [String, Number],
    name: String,
    options: {
        type: Array,
        default: [],
    },
    label: String,
    placeholder: String,
    size: {
        type: String,
        default: "m",
    },
    isDisabled: Boolean,
    isDisableMenu: Boolean,
    extraText: String,
});

const isShow = ref(false);

const toggleDropdown = () => {
    if (!props.isDisabled && !props.isDisableMenu) {
        isShow.value = !isShow.value;
    }
};

const selected = computed(() => {
    const selectedOption = props.options.find(
        (option) => option.value === props.modelValue
    );
    if (!selectedOption) {
        return null;
    }
    return selectedOption;
});

const selectOption = (optionValue) => {
    handleChange(optionValue);
    toggleDropdown();
};

const name = toRef(props, "name");
const { handleBlur, handleChange, errorMessage } = useField(name, undefined, {
    initialValue: props.modelValue,
});
const blur = ($event) => {
    isShow.value = false;
    emits("blur");
    handleBlur($event);
};
const handleFocus = () => {
    emits("focus");
};
</script>
