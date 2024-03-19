<script setup lang="ts">
import {useImageActions} from "@/composables/useImageActions.ts";
import {computed, reactive, watch} from "vue";

import IconButton from "@/components/UI/IconButton.vue";
import ConverterProgress from "@/components/Converter/ConverterProgress.vue";
import FileUploadSize from "@/components/Converter/fields/FileUploadSize.vue";
import FileConvertStatus from "@/components/Converter/fields/FileConvertStatus.vue";
import ConverterFormCard from "@/components/Converter/ConverterFormCard.vue";
import ConverterFormHeader from "@/components/Converter/ConverterFormHeader.vue";

import {IConvertingFormState} from "@/interfaces/convertingFormInterfaces.ts";
import {IConverterFormProps} from "@/interfaces/propsInterfaces.ts";

import {iconNames} from "@/helpers/iconsHelper.ts";
import {colors} from "@/helpers/colorsHelper.ts";

import {createFormData, downloadImage} from "@/utils";
import {usePostImageSingle} from "@/composables/usePostImageSingle.ts";

const props = withDefaults(defineProps<IConverterFormProps>(), {
  convertingEvent: false,
  cancelUploadEvent: false,
  imageName: '',
  imageSrs: '',
  imageSize: 0
})
const emit = defineEmits(['onRemove'])

const {addConvertedImage, convertedImageGetter} = useImageActions()
const {progress, request, cancelRequest} = usePostImageSingle()

const state: IConvertingFormState = reactive({
  isLoading: false,
  isError: false
})

const convertedImage = computed(() => {
  return convertedImageGetter(props.uuid).value
})

const isConvertedImage = computed(() => {
  return !!convertedImage.value?.src
})

const progressPercent = computed(() => {
  return progress?.value?.progress ? progress?.value?.progress * 100 : 0
})

const loadComplete = computed(() => {
  return progressPercent.value === 100
})

const lineColor = computed(() => {
  if (state.isError) {
    return colors.ERROR
  }
  if (isConvertedImage.value) {
    return colors.DOWNLOAD
  }
  if (loadComplete.value && state.isLoading) {
    return colors.CONVERT
  }

  return colors.LOADING
})

const totalValue = computed(() => {
  return !isConvertedImage.value ? progress?.value?.total || 0 : 1
})

const loadedValue = computed(() => {
  return !isConvertedImage.value ? progress?.value?.loaded || 0 : 1
})

const loadStatusTitle = computed(() => {
  if (state.isError) return 'error'
  if (loadComplete.value && !state.isLoading) return 'complete'

  return loadComplete.value ? 'converting...' : 'loading...'
})

async function convertHandler() {
  if (convertedImage.value) return

  const formData = createFormData({
    file: props.file,
    uuid: props.uuid
  })

  if (!formData) return

  state.isLoading = true
  state.isError = false

  await request(formData)
      .then(({data}) => {
        addConvertedImage(data)
        state.isLoading = false
      })
      .catch(() => {
        state.isError = true
      })
}

function downloadHandler() {
  if (!convertedImage.value) return

  downloadImage({
    name: convertedImage.value.name,
    src: convertedImage.value.src
  })
}
function removeHandler() {
  cancelRequest()
  emit('onRemove', props.uuid)
}

watch(() => props.convertingEvent, value => {
  if (value) convertHandler()
}, {
  immediate: true
})

watch(() => props.cancelUploadEvent, value => {
  if (value) cancelRequest()
}, {
  immediate: true
})
</script>

<template>
  <form class="converter-form">
    <ConverterFormHeader
        class="transition convert-header"
        :image-name="imageName"
        @on-remove="removeHandler"
    />
    <div class="form-content">
      <div class="cards">
        <transition name="fade" appear>
          <ConverterFormCard
              class="transition convert-before"
              :image-src="imageSrc"
              :image-name="imageName"
              :image-size="imageSize"
          >
            <template v-slot:fields>
              <FileUploadSize
                  class="convert-upload-size"
                  v-if="state.isLoading || loadComplete"
                  :loaded="progress?.loaded || 0"
                  :total="progress?.total || 0"
              />
              <FileConvertStatus
                  class="convert-status"
                  v-if="state.isLoading || loadComplete"
                  :label="loadStatusTitle"
                  :color="lineColor"
              />
            </template>
          </ConverterFormCard>
        </transition>
        <transition name="fade" appear>
          <ConverterFormCard
              v-if="convertedImage?.src"
              class="transition convert-after"
              :image-name="convertedImage?.name"
              :image-src="convertedImage?.src"
              :image-size="convertedImage?.size"
          />
        </transition>
      </div>
      <div class="buttons">
        <transition name="fade" appear>
          <IconButton
              :icon="iconNames.CONVERT"
              :disabled="!!convertedImage?.src"
              :color="colors.CONVERT"
              use-transform
              title="convert"
              class="transition convert-button"
              @on-click="convertHandler"
              @click="convertHandler"
          />
        </transition>
        <transition name="fade" appear>
          <IconButton
              v-if="convertedImage?.src"
              :icon="iconNames.DOWNLOAD"
              :color="colors.DOWNLOAD"
              use-transform
              class="transition convert-download"
              title="download"
              @on-click="downloadHandler"
          />
        </transition>
      </div>
    </div>
    <transition name="fade" appear>
      <ConverterProgress
          class="transition image-load-progress"
          :max-value="totalValue"
          :current-value="loadedValue"
          :line-color="lineColor"
      />
    </transition>
  </form>
</template>

<style scoped lang="scss">
@import "../../assets/css/animation";

.transition {
  transition: .2s ease;
}

.converter-form {
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 2px dashed green;
  border-radius: 15px;
  padding: 15px;
  position: relative;
  overflow: hidden;
}


.form-content {
  display: flex;
  gap: 25px;
  flex: 100%;
}

.cards {
  display: flex;
  gap: 15px;
  flex: 1;
  flex-wrap: wrap;
}

$convertCardGap: 15px;
.convert-before, .convert-after {
  display: flex;
  align-items: center;
  gap: $convertCardGap;
}

.convert-before {
  flex: 1 auto;
}

.convert-after {
  flex: none;
}

.upload-status {
  display: flex;
}

.buttons {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;
  flex: none;
}

.convert-title {
  width: 100%;
  text-align: left;

  &:first-letter {
    text-transform: uppercase;
  }
}

.image-load-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.convert-download {
  margin-top: auto;
}
</style>