<template>
  <LayoutContainerContentItem class="main-container-group">
    <div class="main-container-group-item">
      <SqlExplainTree
        :data="treeData"
        v-if="treeData"
        @on-enter-tree-node="setHoverKey"
        @on-leave-tree-node="clearHoverKey"
        @show-tree-node-info="showInfoLayer"
        @on-zoom="hideInfoLayer"
      />
    </div>

    <div
      class="main-container-group-item"
      :class="[planVisible ? 'show' : 'hide']"
      :key="planVisible && Guid()"
    >
      <SqlMenuTree
        v-if="treeData"
        :data="treeData"
        :key="hoverKey"
        :active-node="hoverKey"
      />
    </div>

    <div class="plan-layer-toggle" @click="toggle">plan</div>
    <SqlExplainTreeDetail ref="sqlExplainTreeDetail"/>
  </LayoutContainerContentItem>
</template>

<script>
  import LayoutContainerContentItem             from '../../Layout/LayoutContainerContentItem';
  import SqlExplainTree, {SqlExplainTreeDetail} from '../../Chart/SqlExplainTree';
  import SqlMenuTree                            from '../../Chart/SqlMenuTree';
  import Guid                                   from '@/utils/Guid';


  export default {
    name      : "MainContainerItem",
    props     : {
      treeData    : [Object, null],
      plan        : [Object, Array],
      setIndexFunc: false,
    },
    data() {
      return {
        planVisible: false,
        hoverKey   : '',
      }
    },
    methods   : {
      toggle() {
        this.planVisible = !this.planVisible;
        this.$emit(`on-plan-${this.planVisible ? 'show' : 'hide'}`);
      },
      setHoverKey(event, d) {
        this.hoverKey = d.data.uuid;
      },
      clearHoverKey() {
        this.hoverKey = '';
      },
      showInfoLayer(e, d) {
        this.$refs.sqlExplainTreeDetail.show(e, d.data);
      },
      hideInfoLayer(e, d) {
        this.$refs.sqlExplainTreeDetail.hide();
      },
      Guid
    },
    watch     : {
      treeData: {
        deep: true,
        handler() {
          console.log('---MainContainerItem: treeData value changing...');
          this.hoverKey = '';
          this.planVisible = false;
        }
      }
    },
    components: {
      LayoutContainerContentItem,
      SqlExplainTree,
      SqlExplainTreeDetail,
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
      overflow: hidden;

      &.hide {
        display: none;
        flex: 0;
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
