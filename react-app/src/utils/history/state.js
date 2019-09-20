// 拦截 history 路由变更方法
(function(history) {
  let pushState = history.pushState;
  history.pushState = function(state) {
    if (typeof history.onpushstate == 'function') {
      history.onpushstate({
        state: state
      });
    }
    return pushState.apply(history, arguments);
  };
})(window.history);
