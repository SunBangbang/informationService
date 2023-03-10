function compareVersion(e, r) {
    for (var t = e.split("."), a = r.split("."), n = Math.max(t.length, a.length); t.length < n; ) t.push("0");
    for (;a.length < n; ) a.push("0");
    for (var o = 0; o < n; o++) {
        var s = parseInt(t[o]), u = parseInt(a[o]);
        if (u < s) return 1;
        if (s < u) return -1;
    }
    return 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _default = compareVersion;

exports.default = _default;