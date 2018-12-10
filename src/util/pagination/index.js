/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/3
 * Time: 8:21
 */

require('./index.css');

var _mm = require('util/mm.js');
var templatePagnation = require('./index.string');

var Pagination = function () {
   var  _this  =this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    //绑定分页点击事件
    $(document).on("click",".page-item",function () {

        //对于active和disabled的点击不处理
        if($(this).hasClass("disabled")||$(this).hasClass("active")){
            return;
        }
        typeof _this.options.onSelectPage=="function" ?_this.options.onSelectPage($(this).data("value")):null;
    });
}

//渲染分页的组件
Pagination.prototype.render = function (userOptions) {
    //合并参数
    this.options = $.extend({}, this.defaultOption, userOptions);

    //判断容器是否是jQuery对象
    if (!(this.options.container instanceof jQuery)) {
        return;
    }

    //如果只有一页
    if (this.options.pages<= 1) {
        return;
    }

    //渲染分页内容
    this.options.container.html(this.getPaginationHtml());
}

//获取分页html  上一页 1 =2= 3 下一页  2/9
Pagination.prototype.getPaginationHtml = function () {
    var html = "";
    options = this.options;
    pageArray = [];
    start = options.pageNum - options.pageRange > 0 ? options.pageNum - options.pageRange : 1;
    end = options.pageNum + options.pageRange < options.pages ? options.pageNum + options.pageRange : options.pages;

    //添加数据
    pageArray.push({
        name: "上一页",
        value: options.prePage,
        disabled: !(options.hasPreviousPage)
    });

    for (var i = start; i <=end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === options.pageNum)
        });
    }

    pageArray.push({
        name: "下一页",
        value: options.nextPage,
        disabled: !(options.hasNextPage)
    });

    var result = _mm.renderHtml(templatePagnation, {
        pageArray: pageArray,
        pageNum: options.pageNum,
        pages: options.pages
    });
    return result;
}

module.exports = Pagination;