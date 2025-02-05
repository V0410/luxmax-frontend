<template>
  <div class="relative">
    <BaseSplitLayout class="mb-20">
      <template #left>
        <BaseFoldable class="flex flex-col bg-p1 p-6">
          <template #title>
            <div class="text-p9 font-medium text-xl flex">
              <IconBalance class="me-3 fill-gold" />
              <div v-text="$t(`Balance`)" />
            </div>
          </template>
          <template #default>
            <template v-if="data?.balance == 0">
              <div
                class="mt-8 text-p8 leading-normal text-center"
                v-text="$t('Insufficient balance for any withdrawal action')"
              />
            </template>
            <template v-else>
              <div
                class="mt-8 leading-normal flex justify-between items-center"
              >
                <div
                  class=" font-medium text-xl text-t9"
                  v-text="`+ £` + (data?.balance?.toLocaleString() || 0)"
                />
                <nuxt-link :to="{name: 'withdraw-request'}">
                  <BaseButton :text="$t(`Receive`)" size="s" />
                </nuxt-link>
              </div>
            </template>
          </template>
        </BaseFoldable>
        <BaseFoldable class="flex flex-col bg-p1 p-6">
          <template #title>
            <div class="text-p9 font-medium text-xl flex">
              <IconActivities class="me-3 fill-gold" />
              <div v-text="$t(`Activities`)" />
            </div>
          </template>
          <template #default>
            <template v-if="activities && Array.isArray(activities?.data) && activities.data?.length > 0">
              <div class="mt-8 leading-normal flex flex-col items-center gap-9">
                <template v-for="activity in activities?.data"
                      :key="activity?.time">
                <div class="flex items-center w-full">
                  <div class="pe-2 text-t5 text-xs">{{ activity?.createdAt?.split('T')[0] }}</div>
                  <div class="flex-grow border-b border-t1" />
                </div>
                <div class="w-full">
                  <div class="flex flex-col gap-6">
                    <div
                      class="flex justify-between items-center"
                    >
                      <div class="flex items-center gap-2">
                        <IconSell
                          v-if="activity?.type === `sell`"
                          class="fill-p9"
                        />
                        <IconBuy
                          v-else-if="activity?.type === `buy`"
                          class="fill-p9"
                        />
                        <div class="flex flex-col gap-1">
                          <div
                            class="text-p8 text-sm font-medium"
                            v-text="activity?.status.toLowerCase()"
                          />
                          <!-- <div class="text-t5 text-xs" v-text="activity?.type === 'sell' ? $t('Withdrawal') : $t('Deposit')" /> -->
                        </div>
                      </div>
                      <div
                        class="text-t9 font-medium text-sm"
                        v-text="
                          (activity?.type === `sell`
                            ? '+'
                            : activity?.type === `buy`
                            ? '-'
                            : '') +
                          ` £` +
                          activity?.amount
                        "
                      />
                    </div>
                  </div>
                </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div
                class="mt-8 text-p8 leading-normal text-center"
                v-text="$t(`You didn't have any transaction with your wallet`)"
              />
            </template>
          </template>
        </BaseFoldable>
      </template>
      <template #right>
        <CommonCards :cards="cards?.data" class="shadow-s-3 py-6 px-8 laptop:p-8 gap-8" />
      </template>
    </BaseSplitLayout>
    <ModalRecievePayment 
      :amount="balanceAmount"
      :cards="cards?.data"
      :isShow="isReceivePaymentModalShow"
      @close="toggleReceivePaymentModalShow" />
  </div>
</template>

<script setup>
definePageMeta({
  name: 'bank',
  key: route => route.fullPath,
  layout: false
})

const { $dateToShow } = useNuxtApp()

const cards = useState('cards')

const balanceAmount = ref(0);
const { account_info,withdrawList } = useAccount();
const { data } = await account_info()
balanceAmount.value = data.value?.balance

onBeforeMount(async() => {
  const cards = useState('cards')
  if(!cards.value){
    const {cards} = useCheckout()
    const {data, error} = await cards()
  }
})

const { data: activities, error } = await withdrawList()
//// receive payment modal

const isReceivePaymentModalShow = ref(false);
</script>
