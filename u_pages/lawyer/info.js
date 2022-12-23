var g, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function pay(e) {
    request({
        url: "LawOrderPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: e
        },
        success: function(e) {
            console.log("回调支付信息：", e), (0, _tools.wxPay)({
                data: e,
                success: function(e) {
                    (0, _tools.getChatList)(function(e) {
                        result("支付成功", "订单支付成功 ￥" + g.data.price);
                    });
                }
            });
        }
    });
}

function result(e, t) {
    console.log(g.data.order_id), app.item = {
        title: e,
        content: t,
        img: "pay_ok",
        button: [ {
            title: "立即咨询",
            url: "chat_info",
            params: {
                toid: g.data.user_id
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
        is_collect: 1,
        choice_index: 0,
        no_comment: app.srcRoot + "no_comment.png"
    },
    onLoad: function(e) {
        g = this, request({
            url: "LawInfo",
            data: {
                law_id: e.scene || e.id,
                type: "-1" != e.id || "rand",
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
            },
            showLoading: !1,
            success: function(e) {
                e.score = parseInt(e.score), g.setData(_extends({}, e, {
                    price: e.fulu_list[0].price
                }));
            }
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: g.data.name,
            path: g.route + "?id=" + g.data.id,
            imageUrl: g.data.img || ""
        };
    },
    collect: function(e) {
        var t = 1 == parseInt(g.data.is_collect) ? 2 : 1;
        (0, _tools.verifyLogin)({
            success: function(e) {
                request({
                    url: "LawCollect",
                    data: {
                        type: t,
                        law_id: g.data.id,
                        user_id: app.userInfo.id
                    },
                    showLoading: !1,
                    success: function(e) {
                        g.setData({
                            is_collect: t
                        });
                    }
                });
            }
        });
    },
    choiceServe: function(e) {
        e = parseInt(e.currentTarget.dataset.index), g.setData({
            choice_index: e,
            price: g.data.fulu_list[e].price
        });
    },
    toSubscribe: function() {
        (0, _tools.subscribe)("USER"), (0, _tools.verifyLogin)({
            success: function(e) {
                var t = g.data.id, a = g.data.price;
                switch (app.item = {
                    law_id: t,
                    price: a,
                    name: g.data.name,
                    img: g.data.img
                }, g.data.fulu_list[g.data.choice_index].type) {
                  case "jslt":
                    if (g.data.order_id) return void (0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功"));
                    g.data.order_id ? pay(g.data.order_id) : request({
                        url: "SubmitLawOrder",
                        data: {
                            type: "jslt",
                            law_id: t,
                            price: a,
                            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
                        },
                        success: function(e) {
                            wx.hideLoading(), e ? g.setData({
                                order_id: e.order_id
                            }, function() {
                                0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功");
                            }) : wx.showToast({
                                icon: "none",
                                title: "提交失败:" + e
                            });
                        }
                    });
                    break;

                  default:
                    route({
                        url: "lawyer_subscribe",
                        params: {
                            type: g.data.choice_index
                        }
                    });
                }
            }
        });
    },
    toHome: function() {
        route({
            url: "loading",
            type: "reLaunch"
        });
    },
    shareModal: function() {
        g.setData({
            isShow: !g.data.isShow
        });
    },
    poster: function() {
        g.shareModal(), route({
            url: "poster",
            params: {
                id: g.data.id,
                type: "lawposter"
            }
        });
    }
});