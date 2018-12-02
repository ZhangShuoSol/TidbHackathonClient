import types from './types';


const REG_UPPER_CASE = /^[A-Z]+$/;
const REG_TABLE_FIELD = /^([A-Za-z]+)\.([A-Za-z]+\w+)$/;

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
      return {
        ...col,
        Index: indexes.filter(function (idx) {
          return idx.Table === col.TableName && idx.Column_name === col.ColumnName;
        })[0] || {}
      }
    });


    console.log(state.columns.filter(col => col.Index.length > 0));
  },
  [types.MUTATION.STORE_MENU_VISIBLE_STATE](state, visible) {
    state.menuVisible = visible;
  }
}
