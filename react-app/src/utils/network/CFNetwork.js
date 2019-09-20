import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';
import MD5 from 'crypto-js/md5';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import {
  JSEncrypt
} from 'jsencrypt';
import Network from './network';
import moment from 'moment';
import configs from 'configs';
const Site = configs.site;
if (Site == null) {
  console.log('请配置对应环境下的 index.js 中的 site 参数');
}

const aesPub = getAESKey();

// 厨房后台接口
export default new Network({
  processRequest,
  processResponse
});

/**
 * 渠道号 SHA1 加密
 * @param sellChannel
 * @param value 加密的字符串
 */
function encryptByChannel(sellChannel, value) {
  let key1 = MD5(sellChannel).toString(Hex);
  let key2 = HmacSHA1(value, key1).toString(Base64);
  return key2 || value;
};

/**
 * 加密
 * @param value 要加密的字符串
 * @param sellChannel 使用 appId 对密码做 sha1 加密，如果不需要则不加，一般是 Site.params.sellChannel
 * @param publicKey 如果不写，默认为配置数据传输相同的 publicKey
 * @param addTime 是否需要添加时间戳
 */
export function encrypt(value, sellChannel = false, addTime = true, publicKey = Site.publicKey) {
  if (sellChannel) {
    value = encryptByChannel(sellChannel, value);
  }

  if (addTime) {
    value = `${value}&CurTime=${new Date().valueOf()}`;
  }

  const Encrypts = new JSEncrypt();
  Encrypts.setPublicKey(publicKey);
  // return Encrypts.getKey().encrypt(value).toUpperCase();
  return Encrypts.encrypt(value);
};

// 上传文件请求参数
export function uploadFileData(data, cfg = {
  req: true
}) {
  return processRequest(data, cfg);
};

// 解密上传文件返回信息
export function decrypt(data) {
  return processResponse(data);
};

// 解密数据
function processResponse(data) {
  if (data) {
    if (typeof data == 'string') {
      const result = JSON.parse(decodeAES(data, aesPub));
      return result;
    } else {
      return data;
    }
  }

  return data;
};

// 加密请求参数
function processRequest(params, cfg) {
  const nowtime = new Date();
  const timestamp = nowtime.getTime();
  const dateString = moment(nowtime).format('YYYYMMDDHHmmSS');

  // 业务参数，使用AES加密
  let result = null;
  let requestData = null;
  let encodeKey = null;

  // 如果 ssoTicket 是方法，则转成字符串
  let SiteParams = Object.assign({}, Site.params);
  if (SiteParams && typeof SiteParams.ssoTicket == 'function') {
    SiteParams.ssoTicket = Site.params.ssoTicket();
  }

  // 加签
  if (cfg.req !== false) {
    requestData = encryptAES(JSON.stringify(Object.assign({}, params)), aesPub);
    encodeKey = encryptRSA(aesPub);
    result = Object.assign({}, SiteParams, {
      requestId: timestamp,
      timestamp: dateString,
      requestData,
      encodeKey
    });

    const sign = addSign(result);
    result.sign = sign;
  } else {
    result = Object.assign({}, SiteParams, params, {
      requestId: timestamp,
      timestamp: dateString
    });
  }

  return result;
};

// aes 数据解密
function decodeAES(value, aesPub) {
  let aeskey = CryptoJS.enc.Utf8.parse(aesPub);
  let decrypted = CryptoJS.AES.decrypt(value, aeskey, {
    iv: CryptoJS.enc.Utf8.parse('1234567812345678'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return CryptoJS.enc.Utf8.stringify(decrypted).trim();
};

// rsa 加密
function encryptRSA(value) {
  let encryptObj = new JSEncrypt();
  encryptObj.setPublicKey(Site.publicKey);
  return encryptObj.encrypt(value);
};

// aes 参数加密
function encryptAES(value, aesPub) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(aesPub), {
    iv: CryptoJS.enc.Utf8.parse('1234567812345678'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).ciphertext);
};

// 加签
function addSign(params) {
  let source = '';
  Object.keys(params).sort().forEach((key) => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      source += `${key}=${params[key]}, `;
    }
  });
  source = source.slice(0, -2);
  return CryptoJS.SHA256(`{${source}}`).toString(CryptoJS.enc.Hex);
};

// 随机生成16位的aeskey
function getAESKey() {
  let key = [];
  for (let i = 0; i < 16; i++) {
    let num = Math.floor(Math.random() * 26);
    let charStr = String.fromCharCode(97 + num);
    key.push(charStr.toUpperCase());
  }
  let result = key.join('');
  return result;
};
