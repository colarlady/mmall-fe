/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/29
 * Time: 10:52
 */

'use strict'
require('./index.css');
require('../common/nav-simple/index');

var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单中错误提示
var formError = {
    show:function (msg) {
        $(".error-item").show().find(".err-msg").text(msg);
    },
    hide:function () {
        $(".error-item").hide().find(".err-msg").text('');
    }
};

var passReset_page = {
    data:{
      username:"",
      question:"",
      answer:"",
      forgetToken:""
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        this.onLoadStepUserName();
    },
    bindEvent:function () {
        var _this = this;

        //为用户名填写下一步按钮注册点击事件
        $("#submit-username").click(function () {

            //获取用户输入的用户名
            var $username = $.trim($("#username").val());
            if($username){
                //如果输入的用户名不为空
                _user.getQuestion($username,function (res) {

                    _this.data.username = $username;
                    _this.data.question =res;
                    _this.onLoadStepQuestion();
                },function (msg) {
                    formError.show(msg);
                });
            }else{
                //如果输入的用户名为空
                formError.show("用户名不能为空");
            }
        });


        //为密码提示问题填写下一步按钮注册点击事件
        $("#submit-question").click(function () {
            //获取用户输入的密码提示问题答案
            var $anwser = $.trim($("#anwser").val());

            if($anwser){
                _this.data.answer = $anwser;

                //如果输入的密码提示问题答案不为空
                _user.checkAnswer(_this.data,function (res) {
                    _this.data.forgetToken =res;
                    _this.onLoadStepNewPassword();
                },function (msg) {
                    formError.show(msg);
                });

            }else{
                //如果用户输入的密码提示问题答案为空
                formError.show("请输入密码提示问题答案");
            }
        });

        //为新密码填写下一步按钮注册点击事件
        $("#submit-password").click(function () {

            //获取用户输入的新密码
            var $passwordNew = $.trim($("#passwordNew").val());

            if($passwordNew && $passwordNew.length>=6){
                //如果输入的新密码符合要求
                _user.resetPassword({
                    username:_this.data.username,
                    passwordNew:$passwordNew,
                    forgetToken:_this.data.forgetToken
                },function (res) {
                   window.location.href="./result.html?type=pass-reset";
                },function (msg) {
                    formError.show(msg);
                });

            }else{
                //如果输入的新密码少于6位
                formError.show("请输入不少于6位的新密码");
            }
        });

    },
    //第一步输入用户名
    onLoadStepUserName:function () {
        $(".step-username").show();
    },
    //第二步输入提示问题答案
    onLoadStepQuestion:function () {
        //隐藏错误提示
        $(".error-item").hide();
        //显示提示问题信息
        $(".step-username").hide().siblings(".step-question").show().find(".question").text(this.data.question);

    },
    //第三步输入新密码
    onLoadStepNewPassword:function () {

        //隐藏错误提示
        $(".error-item").hide();
        //显示提示问题信息
        $(".step-question").hide().siblings(".step-password").show();
    }
}


$(function () {
    passReset_page.init();
})
 