import {generatorActions, generatorMutations} from '../utils/VuexHelper';


const types = {
  ACTION  : generatorActions([
    'EXECUTE_SQL',
  ]),
  MUTATION: generatorMutations([
    'STORE_SQL',
    'STORE_EXECUTE_RESULT'
  ]),
  GETTER  : {},
};

export default types;
