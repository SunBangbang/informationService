var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _checkIPhoneX = require("./checkIPhoneX");

function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
        return void 0 === e ? "undefined" : _typeof2(e);
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
    })(e);
}

var defaultSafeArea = {
    top: !1,
    bottom: !1
}, setSafeArea = function(e) {
    return "boolean" == typeof e ? Object.assign({}, defaultSafeArea, {
        top: e,
        bottom: e
    }) : null !== e && "object" === _typeof(e) ? Object.assign({}, defaultSafeArea) : "string" == typeof e ? Object.assign({}, defaultSafeArea, _defineProperty({}, e, !0)) : defaultSafeArea;
}, _default = Behavior({
    properties: {
        safeArea: {
            type: [ Boolean, String, Object ],
            value: !1
        }
    },
    observers: {
        safeArea: function(e) {
            this.setData({
                safeAreaConfig: setSafeArea(e)
            });
        }
    },
    definitionFilter: function(e) {
        var t = ((0, _checkIPhoneX.getSystemInfo)() || {}).statusBarHeight, o = (0, _checkIPhoneX.checkIPhoneX)();
        Object.assign(e.data = e.data || {}, {
            safeAreaConfig: defaultSafeArea,
            statusBarHeight: t,
            isIPhoneX: o
        });
    }
});

exports.default = _default;