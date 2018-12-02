<template>
  <div
    class="sql-explain-tree-detail"
    :class="{active: visible}"
    :style="position"
    ref="sqlExplainTreeDetail"
  >

    <div class="el-form">
      <div
        v-for="(value, key) in detail"
        class="el-form-item"
      >
        <label class="el-form-item__label">{{key}}</label>
        <div class="el-form-item__content">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name   : "SqlExplainTreeDetail",
    mounted() {
      this.$nextTick(function () {
        const ctx = this;
        document.addEventListener('click', e => {
          if (ctx.$refs && ctx.$refs.sqlExplainTreeDetail && !ctx.$refs.sqlExplainTreeDetail.contains(e.target)) {
            this.hide();
          }
        });
        document.addEventListener('contextmenu', this.hide);
        document.addEventListener('mousewheel', this.hide);
      })
    },
    data() {
      return {
        detail  : {},
        position: {},
        visible : false,
      }
    },
    methods: {
      show(event, detail) {
        if (event.button !== 0) {
          return;
        }

        this.position = {
          left: `${event.clientX}px`,
          top : `${event.clientY}px`,
        };

        this.detail = {
          name : detail.name,
          table: detail.info.operatorinfoMap.table || '',
          count: detail.info.count || 0,
          time : detail.info.executeinfoMap.time || 0,
          rows : detail.info.executeinfoMap.rows || 0,
          loops: detail.info.executeinfoMap.loops || 0,
        };

        this.visible = true;
      },
      hide() {
        this.visible = false;
        this.detail = {};
        this.position = {};
      }
    },
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .sql-explain-tree-detail {
    width: 200px;
    height: auto;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid lightgrey;
    display: none;
    position: fixed;
    background: #fff;

    .el-form-item {
      margin-bottom: 5px;

      .el-form-item__label {
        min-width: 50px;
      }

      .el-form-item__label, .el-form-item__content {
        line-height: normal;
      }
    }

    &.active {
      display: block;
    }
  }
</style>
