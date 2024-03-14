<script setup lang="ts">
import {computed} from "vue";
import {IFilePreviewProps} from "@/interfaces/propsInterfaces.ts";

const props = defineProps<IFilePreviewProps>()

const style = computed(() => [
  props.imageSrc ? `background-image: url(${props.imageSrc})` : ''
].join('; '))
</script>

<template>
  <div class="wrapper">
    <div
        class="preview"
        :style="style"
    >
      <img
          :src="imageSrc"
          :alt="imageName"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}

.preview {
  position: relative;
  width: 0;
  height: 0;
  padding-left: 100%;
  padding-top: 60%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  &:after {
    top: 0;
    left: 0;
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
  }

  img {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: contain;
    width: 100%;
    height: 100%;
    padding: 5px;
  }
}
</style>