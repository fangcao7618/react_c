import './index.scss';
import WebUploader from 'webuploader';
import CFNetwork, {
  uploadFileData
} from 'utils/network/CFNetwork.js';
import api from 'configs';

// webuploader 辅助类，使用 create 创建 webuploader
export default {
  /**
   * 创建 webuploader
   * @param options 配置可以参照 webuploader，也可以参考注释的代码
   * @param interfaces 接口
      {
        upload: 上传
        check: 校验文件是否存在
        checkChunk: 校验分块文件
        merge: 合并文件
      }
   */
  create: (options, interfaces, host) => {
    host = host || api.host;
    if (interfaces == null) {
      if (!/\/$/.test(host)) {
        host = host + '/';
      }
      interfaces = {
        upload: host + 'file/upload',
        checkChunk: 'file/checkChunk',
        check: 'file/check',
        merge: 'file/mergeChunks'
      };
    }

    options = Object.assign({
      // 文件上传
      server: interfaces.upload,
      // 一旦有文件自动上传
      auto: true,
      // 是否分块
      chunked: true,
      // 每块文件大小
      chunkSize: 5 * 1024 * 1024,
      // 在上传当前文件时，准备好下一个文件
      prepareNextFile: true,
      // 可以重复上传
      duplicate: true,
      // [function] 上传前判断是否可以上传
      beforeFileQueued: null,
      // [function] 上传后执行事件
      uploaded: null,
      // 多文件上传
      multiple: false,
      // 应用场景
      scenario: null
      // 禁用拖拽功能
      // dnd: '#dndVideo',
      // 允许的格式
      // accept: {
      //   title: 'video',
      //   extensions: 'mp4',
      //   mimeTypes: 'audio/mp4, video/mp4'
      // },
      // 单个文件最大字节 100MB
      // fileSingleSizeLimit: 100 * 1024 * 1024,
      // 文件最大字节
      // fileSizeLimit: 1,
    }, options);
    options.pick = {
      id: options.pick,
      multiple: options.multiple
    };

    options.interfaces = interfaces;
    let uploader = WebUploader.create(options);
    bindWebuploadEvent(uploader, options.scenario);

    return uploader;
  }
};

// 创建一个 webuploader 用于自己操作事件
export function create(options) {
  return WebUploader.create(options);
};

// 绑定处理事件
function bindWebuploadEvent(uploader, scenario) {
  // 文件块开始上传，判断文件块是否需要执行上传
  uploader.on('uploadBeforeSend', (result, data) => {
    let deferred = WebUploader.Deferred();
    let fileMd5 = uploader.options['md5' + result.file.id];
    // 判断分块的文件是否已经上传过，如果上传过，则过滤掉不再上传
    uploader.md5File(result.file).then((value) => {
      fileMd5 = uploader.options['md5' + result.file.id];
      // 判断文件块
      CFNetwork.post({
        url: uploader.options.interfaces.checkChunk,
        data: {
          // 文件唯一表示
          fileMd5: value,
          // 当前分块下标
          chunk: result.chunk + '',
          // 当前分块大小
          chunkSize: result.end - result.start + ''
        }
      }).then((res) => {
        // 如果文件已经存在，则过滤
        if (res.data && res.data.ifExist == '1') {
          deferred.reject();
          return;
        }
        deferred.resolve();
      });
    });

    // 发送文件md5字符串到后台
    Object.assign(data, uploadFileData({
      fileMd5,
      chunk: result.chunk + ''
    }));

    return deferred.promise();
  });

  // 文件上传结束，通知合并分块
  uploader.on('uploadSuccess', (file) => {
    let name = file.name;
    let ext = name.substring(name.lastIndexOf('.') + 1);
    let fileMd5 = uploader.options['md5' + file.id];
    uploader.md5File(file).then((md5) => {
      CFNetwork.post({
        url: uploader.options.interfaces.merge,
        data: {
          fileMd5: fileMd5,
          ext,
          name,
          scenario
        }
      }).then((res) => {
        if (res.code == '000000') {
          if (res && res.data && res.data.fileId === 0) {
            res.data.fileId = new Date().getTime();
          }
        } else {
          res.code = '-1';
          res.msg = '上传出错，请检查后重新上传!';
        }
        uploader.options.uploaded && uploader.options.uploaded(res, file);
      });
    });
  });

  // 错误的处理
  uploader.on('error', (type) => {
    let msg = '上传出错，请检查后重新上传!';
    if (type == 'Q_TYPE_DENIED') {
      msg = '上传文件格式错误';
    } else if (type == 'Q_EXCEED_SIZE_LIMIT') {
      msg = '上传文件太大';
    } else if (type == 'F_EXCEED_SIZE') {
      msg = '上传文件太大';
    }

    uploader.options.uploaded && uploader.options.uploaded({
      code: -1,
      msg
    });
  });

  // 上传失败
  uploader.on('uploaderror', (e) => {
    uploader.options.uploaded && uploader.options.uploaded({
      code: -1,
      msg: '网络连接异常'
    });
  });

  // 多文件上传前判断
  uploader.on('beforeFileQueued', (file) => {
    let result = uploader.options.beforeFileQueued ? uploader.options.beforeFileQueued() : true;

    if (result) {
      let deferred = WebUploader.Deferred();
      if (file) {
        // 判断分块的文件是否已经上传过，如果上传过，则过滤掉不再上传
        uploader.md5File(file).then((fileMd5) => {
          uploader.options['md5' + file.id] = fileMd5;
          CFNetwork.post({
            url: uploader.options.interfaces.check,
            data: {
              fileMd5
            }
          }).then((res) => {
            // 如果文件已经存在，则过滤
            if (res.data && res.data.ifExist == '1') {
              uploader.skipFile(file);
              if (res.data.fileId === 0) {
                res.data.fileId = new Date().getTime();
              }
              uploader.options.uploaded && uploader.options.uploaded(res, file);
              return deferred.reject();
            }
            deferred.resolve();
          });
        });
      } else {
        deferred.resolve();
      }

      return deferred.promise();
    } else {
      return false;
    }
  });
};
