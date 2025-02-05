<template>
  <div class="w-full flex justify-between text-sm">
    <div
      v-if="noExtraInfo ? !isTimerFinished : true"
      v-text="
        isTimerFinished
          ? $t('Didn’t Receive Code?')
          : $t(`Time Remaining`) + ` : ${remainingTimeComputed}`
      "
      class="text-t8 font-light cursor-default"
    />
    <div
      v-if="!noExtraInfo"
      v-text="$t(`Resend Code`)"
      class=""
      :class="
        isTimerFinished ? 'text-p7 cursor-pointer' : 'text-p3 cursor-not-allowed'
      "
      @click="resendCode"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(["resendCode", "timeFinished"]);
const props = defineProps({
  totalTime: Number,
  noExtraInfo: Boolean
});

const remainingTime = ref(props.totalTime);

let interval;

const startCountdown = () => {
  if (interval) {
    clearInterval(interval);
  }
  remainingTime.value = props.totalTime;
  interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value = remainingTime.value - 1;
    } else {
      emits('timeFinished')
      if (interval) {
        clearInterval(interval);
      }
    }
  }, 1000);
};

const remainingTimeComputed = computed(() => {
  return (
    remainingMinutes(remainingTime.value) +
    ":" +
    remainingSeconds(remainingTime.value)
  );
});

const remainingMinutes = (remainingTime) => {
  return Math.trunc(remainingTime / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};
const remainingSeconds = (remainingTime) => {
  return (remainingTime % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const isTimerFinished = computed(() => {
  return remainingTime.value <= 0;
});

const resendCode = () => {
  if (isTimerFinished.value) {
    emits("resendCode");
    startCountdown()
  }
};

defineExpose({resendCode})
onMounted(() => {
  startCountdown();
});
</script>
