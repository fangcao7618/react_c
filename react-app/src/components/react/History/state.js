import 'utils/history/state';

/**
 * state 工具类，用于监测 url 改变，这个方法是有 100ms 延时的
 * @param [function] callback 改变 url 的时候，执行的方法
 */
export default (callback) => {
  history.onpushstate = () => {
    run(callback);
  };
  window.addEventListener('popstate', () => {
    run(callback);
  });
};

function run(callback) {
  if (callback) {
    setTimeout(() => {
      callback(location.href);
    }, 100);
  }
};
