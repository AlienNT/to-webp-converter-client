<script setup lang="ts">
import {computed} from "vue";
import {toFormatSize} from "@/utils";
import {IFileSizeProps} from "@/interfaces/propsInterfaces.ts";

const props = defineProps<IFileSizeProps>()

const displaySize = computed((): {value: string, unit: string} | null => {
  return !props.size ? null : toFormatSize(props.size)
})
</script>

<template>
<div class="file-size">
  <div class="size-value">
    {{displaySize?.value}}
  </div>
  <div class="size-unit">
    {{displaySize?.unit}}
  </div>
</div>
</template>

<style scoped lang="scss">
.file-size {
  font-size: 16px;
  display: flex;
  gap: 5px;
  @media #{$mediumScreen} {
    font-size: 14px;
  }
  @media #{$smallScreen} {
    font-size: 12px;
  }
}
</style>