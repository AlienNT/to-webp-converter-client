<script setup lang="ts">

import {iconNames} from "@/helpers/iconsHelper.ts";
import {useImageActions} from "@/composables/useImageActions.ts";
import {useRequestStatus} from "@/composables/useRequestStatus.ts";

import ConvertedImagesCounter from "@/components/Converter/ConvertedImagesCounter.vue";
import ConverterServerStatus from "@/components/Converter/ConverterServerStatus.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import IconButton from "@/components/UI/IconButton.vue";
import TextButton from "@/components/UI/TextButton.vue";

import {computed, nextTick, ref, watch} from "vue";
import {colors} from "@/helpers/colorsHelper.ts";

const emit = defineEmits(['onConverting', 'onDownload'])

const {requestCount} = useRequestStatus()
const {resetImages} = useImageActions()

const {convertedImagesAmount, imagesAmount} = useImageActions()

const isShowLoader = ref(false)

const isLoading = computed(() => {
  return requestCount.value > 0
})

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

watch(() => isLoading.value, (value) => {
  value ? isShowLoader.value = value : setTimeout(() => isShowLoader.value = value, 200)
})

</script>

<template>
  <footer
      class="convert-buttons-wrapper"
  >
    <div class="container">
      <ConverterServerStatus
          class="server-status"
      />
      <transition name="fade" appear>
        <LoadingSpinner
            v-if="isShowLoader"
            class="loading-indicator"
        />
      </transition>
      <transition name="fade" appear>
        <div
            v-if="imagesAmount"
            class="convert-ui-elements"
        >
          <ConvertedImagesCounter
              class="convert-image-counter"
              :converted-images-amount="convertedImagesAmount"
              :images-amount="imagesAmount"
          />
          <IconButton
              :icon="iconNames.RESET"
              :color="colors.REMOVE"
              :disabled="!imagesAmount"
              title="reset images"
              class="reset-button"
              @on-click="resetAllHandler"
          />
          <TextButton
              label="convert"
              class="convert-all-button"
              :disabled="convertedImagesAmount === imagesAmount"
              :background-color="colors.CONVERT"
              @on-click="convertAllHandler"
          />
          <TextButton
              label="download"
              class="download-all-button"
              :disabled="!convertedImagesAmount"
              :background-color="colors.DOWNLOAD"
              @on-click="downloadAllHandler"
          />
        </div>
      </transition>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "../../assets/css/animation";

.convert-ui-elements {
  display: flex;
  gap: 15px;
  transition: .2s ease;
  align-items: center;

  @media #{$mediumScreen} {
    gap: 10px;
  }
}

.convert-buttons-wrapper {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  gap: 15px;
  position: sticky;
  bottom: 0;
  background: #28282a;
  z-index: 1;
  min-height: 80px;
  > .container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
}

.server-status {
  justify-self: flex-start;

  @media #{$mediumScreen} {
    font-size: 12px;
  }
}

.loading-indicator {
  transition: .2s;
  margin-right: auto;
}

.convert-image-counter {
  margin-left: auto;
  font-size: 14px;

  @media #{$mediumScreen} {
    font-size: 12px;
  }
}

.reset-button {
  align-items: center;
  display: flex;
  transition: .2s ease;

  &:hover {
    transform: rotate(-180deg)
  }
}

</style>