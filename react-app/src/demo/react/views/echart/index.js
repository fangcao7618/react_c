import assets from './index.scss';
import React from 'react';
import echarts from 'echarts/lib/echarts';
// 以下这一部分也可以放到 lib 包里，看页面使用情况
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

/**
 * Echart Demo
 * 注意：如果使用了 css-loader cssModules 配置，由于 width height 会有一定的延时，所以 echart setOption 的时候，必须要有 setTimeout，否则会没有效果
 * @author zhongzhuhua
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('Home Echart!');

    setTimeout(() => {
      echarts.init(document.getElementById('bar')).setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="bar" className={assets.main}></div>
        <div>注意：如果使用了 css-loader cssModules 配置，由于 width height 会有一定的延时，所以 echart setOption 的时候，必须要有 setTimeout，否则会没有效果</div>
        <div>echarts/[lib|component]/* 的内容，可以添加到 webpack.config.js 中的 lib 中</div>
      </React.Fragment>
    );
  };
};
