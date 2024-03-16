<script setup lang="ts">
import {IConverterState} from "@/interfaces/convertingFormInterfaces.ts";

import {computed, onMounted, reactive} from "vue";
import {createDownloadFilesData, createZip, downloadArchive, imageToBase, uuid} from "@/utils";
import {useImageActions} from "@/composables/useImageActions.ts";
import {useIsOnlineRequest} from "@/composables/useIsOnlineRequest.ts";

import ConverterFormFooter from "@/components/Converter/ConverterFormFooter.vue";
import ConverterViewport from "@/components/Converter/ConverterViewport.vue";
import ConverterFilePicker from "@/components/Converter/ConverterFilePicker.vue";
import DropPopup from "@/components/UI/DropPopup.vue";

import apiConfig from "@/configs/apiConfig.ts";

const {images, convertedImages, imagesAmount, addImage} = useImageActions()

const {fetchServerStatus} = useIsOnlineRequest()

const state: IConverterState = reactive({
  dragEnter: false,
  dragActive: false,
  files: [],
  isConverting: false
})

const classNames = computed(() => [
  state.dragActive ? 'drag-active' : '',
  state.dragEnter ? 'drag-enter' : ''
].join(' '))

function dropHandler(e: DragEvent) {
  e.preventDefault()
  const files = e.dataTransfer?.files

  state.dragEnter = false
  if (files?.length) {
    filesAction(files)
  }
}

function fileInputHandler(files: FileList) {
  filesAction(files)
}

async function filesAction(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const src = await imageToBase(files[i])
    const {name, size} = files[i]

    addImage({
      uuid: uuid(),
      src,
      name,
      size,
      file: files[i]
    })
  }
}

function dragEnterHandler() {
  state.dragEnter = true
}

function dragLeaveHandler(e: DragEvent) {
  if (!e.relatedTarget) state.dragEnter = false
}

onMounted(() => {
  fetchServerStatus()
})

setInterval(() => {
  fetchServerStatus()
}, apiConfig.IS_ONLINE_REQUEST_TIMEOUT)

async function downloadHandler() {
  const filesData = createDownloadFilesData(convertedImages.value)
  if (!filesData) return

  const filesArchive = await createZip(filesData)
  if (!filesArchive) return

  downloadArchive({
    name: "all-files.zip",
    src: filesArchive
  })
}

</script>

<template>
  <main
      class="main drop-zone"
      :class="classNames"
      @dragenter="dragEnterHandler"
      @dragleave="dragLeaveHandler"
      @drop="dropHandler"
      @dragover.prevent
  >
    <div class="converter-title">
      To Webp Converter
    </div>
    <ConverterViewport
        v-if="imagesAmount"
        :images-list="images"
        :converting-event="state.isConverting"
    />
    <ConverterFilePicker
        @on-input="fileInputHandler"
    />
    <ConverterFormFooter
        @on-download="downloadHandler"
        @on-converting="e => state.isConverting = e"
    />
    <transition name="fade" appear>
      <DropPopup
          v-if="state.dragEnter"
          label="Drop files to upload"
          title="Drop files to upload"
      />
    </transition>
  </main>
</template>

<style scoped lang="scss">
@import "assets/css/animation";

.main {
  overflow-y: scroll;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.drop-zone {
  border-radius: 10px;
  text-align: center;
  color: #d9d9d9;
  font-size: 18px;
  font-family: monospace;
  padding-top: 40px;
}

.converter-title {
  font-size: 24px;
  margin-bottom: 25px;
}
</style>
