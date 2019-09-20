// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import HomeIndex from 'views/home/index.vue';
// import UserLogin from 'views/user/login.vue';

Vue.use(Router);

// 按需加载，目前无法动态配置 webpackChunkName
function loadView(view) {
  return (e) => import(`./${view}.vue`);
};

export default new Router({
  routes: [{
    path: '/user/login',
    component: (e) => import( /* webpackChunkName: "user.login" */ './user/login.vue'),
    meta: {
      // 是否需要公用模块
      layout: false
    }
  }, {
    path: '/element/index',
    component: (e) => import( /* webpackChunkName: "element.index" */ './element/index.vue'),
    meta: {
      // 是否需要公用模块
      layout: false
    }
  }, {
    path: '/',
    component: HomeIndex
  }]
});
