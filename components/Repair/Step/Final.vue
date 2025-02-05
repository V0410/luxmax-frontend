<template>
  <div>
    <template v-if="productDetail.plan === 'INSTANT_SELL'">
      <RepairInstantSell
        :data="productDetail"
        :suggestedPrice="suggestedPrice"
        @back="$emit('back')"
      />
    </template>
    <template v-else-if="productDetail.plan === 'SELL_WITHOUT_REPAIR'">
      <RepairSellWithoutRepair
        :data="productDetail"
        :suggestedPrice="suggestedPrice"
        @back="$emit('back')"
      />
    </template>
    <template
      v-else-if="productDetail.plan === 'REPAIR_AND_SELL_IN_OUR_COMMUNITY'"
    >
      <RepairAndSell
        :data="productDetail"
        :suggestedPrice="suggestedPrice"
        @back="$emit('back')"
      />
    </template>
  </div>
</template>

<script setup>
defineProps({
  offers: Object,
  selectedOffer: String,
});
const route = useRoute();
const { product, productPlans } = useItem();
const { data: productDetail } = await product(route.params.id);
const { data: plans } = await productPlans(route.params.id);
defineEmits(["back"]);

const suggestedPrice = computed(() => {
  const ourPlan = plans?.value?.data?.filter(
    (el) => el.plan == productDetail.value.plan
  )[0];
  return ourPlan.sellPrice >= 0
    ? ourPlan.sellPrice + 10
    : ourPlan.repirPrice
    ? ourPlan.repirPrice
    : 10;
});
</script>
