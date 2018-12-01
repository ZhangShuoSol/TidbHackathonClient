import types from './types';


const REG_UPPER_CASE = /^[A-Z]+$/;
const REG_TABLE_FIELD = /^([A-Za-z]+).([A-Za-z]+\w+)$/;

export default {
  [types.MUTATION.STORE_SQL](state, sql) {
    state.sql = sql;
  },
  [types.MUTATION.STORE_EXECUTE_RESULT](state, result) {
    state.uuid = result.uuid;
    state.treeNode = result.node;
    state.plan = result.plan;

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
              let regResult;
              if (REG_UPPER_CASE.exec(frag)) {
                $row.push({
                  type: 'key',
                  text: frag
                })
              } else if (regResult = REG_TABLE_FIELD.exec(frag)) {
                $row.push({
                  type: 'table',
                  table: regResult[1],
                  field: regResult[2]
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
  }
}
