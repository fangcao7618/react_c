function setupFH5JsBridge(callback) {
  var ua = navigator.userAgent.toLowerCase(),
    isiOS = ua.match(/(iphone|ipod|ipad);?/i),
    isAndroid = ua.match('android');
  if (isiOS) {
    if (window.FH5JsBridge) {
      return callback(FH5JsBridge);
    }
    if (window.FH5Callbacks) {
      return window.FH5Callbacks.push(callback);
    }
    window.FH5Callbacks = [callback];
    var FH5Iframe = document.createElement('iframe');
    FH5Iframe.style.display = 'none';
    FH5Iframe.src = 'fh5jsbridge://__BRIDGE_LOADED__';
    document.documentElement.appendChild(FH5Iframe);
    setTimeout(function() {
      document.documentElement.removeChild(FH5Iframe);
    }, 0);
  } else {
    if (window.FH5JsBridge) {
      window.FH5JsBridge.initBridge(callback);
    } else {
      document.addEventListener(
        'FH5JsBridgeReady',
        function() {
          window.FH5JsBridge.initBridge(callback);
        },
        false);
    }
  }
};

setupFH5JsBridge(function(bridge) {
  // 业务方注册的接口，由业务js实现，供native调用                   
});

function tryToGetNative(dealFun) {
  try {
    dealFun();
  } catch (e) {
    // console.error(e)
  }
}

export function getSSOTicket(callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('getSSOTicket', null, callback));
}

/**
 * 注意：以下回调接口中使用的res 结构均为：
 *     res= {status, errMsg|data}参数
 *     status 代表调用具体Native API 的状态，0-成功，1-失败
 *     data 代表调用具体Native API 的回传数据
 *     errMsg 代表错误信息
 *     res注释：
 *           成功: {status:0, data:{}},
 *           失败: {status:1, errMsg:string}
 */

/**
 * 设置临时存储数据
 * @param  {object}   key       缓存key
 * @param  {object}   value     缓存value
 * callback入参 {object}
 */
export function setData(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('setData', options, callback));
};

/**
 * 获取临时存储数据
 * @param  {object}   key       缓存key
 * callback入参 {object}
    callback 返回的res 遵循上面定义 data 格式：{value:xxx}
    成功时 如:
    {
      status:0,
      data:{
        value:xxx
      }
    }
 */
export function getData(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('getData', options, callback));
};

/**
 * 删除临时存储数据
 * @param  {object}   key       缓存key
 * callback入参 {object}
 */
export function removeData(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('removeData', options, callback));
};

/**
 * 设置永久存储数据
 * @param  {object}   key       缓存key
 * @param  {object}   value     缓存value
 * callback入参 {object}
 */
export function setLocalData(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('setLocalData', options, callback));
};

/**
 * 获取永久存储数据
 * @param  {object}   key       缓存key
 * callback入参 {object}
    callback 返回的res 遵循上面定义 data 格式：{value:xxx}
    成功时 如:
    {
      status:0,
      data:{
        value:xxx
      }
    }
 */
export function getLocalData(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('getLocalData', options, callback));
};

/**
 * 删除永久存储数据
 * @param  {object}   key       缓存key
 * callback入参 {object}
 */
export function removeLocalData(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('removeLocalData', options, callback));
};

/**
 * 设置标题
 * @param  {object}   options {object}
 *     options.title  string  标题名称
 options = {
    titile: '', 标题
    textColor: '', 标题栏名称颜色(可选)
    barBgColor: '' 标题栏背景色 (可选)
 }
 * callback入参 ？？
 */
export function setTitle(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('setTitle', options, callback));
  if (!window.FH5JsBridge) {
    document.title = options.title;
  }
};

/**
 * h5导航栏 调用native 关闭 webview
 * @param  {object}  options 可为空
 * callback入参 {object} 
 */
export function closeWebView(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('closeWebView', options, callback));
};

/**
 * h5导航栏 调用native 返回 webview
 * @param  {object}  options 可为空
 * callback入参 {object} 
 */
export function backWebView(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('backWebView', options, callback));
};

/**
 * 设置返回按钮功能
 * @param  {object}  
 * options {type: goBack | close }   返回|关闭  按钮
 * callback入参 {object} 
 */
export function setBack(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('setBack', options, callback));
};

/**
 * 显示和隐藏关闭按钮
 * @param  {object}  
 * options {type: show | hide}   显示|隐藏  按钮
 * callback入参 {object} 
 */
export function showCloseIcon(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('showCloseIcon', options, callback));
};

/**
 * 显示和隐藏返回按钮
 * @param  {object}  
 * options {type: show | hide}   显示|隐藏  按钮
 * callback入参 {object} 
 */
export function showBackIcon(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('showBackIcon', options, callback));
};

/**
 * 显示/隐藏native导航
 * @param  {object}  
 * options {type: show | hide}   显示|隐藏native导航
 * callback入参 {object} 
 */
export function showNavBar(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('showNavBar', options, callback));
};

/**
 * 打开native 页面
 * @param  {object}  
 * options 
 * callback入参 {object} 
 */
export function openAppPage(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('openAppPage', {
    pageName: options
  }, callback));
};

/**
 * 收银台支付
 * @param  {object}  
 options = {
    orderNo:'',  // 订单号
    productCode: '', // 产品code
    orderAmount: '', // 订单金额
    productName: ''  // 产品名称
 }
 */
export function pay(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('pay', options, callback));
};

/**
 * 刷新会话 刷新登录态
 * @param  {object}  
 * options 自行约定
 */
export function refreshSession(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('refreshSession', options, callback));
};

/**
 * 登录
 * @param  {object}  
 * options 自行约定
 */
export function login(options, callback) {;
  tryToGetNative(() => FH5JsBridge.callHandler('login', options, callback));
};

/**
 * 开户
 * @param  {object}  
 * options 自行约定
 */
export function openAccount(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('openAccount', options, callback));
};

/**
 * 打开安全键盘
 * @param  {object}  
 * options 自行约定
 */
export function openSafeKeyboard(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('openSafeKeyboard', options, callback));
};

/**
 * 分享
 * @param  {object}  
 * options 自行约定
 */
export function share(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('share', options, callback));
};

/**
 * 打电话
 * @param  {object}  
 * options {phoneNumber: ""}
 */
export function call(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('call', options, callback));
};

/**
* 发短信
* @param  {object}  
* options {
  phoneNumber: "",
  message: ""
}
*/
export function gotoSms(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('gotoSms', options, callback));
};

/**
 * 调拍照
 * @param  {object}  
 * options {
    phoneNumber: "",
    message: ""
  }
*/
export function showImagePicker(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('showImagePicker', options, callback));
};

/*
 * 保存图片到设备
 * string: 截取base64逗号后的字符串
 */
export function saveImg(string, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('saveImageFromBase64', string, callback));
};

/*
 * 跳贷款进件
 * @param: {object}
 */
export function gotoYDTWebView(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('gotoYDTWebView', options, callback));
};

/*
  * 打开pdf文档
  * @param: {object}
  * options {
    name: 'pdf页面导航栏标题',
    downloadUrl：'以.pdf后缀结尾的全路径地址''
  }
*/
export function gotoPDFWebView(options, callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('gotoPDFWebView', options, callback));
};

/* 扫描条形码 */
export function startScan(callback) {
  tryToGetNative(() => FH5JsBridge.callHandler('startScan', {}, callback));
};
