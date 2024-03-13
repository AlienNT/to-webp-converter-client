<script setup lang="ts">

import {iconNames} from "@/helpers/iconsHelper.ts";
import {useImageActions} from "@/composables/useImageActions.ts";
import {useRequestStatus} from "@/composables/useRequestStatus.ts";

import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import ConvertedImagesCounter from "@/components/Converter/ConvertedImagesCounter.vue";
import IconButton from "@/components/UI/IconButton.vue";
import TextButton from "@/components/UI/TextButton.vue";

import {nextTick} from "vue";
import ConverterServerStatus from "@/components/Converter/ConverterServerStatus.vue";

const emit = defineEmits(['onConverting', 'onDownload'])

const {requestCount} = useRequestStatus()
const {resetImages} = useImageActions()

const {
  convertedImagesAmount,
  imagesAmount,
} = useImageActions()

async function convertAllHandler() {
  emit('onConverting', true)
  await nextTick(() => emit('onConverting', false))
}

function downloadAllHandler() {
  emit('onDownload')
}

function resetAllHandler() {
  resetImages()
}

</script>

<template>
  <footer
      class="convert-buttons-wrapper"
  >
    <ConverterServerStatus
        class="server-status"
    />
    <LoadingSpinner
        v-if="requestCount > 0"
        class="loading-indicator"
    />
    <template
        v-if="imagesAmount"
    >
      <ConvertedImagesCounter
          class="convert-image-counter"
          :converted-images-amount="convertedImagesAmount"
          :images-amount="imagesAmount"
      />
      <IconButton
          :icon="iconNames.REMOVE"
          :disabled="!imagesAmount"
          title="reset images"
          class="reset-button"
          @on-click="resetAllHandler"
      />
      <TextButton
          label="convert all"
          :disabled="convertedImagesAmount === imagesAmount"
          :background-color="`#ffbb54`"
          @on-click="convertAllHandler"
      />
      <TextButton
          label="download all"
          :disabled="!convertedImagesAmount"
          :background-color="`#5AB05AFF`"
          @on-click="downloadAllHandler"
      />
    </template>
  </footer>
</template>

<style scoped lang="scss">
.convert-buttons-wrapper {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  gap: 15px;
  position: sticky;
  bottom: 0;
  background: #232425;
  z-index: 1;
  min-height: 80px;
  align-items: center;
}

.server-status {
  justify-self: flex-start;

}

.convert-image-counter {
  margin-left: auto;
}
</style>