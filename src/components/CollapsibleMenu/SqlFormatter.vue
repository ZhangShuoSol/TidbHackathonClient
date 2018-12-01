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
  </div>
</template>

<script>
  export default {
    name   : "SqlFormatter",
    props  : {
      sql         : Array,
      currentKeyword: String,
    },
    methods: {
      setKeyword(field) {
        this.$emit('on-set-keyword', field)
      }
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

      .db, .normal, .key, .index {
        padding: 0 5px;
        border-radius: 4px;
      }

      .db, .normal, .key {
        color: #9b9b9b;
      }

      .db {
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
</style>
