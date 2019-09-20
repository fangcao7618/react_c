import assets from './index.scss';
import React from 'react';
import {
  Button,
  Select,
  TimePicker
} from 'antd';
const Option = Select.Option;

/**
 * antd demo
 * @author zhongzhuhua
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    loading: false,
    iconLoading: false
  };

  componentDidMount() {
    console.log('Home Antd!');
  };

  enterLoading = () => {
    this.setState({
      loading: true
    });
  };

  enterIconLoading = () => {
    this.setState({
      iconLoading: true
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={assets.button}>
          <Button type="primary">Primary Button</Button>
          <Button type="primary" ghost>Primary Ghost Button</Button>
          <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
            Click me!
          </Button>
          <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
            Click me!
          </Button>
        </div>
        <br />
        <div>
          <Select style={{ width: 200 }} placeholder="请选择颜色">
            <Option value="red">红色</Option>
            <Option value="yellow">黄色</Option>
            <Option value="green">绿色</Option>
          </Select>
        </div>
        <br />
        <div>
          <TimePicker placeholder="请选择时间" />
        </div>
      </React.Fragment>
    );
  };
};
