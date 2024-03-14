<script setup lang="ts">
import {computed} from "vue";
import {IIconButtonProps} from "@/interfaces/propsInterfaces.ts";

const props = withDefaults(defineProps<IIconButtonProps>(), {
  type: "button",
  disabled: false
})

const emit = defineEmits([
  'onClick'
])
const style = computed(() => {
  return props.icon ? `mask-image: url(${props.icon})` : ''
})
</script>

<template>
  <div
      class="button-wrapper"
      :disabled="disabled"
  >
    <button
        :type="type"
        :style="style"
        :title="title"
        :disabled="disabled"
        class="icon-button"
        @click="emit('onClick')"
    />
  </div>
</template>

<style scoped lang="scss">
.button-wrapper {
  @media all and (pointer: fine) {
    cursor: pointer;

    &:not([disabled=true]) {
      &:hover {
        .icon-button {
          cursor: pointer;
          transform: translateY(-10%);
          opacity: 1;
        }
      }
    }
  }

  &[disabled=true] {
    .icon-button {
      opacity: .5;
    }
  }
}

.icon-button {
  width: 30px;
  height: 30px;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background: #5ab05a;
  transition: .2s ease;

}
</style>