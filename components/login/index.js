var that, g, _tools = require("../../utils/tools.js"), _util = require("../../utils/util.js"), app = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        isShow: {
            type: Boolean
        },
        mainColor: {
            type: String,
            value: "#1155cc"
        }
    },
    data: {
        image: app.srcRoot + "login-bg.png"
    },
    attached: function() {
        g = this, that = getCurrentPages()[getCurrentPages().length - 1];
    },
    observers: {
        mainColor: function(t) {
            this.setData({
                textColor: (0, _tools.isDark)(t)
            });
        }
    },
    methods: {
        toPage: function(t) {
            var e = t.currentTarget.dataset.item;
            e.url != app.currentPage.route && wx.redirectTo({
                url: "/" + e.url
            });
        },
        isShow: function() {
            this.data.isShow && that.setData({
                isLogin: !1
            });
        },
        getUserInfo: function(t) {
            "getUserInfo:ok" == t.detail.errMsg ? (0, _tools.updeta)(t.detail.userInfo) : (that.setData({
                updeta: !1
            }), console.log("用户取消授权"));
        },
        touchmove: function() {}
    }
});