<template>
  <div class="gridClass mb-6 laptop:mb-12">
    <div
      class="laptop:max-w-[672px] mx-auto w-full flex flex-col gap-6 laptop:gap-10 text-center items-center"
    >
      <div class="w-full flex flex-col gap-12">
        <!-- <div
         ref="container"
          class="text-p8 font-medium laptop:text-[28px] leading-normal"
          v-text="steps[currentStep].label"
        /> -->
        <div class="w-full flex flex-col gap-16">
          <div class="flex flex-col gap-12 w-full items-center">
            <div class="flex flex-col items-center gap-12">
              <!-- <NuxtImg alt=""
                class="w-[200px]"
                :src="maskImage || steps[currentStep].img"
                format="webp"
                quality="100"
              /> -->
            </div>
            <div class="text-start w-full text-xl text-p8 font-medium">
              <div class="leading-normal" v-text="$t('Material')" />
            </div>
            <div
              class="grid gap-4 w-full grid-cols-2 laptop:grid-cols-3 mx-auto"
            >
              <RepairSize
                v-for="material in materialsToShow"
                :key="material.id"
                :isSelected="selectedMaterial === material.text"
                @click="selectedMaterial = material.text"
                class="min-w-full laptop:min-w-[110px]"
                :text="material.text"
                :desc="material?.desc"
              />
            </div>
            <div
              class="w-full flex flex-col gap-4 text-start"
              v-show="selectedMaterial === 'other'"
            >
              <BaseAlert
                class="w-full cursor-default"
                type="warning"
                :desc="
                  $t(
                    'Luxmax cannot buy or sell unsupported Material, but we provide repair services. For more information, please see our terms and conditions.'
                  )
                "
                noClose
              />
              <BaseInput
                v-model="form.customMaterial"
                class="w-full"
                :maxlength="50"
                :label="$t('Name of the Material')"
                :placeholder="$t('e.g Velour, Bamboo Textile, etc.')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full items-center gap-6 text-start">
        <div class="flex flex-col items-center gap-1">
          <div class="flex flex-col gap-2 justify-center text-p8">
            <div
              class="leading-normal font-medium text-xl"
              v-text="$t('Select Most used color')"
            />
            <div
              v-text="
                $t(
                  'You need to specify a color vaguely. Luxmax experts will determine the exact color of the product.'
                )
              "
            />
          </div>
        </div>
        <div
          class="grid grid-cols-3 mobile-s:grid-cols-4 mobile-m:grid-cols-5 mobile-l:grid-cols-6 tablet:grid-cols-10 gap-4 w-full py-6 px-4 bg-p1 flex-wrap mx-auto"
        >
          <!-- <RepairColor
            v-if="extraColorComputed"
            :isSelected="selectedColor === selectedColor"
            @click="selectedColor = selectedColor"
            :rgb="extraColorComputed"
            :text="selectedColor"
          /> -->
          <RepairColor
            v-for="color in suggestedColors"
            :key="color.id"
            :value="color.text"
            :isSelected="selectedColor === color.text"
            @click="selectedColor = color.text"
            :rgb="color.rgb"
            :text="color.text"
          />
        </div>
      </div>
      <div
        class="laptop:mt-16 flex gap-4 w-full justify-center [&>*]:w-full laptop:[&>*]:w-[120px]"
      >
        <BaseButton
          buttonId="identify-select-material-and-color"
          styleType="outlined"
          :text="$t('Back')"
          @click="currentStep > 0 ? currentStep-- : $emit('back')"
        />
        <BaseButton
          buttonId="identify-back-material-and-color"
          :text="$t('Next')"
          @click="selectMaterialAndColor"
          :isDisabled="
            selectedMaterial === 'other'
              ? !form.customMaterial || !selectedColor
              : !selectedColor || !selectedMaterial
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedColor: String,
  selectedMaterial: String,
});

const route = useRoute();
const { product } = useItem();
const { data: item } = await product(route.params.id);
const emits = defineEmits(["materialAndColorSelected"]);

const { t } = useI18n();

const suggestedMaterials = computed(() =>
  item.value.category.name === "shoe"
    ? [
        { id: 0, value: "Canvas", text: t("Canvas") },
        { id: 1, value: "Fabric", text: t("Fabric") },
        { id: 2, value: "GG Canvas", text: t("GG Canvas") },
        { id: 3, value: "Leather", text: t("Leather") },
        { id: 4, value: "Leather GG", text: t("Leather GG") },
        { id: 5, value: "Metal", text: t("Metal") },
        { id: 6, value: "Precious", text: t("Precious") },
        { id: 7, value: "Velvet", text: t("Velvet") },
        { id: 8, value: "Suede", text: t("Suede") },
        { id: 9, value: "Cashmere", text: t("Cashmere") },
        { id: 10, value: "Wool", text: t("Wool") },
      ]
    : item.value.category.name === "ready_to_wear"
    ? [
        { id: 0, value: "Canvas", text: t("Canvas") },
        { id: 1, value: "Fabric", text: t("Fabric") },
        { id: 2, value: "GG Canvas", text: t("GG Canvas") },
        { id: 3, value: "Leather", text: t("Leather") },
        { id: 4, value: "Leather GG", text: t("Leather GG") },
        { id: 5, value: "Metal", text: t("Metal") },
        { id: 6, value: "Precious", text: t("Precious") },
        { id: 7, value: "Velvet", text: t("Velvet") },
        { id: 8, value: "Suede", text: t("Suede") },
        { id: 9, value: "Cashmere", text: t("Cashmere") },
        { id: 10, value: "Wool", text: t("Wool") },
      ]
    : item.value.category.name === "handbag"
    ? [
        { id: 0, value: "Canvas", text: t("Canvas") },
        { id: 1, value: "Fabric", text: t("Fabric") },
        { id: 2, value: "GG Canvas", text: t("GG Canvas") },
        { id: 3, value: "Leather", text: t("Leather") },
        { id: 4, value: "Leather GG", text: t("Leather GG") },
        { id: 5, value: "Metal", text: t("Metal") },
        { id: 6, value: "Precious", text: t("Precious") },
        { id: 7, value: "Velvet", text: t("Velvet") },
        { id: 8, value: "Suede", text: t("Suede") },
        { id: 9, value: "Cashmere", text: t("Cashmere") },
        { id: 10, value: "Wool", text: t("Wool") },
      ]
    : [
        { id: 0, value: "Canvas", text: t("Canvas") },
        { id: 1, value: "Fabric", text: t("Fabric") },
        { id: 2, value: "GG Canvas", text: t("GG Canvas") },
        { id: 3, value: "Leather", text: t("Leather") },
        { id: 4, value: "Leather GG", text: t("Leather GG") },
        { id: 5, value: "Metal", text: t("Metal") },
        { id: 6, value: "Precious", text: t("Precious") },
        { id: 7, value: "Velvet", text: t("Velvet") },
        { id: 8, value: "Suede", text: t("Suede") },
        { id: 9, value: "Cashmere", text: t("Cashmere") },
        { id: 10, value: "Wool", text: t("Wool") },
      ]
);

const suggestedColors = ref([
  { id: 0, value: "Black", text: t("Black"), rgb: "#000000" },
  { id: 1, value: "White", text: t("White"), rgb: "#ffffff" },
  { id: 2, value: "Gray", text: t("Gray"), rgb: "#A3A3A3" },
  { id: 3, value: "Yellow", text: t("Yellow"), rgb: "#F5CF06" },
  { id: 5, value: "Olive", text: t("Olive"), rgb: "#7B9925" },
  { id: 5, value: "Green", text: t("Green"), rgb: "#0B8110" },
  { id: 3, value: "Red", text: t("Red"), rgb: "#FF1414" },
  { id: 3, value: "Pink", text: t("Pink"), rgb: "#FF68B3" },
  { id: 4, value: "Purple", text: t("Purple"), rgb: "#7C0E8D" },
  { id: 6, value: "Blue", text: t("Blue"), rgb: "#1163DF" },
  { id: 7, value: "Teal", text: t("Teal"), rgb: "#0CBBBB" },
  { id: 8, value: "Brown", text: t("Brown"), rgb: "#673302" },
  { id: 9, value: "Beige", text: t("Beige"), rgb: "#C7A685" },
  { id: 10, value: "Cream", text: t("Cream"), rgb: "#FDF4DF" },
  { id: 11, value: "Multi Color", text: t("Multi Color") },
  { id: 12, value: "Pattern", text: t("Pattern") },
]);

const selectedColor = ref(props.selectedColor || null);
const selectedMaterial = ref(props.selectedMaterial || null);

const currentStep = ref(0);

// const extraColorComputed = computed(() => {
//   if(!props.colorList.value.data.find(el => el.value === props.selectedColor)){
//     const foundArray = Object.keys($colorNamesToRgb).find(el => el?.toUpperCase() === props.selectedColor?.toUpperCase())
//     if(foundArray){
//       return $colorNamesToRgb[foundArray]
//     }else{
//       selectedColor.value = null
//       return null
//     }
//   }
//   else return null
// })

////scroll

const container = ref();

const scrollToTop = () => {
  window.scrollTo({
    top: container.value?.offsetTop - 100,
    behavior: "smooth",
  });
};

watch(
  () => currentStep.value,
  () => {
    scrollToTop();
  }
);

////scroll

const materialsToShow = computed(() => [
  ...suggestedMaterials.value,
  { id: "other", value: "other", text: t("Other") },
]);

const form = reactive({
  customMaterial: "",
});

const selectMaterialAndColor = () => {
  emits("materialAndColorSelected", {
    color: selectedColor,
    material: selectedMaterial,
  });
};
</script>
