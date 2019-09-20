# using-frame

React16.* + router4.* 脚手架
Vue 脚手架
原生脚本脚手架



## 环境搭建

- 安装 nodejs ，版本根据 package.json 中指定的最低版本
- 下载项目，执行 npm install 安装所需的插件包，npm run demo 即可启动 demo 项目
- 如果是用 npm 指令打开的，可以 npm run 指令 [--open] & [--zip]，--open 打开一个开发的页面，--zip 压缩 dist 的文件到 zips 目录下
- 项目启动有可能报警告


> 如果不使用 npm 跑指令，则需要执行全局安装 sudo npm install -g cross-env



## 环境常见警告和异常处理

> { parser: "babylon" } is deprecated; we now treat it as { parser: "babel" }.
> 打开 node_modules/vue-loader 查找 prettier.format, 把 babylon 改成 babel
>
> stylelint-webpack-plugin@0.10.5 requires a peer of stylelint@^8.0.0
> 因为组件没有对应的更新，所以会提示 stylelint 没有对应的版本，忽略即可
>
> 还有一个警告 Unsupported platform for fsevents@1.2.7
> 这个组件是 mac 的组件，其他操作系统会提示系统不兼容，忽略即可


## 指令解析

> cross-env configs=demo.react.dev webpack[-dev-server]
> configs 必须是 [demo|project]_[demo项目|项目下的文件夹]_[启动环境][_dll], 如果有 dll 则代表打包第三方包，项目运行的时候先执行 dll,可以加快之后的启动速度



## 使用 npm 跑指令，有如下指令可以选择

> --open 打开一个浏览器，不写默认是不打开
> --ip 启动的 host 为本机的 ip 地址，不写默认是 127.0.0.1



## 配置文件说明

> 配置文件以 src/demo/[dir]/configs/[dev|stg|prd]/*****.js 为依据
> 请尽量通读 src/demo/react/configs/dev/webpack.config.js 所有配置
> 配置文件中 libMaps 是第三方包，需要先执行第三方包提取，参考指令 reactlib
> 配置文件中 venderMaps 是公用脚本
> libMaps 和 verderMaps 的区别在于，lib 的包只会在提取的时候运行一次，之后的运行只是简单的 copy，对于 react 之类的打包可以忽略，之后的所有指令执行起来非常快



## 组件开发

> 组件开发参考 reactdev 首页的霓虹灯组件



## 开发常见问题

> 使用了 cssModule 怎么配置全局样式

- 使用 :global { 这里写样式，或者 import 样式 }
- src/styles/* 都是全局样式
- 把样式文件命名为 [name].global.[scss|less|css]


> react 项目热更新无效

- 使用 react 需要热更新，页面不能有 componentDidMount = () => {}，直接使用 componentDidMount() {} 即可



## 目录结构

```
|src                        -- 开发目录
├── component               -- 公用组件【由项目管理员维护公用工具类】
    └── react               -- react 组件
    └── vue                 -- vue 组件
    └── base                -- 原生组件
    └── jquery              -- jquery 组件，一般 zepto 通用
    └── html                -- 常用 html 编写参照，例如 meta 之类的
├── demo                    -- demo 项目    
    └── react               -- react react-router4 项目文件
        └── configs         -- 配置文件，必须和启动项目的指令中 configs 参数最后一个.后面的名称相同，只能是 dev stg prd 三个文件夹
            └── dev         -- 配置文件夹，每个文件夹下面必须要有 index.js[项目配置] webpack.config.js[打包配置]
        └── views           -- 单页面
        └── component       -- 项目组件
        └── static          -- [非必须]静态文件，打包的时候会把该文件的内容全部 copy 到 dist/static
        └── README.md       -- 项目说明
    └── vue                 -- vue 项目文件
    └── base                -- 原生项目
├── libs                    -- 第三方 lib 包
    └── jspdf               -- js 导出 pdf
    └── ueditor             -- 百度编辑器[该编辑器有对源代码做了修改，直接修改全局 window.UEdtiorConfigsMyPlugin，具体查看 ueditor.all.js readme
├── project                 -- 项目，目录结构和 demo 一致
├── util                    -- 常用工具类【由项目管理员维护公用工具类】
    └── compare             -- 用于基础对象校验
    └── flexible            -- 移动端适配
    └── format              -- 常用对象文本格式转换
    └── history             -- url history 操作函数，用于监听地址改变
    └── image               -- 图片处理工具，处理图片加载异常
    └── network             -- 公用网络请求，包括数据加密加签
    └── polyfill            -- 常规浏览器兼容
        └── es.js           -- 常见浏览器兼容，具体使用直接打开该代码，看注释说明
        └── index.js        -- 常见浏览器兼容，具体使用直接打开该代码，看注释说明
        └── iosBack.js      -- 使用 history state 的单应用 IOS 移动端物理返回键识别返回不了上一个页面
        └── styles.js       -- 样式适配各大浏览器前缀添加
    └── reg                 -- 常用正则校验
    └── sdk                 -- 页面访问量统计工具，具体使用可以参照 demo/react/views/index.js
    └── webuploador         -- webuploador 文件分块上传辅助类，提供常用上传异常处理和绑定
README.md                   -- 项目使用基础文档
package.json                -- 项目配置和依赖
webpack.config.js           -- webpack 打包配置文件
```
