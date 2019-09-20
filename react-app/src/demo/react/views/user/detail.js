import assets from './detail.scss';
import React from 'react';
import Image from 'component/image';

/**
 * 用户详情页面
 * @author zhongzhuhua
 */
export default class extends React.Component {
  state = {
    num: 0
  };

  componentDidMount() {
    console.log('UserDetail');
  };

  render() {
    return (
      <React.Fragment>
        <div className={assets.main}>Hello User Info!</div>
        <a href="javascript:void(0);" onClick={(e) => this.props.history.goBack()}>GoBack</a>
        <div>
          <button onClick={(e) => this.setState({ num: ++this.state.num })}>点击{this.state.num}</button>
        </div>
        <Image />
      </React.Fragment>
    );
  };
};
