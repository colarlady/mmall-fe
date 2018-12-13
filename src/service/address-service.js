/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/3
 * Time: 11:14
 */


var _mm = require('util/mm.js');

var _address = {

    //获取地址列表
    getAddressList:function (resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/shipping/list.do"),
            data:{
                pageNum:1,
                pageSize:50
            },
            method:"post",
            success:resolve,
            error:reject
        });
    },

    //新增地址
    addNewAddress:function (data,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/shipping/add.do"),
            data:data,
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //删除地址
    deleteAddress:function (shippingId,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/shipping/del.do"),
            data:{
                shippingId:shippingId
            },
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //保存编辑后的地址
    updateAddress:function(data,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl("/shipping/update.do"),
            data:data,
            method:"post",
            success:resolve,
            error:reject
        });
    },
    //获取选中的地址信息
    getSelectAddress:function (shippingId,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/shipping/select.do"),
            data:{
                shippingId:shippingId
            },
            method:"post",
            success:resolve,
            error:reject
        });
    }

}

module.exports = _address;
 