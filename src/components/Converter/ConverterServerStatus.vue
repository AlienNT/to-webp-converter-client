<script setup lang="ts">
import {useIsOnlineRequest} from "@/composables/useIsOnlineRequest.ts";

const {isOnline} = useIsOnlineRequest()
</script>

<template>
  <div class="converter-server-status">
    <div>Server</div>
    <div
        :class="isOnline && 'online'"
        class="status"
    >
      {{ isOnline ? 'online' : 'offline' }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.converter-server-status {
  display: flex;
  gap: 10px;
  font-size: 14px;
  align-items: center;
}

.status {
  color: #a4a4a4;

  &.online {
    color: #7bccff;
  }
}
</style>