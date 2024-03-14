<script setup lang="ts">
import {useImageActions} from "@/composables/useImageActions.ts";
import {computed, reactive, watch} from "vue";

import IconButton from "@/components/UI/IconButton.vue";
import ConverterProgress from "@/components/Converter/ConverterProgress.vue";

import {IConvertingFormState} from "@/interfaces/convertingFormInterfaces.ts";
import {IConverterFormProps} from "@/interfaces/propsInterfaces.ts";

import {iconNames} from "@/helpers/iconsHelper.ts";
import {createFormData, downloadImage} from "@/utils";
import {usePostImageSingle} from "@/composables/usePostImageSingle.ts";
import FileUploadSize from "@/components/Converter/fields/FileUploadSize.vue";
import FileConvertStatus from "@/components/Converter/fields/FileConvertStatus.vue";
import ConverterFormCard from "@/components/Converter/ConverterFormCard.vue";
import ConverterFormHeader from "@/components/Converter/ConverterFormHeader.vue";

const props = withDefaults(defineProps<IConverterFormProps>(), {
  convertingEvent: false,
  imageName: '',
  imageSrs: '',
  imageSize: 0
})
const emit = defineEmits(['onRemove'])

const {addConvertedImage, convertedImageGetter} = useImageActions()
const {progress, request} = usePostImageSingle()

const state: IConvertingFormState = reactive({
  isLoading: false,
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
  if (isConvertedImage.value) {
    return `#1EFF1EFF`
  }
  if (loadComplete.value && state.isLoading) {
    return `#ffcc10`
  }

  return `#11dbff`
})

const totalValue = computed(() => {
  return !isConvertedImage.value ? progress?.value?.total || 0 : 1
})

const loadedValue = computed(() => {
  return !isConvertedImage.value ? progress?.value?.loaded || 0 : 1
})

const loadStatusTitle = computed(() => {
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

  await request(formData).then(({data}) => {
    addConvertedImage(data)
    state.isLoading = false
  })

}

function downloadHandler() {
  if (!convertedImage.value) return

  downloadImage({
    name: convertedImage.value.name,
    src: convertedImage.value.src
  })
}

watch(() => props.convertingEvent, value => {
  if (value) {
    convertHandler()
  }
}, {
  immediate: true
})
</script>

<template>
  <form class="converter-form">
    <ConverterFormHeader
        :image-name="imageName"
    />
    <div class="form-content">
      <div class="cards">
        <ConverterFormCard
            class="convert-before"
            :image-src="imageSrc"
            :image-name="imageName"
            :image-size="imageSize"
        >
          <template v-slot:fields>
            <FileUploadSize
                v-if="state.isLoading || loadComplete"
                :loaded="progress?.loaded || 0"
                :total="progress?.total || 0"
            />
            <FileConvertStatus
                v-if="state.isLoading || loadComplete"
                :label="loadStatusTitle"
                :color="lineColor"
            />
          </template>
        </ConverterFormCard>
        <ConverterFormCard
            v-if="convertedImage?.src"
            class="convert-after"
            :image-name="convertedImage?.name"
            :image-src="convertedImage?.src"
            :image-size="convertedImage?.size"
        >
          <template v-slot:buttons>
            <IconButton
                :icon="iconNames.DOWNLOAD"
                title="download"
                @on-click="downloadHandler"
            />
          </template>
        </ConverterFormCard>
      </div>
      <div class="buttons">
        <IconButton
            :icon="iconNames.CONVERT"
            :disabled="!!convertedImage?.src"
            title="convert"
            class="convert-button"
            @on-click="convertHandler"
            @click="convertHandler"
        />
      </div>
    </div>
    <ConverterProgress
        class="image-load-progress"
        :max-value="totalValue"
        :current-value="loadedValue"
        :line-color="lineColor"
    />
  </form>
</template>

<style scoped lang="scss">
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
  gap: 15px;
  flex: 100%;
}

.cards {
  display: flex;
  gap: 15px;
  flex: 1;
  flex-wrap: wrap;
}


.convert-before, .convert-after {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1 auto;
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
</style>