import {generatorActions, generatorMutations} from '../utils/VuexHelper';


const types = {
  ACTION  : generatorActions([
    'EXECUTE_SQL',
    'SET_FIELD_INDEX', // 设置索引
  ]),
  MUTATION: generatorMutations([
    'STORE_SQL',
    'STORE_EXECUTE_RESULT',
    'STORE_FIELD_INDEX_RESULT',
    'STORE_MENU_VISIBLE_STATE',
  ]),
  GETTER  : {},
};

export default types;
