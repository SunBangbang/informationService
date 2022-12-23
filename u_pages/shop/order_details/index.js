var g, content, phone, name, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, _tools = require("../../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function pay(t) {
    request({
        url: "ShopOrderPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: t
        },
        success: function(e) {
            console.log("回调支付信息：", e), (0, _tools.wxPay)({
                data: e,
                success: function(e) {
                    app.item = {
                        title: "支付成功",
                        content: "订单支付成功 ￥" + g.data.price,
                        img: "pay_ok",
                        button: [ {
                            title: "查看订单",
                            url: "orders_info",
                            a: {
                                order_id: t,
                                type: 1
                            }
                        }, {
                            title: "返回首页",
                            url: "loading",
                            type: "reLaunch"
                        } ]
                    }, route({
                        type: "redirect",
                        url: "result"
                    });
                }
            });
        }
    });
}

page({
    data: {},
    onLoad: function(e) {
        content = phone = name = "", (g = this).setData(_extends({}, app.item), function() {
            app.item = "";
        });
    },
    chooseAddress: function() {
        wx.chooseAddress({
            success: function(e) {
                g.setData({
                    address: e
                });
            }
        });
    },
    input: function(e) {
        content = e.detail.value;
    },
    nameInput: function(e) {
        name = e.detail.value;
    },
    phoneInput: function(e) {
        phone = e.detail.value;
    },
    submit: function() {
        (0, _tools.subscribe)("USER");
        var e = g.data.address, t = g.data.attribute;
        g.data.order_id ? pay(g.data.order_id) : e || 2 != t ? name || 1 != t ? phone || 1 != t ? request({
            url: "ShopOrderSubmit",
            data: {
                good_id: g.data.good_id,
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                content: content,
                people_name: 2 == t ? e.userName : name,
                people_phone: 2 == t ? e.telNumber : phone,
                people_address: 2 == t ? e.provinceName + " " + e.cityName + " " + e.countyName + " " + e.detailInfo : ""
            },
            showLoading: !1,
            success: function(e) {
                e && e.order_id ? g.setData({
                    order_id: e.order_id
                }, function() {
                    pay(e.order_id);
                }) : wx.showToast({
                    icon: "none",
                    title: "提交失败:" + e
                });
            }
        }) : wx.showToast({
            icon: "none",
            title: "请输入联系电话"
        }) : wx.showToast({
            icon: "none",
            title: "请请输入姓名"
        }) : wx.showToast({
            icon: "none",
            title: "请选择收货地址"
        });
    }
});