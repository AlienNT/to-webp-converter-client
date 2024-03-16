<script setup lang="ts">
import TextButton from "@/components/UI/TextButton.vue";

interface IImagePicker {
  type?: 'file' | string,
  accept?: 'image/jpeg, image/jpg, image/png, image/webp' | string,
  multiple?: true | boolean
}

const emit = defineEmits([
  'onInput'
])

async function selectImageHandler() {
  const input = createImagePicker({})

  input.click()

  input.oninput = (ev: Event) => {
    const {files} = <HTMLInputElement>ev.target

    if (files?.length) {
      emit('onInput', files)
    }
  }
}

function createImagePicker(
    {
      type = 'file',
      accept = 'image/jpeg, image/jpg, image/png, image/webp',
      multiple = true
    }: IImagePicker): HTMLInputElement {

  const input = document.createElement('input')
  input.type = type
  input.accept = accept
  input.multiple = multiple

  return input
}
</script>

<template>
  <div class="empty-list-message">
    <TextButton
        label="Select images"
        title="Select images"
        class="select-image-button"
        @on-click="selectImageHandler"
    />
    <div class="message">
      or drag and drop
    </div>
  </div>
</template>

<style scoped lang="scss">

.empty-list-message {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-top: 20px;
  padding-bottom: 80px;
}

.select-image-button {
  background: $downloadColor;
  border-radius: 5px;
}

</style>