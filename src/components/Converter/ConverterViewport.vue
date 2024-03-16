<script setup lang="ts">

import ConverterForm from "@/components/Converter/ConverterForm.vue";

import {useImageActions} from "@/composables/useImageActions.ts";

import {TUuid} from "@/interfaces/convertingFormInterfaces.ts";
import {IConverterViewportProps} from "@/interfaces/propsInterfaces.ts";

defineProps<IConverterViewportProps>()

const {removeImage} = useImageActions()

function removeHandler(uuid: TUuid) {
  removeImage(uuid)
}
</script>

<template>
  <div class="container">
    <div class="converter-title">
      To Webp Converter
    </div>
    <ul class="images-list">
      <li
          v-for="(imageState, index) in imagesList"
          class="images-list__item"
          :key="index"
      >
        <ConverterForm
            :image-name="imageState.image?.name"
            :image-size="imageState.image?.size"
            :image-src="imageState.image?.src"
            :file="imageState.image?.file"
            :uuid="imageState.image?.uuid"
            :converting-event="convertingEvent"
            @on-remove="removeHandler"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.converter-title {
  font-size: 24px;
  margin-bottom: 25px;
}

.images-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}
</style>