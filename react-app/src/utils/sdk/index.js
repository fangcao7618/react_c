/**
 * 访问量统计工具，如果是单页面应用，需要通过监听路由变化，重新执行 reset 方法
 * 如果是单页面应用，可以使用 HistoryState 重新 send
 * eg:
    import HistoryState from 'components/react/History/state';
    import Sdk from 'utils/sdk';
    let sdk = new Sdk(global.channel, configs.env);
    let lastUrl = location.href;
    HistoryState((url) => {
      sdk.send(lastUrl);
      lastUrl = url;
    });
 */
export default class {
  /**
   * 创建 sdk 工具
   * eg:
      import Sdk from 'utils/sdk';
      let sdk = new Sdk(global.channel, configs.env);
      sdk.reset();
   * @param appid 渠道号
   * @param env 配置环境
   * @param vn 版本号
   * @param vc 二级版本号
   */
  constructor(appid, env, vn = '', vc = '') {
    global.pingan_sdk_appid = appid;
    global.pingan_sdk_vc = vc;
    global.pingan_sdk_vn = vn;
    global.pingan_sdk_url = `//iobs02.pingan.com.cn/download/eits-access-dmz-prd/h5sdk001${env == 'prd' ? '' : '_test'}.js`;
    let script = document.createElement('script');
    script.id = 'pingan_sdk';
    script.src = global.pingan_sdk_url;
    document.querySelector('head').appendChild(script);
  };

  // 单页面重新请求
  send = (lastUrl) => {
    if (lastUrl && DTMgr && DTMgr.set instanceof Function) {
      let t = (new Date).getTime();
      SKBASE.lealSet(t);
      SKBASE.addGenre({
        name: window.location.href,
        start: WebappStart,
        duration: parseInt((t - WebappStart) / 1e3),
        refer: lastUrl
      }, 'pages');
      DTMgr.set();
    }
  };
};
