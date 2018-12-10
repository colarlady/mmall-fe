/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/10
 * Time: 9:11
 */

'use strict'

require("./index.css");
require('../common/nav-simple/index.js');
var nav = require('../common/nav/index.js');
require('../common/head/index.js');

var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var cartPage = {
    data: {},
    init: function () {
        this.load();
        this.bindEvent();
    },
    load: function () {

        this.loadCart();
    },
    //绑定事件
    bindEvent: function () {
        var _this = this;

        // 商品的选择 / 取消选择
        $(document).on("click", '.select', function () {
            var $this = $(this);
            var productId = $this.parents(".cart-table").data("product-id");

            //选中处理
            if ($this.is(":checked")) {

                _cart.selectProduct(productId, function (res) {
                    _this.renderHtml(res);
                }, function (errMsg) {
                    _this.showCartError();
                });

            } else {

                //取消选中处理
                _cart.unselectProduct(productId, function (res) {
                    _this.renderHtml(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });

        //商品的全选 /取消全选
        $(document).on("click", '.select-all', function () {
            var $this = $(this);
            //全选中处理
            if ($this.is(":checked")) {

                _cart.selectAllProduct(function (res) {
                    _this.renderHtml(res);
                }, function (errMsg) {
                    _this.showCartError();
                });

            } else {

                //取消全选中处理
                _cart.unselectAllProduct(function (res) {
                    _this.renderHtml(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });

        //商品数量的变化
        $(document).on("click", '.count-btn', function () {
            var $this = $(this);
            var $pCount = $(this).siblings(".count-input");
            var currentCount = parseInt($pCount.val());  //当前值
            var minCount = 1;  //最小值
            var maxCount = parseInt($pCount.data("max"));  //最大值
            var productId = $(this).parents(".cart-table").data("product-id");  //productId
            var type = $(this).hasClass("plus") ? "plus" : "minus";  //加减类型
            var newCount = 0;
            if (type === "plus") {
                //增加数量
                if (currentCount >= maxCount) {
                    //达到上限
                    _mm.errorTips("商品数量已经达到上限");
                    return;
                }
                newCount = currentCount + 1;
            } else {

                // 减少数量
                if (currentCount <= minCount) {
                    return;
                }
                newCount = currentCount - 1;
            }

            //向后台发送请求修改商品数量
            _cart.updateProductCount({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderHtml(res);
            }, function (errMsg) {
                _this.showCartError();
            });

        });

        //删除单个商品
        $(document).on("click", '.cell-opera', function () {
            //删除
            if (window.confirm("确认删除该商品？")) {
                var productId = $(this).parents(".cart-table").data("product-id");
                _this.deleteCartProduct(productId);
            }
        });

        //删除选中
        $(document).on("click", '.delete-select', function () {
            var arrProductIds = []; //记录需要删除的产品ID
            var $selectItem = $(".select:checked");

            //循环选中项查找productId
            for (var i = 0; i < $selectItem.length; i++) {
                arrProductIds.push($($selectItem[i]).parents(".cart-table").data("product-id"));
            }
            console.log(arrProductIds);
            if (arrProductIds.length) {
                _this.deleteCartProduct(arrProductIds.join(","));
            } else {
                _mm.errorTips("您还没有选中要删除的商品");
            }
        });

        //结算
        $(document).on("click", '.btn-submit', function () {

            //总价大于0c才允许提交
            if(_this.data.cartInfo &&_this.data.cartInfo.cartTotalPrice>0){
                window.location.href = "./confirm.html";
            }else{
                _mm.errorTips("请选择商品后再提交");
            }
        });
    },
    //加载购物车信息
    loadCart: function () {
        var _this = this;
        var $pageWrap = $(".page-wrap");

        _cart.getCartList(function (res) {
            //渲染页面
            _this.renderHtml(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    renderHtml: function (data) {
        this.filter(data);
        //将查询信息缓存到data中,方便结算的时候验证数据
        this.data.cartInfo = data;
        var carthtml = _mm.renderHtml(templateIndex, data);
        $(".page-wrap").html(carthtml);

        //通知购物车数量刷新
        nav.loadCartCount();
    },
    filter: function (data) {
        data.noEmpty = data.cartProductVoList.length;
    },
    //调用接口失败时显示错误信息
    showCartError: function () {
        $pageWrap.html("<p class='err-tip'>哪里不对了，刷新试试看吧。</p>");
    },
    //删除商品,可以传入多个productId,使用,隔开
    deleteCartProduct: function (productIds) {
        console.log(productIds);
        var _this = this;
        _cart.deleteCartProduct(productIds, function (res) {
            _this.renderHtml(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    }
};


$(function () {
    cartPage.init();
})


 