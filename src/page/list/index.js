/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/1
 * Time: 15:22
 */

'use strict'


require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');
var navSide = require('../common/nav-side/index.js');

var _mm = require('util/mm.js');
var Pagination = require('util/pagination/index.js');
var _product = require('service/product-service.js');
var templateProduct = require('./index.string');

var listPage = {
    data:{
        listParam:{
            categoryId:_mm.getUrlParam("categoryId")||"",
            keyword:_mm.getUrlParam("keyword")||"",
            pageNum:_mm.getUrlParam("pageNum")||1,
            pageSize:_mm.getUrlParam("pageSize")||20,
            orderBy:_mm.getUrlParam("orderBy")||"default",
        }
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;
        $(".sort-item").click(function () {
            //判断点击的是默认排序还是价格排序
            if($(this).data("type")==="default"){   //jquery获取自定义属性的另一种方式 this.attr("data-type")
                //如果是默认排序
                if($(this).hasClass("active")){
                    return ;
                }else{
                    $(this).addClass("active").siblings(".sort-item").removeClass("active desc asc");
                   _this.data.listParam.orderBy = "default";
                }

            }else if($(this).data("type")==="price"){
                //如果是价格排序
                $(this).addClass("active").siblings(".sort-item").removeClass("active  desc asc");
                if(!$(this).hasClass("asc")){
                    $(this).addClass("asc").removeClass("desc");
                    _this.data.listParam.orderBy ="price_asc";
                }else{
                    $(this).addClass("desc").removeClass("asc");
                    _this.data.listParam.orderBy ="price_desc";
                }
            }
            //重新加载列表
            _this.loadList();
        });

    },
    onLoad:function () {
        this.loadList();
    },
    //加载商品信息
    loadList:function () {

        var _this = this;
        var listParam = this.data.listParam;
        var $pListCon = $(".p-list-con");
        _product.getProductList(listParam,function (res) {
            var product = _mm.renderHtml(templateProduct, {
                list: res.list
            });

            $pListCon.html(product);
            //加载分页信息
            _this.loadPagination({
                "prePage": res.prePage,
                "nextPage": res.nextPage,
                "hasPreviousPage": res.hasPreviousPage,
                "hasNextPage": res.hasNextPage,
                "pageNum": res.pageNum,
                "pages": res.pages
            });
        },function (err) {
            _mm.errorTips(err);
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
                _this.loadList();
            }
        }));
    }
};

$(function () {
    listPage.init();
})
 