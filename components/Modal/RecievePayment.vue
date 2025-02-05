<template>
    <BaseModal
      type="horizontal"
      :isShow="isShow"
      @close="$emit('close')"
      :title="$t('Receive')"
    >
      <template #body>
        <div class="flex flex-col">
            <div>
                <div class=" text-t7 font-medium text-xs" v-text="$t('Receive Information')" />
                <div
                  class=" font-medium text-xl text-t9"
                  v-text="`+ £` + amount?.toLocaleString()"
                />
            </div>
            <div class="w-full mt-8 flex [&>*]:flex-grow gap-3">
                <BaseButton :text="$t(`Cancel`)" styleType="outlined" size="s" @click="$emit('close')" />
                <BaseButton :text="$t(`Receive`)" size="s" @click="submitReceivePayment"/>
            </div>
        </div>
      </template>
    </BaseModal>
</template>

<script setup>

const props = defineProps({
    isShow: Boolean,
    cards: Array,
    amount: Number
})

const emits = defineEmits(['close'])
const { t } = useI18n()


const router = useRouter()

const receivePaymentForm = reactive({
    selectedCard: null,
    amount: props.amount
})

const selectCard = (id) => {
    if(id === receivePaymentForm.selectedCard){
        receivePaymentForm.selectedCard = null
    }
    else{
        receivePaymentForm.selectedCard = id
    }
}

</script>
