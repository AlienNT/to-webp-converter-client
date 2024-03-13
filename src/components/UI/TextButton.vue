<script setup lang="ts">
import {TButtonType} from "@/interfaces/UIInterfaces.ts";
import {computed} from "vue";

interface ITextButton {
  type?: TButtonType,
  title?: string,
  label?: string,
  disabled?: boolean,
  backgroundColor?: string
}

const props = withDefaults(defineProps<ITextButton>(), {
  type: "button",
  label: 'button',
  title: 'button',
  disabled: false
})

const emit = defineEmits(['onClick'])

const style = computed(() => [
  props.backgroundColor ? `background-color: ${props.backgroundColor}` : ''
].join('; '))
</script>

<template>
  <div
      class="button-wrapper"
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
  &:not([disabled=true]) {
    @media all and (pointer: fine) and (hover: hover) {
      cursor: pointer;
      &:hover {
        .text-button {
          transform: translateY(-10%);
        }
      }
    }
  }
}

.text-button {
  all: unset;
  transition: .2s ease;
  padding: 5px 15px;
  background: orange;
  border-radius: 10px;
  color: white;

  &:first-letter {
    text-transform: uppercase;
  }

  [disabled=true] & {
    opacity: .5;
  }
}
</style>