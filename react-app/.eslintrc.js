module.exports = {
  "parserOptions": {
    // 指定想要支持的javascript版本,这里6表示es6
    "ecmaVersion": 6,
    // 默认为"script",代码是ECMAScript准则，则设置为"module"
    "sourceType": "module",
    "ecmaFeatures": {
      // 启用JSX
      "jsx": true
    },
    "parser": "babel-eslint"
  },
  "plugins": [
    // 用于校验 vue 中的 js
    "html",
    "react"
  ],
  // 指定脚本的运行环境，支持定义多个
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "parser": "babel-eslint",
  // 定义自己的规则
  "rules": {
    // 方法块 { 需要有空格
    "space-before-blocks": ["error", "always"],
    // 运算操作符号左右需要有等号，目前对 class 中的属性不起效果
    "space-infix-ops": ["error", {
      "int32Hint": true
    }],
    "react/jsx-tag-spacing": ["error", {
      // 非闭合标签空格 /> 结尾
      "beforeSelfClosing": "always"
    }],
    // react 只用于校验 js 和 jsx 文件
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    // 多属性标签，要么一行，要么多行
    "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    // 禁止末尾逗号
    "comma-dangle": ["error", "never"],
    // 禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [2, false],
    // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    "array-bracket-spacing": [2, "never"],
    // 换行风格
    "linebreak-style": [2, "unix"],
    // 不能有多余的空格
    "no-multi-spaces": 2,
    // 空行最多不能超过1行
    "no-multiple-empty-lines": [2, {
      "max": 1
    }],
    // 一行结束后面不要有空格
    "no-trailing-spaces": ["error", {
      "skipBlankLines": true
    }],
    // 标识符不能以_开头或结尾
    "no-underscore-dangle": 2,
    // 允许使用位运算符
    "no-bitwise": 0,
    // 允许定义的变量在使用之后， function 允许
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": true
    }],
    // 禁用var，用let和const代替
    "no-var": 2,
    // 大括号风格
    "brace-style": [1, "1tbs", {
      "allowSingleLine": true
    }],
    // 逗号风格，换行时在行首还是行尾
    "comma-style": [2, "last"],
    // 不限制一行字符串
    "max-len": 0,
    // 缩进风格
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    // 对象字面量中冒号的前后空格
    "key-spacing": [0, {
      "beforeColon": false,
      "afterColon": true
    }],
    // 逗号前后空格配置
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    // 对象大括号空格风格
    "object-curly-spacing": ["error", "always"],
    // 数组中括号空格风格
    "array-bracket-spacing": ["error", "never"],
    // 行前/行后备注
    "lines-around-comment": 0,
    // 禁用行后注释
    "no-inline-comments": 2,
    // 强制行注释只在代码上方，单独成行
    "line-comment-position": ["error", {
      "position": "above"
    }],
    // 注释必须有空格
    "spaced-comment": 2,
    // 强制多行注释代码规范
    "multiline-comment-style": ["error", "separate-lines"],
    // 必须使用全等
    "eqeqeq": 0,
    // 文件最后必须换行
    "eol-last": 2,
    // 箭头函数使用()
    "arrow-parens": 2,
    // 箭头函数的箭头左右要有空格
    "arrow-spacing": 2,
    "implicit-arrow-linebreak": ["error", "beside"],
    // 禁止空方法
    "no-empty-function": 2,
    // jsx dom 强制使用 ""
    "jsx-quotes": ["error", "prefer-double"],
    // 强制分号结尾
    "semi": [2, "always"],
    // 强制方法参数写成一行，或者通过定义每个参数换行
    "function-paren-newline": ["error", "multiline"],
    // 强制方法块换行
    "lines-between-class-members": ["error", "always"],
    // 强制使用单引号
    "quotes": ["error", "single"],
    // 分号前后不允许空格
    "semi-spacing": "error"
  }
};
