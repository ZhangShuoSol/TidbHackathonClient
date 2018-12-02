import Request, {RequestGenerator} from '@/utils/ServiceInstance';
import {Message}                   from 'element-ui';


/**
 * 执行 select 语句
 */
export const select = RequestGenerator((data) => Request.post('/select', data));

/**
 * 格式化 sql 语句
 */
export const format = RequestGenerator((data) => Request.post('/formatsql', data));

/**
 * 查找表接口
 */
export const table = RequestGenerator(
  tablename => Request.get('/table', {tablename}),
  null,
  function (e, default_return, resolve, reject) {
    Message.warning('无法获取该表');
  }
);

/**
 * 查询表索引
 */
export const index = RequestGenerator(tablename => Request.get('/table/indexs', {tablename}));

/**
 * 获取所有图表
 */
export const getTables = RequestGenerator(() => Request.get('/table/names'));

/**
 * 索引建议
 */
export const indexAdvise = RequestGenerator(sql => Request.post('/indexadvise', {sql}));

/**
 * 添加新索引
 */
export const addIndex = RequestGenerator(val => Request.post('/table/indexs', val));

/**
 * 删除索引
 */
export const deleteIndex = RequestGenerator(val => Request.delete('/table/indexs', val));

/**
 * 查询表
 */
export const getNewIndexTree = RequestGenerator(tablename => Request.get('/table/indexs', {tablename}));
