<script setup lang="ts">
import {IConvertedImagesCounterProps} from "@/interfaces/propsInterfaces.ts";

defineProps<IConvertedImagesCounterProps>()
</script>

<template>
  <div class="images-counter">
    <div class="loaded">{{ convertedImagesAmount }}</div>
    <div class="total">{{ imagesAmount }}</div>
  </div>
</template>

<style scoped lang="scss">
.images-counter {
  display: flex;
  align-items: center;
}

.loaded {
  &:after {
    content: '/';
  }
}
</style>