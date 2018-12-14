/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/14
 * Time: 8:45
 */

/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/12
 * Time: 17:44
 */



'use strict'

require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');

var _mm = require('util/mm.js');
var order = require('service/order-service.js');
var payment = require('service/payment-service.js');
var template = require('./index.string');

var paymentPage = {
    data: {
        orderNo: _mm.getUrlParam("orderNumber")
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //加载支付信息
        this.loadPaymentInfo();
    },
    //加载支付信息
    loadPaymentInfo: function () {

        //容器
        var $pageWrap = $(".page-wrap");
        //html
        var orderPaymentHtml = "";
        var _this = this;
        $pageWrap.html("<div class='loading'></div>")
        payment.getOrderDetail(_this.data.orderNo, function (res) {
            orderPaymentHtml = _mm.renderHtml(template, res);
            //渲染页面
            $pageWrap.html(orderPaymentHtml);
            //轮询监听订单状态
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html("<p class='err-tips'>" + errMsg + "</p>")
        });
    },
    listenOrderStatus:function () {

        payment.getOrderStatus(_this.data.orderNo, function (res) {
            window.location.href = "./result.html?type=payment&orderNumber="+_this.data.orderNo;
        }, function (errMsg) {

        });
    }
};

$(function () {
    paymentPage.init();
})





 