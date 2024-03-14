<script setup lang="ts">
import {computed} from "vue";
import {IImageConvertStatusProps} from "@/interfaces/propsInterfaces.ts";

const props = defineProps<IImageConvertStatusProps>()

const style = computed(() => [
  props.color ? `color: ${props.color}` : ''
].join('; '))
</script>

<template>
  <div
      class="file-progress"
      :style="style"
  >
    {{ label }}
  </div>
</template>

<style scoped lang="scss">
.file-progress {
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>