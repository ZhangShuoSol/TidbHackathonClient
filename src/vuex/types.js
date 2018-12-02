import {generatorActions, generatorMutations} from '../utils/VuexHelper';


const types = {
  ACTION  : generatorActions([
    'EXECUTE_SQL',
    'GET_TABLE_FIELDS', // 设置索引
    'GET_ADVISE_INDEX', // 获取建议索引
  ]),
  MUTATION: generatorMutations([
    'STORE_SQL',
    'STORE_EXECUTE_RESULT',
    'STORE_TABLE_COLUMNS',
    'STORE_MENU_VISIBLE_STATE',
    'STORE_ADVISE_INDEX',
  ]),
  GETTER  : {},
};

export default types;
