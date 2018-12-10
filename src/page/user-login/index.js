/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 13:34
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

var login_page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;

        //为登录按钮注册点击事件
        $("#submit").click(function () {
            _this.submit();
        });

        //回车键也自动提交
        $(".user-content").keyup(function (e) {
            if(e.keyCode==13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit:function () {

        var formData = {
            username:$.trim($("#username").val()),
            password:$.trim($("#password").val())
        };

        //表单验证结果
        var validateResult = this.validateForm(formData);

        //验证成功
        if(validateResult.status){
            _user.login(formData,function (res) {
                //成功
                window.location.href =_mm.getUrlParam("redirect")||'./index.html';
            },function (err) {
                //失败
                formError.show(err);
            })
        }
        //验证失败
        else{
            formError.show(validateResult.Msg);
        }
    },
    validateForm:function (formData) {
        var result = {
            status:false,
            Msg:''
        };
        if(!_mm.validate(formData.username,"required")){
            result.Msg="用户名不能为空!";
            return result;
        }

        if(!_mm.validate(formData.password,"required")){
            result.Msg="密码不能为空!";
            return result;
        }

        result.status = true;
        result.Msg = "验证成功";
        return result;
    }
}

$(function () {
    login_page.init();
})


