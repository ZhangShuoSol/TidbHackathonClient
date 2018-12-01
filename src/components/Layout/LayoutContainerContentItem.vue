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
    border-top: 1px solid lightgrey;
  }

  .layout-container-content-item + .layout-container-content-item {
    border-left: 1px solid lightgrey;
  }
</style>
