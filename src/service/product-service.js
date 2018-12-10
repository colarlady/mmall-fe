/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 15:09
 */

var _mm = require('util/mm.js');

var _product = {

    //获取产品接口
    getProductList:function (data,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/product/list.do"),
            method:"post",
            data:data,
            success:resolve,
            error:reject
        });
    },
    
    //获取商品详情接口
    getDetail:function (productId,resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/product/detail.do?"),
            method:"post",
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        });
    }

}

module.exports = _product;

 