<template>
  <div>
    <div v-if="subMenues?.length">
      <div
        class="flex justify-between items-center cursor-pointer"
        @click="toggleOpen"
      >
        <BaseInputCheckbox :modelValue="modelValue" size="s" :text="text" hasIcon noUpdate isEllipsis />
        <IconArrowDown class="w-5 h-5" :class="isOpen ? 'rotate-180' : ''" />
      </div>
      <div v-show="isOpen" class="pl-4 pt-4 flex flex-col gap-3">
          <div class="flex justify-between capitalize" :class="count === 0 ? 'cursor-not-allowed' : 'cursor-pointer'" @click="toggleValue(value, false)">
            <BaseInputCheckbox :modelValue="modelValue" size="s" text="all" hasIcon noUpdate isEllipsis />
            <div class="text-t6 text-xs" v-text="' ' || count" />
          </div>
          <div v-for="(subMenu, i) in subMenues" :key="`subMenu${i}`" class="flex justify-between capitalize" :class="count === 0 ? 'cursor-not-allowed' : 'cursor-pointer'" @click="toggleValue(subMenu.slug, true)">
            <BaseInputCheckbox :isDisabled="count === 0" :modelValue="values[subMenu.slug]" size="s" :text="subMenu.name" hasIcon noUpdate isEllipsis />
            <div class="text-t6 text-xs" v-text="' ' || count" />
          </div>
      </div>
    </div>
    <div v-else class="flex justify-between capitalize" :class="count === 0 ? 'cursor-not-allowed' : 'cursor-pointer'" @click="toggleValue(slug || text, false)">
      <BaseInputCheckbox :isDisabled="count === 0" :modelValue="modelValue" size="s" :text="text" hasIcon noUpdate isEllipsis />
      <div class="text-t6 text-xs" v-text="' ' || count" />
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  text: String,
  slug: String,
  count: Number,
  group: String,
  value: String,
  modelValue: Boolean,
  subMenues: Array,
  subValues: Array,
  values: Object,
  type: String,
});


const router = useRouter();
const route = useRoute();

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const toggleValue = (value, isSubMenu) => {
  const query = { ...(router.currentRoute.value.query || {}) };
  if(props.type == 'brands' || props.type == 'materials' || props.type == 'colors') {
    if (!props.modelValue) {
        if(props.count === 0){
          return
        }
        if (Array.isArray(query[props.group])) {
          if(props.group === 'Sale and offers'){
            query[props.group] = [value];
          }else {
            query[props.group] = [...query[props.group], value];
          }
        } else if (query[props.group]) {
          if(props.group === 'Sale and offers'){
            query[props.group] = [value];
          }else {
            query[props.group] = [query[props.group], value];
          }
        } else {
          query[props.group] = [value];
        }
    } else {
      if (Array.isArray(query[props.group])) {
        query[props.group] = query[props.group].filter(
          (el) => el !== value
        );
        if (query[props.group].length === 0) {
          delete query[props.group];
        }
      } else if (query[props.group] === value) {
        delete query[props.group];
      }
    }
    emit('update:modelValue', !props.modelValue, value)
    router.replace({ name: route.name, params: route.params, query: query });
  } else {
    if (route.path == '/market') {
      if(isSubMenu) {
        if (!props.values[value]) {
          if (Array.isArray(query[props.group])) {
            query[props.group] = [...query[props.group], value];
          } else if (query[props.group]) {
            query[props.group] = [query[props.group], value];
          } else {
            query[props.group] = [value];
          }
        } else {
          if (Array.isArray(query[props.group])) {
            query[props.group] = query[props.group].filter(
              (el) => el !== value
            );
            if (query[props.group].length === 0) {
              delete query[props.group];
            }
          } else if (query[props.group] === value) {
            delete query[props.group];
          }
        }
        emit('update:modelValue', !props.values[value], value)
      } else {
        if (!props.modelValue) {
          if(props.count === 0){
            return
          }
          if (Array.isArray(query[props.group])) {
            if(props.group === 'Sale and offers'){
              query[props.group] = [value];
            }else {
              query[props.group] = [...query[props.group], value];
            }
          } else if (query[props.group]) {
            if(props.group === 'Sale and offers'){
              query[props.group] = [value];
            }else {
              query[props.group] = [query[props.group], value];
            }
          } else {
            query[props.group] = [value];
          }
        } else {
          if (Array.isArray(query[props.group])) {
            query[props.group] = query[props.group].filter(
              (el) => el !== value
            );
            if (query[props.group].length === 0) {
              delete query[props.group];
            }
          } else if (query[props.group] === value) {
            delete query[props.group];
          }
        }
        emit('update:modelValue', !props.modelValue, value)
      }
      let category = ''
      Object.keys(query).forEach(element => {
        if (element == 'categories') {
          category = query[element][0]
          query[element].shift()
          if (!query[element].length) {
            delete query[element]
          }
          router.replace({ name: 'category-market', params: { id: category }, query: query });
        }
      });
    }else if (route.name == 'category-market') {
      if(value == route.params.id) {
        if (route.query?.categories?.length) {
          Object.keys(query).forEach(element => {
            if (element == 'categories') {
              let category = query[element][0]
              query[element].shift()
              if (!query[element].length) {
                delete query[element]
              }
              router.replace({ name: 'category-market', params: { id: category }, query: query });
            }
          });
        }else {
          router.replace({ name: 'market', query: query });
        }
      }else {
        if(isSubMenu) {
          if (!props.values[value]) {
            if (Array.isArray(query[props.group])) {
              query[props.group] = [...query[props.group], value];
            } else if (query[props.group]) {
              query[props.group] = [query[props.group], value];
            } else {
              query[props.group] = [value];
            }
          } else {
            if (Array.isArray(query[props.group])) {
              query[props.group] = query[props.group].filter(
                (el) => el !== value
              );
              if (query[props.group].length === 0) {
                delete query[props.group];
              }
            } else if (query[props.group] === value) {
              delete query[props.group];
            }
          }
          emit('update:modelValue', !props.values[value], value)
        } else {
          if (!props.modelValue) {
            if(props.count === 0){
              return
            }
            if (Array.isArray(query[props.group])) {
              if(props.group === 'Sale and offers'){
                query[props.group] = [value];
              }else {
                query[props.group] = [...query[props.group], value];
              }
            } else if (query[props.group]) {
              if(props.group === 'Sale and offers'){
                query[props.group] = [value];
              }else {
                query[props.group] = [query[props.group], value];
              }
            } else {
              query[props.group] = [value];
            }
          } else {
            if (Array.isArray(query[props.group])) {
              query[props.group] = query[props.group].filter(
                (el) => el !== value
              );
              if (query[props.group].length === 0) {
                delete query[props.group];
              }
            } else if (query[props.group] === value) {
              delete query[props.group];
            }
          }
          emit('update:modelValue', !props.modelValue, value)
        }
        router.replace({ name: route.name, params: route.params, query: query });
      }
    }
  }
};
</script>
