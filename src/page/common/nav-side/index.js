/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 8:59
 */

'use strict'

require('./index.css');
var template = require("./index.string");
var _mm = require("util/mm.js");

var navSide = {
    options:{
        name:'', //选中项
        navList:[
            {name:"user-center",des:"个人中心",href:"./user-center.html"},
            {name:"order-list",des:"我的订单",href:"./order-list.html"},
            {name:"pass-update",des:"修改密码",href:"./pass-update.html"},
            {name:"about",des:"关于MMALL",href:"./about.html"}
        ]

    },
    init:function (options) {
        //合并参数
        $.extend(this.options,options);

        this.renderNav();
    },
    //渲染导航栏
    renderNav:function () {
        //1.计算哪个属于active
        for(var i=0,iLength=this.options.navList.length;i<iLength;i++){
            if(this.options.navList[i].name==this.options.name){
                this.options.navList[i].isActive = true;
            }
        }
        //2.渲染数据
        var navHtml = _mm.renderHtml(template,{
            navList:this.options.navList
        });
        //3.将html追加到页面中
        $(".nav-side").html(navHtml);
    }
};

module.exports = navSide;
 