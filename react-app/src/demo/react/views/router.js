import React from 'react';
// 不需要懒加载的模块
import homeIndex from 'views/home/index';
// 首页
export const HomeIndex = homeIndex;
// 用户登录
export const UserLogin = React.lazy(() => import(/* webpackChunkName: "user.login" */ 'views/user/login'));
// Iconfont
export const IconIndex = React.lazy(() => import(/* webpackChunkName: "icon.index" */ 'views/icon/index'));
// 用户详情
// import userDetail from 'views/user/detail';
// export const UserDetail = userDetail;
export const UserDetail = React.lazy(() => import(/* webpackChunkName: "user.detail" */ 'views/user/detail'));
// antd demo
export const AntdIndex = React.lazy(() => import(/* webpackChunkName: "antd.index" */ 'views/antd/index'));
// webuploader demo
export const UploadIndex = React.lazy(() => import(/* webpackChunkName: "upload.index" */ 'views/upload/index'));
// echart demo
export const EchartIndex = React.lazy(() => import(/* webpackChunkName: "echart.index" */ 'views/echart/index'));
// editor demo
export const EditorIndex = React.lazy(() => import(/* webpackChunkName: "editor.index" */ 'views/editor/index'));
