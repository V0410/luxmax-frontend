<template>
    <div
        class="flex flex-col gap-12 items-center py-6 px-4 laptop:px-0"
        id="paymentAddress"
    >
        <div class="flex flex-col items-center gap-6 w-full">
            <IconCheckCircle
                class="w-14 laptop:w-20 h-14 laptop:h-20 fill-p7"
            />
            <div
                v-text="'Your payment has been successful.'"
                id="payment-success"
                class="text-p8 text-xl laptop:text-2xl text-center laptop:w-1/3"
            />
            <div class="laptop:text-lg text-t9 laptop:w-1/2 text-center mb-4">
                <div>
                    We have sent you the receipt to your
                    {{ data?.user?.email }} email address.
                </div>
            </div>
            <BaseButton
                styleType="outlined"
                text="Print Order Confirmation"
                @click="printPage"
                classes="printOrderConfirmation"
            />
        </div>
        <div class="text-center text-p8 text-xl laptop:text-2xl laptop:w-3/4">
            We'll be collecting your items on
            {{ formatDateTime(data?.items[0].dryCleaningItem.startCollection) }} between
            {{ formatTime(data?.items[0].dryCleaningItem.startCollection) }} and
            {{ formatTime(data?.items[0].dryCleaningItem.endCollection) }}
            from the address you've provided: {{ data?.address?.postalCode }} |
            {{ data?.address?.address }} | {{ data?.address?.city }} |
            {{ data?.address?.country }} , Please make sure that you're available at the specified address during this time window.
        </div>
    </div>
</template>

<script setup>
import { DateTime } from "luxon";

const props = defineProps({
    data: Object,
});

const printPage = () => {
    var printContent = document.getElementById("paymentAddress").innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
};


const formatDateTime = (dateTimeString) => {
    const date = DateTime.fromISO(dateTimeString).setZone("Europe/London");
    const day = date.day;
    const suffix =
        day === 1 || day === 21 || day === 31
            ? "st"
            : day === 2 || day === 22
            ? "nd"
            : day === 3 || day === 23
            ? "rd"
            : "th";
    const month = date.toLocaleString({
        month: "long",
    });

    return `${month} ${day}${suffix}`;
};

const formatTime = (dateTimeString) => {
    const date = DateTime.fromISO(dateTimeString).setZone("Europe/London");
    return date.toLocaleString({
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
};


</script>


<style>
@media print {
  .printOrderConfirmation {
    margin-bottom: 20px;
  }
}
</style>

