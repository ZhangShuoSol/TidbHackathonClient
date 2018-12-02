import types from './types';
import Vue   from 'vue';


const REG_UPPER_CASE = /^[A-Z]+$/;
const REG_TABLE_FIELD = /^([A-Za-z]+)\.([A-Za-z]+\w+)$/;

const REG_FK = /^fk_\w+]/i;
const REG_INDEX = /^index_\w+]/i;

export default {
  [types.MUTATION.STORE_SQL](state, sql) {
    state.sql = sql;
  },
  [types.MUTATION.STORE_EXECUTE_RESULT](state, result) {
    state.uuid = result.uuid;
    state.currentKeyword = '';
    state.treeNodes = [result.node];
    state.columns = [];

    state.format = result.format
      .split('\n')
      .map(function (row) {
        const $row     = [],
              rowSplit = row.split('\t');

        // 遍历该行tab
        rowSplit.filter(word => word.length === 0)
          .forEach(tab => {
            $row.push({
              type: 'tab',
              text: ' '
            });
          });

        rowSplit.filter(word => word.length > 0)
          .forEach(sqlStr => {
            sqlStr.split(' ').forEach(frag => {

              if (result.tables.indexOf(frag) !== -1) {
                $row.push({
                  type: 'table',
                  text: frag,
                })
              } else if (REG_UPPER_CASE.exec(frag)) {
                $row.push({
                  type: 'key',
                  text: frag
                })
              } else if (REG_TABLE_FIELD.exec(frag)) {
                $row.push({
                  type: 'db',
                  text: frag
                })
              } else {
                $row.push({
                  type: 'normal',
                  text: frag,
                })
              }
            });

          });

        return $row;
      });
    state.menuVisible = true;
  },
  /**
   * 存储表结构
   * @param state
   * @param keyword
   * @param columns
   * @param indexes
   */
  [types.MUTATION.STORE_TABLE_COLUMNS](state, {keyword, columns, indexes}) {
    state.currentKeyword = keyword;
    state.columns = columns.map(col => {
      let Index = indexes.filter(function (idx) {
        return idx.Table === col.TableName && idx.Column_name === col.ColumnName;
      })[0];
      // 0: 不可编辑(PRIMARY, FK), 1: index (普通索引), 2: 空
      if (!Index) {
        Index = {type: 2};
      } else if (Index.Key_name === 'PRIMARY' || Index.Key_name.substr(0, 3) === 'fk_') {
        Index.type = 0;
      } else {
        Index.type = 1
      }

      return {
        ...col,
        Index
      }
    });


    console.log(state.columns.filter(col => col.Index.length > 0));
  },
  [types.MUTATION.STORE_MENU_VISIBLE_STATE](state, visible) {
    state.menuVisible = visible;
  },
  [types.MUTATION.STORE_ADVISE_INDEX](state, adviseIndex) {
    state.adviseIndex = adviseIndex;
  },
  [types.MUTATION.UPDATE_INDEX_TYPE](state, {select, index}) {
    Vue.set(state.columns[index].Index, 'type', select);
  },
  [types.MUTATION.COMPARE_INDEX_TREE](state, result) {
    state.treeNodes.splice(1, 1, result.node);
  }
}
