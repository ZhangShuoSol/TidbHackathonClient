<template>
  <div class="sql-formatter-highlight">
    <div
      class="sql-frag-row"
      v-for="row in sql"
    >
      <span
        v-for="frag in row"
        class="field"
        :class="[frag.type, {active: currentKeyword === frag.text}]"
        @click="setKeyword(frag)"
      >
          {{frag.text}}
      </span>
    </div>


    <el-popover
      placement="right"
      width="400"
      trigger="click"
      popper-class="advise-index-popper"
    >
      <pre>{{adviseInfo}}</pre>
      <div slot="reference" class="btn-show-advise-index" @click="getAdviseIndex">
        <i class="el-icon-more-outline"></i>
      </div>
    </el-popover>

  </div>
</template>

<script>


  export default {
    name      : "SqlFormatter",
    props     : {
      sql           : Array,
      currentKeyword: String,
      adviseInfo    : String,
    },
    data() {
      return {
        adviceVisible: false,
      }
    },
    methods   : {
      setKeyword(field) {
        this.$emit('on-set-keyword', field)
      },
      getAdviseIndex() {
        this.$emit('get-advise-index');
      }
    },
    components: {
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .sql-formatter-highlight {
    width: 100%;
    position: relative;

    .btn-show-advise-index {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgrey;
      border-radius: 20px;
      color: lightgrey;
      cursor: pointer;
    }

    .sql-frag-row {
      margin: 5px 0;

      .tab {
        margin-left: 10px;
      }

      .db, .normal, .key, .table {
        padding: 0 5px;
        border-radius: 4px;
      }

      .db, .normal, .key {
        color: #9b9b9b;
      }

      .table {
        @keyframes highlight_field {
          from {
            background: rgba(255, 255, 255, 0);
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0);
          }
          to {
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
          }
        }
        color: #fff;
        cursor: pointer;

        &:hover, &.active {
          animation: highlight_field .5s;
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2)
        }
      }

    }
  }

  .advise-index-popper {
    pre {
      white-space: pre-wrap;
    }
  }
</style>
