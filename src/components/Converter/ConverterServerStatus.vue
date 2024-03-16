<script setup lang="ts">
import {useIsOnlineRequest} from "@/composables/useIsOnlineRequest.ts";

const {isOnline} = useIsOnlineRequest()
</script>

<template>
  <div class="converter-server-status">
    <div>Server</div>
    <div
        :class="isOnline && 'online'"
        :title="isOnline ? 'online' : 'offline'"
        class="status"
    >
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
  width: 10px;
  height: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #a4a4a4;
  border-radius: 50%;

  &.online {
    border-color: #7bccff;
    background: #7bccff;
  }
}
</style>