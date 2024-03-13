<script setup lang="ts">
import {computed} from "vue";
import {toFormatSize} from "@/utils";

type TSize = number
interface IFileSizeProps {
  size?: TSize
}

const props = defineProps<IFileSizeProps>()

const displaySize = computed(() => {
  return toFormatSize(props.size)
})
</script>

<template>
<div class="file-size">
  <div class="size-value">
    {{displaySize.value}}
  </div>
  <div class="size-unit">
    {{displaySize.unit}}
  </div>
</div>
</template>

<style scoped lang="scss">
.file-size {
  font-size: 16px;
  display: flex;
  gap: 5px;
}
</style>