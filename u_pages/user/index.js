var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _tools = require("../../utils/tools"), _util = require("../../utils/util");

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var g, app = getApp(), route = app.route, page = app.page;

function getState(t) {
    var e = wx.getStorageSync("userInfo"), o = e.is_law, n = e.sh_state;
    return 3 == o && 0 == n ? t ? "" : "审核中" : 3 == o && 1 == n ? (app.item = {
        title: "申请驳回",
        content: e.jujue_content,
        img: "pay_no",
        button: [ {
            title: "返回首页",
            url: "loading",
            type: "reLaunch"
        }, {
            title: "重新申请",
            url: "enter",
            type: "redirect"
        } ]
    }, t ? "result" : "申请驳回") : 2 == o ? t ? "l_index" : g.data.system.law_custom + "界面" : t ? "enter" : g.data.system.law_custom + "入驻";
}

page({
    data: {
        nav: [ {
            icon: "yzd-other",
            title: "待付款"
        }, {
            icon: "yzd-time",
            title: "待服务"
        }, {
            icon: "yzd-flag",
            title: "待确认"
        }, {
            icon: "yzd-document",
            title: "待评价"
        }, {
            icon: "yzd-tasklist",
            title: "已完成"
        } ],
        isLogin: !1,
        updeta: !1
    },
    onLoad: function() {
        g = this;
    },
    login: function() {
        0 == g.data.userInfo.is_law && g.setData({
            isLogin: !0
        });
    },
    toPage: function(t) {
        t = t.currentTarget.dataset;
        var e = (t = "object" == _typeof(t.page) ? t.page : t).page, o = t.key || "", n = t.value || "", a = t.type || "";
        switch (e) {
          case "clearCache":
            return wx.clearStorageSync(), app.dataNav = "", app.system = "", app.userInfo = "", 
            wx.showToast({
                icon: "none",
                title: "清除成功"
            }), void setTimeout(function() {
                route({
                    url: "loading",
                    type: "reLaunch"
                });
            }, 1500);

          case g.data.law_item.page:
            return void (0, _tools.verifyLogin)({
                success: function() {
                    "l_index" == g.data.law_item.page && wx.setStorageSync("page", !0), route({
                        url: e,
                        params: _defineProperty({}, o, n),
                        type: a
                    });
                }
            });
        }
        route({
            url: e,
            params: _defineProperty({}, o, n),
            type: a
        });
    },
    updeta: function() {
        g.setData({
            updeta: !0
        }), wx.getUserInfo({
            success: function(t) {
                (0, _tools.updeta)(t.userInfo);
            },
            fail: function() {
                g.setData({
                    isLogin: !0
                });
            }
        });
    },
    getPhoneNumber: function(t) {
        (0, _tools.getPhoneNumber)(t);
    },
    onShow: function() {
        g.setData({
            law_item: {
                icon: "yzd-addpeople",
                title: getState(0),
                page: getState(1),
                type: "l_index" == getState(1) ? "reLaunch" : ""
            }
        });
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: g.data.system.xcx_dbbq_tel
        });
    },
    onPullDownRefresh: function() {
        (0, _tools.getUserInfo)(function(t) {
            g.onShow();
        });
    }
});