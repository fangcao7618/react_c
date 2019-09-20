import ImageDefault from './default.png';

// 处理图片 url，还有 http: https: ftp: data: 开头的返回原值，其他的自动加上 data:image/png;base64,
export function ImageUrl(src) {
  let index = src ? src.indexOf(':') : -1;
  if (index > -1 && index < 6) {
    return src;
  }
  return `data:image/png;base64,${src}`;
};

// 图片加载失败之后处理
export function ImageOnError(e) {
  e.target.src = ImageDefault;
};
