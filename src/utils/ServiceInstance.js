import axios        from 'axios';
import Type         from './Type';
import {MessageBox} from 'element-ui';


export const SERVER_BASE_PATH = 'http://192.168.195.63:8666';
export const SERVER_REQUEST_PATH = SERVER_BASE_PATH;

let _instance;// 常规请求实例

export const loading = {
  dom      : document.getElementById('nebula_loading'),
  count    : 0,
  timeoutId: null,
  show() {
    const ctx = this;

    if (!this.count++) {
      this.timeoutId = setTimeout(function () {
        ctx.dom.classList.add("open");
      }, 300);
    }

  },
  hide() {
    if (!(--this.count)) {
      clearTimeout(this.timeoutId);
      this.dom.classList.remove("open");
    }
  }
};


class Request {
  constructor() {
    _instance = axios.create({
      baseURL: SERVER_REQUEST_PATH,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  setToken(token) {
    _instance.defaults.headers.common["token"] = token;
  }

  reset() {
    _instance.defaults.headers.common["token"] = '';
  }

  get(url, data = {}, params = {}, activeLoading = true) {
    return requestProcess(_instance.get(createSendUrl(url, data), {params}), activeLoading);
  }

  delete(url, data = {}, params = {}, activeLoading = true) {
    return requestProcess(_instance.delete(createSendUrl(url, data), {params}), activeLoading);
  }

  post(url, data, param = {}, config, activeLoading = true) {
    return requestProcess(_instance.post(createSendUrl(url, param), data, config), activeLoading);
  }

  put(url, data, param = {}, config, activeLoading = true) {
    return requestProcess(_instance.put(createSendUrl(url, param), data, config), activeLoading);
  }

  patch(url, data, param, config, activeLoading = true) {
    return requestProcess(_instance.patch(createSendUrl(url, param), data, config), activeLoading);
  }

  /**
   * @typedef {object} RequestConfig
   * @property {string} url - 请求地址
   * @property {object} data - 请求数据
   * @property {string} type - 请求类型
   */

  /**
   *
   * @param {array<RequestConfig>} requestList - 请求数组
   */
  all(requestList) {
    let list = [];
    const ctx = this;
    requestList.forEach(function (item) {
      list.push(ctx[item.type](item.url, item.data));
    });
    return new Promise(function (resolve) {
      axios.all(list)
        .then(axios.spread(function (...response) {
          resolve(response);
        }))
    })
  }
}

function requestProcess(requestPromise, activeLoading = true) {
  // activeLoading && loading.show();
  return new Promise(function (resolve, reject) {
    requestPromise
      .then(function ({data}) {
        // activeLoading && loading.hide();
        resolve(data);
      })
      .catch(function ({response}) {
        // activeLoading && loading.hide();
        reject(response ? response.data.message : '与服务器连接失败…');
      })
  })
}

/**
 * 根据url字符串模板生成请求路径
 * @param {string} url         - 服务端接口API路径
 * @param {Array|Object} param - 需要拼接进url模板中的对象或数组
 * @returns {string}
 */
const createSendUrl = (url, param) => {
  let _url_ = url + '?';
  let key = '';
  if (Type.isArray(param)) {
    for (let i = 0; i < param.length; i++) {
      for (key in param[i]) {
        _url_ = _url_ + key + '=' + param[i][key] + '&'
      }
    }
  } else if (Type.isObject(param)) {
    for (key in param) {
      if (url.lastIndexOf('{' + key + '}') > -1)
        _url_ = _url_.replace('{' + key + '}', param[key]);
      else {
        if (Type.isArray(param[key])) {
          for (let ii = 0; ii < param[key].length; ii++) {
            _url_ = _url_ + key + '=' + param[key][ii] + '&'
          }
        } else {
          _url_ = _url_ + key + '=' + param[key] + '&'
        }
      }
    }
  }
  _url_ = _url_.substring(0, _url_.length - 1);

  return _url_;
};


function defaultError(e) {
  MessageBox.alert(e || '请求失败', '错误', {type: 'error'});
}

const requestInstance = new Request();

export default requestInstance;


/**
 * 根据请求情况进行统一错误处理
 * @param {Function} func - 请求函数
 * @param {Object|*} default_return - 当服务端返回值为undefined或null时，可设置默认返回值
 * @param {Function} onError - 通信错误后的统一处理函数，如不声明则执行默认的错误处理函数
 * @return {Function}
 *
 * @date 18/7/10
 * @author 孟宪邦
 * @constructor
 */
export function RequestGenerator(func, default_return, onError) {
  return function (...args) {
    return new Promise(async function (resolve, reject) {
      try {
        const res = (await func(...args));
        resolve(res == undefined ? default_return : res);
      } catch (e) {
        (onError || defaultError)(e, default_return, resolve, reject);
      }
    })
  }
}




