<script setup lang="ts">

import FilePreview from "@/components/Converter/fields/FilePreview.vue";
import FileSize from "@/components/Converter/fields/FileSize.vue";
import {IConvertFormCartProps} from "@/interfaces/propsInterfaces.ts";

defineProps<IConvertFormCartProps>()
</script>

<template>
  <div class="card">
    <FilePreview
        class="convert-preview"
        :image-src="imageSrc"
        :image-name="imageName"
    />
    <div class="upload-info">
      <FileSize
          :size="imageSize"
      />
      <slot name="fields"/>
    </div>
    <slot name="buttons"/>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
}
.image-name {
  flex: 100%;
  text-align: left;
  font-size: 14px;
}

.convert-preview {
  width: 200px;
}
.upload-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  text-align: left;
  gap: 10px;
}

</style>