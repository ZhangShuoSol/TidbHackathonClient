<template>
  <div class="layout-container-content">
    <div class="layout-container-content-top">
      <slot name="top"></slot>
    </div>

    <div class="layout-container-content-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LayoutContainerContent",
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .layout-container-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .layout-container-content-top {
      padding: 15px;
    }

    .layout-container-content-main {
      width: 100%;
      height: 100%;
      display: flex;
    }
  }
</style>
