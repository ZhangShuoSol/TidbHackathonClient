<template>
  <div ref="treeNode" class="d3-tree">
  </div>
</template>

<script>
  import D3Tree     from './D3Tree';
  import ChartMixin from '../mixins/chart-mixin';


  export default {
    name  : 'SqlExplainTree',
    mixins: [ChartMixin('treeNode', D3Tree)]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .d3-tree {
    width: 100%;
    height: 100%;

    .link {
      fill: none;
      stroke: #ccc;
      stroke-width: 1.5px;
    }

    .node circle {
      fill: #fff;
      stroke: steelblue;
      stroke-width: 1.5px;
    }

    .node {
      font: 12px sans-serif;
    }

    .tree-node__block {
      $title-width: 200px;
      $title-height: 90px;
      background: lightgrey;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #DCDFE6;
      position: relative;
      width: $title-width;
      height: $title-height;
      transform: translate(-$title-width / 2, -$title-height / 2);

      .collapse-tree-node {
        $collapse-layer-width: 60px;
        $collapse-layer-height: 10px;
        $collapse-layer-left: ($title-width - $collapse-layer-width) / 2;
        position: absolute;
        width: $collapse-layer-width;
        height: $collapse-layer-height;
        bottom: -$collapse-layer-height;
        left: $collapse-layer-left;
        background: rgba(204, 204, 204, 0.85);
        cursor: pointer;
        opacity: 0;
        border-radius: 0 0 4px 4px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 1;
        }
      }

      &.primary {background: #409EFF;}
      &.success {background: #67C23A;}
      &.warning {background: #E6A23C;}
      &.danger {background: #F56C6C;}


      h1 {
        font-size: 14px;
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px #7f7f7f solid;
        padding: 0 5px 5px;
        text-align: center;
      }

      .tree-node__body {
        display: flex;

        .tree-node__info {
          flex: 1;
          padding: 0 5px;

          .info-item {
            margin: 2px 0;
            font-size: 12px;
          }
        }

        .tree-node__info-more {
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;

          .el-icon-more-outline {
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            border: 1px solid lightgray;
            justify-content: center;
            align-items: center;
            display: inline-flex;
          }
        }
      }
    }
  }
</style>
