var audio, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
}, _util = require("util");

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

function getTabbar(e) {
    (0, _util.request)({
        url: "FootNav",
        showLoading: !1,
        success: function(t) {
            getApp().dataNav = t, setTabbar(e, t);
        }
    });
}

function setTabbar(t) {
    var e, o, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getApp().dataNav, a = (JSON.stringify(n), 
    getApp()), i = !1, r = require("page_urls.js");
    if (o = require("route.js"), t.route == r.loading && o({
        type: "redirect",
        url: wx.getStorageSync("page") ? "l_index" : n.tabbar[0].url
    }), a.tabbar) {
        for (var s = n.tabbar, u = 0; u < s.length; u++) if (s[u].url == getParam(t)) {
            e = s[u].url, i = a.isLoading = !0;
            break;
        }
        t.setData({
            show_tabbar: i
        }), a.tabbar.setData({
            dataNav: n,
            route: e
        });
    }
    getCurrentPages().length && e == getParam(t) && wx.hideHomeButton();
}

function getParam(t) {
    var e = t.route, o = t.options;
    for (var n in o) e += (e == t.route ? "?" : "&") + n + "=" + o[n];
    return e;
}

function getSystem(e) {
    (0, _util.request)({
        url: "Qjsz",
        showLoading: !1,
        success: function(t) {
            t.text_color = isDark(t.foot_color2), getApp().system = t, setSystem(e, t), wx.setStorageSync("system", t);
        }
    });
}

function setSystem(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getApp().system;
    t.setData({
        system: _extends({}, t.data.system, e)
    }), require("page_urls.js").orders_info != t.route && setNavigationBarTextColor(e.title_bg, t);
}

function setNavigationBarTextColor(t, e) {
    var o = require("page_urls.js");
    e.route != o.diy && wx.setNavigationBarColor({
        frontColor: isDark(t),
        backgroundColor: getApp().system.title_bg,
        animation: !1
    });
}

function isDark(t) {
    if (4 === t.length) {
        for (var e = "#", o = 1; o < 4; o += 1) e += t.slice(o, o + 1).concat(t.slice(o, o + 1));
        t = e;
    }
    var n = [];
    for (o = 1; o < 7; o += 2) n.push(parseInt("0x" + t.slice(o, o + 2)));
    return n = 192 <= (n = .299 * n[0] + .587 * n[1] + .114 * n[2]) ? "#000000" : "#ffffff";
}

function submitFromId(t) {
    if (!getApp().config.isFrom) return !1;
    console.log("捕获到当前页面fromId:", t);
}

function setUserInfo() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : getApp().userInfo, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {}, o = getApp().currentPage;
    getApp().userInfo = t, t = _extends({}, t, {
        siteroot: getApp().siteInfo.siteroot
    }), wx.setStorageSync("userInfo", t), -1 != getApp().page_urls.user.indexOf(o.route) && setTimeout(function() {
        o.setData({
            updeta: !1
        });
    }, 1e3), o.setData({
        userInfo: t
    }, function() {
        e(t);
    }), wx.stopPullDownRefresh();
}

function getUserInfo() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, e = getApp().siteInfo.siteroot == wx.getStorageSync("userInfo").siteroot ? wx.getStorageSync("userInfo") : "";
    e.id ? signIn({
        user_id: e.id
    }, t) : wx.login({
        success: function(t) {
            signIn({
                code: t.code
            });
        }
    });
}

function signIn(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {};
    (0, _util.request)({
        url: "Openid",
        data: t,
        showLoading: !1,
        success: function(t) {
            setUserInfo(t, e);
        }
    });
}

function updeta(t) {
    var e = getApp().userInfo, o = parseInt(e.is_law);
    t.user_id = e.id, t.is_law = o || 1, (0, _util.request)({
        url: "WxLogin",
        data: t,
        showLoading: !1,
        success: function(t) {
            setUserInfo(t);
        }
    });
}

function verifyLogin(t) {
    t.fail = t.fail || function() {}, t.success = t.success || function() {}, getApp().userInfo.nickName && "游客" != getApp().userInfo.nickName ? t.success() : (getApp().currentPage.setData({
        isLogin: !0
    }), t.fail());
}

function getDate() {
    var t = new Date(), e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate();
    return e + "-" + (o = o < 10 ? "0" + o : o) + "-" + (n = n < 10 ? "0" + n : n);
}

function getTime() {
    var t = new Date(), e = t.getHours(), o = t.getMinutes();
    return o = o < 10 ? "0" + o : o, console.log("获取当前时分:", e + ":" + o), e + ":" + o;
}

function uploadImg(e, t) {
    if (e.length < 1) t(""); else {
        e.path || (e = {
            path: e,
            urlStr: []
        });
        var o = getApp().siteInfo.siteroot + "?i=" + getApp().siteInfo.uniacid + "&c=entry&a=wxapp&do=UploadImg&m=" + getApp().config.module, n = e.i ? e.i : 0, a = e.ok ? e.ok : 0, i = e.fail ? e.fail : 0;
        console.log(e.path[n]), wx.uploadFile({
            url: o,
            filePath: e.path[n],
            name: "upfile",
            formData: null,
            success: function(t) {
                a++, e.urlStr.push(t.data);
            },
            fail: function(t) {
                i++;
            },
            complete: function() {
                ++n == e.path.length ? (console.log("上传完毕,成功:" + a + " 失败:" + i), e.urlStr = e.urlStr.join(","), 
                t(e.urlStr)) : (e.i = n, e.ok = a, e.fail = i, uploadImg(e, t));
            }
        });
    }
}

function getPhoneNumber(t) {
    var e = t.detail;
    "getPhoneNumber:ok" == e.errMsg ? wx.login({
        success: function(t) {
            (0, _util.request)({
                url: "GetPhoneNumber",
                showLoading: !1,
                data: {
                    encryptedData: e.encryptedData,
                    iv: e.iv,
                    code: t.code,
                    user_id: getApp().userInfo.id
                },
                success: function(t) {
                    getApp().currentPage.setData({
                        "userInfo.phone": t
                    }), getApp().userInfo.phone = t;
                }
            });
        }
    }) : console.log("取消获取手机号");
}

function getTimestamp(t, e) {
    var o = (t + " " + e + ":00").split(/[- :]/), n = new Date(o[0], o[1] - 1, o[2], o[3], o[4], o[5]);
    return n = Date.parse(n) / 1e3;
}

function wxPay(e) {
    "function" != typeof e.fail && (e.fail = function(t) {}), "function" != typeof e.success && (e.success = function(t) {}), 
    "function" != typeof e.complete && (e.complete = function() {});
    var t = e.data;
    wx.requestPayment({
        timeStamp: t.timeStamp,
        nonceStr: t.nonceStr,
        package: t.package,
        signType: "MD5",
        paySign: t.paySign,
        success: function(t) {
            e.success(t);
        },
        fail: function(t) {
            wx.showToast({
                icon: "none",
                title: "取消支付"
            }), e.fail(t);
        },
        complete: function() {
            e.complete();
        }
    });
}

function formatTime(t) {
    t = parseInt(t);
    var e = new Date(1e3 * t), o = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate(), i = e.getHours(), r = e.getMinutes(), s = e.getSeconds();
    return e = [ o, n, a ].map(formatNumber).join("-") + " " + [ i, r, s ].map(formatNumber).join(":");
}

var formatNumber = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

function initSocket() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
    1 < arguments.length && void 0 !== arguments[1] && arguments[1];
    function o() {
        e < getApp().config.metering ? setTimeout(function() {
            initSocket(e + 1);
        }, 200) : (wx.hideLoading(), wx.showToast({
            icon: "none",
            title: "连接消息服务失败",
            duration: 2e3
        }));
    }
    wx.connectSocket({
        url: require("../siteinfo.js").siteroot.replace("https", "wss").replace("app/index.php", "yzdlawyer"),
        fail: function(t) {
            console.log("%c%s", "color: #FFF; background: #ff0000;border-radius:4px;padding:2px 5px;", "Socket:连接错误");
        }
    }), wx.onSocketOpen(function(t) {
        setInterval(function() {
            wx.sendSocketMessage({
                data: {
                    type: "head_test"
                },
                success: function(t) {
                    return console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "心跳测试成功");
                },
                fail: console
            });
        }, 3e3), console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "Socket:连接成功"), 
        e = 0, wx.hideLoading(), wx.onSocketMessage(function(t) {
            return onMessage(JSON.parse(t.data));
        });
    }), wx.onSocketClose(function(t) {
        console.log("Socket关闭:", t), o();
    }), wx.onSocketError(function(t) {
        console.log("Socket错误:", t), o();
    });
}

function sendMessage(t) {
    var o = getApp(), n = t.success || function() {}, a = (t.fail, t.complete || function() {}), i = t.content, r = t.toid, s = t.message_type || 1, u = o.userInfo.id || wx.getStorageSync("userInfo").id, c = wx.getStorageSync("page") ? 2 : 1, g = wx.getStorageSync("page") ? 1 : 2, f = o.currentPage.data[1 == c ? "toinfo" : "frominfo"].id;
    (0, _util.request)({
        url: "Chat",
        data: {
            type: "save_text",
            from_role: c,
            content: i,
            fromid: u,
            toid: r,
            message_type: s
        },
        showLoading: !1,
        success: function(e) {
            wx.sendSocketMessage({
                data: JSON.stringify({
                    data: i,
                    type: 1 == s ? "say" : "say_img",
                    fromid: u,
                    from_role: c,
                    toid: r,
                    to_role: g,
                    uniacid: o.system.uniacid,
                    siteroot: o.system.siteroot,
                    law_id: f
                }),
                success: function(t) {
                    console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "发送消息成功"), 
                    getChatList(function() {
                        a(e);
                    }), n(e);
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        }
    });
}

function onMessage(t) {
    var e = getApp(), o = e.userInfo.id || wx.getStorageSync("userInfo").id, n = e.srcRoot.replace("img", "mp3") + "notice.mp3", a = getCurrentPages();
    switch (a = a[a.length - 1], t.type) {
      case "init":
        wx.sendSocketMessage({
            data: JSON.stringify({
                type: "bind",
                fromid: o
            }),
            fail: console.error
        });
        break;

      default:
        if (e.chat["t" + t.toid] || (e.chat["t" + t.toid] = []), e.chat["t" + t.toid].push(t), 
        wx.vibrateLong(), a.data.user_id || t.toid == a.data.user_id || ((audio = wx.createInnerAudioContext()).autoplay = !0, 
        audio.src = n, audio.onPlay(function(t) {
            audio = void 0;
        })), a.route == require("page_urls").chat_info) {
            var i = "chat[" + a.data.chat.length + "]";
            t.time = getDateString(t.time), a.setData(_defineProperty({}, i, t), function() {
                scrollBottom();
            }), (0, _util.request)({
                url: "Chat",
                data: {
                    type: "change_state",
                    toid: a.data.toinfo.id,
                    fromid: a.data.frominfo.user_id
                },
                showLoading: !1,
                success: function(t) {}
            });
        }
        getChatList();
    }
}

function getChatList() {
    var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, n = getApp(), t = wx.getStorageSync("page") ? 2 : 1;
    (0, _util.request)({
        url: "GetChatList",
        data: {
            fromid: n.userInfo.id || wx.getStorageSync("userInfo").id,
            role: t
        },
        showLoading: !1,
        success: function(t) {
            for (var e = 0; e < t.length; e++) t[e].last_message && (t[e].last_message.time = getDateString(t[e].last_message.time)), 
            n.chat_num += t[e].countNoread;
            n.chatListThat && n.chatListThat.setData({
                chatList: t
            }), n.chatList = t, o(t);
        }
    });
}

function scrollBottom() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#chat", e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
    wx.pageScrollTo({
        duration: e,
        selector: t,
        success: function(t) {}
    });
}

function getDateString(t) {
    var e, o, n, a, i, r, s, u = formatTime(t), c = l(-2), g = l(-1), f = l(0);
    function l(t) {
        var e = new Date();
        return e.setDate(e.getDate() + t), e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
    }
    return e = (u = u.split(" "))[1].split(":"), s = (o = (u = u[0].split("-"))[0]) + "-" + (n = u[1]) + "-" + (a = u[2]) + " " + (i = e[0]) + ":" + (r = e[1]), 
    (c = c.split("-"))[1] = formatNumber(c[1]), c[2] = formatNumber(c[2]), (g = g.split("-"))[1] = formatNumber(g[1]), 
    g[2] = formatNumber(g[2]), (f = f.split("-"))[1] = formatNumber(f[1]), f[2] = formatNumber(f[2]), 
    o == c[0] && n == c[1] && a == c[2] ? "前天 " + i + ":" + r : o == g[0] && n == g[1] && a == g[2] ? "昨天 " + i + ":" + r : o == f[0] && n == f[1] && a == f[2] ? "今天 " + i + ":" + r : s;
}

function subscribe(o) {
    var n, a, t = getApp(), e = t.system.dyxx;
    if (e || "LAWYER" != o || "USER" != o) {
        switch (o) {
          case "LAWYER":
            n = [ e.zxhftz_id, e.pjwctz_id, e.ddzttx_id ];
            break;

          case "USER":
            n = [ e.zxhftz_id, e.ddzttx_id ];
            break;

          default:
            n = [ o ];
        }
        wx.getSetting({
            withSubscriptions: !0,
            success: function(t) {
                if ((t = t.subscriptionsSetting).mainSwitch || "USER" == o) {
                    a = t.itemSettings || [];
                    for (var e = 0; e < n.length; e++) if ("reject" == a[n[e]] && "USER" != o) return console.log("----"), 
                    void i();
                    console.log(n), wx.requestSubscribeMessage({
                        tmplIds: n,
                        success: console.log,
                        fail: console.error
                    });
                } else i();
            }
        });
    }
    function i() {
        wx.showModal({
            showCancel: !1,
            confirmColor: t.system.foot_color2,
            confirmText: "确定",
            title: "提示",
            content: "您关闭了订阅消息,将会影响正常使用\r\n请在设置页依次操作\r\n1.点击 订阅消息\r\n2.打开 接收订阅消息\r\n3.勾选 接收订阅消息 下面所有的权限",
            success: function(t) {
                t.confirm && wx.openSetting({
                    withSubscriptions: !0
                });
            }
        });
    }
}

module.exports = {
    getTabbar: getTabbar,
    setTabbar: setTabbar,
    getSystem: getSystem,
    setSystem: setSystem,
    submitFromId: submitFromId,
    isDark: isDark,
    setUserInfo: setUserInfo,
    getUserInfo: getUserInfo,
    updeta: updeta,
    verifyLogin: verifyLogin,
    getDate: getDate,
    getTime: getTime,
    uploadImg: uploadImg,
    getPhoneNumber: getPhoneNumber,
    getTimestamp: getTimestamp,
    wxPay: wxPay,
    formatTime: formatTime,
    getParam: getParam,
    initSocket: initSocket,
    sendMessage: sendMessage,
    getChatList: getChatList,
    scrollBottom: scrollBottom,
    getDateString: getDateString,
    subscribe: subscribe
};