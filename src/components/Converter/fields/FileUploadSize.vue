<script setup lang="ts">
import FileSize from "@/components/Converter/fields/FileSize.vue";
import {IFileUploadSizeProps} from "@/interfaces/propsInterfaces.ts";

defineProps<IFileUploadSizeProps>()
</script>

<template>
  <div class="upload-status">
    <FileSize
        class="upload-size__loaded"
        :size="loaded"
    />
    <FileSize
        class="upload-size__total"
        :size="total"
    />
  </div>
</template>

<style scoped lang="scss">
.upload-size__loaded {
  &:after {
    content: '/';
  }
}
</style>