/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/30
 * Time: 16:27
 */



'use strict'


require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');
var navSide = require('../common/nav-side/index.js');


var _mm = require('util/mm.js');
var _user = require('service/user-service.js');




var userCenterPassUpdate = {
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    //绑定事件
    bindEvent:function () {

        var _this = this;

        $("body").on("click",".btn-submit",function () {

            var dataInfo = {
                passwordOld:$.trim($("#passWordOld").val()),
                passwordNew:$.trim($("#passWordNew").val()),
                passwordConfirm:$.trim($("#passWordConfirm").val())
            };

            var validateResult =_this.validateForm(dataInfo);

            console.log(dataInfo);
            if(validateResult.status){

                _user.updatePassWord({
                    passwordOld:$.trim($("#passWordOld").val()),
                    passwordNew:$.trim($("#passWordNew").val()),
                },function (res) {
                    _mm.successTips(res);
                },function (err) {
                    _mm.errorTips(err);
                });

            }else{
                _mm.errorTips(validateResult.Msg);
            }
        });
    },
    validateForm:function (formData) {
        var result = {
            status:false,
            Msg:''
        };

        if(!_mm.validate(formData.passwordOld,'required')){
            console.log(formData.question);
            result.Msg="原始密码不能为空!";
            return result;
        }

        if(!formData.passwordNew||formData.passwordNew.length<6){
            result.Msg="新密码不能少于6位!";
            return result;
        }

        if(formData.passwordNew!=formData.passwordConfirm){
            result.Msg="两次输入的密码不一致！";
            return result;
        }

        result.status = true;
        result.Msg = "验证成功";
        return result;
    }


};

$(function () {
    userCenterPassUpdate.init();
})





