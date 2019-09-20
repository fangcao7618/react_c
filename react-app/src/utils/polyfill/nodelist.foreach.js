// 为 doms 添加 forEach 循环
if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = forEach;
}

function forEach(callback, thisArg) {
  let T, k;
  if (this == null) {
    throw new TypeError(' this is null or not defined');
  }
  let O = Object(this);
  let len = O.length >>> 0;
  if ({}.toString.call(callback) != '[object Function]') {
    throw new TypeError(callback + ' is not a function');
  }
  if (thisArg) {
    T = thisArg;
  }
  k = 0;
  while (k < len) {
    let kValue;
    if (k in O) {
      kValue = O[k];
      callback.call(T, kValue, k, O);
    }
    k++;
  }
};
