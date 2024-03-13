<script setup lang="ts">

import {iconNames} from "@/helpers/iconsHelper.ts";
import IconButton from "@/components/UI/IconButton.vue";

interface IConverterFormHeaderProps {
  imageName: string
}

defineProps<IConverterFormHeaderProps>()
const emit = defineEmits(['onRemove'])
</script>

<template>
  <div class="form-header">
    <div
        v-if="iconNames"
        class="image-name"
    >
      {{ imageName }}
    </div>
    <IconButton
        :icon="iconNames.REMOVE"
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
}
</style>