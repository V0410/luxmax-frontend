<template>
    <div
        class="flex justify-between capitalize"
        :class="count === 0 ? 'cursor-not-allowed' : 'cursor-pointer'"
        @click="toggleValue"
    >
        <BaseInputRadio
            :isDisabled="count === 0"
            :modelValue="modelValue"
            size="s"
            :text="text"
            hasIcon
            noUpdate
            isEllipsis
        />
        <div class="text-t6 text-xs" v-text="' ' || count" />
    </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    text: String,
    count: Number,
    group: String,
    value: String,
    modelValue: Boolean,
});

const router = useRouter();

const toggleValue = () => {
    const query = { ...(router.currentRoute.value.query || {}) };
    if (!props.modelValue) {
        if (props.count === 0) {
            return;
        }
        if (Array.isArray(query[props.group])) {
            if (props.group === "Sale and offers") {
                query[props.group] = [props.value];
            } else {
                query[props.group] = [props.value];
            }
        } else if (query[props.group]) {
            if (props.group === "Sale and offers") {
                query[props.group] = [props.value];
            } else {
                query[props.group] = [props.value];
            }
        } else {
            query[props.group] = [props.value];
        }
    } else {
        if (Array.isArray(query[props.group])) {
            query[props.group] = query[props.group].filter(
                (el) => el !== props.value
            );
            if (query[props.group].length === 0) {
                delete query[props.group];
            }
        } else if (query[props.group] === props.value) {
            delete query[props.group];
        }
    }
    emit("update:modelValue", !props.modelValue, props.value);
    router.replace({ query: query });
};
</script>
