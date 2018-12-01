import Request, {RequestGenerator} from '@/utils/ServiceInstance';


/**
 * 执行 select 语句
 */
export const select = RequestGenerator((data) => Request.post('/select', data));

/**
 * 格式化 sql 语句
 */
export const format = RequestGenerator((data) => Request.post('/formatsql', data));
