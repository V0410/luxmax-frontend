<template>
    <BaseModal
      v-if="!justMobile && !mobileFloat"
      type="left"
      hasClose
      isDesktopOnly
      size="l"
      :isShow="isShow"
      @close="$emit('close')"
      :title="title"
      :desc="desc"
    >
      <template #body>
        <BaseInputSearch v-if="hasSearch" 
          :maxlength="50"
          :name="inputName"
          noErrorMessage
          v-model="searchTerm" :placeholder="searchPlaceholder || $t('Search')" class="w-full mb-10" />
        <div class="grid grid-cols-3 gap-10 mb-6">
          <BaseInputRadio
            :modelValue="selectedItem === item.value"
            v-for="item in itemsToShow"
            :key="item.id"
            :text="item.label"
            @click="$emit('itemSelected', item.value)"
          />
        </div>
      </template>
    </BaseModal>
    <div v-else-if="mobileFloat && isShow" class="absolute  top-16 p-4 bg-white max-h-[276px] w-[200px] overflow-scroll shadow-s-4 hidden laptop:block" :class="floatLeft ? 'right-0' : 'left-0'">
      <BaseInputSearch v-if="hasSearch"
          :maxlength="50"
          noErrorMessage
          size="s"
          :name="inputName"
          v-model="searchTerm" :placeholder="searchPlaceholder || $t('Search Brand')" class="w-full mb-6" @blur="()=>$emit('blured')" />
        <div class="flex flex-col gap-4 w-full">
            <div
              v-for="item in itemsToShow"
              :key="item.id"
              class="p-3 text-start flex justify-between items-center cursor-pointer gap-2"
              :class="selectedItemRes === item.value ? ' bg-p1 order-1' : 'order-2'"
              @click="select(item.value)"
            >
            <div v-text="item.label" />
            <IconTickCircle v-show="selectedItemRes === item.value" class="fill-p7 w-5 h-5" />
          </div>
        </div>
    </div>
    <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
      :title="title"
      fixedHeight
    >
      <template #body>
        <BaseInputSearch v-if="hasSearch"
          :maxlength="50"
          noErrorMessage
          size="s"
          :name="inputName"
          v-model="searchTerm" :placeholder="searchPlaceholder || $t('Search Brand')" class="w-full" />
        <div class="flex flex-col gap-4 mt-6 w-full mb-14">
          <template v-if="mobileFloat">
            <div
            v-for="item in itemsToShow"
            :key="item.id"
            class="p-3 text-start flex justify-between items-center gap-2"
            :class="selectedItemRes === item.value ? ' bg-p1 order-1' : 'order-2'"
            @click="selectedItemRes = item.value"
            >
            <div v-text="item.label" />
            <IconTickCircle v-show="selectedItemRes === item.value" class="fill-p7 w-5 h-5" />
          </div>
        </template>
        <template v-else>
          <BaseInputRadio
            v-for="item in itemsToShow"
            :key="item.id"
            :modelValue="selectedItem === item.value"
            :text="item.label"
            @click="$emit('itemSelected', item.value)"
          />
        </template>
        </div>
        <div class="w-full py-5 fixed bottom-0 bg-white">
          <div class="mx-4 flex [&>*]:flex-grow gap-3">

            <BaseButton
              :text="$t('Clear')"
              styleType="outlined"
              size="s"
              @click="clear"
            />
            <BaseButton :text="$t('Apply')" size="s" 
              @click="$emit('itemSelected', selectedItemRes)"
            />
          </div>
        </div>
      </template>
    </BaseBottomSheet>
</template>

<script setup>
const props = defineProps({
  isShow: Boolean,
  items: Array,
  selectedItem: String,
  title: String,
  desc: String,
  hasSearch: Boolean,
  searchPlaceholder: String,
  justMobile: Boolean,
  mobileFloat: Boolean,
  floatLeft: Boolean,
  inputName: String
});
const emit = defineEmits(['itemSelected', 'blured'])

const selectedItemRes = ref(props.selectedItem)

const searchTerm = ref('')

const itemsToShow = computed(() => {
  if(!searchTerm.value){
    return props.items
  }
  return props.items.filter(el => el.label.toUpperCase().includes(searchTerm.value.toUpperCase()) || el.label.toUpperCase().includes(searchTerm.value.toUpperCase()))
})
const select = (selected) => {
  searchTerm.value = ''
  selectedItemRes.value = selected
  emit('itemSelected', selected)
}

const clear = () => {
  searchTerm.value = ''
  selectedItemRes.value = ''
  emit('itemSelected', selectedItemRes.value)
}
</script>
