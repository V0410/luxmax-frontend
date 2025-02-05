<template>
  <div class="gridClass mb-6 laptop:mb-12">
    <div
      class="laptop:max-w-[672px] mx-auto w-full flex flex-col gap-6 laptop:gap-12 text-center items-center"
    >
      <div class="flex flex-col gap-4 text-p8">
        <div
          class="font-medium text-base laptop:text-[28px] leading-normal"
          v-text="$t('Confirm the Product all Detail')"
        />
        <div
          class="text-t5 text-sm laptop:text-lg"
          v-text="
            $t(
              'Please review this information and confirm its accuracy. If there are any errors, please return to the previous step and make corrections.'
            )
          "
        />
      </div>
      <div class="w-full flex flex-col gap-16">
        <div class="flex flex-col gap-10 w-full items-center">
          <div class="w-full text-start bg-p1 p-6 flex flex-col gap-6">
            <div class="text-lg font-medium" v-text="$t('Product Detail')" />
            <div class="w-full flex flex-col gap-3">
              <template v-for="(item, key) in data" :key="item">
                <div
                  v-if="
                    item &&
                    key !== 'brandId' &&
                    key !== 'problems' &&
                    key !== 'images'
                  "
                  class="flex w-full justify-between"
                  :class="
                    key === 'brand_name'
                      ? 'order-1'
                      : key === 'size'
                      ? 'order-2'
                      : 'order-6'
                  "
                >
                  <div class="text-t6" v-text="$detailNameMapper(key)" />
                  <div class="text-[#0D0D0D]" v-text="item" />
                </div>
              </template>
            </div>
          </div>
          <div
            v-if="allProblems.length > 0"
            class="w-full text-start bg-p1 p-6 flex flex-col gap-6"
          >
            <div class="text-lg font-medium" v-text="$t('Product Problems')" />
            <div class="w-full flex flex-col gap-4 capitalize">
              <template v-for="item in allProblems" :key="item">
                <div>
                  <span class="text-t10" v-text="item.name + ': '" />
                  <span class="text-t10" v-text="`(${item.count})`" />
                </div>
              </template>
            </div>
          </div>
          <div class="w-full text-start bg-p2 p-3 flex flex-col gap-6">
            <BaseInputCheckbox
              size="m"
              v-model="isConditionsAccepted"
              name="termsAndConditions"
              :text="
                $t(
                  'I confirm the accuracy of this info and agree to work with Luxmax under their '
                )
              "
              :clickableText="$t('Terms of Use.')"
              @clickableTextClick="
                () => {
                  isModalShow = true;
                }
              "
              hasIcon
            />
          </div>
        </div>
      </div>
      <div
        class="flex gap-4 w-full justify-center [&>*]:w-full laptop:[&>*]:w-[120px]"
      >
        <BaseButton
          buttonId="identify-confirm"
          styleType="outlined"
          :text="$t('Edit')"
          :isDisabled="isLoading"
          @click="$emit('back')"
        />
        <BaseButton
          :text="$t('Confirm')"
          :isLoading="isLoading"
          buttonId="identify-back-confirm"
          @click="$emit('confirm')"
          :isDisabled="!isConditionsAccepted"
        />
      </div>
    </div>
    <ModalTermsAndConditions
      v-model="isConditionsAccepted"
      :title="$t('Terms and conditions')"
      :isShow="isModalShow"
      class="min-w-[120px]"
      @close="isModalShow = false"
      @decline="decline"
      :buttonText="$t('Accept')"
      @confirm="confirm"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
  isLoading: Boolean,
});

const route = useRoute();
const { product, problems } = useItem();
const { data: productDetail, error } = await product(route.params.id);
const { data: issues } = await problems(1, 50);
const productProblems = ref(null);
const allProblems = ref([]);

const { $detailNameMapper } = useNuxtApp();
for (let issue of issues.value.data) {
  for (let problem of issue.problems) {
    for (let info of props.data.problems) {
      if (problem.id == info.problemId) {
        allProblems.value.push({
          name: problem.name,
          count: info.count,
        });
      }
    }
  }
}
const isModalShow = ref(false);

const isConditionsAccepted = ref(false);

const decline = () => {
  isConditionsAccepted.value = false;
  isModalShow.value = false;
};
const confirm = () => {
  isConditionsAccepted.value = true;
  isModalShow.value = false;
};
</script>
