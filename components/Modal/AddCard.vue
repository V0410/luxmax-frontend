<template>
    <BaseModal
        type="horizontal"
        :isShow="isShow"
        @close="$emit('close')"
        :title="$t('Add New Card')"
        :desc="$t('Add your card details.')"
    >
        <template #top>
            <div
                style="
                    background: radial-gradient(
                        50% 144.63% at 50% 50%,
                        #627860 0%,
                        rgba(98, 120, 96, 0.8) 100%
                    );
                "
                class="mb-6 flex justify-center items-center py-8"
            >
                <BaseBankCard
                    :data="addCardForm"
                    :type="2"
                    :colorIndex="3"
                    class=""
                />
            </div>
        </template>
        <template #body>
            <Form
                @submit="submitForm"
                :validation-schema="Schema"
                v-slot="{ meta }"
                class="h-screen laptop:h-fit"
            >
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <BaseInput
                            class="flex-grow"
                            v-model="addCardForm.card_name"
                            :maxlength="30"
                            :label="$t(`Name on card`)"
                            :placeholder="$t(`Cardholder Name`)"
                            name="card_name"
                            size="s"
                        />
                        <BaseInput
                            class="w-[120px]"
                            v-model="addCardForm.expiry"
                            :maxlength="5"
                            :label="$t(`Expiry`)"
                            :placeholder="$t(`MM/YY`)"
                            name="expiry"
                            size="s"
                        />
                    </div>
                    <div class="flex items-center gap-4">
                        <BaseInput
                            class="flex-grow"
                            v-model.trim="addCardForm.card_number"
                            :maxlength="20"
                            :label="$t(`Card number`)"
                            :placeholder="$t(`Your Card Number (No Spaces)`)"
                            name="card_number"
                            size="s"
                        />
                        <BaseInput
                            class="w-[120px]"
                            v-model="addCardForm.cvv"
                            :maxlength="4"
                            :label="$t(`CVV`)"
                            :placeholder="$t(`CVV`)"
                            name="cvv"
                            size="s"
                        />
                    </div>
                    <!-- <BaseInputCheckbox
            v-model="addCardForm.isDefault"
            name="isDefault"
            :text="$t('Set as default payment method')"
          /> -->
                </div>
                <div class="w-full mt-8 flex [&>*]:flex-grow gap-3">
                    <BaseButton
                        :text="$t(`Cancel`)"
                        styleType="outlined"
                        type="reset"
                        size="s"
                        @click="$emit('close')"
                        buttonId="cancel-add-card"
                    />
                    <BaseButton
                        :text="$t(`Confirm`)"
                        size="s"
                        :isLoading="isLoading"
                        :isDisabled="!meta.valid"
                        buttonId="confirm-card"
                    />
                </div>
                <!-- <div v-if="errorMessage" class="font-medium text-danger text-center text-sm">{{ errorMessage }}</div> -->
            </Form>
        </template>
    </BaseModal>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

defineProps({
    isShow: Boolean,
});

const { $cardRegex, $expiryRegex, $cvvRegex } = useNuxtApp();
const isLoading = ref(false);
const errorMessage = ref(false);

const emits = defineEmits(["close"]);

const { addCard, cards } = useCheckout();

const addCardForm = reactive({
    bank: "",
    card_number: "",
    card_name: "",
    expiry: "",
    cvv: "",
});

watch(
    () => addCardForm.expiry
    // (newVal, oldVal) => {
    //   if (newVal.length > oldVal.length) {
    //     addCardForm.expiry = newVal.replace(
    //       /^(1\d*|0?[2-9]|10|11|12(?=\/|$))$/,
    //       function (match) {
    //         if (/^1/.test(match) || /^(10|11|12)$/.test(match)) {
    //           if (/^(10|11|12)$/.test(match)) {
    //             return match + "/";
    //           } else {
    //             return match;
    //           }
    //         } else if (/^[2-9]/.test(match)) {
    //           // Case 2: Starts with 2 to 9, add 0 before and add / after
    //           return "0" + match + "/";
    //         } else if (/^0[1-9]/.test(match)) {
    //           // Case 2: Starts with 2 to 9, add 0 before and add / after
    //           return match + "/";
    //         } else {
    //           // Case 4: Starts with a number above 12, delete it
    //           return "";
    //         }
    //       }
    //     );
    //   }
    // }
);

const Schema = Yup.object().shape({
    card_number: Yup.string()
        .matches($cardRegex, "Card number is not valid")
        .required(),
    card_name: Yup.string().required(),
    expiry: Yup.string().matches($expiryRegex, "Expiry is not valid"),
    cvv: Yup.string().matches($cvvRegex, "CVV is not valid"),
});

const resetForm = () => {
    addCardForm.bank = "";
    addCardForm.card_number = "";
    addCardForm.card_name = "";
    addCardForm.expiry = "";
    addCardForm.cvv = "";
};

const submitForm = async () => {
    errorMessage.value = null;
    isLoading.value = true;
    const form = { ...addCardForm };
    // form.expiry = `${form.expiry.split('-')[1]}/${form.expiry.split('-')[0].split('')[2]}${form.expiry.split('-')[0].split('')[3]}`
    delete form.bank;
    const payload = {
        body: {
            cardNumber: addCardForm.card_number.toString(),
            cardName: addCardForm.card_name.toString(),
            expiry: addCardForm.expiry,
            cvv: addCardForm.cvv,
        },
    };
    const { data, error } = await addCard(payload);
    isLoading.value = false;
    if (!error.value) {
        resetForm();
        await cards();
        emits("close");
    } else {
        errorMessage.value = error.value.data.msg;
    }
};
</script>
