import types from './types';


export default {
  [types.MUTATION.STORE_SQL](state, sql) {
    state.sql = sql;
  },
  [types.MUTATION.STORE_EXECUTE_RESULT](state, result) {
    state.uuid = result.uuid;
    state.treeNode = result.node;
    state.plan = result.plan;
  }
}
