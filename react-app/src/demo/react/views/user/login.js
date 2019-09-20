import React from 'react';
import reqwest from 'reqwest';
import {
  IUserAdd
} from 'views/interface';
import configs from 'configs';

/**
 * 用户登录页面
 * @author zhongzhuhua
 */
export default class extends React.Component {
  componentDidMount() {
    console.log('User Login!');

    reqwest({
      url: configs.host,
      method: 'post',
      data: {
        method: IUserAdd
      }
    }).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>Hello User Login!</div>
        <a href="javascript:void(0);" onClick={(e) => this.props.history.goBack()}>GoBack</a>
      </React.Fragment>
    );
  };
};
