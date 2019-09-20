// ios 物理返回识别不了 history state
let u = navigator.userAgent;
if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
  window.addEventListener('popstate', (e) => {
    window.location.href = location.href;
  });
}
