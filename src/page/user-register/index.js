/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 16:37
 */
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

var register_page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;

        //校验用户名是否已存在
        $("#username").blur(function () {
            var username = $.trim($("#username").val());
            if(!username){
                return;
            }
            _user.checkUserName(username,function (res) {
                formError.hide();
            },function (err) {
                formError.show(err);
            });
        });

        //为注册按钮注册点击事件
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
            password:$.trim($("#password").val()),
            passwordConfirm:$.trim($("#passwordConfirm").val()),
            phone:$.trim($("#phone").val()),
            email:$.trim($("#email").val()),
            question:$.trim($("#question").val()),
            answer:$.trim($("#answer").val())
        };
        //表单验证结果
        var validateResult = this.validateForm(formData);

        //验证成功
        if(validateResult.status){
            _user.register(formData,function (res) {
                //成功
                window.location.href ='./result.html?type=register';
            },function (err) {
                console.log(err);
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

        if(formData.password.length<6){
            result.Msg="密码长度不能小于6位!";
            return result;
        }

        if(formData.password!=formData.passwordConfirm){
            result.Msg="两次输入的密码不一致!";
            return result;
        }

        if(!_mm.validate(formData.phone,'phone')){
            result.Msg="手机格式不正确!";
            return result;
        }

        if(!_mm.validate(formData.email,'email')){
            console.log(formData.email);
            result.Msg="邮箱格式不正确!";
            return result;
        }

        if(!_mm.validate(formData.question,'required')){
            console.log(formData.question);
            result.Msg="密码提示问题不能为空!";
            return result;
        }

        if(!_mm.validate(formData.answer,'required')){
            result.Msg="密码提示问题答案不能为空!";
            return result;
        }

        result.status = true;
        result.Msg = "验证成功";
        return result;
    }
}

$(function () {
    register_page.init();
})


