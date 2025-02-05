<template>
    <component :is="selectedIcon" />
</template>

<script setup>
const props = defineProps({ name: String });
const selectedIcon = shallowRef(null);
if (props.name === 'IconCreateAccount')
    selectedIcon.value = resolveComponent('IconCreateAccount');
else if (props.name === 'IconDelivery')
    selectedIcon.value = resolveComponent('IconDelivery');
else if (props.name === 'IconTips')
    selectedIcon.value = resolveComponent('IconTips');
else if (props.name === 'IconBasket')
    selectedIcon.value = resolveComponent('IconBasket');
else if (props.name === 'IconCredit')
    selectedIcon.value = resolveComponent('IconCredit');
else if (props.name === 'IconQoutes')
    selectedIcon.value = resolveComponent('IconQoutes');
else if (props.name === 'IconArrowCircleRight')
    selectedIcon.value = resolveComponent('IconArrowCircleRight');
else if (props.name === 'IconXCircle')
    selectedIcon.value = resolveComponent('IconXCircle');
else if (props.name === 'IconX') selectedIcon.value = resolveComponent('IconX');
else if (props.name === 'IconCalendar')
    selectedIcon.value = resolveComponent('IconCalendar');
else if (props.name === 'IconCheckCircle')
    selectedIcon.value = resolveComponent('IconCheckCircle');
else if (props.name === 'IconWarningCircle')
    selectedIcon.value = resolveComponent('IconWarningCircle');
else if (props.name === 'IconDanger')
    selectedIcon.value = resolveComponent('IconDanger');
else if (props.name === 'IconInfo')
    selectedIcon.value = resolveComponent('IconInfo');
else if (props.name === 'IconSetting')
    selectedIcon.value = resolveComponent('IconSetting');
else if (props.name === 'IconPlus')
    selectedIcon.value = resolveComponent('IconPlus');
else if (props.name === 'IconUser')
    selectedIcon.value = resolveComponent('IconUser');
else if (props.name === 'IconCardHolder')
    selectedIcon.value = resolveComponent('IconCardHolder');
else if (props.name === 'IconBookmark')
    selectedIcon.value = resolveComponent('IconBookmark');
else if (props.name === 'IconBookmarked')
    selectedIcon.value = resolveComponent('IconBookmarked');
else if (props.name === 'IconBookBookmark')
    selectedIcon.value = resolveComponent('IconBookBookmark');
else if (props.name === 'IconShoppingBag')
    selectedIcon.value = resolveComponent('IconShoppingBag');
else if (props.name === 'IconCurrencyCircle')
    selectedIcon.value = resolveComponent('IconCurrencyCircle');
else if (props.name === 'IconDelete')
    selectedIcon.value = resolveComponent('IconDelete');
else if (props.name === 'IconSellSingle')
    selectedIcon.value = resolveComponent('IconSellSingle');
else if (props.name === 'IconTickCircle')
    selectedIcon.value = resolveComponent('IconTickCircle');
else if (props.name === 'IconCreditCard')
    selectedIcon.value = resolveComponent('IconCreditCard');
else if (props.name === 'IconPaypal')
    selectedIcon.value = resolveComponent('IconPaypal');
else if (props.name === 'IconGooglePay')
    selectedIcon.value = resolveComponent('IconGooglePay');
else if (props.name === 'IconPencil')
    selectedIcon.value = resolveComponent('IconPencil');
else if (props.name === 'IconArrowDown')
    selectedIcon.value = resolveComponent('IconArrowDown');
else if (props.name === 'IconSpinnerGap')
    selectedIcon.value = resolveComponent('IconSpinnerGap');
else if (props.name === 'IconTruck')
    selectedIcon.value = resolveComponent('IconTruck');
else if (props.name === 'IconMapPin')
    selectedIcon.value = resolveComponent('IconMapPin');
else if (props.name === 'IconClock')
    selectedIcon.value = resolveComponent('IconClock');
else if (props.name === 'IconTag')
    selectedIcon.value = resolveComponent('IconTag');
else if (props.name === 'IconHandsIcon')
    selectedIcon.value = resolveComponent('IconHandsIcon');
else if (props.name === 'IconRuler')
    selectedIcon.value = resolveComponent('IconRuler');
else if (props.name === 'IconQuickSale')
    selectedIcon.value = resolveComponent('IconQuickSale');
else if (props.name === 'IconRepairCost')
    selectedIcon.value = resolveComponent('IconRepairCost');
else if (props.name === 'IconBuyerIntract')
    selectedIcon.value = resolveComponent('IconBuyerIntract');
else if (props.name === 'IconHigherPrice')
    selectedIcon.value = resolveComponent('IconHigherPrice');
else if (props.name === 'IconLock')
    selectedIcon.value = resolveComponent('IconLock');
else if (props.name === 'IconLocalShiping')
    selectedIcon.value = resolveComponent('IconLocalShiping');
else if (props.name === 'IconAutoRenew')
    selectedIcon.value = resolveComponent('IconAutoRenew');
else if (props.name === 'IconInfoCircle')
    selectedIcon.value = resolveComponent('IconInfoCircle');
else if (props.name === 'IconWarning')
    selectedIcon.value = resolveComponent('IconWarning');
else if (props.name === 'IconArrowCircleRight')
    selectedIcon.value = resolveComponent('IconArrowCircleRight');
else if (props.name === 'IconArrowLeftLight')
    selectedIcon.value = resolveComponent('IconArrowLeftLight');
else if (props.name === 'IconBenefitsIdentify')
    selectedIcon.value = resolveComponent('IconBenefitsIdentify');
else if (props.name === 'IconBenefitsExpertAdvice')
    selectedIcon.value = resolveComponent('IconBenefitsExpertAdvice');
else if (props.name === 'IconBenefitsTracking')
    selectedIcon.value = resolveComponent('IconBenefitsTracking');
else if (props.name === 'IconBenefitsTurnaround')
    selectedIcon.value = resolveComponent('IconBenefitsTurnaround');
else if (props.name === 'IconBenefitsCommunuty')
    selectedIcon.value = resolveComponent('IconBenefitsCommunuty');
else if (props.name === 'IconBenefitsQuickSale')
    selectedIcon.value = resolveComponent('IconBenefitsQuickSale');
else if (props.name === 'IconBenefitsNoNeed')
    selectedIcon.value = resolveComponent('IconBenefitsNoNeed');
else if (props.name === 'IconBenefitsHigherCost')
    selectedIcon.value = resolveComponent('IconBenefitsHigherCost');
else if (props.name === 'IconBenefitsUsers')
    selectedIcon.value = resolveComponent('IconBenefitsUsers');
else if (props.name === 'IconBenefitsEyeglasses')
    selectedIcon.value = resolveComponent('IconBenefitsEyeglasses');
else if (props.name === 'IconBenefitsDress')
    selectedIcon.value = resolveComponent('IconBenefitsDress');
else if (props.name === 'IconBenefitsWorld')
    selectedIcon.value = resolveComponent('IconBenefitsWorld');
else if (props.name === 'IconNeedle')
    selectedIcon.value = resolveComponent('IconNeedle');
else if (props.name === 'IconLightning')
    selectedIcon.value = resolveComponent('IconLightning');
else if (props.name === 'IconTagSingle')
    selectedIcon.value = resolveComponent('IconTagSingle');
else if (props.name === 'IconHandCoins')
    selectedIcon.value = resolveComponent('IconHandCoins');
else if (props.name === 'IconShoppingBagSingle')
    selectedIcon.value = resolveComponent('IconShoppingBagSingle');
else if (props.name === 'IconScan')
    selectedIcon.value = resolveComponent('IconScan');
else if (props.name === 'IconSignIn')
    selectedIcon.value = resolveComponent('IconSignIn');
else if (props.name === 'IconCreditCard')
    selectedIcon.value = resolveComponent('IconCreditCard');
else if (props.name === 'IconSignPost')
    selectedIcon.value = resolveComponent('IconSignPost');
else if (props.name === 'IconArrowUUpLeft')
    selectedIcon.value = resolveComponent('IconArrowUUpLeft');
else if (props.name === 'IconMajicWand')
    selectedIcon.value = resolveComponent('IconMajicWand');
else if (props.name === 'IconMoney')
    selectedIcon.value = resolveComponent('IconMoney');
else if (props.name === 'IconGauge')
    selectedIcon.value = resolveComponent('IconGauge');
else if (props.name === 'IconHandCoins')
    selectedIcon.value = resolveComponent('IconHandCoins');
else if (props.name === 'IconPackage')
    selectedIcon.value = resolveComponent('IconPackage');
else if (props.name === 'IconScroll')
    selectedIcon.value = resolveComponent('IconScroll');
else if (props.name === 'IconMajicWand')
    selectedIcon.value = resolveComponent('IconMajicWand');
else if (props.name === 'IconChecks')
    selectedIcon.value = resolveComponent('IconChecks');
else if (props.name === 'IconStoreFront')
    selectedIcon.value = resolveComponent('IconStoreFront');
else if (props.name === 'IconClockCountdown')
    selectedIcon.value = resolveComponent('IconClockCountdown');
else if (props.name === 'IconVisa')
    selectedIcon.value = resolveComponent('IconVisa');
else if (props.name === 'IconMaster')
    selectedIcon.value = resolveComponent('IconMaster');
else if (props.name === 'IconAmex')
    selectedIcon.value = resolveComponent('IconAmex');
else if (props.name === 'IconDiscover')
    selectedIcon.value = resolveComponent('IconDiscover');
else if (props.name === 'IconRepairService1')
    selectedIcon.value = resolveComponent('IconRepairService1');
else if (props.name === 'IconRepairService2')
    selectedIcon.value = resolveComponent('IconRepairService2');
else if (props.name === 'IconRepairService3')
    selectedIcon.value = resolveComponent('IconRepairService3');
else if (props.name === 'IconRepairService4')
    selectedIcon.value = resolveComponent('IconRepairService4');
else if (props.name === 'IconTimer')
    selectedIcon.value = resolveComponent('IconTimer');
else if (props.name === 'IconEyeglasses')
    selectedIcon.value = resolveComponent('IconEyeglasses');
else if (props.name === 'IconDress')
    selectedIcon.value = resolveComponent('IconDress');
else if (props.name === 'IconMoneyStroke')
    selectedIcon.value = resolveComponent('IconMoneyStroke');
else if (props.name === 'IconCleaningService1')
    selectedIcon.value = resolveComponent('IconCleaningService1');
else if (props.name === 'IconCleaningService2')
    selectedIcon.value = resolveComponent('IconCleaningService2');
else if (props.name === 'IconCleaningService3')
    selectedIcon.value = resolveComponent('IconCleaningService3');
else if (props.name === 'IconCleaningService4')
    selectedIcon.value = resolveComponent('IconCleaningService4');
else if (props.name === 'IconCleaningService5')
    selectedIcon.value = resolveComponent('IconCleaningService5');
else if (props.name === 'IconCleaningService6')
    selectedIcon.value = resolveComponent('IconCleaningService6');
</script>
