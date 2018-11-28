/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 7:53
 */

'use strict';
require('./index.css');

var _mm = require("util/mm.js");

// 头部搜索
var head ={
    init:function () {
        this.onLoad();
        this.bindEvent();
        return this;
    },
    //页面加载
    onLoad:function () {
        var keyWord = _mm.getUrlParam("keyword");
        //如果搜索值存在，则回填到input框内
        if(keyWord){
            $(".search-input").val(keyWord);
        }
    },
    bindEvent:function () {
        var $this = this;

        //为搜索按钮绑定点击事件
        $(".search-submit").click(function () {
            $this.searchSubmit();
        });

        //输入回车之后，提交
        $(".search-input").keyup(function (e) {
            // 13是回车键
            if(e.keyCode===13){
                $this.searchSubmit();
            }
        });
    },
    searchSubmit:function () {
        var val = $.trim($(".search-input").val());

        //如果点击搜索按钮提交，有keyword则跳转到指定的列表页
        if(val) {
            window.location.href = "./list.html?keyword=" +val;
        }else{
            //如果没有内容,则跳转到首页
            _mm.goHome();
        }
    }

}

head.init();


 