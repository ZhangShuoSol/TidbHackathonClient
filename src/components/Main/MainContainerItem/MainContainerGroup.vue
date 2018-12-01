<template>
  <LayoutContainerContentItem class="main-container-group">
    <div class="main-container-group-item">
      <SqlExplainTree
        :data="treeData"
        v-if="treeData"
      />
    </div>

    <div
      class="main-container-group-item"
      :class="[planVisible ? 'show' : 'hide']"
      v-if="planVisible"
    >
      <SqlMenuTree
        :data="treeData"
        v-if="treeData"
      />
    </div>

    <div class="plan-layer-toggle" @click="toggle">plan</div>
  </LayoutContainerContentItem>
</template>

<script>
  import LayoutContainerContentItem from '../../Layout/LayoutContainerContentItem';
  import SqlExplainTree             from '../../Chart/SqlExplainTree';
  import SqlMenuTree                from '../../Chart/SqlMenuTree';


  export default {
    name      : "MainContainerItem",
    props     : {
      treeData: [Object, null],
      plan: [Object, Array]
    },
    data() {
      return {
        planVisible: false,
      }
    },
    methods: {
      toggle() {
        this.planVisible = !this.planVisible;
      }
    },
    components: {
      LayoutContainerContentItem,
      SqlExplainTree,
      SqlMenuTree,
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .main-container-group {
    position: relative;
    overflow: hidden;
    display: flex;

    .main-container-group-item {
      flex: 1;
      width: 100%;
      height: 100%;

      &.hide {
        display: none;
      }

      &.show {
        display: block;
        background: rgba(0, 0, 0, 0.85);

        & + .plan-layer-toggle {
          right: 50%;
        }
      }
    }

    .plan-layer-toggle {
      position: absolute;
      width: 25px;
      height: 60px;
      top: 0;
      right: 0;
      color: #fff;
      background: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      border-radius: 0 0 0 4px;
      writing-mode: tb;
      text-align: center;
    }

  }
</style>
