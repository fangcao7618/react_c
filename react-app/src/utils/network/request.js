import CryptoJS from 'crypto-js';

// 传参数据加密，必须是 json
export function encRequest(str) {
  if (!str) {
    str = {};
  }
  str = JSON.stringify(str);
  let result = CryptoJS.AES.encrypt(str, '12344321');
  return encodeURIComponent(result);
};

// URL 参数解密
export function decRequest(str) {
  if (!str) {
    return {};
  }
  try {
    str = decodeURIComponent(str);
    let result = CryptoJS.AES.decrypt(str, '12344321').toString(CryptoJS.enc.Utf8);
    return JSON.parse(result);
  } catch (e) {
    return {};
  }
};
