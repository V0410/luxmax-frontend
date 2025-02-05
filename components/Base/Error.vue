<template v-if="text">
  <div
    class="font-light text-sm leading-normal text-danger text-center first-letter:capitalize"
    v-text="getErrorMessage(text)"
  />
</template>

<script setup>
const props = defineProps({
  text: String,
});

const getErrorMessage = (text) => {
  if(typeof text === 'string') {
    return text;
  } else if(text instanceof Array) {
    return text[0];
  } else {
    console.log(text);
    return text;
  }
}

</script>
