<template>
  <div class="layout-container">

    <div
      class="collapsible-menu"
      :class="{hide: !menuVisible}"
    >
      <div
        class="toggle-layer"
        @click="toggleCollapsibleMenu"
      >
        <i :class="[menuVisible ? 'el-icon-arrow-left' : 'el-icon-arrow-right']"></i>
      </div>


      <slot name="menu"></slot>
    </div>
    <div class="layout-container-main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name   : "LayoutContainer",
    props: {
      visible: false,
    },
    computed: {
      menuVisible: {
        get() {return this.visible;},
        set(val) {this.$emit('update:visible', val);}
      }
    },
    methods: {
      toggleCollapsibleMenu() {
        this.menuVisible = !this.menuVisible;
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .layout-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;

    /* 折叠菜单 */
    .collapsible-menu {
      $collapsible-menu-width: 400px;
      @keyframes collapsible_menu_show {
        from {margin-left: -$collapsible-menu-width;}
        to {margin-left: 0;}
      }

      @keyframes collapsible_menu_hide {
        from {margin-left: 0;}
        to {margin-left: -$collapsible-menu-width;}
      }

      width: $collapsible-menu-width;
      margin-left: 0;
      background: #12102A;
      position: relative;
      animation: collapsible_menu_show .5s;

      &.hide {
        margin-left: -$collapsible-menu-width;
        animation: collapsible_menu_hide .5s;
      }

      /* 折叠菜单切换层 */
      .toggle-layer {
        @import "@/style/opacity.scss";
        $toggle-layer-width: 20px;

        position: absolute;
        height: 100px;
        width: $toggle-layer-width;
        background: rgba(0, 0, 0, 0.85);
        top: calc(50vh - 50px);
        right: -$toggle-layer-width;
        border-radius: 0 4px 4px 0;
        opacity: 0;
        cursor: pointer;
        animation: toggle_layer_hide .3s ease-out;
        z-index: 200;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 1;
          animation: toggle_layer_show .3s ease-in;
        }
      }
    }

    .layout-container-main {
      flex: 1;
    }
  }
</style>
