/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/27
 * Time: 10:29
 */
var conf = {
    serverHost: "",
};
var Hogan = require('hogan.js');

var _mm = {
    //处理网络请求
    request: function (param) {
        var $this = this;
        $.ajax({
            type: param.method || "get",
            url: param.url || "",
            data: param.data || "",
            dataType: param.type || "json",  //预期服务器返回的数据类型
            success: function (res) {
                //请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //没有登录状态，需要强制登录
                else if (res.status == 10) {
                    $this.doLogin();
                }
                //请求参数有误
                else if (res.status == 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {

                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //转到登录页
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //转到首页
    goHome:function () {
        window.location.href = './index.string.html';
    },
    //获取服务器URL地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function (key) {
        var keyWordsStr = window.location.search.substr(1);
        var regExp = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
        var res = keyWordsStr.match(regExp);
        return res ? decodeURIComponent(res[2]) : null;
    },
    //渲染html模板
    renderHtml:function (htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    //成功提示
    successTips:function (msg) {
        alert(msg||"操作成功！");
    },
    //错误提示
    errorTips:function (msg) {
        alert(msg||"好像出错了");
    },
    //字段验证，非空，手机，邮箱
    validate:function (value,type) {
        //验证非空
        if('required'===type){
            return !!value;
        }
        //验证手机
        if('phone'===type){
            return /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/.test(value);
        }
        //验证邮箱
        if('email'==type){
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
    }
}

module.exports = _mm;
 