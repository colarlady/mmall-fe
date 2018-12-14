/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/14
 * Time: 8:48
 */

var _mm = require('util/mm.js');

var _payment = {

    //获取支付信息
    getOrderDetail:function (orderNo,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/pay.do"),
            data:{
                orderNo:orderNo
            },
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //获取订单状态
    getOrderStatus:function (orderNo,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/order/query_order_pay_status.do"),
            data:{
                orderNo:orderNo
            },
            method:"post",
            success:resolve,
            error:reject
        });
    }

}

module.exports = _payment;

 