/**
 * 总入口页
 * @author all
 */
import './index.scss';
import React from 'react';
import 'utils/network/sm2';
import ReactDOM from 'react-dom';
import {
  /**
   * 此处的 BrowserRouter 可以使用 HashRouter, 如果使用 BrowserRouter, 需要服务器配置使用 rewrite 功能，避免路由异常
   * Browser 是普通路由，建议配置此路由，避免一些访问统计不起效果
   * Hash 是路由通过 hash 来配置
   */
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import {
//   createBrowserHistory
// } from 'history';
// const browserHistory = createBrowserHistory();
import configs from 'configs';
global.channel = configs.site.params.sellChannel;
console.log('Project run success!', configs);

// 监听路由器变化，添加 sdk，如果不需要 sdk 可以删除
// import HistoryState from 'components/react/History/state';
// import Sdk from 'utils/sdk';
// let sdk = new Sdk(global.channel, configs.env);
// let lastUrl = location.href;
// HistoryState((url) => {
//   sdk.send(lastUrl);
//   lastUrl = url;
// });

// 百度编辑器统一请求路径
import {
  UeditorConfig
} from './interface';
window.UEDITOR_CONFIG.serverUrl = UeditorConfig();

// 使用 React.lazy() 懒加载页面和组件，需要配置 React.Suspense 使用
import {
  HomeIndex,
  UserLogin,
  UserDetail,
  AntdIndex,
  UploadIndex,
  EchartIndex,
  EditorIndex,
  IconIndex
} from './router';

// 路由配置
class MyRoutes extends React.Component {
  render() {
    return (
      <div className="layout-main">
        <Switch>
          <Route exact path="/" component={HomeIndex} />
          <Route path="/home/index" component={HomeIndex} />
          <Route path="/user/detail" component={UserDetail} />
          <Route path="/antd/index" component={AntdIndex} />
          <Route path="/upload/index" component={UploadIndex} />
          <Route path="/echart/index" component={EchartIndex} />
          <Route path="/editor/index" component={EditorIndex} />
          <Route path="/icon/index" component={IconIndex} />
        </Switch>
      </div>
    );
  };
};

// App 框架集
class App extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    // 框架集是否加载完毕
    loaded: false
  };

  componentWillMount() {
    this.setState({
      loaded: true
    });
  };

  render() {
    const {
      loaded
    } = this.state;

    return (
      <div class="app">
        <div>Frame</div>
        {loaded ? <MyRoutes /> : <div></div>}
      </div>
    );
  };
};

// 渲染页面 Router 中如果加入 forceRefresh={true} 则会变成每次路由变化，都强制刷新，也就是非 spa 模式
ReactDOM.render(
  <React.Suspense fallback={<div></div>}>
    <Router keyLength={6}>
      <Switch>
        <Route path="/user/login" component={UserLogin} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </React.Suspense>,
  document.getElementById('root')
);
