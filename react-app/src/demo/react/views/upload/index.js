import assets from './index.scss';
import React from 'react';
import WebUploader, {
  create as WebUploaderCreate
} from 'utils/webuploador';
import {
  ImageUrl,
  ImageOnError
} from 'utils/image';
import api from 'configs';
import {
  message
} from 'antd';

/**
 * webuploder demo
 * @author zhongzhuhua
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    img: null,
    files: [],
    filesMe: []
  };

  componentDidMount() {
    console.log('Home WebUploador!');

    setTimeout(() => {
      WebUploader.create({
        pick: '#upload',
        uploaded: (res) => {
          console.log(res);
          if (res.code == '000000') {
            this.setState({
              img: res.data.path
            });
          }
        }
      });
    }, 100);

    setTimeout(() => {
      WebUploader.create({
        pick: '#mupload',
        multiple: true,
        uploaded: (res, file) => {
          if (res.code == '000000') {
            this.state.files.push({
              path: res.data.path,
              name: file.name
            });
            this.setState({});
          }
        }
      });
    }, 100);

    setTimeout(() => {
      this.uploader = WebUploaderCreate({
        disableGlobalDnd: true,
        auto: true,
        dnd: '#uupload',
        paste: document.body,
        duplicate: true,
        server: api.host + 'file/upload',
        chunked: true,
        chunkSize: 5 * 1024 * 1024,
        pick: {
          id: '#uupload',
          multiple: true
        },
        chunked: true
      });

      // 文件开始上传
      this.uploader.on('startUpload', () => {
        console.log('startUpload', this.uploader.getFiles());
        let files = this.uploader.getFiles();
        let isUpload = false;

        if (files && files.length > 1) {
          message.error('请勿上传多个文件');
        } else if (files[0].ext == 'doc' || files[0].ext == 'docx') {
          message.error('请勿上传 word 文件');
        } else {
          isUpload = true;
        }

        if (!isUpload) {
          this.uploader.stop();
          this.uploader.reset();
        }
      });

      // 分块上传成功之后，通知合并
      this.uploader.on('uploadSuccess', (file) => {
        console.log('uploadSuccess');
      });

      this.uploader.on('uploadComplete', (file) => {
        this.uploader.reset();
      });
    }, 100);
  };

  render() {
    let {
      files,
      filesMe
    } = this.state;

    return (
      <React.Fragment>
        <div>webuploader同一个页面创建多个实例的时候，需要使用 setTimeout 延迟 100ms 来创建</div>
        <div><span id="upload">直接绑定上传</span></div>
        <img src={ImageUrl(this.state.img)} className={assets.img} onError={ImageOnError} />
        <br />
        <br />
        <div><span id="mupload">多文件上传</span></div>
        {files && files.map((item) => <div>{item.name} {item.path}</div>)}
        <br />
        <br />
        <div><span id="uupload">自定义上传</span></div>
        {filesMe && filesMe.map((item) => <div>{item.name} {item.path}</div>)}
      </React.Fragment>
    );
  };
};
