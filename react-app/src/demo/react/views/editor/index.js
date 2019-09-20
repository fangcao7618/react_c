import assets from './index.scss';
import React from 'react';
import {
  Button
} from 'antd';

/**
 * 百度编辑器 demo
 * @author zhongzhuhua
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('Hello UEditor!');
    console.log('当前音视频配置', global.UEdtiorConfigsMyPlugin);

    // global.UEdtiorConfigsMyPlugin.image = 'video';
    // global.UEdtiorConfigsMyPlugin.video = 'embed';
    let editor = UE.getEditor('container');
    // editor.ready(() => {
    //   UE.getEditor('container').setContent('<p><video class="video-js" controls="" preload="none" style=" width:420px; height:280px;" src="http://10.119.120.146:9009/aaa.mp4"></video><video class="video-js" controls="" preload="none" style=" width:420px; height:280px;" src="http://10.119.120.146:9009/aaa.mp4"></video><video class="video-js" controls="" preload="none" style=" width:420px; height:280px;" src="http://10.119.120.146:9009/aaa.mp4"></video></p>');
    //   UE.getEditor('container').setContent('<p><embed class="video-js" controls="" preload="none" style=" width:420px; height:280px;" src="http://10.119.120.146:9009/aaa.mp4" /><embed class="video-js" controls="" preload="none" style=" width:420px; height:280px;" src="http://10.119.120.146:9009/aaa.mp4" /><embed class="video-js" controls="" preload="none" style=" width:420px; height:280px;" src="http://10.119.120.146:9009/aaa.mp4" /></p>');
    // });
    // UE.getEditor('container', {
    //   iframeUrlMap: {
    //     'insertvideo': '/static/index.html'
    //   }
    // });
    // UEdtiorConfigsMyPlugin = {
    //   image: 'image'|'embed'|'video',
    //   embed: 'image'|'embed'|'video',
    //   video: 'image'|'embed'|'video',
    //   // 可以使用的后缀
    //   ext: ['mp3', 'mp4']
    // };
  };

  change = () => {
    global.UEdtiorConfigsMyPlugin.image = 'embed';
    global.UEdtiorConfigsMyPlugin.video = 'embed';
    console.log('修改后音视频配置', global.UEdtiorConfigsMyPlugin);
  };

  render() {
    return (
      <React.Fragment>
        <div>百度编辑器 demo</div>
        <div>百度编辑器的配置可以在 index.html 中引用对应环境的配置模板，也可以根据 env 直接写脚本</div>
        <div>window.UEDITOR_CONFIG.serverUrl action=config 返回配置文件，根据配置文件中的返回值，对应配置上传接口等</div>
        <div className={assets.button}>
          <Button onClick={this.change}>切换上传音视频配置，切换后切换重新上传看看效果</Button>
        </div>
        <div>UEdtiorConfigsMyPlugin 配置项参考 src/libs/ueditor/README.md</div>
        <div>百度编辑器目前 video 有一个 bug，就是删除的时候，有时候会删除不了，建议使用 embed</div>
        <div id="container" className={assets.main}></div>
      </React.Fragment>
    );
  };
};
