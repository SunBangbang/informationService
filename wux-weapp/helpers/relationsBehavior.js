Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("./isEmpty")), _debounce2 = _interopRequireDefault(require("./debounce"));

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function bindFunc(e, t, n) {
    var i = e[t];
    e[t] = function(e) {
        n && n.call(this, e, _defineProperty({}, t, !0)), i && i.call(this, e);
    };
}

var methods = [ "linked", "linkChanged", "unlinked" ], extProps = [ "observer" ], _default = Behavior({
    lifetimes: {
        created: function() {
            this._debounce = null;
        },
        detached: function() {
            this._debounce && this._debounce.cancel && this._debounce.cancel();
        }
    },
    definitionFilter: function(e) {
        var n = e.relations;
        if (!(0, _isEmpty.default)(n)) {
            var t = function(e) {
                var t = n[e];
                methods.forEach(function(e) {
                    return bindFunc(t, e, t.observer);
                }), extProps.forEach(function(e) {
                    return delete t[e];
                });
            };
            for (var i in n) t(i);
        }
        Object.assign(e.methods = e.methods || {}, {
            getRelationsName: function(e) {
                var t = 0 < arguments.length && void 0 !== e ? e : [ "parent", "child", "ancestor", "descendant" ];
                return Object.keys(n || {}).map(function(e) {
                    return n[e] && t.includes(n[e].type) ? e : null;
                }).filter(function(e) {
                    return !!e;
                });
            },
            debounce: function(e, t, n) {
                var i = 1 < arguments.length && void 0 !== t ? t : 0, r = 2 < arguments.length && void 0 !== n && n;
                return (this._debounce = this._debounce || (0, _debounce2.default)(e.bind(this), i, r)).call(this);
            }
        });
    }
});

exports.default = _default;