import types        from './types';
import * as Service from './service';


export default {
  async [types.ACTION.EXECUTE_SQL]({state, dispatch, commit}) {
    const result = await Service.select({
      id : '',
      sql: state.sql,
    });
    console.log(result);
  }
};
