var g, law_id, _tools = require("../../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function pay(t) {
    request({
        url: "LawOrderPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: t
        },
        success: function(t) {
            console.log("回调支付信息：", t), (0, _tools.wxPay)({
                data: t,
                success: function(t) {
                    result("支付成功", "订单支付成功 ￥" + g.data.price);
                }
            });
        }
    });
}

function result(t, e) {
    console.log(g.data.order_id), app.item = {
        title: t,
        content: e,
        img: "pay_ok",
        button: [ {
            title: "查看订单",
            url: "orders_info",
            params: {
                order_id: g.data.order_id,
                type: 0
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

page({
    data: {
        imgList: []
    },
    onLoad: function(t) {
        g = this, law_id = app.item.law_id, g.setData({
            price: app.item.price,
            name: app.item.name,
            img: app.item.img,
            time: (0, _tools.getTime)(),
            date: (0, _tools.getDate)(),
            type: parseInt(t.type)
        }, function() {
            app.item = "";
        });
    },
    ChooseImage: function() {
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(t) {
                0 != g.data.imgList.length ? g.setData({
                    imgList: g.data.imgList.concat(t.tempFilePaths)
                }) : g.setData({
                    imgList: t.tempFilePaths
                });
            }
        });
    },
    ViewImage: function(t) {
        wx.previewImage({
            urls: g.data.imgList,
            current: t.currentTarget.dataset.url
        });
    },
    DelImg: function(t) {
        g.data.imgList.splice(t.currentTarget.dataset.index, 1), g.setData({
            imgList: g.data.imgList
        });
    },
    DateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    TimeChange: function(t) {
        this.setData({
            time: t.detail.value
        });
    },
    submit: function(t) {
        (0, _tools.subscribe)("USER"), g.submitFromId(t);
        var e = (t = t.detail).value.name, a = t.value.phone, i = t.value.content, o = g.data.type;
        g.data.order_id ? pay(g.data.order_id) : e ? a ? i ? g.data.order_id ? 0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功") : (wx.showLoading({
            mask: !0,
            title: "图片上传中..."
        }), (0, _tools.uploadImg)(g.data.imgList, function(t) {
            wx.showLoading({
                mask: !0,
                title: "提交中..."
            }), request({
                url: "SubmitLawOrder",
                showLoading: !1,
                data: {
                    type: 0 == o ? "phone" : "img",
                    law_id: law_id,
                    content: i,
                    imglist: t,
                    name: e,
                    phone: a,
                    yy_time: 0 == o ? g.data.date + " " + g.data.time : "",
                    price: g.data.price,
                    user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
                },
                success: function(t) {
                    wx.hideLoading(), t ? g.setData({
                        order_id: t.order_id
                    }, function() {
                        0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功");
                    }) : wx.showToast({
                        icon: "none",
                        title: "提交失败:" + t
                    });
                }
            });
        })) : wx.showToast({
            icon: "none",
            title: "请输入详细描述"
        }) : wx.showToast({
            icon: "none",
            title: "请输入您的手机号"
        }) : wx.showToast({
            icon: "none",
            title: "请输入您的姓名"
        });
    }
});