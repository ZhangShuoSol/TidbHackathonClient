<template>
  <div class="collapsible-menu-container">
    <div class="sql-formatter">
      <SqlFormatter
        :sql="format"
        :current-keyword="currentKeyword"
        :advise-info="adviseIndex"
        @on-set-keyword="setKeyword"
        @get-advise-index="getAdviseIndex"
      />
    </div>
    <div class="table-columns-index" v-if="columnsVisible">
      <h1>
        {{currentKeyword}} Columns
        <el-button type="primary" plain size="medium" @click="saveIndex">Save</el-button>
      </h1>
      <el-scrollbar class="scroll-container">
        <TableColumns
          :columns="columns"
          @on-change-index-type="updateIndex"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  import types                                from '../../vuex/types';
  import SqlFormatter                         from './SqlFormatter';
  import TableColumns                         from './TableColumns';


  export default {
    name      : "CollapsibleMenuContainer",
    computed  : {
      ...mapState([
        'format',
        'currentKeyword',
        'columns',
        'adviseIndex',
      ]),
      columnsVisible() {
        return this.currentKeyword && this.columns.length > 0;
      }
    },
    methods   : {
      ...mapActions({
        setKeyword    : types.ACTION.GET_TABLE_FIELDS,
        getAdviseIndex: types.ACTION.GET_ADVISE_INDEX,
        updateIndex     : types.ACTION.UPDATE_INDEX
      }),
      ...mapMutations({
        updateIndexType: types.MUTATION.UPDATE_INDEX_TYPE,
      }),
    },
    components: {
      SqlFormatter,
      TableColumns,
    }

  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .collapsible-menu-container {
    width: 100%;
    height: 100%;

    .sql-formatter {
      padding: 15px;
    }

    .table-columns-index {
      margin-top: 20px;
      background: #202840;
      height: 100%;

      h1 {
        font-size: 24px;
        color: #fff;
        border-bottom: 1px solid #a7a7a7;
        padding: 5px 15px;

        button {
          float: right;
        }
      }

    }
  }
</style>
