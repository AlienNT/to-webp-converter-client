<script setup lang="ts">
interface IConvertedImagesCounterProps {
  convertedImagesAmount: number,
  imagesAmount: number,
}

defineProps<IConvertedImagesCounterProps>()
</script>

<template>
  <div class="images-counter">
    <div class="loaded">{{ convertedImagesAmount }}</div>
    /
    <div class="total">{{ imagesAmount }}</div>
  </div>
</template>

<style scoped lang="scss">
.images-counter {
  display: flex;
  align-items: center;
}
</style>