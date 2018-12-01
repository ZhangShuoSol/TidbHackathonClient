<template>
  <div class="sql-formatter-highlight">
    <div
      class="sql-frag-row"
      v-for="row in sql"
    >
      <span
        v-for="frag in row"
        :class="frag.type"
      >
        <template v-if="frag.type === 'table'">
          {{frag.table}}.
          <span class="field">{{frag.field}}</span>
        </template>
        <template v-else>
          {{frag.text}}
        </template>

      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name : "SqlFormatter",
    props: {
      sql: Array,
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .sql-formatter-highlight {
    width: 100%;

    .sql-frag-row {
      margin: 5px 0;

      .tab {
        margin-left: 10px;
      }

      .table, .normal, .key, .index {
        padding: 0 5px;
        border-radius: 4px;
      }

      .table, .normal, .key {
        color: #9b9b9b;
      }

      .table {
        .field {
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

          &:hover {
            animation: highlight_field .5s;
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2)
          }
        }
      }

    }
  }
</style>
