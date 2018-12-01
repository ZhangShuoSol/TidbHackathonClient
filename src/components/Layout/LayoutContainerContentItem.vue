<template>
  <div class="layout-container-content-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "LayoutContainerContentItem"
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .layout-container-content-item {
    flex: 1;
  }
</style>
