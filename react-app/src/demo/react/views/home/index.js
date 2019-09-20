import assets from './index.scss';
import React from 'react';
import network, {
  encrypt
} from 'utils/network/CFNetwork';
import {
  Link
} from 'react-router-dom';
import {
  IHomeIndex
} from 'views/interface';
import {
  say
} from 'project/component';
import {
  Button
} from 'antd';
import Text from 'components/react/text/neon';

/**
 * 首页
 * @author zhongzhuhua
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  };

  state ={
    img: null
  };

  componentDidMount() {
    console.log('Home Index!');

    network.post({
      url: IHomeIndex,
      data: {
        user: 'zhongzhuhua',
        pass: '123456'
      }
    }).then((res) => {
      console.log(res);
    });

    // network.get({
    //   host: 'http://127.0.0.1:8400/',
    //   url: 'react/index.json'
    // }).then((res) => {
    //   console.log(res);
    // });

    let result = say();
    console.log(result);
  };

  encrypt = () => {
    console.log('普通密码加密', 'zhong123', encrypt('zhong123'));
    console.log('普通无时间戳密码加密', 'zhong123', encrypt('zhong123', false, null));
    console.log('使用渠道号加密密码', 'zhong123', global.channel, encrypt('zhong123', global.channel));
  };

  render() {
    return (
      <React.Fragment>
        <div className={assets.main}>
          <span>Hello Home Index!</span>
          <div className={assets.red}>Red Style!</div>
        </div>
        <div>Index Color!</div>
        <div className="main flex">global class main</div>
        <br />
        <div className="main">以下链接为常用demo</div>
        <div><Link to="/icon/index">Go To IconFont</Link></div>
        <div><Link to="/user/login">Go To Login</Link></div>
        <div><Link to="/user/detail">Go To Detail And Look Component</Link></div>
        <div><Link to="/antd/index">[ANTD UI]Antd Demo</Link></div>
        <div><Link to="/upload/index">[分块上传文件]WebUploader Demo</Link></div>
        <div><Link to="/echart/index">[百度图片]Echart Demo</Link></div>
        <div><Link to="/editor/index">[百度编辑器]Editor Demo</Link></div>
        <br />
        <Button onClick={this.encrypt} type="primary" name="zhong">
          打开控制台点我看看加密
        </Button>
        <br />
        <div className={assets.component}>
          <div>组件商城公用组件，如果样式有使用定义变量的，建议不使用 css modules</div>
          <div>公用组件，如果使用 !default 定义变量的，引用的时候，由调用者来 import 对应的样式</div>
          <div>组件商城公用组件请参考 src/components/react/text/neon 和该页面的使用</div>
          <div>所有 src/components 下的组件样式使用 .g[文件夹首字母]-[文件夹名称]-[文件名称] 做前缀</div>
          <div>所有自己项目中的组件[需要提取到组件商城的]，使用 .c-[文件夹]-[文件名称] 做前缀</div>
          <div>可以配置的样式，也可以通过 js [react props] 的方式插入到组件中</div>
          <div className={assets.text}><Text>我是霓虹灯组件</Text></div>
          <div className={assets.rewrite}><Text>我是重写的霓虹灯组件</Text></div>
        </div>
      </React.Fragment>
    );
  };
};
