/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/30
 * Time: 9:54
 */


'use strict'


require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');
var navSide = require('../common/nav-side/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var template = require('./index.string');

var userCenterPage = {
    init:function () {
        this.onLoad();
    },
    onLoad:function () {

        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });

        //加载用户信息
       this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo:function () {
        _user.getUserInfo(function (res) {
            var result = _mm.renderHtml(template,res);

            //追加html
            $(".panel-body").html(result);
        },function (msg) {
            _mm.errorTips(msg);
        });
    }

};

$(function () {
    userCenterPage.init();
})




