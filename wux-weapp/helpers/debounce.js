function debounce(t, o, i) {
    var n, u, r, a, c;
    function d() {
        var e = +new Date() - a;
        e < o && 0 <= e ? n = setTimeout(d, o - e) : (n = void 0, i || (c = t.apply(r, u), 
        n || (u = r = void 0)));
    }
    function e() {
        r = this, u = arguments, a = +new Date();
        var e = i && !n;
        return n = n || setTimeout(d, o), e && (c = t.apply(r, u), u = r = void 0), c;
    }
    return e.cancel = function() {
        void 0 !== n && (clearTimeout(n), n = void 0), u = r = void 0;
    }, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = debounce;