/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/11
 * Time: 17:35
 */

'use strict'

require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');

var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var productTemplate = require('./product-list.string');
var addressTemplate = require('./address-list.string');
var addressModal = require('./address-modal.js');


var orderPage = {
    data: {
        selectedAddressId:null
    },
    init: function () {
        this.load();
        this.bindEvent();
    },
    load: function () {
        this.loadAddressInfo();
        this.loadProductInfo();
    },
    //绑定事件
    bindEvent: function () {
        var _this = this;
        //地址的选中
        $(document).on("click", '.address-item', function () {
            $(this).addClass("active").siblings(".address-item").removeClass("active");
            //将选中的地址缓存
            _this.data.selectedAddressId = $(this).data("id");
        });

        //商品的结算
        $(document).on("click", '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId:shippingId
                },function (res) {
                    window.location.href = "./payment.html?orderId="+res.orderNo;
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips("请先选择地址!");
            }
        });
        //添加新地址
        $(document).on("click", '.address-add', function () {
            addressModal.show({
                isUpdate:false,
                onSuccess:function () {
                    _this.loadAddressInfo();
                }
            });
        });

        //编辑地址
        $(document).on("click", '.address-edit', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents(".address-item").data("id");
            //获取地址信息进行回填
            _address.getSelectAddress(shippingId,function (res) {
                //显示地址编辑框
               addressModal.show({
                    isUpdate:true,
                    data:res,
                    onSuccess:function () {
                        _this.loadAddressInfo();
                    }
                });
            },function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });

        //删除地址
        $(document).on("click", '.address-delete', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents(".address-item").data("id");
            _address.deleteAddress(shippingId,function (res) {
                _this.loadAddressInfo();
            },function (errMsg) {
              _mm.errorTips(errMsg);
            });
        });
    },
    //加载地址信息
    loadAddressInfo: function () {
        var _this = this;
        $(".address-list").html('<div class="loading"></div>');
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressHtml = _mm.renderHtml(addressTemplate,res);
            $(".address-list").html(addressHtml);
        }, function (errMsg) {
            $(".address-list").html("<p class='err-tips'>地址加载失败,请刷新后重试</p>");
        });
    },
    //加载商品信息
    loadProductInfo:function () {
        $(".product-list").html('<div class="loading"></div>');
        _order.getProductList(function (res) {
            var productHtml = _mm.renderHtml(productTemplate,res);
            $(".product-list").html(productHtml);
        }, function (errMsg) {
            $(".product-list").html("<p class='err-tips'>商品信息加载失败,请刷新后重试</p>");
        });
    },
    //处理地址列表中的选中状态
    addressFilter:function (res) {

        if(this.data.selectedAddressId){
            var selectedAddressFlag = false;
            for (var i=0,iLength=res.list.length;i<iLength;i++){
                if(res.list[i].id===this.data.selectedAddressId){
                    res.list[i].isActive = true;
                    selectedAddressFlag = true;
                }
            }
            //如果地址列表中不存在默认地址项
            if(!selectedAddressFlag){
                this.data.selectedAddressId = null;
            }
        }
    }
};

$(function () {
    orderPage.init();
})
