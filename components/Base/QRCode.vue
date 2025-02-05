<template>
    <canvas ref="canvas" :style="isSmall ? `width: 90px !important; height: 90px !important;` : `min-width: 220px !important; min-height: 220px !important;`" />
</template>

<script setup>
import QRCode from 'qrcode'

const props = defineProps({
    link: String,
    isSmall: Boolean
})

const canvas = ref()

onMounted(() => {
  QRCode.toCanvas(canvas.value, props.link, function (error) {
    if (error) console.error(error)
  })
})
</script>