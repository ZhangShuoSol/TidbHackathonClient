import types from './types';

export default {
  [types.MUTATION.STORE_SQL](state, sql){
    state.sql = sql;
  }
}
