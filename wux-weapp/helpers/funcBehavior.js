Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var mergeOptionsToData = function(t) {
    var e = 0 < arguments.length && void 0 !== t ? t : {}, n = Object.assign({}, e);
    for (var r in n) n.hasOwnProperty(r) && "function" == typeof n[r] && delete n[r];
    return n;
}, bind = function(r, i) {
    return function() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        return e.length ? r.apply(i, e) : r.call(i);
    };
}, assign = function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
    return Object.assign.apply(Object, [ {} ].concat(e));
}, _default = Behavior({
    definitionFilter: function(t) {
        t.data = mergeOptionsToData(t.data), t.data.in = !1, t.data.visible = !1;
    },
    methods: {
        $$mergeOptionsToData: mergeOptionsToData,
        $$mergeOptionsAndBindMethods: function(t, e) {
            var n = 0 < arguments.length && void 0 !== t ? t : {}, r = 1 < arguments.length && void 0 !== e ? e : this.fns, i = Object.assign({}, n);
            for (var a in i) i.hasOwnProperty(a) && "function" == typeof i[a] && (r[a] = bind(i[a], this), 
            delete i[a]);
            return i;
        },
        $$setData: function() {
            for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
            var i = assign.apply(void 0, [ {} ].concat(n));
            return new Promise(function(t) {
                e.setData(i, t);
            });
        },
        $$requestAnimationFrame: function(t, e) {
            var n = 0 < arguments.length && void 0 !== t ? t : function() {}, r = 1 < arguments.length && void 0 !== e ? e : 1e3 / 60;
            return new Promise(function(t) {
                return setTimeout(t, r);
            }).then(n);
        }
    },
    created: function() {
        this.fns = {};
    },
    detached: function() {
        this.fns = {};
    }
});

exports.default = _default;