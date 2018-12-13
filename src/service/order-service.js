/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/3
 * Time: 11:14
 */


var _mm = require('util/mm.js');

var _order = {

    //获取商品列表
    getProductList:function (resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/get_order_cart_product.do"),
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //生成订单
    createOrder:function (selectAddress,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/create.do"),
            data:selectAddress,
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //获取订单列表
    getOrderList:function (listParam,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/list.do"),
            data:listParam,
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //获取订单详情
    getOrderDetail:function (orderNo,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/detail.do"),
            data:{
                orderNo:orderNo
            },
            method:"post",
            success:resolve,
            error:reject
        });
    },

    //取消订单
    cancelOrder:function (orderNo,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/cancel.do"),
            data:{
                orderNo:orderNo
            },
            method:"post",
            success:resolve,
            error:reject
        });
    }

}

module.exports = _order;
 