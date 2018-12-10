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

//表单中错误提示
var formError = {
    show:function (msg) {
        $(".error-item").show().find(".err-msg").text(msg);
    },
    hide:function () {
        $(".error-item").hide().find(".err-msg").text('');
    }
};

var userCenterPageUpdate = {
    init:function () {
        this.onLoad();
        this.bindEvent();
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
            $(".panel-body").html(result);
        },function (msg) {

        });
    },
    //绑定事件
    bindEvent:function () {
        var _this = this;

        $("body").on("click",".btn-submit",function () {

            var dataInfo = {
                email:$.trim($("#email").val()),
                phone:$.trim($("#phone").val()),
                question:$.trim($("#question").val()),
                answer:$.trim($("#anwser").val())
            };

            var validateResult =_this.validateForm(dataInfo);

            if(validateResult){
                _user.updateInfomation(dataInfo,function (res) {
                    _mm.successTips(res.msg);
                    window.location.href='./user-center.html';
                },function (err) {
                    _mm.errorTips(err);
                });

            }else{
                formError.show(validateResult.Msg);
            }
        });
    },
    validateForm:function (formData) {
        var result = {
            status:false,
            Msg:''
        };

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


};

$(function () {
    userCenterPageUpdate.init();
})





 