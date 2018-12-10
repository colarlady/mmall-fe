/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/27
 * Time: 19:23
 */


 'use strict'

require('./index.css');

var _mm = require("util/mm.js");
var _user = require("service/user-service");
var _cart = require("service/cart-service");


//导航
var nav = {
   init:function () {
     this.bindEvent();
     this.loadUserInfo();
     this.loadCartCount();
     return this;
   },
    bindEvent:function () {

       //为登录绑定点击事件
        $(".js-login").click(function () {
            _mm.doLogin();
        });

       //为注册绑定点击事件
        $(".js-register").click(function () {
            window.location.href = "./user-register.html";
        });

        //为退出绑定点击事件
        $(".js-logout").click(function () {
          _user.logOut(function (res) {
              window.location.reload();
          },function (msg) {
              _mm.errorTips(msg);
          });
        });
    },

    //加载用户信息
    loadUserInfo:function () {
      _user.checkLogin(function (res) {

          //如果用户已登录
          $(".user-info .no-login").hide().siblings(".user-info .login")
              .show().find(".username").text(res.username);

      },function (err) {
          //不处理
      })
    },

    //加载购物车信息
    loadCartCount:function () {
        _cart.getCartCount(function (res) {
            //设置购物车中的数量显示
            $(".cart-count").text(res||0);
        },function (err) {
            $(".cart-count").text(0);
        });
    }


};


module.exports = nav.init();
