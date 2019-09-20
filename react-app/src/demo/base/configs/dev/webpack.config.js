// webpack 配置
module.exports = {
  // 引用文件静态目录，如果是多页面应用，则需要对应把页面的 a 连接，变成 /publicPath/***/**，如果不配置，则所有的 js 和 css 默认放置在根目录
  publicPath: '/',
  // webpack-dev-server 启动是否为本机 ip，不填默认 127.0.0.1 [如果使用 npm run 方式，该配置无效]
  ip: false,
  // 是否开启 https
  https: false,
  // webpack-dev-server 是否自动打开窗口 [如果使用 npm run 方式，该配置无效]
  open: false,
  // 非开发环境打 zip 包 [如果使用 npm run 方式，该配置无效]
  zip: false,
  // zip 包名称 [name]=项目名称 [env]=环境 [time]=时间戳，默认是 [name].[env].[time]
  zipName: '[name].[env]',
  // zip 放置在哪个目录中，如果配置了，则 [name].[env].zip 解压出来则是对应的 zipDic/所有文件
  // zipDic: 'demo/react',
  zipDic: null,
  // 启动端口，只对使用 webpack-dev-server 有效
  port: 8400,
  // 是否开启热更新，只对使用 webpack-dev-server 有效
  hot: true,
  // 是否开启代理，只在 dev 下有效 { '/api': { target: 'http://**.**' } }
  proxy: null,
  // 是否使用 antd 如果使用，则配置好变量，具体配置可以参考 antd 默认配置文件
  antTheme: null,
  // 是否压缩脚本 true false null，如果是 null 的话 webpack-dev-server 默认 false，webpack 默认 true 
  minJs: null,
  // 是否打包 source-map 值为 [false|'source-map'] ，如果是 webpack-dev-server 默认为 'sorce-map'
  devtool: null,
  // 是否开启 css-modules，react 的话，如果不考虑使用规范命名，可以开启
  // 开始之后使用  import assets from '**/*.scss'; <div className={assets.样式名称}></div>
  // 如果配置了 css-modules 又需要引用全局的样式，只需要把样式命名为 *.global.(less|css|scss) 即可
  cssModules: false,
  // 是否独立打包 css 样式，默认开启热更新的时候不打包，如果开启了，则样式不能热更新
  linkCss: null,
  // 是否模拟真实网络请求，只对使用 webpack-dev-server 有效
  mocknet: true,
  // postcss 自动生成前缀，默认是 ['> 1%', 'last 2 versions']
  // 可以根据 pc 或者 mobile 选择配置 ['Android>=2.2', 'ios>=5'] ['ie>=10', 'chrome>=4', 'safari>=4', 'firefox>=8']
  browsers: ['ie>=10', 'chrome>=4', 'safari>=4', 'firefox>=8'],
  // 配置小于 baseimg 的图片转成 base64，默认 8k
  baseimg: null,
  // rewrites 配置所有的请求自动添加 .html 后缀
  rewrites: {
    rewrites: [{
      form: /\/*/,
      to: function(context) {
        return `/${context.parsedUrl.pathname}.html`;
      }
    }]
  },
  // 第三方 lib 包，根据名称拷贝对应 src/libs 的文件夹
  libs: null,
  // 第三方脚本文件，必须用 lib[_***] 命名，如果有需要参照 demo/react/configs/dev/webpack.config.js
  libMaps: [{
    // 脚本名称
    name: 'lib_jquery',
    // 引用的 node_modules 包
    modules: ['jquery']
  }],
  // 公用库，文件建议以 vender[_*] 为文件名
  venderMaps: [{
    name: 'vender',
    modules: [`${process.configPath}`, `${process.pathApp}/utils/polyfill`],
  }],
  // 入口页面 title
  indexTitle: '首页',
  // 多页面配置，如果不是 react vue，可以参照 src/demo/bae/configs/dev/webpack.configs.js
  pages: [{
    path: 'user/login',
    title: '用户登录',
    // 是否需要第三方 dll 包，!== false 的时候为需要
    isLib: false,
    // chunks 数组，则是 vender + 数组
    chunks: ['user/login', 'user/islogin']
  }, {
    path: 'user/detail',
    title: '用户信息',
    // 不配置或者 null 则是 vender + path
    chunks: null
  }, {
    path: 'user/list',
    title: '用户列表',
    // false 则是不需要脚本[不包含 isLib]
    chunks: false
  }]
};
