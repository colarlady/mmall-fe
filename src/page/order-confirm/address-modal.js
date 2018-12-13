/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/12/12
 * Time: 9:28
 */

'use strict';

var _mm = require('util/mm.js');
var _cities = require('util/city');
var addressModalTemplate = require('./address-modal.string');
var _address = require('service/address-service.js');

var addressModal = {

    //显示地址选择
    show:function (option) {
        // 1.option缓存
        this.option = option;
        this.option.data = option.data||null;
        this.$modalWrap = $(".modal-wrap");
        //2.渲染modal
        this.loadAddressModal();
        //3.绑定事件
        this.bindEvent();
    },

    //加载地址
    loadAddressModal:function () {
        var addressModalHtml = _mm.renderHtml(addressModalTemplate,
            {
                isUpdate:this.option.isUpdate,
                data: this.option.data
            });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
        // //加载城市
        // this.loadCity();
    },
    //加载省份
    loadProvince:function () {
        var provinces = _cities.getAllProvinces();
        var $provinceSelect =this.$modalWrap.find("#reciver-province");
        $provinceSelect.html(this.getSelectOptions(provinces));
        //如果是编辑地址，需要选中回填的地址省份
        if(this.option.isUpdate&&this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            //加载城市信息
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    //获取select框的选项，输入array,输出:HTML
    getSelectOptions:function (optionArray) {
        var html = "<option value=''>请选择</option>";
        for(var i=0,iLength=optionArray.length;i<iLength;i++){
            html+="<option value='"+optionArray[i]+"'>"+optionArray[i]+"</option>";
        }
        return html;
    },
    //加载城市
    loadCity:function (provinceName) {
        var cities = _cities.getAllCities(provinceName);
        var $citiesSelect =this.$modalWrap.find("#reciver-city");
        $citiesSelect.html(this.getSelectOptions(cities));

        //如果是编辑地址，需要选中回填的地址城市
        if(this.option.isUpdate&&this.option.data.receiverCity){
            $citiesSelect.val(this.option.data.receiverCity);
        }
    },
    //绑定事件
    bindEvent:function () {
        var _this = this;

        //省份变化-->城市变化
        this.$modalWrap.find("#reciver-province").change(function () {
            var selectProvince = $(this).val();
            _this.loadCity(selectProvince);
        });

        //提交地址
        this.$modalWrap.find(".address-save").click(function () {
            var receiverInfo = _this.getReceiverInfo();
            var isUpdate = _this.option.isUpdate;

            //如果是保存新提交地址,并且验证通过
            if(!isUpdate&&receiverInfo.state){
                _address.addNewAddress(receiverInfo.data,function (res) {
                    //保存成功
                    _mm.errorTips("地址添加成功");
                    _this.hide();
                    // 执行传入option参数成功回调
                    typeof _this.option.onSuccess==="function"&& _this.option.onSuccess(res);
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                });

            }else if(isUpdate&&receiverInfo.state){

                //如果是保存编辑的地址,并且验证通过
                _address.updateAddress(receiverInfo.data,function (res) {
                    //保存成功
                    _mm.errorTips("地址编辑成功");
                    _this.hide();
                    // 执行传入option参数成功回调
                    typeof _this.option.onSuccess==="function"&& _this.option.onSuccess(res);
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                });

            }else{
                //验证不通过
                _mm.errorTips(receiverInfo.errMsg);
            }
        });


        //为了点击内容区域不关闭弹窗
        this.$modalWrap.find(".modal-container").click(function (e) {
            e.stopPropagation();
        });
        //点击叉号或者蒙版区域关闭弹窗
        this.$modalWrap.find(".close").click(function () {
            _this.hide();
        });


    },
    //获取表单里面填写的收货人信息，并且进行验证
    getReceiverInfo:function () {
        var receiverInfo = {};
        var result = {
            state:false,  //默认验证不通过
        }

        receiverInfo.receiverName = $.trim(this.$modalWrap.find("#reciver-name").val());
        receiverInfo.receiverProvince = this.$modalWrap.find("#reciver-province").val();
        receiverInfo.receiverCity = this.$modalWrap.find("#reciver-city").val();
        receiverInfo.receiverAddress= $.trim(this.$modalWrap.find("#reciver-address").val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find("#reciver-phone").val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find("#reciver-zip").val());

        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find("#address-id").val();
        }
        //进行验证
        if(!receiverInfo.receiverName){
            result.errMsg = "请输入收件人姓名";
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = "请输入收件人所在省份";
        }else if(!receiverInfo.receiverCity){
            result.errMsg = "请输入收件人所在城市";
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = "请输入收件人详细地址";
        }else if(!receiverInfo.receiverPhone){
            result.errMsg = "请输入收件人联系方式";
        }else{
            //验证通过
            result.state = true;
            result.data = receiverInfo;
        }
        return result;
    },
    //隐藏地址选择对话框
    hide:function () {
        this.$modalWrap.empty();
    }
};

module.exports= addressModal;


