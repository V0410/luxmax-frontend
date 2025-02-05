<template>
    <div class="flex flex-col gap-12 py-6 px-6">
        <div class="flex flex-col items-center gap-6">
            <IconCheckCircle
                class="w-14 laptop:w-20 h-14 laptop:h-20 fill-p7"
            />
            <div v-text="title" class="text-p8 text-2xl text-center" />
            <div
                v-text="description"
                class="text-lg text-t9 w-1/4 text-center"
                id="payment-success"
            />
        </div>
        <div class="flex flex-col laptop:flex-row gap-14">
            <div class="laptop:w-7/12 flex flex-col gap-4">
                <div
                    v-text="$t('Bank Account Details')"
                    class="text-p9 text-lg laptop:text-xl"
                />
                <div
                    class="p-6 border border-t1 flex items-center gap-6 text-sm laptop:text-base"
                >
                    <IconViewer
                        v-if="bank?.name"
                        :name="bank?.name"
                        class="h-[48px]"
                    />
                    <div class="text-t9" v-text="bank?.number" />
                    <div class="h-full w-[1px] bg-t1" />
                    <div class="text-t9" v-text="`EXP : ${bank?.exp}`" />
                </div>
                <div class="mt-6 text-xs laptop:text-sm text-t9">
                    <li>Transfer may take [estimated transfer time].</li>
                    <li>
                        For any concerns or inquiries, contact our support team.
                    </li>
                    <li>Note: Nominal processing fee deducted.</li>
                </div>
            </div>
            <div class="laptop:w-5/12 flex flex-col gap-8">
                <div
                    v-text="$t('Summery')"
                    class="text-lg laptop:text-xl text-p9"
                />
                <div class="flex flex-col gap-4 text-xs laptop:text-sm">
                    <div class="flex justify-between">
                        <div class="text-t6">Transaction ID</div>
                        <div class="text-t9">{{ summery?.id }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-t6">Withdrawal Amount</div>
                        <div class="text-t9">£{{ summery?.amount }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-t6">Withdrawal Date</div>
                        <div class="text-t9">{{ summery?.date }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    description: String,
    bank: Object,
    summery: Object,
});
</script>
