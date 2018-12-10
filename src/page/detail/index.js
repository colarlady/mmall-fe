/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/3
 * Time: 11:14
 */

'use strict'

require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var detailPage = {
    data: {
        productId: _mm.getUrlParam("productId") || "",
    },
    init: function () {
        this.load();
        this.bindEvent();
    },
    load: function () {
        //如果没有传递productId跳转到首页
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    //绑定事件
    bindEvent: function () {
        var _this = this;

        //图片预览
        $(document).on("mouseenter", '.sub-img', function () {
            var imgSrc = $(this).attr("src");
            $(".main-img").attr("src", imgSrc);
        });

        //增减数量
        $(document).on("click", '.count-btn', function () {
            //先判断是增还是减
            var type = $(this).hasClass("plus") ? "plus" : "minus";
            var $item = $(".item-count");
            var currentCount = parseInt($item.val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock || 1;
            if (type === "plus") {
                $item.val(currentCount < maxCount ? currentCount + 1 : maxCount);
            } else {
                $item.val(currentCount > minCount ? currentCount - 1 : minCount);
            }
        });

        //加入购物车
        $(document).on("click", '.addToCart', function () {
            _cart.addToCart({
                productId:_this.data.productId,
                count:$(".item-count").val()
            },function (res) {
                window.location.href = "./result.html?type=cart-add";
            },function (errMsg) {
                console.log(errMsg);
                _mm.errorTips(errMsg);
            });
        });


    },
    //加载商品详情页
    loadDetail: function () {
        var _this = this;
        var $pageWrap = $(".page-wrap");
        _product.getDetail(_this.data.productId, function (res) {
            _this.data.detailInfo = res;
            _this.filter(res);
            var detailHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(detailHtml);
        }, function (msg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
    filter: function (data) {
        data.subImages = data.subImages.split(",");
    }
};

$(function () {
    detailPage.init();
})

