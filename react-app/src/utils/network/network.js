import reqwest from 'reqwest';
import api from 'configs';

// 请求超时时间
const timeout = 15000;

// 异常提示
const ErrorMsg = {
  network: {
    code: '-1',
    msg: '网络连接异常'
  },
  data: {
    code: '-2',
    msg: '数据处理异常'
  },
  params: {
    code: '-3',
    msg: '参数处理异常'
  },
  result: '数据返回异常'
};

// 公用网络请求
export default class {
  constructor(configs) {
    this.processResponse = configs.processResponse || function(data) {
      return data;
    };
    // 添加公用参数
    this.processRequest = configs.processRequest || function(data) {
      return data;
    };
    // 域名校验
    this.withCredentials = true;
  };

  get(options, cfg) {
    options.method = 'get';
    return this.ajax(options, cfg);
  };

  post(options, cfg) {
    options.method = 'post';
    return this.ajax(options, cfg);
  };

  /**
   * 数据请求
   * @param options
       {
        host: 请求的域名
        url: 请求路径
        surl: 请求的 method，如果含有该属性，则请求的参数会带上 method
        method: 请求方式 get|post
        data: 请求数据
        type: 可以不写，默认 json
        timeout: 超时时间，15000
        contentType: 可以不写，默认 'application/json;charset=utf-8'
        cp: 是否打印请求时传的 data 数据
       }
   * @param cfg
       {
        req: 入参是否加密，默认 true
        res: 输出是否解密，默认 true
       }
   */
  ajax(options, cfg) {
    let self = this;
    if (options.cp) {
      console.log(options.data);
    }
    if (options == null || (!options.url && !options.surl)) {
      return new Promise((resolve) => {
        resolve(ErrorMsg.network);
      });
    }

    cfg = Object.assign({
      req: true,
      res: true
    }, cfg);

    options.url = options.url || '';
    options.host = options.host || api.host;
    let url = `${options.host}${options.url}`;
    options.method = options.method || 'post';
    options.data = options.data || '';
    options.timeout = options.timeout || timeout;

    try {
      options.data = self.processRequest(options.data, cfg);
    } catch (e) {
      return new Promise((resolve) => {
        resolve(Object.assign(ErrorMsg.params, {
          error: e.message
        }));
      });
    }

    delete options.url;
    delete options.host;
    delete options.encRes;
    delete options.encReq;
    options.crossOrigin = true;
    options.withCredentials = options.withCredentials === null || options.withCredentials === undefined ? self.withCredentials : options.withCredentials;

    if (options.surl) {
      options.data = options.data == null || options.data == '' ? {} : options.data;
      options.data.method = options.surl;
      delete options.surl;
    }

    // 网络请求
    return new Promise((resolve) => {
      return reqwest({
        url,
        ...options
      }).then((result) => {
        try {
          result.data = result.responseData || result.data;
          result.code = result.responseCode || result.code;
          result.msg = result.responseMessage || result.msg || ErrorMsg.result;
          delete result.responseCode;
          delete result.responseMessage;
          delete result.responseData;
          // 判断数据是否需要执行 response 方法
          if (result && result.data && options.encRes !== false) {
            result.data = self.processResponse(result.data);
          }
          resolve(result);
        } catch (e) {
          resolve(Object.assign(ErrorMsg.data, {
            error: e.message
          }));
        }
      }).fail((e) => {
        resolve(Object.assign(ErrorMsg.network, {
          error: e
        }));
      });
    });
  };
};
