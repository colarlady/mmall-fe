/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 15:09
 */

var _mm = require('util/mm.js');

var _user = {

    //登录接口
    login:function (userInfo,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/user/login.do"),
            method:"post",
            data:userInfo,
            success:resolve,
            error:reject
        });
    },
    //校验用户名是否存在接口
    checkUserName:function (username,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/user/check_valid.do?"),
            method:"post",
            data:{
                str:username,
                type:"username"
            },
            type:"json",
            success:resolve,
            error:reject
        });
    },
    //用户注册
    register:function (userInfo,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/user/register.do"),
            method:"post",
            data:userInfo,
            type:"json",
            success:resolve,
            error:reject
        });
    },
    //退出登录
    logOut:function (resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/user/logout.do"),
            method:"post",
            type:"json",
            success:resolve,
            error:reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户密码提示问题
    getQuestion:function (username,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data:{
                username:username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查用户输入的答案是否正确
    checkAnswer:function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data:{
                username:data.username,
                question:data.question,
                answer:data.answer
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //重置密码
    resetPassword:function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data:data,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取用户信息
    getUserInfo:function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新用户信息
    updateInfomation:function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            data:data,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新用户密码
    updatePassWord:function (data,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            data:data,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },

}

module.exports = _user;
 