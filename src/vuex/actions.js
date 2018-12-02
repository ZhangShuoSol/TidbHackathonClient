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
  },
  async [types.ACTION.GET_ADVISE_INDEX]({commit, state}) {
    const adviceIndex = await Service.indexAdvise(state.sql);
    commit(types.MUTATION.STORE_ADVISE_INDEX, adviceIndex);
  },
  async [types.ACTION.UPDATE_INDEX]({commit, state, dispatch}, {col, select}) {
    let req = {
      columns: col.ColumnName,
      table  : col.TableName,
    };
    if (select === 1) {
      await Service.addIndex(req);
    } else {
      await Service.deleteIndex(req);
    }

  },
  async [types.ACTION.GET_NEW_INDEX_TREE]({commit, state}) {
    const result = await Service.select({
      sql: state.sql
    });
    commit(types.MUTATION.COMPARE_INDEX_TREE, result);
  }
};
