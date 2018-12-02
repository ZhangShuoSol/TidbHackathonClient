import types        from './types';
import * as Service from './service';


export default {
  async [types.ACTION.EXECUTE_SQL]({state, dispatch, commit}) {
    const result = await Service.select({
      id : '',
      sql: state.sql,
    });

    const format = await Service.format({
      id : result.uuid,
      sql: state.sql,
    });

    commit(types.MUTATION.STORE_EXECUTE_RESULT, {
      ...result,
      format
    });
  },
  async [types.ACTION.GET_TABLE_FIELDS]({commit}, keyword) {
    if (keyword.type !== 'db') {
      return;
    }

    await Service.table(keyword.text);

    commit(types.MUTATION.STORE_SQL_KEYWORD, {
      keyword: keyword.text,
    })
  }
};
