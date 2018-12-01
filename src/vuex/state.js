export default {
  sql         : '', // 执行的 sql 语句
  format      : [],
  uuid        : '', // 当前 sql 语句的标识, 用于 session 验证
  treeNodes    : [], // 最多包含两个元素, 0: sql查询结构, 1: 设置索引后的结构
  currentKeyword: '',

  menuVisible: false,
};
