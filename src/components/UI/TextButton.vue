<script setup lang="ts">
import {computed} from "vue";
import {ITextButtonProps} from "@/interfaces/propsInterfaces.ts";

const props = withDefaults(defineProps<ITextButtonProps>(), {
  type: "button",
  label: 'button',
  title: 'button',
  disabled: false,
  useTransform: true
})

const emit = defineEmits(['onClick'])

const style = computed(() => [
  props.backgroundColor ? `background-color: ${props.backgroundColor}` : ''
].join('; '))
</script>

<template>
  <div
      class="button-wrapper"
      :class="useTransform && 'use-transform'"
      :disabled="disabled"
  >
    <button
        class="text-button"
        :style="style"
        :type="type"
        :title="title"
        :disabled="disabled"
        @click="emit('onClick')"
    >
      {{ label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.button-wrapper {
  @media all and (pointer: fine) and (hover: hover) {
    transition: .2s ease;

    &:not([disabled=true]) {
      cursor: pointer;

      .text-button {
        cursor: pointer;
      }

      &.use-transform:hover {
        transform: translateY(-10%);
      }
    }
  }
}

.text-button {
  all: unset;
  transition: .2s ease;
  padding: 5px 15px;
  border-radius: 10px;
  color: white;

  &:first-letter {
    text-transform: uppercase;
  }

  [disabled=true] & {
    opacity: .5;
  }

  @media #{$mediumScreen} {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>