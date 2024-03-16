<script setup lang="ts">
interface IDropPopupProps {
  title?: string,
  label: string
}

defineProps<IDropPopupProps>()
</script>

<template>
  <div class="drag-popup">
    <div
        class="popup-wrapper"
        :title="title"
    >
      {{ label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.drag-popup {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  background: rgba(28, 28, 28, 0.9);
  backdrop-filter: blur(4px);
  color: #57e057;
  padding: 15px;
  transition: .2s ease;
  border: 15px solid #28282a;

  .popup-wrapper {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    border: 2px dashed #5ab05a;
    border-radius: 10px;
  }
}
</style>