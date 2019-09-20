import configs from 'configs';
import {
  uploadFileData
} from 'utils/network/CFNetwork';

// 百度编辑器默认配置
export const UeditorConfig = () => {
  let uploadParams = uploadFileData();
  let uploadParamsQuery = '';
  for (let key in uploadParams) {
    uploadParamsQuery += `&${key}=${encodeURIComponent(uploadParams[key])}`;
  }
  return `${configs.host}ueditor?${uploadParamsQuery}`;
};

export const IHomeIndex = 'index';
export const IUserAdd = 'user.add';
