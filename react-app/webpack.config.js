const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const autoprefixer = require('autoprefixer');
const moment = require('moment');
const query = require('querystring');
const fs = require('fs');
const del = require('del');
const networkIp = require('ip').address();
// 压缩 copy plugin 的代码
const UglifyJs = require('uglify-es');

// 添加 html 校验
const HtmlLintConfig = require('./.htmllintrc.js');
const HtmlLint = require('htmllint');
const HtmlLintMessage = require('htmllint/lib/messages');

// 启动的 ip
let ip = '127.0.0.1';
// 是否打开开发窗口
let open = false;
// 是否压缩 zip 包
let zip = false;
// 第三方包
let libChunks = [];
// babel 解析
let presets = ['react', ['es2015', {
  modules: false
}], 'stage-0'];

// 系统路径
const path = require('path');
// 根目录
const root = path.resolve(process.cwd());
// 开发目录
const pathApp = root + '/src';

// 获取配置文件，process.env.configs 配置必须是 [demo/project]_[文件夹]_[环境配置]
const processConfig = (process.env.configs || '').split('_');

if (processConfig.length != 3 && processConfig.length != 4) {
  log('启动指令异常：配置项异常，请参照 README.md 进行配置\n\n');
  process.exit();
}

// 是否构建 dll
let isBuildLibs = processConfig.length == 4;

// 启动目录名称
let [processName, projectName, env] = processConfig;
let pathProject = `${pathApp}/${processName}/${projectName}`;
let configPath = `${pathProject}/configs/${env}`;

// 保存路径
process.pathApp = pathApp;
process.pathProject = pathProject;
process.configPath = configPath;

// 入口
let entryMaps = {};
// 引用插件
let plugins = [];

// 打包配置
let webpackConfig = require(`${configPath}/webpack.config.js`);

// 判断启动指令，如果不是 dev-server，则初始化部分配置
let isDevServer = process.argv[1].indexOf('webpack-dev-server') > -1;
if (!isDevServer) {
  webpackConfig.hot = false;
}
webpackConfig.devtool = webpackConfig.devtool === null ? (isDevServer ? 'source-map' : false) : webpackConfig.devtool;
webpackConfig.port = webpackConfig.port || 8400;
// 关于 react-router4 使用 BrowserRouter，需要配置 publicPath， 如果有配置了 publicPath，则需要对应配置 rewrites
webpackConfig.publicPath = webpackConfig.publicPath || '';
webpackConfig.rewrites = webpackConfig.rewrites === null || webpackConfig.rewrites === undefined ? true : webpackConfig.rewrites;
if (webpackConfig.publicPath && webpackConfig.rewrites === true) {
  webpackConfig.rewrites = {
    index: webpackConfig.publicPath
  };
}
webpackConfig.minJs = webpackConfig.minJs === null || webpackConfig.minJs === undefined ? !isDevServer : webpackConfig.minJs;
webpackConfig.injectHead = webpackConfig.injectHead === null || webpackConfig.injectHead === undefined ? isDevServer : webpackConfig.injectHead;
webpackConfig.linkCss = webpackConfig.linkCss === null || webpackConfig.linkCss === undefined ? !webpackConfig.hot : webpackConfig.linkCss;

let cssModules = {};
if (webpackConfig.cssModules) {
  cssModules = {
    importLoaders: 1,
    minimize: true,
    sourceMap: false,
    modules: true,
    // hashPrefix: 'hash',
    localIdentName: '[local]-[hash:base64:10]'
  };
}

// 判断是 npm 指令，还是直接终端启动
if (process.env.npm_config_argv) {
  let npmArgv = process.env.npm_config_argv;
  // console.log(npmArgv, ip, networkIp);
  if (npmArgv.indexOf('--ip') > -1) {
    ip = networkIp;
  }

  // 启动页面
  let url = `http://${ip}:${webpackConfig.port}`;
  if (npmArgv.indexOf('--open') > -1) {
    open = true;
  }

  // 打压缩包
  zip = npmArgv.indexOf('--zip') > -1 && !isDevServer;
} else {
  ip = webpackConfig.ip ? networkIp : ip;
  open = webpackConfig.open;
  zip = webpackConfig.zip && !isDevServer;
}

// 打开新窗口
if (open) {
  plugins.push(new OpenBrowserPlugin({
    url: url
  }));
}

// 开发压缩 zip 包
if (zip) {
  let zipName = webpackConfig.zipName || '[name].[env].[time]';
  let zipDic = webpackConfig.zipDic;
  zipDic = zipDic ? '/' + zipDic.replace(/^\//g, '') : null;
  zipName = zipName.replace('[name]', projectName).replace('[env]', env).replace('[time]', moment().format('YYYYMMDDHHmmss'));

  if (zipDic) {
    plugins.push(new FileManagerPlugin({
      onEnd: {
        mkdir: [`${root}/zips`],
        copy: [{
          source: './dist',
          destination: `./zips/temp/${zipDic}`
        }],
        archive: [{
          source: `./zips/temp`,
          destination: `./zips/${zipName}.zip`,
          format: 'zip'
        }],
        delete: ['./zips/temp']
      }
    }));
  } else {
    plugins.push(new FileManagerPlugin({
      onEnd: {
        mkdir: [`${root}/zips`],
        archive: [{
          source: `./dist`,
          destination: `./zips/${zipName}.zip`,
          format: 'zip'
        }]
      }
    }));
  }
}

// 第三方脚本
if (isBuildLibs) {
  del.sync(`${root}/libs/${processName}/${projectName}`);
  let libMaps = webpackConfig.libMaps;
  if (libMaps && libMaps.length > 0) {
    for (let key in libMaps) {
      let lib = libMaps[key];
      entryMaps[lib.name] = lib.modules;
    }
  }

  plugins.push(new webpack.DllPlugin({
    path: `${root}/libs/${processName}/${projectName}/[name].manifest.json`,
    name: `[name]`,
    context: root
  }));

  addMinPlugins(false);
} else {
  // 如果是打包非 lib
  if (!isDevServer) {
    del.sync(`${root}/dist/**/*`);
  }

  let venderNames = [];
  let venderMaps = webpackConfig.venderMaps;
  if (venderMaps && venderMaps.length > 0) {
    for (let key in venderMaps) {
      let vender = venderMaps[key];
      entryMaps[vender.name] = vender.modules;
      venderNames.push(vender.name);

      // 分离公用脚本
      plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: vender.name,
        names: vender.modules,
        minChunks: 0
      }));
    }
  }

  let libMaps = webpackConfig.libMaps;
  let libMapsLength = libMaps ? libMaps.length : 0;
  if (libMapsLength > 0) {
    for (let key in libMaps) {
      let lib = libMaps[key];
      // entryMaps[lib.name] = lib.modules;

      let manifest = `${root}/libs/${processName}/${projectName}/${lib.name}.manifest.json`;
      if (!fs.existsSync(manifest)) {
        log('打包配置 libs 异常，请先生成项目 libs');
        process.exit();
      }
      plugins.push(new webpack.DllReferencePlugin({
        manifest: require(`${root}/libs/${processName}/${projectName}/${lib.name}.manifest.json`),
        context: root
      }));
    }
  }

  // 读取 libs
  if (libMapsLength > 0) {
    try {
      let libs = fs.readdirSync(`${root}/libs/${processName}/${projectName}/js`);
      if (libs) {
        for (let key in libs) {
          libChunks.push(`${webpackConfig.publicPath}libs/${libs[key]}`);
        }
      }

      // 拷贝 libs
      plugins.push(new CopyWebpackPlugin([{
        from: `${root}/libs/${processName}/${projectName}/js`,
        to: `${root}/dist/libs`
      }]));
    } catch (e) {
      log('第三方 lib 打包异常');
      process.exit();
    }
  }

  // 添加入口页面
  entryMaps.index = [`${pathProject}/views`];
  addPagePlugins('index', webpackConfig.indexTitle, [...venderNames, 'index']);

  // 多页面配置，页面中有的 chunks 都需要添加到 entryMaps 中
  if (webpackConfig.pages && webpackConfig.pages.length > 0) {
    let pages = webpackConfig.pages;

    for (let key in pages) {
      let page = pages[key];
      let chunks = null;
      if (page.chunks === null || page.chunks === undefined) {
        chunks = [...venderNames, page.path];
      } else if (page.chunks === false || !pages instanceof Array) {
        chunks = [];
      } else {
        chunks = [...venderNames, ...page.chunks];
      }

      // 根据 chunks 自动添加不存在的 entryMap
      for (let chunkKey in chunks) {
        let mapKey = chunks[chunkKey].replace(/\//g, '_');
        if (!entryMaps[mapKey]) {
          entryMaps[mapKey] = [`${pathProject}/views/${chunks[chunkKey]}.js`];
        }
        chunks[chunkKey] = mapKey;
      }

      // console.log(page.path, page.title, chunks);
      addPagePlugins(page.path, page.title, chunks, page.isLib);
    }
  }

  if (webpackConfig.libs && webpackConfig.libs.length > 0) {
    for (let key in webpackConfig.libs) {
      let name = webpackConfig.libs[key];

      // 查看是否在 src/libs 下有包，如果有的话，则直接拷贝
      let isLib = fs.existsSync(`${root}/src/libs/${name}`);
      let toDic = `${root}/dist/libs/${name}`;

      // 如果是百度编辑器，则拷贝 
      if (name == 'ueditor') {
        addCopyWebpackPlugin(`${root}/src/libs/${name}`, toDic);
        addCopyWebpackPlugin(`${root}/node_modules/${name}-static`, toDic);
      } else if (isLib) {
        addCopyWebpackPlugin(`${root}/src/libs/${name}`, toDic);
      } else {
        addCopyWebpackPlugin(`${root}/node_modules/${name}`, toDic);
      }
    }
  }

  // 拷贝静态文件
  if (fs.existsSync(`${pathProject}/static`)) {
    plugins.push(new CopyWebpackPlugin([{
      from: `${pathProject}/static`,
      to: `${root}/dist/static`
    }]));
  }

  if (webpackConfig.hot) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    presets.push('react-hmre');
  }

  // 是否压缩脚本
  if (webpackConfig.minJs) {
    addMinPlugins();
  }
}

// 是否独立打包样式
let cssDir = webpackConfig.publicPath ? 'css/' : '';
if (webpackConfig.publicPath === '' && webpackConfig.linkCss) {
  cssDir = '';
}
plugins.push(new ExtractTextPlugin({
  filename: `${cssDir}[name].[hash:6].css`,
  disable: !webpackConfig.linkCss
}));

// 添加 webpack 打包环境变量
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: isDevServer ? '"development"' : '"production"',
    env: `"${env}"`
  }
}));

// 如果是开发环境，添加校验
let loaders = [];
if (isDevServer) {
  plugins.push(new StyleLintPlugin({
    // 校验的目录
    context: pathProject,
    // 校验不通过是否项目不可以运行
    failOnError: false,
    // 需要校验的文件
    files: '**/*.(less|vue|html|scss|sass)'
  }));

  // 添加 vue 校验
  loaders.push({
    test: /\.vue$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  });

  // 添加 html lint
  plugins.push(new LintHtmlWebpackPlugin());
}

// 允许错误不打断程序
// plugins.push(new webpack.NoEmitOnErrorsPlugin());

// 添加第三方库
plugins.push(new DllHtmlWebpackPlugin());

// 全局样式
let styleReg = /(node_modules|\.global|src\/styles)/;

// console.log(entryMaps);
// 配置文件
let output = {
  // 开发根目录
  context: pathApp,

  // 入口文件
  entry: entryMaps,

  // 引用插件
  plugins: plugins,

  // 脚本文件输出配置
  output: {
    chunkFilename: `${webpackConfig.publicPath || isBuildLibs ? "js/": ""}[name].[${webpackConfig.hot ? "hash" : "chunkhash"}:6].js`,
    filename: `${webpackConfig.publicPath || isBuildLibs ? "js/": ""}[name].[${webpackConfig.hot ? "hash" : "chunkhash"}:6].js`,
    path: `${root}/${isBuildLibs ? `libs/${processName}/${projectName}` : 'dist'}`,
    library: '[name]',
    // 静态目录
    publicPath: webpackConfig.publicPath,
  },

  // 别名配置
  resolve: {
    alias: {
      modules: `${root}/node_modules`,
      src: `${pathApp}`,
      components: `${pathApp}/components`,
      component: `${pathProject}/component`,
      utils: `${pathApp}/utils`,
      configs: configPath,
      styles: `${pathApp}/styles`,
      project: pathProject,
      views: `${pathProject}/views`
    }
  },

  // 模块解析
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: presets,
          cacheDirectory: false,
        }
      }, 'webpack-module-hot-accept', {
        loader: 'eslint-loader'
      }]
    }, {
      test: /\.(jpe?g|gif|png|ico)$/,
      loader: `url-loader?limit=${webpackConfig.baseimg || 8192}&name=img/[name].[hash:4].[ext]`
    }, {
      test: /\.(svg|eot|ttf|woff)$/,
      loader: `url-loader?name=font/[name].[hash:4].[ext]`
    }, {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader'
      }, {
        loader: 'eslint-loader'
      }]
    }, {
      test: /\.less$/,
      exclude: styleReg,
      use: useExtractTextPlugin(false, true)
    }, {
      test: /\.less$/,
      include: styleReg,
      use: useExtractTextPlugin(false, false)
    }, {
      test: /\.s?css$/,
      exclude: styleReg,
      use: useExtractTextPlugin(true, true)
    }, {
      test: /\.s?css$/,
      include: styleReg,
      use: useExtractTextPlugin(true, false)
    }, ...loaders]
  },

  // 开发
  devServer: {
    host: ip,
    hot: webpackConfig.hot,
    noInfo: true,
    inline: webpackConfig.hot,
    compress: true,
    port: webpackConfig.port,
    historyApiFallback: webpackConfig.rewrites,
    https: webpackConfig.https,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
    proxy: webpackConfig.proxy || {},
    stats: {
      cached: false,
      colors: true
    },
    // 配置 mock 数据
    before: function(app) {
      app.get('/mock/*', mockResult);
      app.post('/mock/*', function(req, res) {
        let result = '';
        req.on('data', function(data) {
          result += data;
        });
        req.on('end', function(data) {
          result = result == null || result == '' ? null : query.parse(result);
          mockResult(req, res, result && result.method);
        });
      });
    },
    contentBase: `${root}`
  },

  devtool: webpackConfig.devtool,
};

module.exports = output;

// sass-loader 和 less-loader
function useExtractTextPlugin(isSass, isModules) {
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: isModules ? cssModules : {}
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer({
          browsers: webpackConfig.browsers || ['> 1%', 'last 2 versions'],
          overrideBrowserslist: webpackConfig.browsers || ['> 1%', 'last 2 versions'],
        })],
      },
    }, {
      loader: isSass ? 'sass-loader' : 'less-loader',
      options: isSass ? {} : {
        paths: [path.resolve(__dirname, 'node_modules')],
        javascriptEnabled: true,
        modifyVars: webpackConfig.antTheme || {}
      }
    }]
  });
};

// 返回请求的 mock 数据
function mockResult(req, res, method) {
  method = (req.query.method || req.query.action) || (typeof method == 'string' ? method : '');
  let mSecond = webpackConfig.mocknet ? (Math.random() * 3000) : 1;
  let url = req.originalUrl.replace(/\?.*/, '').replace(/\..*$/, '') + (method ? ('/' + method) : '') + '.json';
  url = url.replace(/\/\//g, '/');
  if (!fs.existsSync(`${pathProject}${url}`)) {
    res.json({
      code: '-1',
      msg: '接口不存在'
    });
    res.end();
    return;
  }
  let result = JSON.parse(fs.readFileSync(`${pathProject}${url}`), 'utf-8');
  new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
      res.json(result);
    }, mSecond);
  });
};

// 打印提示
function log(msg, color = 'red') {
  let code = {
    black: '\033[30m',
    red: '\033[31m',
    yellow: '\033[34m'
  };
  console.log(`${code[color]}${msg}${code[color]}${code.black}`);
};

// 拷贝第三方包
function addCopyWebpackPlugin(_form, _to) {
  plugins.push(new CopyWebpackPlugin([{
    from: _form,
    to: _to,
    ignore: ['*.exe', '*.map', '*.md'],
    cache: true,
    transform: webpackConfig.minJs ? function(content, fileName) {
      // 如果是 js 文件
      if (fileName && /\.js$/.test(fileName)) {
        return UglifyJs.minify(content.toString()).code;
      }
      return content;
    } : null
  }]));
};

// 添加压缩组件
function addMinPlugins(drop_console = true) {
  // 压缩输出的 JS 代码
  let uglifyPlug = new webpack.optimize.UglifyJsPlugin({
    compress: {
      // 在 UglifyJs 删除没有用到的代码时不输出警告
      warnings: false,
      // 删除所有的 `console` 语句，可以兼容ie浏览器
      drop_console: drop_console,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    },
    output: {
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
    }
  });
  plugins.push(uglifyPlug);
};

// 添加 dll
function DllHtmlWebpackPlugin(options) {
  this.options = options;
};

DllHtmlWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(data, callback) {
      if (data.plugin.options.isLib !== false) {
        data.assets.js = [...libChunks, ...data.assets.js];
      }
      callback(null, data);
    });
  });
};

// 添加 htmllint
function LintHtmlWebpackPlugin(options) {
  this.options = options;
};

LintHtmlWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(data, callback) {
      let html = data.html;
      let lint = new HtmlLint(html, HtmlLintConfig);
      lint.then((res) => {
        let message = '';
        if (res.length > 0) {
          message = `<script>document.body.innerHTML = '<span style="color: red;">HTML 页面代码错误，具体异常查看 console 输出!!!</span>';</script>`;
        }
        for (let key in res) {
          let issue = res[key];
          message += `<script>console.error("${HtmlLintMessage.renderIssue(issue)}.", "line: ${issue.line}", "column: ${issue.column}")</script>`;
        }

        data.html += message;
        callback(null, data);
      });
    });
  });
};

// 添加页面组件
function addPagePlugins(url, title, chunks, isLib) {
  let plugin = new HtmlWebpackPlugin({
    filename: `${url}.html`,
    inject: 'body',
    template: `!!ejs-webpack-loader!${pathProject}/views/${url}.html`,
    title: title || '首页',
    publicPath: webpackConfig.publicPath,
    chunks: chunks,
    chunksSortMode: 'manual',
    isLib,
    minify: isDevServer ? null : {
      // 去掉注释
      removeComments: true,
      // 去掉空格
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    }
  });

  plugins.push(plugin);
};
