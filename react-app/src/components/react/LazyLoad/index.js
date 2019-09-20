import React from 'react';

/**
 *react router 按需加载组件
 * eg:
    import Login from 'bundle-loader?lazy&name=login!views/login/index';
    <Route path="/login" component={LazyLoadComponent(Login)}
 */
class LazyLoad extends React.Component {
  state = {
    mod: null
  };

  componentWillMount() {
    this.load(this.props);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  };

  load(props) {
    this.setState({
      mod: null
    });

    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  };

  render() {
    if (!this.state.mod)
      return false;
    return this.props.children(this.state.mod);
  };
};

function LazyLoadComponent(lazyModule) {
  return (props) => (
    <LazyLoad load={lazyModule}>
      {(Container) => <Container {...props} />}
    </LazyLoad>
  );
};

export default LazyLoadComponent;
