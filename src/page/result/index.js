/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/28
 * Time: 10:42
 */
 'use strict';


 require('./index.css');
 require('../common/nav-simple/index');
 var _mm = require('util/mm.js');
 
 $(function () {
     var type = _mm.getUrlParam("type")||'default';
     var $element = $("."+type+"-"+"success");
     if(type==="payment"){
        var $orderNum =  $element.find(".order-number");
         $orderNum.attr("href",$orderNum.attr("href")+_mm.request("orderNumber"));
     }
     //显示对应的操作提示元素
     $element.show();
 });