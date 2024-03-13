<script setup lang="ts">
import {computed, ref, watch} from "vue";
interface IConverterProgressProps {
  currentValue: number,
  maxValue: number,
  lineColor?: string
}

const props = withDefaults(defineProps<IConverterProgressProps>(), {
  lineColor: `rgba(0, 225, 0, 1)`,
})

const isShow = ref(true)

const progressLineValue = computed(() => {
  return (props.maxValue === 0 || props.currentValue === 0) ?
      0 : props.currentValue / props.maxValue * 100
})

const style = computed(() => [
  `width: ${progressLineValue.value}%`,
  `background-color: ${props.lineColor}`,
  `opacity: ${isShow.value ? 1 : 0}`
].join('; '))

watch(() => progressLineValue.value, () => {
  isShow.value = true
})
</script>

<template>
  <div class="converter-progress">
    <div
        class="converter-progress__line"
        :style="style"
    />
  </div>
</template>

<style scoped lang="scss">
.converter-progress {
  width: 100%;
}

.converter-progress__line {
  height: 4px;
  transition: .8s linear;
}
</style>