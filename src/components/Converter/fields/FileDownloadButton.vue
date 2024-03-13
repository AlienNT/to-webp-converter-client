<script setup lang="ts">

import IconButton from "@/components/UI/IconButton.vue";
import {iconNames} from "@/helpers/iconsHelper.ts";

const emit = defineEmits(['onClick'])
</script>

<template>
  <IconButton
      :icon="iconNames.DOWNLOAD"
      @on-click="emit('onClick')"
  />
</template>

<style scoped lang="scss">

</style>