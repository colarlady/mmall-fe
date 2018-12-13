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
var Pagination = require('util/pagination/index.js');
var template = require('./index.string');

var orderListPage = {
    data:{
        listParam:{
            pageNum:1,
            pageSize:1
        }
    },
    init:function () {
        this.onLoad();
    },
    onLoad:function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        //加载订单列表
        this.loadOrderList();
    },
    //加载订单
    loadOrderList:function () {
        //容器
        var $orderList = $(".order-list");
        //html
        var orderListHtml = "";
        var _this = this;
        $orderList.html("<div class='loading'></div>")

        order.getOrderList(_this.data.listParam,function (res) {
            orderListHtml = _mm.renderHtml(template,res);
            //渲染页面
            $orderList.html(orderListHtml);
            //加载分页信息
            _this.loadPagination({
                "prePage": res.prePage,
                "nextPage": res.nextPage,
                "hasPreviousPage": res.hasPreviousPage,
                "hasNextPage": res.hasNextPage,
                "pageNum": res.pageNum,
                "pages": res.pages
            });
        },function (errMsg) {
            $orderList.html("<p class='err-tips'>加载订单失败，请刷新后重试</p>")
        });
    },
    //加载分页信息
    loadPagination:function (pageInfo) {
        var _this = this;
        this.pagination ? "":this.pagination = new Pagination();
        this.pagination.render($.extend({},pageInfo,{
            container:$(".pagination"),
            onSelectPage:function (pageNum) {
                _this.data.listParam.pageNum =pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function () {
    orderListPage.init();
})




