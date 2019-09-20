import React from 'react';

/**
 * 霓虹灯发光文字特效，使用的时候需要引用 neon.scss
 * @author zhongzhuhua
 */
export default class extends React.Component {
  render() {
    return <span className="gr-text-neon">{this.props.children}</span>;
  };
};
