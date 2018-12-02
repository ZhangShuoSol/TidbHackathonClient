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

    const tables = await Service.getTables();

    commit(types.MUTATION.STORE_EXECUTE_RESULT, {
      ...result,
      format,
      tables,
    });
  },
  async [types.ACTION.GET_TABLE_FIELDS]({commit}, keyword) {
    if (keyword.type !== 'table') {
      return;
    }

    const columns = await Service.table(keyword.text);
    const indexes = await Service.index(keyword.text);

    commit(types.MUTATION.STORE_TABLE_COLUMNS, {
      keyword: keyword.text,
      columns,
      indexes
    })
  }
};
