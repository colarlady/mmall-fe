/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/3
 * Time: 11:14
 */


var _mm = require('util/mm.js');

var _cart = {

    //获取购物车中商品的数量
    getCartCount:function (resolve,reject) {
        _mm.request({
            url:_mm.getServerUrl("/cart/get_cart_product_count.do"),
            method:"post",
            success:resolve,
            error:reject
        });
    },

    //增加商品到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            method  : "post",
            success : resolve,
            error   : reject
        });
    },

    //获取购物车信息
    getCartList:function (resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            method  :"post",
            success : resolve,
            error   : reject
        });
    },

    //选中某个商品
    selectProduct:function (productId,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data:{
                productId:productId
            },
            method:"post",
            success : resolve,
            error   : reject
        });
    },
    //取消选中某个商品
    unselectProduct:function (productId,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data:{
                productId:productId
            },
            method:"post",
            success : resolve,
            error   : reject
        });
    },
    //全选中商品
    selectAllProduct:function (resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            method:"post",
            success : resolve,
            error   : reject
        });
    },
    //取消全选中商品
    unselectAllProduct:function (resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            method:"post",
            success : resolve,
            error   : reject
        });
    },
    //更新购物车商品数量
    updateProductCount:function (productInfo,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    :productInfo,
            method:"post",
            success : resolve,
            error   : reject
        });
    },
    //删除购物车商品
    deleteCartProduct:function (productIds,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    :{
                productIds:productIds
            },
            method:"post",
            success : resolve,
            error   : reject
        });
    },


}

module.exports = _cart;
 