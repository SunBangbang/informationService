var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getIndex() {
    request({
        url: "index",
        showLoading: !1,
        success: function(e) {
            g.setData({
                banner: e.banner,
                notice: e.notice,
                nav: e.nav,
                lawyer_list: e.law,
                news_list: e.new
            }), app.indexData = e, wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {},
    onLoad: function(e) {
        g = this;
    },
    onPullDownRefresh: function() {
        getIndex();
    },
    toNotice: function(e) {
        route({
            url: "notice",
            params: {
                i: e.currentTarget.dataset.index
            }
        });
    },
    toPage: function(e) {
        var a = e.currentTarget.dataset.item;
        route({
            url: a.url
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: g.data.system.xcx_name,
            path: g.route
        };
    },
    onShow: function() {
        app.indexData ? g.setData({
            banner: app.indexData.banner,
            notice: app.indexData.notice,
            nav: app.indexData.nav,
            lawyer_list: app.indexData.law,
            news_list: app.indexData.new
        }) : getIndex();
    }
});