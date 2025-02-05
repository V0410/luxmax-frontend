<template>
  <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
      title=""
    >
      <template #body>
        <div
            class="flex flex-col gap-8 w-full"
          >
            <CheckoutSummary
              :title="
                step === 1
                  ? $t('Summary')
                  : isLastStep
                  ? $t('Cost')
                  : $t('In your cart')
              "
              :dataRows="dataRows"
            />
            <div class="flex flex-col gap-8">
              <CheckoutProduct
                v-for="item in items"
                :key="item.id"
                :data="item"
              />
            </div>
          </div>
        <div class="w-full mt-8">
          <BaseButton
            :text="$t('Cancel')"
            styleType="outlined"
            size="s"
            @click="() => $emit('close')"
          />
        </div>
      </template>
    </BaseBottomSheet>
</template>

<script setup>
defineProps({
  isShow: Boolean,
  dataRows: Array,
  items: Array
});

const emits = defineEmits(["close"]);

</script>
