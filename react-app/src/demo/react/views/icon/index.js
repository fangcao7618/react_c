import assets from './index.scss';
import React from 'react';

/**
 * iconfont demo
 * @author zhongzhuhua
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log(assets);
    return (
      <React.Fragment>
        iconfont，字体图标，font-family只能写在入口样式表，不需要用 global 关键字
        <div className={assets.main}>
          <i className="icon-credits" />
        </div>
      </React.Fragment>
    );
  };
};
