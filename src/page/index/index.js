/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/26
 * Time: 8:34
 */
'use strict'

require("./index.css");
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/head/index.js');
require('util/slider/index.js');


var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

$(function () {
    //渲染banner
    var bannerHtml = _mm.renderHtml(templateBanner);
    $(".baner-con").html(bannerHtml);

    //初始化banner
    var $unsilder = $('.banner').unslider({
        dots:true
    });

    $('.banner-arrow').click(function() {
        var forward = $(this).hasClass("prev")?"prev":"next";

        $unsilder.data('unslider')[forward]();
    });
});


