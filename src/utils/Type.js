
/**
 * 对数据类型进行判断
 */

const TypeUtil = {

  /**
   * @function 根据传递的参数判断其数据类型
   * map : { Null, Undefined, String, Number, Boolean, Function, Date, Array, Object, JSON }
   *
   * @param param {*}                               - 指定变量或字面量
   *
   * @returns {Blob|ArrayBuffer|Array.<T>|string|*} - 类型名称
   */
  getType (param) {
    let _type_ = Object.prototype.toString.call(param);
    return _type_.slice(8, _type_.length - 1);
  },

  /**
   * @function 判断数据类型是否为Object
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isObject : param => TypeUtil.getType(param) === 'Object',

  /**
   * @function 判断数据类型是否为Array
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isArray : param => TypeUtil.getType(param) === 'Array',

  /**
   * @function 判断数据类型是否为String
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isString : param => TypeUtil.getType(param) === 'String',

  /**
   * @function 判断数据类型是否为Date
   * @param {*} param - 指定变量或字面量
   *
   * @return {boolean}
   */
  isDate : param => TypeUtil.getType(param) === 'Date',

  /**
   * @function 判断数据类型是否为Function
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isFunction : param => TypeUtil.getType(param) === 'Function',

  /**
   * @function 判断数据类型是否为Number
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isNumber : param => TypeUtil.getType(param) === 'Number',

  /**
   * @function 判断数据类型是否为Boolean
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isBoolean : param => TypeUtil.getType(param) === 'Boolean',

  /**
   * @function 判断数据类型是否为JSON
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isJSON : param => TypeUtil.getType(param) === 'JSON',

  /**
   * @function 判断数据类型是否为Undefined
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isUndefined : param => TypeUtil.getType(param) === 'Undefined',

  /**
   * @function 判断数据类型是否为Null
   *
   * @param {*} param - 指定变量或字面量
   * @return {boolean}
   */
  isNull : param => TypeUtil.getType(param) === 'Null',
};

export default TypeUtil;
