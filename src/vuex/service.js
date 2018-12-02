import Request, {RequestGenerator} from '@/utils/ServiceInstance';
import { Message } from 'element-ui';


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
