var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, _tools = require("../../../utils/tools");

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var g, city, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function lawPay(t, e, a) {
    request({
        url: "LawInPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: t
        },
        success: function(t) {
            t.appId ? (0, _tools.wxPay)({
                data: t,
                success: function(t) {
                    post(e, a);
                }
            }) : toast("错误:" + t);
        }
    });
}

function post(t, e) {
    wx.showLoading({
        title: "上传图片中...",
        mask: !0
    }), (0, _tools.uploadImg)(t, function(t) {
        t = t.split(","), wx.showLoading({
            title: "提交中...",
            mask: !0
        }), request({
            url: "LawSettled",
            data: _extends({}, e, {
                district_id: 0,
                img: t[0],
                sfz_zheng: t[1],
                sfz_fan: t[2]
            }),
            showLoading: !1,
            success: function(t) {
                wx.hideLoading(), 1 == t ? (app.userInfo.is_law = 3, app.userInfo.sh_state = 0, 
                wx.setStorageSync("userInfo", app.userInfo), app.item = {
                    title: "提交成功",
                    content: "入驻申请提交成功",
                    img: "pay_ok",
                    button: [ {
                        title: "返回首页",
                        url: "loading",
                        type: "reLaunch"
                    } ]
                }, route({
                    type: "redirect",
                    url: "result"
                })) : toast("错误:" + t);
            }
        });
    });
}

function toast(t) {
    wx.showToast({
        icon: "none",
        title: t
    });
}

function getLocation() {
    request({
        url: "Location",
        success: function(t) {
            t = t.province;
            var e, a = [], s = [];
            city = [];
            for (var o = 0; o < t.length; o++) {
                e = t[o], s[o] = {
                    id: e.id,
                    name: e.name
                }, e = e.city, city[o] = [];
                for (var i = 0; i < e.length; i++) city[o].push({
                    id: e[i].id,
                    name: e[i].name
                });
            }
            a.push(s), a.push(city[0]), wx.setStorageSync("location", a), wx.setStorageSync("city", city), 
            g.setData({
                address: a
            });
        }
    });
}

page({
    data: {
        src: app.srcRoot,
        sex: wx.getStorageSync("userInfo").gender,
        addressIndx: [ 0, 0 ],
        deadlineIndex: 0,
        date: (0, _tools.getDate)(),
        radio: !1,
        dh_state: !0,
        img_state: !0,
        jslt_state: !0
    },
    onLoad: function(t) {
        g = this;
        var e = wx.getStorageSync("location");
        city = wx.getStorageSync("city"), e && city ? g.setData({
            address: e
        }) : getLocation(), request({
            url: "GetInTerm",
            showLoading: !1,
            success: function(t) {
                g.setData({
                    deadline: t
                });
            }
        });
    },
    switchChange: function(t) {
        var e = "dh_state";
        switch (t.currentTarget.dataset.i) {
          case "1":
            e = "img_state";
            break;

          case "2":
            e = "jslt_state";
        }
        g.setData(_defineProperty({}, e, t.detail.value));
    },
    onShow: function() {
        (0, _tools.verifyLogin)({});
        var t = [];
        if (app.item) for (var e = 0; e < app.item.length; e++) app.item[e].checked && t.push(app.item[e]);
        g.setData({
            goodareas: t
        });
    },
    addressColumnChange: function(t) {
        var e = (t = t.detail).column, a = t.value;
        switch (e) {
          case 0:
            g.setData({
                "address[1]": city[a]
            });
        }
    },
    Change: function(t) {
        var e = t.currentTarget.dataset.i;
        g.setData(_defineProperty({}, e, t.detail.value));
    },
    toDomain: function() {
        route({
            type: "navigate",
            url: "domain"
        });
    },
    ChooseImage: function(t) {
        var e, a = parseInt(t.currentTarget.dataset.type);
        wx.chooseImage({
            count: 1,
            success: function(t) {
                switch (a) {
                  case 0:
                    e = "img";
                    break;

                  case 1:
                    e = "sfz_zheng";
                    break;

                  case 2:
                    e = "sfz_fan";
                }
                g.setData(_defineProperty({}, e, t.tempFilePaths[0]));
            }
        });
    },
    radio: function(t) {
        g.setData({
            radio: !g.data.radio
        });
    },
    html_page: function() {
        app.centent = g.data.system.law_xieyi, route({
            type: "navigate",
            url: "html_page",
            params: {
                title: "入驻协议"
            }
        });
    },
    shxx: function() {
        (0, _tools.subscribe)(g.data.system.dyxx.shjgtx_id);
    },
    submit: function(t) {
        t = t.detail.value;
        for (var e, a, s = g.data, o = t.name, i = t.phone, n = t.sex ? 1 : 2, r = t.lawfirm, d = t.licenseno, c = s.date, u = s.dh_state ? t.dh_price : "0.00", l = s.img_state ? t.img_price : "0.00", p = s.jslt_state ? t.jslt_price : "0.00", f = t.dh_state ? 2 : 1, _ = t.img_state ? 2 : 1, y = t.jslt_state ? 2 : 1, m = t.content, h = s.img, w = s.sfz_zheng, x = s.sfz_fan, v = "", I = 0; I < s.goodareas.length; I++) v += (0 != I ? "," : "") + s.goodareas[I].id;
        if (e = s.address[0][s.addressIndx[0]].id, a = s.address[1][s.addressIndx[1]].id, 
        o) if (i) if (r) if (d) if (s.chooseLocation) if (v) if (u) if (l) if (p) if (m) if (h) if (w && x) if (s.radio) {
            var S = s.deadline[s.deadlineIndex], L = _extends({
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                name: o,
                phone: i,
                sex: n,
                lawfirm: r,
                licenseno: d,
                work_year: c,
                dh_price: u,
                img_price: l,
                jslt_price: p,
                goodareas_id: v,
                province_id: e,
                city_id: a,
                content: m,
                dh_state: f,
                img_state: _,
                jslt_state: y,
                daoqi_time: (0, _tools.getTimestamp)((0, _tools.getDate)(), (0, _tools.getTime)()) + 86400 * S.in_day
            }, s.chooseLocation);
            h = [ h, w, x ], 2 == S.is_pay ? s.order_id ? lawPay(s.order_id, h, L) : request({
                url: "LawInOrder",
                data: {
                    user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                    money: S.in_money,
                    rz_time: S.in_day
                },
                success: function(t) {
                    t.id ? (lawPay(t.id, h, L), g.setData({
                        order_id: t.id
                    })) : toast("错误:" + t);
                }
            }) : post(h, L);
        } else toast("请勾选" + g.data.system.law_custom + "协议"); else toast("请上传身份证"); else toast("请上传头像"); else toast("请填写个人介绍"); else toast("请填写在线咨询价格"); else toast("请填写图文咨询价格"); else toast("请填写电话咨询价格"); else toast("请选择擅长领域"); else toast("请选择所在位置"); else toast("请填写" + g.data.system.zhiye + "证号"); else toast("请填写" + g.data.system.ssls + "名称"); else toast("请填写输入手机号码"); else toast("请填写姓名");
    },
    getAddress: function() {
        wx.chooseLocation({
            success: function(t) {
                g.setData({
                    chooseLocation: {
                        address: t.address,
                        longitude: t.longitude,
                        latitude: t.latitude
                    }
                });
            }
        });
    }
});