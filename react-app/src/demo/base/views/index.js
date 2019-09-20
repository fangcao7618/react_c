/**
 * 总入口页
 * @author zhongzhuhua
 */
import './index.scss';
import $ from 'jquery';

import configs from 'configs';
console.log('Project run success!', configs);

import {
  IHomeIndex,
  IUserAdd
} from 'views/interface';

class Main {
  constructor() {
    console.log('constructor');

    $.ajax({
      url: configs.host + IHomeIndex,
      success: (res) => {
        console.log(res);
      }
    });
  };
};

new Main();
