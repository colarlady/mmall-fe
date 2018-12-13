/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/12
 * Time: 17:44
 */
/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/30
 * Time: 9:54
 */


'use strict'


require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');
var navSide = require('../common/nav-side/index.js');


var _mm = require('util/mm.js');
var order = require('service/order-service.js');
var template = require('./index.string');

var orderDeatilPage = {
    data: {
        orderNo: _mm.getUrlParam("orderNumber")
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        //加载订单详情
        this.loadOrderDetail();
    },
    //绑定事件
    bindEvent: function () {
        var _this = this;
        //取消订单按钮绑定事件
        $(document).on("click", ".cancle-order", function () {
            if (window.confirm("确定要取消该订单么？")) {
                order.cancelOrder(_this.data.orderNo, function (res) {
                    _mm.errorTips("该订单取消成功");
                    _this.loadOrderDetail();
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        });

    },
    //加载订单详情
    loadOrderDetail: function () {
        //容器
        var $content = $(".content");
        //html
        var orderDetailHtml = "";
        var _this = this;
        $content.html("<div class='loading'></div>")

        order.getOrderDetail(_this.data.orderNo, function (res) {
            _this.filterData(res);
            orderDetailHtml = _mm.renderHtml(template, res);
            //渲染页面
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html("<p class='err-tips'>" + errMsg + "</p>")
        });
    },
    //对数据进行处理
    filterData: function (data) {
        data.goToPay = data.status == 10;
        data.cancleOrder = data.status == 10;
    }
};

$(function () {
    orderDeatilPage.init();
})




