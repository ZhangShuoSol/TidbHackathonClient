function generatorTypesWithNamespace (namespace, types) {

  const _types = {};

  for (let type in types) {
    _types[type] = {};

    for (let name in types[type]) {
      _types[type][name] = `${namespace}/${types[type][name]}`
    }
  }

  return _types;
}

function generatorTypes(type, fields = []) {
  const map = {};

  fields.forEach(function (field) {
    map[field] = `${type}_${field}`;
  });

  return map;
}

/**
 * 生成 ACTION
 * @param {array.<string>} types - action 类型集合, 各元素应为全部大写的字符常量
 * @returns {object}
 */
function generatorActions(types) {
  return generatorTypes('A', types)
}

/**
 * 生成 MUTATION
 * @param {array.<string>} types - mutation 类型集合, 各元素应为全部大写的字符常量
 * @returns {object}
 */
function generatorMutations(types) {
  return generatorTypes('M', types)
}

/**
 * 生成 GETTER
 * @param {array.<string>} types - getter 类型集合, 各元素应为全部大写的字符常量
 * @returns {object}
 */
function generatorGetters(types) {
  return generatorTypes('G', types)
}


export {
  generatorTypesWithNamespace,
  generatorActions,
  generatorMutations,
  generatorGetters,
};
