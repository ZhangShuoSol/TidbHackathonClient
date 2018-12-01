import types        from './types';
import * as Service from './service';


export default {
  async [types.ACTION.EXECUTE_SQL]({state, dispatch, commit}) {
    const result = await Service.select({
      id : '',
      sql: state.sql,
    });

    const format = await Service.format({
      id: result.uuid,
      sql: state.sql,
    });

    commit(types.MUTATION.STORE_EXECUTE_RESULT, {
      ...result,
      format
    });
  },
  async [types.ACTION.SET_FIELD_INDEX]({commit}, field) {
    commit(types.MUTATION.STORE_FIELD_INDEX_RESULT, {
      field,
    })
  }
};
