<template>
  <div class="table-columns">
    <div class="table-columns-item" v-for="(col, index) in columns">
      <div class="table-columns-item-field">{{col.ColumnName}}</div>
      <div class="table-columns-item-field">{{col.ColumnTypeName}}</div>
      <div class="table-columns-item-field">{{parseFloat(col.ColumnType).toFixed(2)}}</div>
      <TableColumnsItemField
        :col="col"
        :index="index"
        @on-change-index-type="onIndexTypeChange"
      />
    </div>
  </div>
</template>

<script>
  import TableColumnsItemField from './TableColumnsItemField';
  export default {
    name : "TableColumns",
    props: {
      columns: Array,
    },
    methods: {
      onIndexTypeChange(val) {
        this.$emit('on-change-index-type', val);
      }
    },
    components: {
      TableColumnsItemField,
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .table-columns {
    width: 100%;
    border-spacing: 0;


    .table-columns-item {
      padding: 10px 15px;
      color: #9c9c9c;
      cursor: pointer;
      display: flex;
      align-items: center;

      .table-columns-item-field {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .table-columns-item-field:nth-child(1) {
        width: 30%;
        border-spacing: 0;
      }
      .table-columns-item-field:nth-child(2) {
        flex: 1;
      }
      .table-columns-item-field:nth-child(3) {
        width: 40px;
      }
      .table-columns-item-field:nth-child(4) {
        flex: 1;
      }

      &:hover {
        background: #141b31;
        color: #fff;
      }
    }
  }
</style>
