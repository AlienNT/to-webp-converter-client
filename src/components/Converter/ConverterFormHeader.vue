<script setup lang="ts">

import IconButton from "@/components/UI/IconButton.vue";

import {IConverterFormHeaderProps} from "@/interfaces/propsInterfaces.ts";

import {iconNames} from "@/helpers/iconsHelper.ts";
import {computed} from "vue";
import {colors} from "@/helpers/colorsHelper.ts";

const props = defineProps<IConverterFormHeaderProps>()

const emit = defineEmits(['onRemove'])

const shortedTitle = computed(() => {
  return props.imageName ? cutString(props.imageName, 60) : props.imageName
})

function cutString(str: string, maxLength: number): string {
  return str && str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str
}
</script>

<template>
  <div class="form-header">
    <div
        v-if="iconNames"
        class="image-name"
    >
      <div class="title">
        {{ shortedTitle }}
      </div>
    </div>
    <IconButton
        :icon="iconNames.REMOVE"
        :color="colors.REMOVE"
        use-transform
        title="remove"
        @on-click="emit('onRemove')"
    />
  </div>
</template>

<style scoped lang="scss">
.form-header {
  flex: 100%;
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
  @media #{$mediumScreen} {
    margin-bottom: 10px;
  }
}

.image-name {
  flex: auto;
  text-align: left;
  font-size: 16px;
  transition: .2s ease;

  .title {
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  @media #{$mediumScreen} {
    font-size: 14px;
  }
}
</style>