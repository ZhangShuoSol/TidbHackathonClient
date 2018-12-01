import {generatorActions, generatorMutations} from '../utils/VuexHelper';


const types = {
  ACTION  : generatorActions([
    'EXECUTE_SQL',
  ]),
  MUTATION: generatorMutations([
    'STORE_SQL'
  ]),
  GETTER  : {},
};

export default types;
