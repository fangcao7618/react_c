/**
 * 总入口页
 * @author all
 */
import './index.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import configs from 'configs';
global.channel = configs.site.params.sellChannel;
console.log('Project run success!', configs);

// import 'element-ui/lib/theme-chalk/index.css';
// element ui 按需使用
import {
  Button,
  Input,
  Form,
  FormItem,
  Select,
  Option
} from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$ELEMENT = {
  size: 'small',
  zIndex: 3000
};

// 监听路由器变化，添加 sdk，如果不需要 sdk 可以删除
// import HistoryState from 'components/react/History/state';
// import Sdk from 'utils/sdk';
// let sdk = new Sdk(global.channel, configs.env);
// let lastUrl = location.href;
// HistoryState((url) => {
//   sdk.send(lastUrl);
//   lastUrl = url;
// });

new Vue({
  router,
  el: '#root',
  render: (app) => app(App)
});
