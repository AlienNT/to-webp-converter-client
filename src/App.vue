<script setup lang="ts">
import {IConverterState} from "@/interfaces/convertingFormInterfaces.ts";

import {computed, onMounted, reactive} from "vue";
import {createDownloadFilesData, createZip, downloadArchive, imageToBase, uuid} from "@/utils";
import {useImageActions} from "@/composables/useImageActions.ts";
import {useIsOnlineRequest} from "@/composables/useIsOnlineRequest.ts";

import ConverterFormFooter from "@/components/Converter/ConverterFormFooter.vue";
import ConverterViewport from "@/components/Converter/ConverterViewport.vue";

import apiConfig from "@/configs/apiConfig.ts";

const {images, convertedImages, addImage} = useImageActions()

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

function onDrop(e: DragEvent) {
  e.preventDefault()
  const files = e.dataTransfer?.files

  state.dragEnter = false
  if (files?.length) {
    filesAction(files)
  }
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
      @dragover.prevent
      @dragenter="dragEnterHandler"
      @dragleave="dragLeaveHandler"
      @drop="onDrop"
  >
    <div class="container">
      <ConverterViewport
          :images-list="images"
          :converting-event="state.isConverting"
      />
      <ConverterFormFooter
          @on-download="downloadHandler"
          @on-converting="e => state.isConverting = e"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  overflow-y: scroll;
  display: flex;

  > .container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.drop-zone {
  border-radius: 10px;
  border: 2px dashed transparent;
  text-align: center;
  color: #d9d9d9;
  font-size: 18px;
  font-family: monospace;
  padding-top: 40px;

  &.drag-active {
    border: 2px dashed gray;

  }

  &.drag-enter {
    border-color: #5ab05a;
    color: #5ab05a;
  }
}
</style>
