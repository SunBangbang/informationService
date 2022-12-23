var currentPage, _tools = require("tools"), AOP = {
    before: function(t, o, e) {
        var n = t[o];
        return t[o] = function() {
            e(arguments[0]), n.apply(getApp().currentPage, arguments);
        }, t;
    },
    after: function(t, o, e) {
        var n = t[o];
        return t[o] = function() {
            n.apply(getApp().currentPage, arguments), e(arguments[0]);
        }, t;
    }
};

module.exports = function(t) {
    var e = getApp();
    "function" != typeof t.onLoad && (t.onLoad = function(t) {}), "function" != typeof t.onShow && (t.onShow = function(t) {}), 
    t = AOP.before(t, "onLoad", function(t) {
        var o = getCurrentPages();
        e.currentPage = currentPage = o[o.length - 1], e.dataNav ? (0, _tools.setTabbar)(currentPage) : (0, 
        _tools.getTabbar)(currentPage), e.system ? (0, _tools.setSystem)(currentPage) : (0, 
        _tools.getSystem)(currentPage), e.userInfo.id ? (0, _tools.setUserInfo)() : (0, 
        _tools.getUserInfo)();
    }), "function" != typeof (t = AOP.after(t, "onShow", function(t) {})).submitFromId && (t.submitFromId = function(t) {
        return (0, _tools.submitFromId)(t.detail.formId);
    }), Page(t);
};