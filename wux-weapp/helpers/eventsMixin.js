Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = eventsMixin;

var defaultEvents = {
    onChange: function() {}
};

function eventsMixin() {
    return Behavior({
        lifetimes: {
            created: function() {
                this._oriTriggerEvent = this.triggerEvent, this.triggerEvent = this._triggerEvent;
            }
        },
        properties: {
            events: {
                type: Object,
                value: defaultEvents
            }
        },
        data: {
            inputEvents: defaultEvents
        },
        definitionFilter: function(t) {
            Object.assign(t.data = t.data || {}, {
                inputEvents: Object.assign({}, defaultEvents, t.inputEvents)
            }), Object.assign(t.methods = t.methods || {}, {
                _triggerEvent: function(t, e, n, i) {
                    var s = !(2 < arguments.length && void 0 !== n) || n, a = 3 < arguments.length ? i : void 0, r = this.data.inputEvents["on".concat(t[0].toUpperCase()).concat(t.slice(1))];
                    s && "function" == typeof r && r.call(this, e), this._oriTriggerEvent(t, e, a);
                }
            }), Object.assign(t.observers = t.observers || {}, {
                events: function(t) {
                    this.setData({
                        inputEvents: Object.assign({}, defaultEvents, this.data.inputEvents, t)
                    });
                }
            });
        }
    });
}