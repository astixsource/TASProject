/*
Highcharts 4.0.4 JS v/Highstock 2.0.4 (2014-09-02)

(c) 2009-2014 Torstein Honsi

License: www.highcharts.com/license
 
Highcharts funnel module

(c) 2010-2014 Torstein Honsi

License: www.highcharts.com/license
Highcharts 4.0.4 JS v/Highstock 2.0.4 (2014-09-02)
Exporting module

(c) 2010-2014 Torstein Honsi

License: www.highcharts.com/license
Highcharts 4.0.4 JS v/Highstock 2.0.4 (2014-09-02)
Plugin for displaying a message when there is no data visible in chart.

(c) 2010-2014 Highsoft AS
Author: Oystein Moseng

License: www.highcharts.com/license
Highcharts 4.0.4 JS v/Highstock 2.0.4 (2014-09-02)
Solid angular gauge module

(c) 2010-2014 Torstein Honsi

License: www.highcharts.com/license
Highcharts 4.0.4 JS v/Highstock 2.0.4 (2014-09-02)

(c) 2011-2014 Torstein Honsi

License: www.highcharts.com/license
*/

(function () {
    function q(a, b) { var c; a || (a = {}); for (c in b) a[c] = b[c]; return a } function u() { var a, b = arguments, c, d = {}, e = function (a, b) { var c, d; "object" !== typeof a && (a = {}); for (d in b) b.hasOwnProperty(d) && ((c = b[d]) && "object" === typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" !== typeof c.nodeType ? a[d] = e(a[d] || {}, c) : a[d] = b[d]); return a }; !0 === b[0] && (d = b[1], b = Array.prototype.slice.call(b, 2)); c = b.length; for (a = 0; a < c; a++) d = e(d, b[a]); return d } function A(a, b) {
        return parseInt(a,
b || 10)
    } function V(a) { return "string" === typeof a } function H(a) { return a && "object" === typeof a } function ea(a) { return "[object Array]" === Object.prototype.toString.call(a) } function P(a) { return "number" === typeof a } function R(a) { return ja.log(a) / ja.LN10 } function M(a) { return ja.pow(10, a) } function E(a, b) { for (var c = a.length; c--; ) if (a[c] === b) { a.splice(c, 1); break } } function w(a) { return a !== D && null !== a } function L(a, b, c) {
        var d, e; if (V(b)) w(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)); else if (w(b) &&
H(b)) for (d in b) a.setAttribute(d, b[d]); return e
    } function W(a) { return ea(a) ? a : [a] } function l() { var a = arguments, b, c, d = a.length; for (b = 0; b < d; b++) if (c = a[b], c !== D && null !== c) return c } function N(a, b) { Na && !va && b && b.opacity !== D && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")"); q(a.style, b) } function ba(a, b, c, d, e) { a = Z.createElement(a); b && q(a, b); e && N(a, { padding: 0, border: "none", margin: 0 }); c && N(a, c); d && d.appendChild(a); return a } function Q(a, b) { var c = function () { return D }; c.prototype = new a; q(c.prototype, b); return c }
    function B(a, b, c, d) { var e = ha.numberFormat, f = ga.lang, g = +a || 0, h = -1 === b ? (g.toString().split(".")[1] || "").length : isNaN(b = ia(b)) ? 2 : b, k = void 0 === c ? f.decimalPoint : c, f = void 0 === d ? f.thousandsSep : d, n = 0 > g ? "-" : "", m = String(A(g = ia(g).toFixed(h))), r = 3 < m.length ? m.length % 3 : 0; return e !== B ? e(a, b, c, d) : n + (r ? m.substr(0, r) + f : "") + m.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + f) + (h ? k + ia(g - m).toFixed(h).slice(2) : "") } function y(a, b) { return Array((b || 2) + 1 - String(a).length).join(0) + a } function s(a, b, c) {
        var d = a[b]; a[b] = function () {
            var a =
Array.prototype.slice.call(arguments); a.unshift(d); return c.apply(this, a)
        }
    } function p(a, b) { for (var c = "{", d = !1, e, f, g, h, k, n = []; -1 !== (c = a.indexOf(c)); ) { e = a.slice(0, c); if (d) { f = e.split(":"); g = f.shift().split("."); k = g.length; e = b; for (h = 0; h < k; h++) e = e[g[h]]; f.length && (f = f.join(":"), g = /\.([0-9])/, h = ga.lang, k = void 0, /f$/.test(f) ? (k = (k = f.match(g)) ? k[1] : -1, null !== e && (e = B(e, k, h.decimalPoint, -1 < f.indexOf(",") ? h.thousandsSep : ""))) : e = Ja(f, e)) } n.push(e); a = a.slice(c + 1); c = (d = !d) ? "}" : "{" } n.push(a); return n.join("") } function O(a) {
        return ja.pow(10,
fa(ja.log(a) / ja.LN10))
    } function C(a, b, c, d) { var e; c = l(c, 1); e = a / c; b || (b = [1, 2, 2.5, 5, 10], !1 === d && (1 === c ? b = [1, 2, 5, 10] : .1 >= c && (b = [1 / c]))); for (d = 0; d < b.length && !(a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2); d++); return a * c } function F(a, b) { var c = a.length, d, e; for (e = 0; e < c; e++) a[e].ss_i = e; a.sort(function (a, c) { d = b(a, c); return 0 === d ? a.ss_i - c.ss_i : d }); for (e = 0; e < c; e++) delete a[e].ss_i } function J(a) { for (var b = a.length, c = a[0]; b--; ) a[b] < c && (c = a[b]); return c } function da(a) { for (var b = a.length, c = a[0]; b--; ) a[b] > c && (c = a[b]); return c }
    function la(a, b) { for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c] } function Aa(a) { gb || (gb = ba("div")); a && gb.appendChild(a); gb.innerHTML = "" } function ma(a) { return parseFloat(a.toPrecision(14)) } function Jb() {
        var a = ga.global.useUTC, b = a ? "getUTC" : "get", c = a ? "setUTC" : "set"; ta = ga.global.Date || window.Date; Oa = 6E4 * (a && ga.global.timezoneOffset || 0); hb = a ? ta.UTC : function (a, b, c, g, h, k) { return (new ta(a, b, l(c, 1), l(g, 0), l(h, 0), l(k, 0))).getTime() }; sb = b + "Minutes"; tb = b + "Hours"; ub = b + "Day"; Ta = b + "Date";
        ib = b + "Month"; jb = b + "FullYear"; Kb = c + "Minutes"; Lb = c + "Hours"; vb = c + "Date"; Mb = c + "Month"; Nb = c + "FullYear"
    } function X() { } function ra(a, b, c, d) { this.axis = a; this.pos = b; this.type = c || ""; this.isNew = !0; c || d || this.addLabel() } function $() { this.init.apply(this, arguments) } function qa() { this.init.apply(this, arguments) } function Ob(a, b, c, d, e) {
        var f = a.chart.inverted; this.axis = a; this.isNegative = c; this.options = b; this.x = d; this.total = null; this.points = {}; this.stack = e; this.alignOptions = { align: b.align || (f ? c ? "left" : "right" : "center"),
            verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"), y: l(b.y, f ? 4 : c ? 14 : -6), x: l(b.x, f ? c ? -6 : 6 : 0)
        }; this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
    } function Xa(a) {
        var b = a.options, c = b.navigator, d = c.enabled, b = b.scrollbar, e = b.enabled, f = d ? c.height : 0, g = e ? b.height : 0; this.handles = []; this.scrollbarButtons = []; this.elementsToDestroy = []; this.chart = a; this.setBaseSeries(); this.height = f; this.scrollbarHeight = g; this.scrollbarEnabled = e; this.navigatorEnabled = d; this.navigatorOptions = c; this.scrollbarOptions =
b; this.outlineHeight = f + g; this.init()
    } function wb(a) { this.init(a) } function Pb(a, b, c) { this.init.call(this, a, b, c) } var D, Z = document, na = window, ja = Math, I = ja.round, fa = ja.floor, Ua = ja.ceil, G = ja.max, T = ja.min, ia = ja.abs, wa = ja.cos, xa = ja.sin, Fa = ja.PI, Pa = 2 * Fa / 360, Ma = navigator.userAgent, Qb = na.opera, Na = /msie/i.test(Ma) && !Qb, kb = 8 === Z.documentMode, xb = /AppleWebKit/.test(Ma), Ya = /Firefox/.test(Ma), ab = /(Mobile|Android|Windows Phone)/.test(Ma), va = !!Z.createElementNS && !!Z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
cc = Ya && 4 > parseInt(Ma.split("Firefox/")[1], 10), Ba = !va && !Na && !!Z.createElement("canvas").getContext, Za, $a, Rb = {}, yb = 0, gb, ga, Ja, Ca, zb, ca, ya, oa = function () { return D }, sa = [], bb = 0, dc = /^[0-9]+$/, ta, hb, Oa, sb, tb, ub, Ta, ib, jb, Kb, Lb, vb, Mb, Nb, K = {}, ha; na.Highcharts ? ya(16, !0) : ha = na.Highcharts = {}; Ja = function (a, b, c) {
    if (!w(b) || isNaN(b)) return "Invalid date"; a = l(a, "%Y-%m-%d %H:%M:%S"); var d = new ta(b - Oa), e, f = d[tb](), g = d[ub](), h = d[Ta](), k = d[ib](), n = d[jb](), m = ga.lang, r = m.weekdays, d = q({ a: r[g].substr(0, 3), A: r[g], d: y(h), e: h,
        b: m.shortMonths[k], B: m.months[k], m: y(k + 1), y: n.toString().substr(2, 2), Y: n, H: y(f), I: y(f % 12 || 12), l: f % 12 || 12, M: y(d[sb]()), p: 12 > f ? "AM" : "PM", P: 12 > f ? "am" : "pm", S: y(d.getSeconds()), L: y(I(b % 1E3), 3)
    }, ha.dateFormats); for (e in d) for (; -1 !== a.indexOf("%" + e); ) a = a.replace("%" + e, "function" === typeof d[e] ? d[e](b) : d[e]); return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
}; ya = function (a, b) { var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a; if (b) throw c; na.console && console.log(c) }; ca = { millisecond: 1, second: 1E3,
    minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 26784E5, year: 31556952E3
}; zb = { init: function (a, b, c) {
    b = b || ""; var d = a.shift, e = -1 < b.indexOf("C"), f = e ? 7 : 3, g; b = b.split(" "); c = [].concat(c); var h, k, n = function (a) { for (g = a.length; g--; ) "M" === a[g] && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]) }; e && (n(b), n(c)); a.isArea && (h = b.splice(b.length - 6, 6), k = c.splice(c.length - 6, 6)); if (d <= c.length / f && b.length === c.length) for (; d--; ) c = [].concat(c).splice(0, f).concat(c); a.shift = 0; if (b.length) for (a = c.length; b.length < a; ) d = [].concat(b).splice(b.length -
f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d); h && (b = b.concat(h), c = c.concat(k)); return [b, c]
}, step: function (a, b, c, d) { var e = [], f = a.length; if (1 === c) e = d; else if (f === b.length && 1 > c) for (; f--; ) d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d; else e = b; return e }
}; (function (a) {
    na.HighchartsAdapter = na.HighchartsAdapter || a && { init: function (b) {
        var c = a.fx; a.extend(a.easing, { easeOutQuad: function (a, b, c, g, h) { return -g * (b /= h) * (b - 2) + c } }); a.each(["cur", "_default", "width", "height", "opacity"], function (b,
e) { var f = c.step, g; "cur" === e ? f = c.prototype : "_default" === e && a.Tween && (f = a.Tween.propHooks[e], e = "set"); (g = f[e]) && (f[e] = function (a) { var c; a = b ? a : this; if ("align" !== a.prop) return c = a.elem, c.attr ? c.attr(a.prop, "cur" === e ? D : a.now) : g.apply(this, arguments) }) }); s(a.cssHooks.opacity, "get", function (a, b, c) { return b.attr ? b.opacity || 0 : a.call(this, b, c) }); this.addAnimSetter("d", function (a) { var c = a.elem, f; a.started || (f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0); c.attr("d", b.step(a.start, a.end, a.pos, c.toD)) });
        this.each = Array.prototype.forEach ? function (a, b) { return Array.prototype.forEach.call(a, b) } : function (a, b) { var c, g = a.length; for (c = 0; c < g; c++) if (!1 === b.call(a[c], a[c], c, a)) return c }; a.fn.highcharts = function () { var a = "Chart", b = arguments, c, g; this[0] && (V(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), c = b[0], c !== D && (c.chart = c.chart || {}, c.chart.renderTo = this[0], new ha[a](c, b[1]), g = this), c === D && (g = sa[L(this[0], "data-highcharts-chart")])); return g }
    }, addAnimSetter: function (b, c) {
        a.Tween ? a.Tween.propHooks[b] =
{ set: c} : a.fx.step[b] = c
    }, getScript: a.getScript, inArray: a.inArray, adapterRun: function (b, c) { return a(b)[c]() }, grep: a.grep, map: function (a, c) { for (var d = [], e = 0, f = a.length; e < f; e++) d[e] = c.call(a[e], a[e], e, a); return d }, offset: function (b) { return a(b).offset() }, addEvent: function (b, c, d) { a(b).bind(c, d) }, removeEvent: function (b, c, d) { var e = Z.removeEventListener ? "removeEventListener" : "detachEvent"; Z[e] && b && !b[e] && (b[e] = function () { }); a(b).unbind(c, d) }, fireEvent: function (b, c, d, e) {
        var f = a.Event(c), g = "detached" + c, h; !Na &&
d && (delete d.layerX, delete d.layerY, delete d.returnValue); q(f, d); b[c] && (b[g] = b[c], b[c] = null); a.each(["preventDefault", "stopPropagation"], function (a, b) { var c = f[b]; f[b] = function () { try { c.call(f) } catch (a) { "preventDefault" === b && (h = !0) } } }); a(b).trigger(f); b[g] && (b[c] = b[g], b[g] = null); !e || f.isDefaultPrevented() || h || e(f)
    }, washMouseEvent: function (a) { var c = a.originalEvent || a; c.pageX === D && (c.pageX = a.pageX, c.pageY = a.pageY); return c }, animate: function (b, c, d) {
        var e = a(b); b.style || (b.style = {}); c.d && (b.toD = c.d, c.d =
1); e.stop(); c.opacity !== D && b.attr && (c.opacity += "px"); b.hasAnim = 1; e.animate(c, d)
    }, stop: function (b) { b.hasAnim && a(b).stop() }
    }
})(na.jQuery); var lb = na.HighchartsAdapter, Da = lb || {}; lb && lb.init.call(lb, zb); var mb = Da.adapterRun, Va = Da.inArray, v = Da.each, nb = Da.grep, ec = Da.offset, Ga = Da.map, aa = Da.addEvent, pa = Da.removeEvent, ka = Da.fireEvent, fc = Da.washMouseEvent, Sb = Da.animate, cb = Da.stop, Ab = { enabled: !0, x: 0, y: 15, style: { color: "#606060", cursor: "default", fontSize: "11px"} }; ga = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #8085e8 #8d4653 #91e8e1".split(" "),
    symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: "," }, global: { useUTC: !0, canvasToolsURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.0.4/modules/canvas-tools.js",
        VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.0.4/gfx/vml-radial-gradient.png"
    }, chart: { borderColor: "#4572A7", borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], backgroundColor: "#FFFFFF", plotBorderColor: "#C0C0C0", resetZoomButton: { theme: { zIndex: 20 }, position: { align: "right", x: -10, y: 10}} }, title: { text: "Chart title", align: "center", margin: 15, style: { color: "#333333", fontSize: "18px"} }, subtitle: { text: "", align: "center", style: { color: "#555555"} },
    plotOptions: { line: { allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, lineWidth: 2, marker: { lineWidth: 0, radius: 4, lineColor: "#FFFFFF", states: { hover: { enabled: !0, lineWidthPlus: 1, radiusPlus: 2 }, select: { fillColor: "#FFFFFF", lineColor: "#000000", lineWidth: 2}} }, point: { events: {} }, dataLabels: u(Ab, { align: "center", enabled: !1, formatter: function () { return null === this.y ? "" : B(this.y, -1) }, verticalAlign: "bottom", y: 0 }), cropThreshold: 300, pointRange: 0, states: { hover: { lineWidthPlus: 1, marker: {}, halo: { size: 10,
        opacity: .25
    }
    }, select: { marker: {} }
    }, stickyTracking: !0, turboThreshold: 1E3
    }
    }, labels: { style: { position: "absolute", color: "#3E576F"} }, legend: { enabled: !0, align: "center", layout: "horizontal", labelFormatter: function () { return this.name }, borderColor: "#909090", borderRadius: 0, navigation: { activeColor: "#274b6d", inactiveColor: "#CCC" }, shadow: !1, itemStyle: { color: "#333333", fontSize: "12px", fontWeight: "bold" }, itemHoverStyle: { color: "#000" }, itemHiddenStyle: { color: "#CCC" }, itemCheckboxStyle: { position: "absolute", width: "13px",
        height: "13px"
    }, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold"} }
    }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "white", opacity: .5, textAlign: "center"} }, tooltip: { enabled: !0, animation: va, backgroundColor: "rgba(249, 249, 249, .85)", borderWidth: 1, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y",
        week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y"
    }, headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>', pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>', shadow: !0, snap: ab ? 25 : 10, style: { color: "#333333", cursor: "default", fontSize: "12px", padding: "8px", whiteSpace: "nowrap" }
    }, credits: { enabled: !0, text: "", href: "#", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#909090",
        fontSize: "9px"
    }
    }
}; var Y = ga.plotOptions, db = Y.line; Jb(); var gc = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, hc = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, ic = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, Ka = function (a) {
    var b = [], c, d; (function (a) {
        a && a.stops ? d = Ga(a.stops, function (a) { return Ka(a[1]) }) : (c = gc.exec(a)) ? b = [A(c[1]), A(c[2]), A(c[3]), parseFloat(c[4], 10)] : (c = hc.exec(a)) ? b = [A(c[1], 16), A(c[2], 16), A(c[3], 16), 1] : (c = ic.exec(a)) &&
(b = [A(c[1]), A(c[2]), A(c[3]), 1])
    })(a); return { get: function (c) { var f; d ? (f = u(a), f.stops = [].concat(f.stops), v(d, function (a, b) { f.stops[b] = [f.stops[b][0], a.get(c)] })) : f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : "a" === c ? b[3] : "rgba(" + b.join(",") + ")" : a; return f }, brighten: function (a) { if (d) v(d, function (b) { b.brighten(a) }); else if (P(a) && 0 !== a) { var c; for (c = 0; 3 > c; c++) b[c] += A(255 * a), 0 > b[c] && (b[c] = 0), 255 < b[c] && (b[c] = 255) } return this }, rgba: b, setOpacity: function (a) { b[3] = a; return this } }
}; X.prototype =
{ opacity: 1, textProps: "fontSize fontWeight fontFamily color lineHeight width textDecoration textShadow HcTextStroke".split(" "), init: function (a, b) { this.element = "span" === b ? ba(b) : Z.createElementNS("http://www.w3.org/2000/svg", b); this.renderer = a }, animate: function (a, b, c) { b = l(b, Ca, !0); cb(this); b ? (b = u(b, {}), c && (b.complete = c), Sb(this, a, b)) : (this.attr(a), c && c()); return this }, colorGradient: function (a, b, c) {
    var d = this.renderer, e, f, g, h, k, n, m, r, t, x, z = []; a.linearGradient ? f = "linearGradient" : a.radialGradient && (f =
"radialGradient"); if (f) {
        g = a[f]; h = d.gradients; n = a.stops; t = c.radialReference; ea(g) && (a[f] = g = { x1: g[0], y1: g[1], x2: g[2], y2: g[3], gradientUnits: "userSpaceOnUse" }); "radialGradient" === f && t && !w(g.gradientUnits) && (g = u(g, { cx: t[0] - t[2] / 2 + g.cx * t[2], cy: t[1] - t[2] / 2 + g.cy * t[2], r: g.r * t[2], gradientUnits: "userSpaceOnUse" })); for (x in g) "id" !== x && z.push(x, g[x]); for (x in n) z.push(n[x]); z = z.join(","); h[z] ? a = h[z].attr("id") : (g.id = a = "highcharts-" + yb++, h[z] = k = d.createElement(f).attr(g).add(d.defs), k.stops = [], v(n, function (a) {
            0 ===
a[1].indexOf("rgba") ? (e = Ka(a[1]), m = e.get("rgb"), r = e.get("a")) : (m = a[1], r = 1); a = d.createElement("stop").attr({ offset: a[0], "stop-color": m, "stop-opacity": r }).add(k); k.stops.push(a)
        })); c.setAttribute(b, "url(" + d.url + "#" + a + ")")
    }
}, attr: function (a, b) {
    var c, d, e = this.element, f, g = this, h; "string" === typeof a && b !== D && (c = a, a = {}, a[c] = b); if ("string" === typeof a) g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
        for (c in a) d = a[c], h = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) &&
(f || (this.symbolAttr(a), f = !0), h = !0), !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0), h || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d); this.doTransform && (this.updateTransform(), this.doTransform = !1)
    } return g
}, updateShadows: function (a, b) { for (var c = this.shadows, d = c.length; d--; ) c[d].setAttribute(a, "height" === a ? G(b - (c[d].cutHeight || 0), 0) : "d" === a ? this.d : b) }, addClass: function (a) {
    var b = this.element,
c = L(b, "class") || ""; -1 === c.indexOf(a) && L(b, "class", c + " " + a); return this
}, symbolAttr: function (a) { var b = this; v("x y r start end width height innerR anchorX anchorY".split(" "), function (c) { b[c] = l(a[c], b[c]) }); b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) }) }, clip: function (a) { return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none") }, crisp: function (a) {
    var b, c = {}, d, e = a.strokeWidth || this.strokeWidth || 0; d = I(e) % 2 / 2; a.x = fa(a.x || this.x || 0) + d; a.y = fa(a.y || this.y || 0) +
d; a.width = fa((a.width || this.width || 0) - 2 * d); a.height = fa((a.height || this.height || 0) - 2 * d); a.strokeWidth = e; for (b in a) this[b] !== a[b] && (this[b] = c[b] = a[b]); return c
}, css: function (a) {
    var b = this.styles, c = {}, d = this.element, e, f, g = ""; e = !b; a && a.color && (a.fill = a.color); if (b) for (f in a) a[f] !== b[f] && (c[f] = a[f], e = !0); if (e) {
        e = this.textWidth = a && a.width && "text" === d.nodeName.toLowerCase() && A(a.width); b && (a = q(b, c)); this.styles = a; e && (Ba || !va && this.renderer.forExport) && delete a.width; if (Na && !va) N(this.element, a); else {
            b =
function (a, b) { return "-" + b.toLowerCase() }; for (f in a) g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";"; L(d, "style", g)
        } e && this.added && this.renderer.buildText(this)
    } return this
}, on: function (a, b) { var c = this, d = c.element; $a && "click" === a ? (d.ontouchstart = function (a) { c.touchEventFired = ta.now(); a.preventDefault(); b.call(d, a) }, d.onclick = function (a) { (-1 === Ma.indexOf("Android") || 1100 < ta.now() - (c.touchEventFired || 0)) && b.call(d, a) }) : d["on" + a] = b; return this }, setRadialReference: function (a) { this.element.radialReference = a; return this },
    translate: function (a, b) { return this.attr({ translateX: a, translateY: b }) }, invert: function () { this.inverted = !0; this.updateTransform(); return this }, updateTransform: function () {
        var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation, g = this.element; e && (a += this.attr("width"), b += this.attr("height")); a = ["translate(" + a + "," + b + ")"]; e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")"); (w(c) || w(d)) &&
a.push("scale(" + l(c, 1) + " " + l(d, 1) + ")"); a.length && g.setAttribute("transform", a.join(" "))
    }, toFront: function () { var a = this.element; a.parentNode.appendChild(a); return this }, align: function (a, b, c) {
        var d, e, f, g, h = {}; e = this.renderer; f = e.alignedObjects; if (a) { if (this.alignOptions = a, this.alignByTranslate = b, !c || V(c)) this.alignTo = d = c || "renderer", E(f, this), f.push(this), c = null } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo; c = l(c, e[d], e); d = a.align; e = a.verticalAlign; f = (c.x || 0) + (a.x || 0); g = (c.y || 0) +
(a.y || 0); if ("right" === d || "center" === d) f += (c.width - (a.width || 0)) / { right: 1, center: 2}[d]; h[b ? "translateX" : "x"] = I(f); if ("bottom" === e || "middle" === e) g += (c.height - (a.height || 0)) / ({ bottom: 1, middle: 2}[e] || 1); h[b ? "translateY" : "y"] = I(g); this[this.placed ? "animate" : "attr"](h); this.placed = !0; this.alignAttr = h; return this
    }, getBBox: function () {
        var a = this.bBox, b = this.renderer, c, d, e = this.rotation; c = this.element; var f = this.styles, g = e * Pa; d = this.textStr; var h; if ("" === d || dc.test(d)) h = "num." + d.toString().length + (f ? "|" + f.fontSize +
"|" + f.fontFamily : ""); h && (a = b.cache[h]); if (!a) { if ("http://www.w3.org/2000/svg" === c.namespaceURI || b.forExport) { try { a = c.getBBox ? q({}, c.getBBox()) : { width: c.offsetWidth, height: c.offsetHeight} } catch (k) { } if (!a || 0 > a.width) a = { width: 0, height: 0} } else a = this.htmlGetBBox(); b.isSVG && (c = a.width, d = a.height, Na && f && "11px" === f.fontSize && "16.9" === d.toPrecision(3) && (a.height = d = 14), e && (a.width = ia(d * xa(g)) + ia(c * wa(g)), a.height = ia(d * wa(g)) + ia(c * xa(g)))); this.bBox = a; h && (b.cache[h] = a) } return a
    }, show: function (a) {
        a && "http://www.w3.org/2000/svg" ===
this.element.namespaceURI ? this.element.removeAttribute("visibility") : this.attr({ visibility: a ? "inherit" : "visible" }); return this
    }, hide: function () { return this.attr({ visibility: "hidden" }) }, fadeOut: function (a) { var b = this; b.animate({ opacity: 0 }, { duration: a || 150, complete: function () { b.attr({ y: -9999 }) } }) }, add: function (a) {
        var b = this.renderer, c = a || b, d = c.element || b.box, e = this.element, f = this.zIndex, g, h; a && (this.parentGroup = a); this.parentInverted = a && a.inverted; void 0 !== this.textStr && b.buildText(this); f && (c.handleZ =
!0, f = A(f)); if (c.handleZ) for (a = d.childNodes, g = 0; g < a.length; g++) if (b = a[g], c = L(b, "zIndex"), b !== e && (A(c) > f || !w(f) && w(c))) { d.insertBefore(e, b); h = !0; break } h || d.appendChild(e); this.added = !0; if (this.onAdd) this.onAdd(); return this
    }, safeRemoveChild: function (a) { var b = a.parentNode; b && b.removeChild(a) }, destroy: function () {
        var a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup, e, f; b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null; cb(a); a.clipPath && (a.clipPath =
a.clipPath.destroy()); if (a.stops) { for (f = 0; f < a.stops.length; f++) a.stops[f] = a.stops[f].destroy(); a.stops = null } a.safeRemoveChild(b); for (c && v(c, function (b) { a.safeRemoveChild(b) }); d && d.div && 0 === d.div.childNodes.length; ) b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b; a.alignTo && E(a.renderer.alignedObjects, a); for (e in a) delete a[e]; return null
    }, shadow: function (a, b, c) {
        var d = [], e, f, g = this.element, h, k, n, m; if (a) {
            k = l(a.width, 3); n = (a.opacity || .15) / k; m = this.parentInverted ? "(-1,-1)" : "(" + l(a.offsetX, 1) +
", " + l(a.offsetY, 1) + ")"; for (e = 1; e <= k; e++) f = g.cloneNode(0), h = 2 * k + 1 - 2 * e, L(f, { isShadow: "true", stroke: a.color || "black", "stroke-opacity": n * e, "stroke-width": h, transform: "translate" + m, fill: "none" }), c && (L(f, "height", G(L(f, "height") - h, 0)), f.cutHeight = h), b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g), d.push(f); this.shadows = d
        } return this
    }, xGetter: function (a) { "circle" === this.element.nodeName && (a = { x: "cx", y: "cy"}[a] || a); return this._defaultGetter(a) }, _defaultGetter: function (a) {
        a = l(this[a], this.element ?
this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a
    }, dSetter: function (a, b, c) { a && a.join && (a = a.join(" ")); /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"); c.setAttribute(b, a); this[b] = a }, dashstyleSetter: function (a) {
        var b; if (a = a && a.toLowerCase()) {
            a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
            for (b = a.length; b--; ) a[b] = A(a[b]) * this["stroke-width"]; a = a.join(",").replace("NaN", "none"); this.element.setAttribute("stroke-dasharray", a)
        }
    }, alignSetter: function (a) { this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end"}[a]) }, opacitySetter: function (a, b, c) { this[b] = a; c.setAttribute(b, a) }, titleSetter: function (a) {
        var b = this.element.getElementsByTagName("title")[0]; b || (b = Z.createElementNS("http://www.w3.org/2000/svg", "title"), this.element.appendChild(b)); b.textContent = l(a, "").replace(/<[^>]*>/g,
"")
    }, textSetter: function (a) { a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this)) }, fillSetter: function (a, b, c) { "string" === typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c) }, zIndexSetter: function (a, b, c) { c.setAttribute(b, a); this[b] = a }, _defaultSetter: function (a, b, c) { c.setAttribute(b, a) }
}; X.prototype.yGetter = X.prototype.xGetter; X.prototype.translateXSetter = X.prototype.translateYSetter = X.prototype.rotationSetter = X.prototype.verticalAlignSetter = X.prototype.scaleXSetter =
X.prototype.scaleYSetter = function (a, b) { this[b] = a; this.doTransform = !0 }; X.prototype["stroke-widthSetter"] = X.prototype.strokeSetter = function (a, b, c) { this[b] = a; this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], X.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1) }; var za = function () { this.init.apply(this, arguments) }; za.prototype =
{ Element: X, init: function (a, b, c, d, e) {
    var f = location, g; d = this.createElement("svg").attr({ version: "1.1" }).css(this.getStyle(d)); g = d.element; a.appendChild(g); -1 === a.innerHTML.indexOf("xmlns") && L(g, "xmlns", "http://www.w3.org/2000/svg"); this.isSVG = !0; this.box = g; this.boxWrapper = d; this.alignedObjects = []; this.url = (Ya || xb) && Z.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : ""; this.createElement("desc").add().element.appendChild(Z.createTextNode("Created with Highcharts 4.0.4 /Highstock 2.0.4"));
    this.defs = this.createElement("defs").add(); this.forExport = e; this.gradients = {}; this.cache = {}; this.setSize(b, c, !1); var h; Ya && a.getBoundingClientRect && (this.subPixelFix = b = function () { N(a, { left: 0, top: 0 }); h = a.getBoundingClientRect(); N(a, { left: Ua(h.left) - h.left + "px", top: Ua(h.top) - h.top + "px" }) }, b(), aa(na, "resize", b))
}, getStyle: function (a) { return this.style = q({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a) }, isHidden: function () { return !this.boxWrapper.getBBox().width },
    destroy: function () { var a = this.defs; this.box = null; this.boxWrapper = this.boxWrapper.destroy(); la(this.gradients || {}); this.gradients = null; a && (this.defs = a.destroy()); this.subPixelFix && pa(na, "resize", this.subPixelFix); return this.alignedObjects = null }, createElement: function (a) { var b = new this.Element; b.init(this, a); return b }, draw: function () { }, buildText: function (a) {
        for (var b = a.element, c = this, d = c.forExport, e = l(a.textStr, "").toString(), f = -1 !== e.indexOf("<"), g = b.childNodes, h, k, n = L(b, "x"), m = a.styles, r = a.textWidth,
t = m && m.lineHeight, x = m && m.HcTextStroke, z = g.length, S = function (a) { return t ? A(t) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : m && m.fontSize || c.style.fontSize || 12, a).h }; z--; ) b.removeChild(g[z]); f || x || -1 !== e.indexOf(" ") ? (h = /<.*style="([^"]+)".*>/, k = /<.*href="(http[^"]+)".*>/, r && !a.added && this.box.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g,
"</span>").split(/<br.*?>/g) : [e], "" === e[e.length - 1] && e.pop(), v(e, function (e, f) {
    var g, t = 0; e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"); g = e.split("|||"); v(g, function (e) {
        if ("" !== e || 1 === g.length) {
            var x = {}, z = Z.createElementNS("http://www.w3.org/2000/svg", "tspan"), l; h.test(e) && (l = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), L(z, "style", l)); k.test(e) && !d && (L(z, "onclick", 'location.href="' + e.match(k)[1] + '"'), N(z, { cursor: "pointer" })); e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g,
"<").replace(/&gt;/g, ">"); if (" " !== e) {
                z.appendChild(Z.createTextNode(e)); t ? x.dx = 0 : f && null !== n && (x.x = n); L(z, x); b.appendChild(z); !t && f && (!va && d && N(z, { display: "block" }), L(z, "dy", S(z))); if (r) {
                    e = e.replace(/([^\^])-/g, "$1- ").split(" "); for (var x = 1 < g.length || 1 < e.length && "nowrap" !== m.whiteSpace, s, p, Tb = m.HcHeight, v = [], q = S(z), y = 1; x && (e.length || v.length); ) delete a.bBox, s = a.getBBox(), p = s.width, !va && c.forExport && (p = c.measureSpanWidth(z.firstChild.data, a.styles)), (s = p > r) && 1 !== e.length ? (z.removeChild(z.firstChild),
v.unshift(e.pop())) : (e = v, v = [], e.length && (y++, Tb && y * q > Tb ? (e = ["..."], a.attr("title", a.textStr)) : (z = Z.createElementNS("http://www.w3.org/2000/svg", "tspan"), L(z, { dy: q, x: n }), l && L(z, "style", l), b.appendChild(z))), p > r && (r = p)), e.length && z.appendChild(Z.createTextNode(e.join(" ").replace(/- /g, "-")))
                } t++
            }
        }
    })
})) : b.appendChild(Z.createTextNode(e))
    }, button: function (a, b, c, d, e, f, g, h, k) {
        var n = this.label(a, b, c, k, null, null, null, null, "button"), m = 0, r, t, x, z, S, l; a = { x1: 0, y1: 0, x2: 0, y2: 1 }; e = u({ "stroke-width": 1, stroke: "#CCCCCC",
            fill: { linearGradient: a, stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]] }, r: 2, padding: 5, style: { color: "black" }
        }, e); x = e.style; delete e.style; f = u(e, { stroke: "#68A", fill: { linearGradient: a, stops: [[0, "#FFF"], [1, "#ACF"]]} }, f); z = f.style; delete f.style; g = u(e, { stroke: "#68A", fill: { linearGradient: a, stops: [[0, "#9BD"], [1, "#CDF"]]} }, g); S = g.style; delete g.style; h = u(e, { style: { color: "#CCC"} }, h); l = h.style; delete h.style; aa(n.element, Na ? "mouseover" : "mouseenter", function () { 3 !== m && n.attr(f).css(z) }); aa(n.element, Na ? "mouseout" : "mouseleave",
function () { 3 !== m && (r = [e, f, g][m], t = [x, z, S][m], n.attr(r).css(t)) }); n.setState = function (a) { (n.state = m = a) ? 2 === a ? n.attr(g).css(S) : 3 === a && n.attr(h).css(l) : n.attr(e).css(x) }; return n.on("click", function () { 3 !== m && d.call(n) }).attr(e).css(q({ cursor: "default" }, x))
    }, crispLine: function (a, b) { a[1] === a[4] && (a[1] = a[4] = I(a[1]) - b % 2 / 2); a[2] === a[5] && (a[2] = a[5] = I(a[2]) + b % 2 / 2); return a }, path: function (a) { var b = { fill: "none" }; ea(a) ? b.d = a : H(a) && q(b, a); return this.createElement("path").attr(b) }, circle: function (a, b, c) {
        a = H(a) ?
a : { x: a, y: b, r: c }; b = this.createElement("circle"); b.xSetter = function (a) { this.element.setAttribute("cx", a) }; b.ySetter = function (a) { this.element.setAttribute("cy", a) }; return b.attr(a)
    }, arc: function (a, b, c, d, e, f) { H(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x); a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, { innerR: d || 0, start: e || 0, end: f || 0 }); a.r = c; return a }, rect: function (a, b, c, d, e, f) {
        e = H(a) ? a.r : e; var g = this.createElement("rect"); a = H(a) ? a : a === D ? {} : { x: a, y: b, width: G(c, 0), height: G(d, 0) }; f !== D && (a.strokeWidth =
f, a = g.crisp(a)); e && (a.r = e); g.rSetter = function (a) { L(this.element, { rx: a, ry: a }) }; return g.attr(a)
    }, setSize: function (a, b, c) { var d = this.alignedObjects, e = d.length; this.width = a; this.height = b; for (this.boxWrapper[l(c, !0) ? "animate" : "attr"]({ width: a, height: b }); e--; ) d[e].align() }, g: function (a) { var b = this.createElement("g"); return w(a) ? b.attr({ "class": "highcharts-" + a }) : b }, image: function (a, b, c, d, e) {
        var f = { preserveAspectRatio: "none" }; 1 < arguments.length && q(f, { x: b, y: c, width: d, height: e }); f = this.createElement("image").attr(f);
        f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a); return f
    }, symbol: function (a, b, c, d, e, f) {
        var g, h = this.symbols[a], h = h && h(I(b), I(c), d, e, f), k = /^url\((.*?)\)$/, n, m; h ? (g = this.path(h), q(g, { symbolName: a, x: b, y: c, width: d, height: e }), f && q(g, f)) : k.test(a) && (m = function (a, b) { a.element && (a.attr({ width: b[0], height: b[1] }), a.alignByTranslate || a.translate(I((d - b[0]) / 2), I((e - b[1]) / 2))) }, n = a.match(k)[1], a = Rb[n] || f && f.width && f.height && [f.width,
f.height], g = this.image(n).attr({ x: b, y: c }), g.isImg = !0, a ? m(g, a) : (g.attr({ width: 0, height: 0 }), ba("img", { onload: function () { m(g, Rb[n] = [this.width, this.height]) }, src: n }))); return g
    }, symbols: { circle: function (a, b, c, d) { var e = .166 * c; return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"] }, square: function (a, b, c, d) { return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"] }, triangle: function (a, b, c, d) { return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"] }, "triangle-down": function (a, b, c, d) {
        return ["M", a, b, "L", a + c,
b, a + c / 2, b + d, "Z"]
    }, diamond: function (a, b, c, d) { return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"] }, arc: function (a, b, c, d, e) { var f = e.start; c = e.r || c || d; var g = e.end - .001; d = e.innerR; var h = e.open, k = wa(f), n = xa(f), m = wa(g), g = xa(g); e = e.end - f < Fa ? 0 : 1; return ["M", a + c * k, b + c * n, "A", c, c, 0, e, 1, a + c * m, b + c * g, h ? "M" : "L", a + d * m, b + d * g, "A", d, d, 0, e, 0, a + d * k, b + d * n, h ? "" : "Z"] }, callout: function (a, b, c, d, e) {
        var f = T(e && e.r || 0, c, d), g = f + 6, h = e && e.anchorX, k = e && e.anchorY; e = I(e.strokeWidth || 0) % 2 / 2; a += e; b += e; e = ["M", a + f, b, "L", a + c - f, b, "C",
a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b]; h && h > c && k > b + g && k < b + d - g ? e.splice(13, 3, "L", a + c, k - 6, a + c + 6, k, a + c, k + 6, a + c, b + d - f) : h && 0 > h && k > b + g && k < b + d - g ? e.splice(33, 3, "L", a, k + 6, a - 6, k, a, k - 6, a, b + f) : k && k > d && h > a + g && h < a + c - g ? e.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : k && 0 > k && h > a + g && h < a + c - g && e.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b); return e
    }
    }, clipRect: function (a, b, c, d) {
        var e = "highcharts-" + yb++, f = this.createElement("clipPath").attr({ id: e }).add(this.defs);
        a = this.rect(a, b, c, d, 0).add(f); a.id = e; a.clipPath = f; return a
    }, text: function (a, b, c, d) { var e = Ba || !va && this.forExport, f = {}; if (d && !this.forExport) return this.html(a, b, c); f.x = Math.round(b || 0); c && (f.y = Math.round(c)); if (a || 0 === a) f.text = a; a = this.createElement("text").attr(f); e && a.css({ position: "absolute" }); d || (a.xSetter = function (a, b, c) { var d = c.getElementsByTagName("tspan"), e, f = c.getAttribute(b), t; for (t = 0; t < d.length; t++) e = d[t], e.getAttribute(b) === f && e.setAttribute(b, a); c.setAttribute(b, a) }); return a }, fontMetrics: function (a,
b) { a = a || this.style.fontSize; b && na.getComputedStyle && (b = b.element || b, a = na.getComputedStyle(b, "").fontSize); a = /px/.test(a) ? A(a) : /em/.test(a) ? 12 * parseFloat(a) : 12; var c = 24 > a ? a + 4 : I(1.2 * a), d = I(.8 * c); return { h: c, b: d, f: a} }, label: function (a, b, c, d, e, f, g, h, k) {
    function n() {
        var a, b; a = z.element.style; l = (void 0 === B || void 0 === O || x.styles.textAlign) && z.textStr && z.getBBox(); x.width = (B || l.width || 0) + 2 * p + y; x.height = (O || l.height || 0) + 2 * p; G = p + t.fontMetrics(a && a.fontSize, z).b; da && (S || (a = I(-s * p), b = h ? -G : 0, x.box = S = d ? t.symbol(d,
a, b, x.width, x.height, Ha) : t.rect(a, b, x.width, x.height, 0, Ha["stroke-width"]), S.attr("fill", "none").add(x)), S.isImg || S.attr(q({ width: I(x.width), height: I(x.height) }, Ha)), Ha = null)
    } function m() { var a = x.styles, a = a && a.textAlign, b = y + p * (1 - s), c; c = h ? 0 : G; w(B) && l && ("center" === a || "right" === a) && (b += { center: .5, right: 1}[a] * (B - l.width)); if (b !== z.x || c !== z.y) z.attr("x", b), c !== D && z.attr("y", c); z.x = b; z.y = c } function r(a, b) { S ? S.attr(a, b) : Ha[a] = b } var t = this, x = t.g(k), z = t.text("", 0, 0, g).attr({ zIndex: 1 }), S, l, s = 0, p = 3, y = 0, B, O,
C, F, J = 0, Ha = {}, G, da; x.onAdd = function () { z.add(x); x.attr({ text: a || 0 === a ? a : "", x: b, y: c }); S && w(e) && x.attr({ anchorX: e, anchorY: f }) }; x.widthSetter = function (a) { B = a }; x.heightSetter = function (a) { O = a }; x.paddingSetter = function (a) { w(a) && a !== p && (p = a, m()) }; x.paddingLeftSetter = function (a) { w(a) && a !== y && (y = a, m()) }; x.alignSetter = function (a) { s = { left: 0, center: .5, right: 1}[a] }; x.textSetter = function (a) { a !== D && z.textSetter(a); n(); m() }; x["stroke-widthSetter"] = function (a, b) { a && (da = !0); J = a % 2 / 2; r(b, a) }; x.strokeSetter = x.fillSetter =
x.rSetter = function (a, b) { "fill" === b && a && (da = !0); r(b, a) }; x.anchorXSetter = function (a, b) { e = a; r(b, a + J - C) }; x.anchorYSetter = function (a, b) { f = a; r(b, a - F) }; x.xSetter = function (a) { x.x = a; s && (a -= s * ((B || l.width) + p)); C = I(a); x.attr("translateX", C) }; x.ySetter = function (a) { F = x.y = I(a); x.attr("translateY", F) }; var R = x.css; return q(x, { css: function (a) { if (a) { var b = {}; a = u(a); v(x.textProps, function (c) { a[c] !== D && (b[c] = a[c], delete a[c]) }); z.css(b) } return R.call(x, a) }, getBBox: function () {
    return { width: l.width + 2 * p, height: l.height +
2 * p, x: l.x - p, y: l.y - p
    }
}, shadow: function (a) { S && S.shadow(a); return x }, destroy: function () { pa(x.element, "mouseenter"); pa(x.element, "mouseleave"); z && (z = z.destroy()); S && (S = S.destroy()); X.prototype.destroy.call(x); x = t = n = m = r = null }
})
}
}; Za = za; q(X.prototype, { htmlCss: function (a) { var b = this.element; if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform(); this.styles = q(this.styles, a); N(this.element, a); return this }, htmlGetBBox: function () {
    var a = this.element, b = this.bBox; b || ("text" ===
a.nodeName && (a.style.position = "absolute"), b = this.bBox = { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight }); return b
}, htmlUpdateTransform: function () {
    if (this.added) {
        var a = this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", h = { left: 0, center: .5, right: 1}[g], k = this.shadows; N(b, { marginLeft: c, marginTop: d }); k && v(k, function (a) { N(a, { marginLeft: c + 1, marginTop: d + 1 }) }); this.inverted && v(b.childNodes, function (c) {
            a.invertChild(c,
b)
        }); if ("SPAN" === b.tagName) { var n = this.rotation, m, r = A(this.textWidth), t = [n, g, b.innerHTML, this.textWidth].join(); t !== this.cTT && (m = a.fontMetrics(b.style.fontSize).b, w(n) && this.setSpanRotation(n, h, m), k = l(this.elemWidth, b.offsetWidth), k > r && /[ \-]/.test(b.textContent || b.innerText) && (N(b, { width: r + "px", display: "block", whiteSpace: "normal" }), k = r), this.getSpanCorrection(k, m, h, n, g)); N(b, { left: e + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px" }); xb && (m = b.offsetHeight); this.cTT = t }
    } else this.alignOnAdd = !0
}, setSpanRotation: function (a,
b, c) { var d = {}, e = Na ? "-ms-transform" : xb ? "-webkit-transform" : Ya ? "MozTransform" : Qb ? "-o-transform" : ""; d[e] = d.transform = "rotate(" + a + "deg)"; d[e + (Ya ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px"; N(this.element, d) }, getSpanCorrection: function (a, b, c) { this.xCorr = -a * c; this.yCorr = -b }
}); q(za.prototype, { html: function (a, b, c) {
    var d = this.createElement("span"), e = d.element, f = d.renderer; d.textSetter = function (a) { a !== e.innerHTML && delete this.bBox; e.innerHTML = this.textStr = a }; d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter =
function (a, b) { "align" === b && (b = "textAlign"); d[b] = a; d.htmlUpdateTransform() }; d.attr({ text: a, x: I(b), y: I(c) }).css({ position: "absolute", whiteSpace: "nowrap", fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); d.css = d.htmlCss; f.isSVG && (d.add = function (a) {
    var b, c = f.box.parentNode, n = []; if (this.parentGroup = a) {
        if (b = a.div, !b) {
            for (; a; ) n.push(a), a = a.parentGroup; v(n.reverse(), function (a) {
                var d; b = a.div = a.div || ba("div", { className: L(a.element, "class") }, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY ||
0) + "px"
                }, b || c); d = b.style; q(a, { translateXSetter: function (b, c) { d.left = b + "px"; a[c] = b; a.doTransform = !0 }, translateYSetter: function (b, c) { d.top = b + "px"; a[c] = b; a.doTransform = !0 }, visibilitySetter: function (a, b) { d[b] = a } })
            })
        }
    } else b = c; b.appendChild(e); d.added = !0; d.alignOnAdd && d.htmlUpdateTransform(); return d
}); return d
}
}); var eb, Qa; if (!va && !Ba) {
        Qa = { init: function (a, b) {
            var c = ["<", b, ' filled="f" stroked="f"'], d = ["position: ", "absolute", ";"], e = "div" === b; ("shape" === b || e) && d.push("left:0;top:0;width:1px;height:1px;");
            d.push("visibility: ", e ? "hidden" : "visible"); c.push(' style="', d.join(""), '"/>'); b && (c = e || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = ba(c)); this.renderer = a
        }, add: function (a) { var b = this.renderer, c = this.element, d = b.box, d = a ? a.element || a : d; a && a.inverted && b.invertChild(c, d); d.appendChild(c); this.added = !0; this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(); if (this.onAdd) this.onAdd(); return this }, updateTransform: X.prototype.htmlUpdateTransform, setSpanRotation: function () {
            var a =
this.rotation, b = wa(a * Pa), c = xa(a * Pa); N(this.element, { filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : "none" })
        }, getSpanCorrection: function (a, b, c, d, e) {
            var f = d ? wa(d * Pa) : 1, g = d ? xa(d * Pa) : 0, h = l(this.elemHeight, this.element.offsetHeight), k; this.xCorr = 0 > f && -a; this.yCorr = 0 > g && -h; k = 0 > f * g; this.xCorr += g * b * (k ? 1 - c : c); this.yCorr -= f * b * (d ? k ? c : 1 - c : 1); e && "left" !== e && (this.xCorr -= a * c * (0 > f ? -1 : 1), d && (this.yCorr -= h * c * (0 > g ? -1 : 1)), N(this.element,
{ textAlign: e }))
        }, pathToVML: function (a) { for (var b = a.length, c = []; b--; ) P(a[b]) ? c[b] = I(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1))); return c.join(" ") || "x" }, clip: function (a) { var b = this, c; a ? (c = a.members, E(c, b), c.push(b), b.destroyClip = function () { E(c, b) }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = { clip: kb ? "inherit" : "rect(auto)" }); return b.css(a) }, css: X.prototype.htmlCss, safeRemoveChild: function (a) {
            a.parentNode &&
Aa(a)
        }, destroy: function () { this.destroyClip && this.destroyClip(); return X.prototype.destroy.apply(this) }, on: function (a, b) { this.element["on" + a] = function () { var a = na.event; a.target = a.srcElement; b(a) }; return this }, cutOffPath: function (a, b) { var c; a = a.split(/[ ,]/); c = a.length; if (9 === c || 11 === c) a[c - 4] = a[c - 2] = A(a[c - 2]) - 10 * b; return a.join(" ") }, shadow: function (a, b, c) {
            var d = [], e, f = this.element, g = this.renderer, h, k = f.style, n, m = f.path, r, t, x, z; m && "string" !== typeof m.value && (m = "x"); t = m; if (a) {
                x = l(a.width, 3); z = (a.opacity ||
.15) / x; for (e = 1; 3 >= e; e++) r = 2 * x + 1 - 2 * e, c && (t = this.cutOffPath(m.value, r + .5)), n = ['<shape isShadow="true" strokeweight="', r, '" filled="false" path="', t, '" coordsize="10 10" style="', f.style.cssText, '" />'], h = ba(g.prepVML(n), null, { left: A(k.left) + l(a.offsetX, 1), top: A(k.top) + l(a.offsetY, 1) }), c && (h.cutOff = r + 1), n = ['<stroke color="', a.color || "black", '" opacity="', z * e, '"/>'], ba(g.prepVML(n), null, null, h), b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f), d.push(h); this.shadows = d
            } return this
        }, updateShadows: oa,
            setAttr: function (a, b) { kb ? this.element[a] = b : this.element.setAttribute(a, b) }, classSetter: function (a) { this.element.className = a }, dashstyleSetter: function (a, b, c) { (c.getElementsByTagName("stroke")[0] || ba(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid"; this[b] = a }, dSetter: function (a, b, c) { var d = this.shadows; a = a || []; this.d = a.join && a.join(" "); c.path = a = this.pathToVML(a); if (d) for (c = d.length; c--; ) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a; this.setAttr(b, a) }, fillSetter: function (a, b,
c) { var d = c.nodeName; "SPAN" === d ? c.style.color = a : "IMG" !== d && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this))) }, opacitySetter: oa, rotationSetter: function (a, b, c) { c = c.style; this[b] = c[b] = a; c.left = -I(xa(a * Pa) + 1) + "px"; c.top = I(wa(a * Pa)) + "px" }, strokeSetter: function (a, b, c) { this.setAttr("strokecolor", this.renderer.color(a, c, b)) }, "stroke-widthSetter": function (a, b, c) { c.stroked = !!a; this[b] = a; P(a) && (a += "px"); this.setAttr("strokeweight", a) }, titleSetter: function (a, b) { this.setAttr(b, a) },
            visibilitySetter: function (a, b, c) { "inherit" === a && (a = "visible"); this.shadows && v(this.shadows, function (c) { c.style[b] = a }); "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, kb || (c.style[b] = a ? "visible" : "hidden"), b = "top"); c.style[b] = a }, xSetter: function (a, b, c) { this[b] = a; "x" === b ? b = "left" : "y" === b && (b = "top"); this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a }, zIndexSetter: function (a, b, c) { c.style[b] = a }
        }; ha.VMLElement = Qa = Q(X, Qa); Qa.prototype.ySetter = Qa.prototype.widthSetter = Qa.prototype.heightSetter =
Qa.prototype.xSetter; var jc = { Element: Qa, isIE8: -1 < Ma.indexOf("MSIE 8.0"), init: function (a, b, c, d) {
    var e; this.alignedObjects = []; d = this.createElement("div").css(q(this.getStyle(d), { position: "relative" })); e = d.element; a.appendChild(d.element); this.isVML = !0; this.box = e; this.boxWrapper = d; this.cache = {}; this.setSize(b, c, !1); if (!Z.namespaces.hcv) {
        Z.namespaces.add("hcv", "urn:schemas-microsoft-com:vml"); try { Z.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } " } catch (f) {
            Z.styleSheets[0].cssText +=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
        }
    }
}, isHidden: function () { return !this.box.offsetWidth }, clipRect: function (a, b, c, d) {
    var e = this.createElement(), f = H(a); return q(e, { members: [], left: (f ? a.x : a) + 1, top: (f ? a.y : b) + 1, width: (f ? a.width : c) - 1, height: (f ? a.height : d) - 1, getCSS: function (a) {
        var b = a.element, c = b.nodeName; a = a.inverted; var d = this.top - ("shape" === c ? b.offsetTop : 0), e = this.left, b = e + this.width, f = d + this.height, d = { clip: "rect(" + I(a ? e : d) + "px," + I(a ?
f : b) + "px," + I(a ? b : f) + "px," + I(a ? d : e) + "px)"
        }; !a && kb && "DIV" === c && q(d, { width: b + "px", height: f + "px" }); return d
    }, updateClipping: function () { v(e.members, function (a) { a.element && a.css(e.getCSS(a)) }) }
    })
}, color: function (a, b, c, d) {
    var e = this, f, g = /^rgba/, h, k, n = "none"; a && a.linearGradient ? k = "gradient" : a && a.radialGradient && (k = "pattern"); if (k) {
        var m, r, t = a.linearGradient || a.radialGradient, x, z, S, l, p, s = ""; a = a.stops; var q, y = [], B = function () {
            h = ['<fill colors="' + y.join(",") + '" opacity="', S, '" o:opacity2="', z, '" type="', k, '" ',
s, 'focus="100%" method="any" />']; ba(e.prepVML(h), null, null, b)
        }; x = a[0]; q = a[a.length - 1]; 0 < x[0] && a.unshift([0, x[1]]); 1 > q[0] && a.push([1, q[1]]); v(a, function (a, b) { g.test(a[1]) ? (f = Ka(a[1]), m = f.get("rgb"), r = f.get("a")) : (m = a[1], r = 1); y.push(100 * a[0] + "% " + m); b ? (S = r, l = m) : (z = r, p = m) }); if ("fill" === c) if ("gradient" === k) c = t.x1 || t[0] || 0, a = t.y1 || t[1] || 0, x = t.x2 || t[2] || 0, t = t.y2 || t[3] || 0, s = 'angle="' + (90 - 180 * ja.atan((t - a) / (x - c)) / Fa) + '"', B(); else {
            var n = t.r, O = 2 * n, C = 2 * n, F = t.cx, w = t.cy, J = b.radialReference, D, n = function () {
                J &&
(D = d.getBBox(), F += (J[0] - D.x) / D.width - .5, w += (J[1] - D.y) / D.height - .5, O *= J[2] / D.width, C *= J[2] / D.height); s = 'src="' + ga.global.VMLRadialGradientURL + '" size="' + O + "," + C + '" origin="0.5,0.5" position="' + F + "," + w + '" color2="' + p + '" '; B()
            }; d.added ? n() : d.onAdd = n; n = l
        } else n = m
    } else g.test(a) && "IMG" !== b.tagName ? (f = Ka(a), h = ["<", c, ' opacity="', f.get("a"), '"/>'], ba(this.prepVML(h), null, null, b), n = f.get("rgb")) : (n = b.getElementsByTagName(c), n.length && (n[0].opacity = 1, n[0].type = "solid"), n = a); return n
}, prepVML: function (a) {
    var b =
this.isIE8; a = a.join(""); b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:"); return a
}, text: za.prototype.html, path: function (a) { var b = { coordsize: "10 10" }; ea(a) ? b.d = a : H(a) && q(b, a); return this.createElement("shape").attr(b) }, circle: function (a, b, c) {
    var d = this.symbol("circle"); H(a) &&
(c = a.r, b = a.y, a = a.x); d.isCircle = !0; d.r = c; return d.attr({ x: a, y: b })
}, g: function (a) { var b; a && (b = { className: "highcharts-" + a, "class": "highcharts-" + a }); return this.createElement("div").attr(b) }, image: function (a, b, c, d, e) { var f = this.createElement("img").attr({ src: a }); 1 < arguments.length && f.attr({ x: b, y: c, width: d, height: e }); return f }, createElement: function (a) { return "rect" === a ? this.symbol(a) : za.prototype.createElement.call(this, a) }, invertChild: function (a, b) {
    var c = this, d = b.style, e = "IMG" === a.tagName && a.style; N(a,
{ flip: "x", left: A(d.width) - (e ? A(e.top) : 1), top: A(d.height) - (e ? A(e.left) : 1), rotation: -90 }); v(a.childNodes, function (b) { c.invertChild(b, a) })
}, symbols: { arc: function (a, b, c, d, e) { var f = e.start, g = e.end, h = e.r || c || d; c = e.innerR; d = wa(f); var k = xa(f), n = wa(g), m = xa(g); if (0 === g - f) return ["x"]; f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * k, a + h * n, b + h * m]; e.open && !c && f.push("e", "M", a, b); f.push("at", a - c, b - c, a + c, b + c, a + c * n, b + c * m, a + c * d, b + c * k, "x", "e"); f.isArc = !0; return f }, circle: function (a, b, c, d, e) {
    e && (c = d = 2 * e.r); e && e.isCircle && (a -= c / 2,
b -= d / 2); return ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
}, rect: function (a, b, c, d, e) { return za.prototype.symbols[w(e) && e.r ? "callout" : "square"].call(0, a, b, c, d, e) }
}
}; ha.VMLRenderer = eb = function () { this.init.apply(this, arguments) }; eb.prototype = u(za.prototype, jc); Za = eb
    } za.prototype.measureSpanWidth = function (a, b) { var c = Z.createElement("span"), d; d = Z.createTextNode(a); c.appendChild(d); N(c, b); this.box.appendChild(c); d = c.offsetWidth; Aa(c); return d }; ra.prototype = { addLabel: function () {
        var a = this.axis, b = a.options,
c = a.chart, d = a.horiz, e = a.categories, f = a.names, g = this.pos, h = b.labels, k = h.rotation, n = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / n.length || !d && (c.margin[3] || .33 * c.chartWidth), m = g === n[0], r = g === n[n.length - 1], t, f = e ? l(e[g], f[g], g) : g, e = this.label, x = n.info; a.isDatetimeAxis && x && (t = b.dateTimeLabelFormats[x.higherRanks[g] || x.unitName]); this.isFirst = m; this.isLast = r; b = a.labelFormatter.call({ axis: a, chart: c, isFirst: m, isLast: r, dateTimeLabelFormat: t, value: a.isLog ? ma(M(f)) : f }); g = d && { width: G(1,
I(d - 2 * (h.padding || 10))) + "px"
}; w(e) ? e && e.attr({ text: b }).css(g) : (t = { align: a.labelAlign }, P(k) && (t.rotation = k), d && h.ellipsis && (g.HcHeight = a.len / n.length), this.label = e = w(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(t).css(q(g, h.style)).add(a.labelGroup) : null, a.tickBaseline = c.renderer.fontMetrics(h.style.fontSize, e).b, k && 2 === a.side && (a.tickBaseline *= wa(k * Pa))); this.yOffset = e ? l(h.y, a.tickBaseline + (2 === a.side ? 8 : -(e.getBBox().height / 2))) : 0
    }, getLabelSize: function () {
        var a = this.label, b = this.axis; return a ?
a.getBBox()[b.horiz ? "height" : "width"] : 0
    }, getLabelSides: function () { var a = this.label.getBBox(), b = this.axis, c = b.horiz, d = b.options.labels, a = c ? a.width : a.height, b = c ? d.x - a * { left: 0, center: .5, right: 1}[b.labelAlign] : 0; return [b, c ? a + b : a] }, handleOverflow: function (a, b) {
        var c = !0, d = this.axis, e = this.isFirst, f = this.isLast, g = d.horiz ? b.x : b.y, h = d.reversed, k = d.tickPositions, n = this.getLabelSides(), m = n[0], n = n[1], r, t, x, z = this.label.line; r = z || 0; t = d.labelEdge; x = d.justifyLabels && (e || f); t[r] === D || g + m > t[r] ? t[r] = g + n : x || (c = !1);
        if (x) { r = (t = d.justifyToPlot) ? d.pos : 0; t = t ? r + d.len : d.chart.chartWidth; do a += e ? 1 : -1, x = d.ticks[k[a]]; while (k[a] && (!x || !x.label || x.label.line !== z)); d = x && x.label.xy && x.label.xy.x + x.getLabelSides()[e ? 0 : 1]; e && !h || f && h ? g + m < r && (g = r - m, x && g + n > d && (c = !1)) : g + n > t && (g = t - n, x && g + m < d && (c = !1)); b.x = g } return c
    }, getPosition: function (a, b, c, d) {
        var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight; return { x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right -
e.left : 0), y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
        }
    }, getLabelPosition: function (a, b, c, d, e, f, g, h) { var k = this.axis, n = k.transA, m = k.reversed, r = k.staggerLines; a = a + e.x - (f && d ? f * n * (m ? -1 : 1) : 0); b = b + this.yOffset - (f && !d ? f * n * (m ? 1 : -1) : 0); r && (c.line = g / (h || 1) % r, b += k.labelOffset / r * c.line); return { x: a, y: b} }, getMarkPath: function (a, b, c, d, e, f) { return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d) }, render: function (a, b, c) {
        var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz,
h = this.type, k = this.label, n = this.pos, m = e.labels, r = this.gridLine, t = h ? h + "Grid" : "grid", x = h ? h + "Tick" : "tick", z = e[t + "LineWidth"], S = e[t + "LineColor"], p = e[t + "LineDashStyle"], s = e[x + "Length"], t = e[x + "Width"] || 0, v = e[x + "Color"], q = e[x + "Position"], x = this.mark, y = m.step, B = !0, O = d.tickmarkOffset, C = this.getPosition(g, n, O, b), F = C.x, C = C.y, w = g && F === d.pos + d.len || !g && C === d.pos ? -1 : 1; c = l(c, 1); this.isActive = !0; if (z && (n = d.getPlotLinePath(n + O, z * w, b, !0), r === D && (r = { stroke: S, "stroke-width": z }, p && (r.dashstyle = p), h || (r.zIndex = 1), b && (r.opacity =
0), this.gridLine = r = z ? f.path(n).attr(r).add(d.gridGroup) : null), !b && r && n)) r[this.isNew ? "attr" : "animate"]({ d: n, opacity: c }); t && s && ("inside" === q && (s = -s), d.opposite && (s = -s), h = this.getMarkPath(F, C, s, t * w, g, f), x ? x.animate({ d: h, opacity: c }) : this.mark = f.path(h).attr({ stroke: v, "stroke-width": t, opacity: c }).add(d.axisGroup)); k && !isNaN(F) && (k.xy = C = this.getLabelPosition(F, C, k, g, m, O, a, y), this.isFirst && !this.isLast && !l(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !l(e.showLastLabel, 1) ? B = !1 : d.isRadial || m.step || m.rotation ||
b || 0 === c || (B = this.handleOverflow(a, C)), y && a % y && (B = !1), B && !isNaN(C.y) ? (C.opacity = c, k[this.isNew ? "attr" : "animate"](C), this.isNew = !1) : k.attr("y", -9999))
    }, destroy: function () { la(this, this.axis) }
    }; ha.PlotLineOrBand = function (a, b) { this.axis = a; b && (this.options = b, this.id = b.id) }; ha.PlotLineOrBand.prototype = { render: function () {
        var a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, k = e.to, n = e.from, m = w(n) && w(k), r = e.value, t = e.dashStyle, x = a.svgElem, z = [], S, l = e.color, p = e.zIndex,
s = e.events, v = {}, q = b.chart.renderer; b.isLog && (n = R(n), k = R(k), r = R(r)); if (h) z = b.getPlotLinePath(r, h), v = { stroke: l, "stroke-width": h }, t && (v.dashstyle = t); else if (m) n = G(n, b.min - d), k = T(k, b.max + d), z = b.getPlotBandPath(n, k, e), l && (v.fill = l), e.borderWidth && (v.stroke = e.borderColor, v["stroke-width"] = e.borderWidth); else return; w(p) && (v.zIndex = p); if (x) z ? x.animate({ d: z }, null, x.onGetPath) : (x.hide(), x.onGetPath = function () { x.show() }, g && (a.label = g = g.destroy())); else if (z && z.length && (a.svgElem = x = q.path(z).attr(v).add(), s)) for (S in d =
function (b) { x.on(b, function (c) { s[b].apply(a, [c]) }) }, s) d(S); f && w(f.text) && z && z.length && 0 < b.width && 0 < b.height ? (f = u({ align: c && m && "center", x: c ? !m && 4 : 10, verticalAlign: !c && m && "middle", y: c ? m ? 16 : 10 : m ? 6 : -4, rotation: c && !m && 90 }, f), g || (v = { align: f.textAlign || f.align, rotation: f.rotation }, w(p) && (v.zIndex = p), a.label = g = q.text(f.text, 0, 0, f.useHTML).attr(v).css(f.style).add()), b = [z[1], z[4], m ? z[6] : z[1]], m = [z[2], z[5], m ? z[7] : z[2]], z = J(b), c = J(m), g.align(f, !1, { x: z, y: c, width: da(b) - z, height: da(m) - c }), g.show()) : g && g.hide();
        return a
    }, destroy: function () { E(this.axis.plotLinesAndBands, this); delete this.axis; la(this) }
    }; $.prototype = { defaultOptions: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" }, endOnTick: !1, gridLineColor: "#C0C0C0", labels: Ab, lineColor: "#C0D0E0", lineWidth: 1, minPadding: .01, maxPadding: .01, minorGridLineColor: "#E0E0E0", minorGridLineWidth: 1, minorTickColor: "#A0A0A0", minorTickLength: 2, minorTickPosition: "outside", startOfWeek: 1,
        startOnTick: !1, tickColor: "#C0D0E0", tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100, tickPosition: "outside", tickWidth: 1, title: { align: "middle", style: { color: "#707070"} }, type: "linear"
    }, defaultYAxisOptions: { endOnTick: !0, gridLineWidth: 1, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8, y: 3 }, lineWidth: 0, maxPadding: .05, minPadding: .05, startOnTick: !0, tickWidth: 0, title: { rotation: 270, text: "Values" }, stackLabels: { enabled: !1, formatter: function () { return B(this.total, -1) }, style: Ab.style} }, defaultLeftAxisOptions: { labels: { x: -15,
        y: null
    }, title: { rotation: 270 }
    }, defaultRightAxisOptions: { labels: { x: 15, y: null }, title: { rotation: 90} }, defaultBottomAxisOptions: { labels: { x: 0, y: null }, title: { rotation: 0} }, defaultTopAxisOptions: { labels: { x: 0, y: -15 }, title: { rotation: 0} }, init: function (a, b) {
        var c = b.isX; this.horiz = a.inverted ? !c : c; this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis"; this.opposite = b.opposite; this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3); this.setOptions(b); var d = this.options, e = d.type; this.labelFormatter = d.labels.formatter ||
this.defaultLabelFormatter; this.userOptions = b; this.minPixelPadding = 0; this.chart = a; this.reversed = d.reversed; this.zoomEnabled = !1 !== d.zoomEnabled; this.categories = d.categories || "category" === e; this.names = []; this.isLog = "logarithmic" === e; this.isDatetimeAxis = "datetime" === e; this.isLinked = w(d.linkedTo); this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement && 1 === l(d.tickInterval, 1) ? .5 : 0; this.ticks = {}; this.labelEdge = []; this.minorTicks = {}; this.plotLinesAndBands = []; this.alternateBands = {}; this.len =
0; this.minRange = this.userMinRange = d.minRange || d.maxZoom; this.range = d.range; this.offset = d.offset || 0; this.stacks = {}; this.oldStacks = {}; this.min = this.max = null; this.crosshair = l(d.crosshair, W(a.options.tooltip.crosshairs)[c ? 0 : 1], !1); var f, d = this.options.events; -1 === Va(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this)); this.series = this.series || []; a.inverted && c && this.reversed === D && (this.reversed = !0); this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
        for (f in d) aa(this, f, d[f]); this.isLog && (this.val2lin = R, this.lin2val = M)
    }, setOptions: function (a) { this.options = u(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], u(ga[this.coll], a)) }, defaultLabelFormatter: function () {
        var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = ga.lang.numericSymbols, f = e && e.length, g, h = a.options.labels.format, a = a.isLog ? b :
a.tickInterval; if (h) g = p(h, this); else if (c) g = b; else if (d) g = Ja(d, b); else if (f && 1E3 <= a) for (; f-- && g === D; ) c = Math.pow(1E3, f + 1), a >= c && null !== e[f] && (g = B(b / c, -1) + e[f]); g === D && (g = 1E4 <= ia(b) ? B(b, 0) : B(b, -1, D, "")); return g
    }, getSeriesExtremes: function () {
        var a = this, b = a.chart; a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null; a.buildStacks && a.buildStacks(); v(a.series, function (c) {
            if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                var d; d = c.options.threshold; var e; a.hasVisibleSeries =
!0; a.isLog && 0 >= d && (d = null); a.isXAxis ? (d = c.xData, d.length && (a.dataMin = T(l(a.dataMin, d[0]), J(d)), a.dataMax = G(l(a.dataMax, d[0]), da(d)))) : (c.getExtremes(), e = c.dataMax, c = c.dataMin, w(c) && w(e) && (a.dataMin = T(l(a.dataMin, c), c), a.dataMax = G(l(a.dataMax, e), e)), w(d) && (a.dataMin >= d ? (a.dataMin = d, a.ignoreMinPadding = !0) : a.dataMax < d && (a.dataMax = d, a.ignoreMaxPadding = !0)))
            }
        })
    }, translate: function (a, b, c, d, e, f) {
        var g = 1, h = 0, k = d ? this.oldTransA : this.transA; d = d ? this.oldMin : this.min; var n = this.minPixelPadding; e = (this.options.ordinal ||
this.isLog && e) && this.lin2val; k || (k = this.transA); c && (g *= -1, h = this.len); this.reversed && (g *= -1, h -= g * (this.sector || this.len)); b ? (a = a * g + h - n, a = a / k + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)), "between" === f && (f = .5), a = g * (a - d) * k + h + g * n + (P(f) ? k * f * this.pointRange : 0)); return a
    }, toPixels: function (a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) }, toValue: function (a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) }, getPlotLinePath: function (a, b, c, d, e) {
        var f = this.chart, g = this.left,
h = this.top, k, n, m = c && f.oldChartHeight || f.chartHeight, r = c && f.oldChartWidth || f.chartWidth, t; k = this.transB; e = l(e, this.translate(a, null, null, c)); a = c = I(e + k); k = n = I(m - e - k); if (isNaN(e)) t = !0; else if (this.horiz) { if (k = h, n = m - this.bottom, a < g || a > g + this.width) t = !0 } else if (a = g, c = r - this.right, k < h || k > h + this.height) t = !0; return t && !d ? null : f.renderer.crispLine(["M", a, k, "L", c, n], b || 1)
    }, getLinearTickPositions: function (a, b, c) {
        var d, e = ma(fa(b / a) * a), f = ma(Ua(c / a) * a), g = []; if (b === c && P(b)) return [b]; for (b = e; b <= f; ) {
            g.push(b); b = ma(b +
a); if (b === d) break; d = b
        } return g
    }, getMinorTickPositions: function () { var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e; if (this.isLog) for (e = b.length, a = 1; a < e; a++) d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max, a.startOfWeek)), d[0] < this.min && d.shift(); else for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c) d.push(b); return d }, adjustForMinRange: function () {
        var a =
this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, h, k, n; this.isXAxis && this.minRange === D && !this.isLog && (w(a.min) || w(a.max) ? this.minRange = null : (v(this.series, function (a) { k = a.xData; for (g = n = a.xIncrement ? 1 : k.length - 1; 0 < g; g--) if (h = k[g] - k[g - 1], f === D || h < f) f = h }), this.minRange = T(5 * f, this.dataMax - this.dataMin))); if (c - b < this.minRange) {
            var m = this.minRange; d = (m - c + b) / 2; d = [b - d, l(a.min, b - d)]; e && (d[2] = this.dataMin); b = da(d); c = [b + m, l(a.max, b + m)]; e && (c[2] = this.dataMax); c = J(c); c - b < m &&
(d[0] = c - m, d[1] = l(a.min, c - m), b = da(d))
        } this.min = b; this.max = c
    }, setAxisTranslation: function (a) {
        var b = this, c = b.max - b.min, d = b.axisPointRange || 0, e, f = 0, g = 0, h = b.linkedParent, k = !!b.categories, n = b.transA; if (b.isXAxis || k || d) h ? (f = h.minPointOffset, g = h.pointRangePadding) : v(b.series, function (a) { var h = k ? 1 : b.isXAxis ? a.pointRange : b.axisPointRange || 0, n = a.options.pointPlacement, x = a.closestPointRange; h > c && (h = 0); d = G(d, h); f = G(f, V(n) ? 0 : h / 2); g = G(g, "on" === n ? 0 : h); !a.noSharedTooltip && w(x) && (e = w(e) ? T(e, x) : x) }), h = b.ordinalSlope &&
e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = T(d, c), b.closestPointRange = e; a && (b.oldTransA = n); b.translationSlope = b.transA = n = b.len / (c + g || 1); b.transB = b.horiz ? b.left : b.bottom; b.minPixelPadding = n * f
    }, setTickPositions: function (a) {
        var b = this, c = b.chart, d = b.options, e = d.startOnTick, f = d.endOnTick, g = b.isLog, h = b.isDatetimeAxis, k = b.isXAxis, n = b.isLinked, m = b.options.tickPositioner, r = d.maxPadding, t = d.minPadding, x = d.tickInterval, z = d.minTickInterval, S = d.tickPixelInterval, p, s = b.categories;
        n ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = l(c.min, c.dataMin), b.max = l(c.max, c.dataMax), d.type !== b.linkedParent.options.type && ya(11, 1)) : (b.min = l(b.userMin, d.min, b.dataMin), b.max = l(b.userMax, d.max, b.dataMax)); g && (!a && 0 >= T(b.min, l(b.dataMin, b.min)) && ya(10, 1), b.min = ma(R(b.min)), b.max = ma(R(b.max))); b.range && w(b.max) && (b.userMin = b.min = G(b.min, b.max - b.range), b.userMax = b.max, b.range = null); b.beforePadding && b.beforePadding(); b.adjustForMinRange(); !(s || b.axisPointRange || b.usePercentage ||
n) && w(b.min) && w(b.max) && (c = b.max - b.min) && (w(d.min) || w(b.userMin) || !t || !(0 > b.dataMin) && b.ignoreMinPadding || (b.min -= c * t), w(d.max) || w(b.userMax) || !r || !(0 < b.dataMax) && b.ignoreMaxPadding || (b.max += c * r)); P(d.floor) && (b.min = G(b.min, d.floor)); P(d.ceiling) && (b.max = T(b.max, d.ceiling)); b.min === b.max || void 0 === b.min || void 0 === b.max ? b.tickInterval = 1 : n && !x && S === b.linkedParent.options.tickPixelInterval ? b.tickInterval = b.linkedParent.tickInterval : (b.tickInterval = l(x, s ? 1 : (b.max - b.min) * S / G(b.len, S)), !w(x) && b.len < S &&
!this.isRadial && !this.isLog && !s && e && f && (p = !0, b.tickInterval /= 4)); k && !a && v(b.series, function (a) { a.processData(b.min !== b.oldMin || b.max !== b.oldMax) }); b.setAxisTranslation(!0); b.beforeSetTickPositions && b.beforeSetTickPositions(); b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval)); b.pointRange && (b.tickInterval = G(b.pointRange, b.tickInterval)); !x && b.tickInterval < z && (b.tickInterval = z); h || g || x || (b.tickInterval = C(b.tickInterval, null, O(b.tickInterval), l(d.allowDecimals, !(1 <
b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)))); b.minorTickInterval = "auto" === d.minorTickInterval && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval; b.tickPositions = a = d.tickPositions ? [].concat(d.tickPositions) : m && m.apply(b, [b.min, b.max]); a || (!b.ordinalPositions && (b.max - b.min) / b.tickInterval > G(2 * b.len, 200) && ya(19, !0), a = h ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : g ? b.getLogTickPositions(b.tickInterval,
b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), p && a.splice(1, a.length - 2), b.tickPositions = a); n || (d = a[0], g = a[a.length - 1], h = b.minPointOffset || 0, e ? b.min = d : b.min - h > d && a.shift(), f ? b.max = g : b.max + h < g && a.pop(), 0 === a.length && w(d) && a.push((g + d) / 2), 1 === a.length && (e = 1E13 < ia(b.max) ? 1 : .001, b.min -= e, b.max += e))
    }, setMaxTicks: function () {
        var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [this.coll, this.pos, this.len].join("-"); !this.isLinked && !this.isDatetimeAxis && c && c.length >
(b[d] || 0) && !1 !== this.options.alignTicks && (b[d] = c.length); a.maxTicks = b
    }, adjustTickAmount: function () { var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks; if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && !1 !== this.options.alignTicks && this.min !== D) { var d = this.tickAmount, e = b.length; this.tickAmount = a = c[a]; if (e < a) { for (; b.length < a; ) b.push(ma(b[b.length - 1] + this.tickInterval)); this.transA *= (e - 1) / (a - 1); this.max = b[b.length - 1] } w(d) && a !== d && (this.isDirty = !0) } }, setScale: function () {
        var a =
this.stacks, b, c, d, e; this.oldMin = this.min; this.oldMax = this.max; this.oldAxisLength = this.len; this.setAxisSize(); e = this.len !== this.oldAxisLength; v(this.series, function (a) { if (a.isDirtyData || a.isDirty || a.xAxis.isDirty) d = !0 }); if (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
            if (!this.isXAxis) for (b in a) for (c in a[b]) a[b][c].total = null, a[b][c].cum = 0; this.forceRedraw = !1; this.getSeriesExtremes(); this.setTickPositions(); this.oldUserMin = this.userMin; this.oldUserMax =
this.userMax; this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)
        } else if (!this.isXAxis) for (b in this.oldStacks && (a = this.stacks = this.oldStacks), a) for (c in a[b]) a[b][c].cum = a[b][c].total; this.setMaxTicks()
    }, setExtremes: function (a, b, c, d, e) { var f = this, g = f.chart; c = l(c, !0); e = q(e, { min: a, max: b }); ka(f, "setExtremes", e, function () { f.userMin = a; f.userMax = b; f.eventArgs = e; f.isDirtyExtremes = !0; c && g.redraw(d) }) }, zoom: function (a, b) {
        var c = this.dataMin, d = this.dataMax, e = this.options; this.allowZoomOutside ||
(w(c) && a <= T(c, l(e.min, c)) && (a = D), w(d) && b >= G(d, l(e.max, d)) && (b = D)); this.displayBtn = a !== D || b !== D; this.setExtremes(a, b, !1, D, { trigger: "zoom" }); return !0
    }, setAxisSize: function () {
        var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = l(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = l(b.height, a.plotHeight), g = l(b.top, a.plotTop), b = l(b.left, a.plotLeft + c), c = /%$/; c.test(f) && (f = parseInt(f, 10) / 100 * a.plotHeight); c.test(g) && (g = parseInt(g, 10) / 100 * a.plotHeight + a.plotTop); this.left = b; this.top = g; this.width = e;
        this.height = f; this.bottom = a.chartHeight - f - g; this.right = a.chartWidth - e - b; this.len = G(d ? e : f, 0); this.pos = d ? b : g
    }, getExtremes: function () { var a = this.isLog; return { min: a ? ma(M(this.min)) : this.min, max: a ? ma(M(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax} }, getThreshold: function (a) { var b = this.isLog, c = b ? M(this.min) : this.min, b = b ? M(this.max) : this.max; c > a || null === a ? a = c : b < a && (a = b); return this.translate(a, 0, 1, 0, 1) }, autoLabelAlign: function (a) {
        a = (l(a, 0) - 90 * this.side +
720) % 360; return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
    }, getOffset: function () {
        var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, k = b.inverted ? [1, 0, 3, 2][h] : h, n, m, r = 0, t, x = 0, z = d.title, S = d.labels, p = 0, s = b.axisOffset, b = b.clipOffset, q = [-1, 1, 1, -1][h], y, B = 1, C = l(S.maxStaggerLines, 5), O, F, J, Ha, u; a.hasData = n = a.hasVisibleSeries || w(a.min) && w(a.max) && !!e; a.showAxis = m = n || l(d.showEmpty, !0); a.staggerLines = a.horiz && S.staggerLines; a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: d.gridZIndex ||
1
        }).add(), a.axisGroup = c.g("axis").attr({ zIndex: d.zIndex || 2 }).add(), a.labelGroup = c.g("axis-labels").attr({ zIndex: S.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add()); if (n || a.isLinked) {
            a.labelAlign = l(S.align || a.autoLabelAlign(S.rotation)); v(e, function (b) { f[b] ? f[b].addLabel() : f[b] = new ra(a, b) }); if (a.horiz && !a.staggerLines && C && !S.rotation) {
                for (n = a.reversed ? [].concat(e).reverse() : e; B < C; ) {
                    O = []; F = !1; for (y = 0; y < n.length; y++) J = n[y], Ha = (Ha = f[J].label && f[J].label.getBBox()) ? Ha.width : 0,
u = y % B, Ha && (J = a.translate(J), O[u] !== D && J < O[u] && (F = !0), O[u] = J + Ha); if (F) B++; else break
                } 1 < B && (a.staggerLines = B)
            } v(e, function (b) { if (0 === h || 2 === h || { 1: "left", 3: "right"}[h] === a.labelAlign) p = G(f[b].getLabelSize(), p) }); a.staggerLines && (p *= a.staggerLines, a.labelOffset = p)
        } else for (y in f) f[y].destroy(), delete f[y]; z && z.text && !1 !== z.enabled && (a.axisTitle || (a.axisTitle = c.text(z.text, 0, 0, z.useHTML).attr({ zIndex: 7, rotation: z.rotation || 0, align: z.textAlign || { low: "left", middle: "center", high: "right"}[z.align] }).addClass("highcharts-" +
this.coll.toLowerCase() + "-title").css(z.style).add(a.axisGroup), a.axisTitle.isNew = !0), m && (r = a.axisTitle.getBBox()[g ? "height" : "width"], t = z.offset, x = w(t) ? 0 : l(z.margin, g ? 5 : 10)), a.axisTitle[m ? "show" : "hide"]()); a.offset = q * l(d.offset, s[h]); c = 2 === h ? a.tickBaseline : 0; g = p + x + (p && q * (g ? l(S.y, a.tickBaseline + 8) : S.x) - c); a.axisTitleMargin = l(t, g); s[h] = G(s[h], a.axisTitleMargin + r + q * a.offset, g); b[k] = G(b[k], 2 * fa(d.lineWidth / 2))
    }, getLinePath: function (a) {
        var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left +
(c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d; c && (a *= -1); return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
    }, getTitlePosition: function () {
        var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, h = this.offset, k = A(e.style.fontSize || 12), d = { low: f + (a ? 0 : d), middle: f + d / 2, high: f + (a ? d : 0)}[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? k :
0); return { x: a ? d : b + (g ? this.width : 0) + h + (e.x || 0), y: a ? b - (g ? this.height : 0) + h : d + (e.y || 0) }
    }, render: function () {
        var a = this, b = a.horiz, c = a.reversed, d = a.chart, e = d.renderer, f = a.options, g = a.isLog, h = a.isLinked, k = a.tickPositions, n, m = a.axisTitle, r = a.ticks, t = a.minorTicks, x = a.alternateBands, z = f.stackLabels, S = f.alternateGridColor, p = a.tickmarkOffset, l = f.lineWidth, s = d.hasRendered && w(a.oldMin) && !isNaN(a.oldMin), q = a.hasData, y = a.showAxis, B, C = f.labels.overflow, O = a.justifyLabels = b && !1 !== C, F; a.labelEdge.length = 0; a.justifyToPlot =
"justify" === C; v([r, t, x], function (a) { for (var b in a) a[b].isActive = !1 }); if (q || h) a.minorTickInterval && !a.categories && v(a.getMinorTickPositions(), function (b) { t[b] || (t[b] = new ra(a, b, "minor")); s && t[b].isNew && t[b].render(null, !0); t[b].render(null, !1, 1) }), k.length && (n = k.slice(), (b && c || !b && !c) && n.reverse(), O && (n = n.slice(1).concat([n[0]])), v(n, function (b, c) { O && (c = c === n.length - 1 ? 0 : c + 1); if (!h || b >= a.min && b <= a.max) r[b] || (r[b] = new ra(a, b)), s && r[b].isNew && r[b].render(c, !0, .1), r[b].render(c) }), p && 0 === a.min && (r[-1] ||
(r[-1] = new ra(a, -1, null, !0)), r[-1].render(-1))), S && v(k, function (b, c) { 0 === c % 2 && b < a.max && (x[b] || (x[b] = new ha.PlotLineOrBand(a)), B = b + p, F = k[c + 1] !== D ? k[c + 1] + p : a.max, x[b].options = { from: g ? M(B) : B, to: g ? M(F) : F, color: S }, x[b].render(), x[b].isActive = !0) }), a._addedPlotLB || (v((f.plotLines || []).concat(f.plotBands || []), function (b) { a.addPlotBandOrLine(b) }), a._addedPlotLB = !0); v([r, t, x], function (a) {
    var b, c, e = [], f = Ca ? Ca.duration || 500 : 0, g = function () { for (c = e.length; c--; ) a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]]) };
    for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b)); a !== x && d.hasRendered && f ? f && setTimeout(g, f) : g()
}); l && (b = a.getLinePath(l), a.axisLine ? a.axisLine.animate({ d: b }) : a.axisLine = e.path(b).attr({ stroke: f.lineColor, "stroke-width": l, zIndex: 7 }).add(a.axisGroup), a.axisLine[y ? "show" : "hide"]()); m && y && (m[m.isNew ? "attr" : "animate"](a.getTitlePosition()), m.isNew = !1); z && z.enabled && a.renderStackTotals(); a.isDirty = !1
    }, redraw: function () {
        this.render(); v(this.plotLinesAndBands, function (a) { a.render() });
        v(this.series, function (a) { a.isDirty = !0 })
    }, destroy: function (a) { var b = this, c = b.stacks, d, e = b.plotLinesAndBands; a || pa(b); for (d in c) la(c[d]), c[d] = null; v([b.ticks, b.minorTicks, b.alternateBands], function (a) { la(a) }); for (a = e.length; a--; ) e[a].destroy(); v("stackTotalGroup axisLine axisTitle axisGroup cross gridGroup labelGroup".split(" "), function (a) { b[a] && (b[a] = b[a].destroy()) }); this.cross && this.cross.destroy() }, drawCrosshair: function (a, b) {
        if (this.crosshair) if (!1 === (w(b) || !l(this.crosshair.snap, !0))) this.hideCrosshair();
        else {
            var c, d = this.crosshair, e = d.animation; l(d.snap, !0) ? w(b) && (c = this.chart.inverted != this.horiz ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos; c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : l(b.stackY, b.y)) : this.getPlotLinePath(null, null, null, null, c); if (null === c) this.hideCrosshair(); else if (this.cross) this.cross.attr({ visibility: "visible" })[e ? "animate" : "attr"]({ d: c }, e); else e = { "stroke-width": d.width || 1, stroke: d.color || "#C0C0C0", zIndex: d.zIndex || 2 }, d.dashStyle &&
(e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add()
        }
    }, hideCrosshair: function () { this.cross && this.cross.hide() }
    }; q($.prototype, { getPlotBandPath: function (a, b) { var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a); d && c ? d.push(c[4], c[5], c[1], c[2]) : d = null; return d }, addPlotBand: function (a) { return this.addPlotBandOrLine(a, "plotBands") }, addPlotLine: function (a) { return this.addPlotBandOrLine(a, "plotLines") }, addPlotBandOrLine: function (a, b) {
        var c = (new ha.PlotLineOrBand(this, a)).render(),
d = this.userOptions; c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c)); return c
    }, removePlotBandOrLine: function (a) { for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--; ) b[e].id === a && b[e].destroy(); v([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function (b) { for (e = b.length; e--; ) b[e].id === a && E(b, b[e]) }) }
    }); $.prototype.getTimeTicks = function (a, b, c, d) {
        var e = [], f = {}, g = ga.global.useUTC, h, k = new ta(b - Oa), n = a.unitRange, m = a.count; if (w(b)) {
            n >= ca.second &&
(k.setMilliseconds(0), k.setSeconds(n >= ca.minute ? 0 : m * fa(k.getSeconds() / m))); if (n >= ca.minute) k[Kb](n >= ca.hour ? 0 : m * fa(k[sb]() / m)); if (n >= ca.hour) k[Lb](n >= ca.day ? 0 : m * fa(k[tb]() / m)); if (n >= ca.day) k[vb](n >= ca.month ? 1 : m * fa(k[Ta]() / m)); n >= ca.month && (k[Mb](n >= ca.year ? 0 : m * fa(k[ib]() / m)), h = k[jb]()); if (n >= ca.year) k[Nb](h - h % m); if (n === ca.week) k[vb](k[Ta]() - k[ub]() + l(d, 1)); b = 1; Oa && (k = new ta(k.getTime() + Oa)); h = k[jb](); d = k.getTime(); for (var r = k[ib](), t = k[Ta](), x = (ca.day + (g ? Oa : 6E4 * k.getTimezoneOffset())) % ca.day; d < c; ) e.push(d),
d = n === ca.year ? hb(h + b * m, 0) : n === ca.month ? hb(h, r + b * m) : g || n !== ca.day && n !== ca.week ? d + n * m : hb(h, r, t + b * m * (n === ca.day ? 1 : 7)), b++; e.push(d); v(nb(e, function (a) { return n <= ca.hour && a % ca.day === x }), function (a) { f[a] = "day" })
        } e.info = q(a, { higherRanks: f, totalRange: n * m }); return e
    }; $.prototype.normalizeTimeTickInterval = function (a, b) {
        var c = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]],
["year", null]], d = c[c.length - 1], e = ca[d[0]], f = d[1], g; for (g = 0; g < c.length && !(d = c[g], e = ca[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + ca[c[g + 1][0]]) / 2); g++); e === ca.year && a < 5 * e && (f = [1, 2, 5]); c = C(a / e, f, "year" === d[0] ? G(O(a / e), 1) : 1); return { unitRange: e, count: c, unitName: d[0] }
    }; $.prototype.getLogTickPositions = function (a, b, c, d) {
        var e = this.options, f = this.len, g = []; d || (this._minorAutoInterval = null); if (.5 <= a) a = I(a), g = this.getLinearTickPositions(a, b, c); else if (.08 <= a) for (var f = fa(b), h, k, n, m, r, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2,
4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !r; f++) for (k = e.length, h = 0; h < k && !r; h++) n = R(M(f) * e[h]), n > b && (!d || m <= c) && m !== D && g.push(m), m > c && (r = !0), m = n; else b = M(b), c = M(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = l("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (d ? 5 : 1) * (c - b) / ((d ? f / this.tickPositions.length : f) || 1)), a = C(a, null, O(a)), g = Ga(this.getLinearTickPositions(a, b, c), R), d || (this._minorAutoInterval = a / 5); d || (this.tickInterval = a); return g
    }; var Bb = ha.Tooltip = function () { this.init.apply(this, arguments) };
    Bb.prototype = { init: function (a, b) { var c = b.borderWidth, d = b.style, e = A(d.padding); this.chart = a; this.options = b; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({ padding: e, fill: b.backgroundColor, "stroke-width": c, r: b.borderRadius, zIndex: 8 }).css(d).css({ padding: 0 }).add().attr({ y: -9999 }); Ba || this.label.shadow(b.shadow); this.shared = b.shared }, destroy: function () {
        this.label && (this.label = this.label.destroy()); clearTimeout(this.hideTimer);
        clearTimeout(this.tooltipTimeout)
    }, move: function (a, b, c, d) { var e = this, f = e.now, g = !1 !== e.options.animation && !e.isHidden && (1 < ia(a - f.x) || 1 < ia(b - f.y)), h = e.followPointer || 1 < e.len; q(f, { x: g ? (2 * f.x + a) / 3 : a, y: g ? (f.y + b) / 2 : b, anchorX: h ? D : g ? (2 * f.anchorX + c) / 3 : c, anchorY: h ? D : g ? (f.anchorY + d) / 2 : d }); e.label.attr(f); g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { e && e.move(a, b, c, d) }, 32)) }, hide: function (a) {
        var b = this, c; clearTimeout(this.hideTimer); this.isHidden || (c = this.chart.hoverPoints,
this.hideTimer = setTimeout(function () { b.label.fadeOut(); b.isHidden = !0 }, l(a, this.options.hideDelay, 500)), c && v(c, function (a) { a.setState() }), this.chart.hoverPoints = null)
    }, getAnchor: function (a, b) {
        var c, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, k; a = W(a); c = a[0].tooltipPos; this.followPointer && b && (b.chartX === D && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]); c || (v(a, function (a) { k = a.series.yAxis; g += a.plotX; h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && k ? k.top - f : 0) }), g /= a.length, h /=
a.length, c = [e ? d.plotWidth - h : g, this.shared && !e && 1 < a.length && b ? b.chartY - f : e ? d.plotHeight - g : h]); return Ga(c, I)
    }, getPosition: function (a, b, c) {
        var d = this.chart, e = this.distance, f = {}, g, h = ["y", d.chartHeight, b, c.plotY + d.plotTop], k = ["x", d.chartWidth, a, c.plotX + d.plotLeft], n = c.ttBelow || d.inverted && !c.negative || !d.inverted && c.negative, m = function (a, b, c, d) { var g = c < d - e; b = d + e + c < b; c = d - e - c; d += e; if (n && b) f[a] = d; else if (!n && g) f[a] = c; else if (g) f[a] = c; else if (b) f[a] = d; else return !1 }, r = function (a, b, c, d) {
            if (d < e || d > b - e) return !1;
            f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2
        }, t = function (a) { var b = h; h = k; k = b; g = a }, x = function () { !1 !== m.apply(0, h) ? !1 !== r.apply(0, k) || g || (t(!0), x()) : g ? f.x = f.y = 0 : (t(!0), x()) }; (d.inverted || 1 < this.len) && t(); x(); return f
    }, defaultFormatter: function (a) { var b = this.points || W(this), c = b[0].series, d; d = [a.tooltipHeaderFormatter(b[0])]; v(b, function (a) { c = a.series; d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat)) }); d.push(a.options.footerFormat || ""); return d.join("") }, refresh: function (a,
b) {
        var c = this.chart, d = this.label, e = this.options, f, g, h = {}, k, n = []; k = e.formatter || this.defaultFormatter; var h = c.hoverPoints, m, r = this.shared; clearTimeout(this.hideTimer); this.followPointer = W(a)[0].series.tooltipOptions.followPointer; g = this.getAnchor(a, b); f = g[0]; g = g[1]; !r || a.series && a.series.noSharedTooltip ? h = a.getLabelConfig() : (c.hoverPoints = a, h && v(h, function (a) { a.setState() }), v(a, function (a) { a.setState("hover"); n.push(a.getLabelConfig()) }), h = { x: a[0].category, y: a[0].y }, h.points = n, this.len = n.length, a =
a[0]); k = k.call(h, this); h = a.series; this.distance = l(h.tooltipOptions.distance, 16); !1 === k ? this.hide() : (this.isHidden && (cb(d), d.attr("opacity", 1).show()), d.attr({ text: k }), m = e.borderColor || a.color || h.color || "#606060", d.attr({ stroke: m }), this.updatePosition({ plotX: f, plotY: g, negative: a.negative, ttBelow: a.ttBelow }), this.isHidden = !1); ka(c, "tooltipRefresh", { text: k, x: f + c.plotLeft, y: g + c.plotTop, borderColor: m })
    }, updatePosition: function (a) {
        var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this,
c.width, c.height, a); this.move(I(c.x), I(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop)
    }, tooltipHeaderFormatter: function (a) { var b = a.series, c = b.tooltipOptions, d = c.dateTimeLabelFormats, e = c.xDateFormat, f = b.xAxis, g = f && "datetime" === f.options.type && P(a.key), c = c.headerFormat, f = f && f.closestPointRange, h; if (g && !e) { if (f) for (h in ca) { if (ca[h] >= f || ca[h] <= ca.day && 0 < a.key % ca[h]) { e = d[h]; break } } else e = d.day; e = e || d.year } g && e && (c = c.replace("{point.key}", "{point.key:" + e + "}")); return p(c, { point: a, series: b }) }
    }; var Ia; $a = Z.documentElement.ontouchstart !==
D; var Ra = ha.Pointer = function (a, b) { this.init(a, b) }; Ra.prototype = { init: function (a, b) { var c = b.chart, d = c.events, e = Ba ? "" : c.zoomType, c = a.inverted, f; this.options = b; this.chart = a; this.zoomX = f = /x/.test(e); this.zoomY = e = /y/.test(e); this.zoomHor = f && !c || e && c; this.zoomVert = e && !c || f && c; this.hasZoom = f || e; this.runChartClick = d && !!d.click; this.pinchDown = []; this.lastValidTouch = {}; ha.Tooltip && b.tooltip.enabled && (a.tooltip = new Bb(a, b.tooltip), this.followTouchMove = b.tooltip.followTouchMove); this.setDOMEvents() }, normalize: function (a,
b) { var c, d; a = a || window.event; a = fc(a); a.target || (a.target = a.srcElement); d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a; b || (this.chartPosition = b = ec(this.chart.container)); d.pageX === D ? (c = G(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top); return q(a, { chartX: I(c), chartY: I(d) }) }, getCoordinates: function (a) { var b = { xAxis: [], yAxis: [] }; v(this.chart.axes, function (c) { b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) }) }); return b }, getIndex: function (a) {
    var b =
this.chart; return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft
}, runPointActions: function (a) {
    var b = this.chart, c = b.series, d = b.tooltip, e, f, g = b.hoverPoint, h = b.hoverSeries, k, n, m = b.chartWidth, r = this.getIndex(a); if (d && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
        f = []; k = c.length; for (n = 0; n < k; n++) c[n].visible && !1 !== c[n].options.enableMouseTracking && !c[n].noSharedTooltip && !0 !== c[n].singularTooltips && c[n].tooltipPoints.length && (e = c[n].tooltipPoints[r]) && e.series && (e._dist = ia(r - e.clientX),
m = T(m, e._dist), f.push(e)); for (k = f.length; k--; ) f[k]._dist > m && f.splice(k, 1); f.length && f[0].clientX !== this.hoverX && (d.refresh(f, a), this.hoverX = f[0].clientX)
    } c = h && h.tooltipOptions.followPointer; if (h && h.tracker && !c) { if ((e = h.tooltipPoints[r]) && e !== g) e.onMouseOver(a) } else d && c && !d.isHidden && (h = d.getAnchor([{}], a), d.updatePosition({ plotX: h[0], plotY: h[1] })); d && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function (a) { if (sa[Ia]) sa[Ia].pointer.onDocumentMouseMove(a) }, aa(Z, "mousemove", this._onDocumentMouseMove));
    v(b.axes, function (b) { b.drawCrosshair(a, l(e, g)) })
}, reset: function (a, b) { var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, f = c.tooltip, g = f && f.shared ? c.hoverPoints : e; (a = a && f && g) && W(g)[0].plotX === D && (a = !1); if (a) f.refresh(g), e && e.setState(e.state, !0); else { if (e) e.onMouseOut(); if (d) d.onMouseOut(); f && f.hide(b); this._onDocumentMouseMove && (pa(Z, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null); v(c.axes, function (a) { a.hideCrosshair() }); this.hoverX = null } }, scaleGroups: function (a, b) {
    var c = this.chart,
d; v(c.series, function (e) { d = a || e.getPlotBox(); e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d)) }); c.clipRect.attr(b || c.clipBox)
}, dragStart: function (a) { var b = this.chart; b.mouseIsDown = a.type; b.cancelClick = !1; b.mouseDownX = this.mouseDownX = a.chartX; b.mouseDownY = this.mouseDownY = a.chartY }, drag: function (a) {
    var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert,
h = b.plotLeft, k = b.plotTop, n = b.plotWidth, m = b.plotHeight, r, t = this.mouseDownX, x = this.mouseDownY, z = c.panKey && a[c.panKey + "Key"]; d < h ? d = h : d > h + n && (d = h + n); e < k ? e = k : e > k + m && (e = k + m); this.hasDragged = Math.sqrt(Math.pow(t - d, 2) + Math.pow(x - e, 2)); 10 < this.hasDragged && (r = b.isInsidePlot(t - h, x - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) && r && !z && !this.selectionMarker && (this.selectionMarker = b.renderer.rect(h, k, f ? 1 : n, g ? 1 : m, 0).attr({ fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)", zIndex: 7 }).add()), this.selectionMarker &&
f && (d -= t, this.selectionMarker.attr({ width: ia(d), x: (0 < d ? 0 : d) + t })), this.selectionMarker && g && (d = e - x, this.selectionMarker.attr({ height: ia(d), y: (0 < d ? 0 : d) + x })), r && !this.selectionMarker && c.panning && b.pan(a, c.panning))
}, drop: function (a) {
    var b = this.chart, c = this.hasPinched; if (this.selectionMarker) {
        var d = { xAxis: [], yAxis: [], originalEvent: a.originalEvent || a }, e = this.selectionMarker, f = e.attr ? e.attr("x") : e.x, g = e.attr ? e.attr("y") : e.y, h = e.attr ? e.attr("width") : e.width, k = e.attr ? e.attr("height") : e.height, n; if (this.hasDragged ||
c) v(b.axes, function (b) { if (b.zoomEnabled) { var c = b.horiz, e = "touchend" === a.type ? b.minPixelPadding : 0, x = b.toValue((c ? f : g) + e), c = b.toValue((c ? f + h : g + k) - e); isNaN(x) || isNaN(c) || (d[b.coll].push({ axis: b, min: T(x, c), max: G(x, c) }), n = !0) } }), n && ka(b, "selection", d, function (a) { b.zoom(q(a, c ? { animation: !1} : null)) }); this.selectionMarker = this.selectionMarker.destroy(); c && this.scaleGroups()
    } b && (N(b.container, { cursor: b._cursor }), b.cancelClick = 10 < this.hasDragged, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown =
[])
}, onContainerMouseDown: function (a) { a = this.normalize(a); a.preventDefault && a.preventDefault(); this.dragStart(a) }, onDocumentMouseUp: function (a) { sa[Ia] && sa[Ia].pointer.drop(a) }, onDocumentMouseMove: function (a) { var b = this.chart, c = this.chartPosition, d = b.hoverSeries; a = this.normalize(a, c); c && d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset() }, onContainerMouseLeave: function () { var a = sa[Ia]; a && (a.pointer.reset(), a.pointer.chartPosition = null) },
    onContainerMouseMove: function (a) { var b = this.chart; Ia = b.index; a = this.normalize(a); a.returnValue = !1; "mousedown" === b.mouseIsDown && this.drag(a); !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a) }, inClass: function (a, b) { for (var c; a; ) { if (c = L(a, "class")) { if (-1 !== c.indexOf(b)) return !0; if (-1 !== c.indexOf("highcharts-container")) return !1 } a = a.parentNode } }, onTrackerMouseOut: function (a) {
        var b = this.chart.hoverSeries, c = (a = a.relatedTarget ||
a.toElement) && a.point && a.point.series; if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && c !== b) b.onMouseOut()
    }, onContainerClick: function (a) { var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop; a = this.normalize(a); a.cancelBubble = !0; b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (ka(c.series, "click", q(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && ka(b, "click", a))) }, setDOMEvents: function () {
        var a =
this, b = a.chart.container; b.onmousedown = function (b) { a.onContainerMouseDown(b) }; b.onmousemove = function (b) { a.onContainerMouseMove(b) }; b.onclick = function (b) { a.onContainerClick(b) }; aa(b, "mouseleave", a.onContainerMouseLeave); 1 === bb && aa(Z, "mouseup", a.onDocumentMouseUp); $a && (b.ontouchstart = function (b) { a.onContainerTouchStart(b) }, b.ontouchmove = function (b) { a.onContainerTouchMove(b) }, 1 === bb && aa(Z, "touchend", a.onDocumentTouchEnd))
    }, destroy: function () {
        var a; pa(this.chart.container, "mouseleave", this.onContainerMouseLeave);
        bb || (pa(Z, "mouseup", this.onDocumentMouseUp), pa(Z, "touchend", this.onDocumentTouchEnd)); clearInterval(this.tooltipTimeout); for (a in this) this[a] = null
    }
}; q(ha.Pointer.prototype, { pinchTranslate: function (a, b, c, d, e, f) { (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f); (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f) }, pinchTranslateDirection: function (a, b, c, d, e, f, g, h) {
    var k = this.chart, n = a ? "x" : "y", m = a ? "X" : "Y", r = "chart" + m, t = a ? "width" : "height", x = k["plot" +
(a ? "Left" : "Top")], z, p, l = h || 1, s = k.inverted, v = k.bounds[a ? "h" : "v"], q = 1 === b.length, y = b[0][r], B = c[0][r], C = !q && b[1][r], O = !q && c[1][r], F; c = function () { !q && 20 < ia(y - C) && (l = h || ia(B - O) / ia(y - C)); p = (x - B) / l + y; z = k["plot" + (a ? "Width" : "Height")] / l }; c(); b = p; b < v.min ? (b = v.min, F = !0) : b + z > v.max && (b = v.max - z, F = !0); F ? (B -= .8 * (B - g[n][0]), q || (O -= .8 * (O - g[n][1])), c()) : g[n] = [B, O]; s || (f[n] = p - x, f[t] = z); f = s ? 1 / l : l; e[t] = z; e[n] = b; d[s ? a ? "scaleY" : "scaleX" : "scale" + m] = l; d["translate" + m] = f * x + (B - f * y)
}, pinch: function (a) {
    var b = this, c = b.chart, d =
b.pinchDown, e = b.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, k = b.hasZoom, n = b.selectionMarker, m = {}, r = 1 === g && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick), t = {}; !k && !e || r || a.preventDefault(); Ga(f, function (a) { return b.normalize(a) }); "touchstart" === a.type ? (v(f, function (a, b) { d[b] = { chartX: a.chartX, chartY: a.chartY} }), h.x = [d[0].chartX, d[1] && d[1].chartX], h.y = [d[0].chartY, d[1] && d[1].chartY], v(c.axes, function (a) {
    if (a.zoomEnabled) {
        var b = c.bounds[a.horiz ? "h" : "v"], d =
a.minPixelPadding, e = a.toPixels(l(a.options.min, a.dataMin)), f = a.toPixels(l(a.options.max, a.dataMax)), g = T(e, f), e = G(e, f); b.min = T(a.pos, g - d); b.max = G(a.pos + a.len, e + d)
    }
}), b.res = !0) : d.length && (n || (b.selectionMarker = n = q({ destroy: oa }, c.plotBox)), b.pinchTranslate(d, f, m, n, t, h), b.hasPinched = k, b.scaleGroups(m, t), !k && e && 1 === g ? this.runPointActions(b.normalize(a)) : b.res && (b.res = !1, this.reset(!1, 0)))
}, onContainerTouchStart: function (a) {
    var b = this.chart; Ia = b.index; 1 === a.touches.length ? (a = this.normalize(a), b.isInsidePlot(a.chartX -
b.plotLeft, a.chartY - b.plotTop) ? (this.runPointActions(a), this.pinch(a)) : this.reset()) : 2 === a.touches.length && this.pinch(a)
}, onContainerTouchMove: function (a) { 1 !== a.touches.length && 2 !== a.touches.length || this.pinch(a) }, onDocumentTouchEnd: function (a) { sa[Ia] && sa[Ia].pointer.drop(a) }
}); if (na.PointerEvent || na.MSPointerEvent) {
        var La = {}, Cb = !!na.PointerEvent, kc = function () {
            var a, b = []; b.item = function (a) { return this[a] }; for (a in La) La.hasOwnProperty(a) && b.push({ pageX: La[a].pageX, pageY: La[a].pageY, target: La[a].target });
            return b
        }, Db = function (a, b, c, d) { a = a.originalEvent || a; "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !sa[Ia] || (d(a), d = sa[Ia].pointer, d[b]({ type: c, target: a.currentTarget, preventDefault: oa, touches: kc() })) }; q(Ra.prototype, { onContainerPointerDown: function (a) { Db(a, "onContainerTouchStart", "touchstart", function (a) { La[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget} }) }, onContainerPointerMove: function (a) {
            Db(a, "onContainerTouchMove", "touchmove", function (a) {
                La[a.pointerId] = { pageX: a.pageX,
                    pageY: a.pageY
                }; La[a.pointerId].target || (La[a.pointerId].target = a.currentTarget)
            })
        }, onDocumentPointerUp: function (a) { Db(a, "onContainerTouchEnd", "touchend", function (a) { delete La[a.pointerId] }) }, batchMSEvents: function (a) { a(this.chart.container, Cb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); a(this.chart.container, Cb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); a(Z, Cb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp) }
        }); s(Ra.prototype, "init", function (a, b, c) {
            a.call(this, b,
c); (this.hasZoom || this.followTouchMove) && N(b.container, { "-ms-touch-action": "none", "touch-action": "none" })
        }); s(Ra.prototype, "setDOMEvents", function (a) { a.apply(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(aa) }); s(Ra.prototype, "destroy", function (a) { this.batchMSEvents(pa); a.call(this) })
    } var ob = ha.Legend = function (a, b) { this.init(a, b) }; ob.prototype = { init: function (a, b) {
        var c = this, d = b.itemStyle, e = l(b.padding, 8), f = b.itemMarginTop || 0; this.options = b; b.enabled && (c.itemStyle = d, c.itemHiddenStyle =
u(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.symbolWidth = l(b.symbolWidth, 16), c.pages = [], c.render(), aa(c.chart, "endResize", function () { c.positionCheckboxes() }))
    }, colorizeItem: function (a, b) {
        var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.legendColor || a.color || "#CCC" : g, g = a.options && a.options.marker, k = { fill: h }, n; d && d.css({ fill: c,
            color: c
        }); e && e.attr({ stroke: h }); if (f) { if (g && f.isMarker) for (n in k.stroke = h, g = a.convertAttribs(g), g) d = g[n], d !== D && (k[n] = d); f.attr(k) }
    }, positionItem: function (a) { var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox; a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d); f && (f.x = e, f.y = d) }, destroyItem: function (a) { var b = a.checkbox; v(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) { a[b] && (a[b] = a[b].destroy()) }); b && Aa(a.checkbox) },
        destroy: function () { var a = this.group, b = this.box; b && (this.box = b.destroy()); a && (this.group = a.destroy()) }, positionCheckboxes: function (a) { var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight; b && (c = b.translateY, v(this.allItems, function (e) { var f = e.checkbox, g; f && (g = c + f.y + (a || 0) + 3, N(f, { left: b.translateX + e.checkboxOffset + f.x - 20 + "px", top: g + "px", display: g > c - 6 && g < c + d - 6 ? "" : "none" })) })) }, renderTitle: function () {
            var a = this.padding, b = this.options.title, c = 0; b.text && (this.title || (this.title = this.chart.renderer.label(b.text,
a - 3, a - 4, null, null, null, null, null, "legend-title").attr({ zIndex: 1 }).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: c })); this.titleHeight = c
        }, renderItem: function (a) {
            var b = this.chart, c = b.renderer, d = this.options, e = "horizontal" === d.layout, f = this.symbolWidth, g = d.symbolPadding, h = this.itemStyle, k = this.itemHiddenStyle, n = this.padding, m = e ? l(d.itemDistance, 20) : 0, r = !d.rtl, t = d.width, x = d.itemMarginBottom || 0, z = this.itemMarginTop, s = this.initialItemX,
v = a.legendItem, q = a.series && a.series.drawLegendSymbol ? a.series : a, B = q.options, B = this.createCheckboxForItem && B && B.showCheckbox, y = d.useHTML; v || (a.legendGroup = c.g("legend-item").attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = v = c.text(d.labelFormat ? p(d.labelFormat, a) : d.labelFormatter.call(a), r ? f + g : -g, this.baseline || 0, y).css(u(a.visible ? h : k)).attr({ align: r ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (this.baseline = c.fontMetrics(h.fontSize, v).f + 3 + z, v.attr("y", this.baseline)), q.drawLegendSymbol(this,
a), this.setItemEvents && this.setItemEvents(a, v, y, h, k), this.colorizeItem(a, a.visible), B && this.createCheckboxForItem(a)); c = v.getBBox(); f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + m + (B ? 20 : 0); this.itemHeight = g = I(a.legendItemHeight || c.height); e && this.itemX - s + f > (t || b.chartWidth - 2 * n - s - d.x) && (this.itemX = s, this.itemY += z + this.lastLineHeight + x, this.lastLineHeight = 0); this.maxItemWidth = G(this.maxItemWidth, f); this.lastItemY = z + this.itemY + x; this.lastLineHeight = G(g, this.lastLineHeight); a._legendItemPos =
[this.itemX, this.itemY]; e ? this.itemX += f : (this.itemY += z + g + x, this.lastLineHeight = g); this.offsetWidth = t || G((e ? this.itemX - s - m : f) + n, this.offsetWidth)
        }, getAllItems: function () { var a = []; v(this.chart.series, function (b) { var c = b.options; l(c.showInLegend, w(c.linkedTo) ? !1 : D, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b))) }); return a }, render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, h, k = a.box, n = a.options, m = a.padding, r = n.borderWidth, t = n.backgroundColor; a.itemX = a.initialItemX;
            a.itemY = a.initialItemY; a.offsetWidth = 0; a.lastItemY = 0; d || (a.group = d = c.g("legend").attr({ zIndex: 7 }).add(), a.contentGroup = c.g().attr({ zIndex: 1 }).add(d), a.scrollGroup = c.g().add(a.contentGroup)); a.renderTitle(); e = a.getAllItems(); F(e, function (a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) }); n.reversed && e.reverse(); a.allItems = e; a.display = f = !!e.length; v(e, function (b) { a.renderItem(b) }); g = n.width || a.offsetWidth; h = a.lastItemY + a.lastLineHeight + a.titleHeight; h = a.handleOverflow(h);
            if (r || t) g += m, h += m, k ? 0 < g && 0 < h && (k[k.isNew ? "attr" : "animate"](k.crisp({ width: g, height: h })), k.isNew = !1) : (a.box = k = c.rect(0, 0, g, h, n.borderRadius, r || 0).attr({ stroke: n.borderColor, "stroke-width": r || 0, fill: t || "none" }).add(d).shadow(n.shadow), k.isNew = !0), k[f ? "show" : "hide"](); a.legendWidth = g; a.legendHeight = h; v(e, function (b) { a.positionItem(b) }); f && d.align(q({ width: g, height: h }, n), !0, "spacingBox"); b.isResizing || this.positionCheckboxes()
        }, handleOverflow: function (a) {
            var b = this, c = this.chart, d = c.renderer, e = this.options,
f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f : f) - this.padding, g = e.maxHeight, h, k = this.clipRect, n = e.navigation, m = l(n.animation, !0), r = n.arrowSize || 12, t = this.nav, x = this.pages, z, p = this.allItems; "horizontal" === e.layout && (f /= 2); g && (f = T(f, g)); x.length = 0; a > f && !e.useHTML ? (this.clipHeight = h = G(f - 20 - this.titleHeight - this.padding, 0), this.currentPage = l(this.currentPage, 1), this.fullHeight = a, v(p, function (a, b) {
    var c = a._legendItemPos[1], d = I(a.legendItem.getBBox().height), e = x.length; if (!e || c - x[e - 1] > h && (z ||
c) !== x[e - 1]) x.push(z || c), e++; b === p.length - 1 && c + d - x[e - 1] > h && x.push(c); c !== z && (z = c)
}), k || (k = b.clipRect = d.clipRect(0, this.padding, 9999, 0), b.contentGroup.clip(k)), k.attr({ height: h }), t || (this.nav = t = d.g().attr({ zIndex: 1 }).add(this.group), this.up = d.symbol("triangle", 0, 0, r, r).on("click", function () { b.scroll(-1, m) }).add(t), this.pager = d.text("", 15, 10).css(n.style).add(t), this.down = d.symbol("triangle-down", 0, 0, r, r).on("click", function () { b.scroll(1, m) }).add(t)), b.scroll(0), a = f) : t && (k.attr({ height: c.chartHeight }),
t.hide(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0); return a
        }, scroll: function (a, b) {
            var c = this.pages, d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, h = g.activeColor, g = g.inactiveColor, k = this.pager, n = this.padding; e > d && (e = d); 0 < e && (b !== D && (Ca = l(b, this.chart.animation)), this.nav.attr({ translateX: n, translateY: f + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ fill: 1 === e ? g : h }).css({ cursor: 1 === e ? "default" : "pointer" }), k.attr({ text: e + "/" + d }), this.down.attr({ x: 18 +
this.pager.getBBox().width, fill: e === d ? g : h
            }).css({ cursor: e === d ? "default" : "pointer" }), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: c }), this.currentPage = e, this.positionCheckboxes(c))
        }
    }; var fb = ha.LegendSymbolMixin = { drawRectangle: function (a, b) { var c = a.options.symbolHeight || 12; b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, a.options.symbolRadius || 0).attr({ zIndex: 3 }).add(b.legendGroup) }, drawLineMarker: function (a) {
        var b = this.options, c = b.marker, d; d = a.symbolWidth;
        var e = this.chart.renderer, f = this.legendGroup; a = a.baseline - I(.3 * e.fontMetrics(a.options.itemStyle.fontSize, this.legendItem).b); var g; b.lineWidth && (g = { "stroke-width": b.lineWidth }, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f)); c && !1 !== c.enabled && (b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0)
    }
    }; (/Trident\/7\.0/.test(Ma) || Ya) && s(ob.prototype, "positionItem", function (a, b) {
        var c = this, d = function () {
            b._legendItemPos &&
a.call(c, b)
        }; d(); setTimeout(d)
    }); qa.prototype = { init: function (a, b) {
        var c, d = a.series; a.series = null; c = u(ga, a); c.series = a.series = d; this.userOptions = a; d = c.chart; this.margin = this.splashArray("margin", d); this.spacing = this.splashArray("spacing", d); var e = d.events; this.bounds = { h: {}, v: {} }; this.callback = b; this.isResizing = 0; this.options = c; this.axes = []; this.series = []; this.hasCartesianSeries = d.showAxes; var f = this, g; f.index = sa.length; sa.push(f); bb++; !1 !== d.reflow && aa(f, "load", function () { f.initReflow() }); if (e) for (g in e) aa(f,
g, e[g]); f.xAxis = []; f.yAxis = []; f.animation = Ba ? !1 : l(d.animation, !0); f.pointCount = f.colorCounter = f.symbolCounter = 0; f.firstRender()
    }, initSeries: function (a) { var b = this.options.chart; (b = K[a.type || b.type || b.defaultSeriesType]) || ya(17, !0); b = new b; b.init(this, a); return b }, isInsidePlot: function (a, b, c) { var d = c ? b : a; a = c ? a : b; return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight }, adjustTickAmounts: function () { !1 !== this.options.chart.alignTicks && v(this.axes, function (a) { a.adjustTickAmount() }); this.maxTicks = null },
        redraw: function (a) {
            var b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, h, k = this.hasCartesianSeries, n = this.isDirtyBox, m = c.length, r = m, t = this.renderer, x = t.isHidden(), z = []; Ca = l(a, this.animation); x && this.cloneRenderTo(); for (this.layOutTitles(); r--; ) if (a = c[r], a.options.stacking && (g = !0, a.isDirty)) { h = !0; break } if (h) for (r = m; r--; ) a = c[r], a.options.stacking && (a.isDirty = !0); v(c, function (a) { a.isDirty && "point" === a.options.legendType && (f = !0) }); f && e.options.enabled && (e.render(), this.isDirtyLegend =
!1); g && this.getStacks(); k && (this.isResizing || (this.maxTicks = null, v(b, function (a) { a.setScale() })), this.adjustTickAmounts()); this.getMargins(); k && (v(b, function (a) { a.isDirty && (n = !0) }), v(b, function (a) { a.isDirtyExtremes && (a.isDirtyExtremes = !1, z.push(function () { ka(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes())); delete a.eventArgs })); (n || g) && a.redraw() })); n && this.drawChartBox(); v(c, function (a) { a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw() }); d && d.reset(!0); t.draw(); ka(this, "redraw"); x &&
this.cloneRenderTo(!0); v(z, function (a) { a.call() })
        }, get: function (a) { var b = this.axes, c = this.series, d, e; for (d = 0; d < b.length; d++) if (b[d].options.id === a) return b[d]; for (d = 0; d < c.length; d++) if (c[d].options.id === a) return c[d]; for (d = 0; d < c.length; d++) for (e = c[d].points || [], b = 0; b < e.length; b++) if (e[b].id === a) return e[b]; return null }, getAxes: function () {
            var a = this, b = this.options, c = b.xAxis = W(b.xAxis || {}), b = b.yAxis = W(b.yAxis || {}); v(c, function (a, b) { a.index = b; a.isX = !0 }); v(b, function (a, b) { a.index = b }); c = c.concat(b); v(c,
function (b) { new $(a, b) }); a.adjustTickAmounts()
        }, getSelectedPoints: function () { var a = []; v(this.series, function (b) { a = a.concat(nb(b.points || [], function (a) { return a.selected })) }); return a }, getSelectedSeries: function () { return nb(this.series, function (a) { return a.selected }) }, getStacks: function () {
            var a = this; v(a.yAxis, function (a) { a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks) }); v(a.series, function (b) {
                !b.options.stacking || !0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries || (b.stackKey = b.type + l(b.options.stack,
""))
            })
        }, setTitle: function (a, b, c) { var d = this, e = d.options, f; f = e.title = u(e.title, a); e = e.subtitle = u(e.subtitle, b); v([["title", a, f], ["subtitle", b, e]], function (a) { var b = a[0], c = d[b], e = a[1]; a = a[2]; c && e && (d[b] = c = c.destroy()); a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + b, zIndex: a.zIndex || 4 }).css(a.style).add()) }); d.layOutTitles(c) }, layOutTitles: function (a) {
            var b = 0, c = this.title, d = this.subtitle, e = this.options, f = e.title, e = e.subtitle, g = this.renderer, h = this.spacingBox.width -
44; c && (c.css({ width: (f.width || h) + "px" }).align(q({ y: g.fontMetrics(f.style.fontSize, c).b - 3 }, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = c.getBBox().height)); d && (d.css({ width: (e.width || h) + "px" }).align(q({ y: b + (f.margin - 13) + g.fontMetrics(f.style.fontSize, d).b }, e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = Ua(b + d.getBBox().height))); c = this.titleOffset !== b; this.titleOffset = b; !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && l(a, !0) && this.isDirtyBox && this.redraw())
        }, getChartSize: function () {
            var a =
this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo; w(b) || (this.containerWidth = mb(c, "width")); w(a) || (this.containerHeight = mb(c, "height")); this.chartWidth = G(0, b || this.containerWidth || 600); this.chartHeight = G(0, l(a, 19 < this.containerHeight ? this.containerHeight : 400))
        }, cloneRenderTo: function (a) {
            var b = this.renderToClone, c = this.container; a ? b && (this.renderTo.appendChild(c), Aa(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone =
b = this.renderTo.cloneNode(0), N(b, { position: "absolute", top: "-9999px", display: "block" }), b.style.setProperty && b.style.setProperty("display", "block", "important"), Z.body.appendChild(b), c && b.appendChild(c))
        }, getContainer: function () {
            var a, b = this.options.chart, c, d, e; this.renderTo = a = b.renderTo; e = "highcharts-" + yb++; V(a) && (this.renderTo = a = Z.getElementById(a)); a || ya(13, !0); c = A(L(a, "data-highcharts-chart")); !isNaN(c) && sa[c] && sa[c].hasRendered && sa[c].destroy(); L(a, "data-highcharts-chart", this.index); a.innerHTML =
""; b.skipClone || a.offsetWidth || this.cloneRenderTo(); this.getChartSize(); c = this.chartWidth; d = this.chartHeight; this.container = a = ba("div", { className: "highcharts-container" + (b.className ? " " + b.className : ""), id: e }, q({ position: "relative", overflow: "hidden", width: c + "px", height: d + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, b.style), this.renderToClone || a); this._cursor = a.style.cursor; this.renderer = b.forExport ? new za(a, c, d, b.style, !0) : new Za(a, c, d, b.style);
            Ba && this.renderer.create(this, a, c, d)
        }, getMargins: function () {
            var a = this.spacing, b, c = this.legend, d = this.margin, e = this.options.legend, f = l(e.margin, 20), g = e.x, h = e.y, k = e.align, n = e.verticalAlign, m = this.titleOffset; this.resetMargins(); b = this.axisOffset; m && !w(d[0]) && (this.plotTop = G(this.plotTop, m + this.options.title.margin + a[0])); c.display && !e.floating && ("right" === k ? w(d[1]) || (this.marginRight = G(this.marginRight, c.legendWidth - g + f + a[1])) : "left" === k ? w(d[3]) || (this.plotLeft = G(this.plotLeft, c.legendWidth + g + f + a[3])) :
"top" === n ? w(d[0]) || (this.plotTop = G(this.plotTop, c.legendHeight + h + f + a[0])) : "bottom" !== n || w(d[2]) || (this.marginBottom = G(this.marginBottom, c.legendHeight - h + f + a[2]))); this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin); this.extraTopMargin && (this.plotTop += this.extraTopMargin); this.hasCartesianSeries && v(this.axes, function (a) { a.getOffset() }); w(d[3]) || (this.plotLeft += b[3]); w(d[0]) || (this.plotTop += b[0]); w(d[2]) || (this.marginBottom += b[2]); w(d[1]) || (this.marginRight += b[1]); this.setChartSize()
        },
        reflow: function (a) { var b = this, c = b.options.chart, d = b.renderTo, e = c.width || mb(d, "width"), f = c.height || mb(d, "height"), c = a ? a.target : na, d = function () { b.container && (b.setSize(e, f, !1), b.hasUserSize = null) }; if (!b.hasUserSize && e && f && (c === na || c === Z)) { if (e !== b.containerWidth || f !== b.containerHeight) clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d(); b.containerWidth = e; b.containerHeight = f } }, initReflow: function () {
            var a = this, b = function (b) { a.reflow(b) }; aa(na, "resize", b); aa(a, "destroy", function () {
                pa(na,
"resize", b)
            })
        }, setSize: function (a, b, c) {
            var d = this, e, f, g; d.isResizing += 1; g = function () { d && ka(d, "endResize", null, function () { d.isResizing -= 1 }) }; Ca = l(c, d.animation); d.oldChartHeight = d.chartHeight; d.oldChartWidth = d.chartWidth; w(a) && (d.chartWidth = e = G(0, I(a)), d.hasUserSize = !!e); w(b) && (d.chartHeight = f = G(0, I(b))); (Ca ? Sb : N)(d.container, { width: e + "px", height: f + "px" }, Ca); d.setChartSize(!0); d.renderer.setSize(e, f, c); d.maxTicks = null; v(d.axes, function (a) { a.isDirty = !0; a.setScale() }); v(d.series, function (a) {
                a.isDirty =
!0
            }); d.isDirtyLegend = !0; d.isDirtyBox = !0; d.layOutTitles(); d.getMargins(); d.redraw(c); d.oldChartHeight = null; ka(d, "resize"); !1 === Ca ? g() : setTimeout(g, Ca && Ca.duration || 500)
        }, setChartSize: function (a) {
            var b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, h = this.clipOffset, k, n, m, r; this.plotLeft = k = I(this.plotLeft); this.plotTop = n = I(this.plotTop); this.plotWidth = m = G(0, I(d - k - this.marginRight)); this.plotHeight = r = G(0, I(e - n - this.marginBottom)); this.plotSizeX =
b ? r : m; this.plotSizeY = b ? m : r; this.plotBorderWidth = f.plotBorderWidth || 0; this.spacingBox = c.spacingBox = { x: g[3], y: g[0], width: d - g[3] - g[1], height: e - g[0] - g[2] }; this.plotBox = c.plotBox = { x: k, y: n, width: m, height: r }; d = 2 * fa(this.plotBorderWidth / 2); b = Ua(G(d, h[3]) / 2); c = Ua(G(d, h[0]) / 2); this.clipBox = { x: b, y: c, width: fa(this.plotSizeX - G(d, h[1]) / 2 - b), height: G(0, fa(this.plotSizeY - G(d, h[2]) / 2 - c)) }; a || v(this.axes, function (a) { a.setAxisSize(); a.setAxisTranslation() })
        }, resetMargins: function () {
            var a = this.spacing, b = this.margin;
            this.plotTop = l(b[0], a[0]); this.marginRight = l(b[1], a[1]); this.marginBottom = l(b[2], a[2]); this.plotLeft = l(b[3], a[3]); this.axisOffset = [0, 0, 0, 0]; this.clipOffset = [0, 0, 0, 0]
        }, drawChartBox: function () {
            var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, k = a.borderWidth || 0, n = a.backgroundColor, m = a.plotBackgroundColor, r = a.plotBackgroundImage, t = a.plotBorderWidth || 0, x, z = this.plotLeft, p = this.plotTop, l = this.plotWidth,
s = this.plotHeight, v = this.plotBox, q = this.clipRect, B = this.clipBox; x = k + (a.shadow ? 8 : 0); if (k || n) e ? e.animate(e.crisp({ width: c - x, height: d - x })) : (e = { fill: n || "none" }, k && (e.stroke = a.borderColor, e["stroke-width"] = k), this.chartBackground = b.rect(x / 2, x / 2, c - x, d - x, a.borderRadius, k).attr(e).addClass("highcharts-background").add().shadow(a.shadow)); m && (f ? f.animate(v) : this.plotBackground = b.rect(z, p, l, s, 0).attr({ fill: m }).add().shadow(a.plotShadow)); r && (h ? h.animate(v) : this.plotBGImage = b.image(r, z, p, l, s).add()); q ? q.animate({ width: B.width,
    height: B.height
}) : this.clipRect = b.clipRect(B); t && (g ? g.animate(g.crisp({ x: z, y: p, width: l, height: s, strokeWidth: -t })) : this.plotBorder = b.rect(z, p, l, s, 0, -t).attr({ stroke: a.plotBorderColor, "stroke-width": t, fill: "none", zIndex: 1 }).add()); this.isDirtyBox = !1
        }, propFromSeries: function () {
            var a = this, b = a.options.chart, c, d = a.options.series, e, f; v(["inverted", "angular", "polar"], function (g) {
                c = K[b.type || b.defaultSeriesType]; f = a[g] || b[g] || c && c.prototype[g]; for (e = d && d.length; !f && e--; ) (c = K[d[e].type]) && c.prototype[g] && (f =
!0); a[g] = f
            })
        }, linkSeries: function () { var a = this, b = a.series; v(b, function (a) { a.linkedSeries.length = 0 }); v(b, function (b) { var d = b.options.linkedTo; V(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && (d.linkedSeries.push(b), b.linkedParent = d) }) }, renderSeries: function () { v(this.series, function (a) { a.translate(); a.setTooltipPoints && a.setTooltipPoints(); a.render() }) }, renderLabels: function () {
            var a = this, b = a.options.labels; b.items && v(b.items, function (c) {
                var d = q(b.style, c.style), e = A(d.left) + a.plotLeft, f = A(d.top) +
a.plotTop + 12; delete d.left; delete d.top; a.renderer.text(c.html, e, f).attr({ zIndex: 2 }).css(d).add()
            })
        }, render: function () {
            var a = this.axes, b = this.renderer, c = this.options; this.setTitle(); this.legend = new ob(this, c.legend); this.getStacks(); v(a, function (a) { a.setScale() }); this.getMargins(); this.maxTicks = null; v(a, function (a) { a.setTickPositions(!0); a.setMaxTicks() }); this.adjustTickAmounts(); this.getMargins(); this.drawChartBox(); this.hasCartesianSeries && v(a, function (a) { a.render() }); this.seriesGroup || (this.seriesGroup =
b.g("series-group").attr({ zIndex: 3 }).add()); this.renderSeries(); this.renderLabels(); this.showCredits(c.credits); this.hasRendered = !0
        }, showCredits: function (a) { a.enabled && !this.credits && (this.credits = this.renderer.text(a.text, 0, 0).on("click", function () { a.href && (location.href = a.href) }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position)) }, destroy: function () {
            var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode; ka(a, "destroy"); sa[a.index] = D; bb--; a.renderTo.removeAttribute("data-highcharts-chart");
            pa(a); for (e = b.length; e--; ) b[e] = b[e].destroy(); for (e = c.length; e--; ) c[e] = c[e].destroy(); v("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (b) { var c = a[b]; c && c.destroy && (a[b] = c.destroy()) }); d && (d.innerHTML = "", pa(d), f && Aa(d)); for (e in a) delete a[e]
        }, isReadyToRender: function () {
            var a = this; return !va && na == na.top && "complete" !== Z.readyState || Ba && !na.canvg ? (Ba ? CanVGController.push(function () { a.firstRender() },
a.options.global.canvasToolsURL) : Z.attachEvent("onreadystatechange", function () { Z.detachEvent("onreadystatechange", a.firstRender); "complete" === Z.readyState && a.firstRender() }), !1) : !0
        }, firstRender: function () {
            var a = this, b = a.options, c = a.callback; a.isReadyToRender() && (a.getContainer(), ka(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), v(b.series || [], function (b) { a.initSeries(b) }), a.linkSeries(), ka(a, "beforeRender"), ha.Pointer && (a.pointer = new Ra(a, b)), a.render(), a.renderer.draw(),
c && c.apply(a, [a]), v(a.callbacks, function (b) { b.apply(a, [a]) }), a.cloneRenderTo(!0), ka(a, "load"))
        }, splashArray: function (a, b) { var c = b[a], c = H(c) ? c : [c, c, c, c]; return [l(b[a + "Top"], c[0]), l(b[a + "Right"], c[1]), l(b[a + "Bottom"], c[2]), l(b[a + "Left"], c[3])] }
    }; qa.prototype.callbacks = []; var Ub = ha.CenteredSeriesMixin = { getCenter: function () {
        var a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), d, e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center, a = [l(b[0], "50%"), l(b[1], "50%"), a.size || "100%", a.innerSize || 0], g = T(e, f), h;
        return Ga(a, function (a, b) { h = /%$/.test(a); d = 2 > b || 2 === b && h; return (h ? [e, f, g, g][b] * A(a) / 100 : a) + (d ? c : 0) })
    }
    }, Ea = function () { }; Ea.prototype = { init: function (a, b, c) { this.series = a; this.applyOptions(b, c); this.pointAttr = {}; a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length && (a.colorCounter = 0)); a.chart.pointCount++; return this }, applyOptions: function (a, b) {
        var c = this.series, d = c.options.pointValKey || c.pointValKey; a = Ea.prototype.optionsToObject.call(this,
a); q(this, a); this.options = this.options ? q(this.options, a) : a; d && (this.y = this[d]); this.x === D && c && (this.x = b === D ? c.autoIncrement() : b); return this
    }, optionsToObject: function (a) {
        var b = {}, c = this.series, d = c.pointArrayMap || ["y"], e = d.length, f = 0, g = 0; if ("number" === typeof a || null === a) b[d[0]] = a; else if (ea(a)) for (a.length > e && (c = typeof a[0], "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), f++); g < e; ) b[d[g++]] = a[f++]; else "object" === typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
        return b
    }, destroy: function () { var a = this.series.chart, b = a.hoverPoints, c; a.pointCount--; b && (this.setState(), E(b, this), b.length || (a.hoverPoints = null)); if (this === a.hoverPoint) this.onMouseOut(); if (this.graphic || this.dataLabel) pa(this), this.destroyElements(); this.legendItem && a.legend.destroyItem(this); for (c in this) this[c] = null }, destroyElements: function () { for (var a = "graphic dataLabel dataLabelUpper group connector shadowGroup".split(" "), b, c = 6; c--; ) b = a[c], this[b] && (this[b] = this[b].destroy()) }, getLabelConfig: function () {
        return { x: this.category,
            y: this.y, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal
        }
    }, tooltipFormatter: function (a) { var b = this.series, c = b.tooltipOptions, d = l(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || ""; v(b.pointArrayMap || ["y"], function (b) { b = "{point." + b; if (e || f) a = a.replace(b + "}", e + b + "}" + f); a = a.replace(b + "}", b + ":,." + d + "f}") }); return p(a, { point: this, series: this.series }) }, firePointEvent: function (a, b, c) {
        var d = this, e = this.series.options; (e.point.events[a] ||
d.options && d.options.events && d.options.events[a]) && this.importEvents(); "click" === a && e.allowPointSelect && (c = function (a) { d.select(null, a.ctrlKey || a.metaKey || a.shiftKey) }); ka(this, a, b, c)
    }
    }; var U = function () { }; U.prototype = { isCartesian: !0, type: "line", pointClass: Ea, sorted: !0, requireSorting: !0, pointAttrToOptions: { stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor", r: "radius" }, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], init: function (a, b) {
        var c = this, d, e, f = a.series, g = function (a,
b) { return l(a.options.index, a._i) - l(b.options.index, b._i) }; c.chart = a; c.options = b = c.setOptions(b); c.linkedSeries = []; c.bindAxes(); q(c, { name: b.name, state: "", pointAttr: {}, visible: !1 !== b.visible, selected: !0 === b.selected }); Ba && (b.animation = !1); e = b.events; for (d in e) aa(c, d, e[d]); if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0; c.getColor(); c.getSymbol(); v(c.parallelArrays, function (a) { c[a + "Data"] = [] }); c.setData(b.data, !1); c.isCartesian && (a.hasCartesianSeries =
!0); f.push(c); c._i = f.length - 1; F(f, g); this.yAxis && F(this.yAxis.series, g); v(f, function (a, b) { a.index = b; a.name = a.name || "Series " + (b + 1) })
    }, bindAxes: function () { var a = this, b = a.options, c = a.chart, d; v(a.axisTypes || [], function (e) { v(c[e], function (c) { d = c.options; if (b[e] === d.index || b[e] !== D && b[e] === d.id || b[e] === D && 0 === d.index) c.series.push(a), a[e] = c, c.isDirty = !0 }); a[e] || a.optionalAxis === e || ya(18, !0) }) }, updateParallelArrays: function (a, b) {
        var c = a.series, d = arguments; v(c.parallelArrays, "number" === typeof b ? function (d) {
            var f =
"y" === d && c.toYData ? c.toYData(a) : a[d]; c[d + "Data"][b] = f
        } : function (a) { Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2)) })
    }, autoIncrement: function () { var a = this.options, b = this.xIncrement, b = l(b, a.pointStart, 0); this.pointInterval = l(this.pointInterval, a.pointInterval, 1); this.xIncrement = b + this.pointInterval; return b }, getSegments: function () {
        var a = -1, b = [], c, d = this.points, e = d.length; if (e) if (this.options.connectNulls) { for (c = e; c--; ) null === d[c].y && d.splice(c, 1); d.length && (b = [d]) } else v(d, function (c,
g) { null === c.y ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1)) }); this.segments = b
    }, setOptions: function (a) { var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type]; this.userOptions = a; c = u(e, c.series, a); this.tooltipOptions = u(ga.tooltip, ga.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip); null === e.marker && delete c.marker; return c }, getCyclic: function (a, b, c) {
        var d = this.userOptions,
e = "_" + a + "Index", f = a + "Counter"; b || (w(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]); this[a] = b
    }, getColor: function () { this.options.colorByPoint || this.getCyclic("color", this.options.color || Y[this.type].color, this.chart.options.colors) }, getSymbol: function () { var a = this.options.marker; this.getCyclic("symbol", a.symbol, this.chart.options.symbols); /^url/.test(this.symbol) && (a.radius = 0) }, drawLegendSymbol: fb.drawLineMarker, setData: function (a, b, c, d) {
        var e = this, f = e.points, g = f && f.length || 0,
h, k = e.options, n = e.chart, m = null, r = e.xAxis, t = r && !!r.categories, x = e.tooltipPoints, z = k.turboThreshold, p = this.xData, s = this.yData, q = (h = e.pointArrayMap) && h.length; a = a || []; h = a.length; b = l(b, !0); if (!1 === d || !h || g !== h || e.cropped || e.hasGroupedData) {
            e.xIncrement = null; e.pointRange = t ? 1 : k.pointRange; e.colorCounter = 0; v(this.parallelArrays, function (a) { e[a + "Data"].length = 0 }); if (z && h > z) {
                for (c = 0; null === m && c < h; ) m = a[c], c++; if (P(m)) {
                    t = l(k.pointStart, 0); k = l(k.pointInterval, 1); for (c = 0; c < h; c++) p[c] = t, s[c] = a[c], t += k; e.xIncrement =
t
                } else if (ea(m)) if (q) for (c = 0; c < h; c++) k = a[c], p[c] = k[0], s[c] = k.slice(1, q + 1); else for (c = 0; c < h; c++) k = a[c], p[c] = k[0], s[c] = k[1]; else ya(12)
            } else for (c = 0; c < h; c++) a[c] !== D && (k = { series: e }, e.pointClass.prototype.applyOptions.apply(k, [a[c]]), e.updateParallelArrays(k, c), t && k.name && (r.names[k.x] = k.name)); V(s[0]) && ya(14, !0); e.data = []; e.options.data = a; for (c = g; c--; ) f[c] && f[c].destroy && f[c].destroy(); x && (x.length = 0); r && (r.minRange = r.userMinRange); e.isDirty = e.isDirtyData = n.isDirtyBox = !0; c = !1
        } else v(a, function (a, b) {
            f[b].update(a,
!1, null, !1)
        }); b && n.redraw(c)
    }, processData: function (a) {
        var b = this.xData, c = this.yData, d = b.length, e; e = 0; var f, g, h = this.xAxis, k, n = this.options; k = n.cropThreshold; var m = 0, r = this.isCartesian, t, x; if (r && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a) return !1; h && (t = h.getExtremes(), x = t.min, t = t.max); if (r && this.sorted && (!k || d > k || this.forceCrop)) if (b[d - 1] < x || b[0] > t) b = [], c = []; else if (b[0] < x || b[d - 1] > t) e = this.cropData(this.xData, this.yData, x, t), b = e.xData, c = e.yData, e = e.start, f = !0, m = b.length; for (k = b.length - 1; 0 <=
k; k--) d = b[k] - b[k - 1], !f && b[k] > x && b[k] < t && m++, 0 < d && (g === D || d < g) ? g = d : 0 > d && this.requireSorting && ya(15); this.cropped = f; this.cropStart = e; this.processedXData = b; this.processedYData = c; this.activePointCount = m; null === n.pointRange && (this.pointRange = g || 1); this.closestPointRange = g
    }, cropData: function (a, b, c, d) { var e = a.length, f = 0, g = e, h = l(this.cropShoulder, 1), k; for (k = 0; k < e; k++) if (a[k] >= c) { f = G(0, k - h); break } for (; k < e; k++) if (a[k] > d) { g = k + h; break } return { xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g} }, generatePoints: function () {
        var a =
this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, k, n = this.hasGroupedData, m, r = [], t; b || n || (b = [], b.length = a.length, b = this.data = b); for (t = 0; t < g; t++) k = h + t, n ? r[t] = (new f).init(this, [d[t]].concat(W(e[t]))) : (b[k] ? m = b[k] : a[k] !== D && (b[k] = m = (new f).init(this, a[k], d[t])), r[t] = m), r[t].index = k; if (b && (g !== (c = b.length) || n)) for (t = 0; t < c; t++) t !== h || n || (t += g), b[t] && (b[t].destroyElements(), b[t].plotX = D); this.data = b; this.points = r
    }, getExtremes: function (a) {
        var b =
this.yAxis, c = this.processedXData, d, e = [], f = 0; d = this.xAxis.getExtremes(); var g = d.min, h = d.max, k, n, m, r; a = a || this.stackedYData || this.processedYData; d = a.length; for (r = 0; r < d; r++) if (n = c[r], m = a[r], k = null !== m && m !== D && (!b.isLog || m.length || 0 < m), n = this.getExtremesFromAll || this.cropped || (c[r + 1] || n) >= g && (c[r - 1] || n) <= h, k && n) if (k = m.length) for (; k--; ) null !== m[k] && (e[f++] = m[k]); else e[f++] = m; this.dataMin = l(void 0, J(e)); this.dataMax = l(void 0, da(e))
    }, translate: function () {
        this.processedXData || this.processData(); this.generatePoints();
        for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, k = a.pointPlacement, n = "between" === k || P(k), m = a.threshold, a = 0; a < g; a++) {
            var r = f[a], t = r.x, x = r.y, z = r.low, p = b && e.stacks[(this.negStacks && x < m ? "-" : "") + this.stackKey]; e.isLog && 0 >= x && (r.y = x = null, ya(10)); r.plotX = c.translate(t, 0, 0, 0, 1, k, "flags" === this.type); b && this.visible && p && p[t] && (p = p[t], x = p.points[this.index + "," + a], z = x[0], x = x[1], 0 === z && (z = l(m, e.min)), e.isLog && 0 >= z && (z = null), r.total = r.stackTotal =
p.total, r.percentage = p.total && r.y / p.total * 100, r.stackY = x, p.setOffset(this.pointXOffset || 0, this.barW || 0)); r.yBottom = w(z) ? e.translate(z, 0, 1, 0, 1) : null; h && (x = this.modifyValue(x, r)); r.plotY = "number" === typeof x && Infinity !== x ? e.translate(x, 0, 1, 0, 1) : D; r.clientX = n ? c.translate(t, 0, 0, 0, 1) : r.plotX; r.negative = r.y < (m || 0); r.category = d && d[r.x] !== D ? d[r.x] : r.x
        } this.getSegments()
    }, animate: function (a) {
        var b = this.chart, c = b.renderer, d; d = this.options.animation; var e = this.clipBox || b.clipBox, f = b.inverted, g; d && !H(d) && (d = Y[this.type].animation);
        g = ["_sharedClip", d.duration, d.easing, e.height].join(); a ? (a = b[g], d = b[g + "m"], a || (b[g] = a = c.clipRect(q(e, { width: 0 })), b[g + "m"] = d = c.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), this.group.clip(a), this.markerGroup.clip(d), this.sharedClipKey = g) : ((a = b[g]) && a.animate({ width: b.plotSizeX }, d), b[g + "m"] && b[g + "m"].animate({ width: b.plotSizeX + 99 }, d), this.animate = null)
    }, afterAnimate: function () {
        var a = this.chart, b = this.sharedClipKey, c = this.group, d = this.clipBox; c && !1 !== this.options.clip && (b &&
d || c.clip(d ? a.renderer.clipRect(d) : a.clipRect), this.markerGroup.clip()); ka(this, "afterAnimate"); setTimeout(function () { b && a[b] && (d || (a[b] = a[b].destroy()), a[b + "m"] && (a[b + "m"] = a[b + "m"].destroy())) }, 100)
    }, drawPoints: function () {
        var a, b = this.points, c = this.chart, d, e, f, g, h, k, n, m, r = this.options.marker, t = this.pointAttr[""], x, z, p, s = this.markerGroup, v = l(r.enabled, !this.requireSorting || this.activePointCount < .5 * this.xAxis.len / r.radius); if (!1 !== r.enabled || this._hasPointMarkers) for (f = b.length; f--; ) g = b[f], d = fa(g.plotX),
e = g.plotY, m = g.graphic, x = g.marker || {}, z = !!g.marker, a = v && x.enabled === D || x.enabled, p = c.isInsidePlot(I(d), e, c.inverted), a && e !== D && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" : ""] || t, h = a.r, k = l(x.symbol, this.symbol), n = 0 === k.indexOf("url"), m ? m[p ? "show" : "hide"](!0).animate(q({ x: d - h, y: e - h }, m.symbolName ? { width: 2 * h, height: 2 * h} : {})) : p && (0 < h || n) && (g.graphic = c.renderer.symbol(k, d - h, e - h, 2 * h, 2 * h, z ? x : r).attr(a).add(s))) : m && (g.graphic = m.destroy())
    }, convertAttribs: function (a, b, c, d) {
        var e = this.pointAttrToOptions,
f, g, h = {}; a = a || {}; b = b || {}; c = c || {}; d = d || {}; for (f in e) g = e[f], h[f] = l(a[g], b[f], c[f], d[f]); return h
    }, getAttribs: function () {
        var a = this, b = a.options, c = Y[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color; f = { stroke: g, fill: g }; var h = a.points || [], k, n = [], m, r = a.pointAttrToOptions; m = a.hasPointSpecificOptions; var t = b.negativeColor, x = c.lineColor, z = c.fillColor; k = b.turboThreshold; var p; b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : e.color = e.color ||
Ka(e.color || g).brighten(e.brightness).get(); n[""] = a.convertAttribs(c, f); v(["hover", "select"], function (b) { n[b] = a.convertAttribs(d[b], n[""]) }); a.pointAttr = n; g = h.length; if (!k || g < k || m) for (; g--; ) {
            k = h[g]; (c = k.options && k.options.marker || k.options) && !1 === c.enabled && (c.radius = 0); k.negative && t && (k.color = k.fillColor = t); m = b.colorByPoint || k.color; if (k.options) for (p in r) w(c[r[p]]) && (m = !0); m ? (c = c || {}, m = [], d = c.states || {}, f = d.hover = d.hover || {}, b.marker || (f.color = f.color || !k.options.color && e.color || Ka(k.color).brighten(f.brightness ||
e.brightness).get()), f = { color: k.color }, z || (f.fillColor = k.color), x || (f.lineColor = k.color), m[""] = a.convertAttribs(q(f, c), n[""]), m.hover = a.convertAttribs(d.hover, n.hover, m[""]), m.select = a.convertAttribs(d.select, n.select, m[""])) : m = n; k.pointAttr = m
        }
    }, destroy: function () {
        var a = this, b = a.chart, c = /AppleWebKit\/533/.test(Ma), d, e, f = a.data || [], g, h, k; ka(a, "destroy"); pa(a); v(a.axisTypes || [], function (b) { if (k = a[b]) E(k.series, a), k.isDirty = k.forceRedraw = !0 }); a.legendItem && a.chart.legend.destroyItem(a); for (e = f.length; e--; ) (g =
f[e]) && g.destroy && g.destroy(); a.points = null; clearTimeout(a.animationTimeout); v("area graph dataLabelsGroup group markerGroup tracker graphNeg areaNeg posClip negClip".split(" "), function (b) { a[b] && (d = c && "group" === b ? "hide" : "destroy", a[b][d]()) }); b.hoverSeries === a && (b.hoverSeries = null); E(b.series, a); for (h in a) delete a[h]
    }, getSegmentPath: function (a) {
        var b = this, c = [], d = b.options.step; v(a, function (e, f) {
            var g = e.plotX, h = e.plotY, k; b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"),
d && f && (k = a[f - 1], "right" === d ? c.push(k.plotX, h) : "center" === d ? c.push((k.plotX + g) / 2, k.plotY, (k.plotX + g) / 2, h) : c.push(g, k.plotY)), c.push(e.plotX, e.plotY))
        }); return c
    }, getGraphPath: function () { var a = this, b = [], c, d = []; v(a.segments, function (e) { c = a.getSegmentPath(e); 1 < e.length ? b = b.concat(c) : d.push(e[0]) }); a.singlePoints = d; return a.graphPath = b }, drawGraph: function () {
        var a = this, b = this.options, c = [["graph", b.lineColor || this.color]], d = b.lineWidth, e = b.dashStyle, f = "square" !== b.linecap, g = this.getGraphPath(), h = b.negativeColor;
        h && c.push(["graphNeg", h]); v(c, function (c, h) { var m = c[0], r = a[m]; r ? (cb(r), r.animate({ d: g })) : d && g.length && (r = { stroke: c[1], "stroke-width": d, fill: "none", zIndex: 1 }, e ? r.dashstyle = e : f && (r["stroke-linecap"] = r["stroke-linejoin"] = "round"), a[m] = a.chart.renderer.path(g).attr(r).add(a.group).shadow(!h && b.shadow)) })
    }, clipNeg: function () {
        var a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor || a.negativeFillColor, e, f = this.graph, g = this.area, h = this.posClip, k = this.negClip; e = b.chartWidth; var n = b.chartHeight, m = G(e,
n), r = this.yAxis; d && (f || g) && (d = I(r.toPixels(a.threshold || 0, !0)), 0 > d && (m -= d), a = { x: 0, y: 0, width: m, height: d }, m = { x: 0, y: d, width: m, height: m }, b.inverted && (a.height = m.y = b.plotWidth - d, c.isVML && (a = { x: b.plotWidth - d - b.plotLeft, y: 0, width: e, height: n }, m = { x: d + b.plotLeft - e, y: 0, width: b.plotLeft + d, height: e })), r.reversed ? (b = m, e = a) : (b = a, e = m), h ? (h.animate(b), k.animate(e)) : (this.posClip = h = c.clipRect(b), this.negClip = k = c.clipRect(e), f && this.graphNeg && (f.clip(h), this.graphNeg.clip(k)), g && (g.clip(h), this.areaNeg.clip(k))))
    },
        invertGroups: function () { function a() { var a = { width: b.yAxis.len, height: b.xAxis.len }; v(["group", "markerGroup"], function (c) { b[c] && b[c].attr(a).invert() }) } var b = this, c = b.chart; b.xAxis && (aa(c, "resize", a), aa(b, "destroy", function () { pa(c, "resize", a) }), a(), b.invertGroups = a) }, plotGroup: function (a, b, c, d, e) { var f = this[a], g = !f; g && (this[a] = f = this.chart.renderer.g(b).attr({ visibility: c, zIndex: d || .1 }).add(e)); f[g ? "attr" : "animate"](this.getPlotBox()); return f }, getPlotBox: function () {
            var a = this.chart, b = this.xAxis, c =
this.yAxis; a.inverted && (b = c, c = this.xAxis); return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 }
        }, render: function () {
            var a = this, b = a.chart, c, d = a.options, e = (c = d.animation) && !!a.animate && b.renderer.isSVG && l(c.duration, 500) || 0, f = a.visible ? "visible" : "hidden", g = d.zIndex, h = a.hasRendered, k = b.seriesGroup; c = a.plotGroup("group", "series", f, g, k); a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, k); e && a.animate(!0); a.getAttribs(); c.inverted = a.isCartesian ? b.inverted : !1; a.drawGraph &&
(a.drawGraph(), a.clipNeg()); v(a.points, function (a) { a.redraw && a.redraw() }); a.drawDataLabels && a.drawDataLabels(); a.visible && a.drawPoints(); a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker(); b.inverted && a.invertGroups(); !1 === d.clip || a.sharedClipKey || h || c.clip(b.clipRect); e && a.animate(); h || (e ? a.animationTimeout = setTimeout(function () { a.afterAnimate() }, e) : a.afterAnimate()); a.isDirty = a.isDirtyData = !1; a.hasRendered = !0
        }, redraw: function () {
            var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis,
e = this.yAxis; c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: l(d && d.left, a.plotLeft), translateY: l(e && e.top, a.plotTop) })); this.translate(); this.setTooltipPoints && this.setTooltipPoints(!0); this.render(); b && ka(this, "updatedData")
        }
    }; Ob.prototype = { destroy: function () { la(this, this.axis) }, render: function (a) {
        var b = this.options, c = b.format, c = c ? p(c, this) : b.formatter.call(this); this.label ? this.label.attr({ text: c, visibility: "hidden" }) : this.label = this.axis.chart.renderer.text(c,
null, null, b.useHTML).css(b.style).attr({ align: this.textAlign, rotation: b.rotation, visibility: "hidden" }).add(a)
    }, setOffset: function (a, b) {
        var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = ia(g - c), h = d.xAxis[0].translate(this.x) + a, k = d.plotHeight, f = { x: e ? f ? g : g - c : h, y: e ? k - h - b : f ? k - g - c : k - g, width: e ? c : b, height: e ? b : c }; if (e = this.label) e.align(this.alignOptions, null, f), f = e.alignAttr, e[!1 === this.options.crop || d.isInsidePlot(f.x, f.y) ? "show" :
"hide"](!0)
    }
    }; $.prototype.buildStacks = function () { var a = this.series, b = l(this.options.reversedStacks, !0), c = a.length; if (!this.isXAxis) { for (this.usePercentage = !1; c--; ) a[b ? c : a.length - c - 1].setStackedPoints(); if (this.usePercentage) for (c = 0; c < a.length; c++) a[c].setPercentStacks() } }; $.prototype.renderStackTotals = function () {
        var a = this.chart, b = a.renderer, c = this.stacks, d, e, f = this.stackTotalGroup; f || (this.stackTotalGroup = f = b.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add()); f.translate(a.plotLeft, a.plotTop);
        for (d in c) for (e in a = c[d], a) a[e].render(f)
    }; U.prototype.setStackedPoints = function () {
        if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
            var a = this.processedXData, b = this.processedYData, c = [], d = b.length, e = this.options, f = e.threshold, g = e.stack, e = e.stacking, h = this.stackKey, k = "-" + h, n = this.negStacks, m = this.yAxis, r = m.stacks, t = m.oldStacks, x, z, p, s, l, v; for (s = 0; s < d; s++) l = a[s], v = b[s], p = this.index + "," + s, z = (x = n && v < f) ? k : h, r[z] || (r[z] = {}), r[z][l] || (t[z] && t[z][l] ? (r[z][l] =
t[z][l], r[z][l].total = null) : r[z][l] = new Ob(m, m.options.stackLabels, x, l, g)), z = r[z][l], z.points[p] = [z.cum || 0], "percent" === e ? (x = x ? h : k, n && r[x] && r[x][l] ? (x = r[x][l], z.total = x.total = G(x.total, z.total) + ia(v) || 0) : z.total = ma(z.total + (ia(v) || 0))) : z.total = ma(z.total + (v || 0)), z.cum = (z.cum || 0) + (v || 0), z.points[p].push(z.cum), c[s] = z.cum; "percent" === e && (m.usePercentage = !0); this.stackedYData = c; m.oldStacks = {}
        }
    }; U.prototype.setPercentStacks = function () {
        var a = this, b = a.stackKey, c = a.yAxis.stacks, d = a.processedXData; v([b, "-" +
b], function (b) { for (var f = d.length, g, h; f--; ) if (g = d[f], g = (h = c[b] && c[b][g]) && h.points[a.index + "," + f]) h = h.total ? 100 / h.total : 0, g[0] = ma(g[0] * h), g[1] = ma(g[1] * h), a.stackedYData[f] = g[1] })
    }; var lc = Q(U); K.line = lc; Y.area = u(db, { threshold: 0 }); var Vb = Q(U, { type: "area", getSegments: function () {
        var a = this, b = [], c = [], d = [], e = this.xAxis, f = this.yAxis, g = f.stacks[this.stackKey], h = {}, k, n, m = this.points, r = this.options.connectNulls, t, x; if (this.options.stacking && !this.cropped) {
            for (t = 0; t < m.length; t++) h[m[t].x] = m[t]; for (x in g) null !==
g[x].total && d.push(+x); d.sort(function (a, b) { return a - b }); v(d, function (b) { var d = 0, m; if (!r || h[b] && null !== h[b].y) if (h[b]) c.push(h[b]); else { for (t = a.index; t <= f.series.length; t++) if (m = g[b].points[t + "," + b]) { d = m[1]; break } k = e.translate(b); n = f.toPixels(d, !0); c.push({ y: null, plotX: k, clientX: k, plotY: n, yBottom: n, onMouseOver: oa }) } }); c.length && b.push(c)
        } else U.prototype.getSegments.call(this), b = this.segments; this.segments = b
    }, getSegmentPath: function (a) {
        var b = U.prototype.getSegmentPath.call(this, a), c = [].concat(b),
d, e = this.options; d = b.length; var f = this.yAxis.getThreshold(e.threshold), g; 3 === d && c.push("L", b[1], b[2]); if (e.stacking && !this.closedStacks) for (d = a.length - 1; 0 <= d; d--) g = l(a[d].yBottom, f), d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g); else this.closeSegment(c, a, f); this.areaPath = this.areaPath.concat(c); return b
    }, closeSegment: function (a, b, c) { a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c) }, drawGraph: function () {
        this.areaPath = []; U.prototype.drawGraph.apply(this); var a = this, b = this.areaPath,
c = this.options, d = c.negativeColor, e = c.negativeFillColor, f = [["area", this.color, c.fillColor]]; (d || e) && f.push(["areaNeg", d, e]); v(f, function (d) { var e = d[0], f = a[e]; f ? f.animate({ d: b }) : a[e] = a.chart.renderer.path(b).attr({ fill: l(d[2], Ka(d[1]).setOpacity(l(c.fillOpacity, .75)).get()), zIndex: 0 }).add(a.group) })
    }, drawLegendSymbol: fb.drawRectangle
    }); K.area = Vb; Y.spline = u(db); var Wb = Q(U, { type: "spline", getPointSpline: function (a, b, c) {
        var d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1], h, k, n, m; if (f && g) {
            a = f.plotY; n = g.plotX; var g =
g.plotY, r; h = (1.5 * d + f.plotX) / 2.5; k = (1.5 * e + a) / 2.5; n = (1.5 * d + n) / 2.5; m = (1.5 * e + g) / 2.5; r = (m - k) * (n - d) / (n - h) + e - m; k += r; m += r; k > a && k > e ? (k = G(a, e), m = 2 * e - k) : k < a && k < e && (k = T(a, e), m = 2 * e - k); m > g && m > e ? (m = G(g, e), k = 2 * e - m) : m < g && m < e && (m = T(g, e), k = 2 * e - m); b.rightContX = n; b.rightContY = m
        } c ? (b = ["C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, k || e, d, e], f.rightContX = f.rightContY = null) : b = ["M", d, e]; return b
    }
    }); K.spline = Wb; Y.areaspline = u(Y.area); var Eb = Vb.prototype, mc = Q(Wb, { type: "areaspline", closedStacks: !0, getSegmentPath: Eb.getSegmentPath,
        closeSegment: Eb.closeSegment, drawGraph: Eb.drawGraph, drawLegendSymbol: fb.drawRectangle
    }); K.areaspline = mc; Y.column = u(db, { borderColor: "#FFFFFF", borderRadius: 0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { brightness: .1, shadow: !1, halo: !1 }, select: { color: "#C0C0C0", borderColor: "#000000", shadow: !1} }, dataLabels: { align: null, verticalAlign: null, y: null }, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0 }); var Fb = Q(U, { type: "column", pointAttrToOptions: { stroke: "borderColor",
        fill: "color", r: "borderRadius"
    }, cropShoulder: 0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () { U.prototype.init.apply(this, arguments); var a = this, b = a.chart; b.hasRendered && v(b.series, function (b) { b.type === a.type && (b.isDirty = !0) }) }, getColumnMetrics: function () {
        var a = this, b = a.options, c = a.xAxis, d = a.yAxis, e = c.reversed, f, g = {}, h, k = 0; !1 === b.grouping ? k = 1 : v(a.chart.series, function (b) {
            var c = b.options, e = b.yAxis; b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos && (c.stacking ? (f = b.stackKey,
g[f] === D && (g[f] = k++), h = g[f]) : !1 !== c.grouping && (h = k++), b.columnIndex = h)
        }); var c = T(ia(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len), n = c * b.groupPadding, m = (c - 2 * n) / k, r = b.pointWidth, b = w(r) ? (m - r) / 2 : m * b.pointPadding, r = l(r, m - 2 * b); return a.columnMetrics = { width: r, offset: b + (n + ((e ? k - (a.columnIndex || 0) : a.columnIndex) || 0) * m - c / 2) * (e ? -1 : 1) }
    }, translate: function () {
        var a = this, b = a.chart, c = a.options, d = a.borderWidth = l(c.borderWidth, a.activePointCount > .5 * a.xAxis.len ? 0 : 1), e = a.yAxis,
f = a.translatedThreshold = e.getThreshold(c.threshold), g = l(c.minPointLength, 5), h = a.getColumnMetrics(), k = h.width, n = a.barW = G(k, 1 + 2 * d), m = a.pointXOffset = h.offset, r = -(d % 2 ? .5 : 0), t = d % 2 ? .5 : 1; b.renderer.isVML && b.inverted && (t += 1); c.pointPadding && (n = Ua(n)); U.prototype.translate.apply(a); v(a.points, function (c) {
    var d = l(c.yBottom, f), h = T(G(-999 - d, c.plotY), e.len + 999 + d), p = c.plotX + m, s = n, v = T(h, d), q; q = G(h, d) - v; ia(q) < g && g && (q = g, v = I(ia(v - f) > g ? d - g : f - (e.translate(c.y, 0, 1, 0, 1) <= f ? g : 0))); c.barX = p; c.pointWidth = k; c.tooltipPos =
b.inverted ? [e.len - h, a.xAxis.len - p - s / 2] : [p + s / 2, h + e.pos - b.plotTop]; s = I(p + s) + r; p = I(p) + r; s -= p; d = .5 > ia(v); q = I(v + q) + t; v = I(v) + t; q -= v; d && (v -= 1, q += 1); c.shapeType = "rect"; c.shapeArgs = { x: p, y: v, width: s, height: q }
})
    }, getSymbol: oa, drawLegendSymbol: fb.drawRectangle, drawGraph: oa, drawPoints: function () {
        var a = this, b = this.chart, c = a.options, d = b.renderer, e = c.animationLimit || 250, f, g; v(a.points, function (h) {
            var k = h.plotY, n = h.graphic; k === D || isNaN(k) || null === h.y ? n && (h.graphic = n.destroy()) : (f = h.shapeArgs, k = w(a.borderWidth) ? { "stroke-width": a.borderWidth} :
{}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], n ? (cb(n), n.attr(k)[b.pointCount < e ? "animate" : "attr"](u(f))) : h.graphic = d[h.shapeType](f).attr(g).attr(k).add(a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius))
        })
    }, animate: function (a) {
        var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {}; va && (a ? (e.scaleY = .001, a = T(b.pos + b.len, G(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e,
this.options.animation), this.animate = null))
    }, remove: function () { var a = this, b = a.chart; b.hasRendered && v(b.series, function (b) { b.type === a.type && (b.isDirty = !0) }); U.prototype.remove.apply(a, arguments) }
    }); K.column = Fb; Y.bar = u(Y.column); var nc = Q(Fb, { type: "bar", inverted: !0 }); K.bar = nc; Y.scatter = u(db, { lineWidth: 0, tooltip: { headerFormat: '<span style="color:{series.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" }, stickyTracking: !1 });
    var Xb = Q(U, { type: "scatter", sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, singularTooltips: !0, drawGraph: function () { this.options.lineWidth && U.prototype.drawGraph.call(this) } }); K.scatter = Xb; Y.pie = u(db, { borderColor: "#FFFFFF", borderWidth: 1, center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { distance: 30, enabled: !0, formatter: function () { return this.point.name } }, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1,
        slicedOffset: 10, states: { hover: { brightness: .1, shadow: !1} }, stickyTracking: !1, tooltip: { followPointer: !0 }
    }); var Gb = { type: "pie", isCartesian: !1, pointClass: Q(Ea, { init: function () { Ea.prototype.init.apply(this, arguments); var a = this, b; 0 > a.y && (a.y = null); q(a, { visible: !1 !== a.visible, name: l(a.name, "Slice") }); b = function (b) { a.slice("select" === b.type) }; aa(a, "select", b); aa(a, "unselect", b); return a }, setVisible: function (a) {
        var b = this, c = b.series, d = c.chart; b.visible = b.options.visible = a = a === D ? !b.visible : a; c.options.data[Va(b,
c.data)] = b.options; v(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) { if (b[c]) b[c][a ? "show" : "hide"](!0) }); b.legendItem && d.legend.colorizeItem(b, a); !c.isDirty && c.options.ignoreHiddenPoint && (c.isDirty = !0, d.redraw())
    }, slice: function (a, b, c) { var d = this.series; Ca = l(c, d.chart.animation); l(b, !0); this.sliced = this.options.sliced = a = w(a) ? a : !this.sliced; d.options.data[Va(this, d.data)] = this.options; a = a ? this.slicedTranslation : { translateX: 0, translateY: 0 }; this.graphic.animate(a); this.shadowGroup && this.shadowGroup.animate(a) },
        haloPath: function (a) { var b = this.shapeArgs, c = this.series.chart; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, { innerR: this.shapeArgs.r, start: b.start, end: b.end }) }
    }), requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttrToOptions: { stroke: "borderColor", "stroke-width": "borderWidth", fill: "color" }, singularTooltips: !0, getColor: oa, animate: function (a) {
        var b = this, c = b.points, d = b.startAngleRad;
        a || (v(c, function (a) { var c = a.graphic; a = a.shapeArgs; c && (c.attr({ r: b.center[3] / 2, start: d, end: d }), c.animate({ r: a.r, start: a.start, end: a.end }, b.options.animation)) }), b.animate = null)
    }, setData: function (a, b, c, d) { U.prototype.setData.call(this, a, !1, c, d); this.processData(); this.generatePoints(); l(b, !0) && this.chart.redraw(c) }, generatePoints: function () {
        var a, b = 0, c, d, e, f = this.options.ignoreHiddenPoint; U.prototype.generatePoints.call(this); c = this.points; d = c.length; for (a = 0; a < d; a++) e = c[a], b += f && !e.visible ? 0 : e.y; this.total =
b; for (a = 0; a < d; a++) e = c[a], e.percentage = 0 < b ? e.y / b * 100 : 0, e.total = b
    }, translate: function (a) {
        this.generatePoints(); var b = 0, c = this.options, d = c.slicedOffset, e = d + c.borderWidth, f, g, h, k = c.startAngle || 0, n = this.startAngleRad = Fa / 180 * (k - 90), k = (this.endAngleRad = Fa / 180 * (l(c.endAngle, k + 360) - 90)) - n, m = this.points, r = c.dataLabels.distance, c = c.ignoreHiddenPoint, t, x = m.length, p; a || (this.center = a = this.getCenter()); this.getX = function (b, c) { h = ja.asin(T((b - a[1]) / (a[2] / 2 + r), 1)); return a[0] + (c ? -1 : 1) * wa(h) * (a[2] / 2 + r) }; for (t = 0; t <
x; t++) {
            p = m[t]; f = n + b * k; if (!c || p.visible) b += p.percentage / 100; g = n + b * k; p.shapeType = "arc"; p.shapeArgs = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: I(1E3 * f) / 1E3, end: I(1E3 * g) / 1E3 }; h = (g + f) / 2; h > 1.5 * Fa ? h -= 2 * Fa : h < -Fa / 2 && (h += 2 * Fa); p.slicedTranslation = { translateX: I(wa(h) * d), translateY: I(xa(h) * d) }; f = wa(h) * a[2] / 2; g = xa(h) * a[2] / 2; p.tooltipPos = [a[0] + .7 * f, a[1] + .7 * g]; p.half = h < -Fa / 2 || h > Fa / 2 ? 1 : 0; p.angle = h; e = T(e, r / 2); p.labelPos = [a[0] + f + wa(h) * r, a[1] + g + xa(h) * r, a[0] + f + wa(h) * e, a[1] + g + xa(h) * e, a[0] + f, a[1] + g, 0 > r ? "center" : p.half ?
"right" : "left", h]
        }
    }, drawGraph: null, drawPoints: function () {
        var a = this, b = a.chart.renderer, c, d, e = a.options.shadow, f, g; e && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group)); v(a.points, function (h) {
            d = h.graphic; g = h.shapeArgs; f = h.shadowGroup; e && !f && (f = h.shadowGroup = b.g("shadow").add(a.shadowGroup)); c = h.sliced ? h.slicedTranslation : { translateX: 0, translateY: 0 }; f && f.attr(c); d ? d.animate(q(g, c)) : h.graphic = d = b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? "select" : ""]).attr({ "stroke-linejoin": "round" }).attr(c).add(a.group).shadow(e,
f); void 0 !== h.visible && h.setVisible(h.visible)
        })
    }, sortByAngle: function (a, b) { a.sort(function (a, d) { return void 0 !== a.angle && (d.angle - a.angle) * b }) }, drawLegendSymbol: fb.drawRectangle, getCenter: Ub.getCenter, getSymbol: oa
    }, Gb = Q(U, Gb); K.pie = Gb; U.prototype.drawDataLabels = function () {
        var a = this, b = a.options, c = b.cursor, d = b.dataLabels, e = a.points, f, g, h = a.hasRendered || 0, k, n; if (d.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(d), n = a.plotGroup("dataLabelsGroup", "data-labels", d.defer ? "hidden" : "visible",
d.zIndex || 6), l(d.defer, !0) && (n.attr({ opacity: +h }), h || aa(a, "afterAnimate", function () { a.visible && n.show(); n[b.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 }) })), g = d, v(e, function (b) {
    var e, h = b.dataLabel, x, s, v = b.connector, B = !0; f = b.options && b.options.dataLabels; e = l(f && f.enabled, g.enabled); if (h && !e) b.dataLabel = h.destroy(); else if (e) {
        d = u(g, f); e = d.rotation; x = b.getLabelConfig(); k = d.format ? p(d.format, x) : d.formatter.call(x, d); d.style.color = l(d.color, d.style.color, a.color, "black"); if (h) w(k) ? (h.attr({ text: k }),
B = !1) : (b.dataLabel = h = h.destroy(), v && (b.connector = v.destroy())); else if (w(k)) { h = { fill: d.backgroundColor, stroke: d.borderColor, "stroke-width": d.borderWidth, r: d.borderRadius || 0, rotation: e, padding: d.padding, zIndex: 1 }; for (s in h) h[s] === D && delete h[s]; h = b.dataLabel = a.chart.renderer[e ? "text" : "label"](k, 0, -999, null, null, null, d.useHTML).attr(h).css(q(d.style, c && { cursor: c })).add(n).shadow(d.shadow) } h && a.alignDataLabel(b, h, d, null, B)
    }
})
    }; U.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted,
h = l(a.plotX, -999), k = l(a.plotY, -999), n = b.getBBox(); if (a = this.visible && (a.series.forceDL || f.isInsidePlot(h, I(k), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g))) d = q({ x: g ? f.plotWidth - k : h, y: I(g ? f.plotHeight - h : k), width: 0, height: 0 }, d), q(c, { width: n.width, height: n.height }), c.rotation ? b[e ? "attr" : "animate"]({ x: d.x + c.x + d.width / 2, y: d.y + c.y + d.height / 2 }).attr({ align: c.align }) : (b.align(c, null, d), g = b.alignAttr, "justify" === l(c.overflow, "justify") ? this.justifyDataLabel(b, c, g, n, d, e) : l(c.crop, !0) && (a = f.isInsidePlot(g.x,
g.y) && f.isInsidePlot(g.x + n.width, g.y + n.height))); a || (b.attr({ y: -999 }), b.placed = !1)
    }; U.prototype.justifyDataLabel = function (a, b, c, d, e, f) { var g = this.chart, h = b.align, k = b.verticalAlign, n, m; n = c.x; 0 > n && ("right" === h ? b.align = "left" : b.x = -n, m = !0); n = c.x + d.width; n > g.plotWidth && ("left" === h ? b.align = "right" : b.x = g.plotWidth - n, m = !0); n = c.y; 0 > n && ("bottom" === k ? b.verticalAlign = "top" : b.y = -n, m = !0); n = c.y + d.height; n > g.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = g.plotHeight - n, m = !0); m && (a.placed = !f, a.align(b, null, e)) };
    K.pie && (K.pie.prototype.drawDataLabels = function () {
        var a = this, b = a.data, c, d = a.chart, e = a.options.dataLabels, f = l(e.connectorPadding, 10), g = l(e.connectorWidth, 1), h = d.plotWidth, k = d.plotHeight, n, m, r = l(e.softConnector, !0), t = e.distance, x = a.center, p = x[2] / 2, s = x[1], q = 0 < t, B, y, C, O = [[], []], F, J, w, D, u, R = [0, 0, 0, 0], E = function (a, b) { return b.y - a.y }; if (a.visible && (e.enabled || a._hasPointLabels)) {
            U.prototype.drawDataLabels.apply(a); v(b, function (a) { a.dataLabel && a.visible && O[a.half].push(a) }); for (D = 2; D--; ) {
                var M = [], K = [], la =
O[D], L = la.length, A; if (L) {
                    a.sortByAngle(la, D - .5); for (u = b = 0; !b && la[u]; ) b = la[u] && la[u].dataLabel && (la[u].dataLabel.getBBox().height || 21), u++; if (0 < t) {
                        y = T(s + p + t, d.plotHeight); for (u = G(0, s - p - t); u <= y; u += b) M.push(u); y = M.length; if (L > y) { c = [].concat(la); c.sort(E); for (u = L; u--; ) c[u].rank = u; for (u = L; u--; ) la[u].rank >= y && la.splice(u, 1); L = la.length } for (u = 0; u < L; u++) {
                            c = la[u]; C = c.labelPos; c = 9999; var P, N; for (N = 0; N < y; N++) P = ia(M[N] - C[1]), P < c && (c = P, A = N); if (A < u && null !== M[u]) A = u; else for (y < L - u + A && null !== M[u] && (A = y - L + u); null ===
M[A]; ) A++; K.push({ i: A, y: M[A] }); M[A] = null
                        } K.sort(E)
                    } for (u = 0; u < L; u++) {
                        c = la[u]; C = c.labelPos; B = c.dataLabel; w = !1 === c.visible ? "hidden" : "visible"; c = C[1]; if (0 < t) { if (y = K.pop(), A = y.i, J = y.y, c > J && null !== M[A + 1] || c < J && null !== M[A - 1]) J = T(G(0, c), d.plotHeight) } else J = c; F = e.justify ? x[0] + (D ? -1 : 1) * (p + t) : a.getX(J === s - p - t || J === s + p + t ? c : J, D); B._attr = { visibility: w, align: C[6] }; B._pos = { x: F + e.x + ({ left: f, right: -f}[C[6]] || 0), y: J + e.y - 10 }; B.connX = F; B.connY = J; null === this.options.size && (y = B.width, F - y < f ? R[3] = G(I(y - F + f), R[3]) : F + y > h -
f && (R[1] = G(I(F + y - h + f), R[1])), 0 > J - b / 2 ? R[0] = G(I(-J + b / 2), R[0]) : J + b / 2 > k && (R[2] = G(I(J + b / 2 - k), R[2])))
                    }
                }
            } if (0 === da(R) || this.verifyDataLabelOverflow(R)) this.placeDataLabels(), q && g && v(this.points, function (b) {
                n = b.connector; C = b.labelPos; (B = b.dataLabel) && B._pos ? (w = B._attr.visibility, F = B.connX, J = B.connY, m = r ? ["M", F + ("left" === C[6] ? 5 : -5), J, "C", F, J, 2 * C[2] - C[4], 2 * C[3] - C[5], C[2], C[3], "L", C[4], C[5]] : ["M", F + ("left" === C[6] ? 5 : -5), J, "L", C[2], C[3], "L", C[4], C[5]], n ? (n.animate({ d: m }), n.attr("visibility", w)) : b.connector = n = a.chart.renderer.path(m).attr({ "stroke-width": g,
                    stroke: e.connectorColor || b.color || "#606060", visibility: w
                }).add(a.dataLabelsGroup)) : n && (b.connector = n.destroy())
            })
        }
    }, K.pie.prototype.placeDataLabels = function () { v(this.points, function (a) { a = a.dataLabel; var b; a && ((b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({ y: -999 })) }) }, K.pie.prototype.alignDataLabel = oa, K.pie.prototype.verifyDataLabelOverflow = function (a) {
        var b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80, f; null !== d[0] ? e = G(b[2] - G(a[1], a[3]), c) : (e = G(b[2] -
a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2); null !== d[1] ? e = G(T(e, b[2] - G(a[0], a[2])), c) : (e = G(T(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2); e < b[2] ? (b[2] = e, this.translate(b), v(this.points, function (a) { a.dataLabel && (a.dataLabel._pos = null) }), this.drawDataLabels && this.drawDataLabels()) : f = !0; return f
    }); K.column && (K.column.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted, h = a.dlBox || a.shapeArgs, k = a.below || a.plotY > l(this.translatedThreshold, f.plotSizeY), n = l(c.inside, !!this.options.stacking); h &&
(d = u(h), g && (d = { x: f.plotWidth - d.y - d.height, y: f.plotHeight - d.x - d.width, width: d.height, height: d.width }), n || (g ? (d.x += k ? 0 : d.width, d.width = 0) : (d.y += k ? d.height : 0, d.height = 0))); c.align = l(c.align, !g || n ? "center" : k ? "right" : "left"); c.verticalAlign = l(c.verticalAlign, g || n ? "middle" : k ? "top" : "bottom"); U.prototype.alignDataLabel.call(this, a, b, c, d, e)
    }); var Wa = ha.TrackerMixin = { drawTrackerPoint: function () {
        var a = this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && { cursor: d }, f = function (c) {
            var d = c.target, e; if (b.hoverSeries !==
a) a.onMouseOver(); for (; d && !e; ) e = d.point, d = d.parentNode; if (e !== D && e !== b.hoverPoint) e.onMouseOver(c)
        }; v(a.points, function (a) { a.graphic && (a.graphic.element.point = a); a.dataLabel && (a.dataLabel.element.point = a) }); a._hasTracking || (v(a.trackerGroups, function (b) { if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) { c.onTrackerMouseOut(a) }).css(e), $a)) a[b].on("touchstart", f) }), a._hasTracking = !0)
    }, drawTrackerGraph: function () {
        var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ?
a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, k = f.options.tooltip.snap, n = a.tracker, m = b.cursor, r = m && { cursor: m }, m = a.singlePoints, t, x = function () { if (f.hoverSeries !== a) a.onMouseOver() }, p = "rgba(192,192,192," + (va ? 1E-4 : .002) + ")"; if (e && !c) for (t = e + 1; t--; ) "M" === d[t] && d.splice(t + 1, 0, d[t + 1] - k, d[t + 2], "L"), (t && "M" === d[t] || t === e) && d.splice(t, 0, "L", d[t - 2] + k, d[t - 1]); for (t = 0; t < m.length; t++) e = m[t], d.push("M", e.plotX - k, e.plotY, "L", e.plotX + k, e.plotY); n ? n.attr({ d: d }) : (a.tracker = h.path(d).attr({ "stroke-linejoin": "round",
    visibility: a.visible ? "visible" : "hidden", stroke: p, fill: c ? p : "none", "stroke-width": b.lineWidth + (c ? 0 : 2 * k), zIndex: 2
}).add(a.group), v([a.tracker, a.markerGroup], function (a) { a.addClass("highcharts-tracker").on("mouseover", x).on("mouseout", function (a) { g.onTrackerMouseOut(a) }).css(r); if ($a) a.on("touchstart", x) }))
    }
    }; K.column && (Fb.prototype.drawTracker = Wa.drawTrackerPoint); K.pie && (K.pie.prototype.drawTracker = Wa.drawTrackerPoint); K.scatter && (Xb.prototype.drawTracker = Wa.drawTrackerPoint); q(ob.prototype, { setItemEvents: function (a,
b, c, d, e) { var f = this; (c ? b : a.legendGroup).on("mouseover", function () { a.setState("hover"); b.css(f.options.itemHoverStyle) }).on("mouseout", function () { b.css(a.visible ? d : e); a.setState() }).on("click", function (b) { var c = function () { a.setVisible() }; b = { browserEvent: b }; a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : ka(a, "legendItemClick", b, c) }) }, createCheckboxForItem: function (a) {
    a.checkbox = ba("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);
    aa(a.checkbox, "click", function (b) { ka(a, "checkboxClick", { checked: b.target.checked }, function () { a.select() }) })
}
    }); ga.legend.itemStyle.cursor = "pointer"; q(qa.prototype, { showResetZoom: function () { var a = this, b = ga.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox"; this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () { a.zoomOut() }, d, e && e.hover).attr({ align: c.position.align, title: b.resetZoomTitle }).add().align(c.position, !1, f) }, zoomOut: function () {
        var a =
this; ka(a, "selection", { resetSelection: !0 }, function () { a.zoom() })
    }, zoom: function (a) { var b, c = this.pointer, d = !1, e; !a || a.resetSelection ? v(this.axes, function (a) { b = a.zoom() }) : v(a.xAxis.concat(a.yAxis), function (a) { var e = a.axis, h = e.isXAxis; if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"]) b = e.zoom(a.min, a.max), e.displayBtn && (d = !0) }); e = this.resetZoomButton; d && !e ? this.showResetZoom() : !d && H(e) && (this.resetZoomButton = e.destroy()); b && this.redraw(l(this.options.chart.animation, a && a.animation, 100 > this.pointCount)) },
        pan: function (a, b) { var c = this, d = c.hoverPoints, e; d && v(d, function (a) { a.setState() }); v("xy" === b ? [1, 0] : [1], function (b) { var d = a[b ? "chartX" : "chartY"], h = c[b ? "xAxis" : "yAxis"][0], k = c[b ? "mouseDownX" : "mouseDownY"], n = (h.pointRange || 0) / 2, m = h.getExtremes(), r = h.toValue(k - d, !0) + n, k = h.toValue(k + c[b ? "plotWidth" : "plotHeight"] - d, !0) - n; h.series.length && r > T(m.dataMin, m.min) && k < G(m.dataMax, m.max) && (h.setExtremes(r, k, !1, !1, { trigger: "pan" }), e = !0); c[b ? "mouseDownX" : "mouseDownY"] = d }); e && c.redraw(!1); N(c.container, { cursor: "move" }) }
    });
    q(Ea.prototype, { select: function (a, b) { var c = this, d = c.series, e = d.chart; a = l(a, !c.selected); c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () { c.selected = c.options.selected = a; d.options.data[Va(c, d.data)] = c.options; c.setState(a && "select"); b || v(e.getSelectedPoints(), function (a) { a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Va(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect")) }) }) }, onMouseOver: function (a) {
        var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
        if (e && e !== this) e.onMouseOut(); this.firePointEvent("mouseOver"); !d || d.shared && !b.noSharedTooltip || d.refresh(this, a); this.setState("hover"); c.hoverPoint = this
    }, onMouseOut: function () { var a = this.series.chart, b = a.hoverPoints; this.firePointEvent("mouseOut"); b && -1 !== Va(this, b) || (this.setState(), a.hoverPoint = null) }, importEvents: function () { if (!this.hasImportedEvents) { var a = u(this.series.options.point, this.options).events, b; this.events = a; for (b in a) aa(this, b, a[b]); this.hasImportedEvents = !0 } }, setState: function (a,
b) {
        var c = this.plotX, d = this.plotY, e = this.series, f = e.options.states, g = Y[e.type].marker && e.options.marker, h = g && !g.enabled, k = g && g.states[a], n = k && !1 === k.enabled, m = e.stateMarkerGraphic, r = this.marker || {}, t = e.chart, x = e.halo, p; a = a || ""; p = this.pointAttr[a] || e.pointAttr[a]; if (!(a === this.state && !b || this.selected && "select" !== a || f[a] && !1 === f[a].enabled || a && (n || h && !1 === k.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
            if (this.graphic) g = g && this.graphic.symbolName && p.r, this.graphic.attr(u(p, g ? { x: c - g,
                y: d - g, width: 2 * g, height: 2 * g
            } : {})), m && m.hide(); else { if (a && k) if (g = k.radius, r = r.symbol || e.symbol, m && m.currentSymbol !== r && (m = m.destroy()), m) m[b ? "animate" : "attr"]({ x: c - g, y: d - g }); else r && (e.stateMarkerGraphic = m = t.renderer.symbol(r, c - g, d - g, 2 * g, 2 * g).attr(p).add(e.markerGroup), m.currentSymbol = r); if (m) m[a && t.isInsidePlot(c, d, t.inverted) ? "show" : "hide"]() } (c = f[a] && f[a].halo) && c.size ? (x || (e.halo = x = t.renderer.path().add(e.seriesGroup)), x.attr(q({ fill: Ka(this.color || e.color).setOpacity(c.opacity).get() }, c.attributes))[b ?
"animate" : "attr"]({ d: this.haloPath(c.size) })) : x && x.attr({ d: [] }); this.state = a
        }
    }, haloPath: function (a) { var b = this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted; return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, 2 * a, 2 * a) }
    }); q(U.prototype, { onMouseOver: function () { var a = this.chart, b = a.hoverSeries; if (b && b !== this) b.onMouseOut(); this.options.events.mouseOver && ka(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this },
        onMouseOut: function () { var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint; if (d) d.onMouseOut(); this && a.events.mouseOut && ka(this, "mouseOut"); !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide(); this.setState(); b.hoverSeries = null }, setState: function (a) {
            var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth; a = a || ""; this.state !== a && (this.state = a, e[a] && !1 === e[a].enabled || (a && (b = e[a].lineWidth || b + (e[a].lineWidthPlus || 0)), c && !c.dashstyle && (a = { "stroke-width": b }, c.attr(a),
d && d.attr(a))))
        }, setVisible: function (a, b) {
            var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible; f = (c.visible = a = c.userOptions.visible = a === D ? !h : a) ? "show" : "hide"; v(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (a) { if (c[a]) c[a][f]() }); if (d.hoverSeries === c) c.onMouseOut(); e && d.legend.colorizeItem(c, a); c.isDirty = !0; c.options.stacking && v(d.series, function (a) { a.options.stacking && a.visible && (a.isDirty = !0) }); v(c.linkedSeries, function (b) { b.setVisible(a, !1) }); g &&
(d.isDirtyBox = !0); !1 !== b && d.redraw(); ka(c, f)
        }, setTooltipPoints: function (a) {
            var b = [], c, d, e = this.xAxis, f = e && e.getExtremes(), g = e ? e.tooltipLen || e.len : this.chart.plotSizeX, h, k, n = []; if (!1 !== this.options.enableMouseTracking && !this.singularTooltips) {
                a && (this.tooltipPoints = null); v(this.segments || this.points, function (a) { b = b.concat(a) }); e && e.reversed && (b = b.reverse()); this.orderTooltipPoints && this.orderTooltipPoints(b); a = b.length; for (k = 0; k < a; k++) if (e = b[k], c = e.x, c >= f.min && c <= f.max) for (h = b[k + 1], c = d === D ? 0 : d + 1, d =
b[k + 1] ? T(G(0, fa((e.clientX + (h ? h.wrappedClientX || h.clientX : g)) / 2)), g) : g; 0 <= c && c <= d; ) n[c++] = e; this.tooltipPoints = n
            }
        }, show: function () { this.setVisible(!0) }, hide: function () { this.setVisible(!1) }, select: function (a) { this.selected = a = a === D ? !this.selected : a; this.checkbox && (this.checkbox.checked = a); ka(this, a ? "select" : "unselect") }, drawTracker: Wa.drawTrackerGraph
    }); s(U.prototype, "init", function (a) {
        var b; a.apply(this, Array.prototype.slice.call(arguments, 1)); (b = this.xAxis) && b.options.ordinal && aa(this, "updatedData",
function () { delete b.ordinalIndex })
    }); s($.prototype, "getTimeTicks", function (a, b, c, d, e, f, g, h) {
        var k = 0, n = 0, m, r = {}, t, x, p, s = [], l = -Number.MAX_VALUE, v = this.options.tickPixelInterval; if (!this.options.ordinal || !f || 3 > f.length || c === D) return a.call(this, b, c, d, e); for (x = f.length; n < x; n++) { p = n && f[n - 1] > d; f[n] < c && (k = n); if (n === x - 1 || f[n + 1] - f[n] > 5 * g || p) { if (f[n] > l) { for (m = a.call(this, b, f[k], f[n], e); m.length && m[0] <= l; ) m.shift(); m.length && (l = m[m.length - 1]); s = s.concat(m) } k = n + 1 } if (p) break } a = m.info; if (h && a.unitRange <= ca.hour) {
            n =
s.length - 1; for (k = 1; k < n; k++) (new ta(s[k] - Oa))[Ta]() !== (new ta(s[k - 1] - Oa))[Ta]() && (r[s[k]] = "day", t = !0); t && (r[s[0]] = "day"); a.higherRanks = r
        } s.info = a; if (h && w(v)) { h = a = s.length; var n = [], q; for (t = []; h--; ) k = this.translate(s[h]), q && (t[h] = q - k), n[h] = q = k; t.sort(); t = t[fa(t.length / 2)]; t < .6 * v && (t = null); h = s[a - 1] > d ? a - 1 : a; for (q = void 0; h--; ) k = n[h], d = q - k, q && d < .8 * v && (null === t || d < .8 * t) ? (r[s[h]] && !r[s[h + 1]] ? (d = h + 1, q = k) : d = h, s.splice(d, 1)) : q = k } return s
    }); q($.prototype, { beforeSetTickPositions: function () {
        var a, b = [], c = !1, d, e =
this.getExtremes(), f = e.min, e = e.max, g; if (this.options.ordinal) {
            v(this.series, function (c, d) { if (!1 !== c.visible && !1 !== c.takeOrdinalPosition && (b = b.concat(c.processedXData), a = b.length, b.sort(function (a, b) { return a - b }), a)) for (d = a - 1; d--; ) b[d] === b[d + 1] && b.splice(d, 1) }); a = b.length; if (2 < a) { d = b[1] - b[0]; for (g = a - 1; g-- && !c; ) b[g + 1] - b[g] !== d && (c = !0); !this.options.keepOrdinalPadding && (b[0] - f > d || e - b[b.length - 1] > d) && (c = !0) } c ? (this.ordinalPositions = b, c = this.val2lin(G(f, b[0]), !0), d = G(this.val2lin(T(e, b[b.length - 1]), !0),
1), this.ordinalSlope = e = (e - f) / (d - c), this.ordinalOffset = f - c * e) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = D
        } this.groupIntervalFactor = null
    }, val2lin: function (a, b) { var c = this.ordinalPositions; if (c) { var d = c.length, e, f; for (e = d; e--; ) if (c[e] === a) { f = e; break } for (e = d - 1; e--; ) if (a > c[e] || 0 === e) { c = (a - c[e]) / (c[e + 1] - c[e]); f = e + c; break } return b ? f : this.ordinalSlope * (f || 0) + this.ordinalOffset } return a }, lin2val: function (a, b) {
        var c = this.ordinalPositions; if (c) {
            var d = this.ordinalSlope, e = this.ordinalOffset, f =
c.length - 1, g, h; if (b) 0 > a ? a = c[0] : a > f ? a = c[f] : (f = fa(a), h = a - f); else for (; f--; ) if (g = d * f + e, a >= g) { d = d * (f + 1) + e; h = (a - g) / (d - g); break } return h !== D && c[f] !== D ? c[f] + (h ? h * (c[f + 1] - c[f]) : 0) : a
        } return a
    }, getExtendedPositions: function () {
        var a = this.chart, b = this.series[0].currentDataGrouping, c = this.ordinalIndex, d = b ? b.count + b.unitName : "raw", e = this.getExtremes(), f, g; c || (c = this.ordinalIndex = {}); c[d] || (f = { series: [], getExtremes: function () { return { min: e.dataMin, max: e.dataMax} }, options: { ordinal: !0 }, val2lin: $.prototype.val2lin },
v(this.series, function (c) { g = { xAxis: f, xData: c.xData, chart: a, destroyGroupedData: oa }; g.options = { dataGrouping: b ? { enabled: !0, forced: !0, approximation: "open", units: [[b.unitName, [b.count]]]} : { enabled: !1} }; c.processData.apply(g); f.series.push(g) }), this.beforeSetTickPositions.apply(f), c[d] = f.ordinalPositions); return c[d]
    }, getGroupIntervalFactor: function (a, b, c) {
        var d = 0; c = c.processedXData; var e = c.length, f = [], g = this.groupIntervalFactor; if (!g) {
            for (; d < e - 1; d++) f[d] = c[d + 1] - c[d]; f.sort(function (a, b) { return a - b }); d =
f[fa(e / 2)]; a = G(a, c[0]); b = T(b, c[e - 1]); this.groupIntervalFactor = g = e * d / (b - a)
        } return g
    }, postProcessTickInterval: function (a) { var b = this.ordinalSlope; return b ? a / (b / this.closestPointRange) : a }
    }); s(qa.prototype, "pan", function (a, b) {
        var c = this.xAxis[0], d = b.chartX, e = !1; if (c.options.ordinal && c.series.length) {
            var f = this.mouseDownX, g = c.getExtremes(), h = g.dataMax, k = g.min, n = g.max, m = this.hoverPoints, r = c.closestPointRange, f = (f - d) / (c.translationSlope * (c.ordinalSlope || r)), t = { ordinalPositions: c.getExtendedPositions() },
r = c.lin2val, x = c.val2lin, p; t.ordinalPositions ? 1 < ia(f) && (m && v(m, function (a) { a.setState() }), 0 > f ? (m = t, p = c.ordinalPositions ? c : t) : (m = c.ordinalPositions ? c : t, p = t), t = p.ordinalPositions, h > t[t.length - 1] && t.push(h), this.fixedRange = n - k, f = c.toFixedRange(null, null, r.apply(m, [x.apply(m, [k, !0]) + f, !0]), r.apply(p, [x.apply(p, [n, !0]) + f, !0])), f.min >= T(g.dataMin, k) && f.max <= G(h, n) && c.setExtremes(f.min, f.max, !0, !1, { trigger: "pan" }), this.mouseDownX = d, N(this.container, { cursor: "move" })) : e = !0
        } else e = !0; e && a.apply(this, Array.prototype.slice.call(arguments,
1))
    }); s(U.prototype, "getSegments", function (a) { var b, c = this.options.gapSize, d = this.xAxis; a.apply(this, Array.prototype.slice.call(arguments, 1)); c && (b = this.segments, v(b, function (a, f) { for (var g = a.length - 1; g--; ) a[g + 1].x - a[g].x > d.closestPointRange * c && b.splice(f + 1, 0, a.splice(g + 1, a.length - g)) })) }); var ua = U.prototype, Yb = Bb.prototype, oc = ua.processData, pc = ua.generatePoints, qc = ua.destroy, rc = Yb.tooltipHeaderFormatter, sc = { approximation: "average", groupPixelWidth: 2, dateTimeLabelFormats: { millisecond: ["%A, %b %e, %H:%M:%S.%L",
"%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"], second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"], minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], month: ["%B %Y", "%B", "-%B %Y"], year: ["%Y", "%Y", "-%Y"]
    }
    }, Zb = { line: {}, spline: {}, area: {}, areaspline: {}, column: { approximation: "sum", groupPixelWidth: 10 }, arearange: { approximation: "range" },
        areasplinerange: { approximation: "range" }, columnrange: { approximation: "range", groupPixelWidth: 10 }, candlestick: { approximation: "ohlc", groupPixelWidth: 10 }, ohlc: { approximation: "ohlc", groupPixelWidth: 5 }
    }, $b = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]], Sa = { sum: function (a) { var b = a.length, c; if (!b && a.hasNulls) c = null; else if (b) for (c = 0; b--; ) c += a[b]; return c }, average: function (a) {
        var b =
a.length; a = Sa.sum(a); "number" === typeof a && b && (a /= b); return a
    }, open: function (a) { return a.length ? a[0] : a.hasNulls ? null : D }, high: function (a) { return a.length ? da(a) : a.hasNulls ? null : D }, low: function (a) { return a.length ? J(a) : a.hasNulls ? null : D }, close: function (a) { return a.length ? a[a.length - 1] : a.hasNulls ? null : D }, ohlc: function (a, b, c, d) { a = Sa.open(a); b = Sa.high(b); c = Sa.low(c); d = Sa.close(d); if ("number" === typeof a || "number" === typeof b || "number" === typeof c || "number" === typeof d) return [a, b, c, d] }, range: function (a, b) {
        a = Sa.low(a);
        b = Sa.high(b); if ("number" === typeof a || "number" === typeof b) return [a, b]
    }
    }; ua.groupData = function (a, b, c, d) {
        var e = this.data, f = this.options.data, g = [], h = [], k = a.length, n, m, r = !!b, t = [[], [], [], []]; d = "function" === typeof d ? d : Sa[d]; var p = this.pointArrayMap, s = p && p.length, l; for (l = 0; l <= k && !(a[l] >= c[0]); l++); for (; l <= k; l++) {
            for (; (c[1] !== D && a[l] >= c[1] || l === k) && (n = c.shift(), m = d.apply(0, t), m !== D && (g.push(n), h.push(m)), t[0] = [], t[1] = [], t[2] = [], t[3] = [], l !== k); ); if (l === k) break; if (p) {
                n = this.cropStart + l; n = e && e[n] || this.pointClass.prototype.applyOptions.apply({ series: this },
[f[n]]); var v; for (m = 0; m < s; m++) v = n[p[m]], "number" === typeof v ? t[m].push(v) : null === v && (t[m].hasNulls = !0)
            } else n = r ? b[l] : null, "number" === typeof n ? t[0].push(n) : null === n && (t[0].hasNulls = !0)
        } return [g, h]
    }; ua.processData = function () {
        var a = this.chart, b = this.options, c = b.dataGrouping, d = !1 !== this.allowDG && c && l(c.enabled, a.options._stock), e; this.forceCrop = d; this.groupPixelWidth = null; this.hasProcessed = !0; if (!1 !== oc.apply(this, arguments) && d) {
            this.destroyGroupedData(); var f = this.processedXData, g = this.processedYData,
h = a.plotSizeX, a = this.xAxis, k = a.options.ordinal, n = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth(), d = this.pointRange; if (n) {
                e = !0; this.points = null; var m = a.getExtremes(), d = m.min, m = m.max, k = k && a.getGroupIntervalFactor(d, m, this) || 1, h = n * (m - d) / h * k, n = a.getTimeTicks(a.normalizeTimeTickInterval(h, c.units || $b), d, m, a.options.startOfWeek, f, this.closestPointRange), g = ua.groupData.apply(this, [f, g, n, c.approximation]), f = g[0], g = g[1]; if (c.smoothed) { c = f.length - 1; for (f[c] = m; c-- && 0 < c; ) f[c] += h / 2; f[0] = d } this.currentDataGrouping =
n.info; null === b.pointRange && (this.pointRange = n.info.totalRange); this.closestPointRange = n.info.totalRange; w(f[0]) && f[0] < a.dataMin && (a.dataMin = f[0]); this.processedXData = f; this.processedYData = g
            } else this.currentDataGrouping = null, this.pointRange = d; this.hasGroupedData = e
        }
    }; ua.destroyGroupedData = function () { var a = this.groupedData; v(a || [], function (b, c) { b && (a[c] = b.destroy ? b.destroy() : null) }); this.groupedData = null }; ua.generatePoints = function () {
        pc.apply(this); this.destroyGroupedData(); this.groupedData = this.hasGroupedData ?
this.points : null
    }; Yb.tooltipHeaderFormatter = function (a) {
        var b = a.series, c = b.tooltipOptions, d = b.options.dataGrouping, e = c.xDateFormat, f, g = b.xAxis, h; if (g && "datetime" === g.options.type && d && P(a.key)) { b = b.currentDataGrouping; d = d.dateTimeLabelFormats; if (b) g = d[b.unitName], 1 === b.count ? e = g[0] : (e = g[1], f = g[2]); else if (!e && d) for (h in ca) if (ca[h] >= g.closestPointRange || ca[h] <= ca.day && 0 < a.key % ca[h]) { e = d[h][0]; break } e = Ja(e, a.key); f && (e += Ja(f, a.key + b.totalRange - 1)); a = c.headerFormat.replace("{point.key}", e) } else a = rc.call(this,
a); return a
    }; ua.destroy = function () { for (var a = this.groupedData || [], b = a.length; b--; ) a[b] && a[b].destroy(); qc.apply(this) }; s(ua, "setOptions", function (a, b) { var c = a.call(this, b), d = this.type, e = this.chart.options.plotOptions, f = Y[d].dataGrouping; Zb[d] && (f || (f = u(sc, Zb[d])), c.dataGrouping = u(f, e.series && e.series.dataGrouping, e[d].dataGrouping, b.dataGrouping)); this.chart.options._stock && (this.requireSorting = !0); return c }); s($.prototype, "setScale", function (a) {
        a.call(this); v(this.series, function (a) {
            a.hasProcessed =
!1
        })
    }); $.prototype.getGroupPixelWidth = function () { var a = this.series, b = a.length, c, d = 0, e = !1, f; for (c = b; c--; ) (f = a[c].options.dataGrouping) && (d = G(d, f.groupPixelWidth)); for (c = b; c--; ) (f = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / d || b && f.forced) && (e = !0); return e ? d : 0 }; Y.ohlc = u(Y.column, { lineWidth: 1, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>' },
        states: { hover: { lineWidth: 3} }, threshold: null
    }); var ac = Q(K.column, { type: "ohlc", pointArrayMap: ["open", "high", "low", "close"], toYData: function (a) { return [a.open, a.high, a.low, a.close] }, pointValKey: "high", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, upColorProp: "stroke", getAttribs: function () {
        K.column.prototype.getAttribs.apply(this, arguments); var a = this.options, b = a.states, a = a.upColor || this.color, c = u(this.pointAttr), d = this.upColorProp; c[""][d] = a; c.hover[d] = b.hover.upColor || a; c.select[d] =
b.select.upColor || a; v(this.points, function (a) { a.open < a.close && (a.pointAttr = c) })
    }, translate: function () { var a = this.yAxis; K.column.prototype.translate.apply(this); v(this.points, function (b) { null !== b.open && (b.plotOpen = a.translate(b.open, 0, 1, 0, 1)); null !== b.close && (b.plotClose = a.translate(b.close, 0, 1, 0, 1)) }) }, drawPoints: function () {
        var a = this, b = a.chart, c, d, e, f, g, h, k, n; v(a.points, function (m) {
            m.plotY !== D && (k = m.graphic, c = m.pointAttr[m.selected ? "selected" : ""] || a.pointAttr[""], f = c["stroke-width"] % 2 / 2, n = I(m.plotX) -
f, g = I(m.shapeArgs.width / 2), h = ["M", n, I(m.yBottom), "L", n, I(m.plotY)], null !== m.open && (d = I(m.plotOpen) + f, h.push("M", n, d, "L", n - g, d)), null !== m.close && (e = I(m.plotClose) + f, h.push("M", n, e, "L", n + g, e)), k ? k.animate({ d: h }) : m.graphic = b.renderer.path(h).attr(c).add(a.group))
        })
    }, animate: null
    }); K.ohlc = ac; Y.candlestick = u(Y.column, { lineColor: "black", lineWidth: 1, states: { hover: { lineWidth: 2} }, tooltip: Y.ohlc.tooltip, threshold: null, upColor: "white" }); var tc = Q(ac, { type: "candlestick", pointAttrToOptions: { fill: "color", stroke: "lineColor",
        "stroke-width": "lineWidth"
    }, upColorProp: "fill", getAttribs: function () { K.ohlc.prototype.getAttribs.apply(this, arguments); var a = this.options, b = a.states, c = a.upLineColor || a.lineColor, d = b.hover.upLineColor || c, e = b.select.upLineColor || c; v(this.points, function (a) { a.open < a.close && (a.pointAttr[""].stroke = c, a.pointAttr.hover.stroke = d, a.pointAttr.select.stroke = e) }) }, drawPoints: function () {
        var a = this, b = a.chart, c, d = a.pointAttr[""], e, f, g, h, k, n, m, r, t, p, s; v(a.points, function (l) {
            t = l.graphic; l.plotY !== D && (c = l.pointAttr[l.selected ?
"selected" : ""] || d, m = c["stroke-width"] % 2 / 2, r = I(l.plotX) - m, e = l.plotOpen, f = l.plotClose, g = ja.min(e, f), h = ja.max(e, f), s = I(l.shapeArgs.width / 2), k = I(g) !== I(l.plotY), n = h !== l.yBottom, g = I(g) + m, h = I(h) + m, p = ["M", r - s, h, "L", r - s, g, "L", r + s, g, "L", r + s, h, "Z", "M", r, g, "L", r, k ? I(l.plotY) : g, "M", r, h, "L", r, n ? I(l.yBottom) : h], t ? t.animate({ d: p }) : l.graphic = b.renderer.path(p).attr(c).add(a.group).shadow(a.options.shadow))
        })
    }
    }); K.candlestick = tc; var pb = za.prototype.symbols; Y.flags = u(Y.column, { fillColor: "white", lineWidth: 1, pointRange: 0,
        shape: "flag", stackDistance: 12, states: { hover: { lineColor: "black", fillColor: "#FCFFC5"} }, style: { fontSize: "11px", fontWeight: "bold", textAlign: "center" }, tooltip: { pointFormat: "{point.text}<br/>" }, threshold: null, y: -30
    }); K.flags = Q(K.column, { type: "flags", sorted: !1, noSharedTooltip: !0, allowDG: !1, takeOrdinalPosition: !1, trackerGroups: ["markerGroup"], forceCrop: !0, init: U.prototype.init, pointAttrToOptions: { fill: "fillColor", stroke: "color", "stroke-width": "lineWidth", r: "radius" }, translate: function () {
        K.column.prototype.translate.apply(this);
        var a = this.chart, b = this.points, c = b.length - 1, d, e, f = this.options.onSeries, f = (d = f && a.get(f)) && d.options.step, g = d && d.points, h = g && g.length, k = this.xAxis, n = k.getExtremes(), m, r, t; if (d && d.visible && h) for (d = d.currentDataGrouping, r = g[h - 1].x + (d ? d.totalRange : 0), b.sort(function (a, b) { return a.x - b.x }); h-- && b[c] && !(d = b[c], m = g[h], m.x <= d.x && m.plotY !== D && (d.x <= r && (d.plotY = m.plotY, m.x < d.x && !f && (t = g[h + 1]) && t.plotY !== D && (d.plotY += (d.x - m.x) / (t.x - m.x) * (t.plotY - m.plotY))), c--, h++, 0 > c)); ); v(b, function (c, d) {
            c.plotY === D && (c.x >=
n.min && c.x <= n.max ? c.plotY = a.chartHeight - k.bottom - (k.opposite ? k.height : 0) + k.offset - a.plotTop : c.shapeArgs = {}); (e = b[d - 1]) && e.plotX === c.plotX && (e.stackIndex === D && (e.stackIndex = 0), c.stackIndex = e.stackIndex + 1)
        })
    }, drawPoints: function () {
        var a, b = this.pointAttr[""], c = this.points, d = this.chart.renderer, e, f, g = this.options, h = g.y, k, n, m, r, t = g.lineWidth % 2 / 2, p, s; for (n = c.length; n--; ) m = c[n], a = m.plotX > this.xAxis.len, e = m.plotX + (a ? t : -t), r = m.stackIndex, k = m.options.shape || g.shape, f = m.plotY, f !== D && (f = m.plotY + h + t - (r !== D && r *
g.stackDistance)), p = r ? D : m.plotX + t, s = r ? D : m.plotY, r = m.graphic, f !== D && 0 <= e && !a ? (a = m.pointAttr[m.selected ? "select" : ""] || b, r ? r.attr({ x: e, y: f, r: a.r, anchorX: p, anchorY: s }) : m.graphic = d.label(m.options.title || g.title || "A", e, f, k, p, s, g.useHTML).css(u(g.style, m.style)).attr(a).attr({ align: "flag" === k ? "left" : "center", width: g.width, height: g.height }).add(this.markerGroup).shadow(g.shadow), m.tooltipPos = [e, f]) : r && (m.graphic = r.destroy())
    }, drawTracker: function () {
        var a = this.points; Wa.drawTrackerPoint.apply(this); v(a, function (b) {
            var c =
b.graphic; c && aa(c.element, "mouseover", function () { 0 < b.stackIndex && !b.raised && (b._y = c.y, c.attr({ y: b._y - 8 }), b.raised = !0); v(a, function (a) { a !== b && a.raised && a.graphic && (a.graphic.attr({ y: a._y }), a.raised = !1) }) })
        })
    }, animate: oa
    }); pb.flag = function (a, b, c, d, e) { var f = e && e.anchorX || a; e = e && e.anchorY || b; return ["M", f, e, "L", a, b + d, a, b, a + c, b, a + c, b + d, a, b + d, "M", f, e, "Z"] }; v(["circle", "square"], function (a) {
        pb[a + "pin"] = function (b, c, d, e, f) {
            var g = f && f.anchorX; f = f && f.anchorY; b = pb[a](b, c, d, e); g && f && b.push("M", g, c > f ? c : c + e, "L",
g, f); return b
        }
    }); Za === ha.VMLRenderer && v(["flag", "circlepin", "squarepin"], function (a) { eb.prototype.symbols[a] = pb[a] }); var Hb = [].concat($b), qb = function (a) { return Math[a].apply(0, nb(arguments, function (a) { return "number" === typeof a })) }; Hb[4] = ["day", [1, 2, 3, 4]]; Hb[5] = ["week", [1, 2, 3]]; q(ga, { navigator: { handles: { backgroundColor: "#ebe7e8", borderColor: "#b2b1b6" }, height: 40, margin: 25, maskFill: "rgba(128,179,236,0.3)", maskInside: !0, outlineColor: "#b2b1b6", outlineWidth: 1, series: { type: K.areaspline === D ? "line" : "areaspline",
        color: "#4572A7", compare: null, fillOpacity: .05, dataGrouping: { approximation: "average", enabled: !0, groupPixelWidth: 2, smoothed: !0, units: Hb }, dataLabels: { enabled: !1, zIndex: 2 }, id: "highcharts-navigator-series", lineColor: "#4572A7", lineWidth: 1, marker: { enabled: !1 }, pointRange: 0, shadow: !1, threshold: null
    }, xAxis: { tickWidth: 0, lineWidth: 0, gridLineColor: "#EEE", gridLineWidth: 1, tickPixelInterval: 200, labels: { align: "left", style: { color: "#888" }, x: 3, y: -4 }, crosshair: !1 }, yAxis: { gridLineWidth: 0, startOnTick: !1, endOnTick: !1, minPadding: .1,
        maxPadding: .1, labels: { enabled: !1 }, crosshair: !1, title: { text: null }, tickWidth: 0
    }
    }, scrollbar: { height: ab ? 20 : 14, barBackgroundColor: "#bfc8d1", barBorderRadius: 0, barBorderWidth: 1, barBorderColor: "#bfc8d1", buttonArrowColor: "#666", buttonBackgroundColor: "#ebe7e8", buttonBorderColor: "#bbb", buttonBorderRadius: 0, buttonBorderWidth: 1, minWidth: 6, rifleColor: "#666", trackBackgroundColor: "#eeeeee", trackBorderColor: "#eeeeee", trackBorderWidth: 1, liveRedraw: va && !ab }
    }); Xa.prototype = { drawHandle: function (a, b) {
        var c = this.chart,
d = c.renderer, e = this.elementsToDestroy, f = this.handles, g = this.navigatorOptions.handles, g = { fill: g.backgroundColor, stroke: g.borderColor, "stroke-width": 1 }, h; this.rendered || (f[b] = d.g("navigator-handle-" + ["left", "right"][b]).css({ cursor: "e-resize" }).attr({ zIndex: 4 - b }).add(), h = d.rect(-4.5, 0, 9, 16, 0, 1).attr(g).add(f[b]), e.push(h), h = d.path(["M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12]).attr(g).add(f[b]), e.push(h)); f[b][c.isResizing ? "animate" : "attr"]({ translateX: this.scrollerLeft + this.scrollbarHeight + parseInt(a,
10), translateY: this.top + this.height / 2 - 8
})
    }, drawScrollbarButton: function (a) {
        var b = this.chart.renderer, c = this.elementsToDestroy, d = this.scrollbarButtons, e = this.scrollbarHeight, f = this.scrollbarOptions, g; this.rendered || (d[a] = b.g().add(this.scrollbarGroup), g = b.rect(-.5, -.5, e + 1, e + 1, f.buttonBorderRadius, f.buttonBorderWidth).attr({ stroke: f.buttonBorderColor, "stroke-width": f.buttonBorderWidth, fill: f.buttonBackgroundColor }).add(d[a]), c.push(g), g = b.path(["M", e / 2 + (a ? -1 : 1), e / 2 - 3, "L", e / 2 + (a ? -1 : 1), e / 2 + 3, e / 2 + (a ? 2 :
-2), e / 2]).attr({ fill: f.buttonArrowColor }).add(d[a]), c.push(g)); a && d[a].attr({ translateX: this.scrollerWidth - e })
    }, render: function (a, b, c, d) {
        var e = this.chart, f = e.renderer, g, h, k, n, m = this.scrollbarGroup, r = this.navigatorGroup, t = this.scrollbar, r = this.xAxis, p = this.scrollbarTrack, s = this.scrollbarHeight, v = this.scrollbarEnabled, q = this.navigatorOptions, B = this.scrollbarOptions, y = B.minWidth, C = this.height, F = this.top, J = this.navigatorEnabled, O = q.outlineWidth, w = O / 2, u = 0, D = this.outlineHeight, R = B.barBorderRadius, da = B.barBorderWidth,
M = F + w, E; if (!isNaN(a)) {
            this.navigatorLeft = g = l(r.left, e.plotLeft + s); this.navigatorWidth = h = l(r.len, e.plotWidth - 2 * s); this.scrollerLeft = k = g - s; this.scrollerWidth = n = n = h + 2 * s; r.getExtremes && (E = this.getUnionExtremes(!0), !E || E.dataMin === r.min && E.dataMax === r.max || r.setExtremes(E.dataMin, E.dataMax, !0, !1)); c = l(c, r.translate(a)); d = l(d, r.translate(b)); if (isNaN(c) || Infinity === ia(c)) c = 0, d = n; if (!(r.translate(d, !0) - r.translate(c, !0) < e.xAxis[0].minRange)) {
                this.zoomedMax = T(G(c, d), h); this.zoomedMin = G(this.fixedWidth ? this.zoomedMax -
this.fixedWidth : T(c, d), 0); this.range = this.zoomedMax - this.zoomedMin; c = I(this.zoomedMax); b = I(this.zoomedMin); a = c - b; this.rendered || (J && (this.navigatorGroup = r = f.g("navigator").attr({ zIndex: 3 }).add(), this.leftShade = f.rect().attr({ fill: q.maskFill }).add(r), q.maskInside || (this.rightShade = f.rect().attr({ fill: q.maskFill }).add(r)), this.outline = f.path().attr({ "stroke-width": O, stroke: q.outlineColor }).add(r)), v && (this.scrollbarGroup = m = f.g("scrollbar").add(), t = B.trackBorderWidth, this.scrollbarTrack = p = f.rect().attr({ x: 0,
    y: -t % 2 / 2, fill: B.trackBackgroundColor, stroke: B.trackBorderColor, "stroke-width": t, r: B.trackBorderRadius || 0, height: s
}).add(m), this.scrollbar = t = f.rect().attr({ y: -da % 2 / 2, height: s, fill: B.barBackgroundColor, stroke: B.barBorderColor, "stroke-width": da, r: R }).add(m), this.scrollbarRifles = f.path().attr({ stroke: B.rifleColor, "stroke-width": 1 }).add(m))); e = e.isResizing ? "animate" : "attr"; if (J) {
                    this.leftShade[e](q.maskInside ? { x: g + b, y: F, width: c - b, height: C} : { x: g, y: F, width: b, height: C }); if (this.rightShade) this.rightShade[e]({ x: g +
c, y: F, width: h - c, height: C
                    }); this.outline[e]({ d: ["M", k, M, "L", g + b + w, M, g + b + w, M + D, "L", g + c - w, M + D, "L", g + c - w, M, k + n, M].concat(q.maskInside ? ["M", g + b + w, M, "L", g + c - w, M] : []) }); this.drawHandle(b + w, 0); this.drawHandle(c + w, 1)
                } v && m && (this.drawScrollbarButton(0), this.drawScrollbarButton(1), m[e]({ translateX: k, translateY: I(M + C) }), p[e]({ width: n }), g = s + b, h = a - da, h < y && (u = (y - h) / 2, h = y, g -= u), this.scrollbarPad = u, t[e]({ x: fa(g) + da % 2 / 2, width: h }), y = s + b + a / 2 - .5, this.scrollbarRifles.attr({ visibility: 12 < a ? "visible" : "hidden" })[e]({ d: ["M",
y - 3, s / 4, "L", y - 3, 2 * s / 3, "M", y, s / 4, "L", y, 2 * s / 3, "M", y + 3, s / 4, "L", y + 3, 2 * s / 3]
                })); this.scrollbarPad = u; this.rendered = !0
            }
        }
    }, addEvents: function () { var a = this.chart.container, b = this.mouseDownHandler, c = this.mouseMoveHandler, d = this.mouseUpHandler, e; e = [[a, "mousedown", b], [a, "mousemove", c], [document, "mouseup", d]]; $a && e.push([a, "touchstart", b], [a, "touchmove", c], [document, "touchend", d]); v(e, function (a) { aa.apply(null, a) }); this._events = e }, removeEvents: function () {
        v(this._events, function (a) { pa.apply(null, a) }); this._events =
D; this.navigatorEnabled && this.baseSeries && pa(this.baseSeries, "updatedData", this.updatedDataHandler)
    }, init: function () {
        var a = this, b = a.chart, c, d, e = a.scrollbarHeight, f = a.navigatorOptions, g = a.height, h = a.top, k, n, m = document.body.style, r, t = a.baseSeries; a.mouseDownHandler = function (d) {
            d = b.pointer.normalize(d); var e = a.zoomedMin, f = a.zoomedMax, h = a.top, n = a.scrollbarHeight, t = a.scrollerLeft, p = a.scrollerWidth, s = a.navigatorLeft, l = a.navigatorWidth, x = a.scrollbarPad, v = a.range, q = d.chartX, z = d.chartY; d = b.xAxis[0]; var B,
y = ab ? 10 : 7; z > h && z < h + g + n && ((h = !a.scrollbarEnabled || z < h + g) && ja.abs(q - e - s) < y ? (a.grabbedLeft = !0, a.otherHandlePos = f, a.fixedExtreme = d.max, b.fixedRange = null) : h && ja.abs(q - f - s) < y ? (a.grabbedRight = !0, a.otherHandlePos = e, a.fixedExtreme = d.min, b.fixedRange = null) : q > s + e - x && q < s + f + x ? (a.grabbedCenter = q, a.fixedWidth = v, b.renderer.isSVG && (r = m.cursor, m.cursor = "ew-resize"), k = q - e) : q > t && q < t + p && (f = h ? q - s - v / 2 : q < s ? e - .2 * v : q > t + p - n ? e + .2 * v : q < s + e ? e - v : f, 0 > f ? f = 0 : f + v >= l && (f = l - v, B = c.dataMax), f !== e && (a.fixedWidth = v, e = c.toFixedRange(f, f + v,
null, B), d.setExtremes(e.min, e.max, !0, !1, { trigger: "navigator" }))))
        }; a.mouseMoveHandler = function (c) {
            var d = a.scrollbarHeight, e = a.navigatorLeft, f = a.navigatorWidth, g = a.scrollerLeft, h = a.scrollerWidth, m = a.range, r; 0 !== c.pageX && (c = b.pointer.normalize(c), r = c.chartX, r < e ? r = e : r > g + h - d && (r = g + h - d), a.grabbedLeft ? (n = !0, a.render(0, 0, r - e, a.otherHandlePos)) : a.grabbedRight ? (n = !0, a.render(0, 0, a.otherHandlePos, r - e)) : a.grabbedCenter && (n = !0, r < k ? r = k : r > f + k - m && (r = f + k - m), a.render(0, 0, r - k, r - k + m)), n && a.scrollbarOptions.liveRedraw &&
setTimeout(function () { a.mouseUpHandler(c) }, 0))
        }; a.mouseUpHandler = function (d) { var e, f; n && (a.zoomedMin === a.otherHandlePos ? e = a.fixedExtreme : a.zoomedMax === a.otherHandlePos && (f = a.fixedExtreme), e = c.toFixedRange(a.zoomedMin, a.zoomedMax, e, f), b.xAxis[0].setExtremes(e.min, e.max, !0, !1, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: d })); "mousemove" !== d.type && (a.grabbedLeft = a.grabbedRight = a.grabbedCenter = a.fixedWidth = a.fixedExtreme = a.otherHandlePos = n = k = null, m.cursor = r || "") }; var p = b.xAxis.length, v = b.yAxis.length;
        b.extraBottomMargin = a.outlineHeight + f.margin; a.navigatorEnabled ? (a.xAxis = c = new $(b, u({ ordinal: t && t.xAxis.options.ordinal }, f.xAxis, { id: "navigator-x-axis", isX: !0, type: "datetime", index: p, height: g, offset: 0, offsetLeft: e, offsetRight: -e, keepOrdinalPadding: !0, startOnTick: !1, endOnTick: !1, minPadding: 0, maxPadding: 0, zoomEnabled: !1 })), a.yAxis = d = new $(b, u(f.yAxis, { id: "navigator-y-axis", alignTicks: !1, height: g, offset: 0, index: v, zoomEnabled: !1 })), t || f.series.data ? a.addBaseSeries() : 0 === b.series.length && s(b, "redraw",
function (c, d) { 0 < b.series.length && !a.series && (a.setBaseSeries(), b.redraw = c); c.call(b, d) })) : a.xAxis = c = { translate: function (a, c) { var d = b.xAxis[0], f = d.getExtremes(), g = b.plotWidth - 2 * e, h = qb("min", d.options.min, f.dataMin), d = qb("max", d.options.max, f.dataMax) - h; return c ? a * d / g + h : g * (a - h) / d }, toFixedRange: $.prototype.toFixedRange }; s(b, "getMargins", function (b) {
    var e = this.legend, f = e.options; b.call(this); a.top = h = a.navigatorOptions.top || this.chartHeight - a.height - a.scrollbarHeight - this.spacing[2] - ("bottom" === f.verticalAlign &&
f.enabled && !f.floating ? e.legendHeight + l(f.margin, 10) : 0); c && d && (c.options.top = d.options.top = h, c.setAxisSize(), d.setAxisSize())
}); a.addEvents()
    }, getUnionExtremes: function (a) { var b = this.chart.xAxis[0], c = this.xAxis, d = c.options, e = b.options; if (!a || null !== b.dataMin) return { dataMin: qb("min", d && d.min, e.min, b.dataMin, c.dataMin), dataMax: qb("max", d && d.max, e.max, b.dataMax, c.dataMax)} }, setBaseSeries: function (a) {
        var b = this.chart; a = a || b.options.navigator.baseSeries; this.series && this.series.remove(); this.baseSeries =
b.series[a] || "string" === typeof a && b.get(a) || b.series[0]; this.xAxis && this.addBaseSeries()
    }, addBaseSeries: function () {
        var a = this.baseSeries, b = a ? a.options : {}, c = b.data, d = this.navigatorOptions.series, e; e = d.data; this.hasNavigatorData = !!e; b = u(b, d, { enableMouseTracking: !1, group: "nav", padXAxis: !1, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", name: "Navigator", showInLegend: !1, isInternal: !0, visible: !0 }); b.data = e || c; this.series = this.chart.initSeries(b); a && !1 !== this.navigatorOptions.adaptToUpdatedData && (aa(a,
"updatedData", this.updatedDataHandler), a.userOptions.events = q(a.userOptions.event, { updatedData: this.updatedDataHandler }))
    }, updatedDataHandler: function () {
        var a = this.chart.scroller, b = a.baseSeries, c = b.xAxis, d = c.getExtremes(), e = d.min, f = d.max, g = d.dataMin, d = d.dataMax, h = f - e, k, n, m, r, t, p = a.series; k = p.xData; var s = !!c.setExtremes; n = f >= k[k.length - 1] - (this.closestPointRange || 0); k = e <= g; a.hasNavigatorData || (p.options.pointStart = b.xData[0], p.setData(b.options.data, !1), t = !0); k && (r = g, m = r + h); n && (m = d, k || (r = G(m - h, p.xData[0])));
        s && (k || n) ? isNaN(r) || c.setExtremes(r, m, !0, !1, { trigger: "updatedData" }) : (t && this.chart.redraw(!1), a.render(G(e, g), T(f, d)))
    }, destroy: function () {
        this.removeEvents(); v([this.xAxis, this.yAxis, this.leftShade, this.rightShade, this.outline, this.scrollbarTrack, this.scrollbarRifles, this.scrollbarGroup, this.scrollbar], function (a) { a && a.destroy && a.destroy() }); this.xAxis = this.yAxis = this.leftShade = this.rightShade = this.outline = this.scrollbarTrack = this.scrollbarRifles = this.scrollbarGroup = this.scrollbar = null; v([this.scrollbarButtons,
this.handles, this.elementsToDestroy], function (a) { la(a) })
    }
    }; ha.Scroller = Xa; s($.prototype, "zoom", function (a, b, c) { var d = this.chart, e = d.options, f = e.chart.zoomType, g = e.navigator, e = e.rangeSelector, h; this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && (d = this.previousZoom, w(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom))); return h !== D ? h : a.call(this, b, c) }); s(qa.prototype, "init", function (a, b, c) {
        aa(this, "beforeRender",
function () { var a = this.options; if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = new Xa(this) }); a.call(this, b, c)
    }); s(U.prototype, "addPoint", function (a, b, c, d, e) { var f = this.options.turboThreshold; f && this.xData.length > f && H(b) && !ea(b) && this.chart.scroller && ya(20, !0); a.call(this, b, c, d, e) }); q(ga, { rangeSelector: { buttonTheme: { width: 28, height: 18, fill: "#f7f7f7", padding: 2, r: 0, "stroke-width": 0, style: { color: "#444", cursor: "pointer", fontWeight: "normal" }, zIndex: 7, states: { hover: { fill: "#e7e7e7" }, select: { fill: "#e7f0f9",
        style: { color: "black", fontWeight: "bold" }
    }
    }
    }, inputPosition: { align: "right" }, labelStyle: { color: "#666" }
    }
    }); ga.lang = u(ga.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To" }); wb.prototype = { clickButton: function (a, b) {
        var c = this, d = c.selected, e = c.chart, f = c.buttons, g = c.buttonOptions[a], h = e.xAxis[0], k = e.scroller && e.scroller.getUnionExtremes() || h || {}, n = k.dataMin, m = k.dataMax, r, t = h && I(T(h.max, l(m, h.max))), p = new ta(t), s = g.type, q = g.count, k = g._range, B; if (null !== n && null !== m && a !== c.selected) {
            if ("month" ===
s || "year" === s) r = { month: "Month", year: "FullYear"}[s], p["set" + r](p["get" + r]() - q), r = p.getTime(), n = l(n, Number.MIN_VALUE), isNaN(r) || r < n ? (r = n, t = T(r + k, m)) : k = t - r; else if (k) r = G(t - k, n), t = T(r + k, m); else if ("ytd" === s) if (h) m === D && (n = Number.MAX_VALUE, m = Number.MIN_VALUE, v(e.series, function (a) { a = a.xData; n = T(a[0], n); m = G(a[a.length - 1], m) }), b = !1), t = new ta(m), B = t.getFullYear(), r = B = G(n || 0, ta.UTC(B, 0, 1)), t = t.getTime(), t = T(m || t, t); else { aa(e, "beforeRender", function () { c.clickButton(a) }); return } else "all" === s && h && (r = n, t = m); f[d] &&
f[d].setState(0); f[a] && f[a].setState(2); e.fixedRange = k; h ? h.setExtremes(r, t, l(b, 1), 0, { trigger: "rangeSelectorButton", rangeSelectorButton: g }) : (d = e.options.xAxis, d[0] = u(d[0], { range: k, min: B })); c.setSelected(a)
        }
    }, setSelected: function (a) { this.selected = this.options.selected = a }, defaultButtons: [{ type: "month", count: 1, text: "1m" }, { type: "month", count: 3, text: "3m" }, { type: "month", count: 6, text: "6m" }, { type: "ytd", text: "YTD" }, { type: "year", count: 1, text: "1y" }, { type: "all", text: "All"}], init: function (a) {
        var b = this, c = a.options.rangeSelector,
d = c.buttons || [].concat(b.defaultButtons), e = c.selected, f = b.blurInputs = function () { var a = b.minInput, c = b.maxInput; a && a.blur && ka(a, "blur"); c && c.blur && ka(c, "blur") }; b.chart = a; b.options = c; b.buttons = []; a.extraTopMargin = 35; b.buttonOptions = d; aa(a.container, "mousedown", f); aa(a, "resize", f); v(d, b.computeButtonRange); e !== D && d[e] && this.clickButton(e, !1); aa(a, "load", function () { aa(a.xAxis[0], "afterSetExtremes", function () { b.updateButtonStates(!0) }) })
    }, updateButtonStates: function (a) {
        var b = this, c = this.chart, d = c.xAxis[0],
e = c.scroller && c.scroller.getUnionExtremes() || d, f = e.dataMin, g = e.dataMax, h = b.selected, k = b.options.allButtonsEnabled, n = b.buttons; a && c.fixedRange !== I(d.max - d.min) && (n[h] && n[h].setState(0), b.setSelected(null)); v(b.buttonOptions, function (a, c) { var e = a._range, p = e > g - f, s = e < d.minRange, l = "all" === a.type && d.max - d.min >= g - f && 2 !== n[c].state, v = "ytd" === a.type && Ja("%Y", f) === Ja("%Y", g); e === I(d.max - d.min) && c !== h ? (b.setSelected(c), n[c].setState(2)) : !k && (p || s || l || v) ? n[c].setState(3) : 3 === n[c].state && n[c].setState(0) })
    }, computeButtonRange: function (a) {
        var b =
a.type, c = a.count || 1, d = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5 }; if (d[b]) a._range = d[b] * c; else if ("month" === b || "year" === b) a._range = 864E5 * { month: 30, year: 365}[b] * c
    }, setInputValue: function (a, b) { var c = this.chart.options.rangeSelector; w(b) && (this[a + "Input"].HCTime = b); this[a + "Input"].value = Ja(c.inputEditDateFormat || "%Y-%m-%d", this[a + "Input"].HCTime); this[a + "DateBox"].attr({ text: Ja(c.inputDateFormat || "%b %e, %Y", this[a + "Input"].HCTime) }) }, drawInput: function (a) {
        var b = this, c = b.chart,
d = c.renderer.style, e = c.renderer, f = c.options.rangeSelector, g = b.div, h = "min" === a, k, n, m, r = this.inputGroup; this[a + "Label"] = n = e.label(ga.lang[h ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).attr({ padding: 2 }).css(u(d, f.labelStyle)).add(r); r.offset += n.width + 5; this[a + "DateBox"] = m = e.label("", r.offset).attr({ padding: 2, width: f.inputBoxWidth || 90, height: f.inputBoxHeight || 17, stroke: f.inputBoxBorderColor || "silver", "stroke-width": 1 }).css(u({ textAlign: "center", color: "#444" }, d, f.inputStyle)).on("click",
function () { b[a + "Input"].focus() }).add(r); r.offset += m.width + (h ? 10 : 0); this[a + "Input"] = k = ba("input", { name: a, className: "highcharts-range-selector", type: "text" }, q({ position: "absolute", border: 0, width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: d.fontSize, fontFamily: d.fontFamily, top: c.plotTop + "px" }, f.inputStyle), g); k.onfocus = function () { N(this, { left: r.translateX + m.x + "px", top: r.translateY + "px", width: m.width - 2 + "px", height: m.height - 2 + "px", border: "2px solid silver" }) }; k.onblur = function () {
    N(this,
{ border: 0, width: "1px", height: "1px" }); b.setInputValue(a)
}; k.onchange = function () { var a = k.value, d = (f.inputDateParser || ta.parse)(a), e = c.xAxis[0], g = e.dataMin, n = e.dataMax; isNaN(d) && (d = a.split("-"), d = ta.UTC(A(d[0]), A(d[1]) - 1, A(d[2]))); isNaN(d) || (ga.global.useUTC || (d += 6E4 * (new ta).getTimezoneOffset()), h ? d > b.maxInput.HCTime ? d = D : d < g && (d = g) : d < b.minInput.HCTime ? d = D : d > n && (d = n), d !== D && c.xAxis[0].setExtremes(h ? d : e.min, h ? e.max : d, D, D, { trigger: "rangeSelectorInput" })) }
    }, render: function (a, b) {
        var c = this, d = c.chart, e = d.renderer,
f = d.container, g = d.options, h = g.exporting && g.navigation && g.navigation.buttonOptions, k = g.rangeSelector, n = c.buttons, g = ga.lang, m = c.div, m = c.inputGroup, r = k.buttonTheme, p = !1 !== k.inputEnabled, s = r && r.states, B = d.plotLeft, y; c.rendered || (c.zoomText = e.text(g.rangeSelectorZoom, B, d.plotTop - 20).css(k.labelStyle).add(), y = B + c.zoomText.getBBox().width + 5, v(c.buttonOptions, function (a, b) {
    n[b] = e.button(a.text, y, d.plotTop - 35, function () { c.clickButton(b); c.isActive = !0 }, r, s && s.hover, s && s.select).css({ textAlign: "center" }).add();
    y += n[b].width + l(k.buttonSpacing, 5); c.selected === b && n[b].setState(2)
}), c.updateButtonStates(), p && (c.div = m = ba("div", null, { position: "relative", height: 0, zIndex: 1 }), f.parentNode.insertBefore(m, f), c.inputGroup = m = e.g("input-group").add(), m.offset = 0, c.drawInput("min"), c.drawInput("max"))); p && (f = d.plotTop - 45, m.align(q({ y: f, width: m.offset, x: h && f < (h.y || 0) + h.height - d.spacing[0] ? -40 : 0 }, k.inputPosition), !0, d.spacingBox), c.setInputValue("min", a), c.setInputValue("max", b)); c.rendered = !0
    }, destroy: function () {
        var a =
this.minInput, b = this.maxInput, c = this.chart, d = this.blurInputs, e; pa(c.container, "mousedown", d); pa(c, "resize", d); la(this.buttons); a && (a.onfocus = a.onblur = a.onchange = null); b && (b.onfocus = b.onblur = b.onchange = null); for (e in this) this[e] && "chart" !== e && (this[e].destroy ? this[e].destroy() : this[e].nodeType && Aa(this[e])), this[e] = null
    }
    }; $.prototype.toFixedRange = function (a, b, c, d) {
        var e = this.chart && this.chart.fixedRange; a = l(c, this.translate(a, !0)); b = l(d, this.translate(b, !0)); c = e && (b - a) / e; .7 < c && 1.3 > c && (d ? a = b - e : b = a +
e); return { min: a, max: b }
    }; s(qa.prototype, "init", function (a, b, c) { aa(this, "init", function () { this.options.rangeSelector.enabled && (this.rangeSelector = new wb(this)) }); a.call(this, b, c) }); ha.RangeSelector = wb; qa.prototype.callbacks.push(function (a) {
        function b() { f = a.xAxis[0].getExtremes(); g.render(f.min, f.max) } function c() { f = a.xAxis[0].getExtremes(); isNaN(f.min) || h.render(f.min, f.max) } function d(a) { "navigator-drag" !== a.triggerOp && g.render(a.min, a.max) } function e(a) { h.render(a.min, a.max) } var f, g = a.scroller, h =
a.rangeSelector; g && (aa(a.xAxis[0], "afterSetExtremes", d), s(a, "drawChartBox", function (a) { var c = this.isDirtyBox; a.call(this); c && b() }), b()); h && (aa(a.xAxis[0], "afterSetExtremes", e), aa(a, "resize", c), c()); aa(a, "destroy", function () { g && pa(a.xAxis[0], "afterSetExtremes", d); h && (pa(a, "resize", c), pa(a.xAxis[0], "afterSetExtremes", e)) })
    }); ha.StockChart = function (a, b) {
        var c = a.series, d, e = l(a.navigator && a.navigator.enabled, !0) ? { startOnTick: !1, endOnTick: !1} : null, f = { marker: { enabled: !1, radius: 2 }, states: { hover: { lineWidth: 2}} },
g = { shadow: !1, borderWidth: 0 }; a.xAxis = Ga(W(a.xAxis || {}), function (a) { return u({ minPadding: 0, maxPadding: 0, ordinal: !0, title: { text: null }, labels: { overflow: "justify" }, showLastLabel: !0 }, a, { type: "datetime", categories: null }, e) }); a.yAxis = Ga(W(a.yAxis || {}), function (a) { d = l(a.opposite, !0); return u({ labels: { y: -2 }, opposite: d, showLastLabel: !1, title: { text: null} }, a) }); a.series = null; a = u({ chart: { panning: !0, pinchType: "x" }, navigator: { enabled: !0 }, scrollbar: { enabled: !0 }, rangeSelector: { enabled: !0 }, title: { text: null, style: { fontSize: "16px"} },
    tooltip: { shared: !0, crosshairs: !0 }, legend: { enabled: !1 }, plotOptions: { line: f, spline: f, area: f, areaspline: f, arearange: f, areasplinerange: f, column: g, columnrange: g, candlestick: g, ohlc: g }
}, a, { _stock: !0, chart: { inverted: !1} }); a.series = c; return new qa(a, b)
    }; s(Ra.prototype, "init", function (a, b, c) { var d = c.chart.pinchType || ""; a.call(this, b, c); this.pinchX = this.pinchHor = -1 !== d.indexOf("x"); this.pinchY = this.pinchVert = -1 !== d.indexOf("y"); this.hasZoom = this.hasZoom || this.pinchHor || this.pinchVert }); s($.prototype, "autoLabelAlign",
function (a) { var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels; return this.chart.options._stock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = 1, "right") : a.call(this, [].slice.call(arguments, 1)) }); $.prototype.getPlotLinePath = function (a, b, c, d, e) {
    var f = this, g = this.isLinked && !this.series ? this.linkedParent.series : this.series, h = f.chart, k = h.renderer, n = f.left, m = f.top, r, p, s, q, B = [], y, C; if ("xAxis" ===
f.coll || "yAxis" === f.coll) y = f.isXAxis ? w(f.options.yAxis) ? [h.yAxis[f.options.yAxis]] : Ga(g, function (a) { return a.yAxis }) : w(f.options.xAxis) ? [h.xAxis[f.options.xAxis]] : Ga(g, function (a) { return a.xAxis }); v(f.isXAxis ? h.yAxis : h.xAxis, function (a) { if (w(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) { var b = a.isXAxis ? "yAxis" : "xAxis", b = w(a.options[b]) ? h[b][a.options[b]] : h[b][0]; f === b && y.push(a) } }); C = y.length ? [] : [f]; v(y, function (a) { -1 === Va(a, C) && C.push(a) }); e = l(e, f.translate(a, null, null, c)); isNaN(e) || (f.horiz ?
v(C, function (a) { p = a.top; q = p + a.len; r = s = I(e + f.transB); (r >= n && r <= n + f.width || d) && B.push("M", r, p, "L", s, q) }) : v(C, function (a) { r = a.left; s = r + a.width; p = q = I(m + f.height - e); (p >= m && p <= m + f.height || d) && B.push("M", r, p, "L", s, q) })); if (0 < B.length) return k.crispPolyLine(B, b || 1)
}; $.prototype.getPlotBandPath = function (a, b) { var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a), e = [], f; if (d && c) for (f = 0; f < d.length; f += 6) e.push("M", d[f + 1], d[f + 2], "L", d[f + 4], d[f + 5], c[f + 4], c[f + 5], c[f + 1], c[f + 2]); else e = null; return e }; za.prototype.crispPolyLine =
function (a, b) { var c; for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = I(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = I(a[c + 2]) + b % 2 / 2); return a }; Za === ha.VMLRenderer && (eb.prototype.crispPolyLine = za.prototype.crispPolyLine); s($.prototype, "hideCrosshair", function (a, b) { a.call(this, b); w(this.crossLabelArray) && (w(b) ? this.crossLabelArray[b] && this.crossLabelArray[b].hide() : v(this.crossLabelArray, function (a) { a.hide() })) }); s($.prototype, "drawCrosshair", function (a, b, c) {
    var d, e; a.call(this, b, c); if (w(this.crosshair.label) &&
this.crosshair.label.enabled && w(c)) {
        e = this.chart; var f = this.options.crosshair.label, g = this.isXAxis ? "x" : "y"; d = this.horiz; var h = this.opposite, k = this.left, n = this.top; a = this.crossLabel; var m, r = f.format, s = ""; a || (a = this.crossLabel = e.renderer.label().attr({ align: f.align || (d ? "center" : h ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center"), zIndex: 12, height: d ? 16 : D, fill: f.backgroundColor || this.series[0] && this.series[0].color || "gray", padding: l(f.padding, 2), stroke: f.borderColor || null,
            "stroke-width": f.borderWidth || 0
        }).css(q({ color: "white", fontWeight: "normal", fontSize: "11px", textAlign: "center" }, f.style)).add()); d ? (b = c.plotX + k, m = n + (h ? 0 : this.height)) : (b = h ? this.width + k : 0, m = c.plotY + n); if (m < n || m > n + this.height) this.hideCrosshair(); else {
            r || f.formatter || (this.isDatetimeAxis && (s = "%b %d, %Y"), r = "{value" + (s ? ":" + s : "") + "}"); a.attr({ text: r ? p(r, { value: c[g] }) : f.formatter.call(this, c[g]), x: b, y: m, visibility: "visible" }); c = a.getBBox(); if (d) {
                if ("inside" === this.options.tickPosition && !h || "inside" !== this.options.tickPosition &&
h) m = a.y - c.height
            } else m = a.y - c.height / 2; d ? (d = k - c.x, e = k + this.width - c.x) : (d = "left" === this.labelAlign ? k : 0, e = "right" === this.labelAlign ? k + this.width : e.chartWidth); a.translateX < d && (b += d - a.translateX); a.translateX + c.width >= e && (b -= a.translateX + c.width - e); a.attr({ x: b, y: m, visibility: "visible" })
        }
    }
}); var uc = ua.init, vc = ua.processData, wc = Ea.prototype.tooltipFormatter; ua.init = function () { uc.apply(this, arguments); this.setCompare(this.options.compare) }; ua.setCompare = function (a) {
    this.modifyValue = "value" === a || "percent" ===
a ? function (b, c) { var d = this.compareValue; b !== D && (b = "value" === a ? b - d : b = b / d * 100 - 100, c && (c.change = b)); return b } : null; this.chart.hasRendered && (this.isDirty = !0)
}; ua.processData = function () { var a = 0, b, c, d; vc.apply(this, arguments); if (this.xAxis && this.processedYData) for (b = this.processedXData, c = this.processedYData, d = c.length; a < d; a++) if ("number" === typeof c[a] && b[a] >= this.xAxis.min) { this.compareValue = c[a]; break } }; s(ua, "getExtremes", function (a) {
    a.apply(this, [].slice.call(arguments, 1)); this.modifyValue && (this.dataMax =
this.modifyValue(this.dataMax), this.dataMin = this.modifyValue(this.dataMin))
}); $.prototype.setCompare = function (a, b) { this.isXAxis || (v(this.series, function (b) { b.setCompare(a) }), l(b, !0) && this.chart.redraw()) }; Ea.prototype.tooltipFormatter = function (a) { a = a.replace("{point.change}", (0 < this.change ? "+" : "") + B(this.change, l(this.series.tooltipOptions.changeDecimals, 2))); return wc.apply(this, [a]) }; s(U.prototype, "render", function (a) {
    this.chart.options._stock && (!this.clipBox && this.animate && -1 !== this.animate.toString().indexOf("sharedClip") ?
(this.clipBox = u(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] && this.chart[this.sharedClipKey].attr({ width: this.xAxis.len, height: this.yAxis.len })); a.call(this)
}); q(Pb.prototype, { init: function (a, b, c) {
    var d = this, e = d.defaultOptions; d.chart = b; b.angular && (e.background = {}); d.options = a = u(e, a); (a = a.background) && v([].concat(W(a)).reverse(), function (a) {
        var b = a.backgroundColor; a = u(d.defaultBackgroundOptions, a); b && (a.backgroundColor = b);
        a.color = a.backgroundColor; c.options.plotBands.unshift(a)
    })
}, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "silver", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#FFF"], [1, "#DDD"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" }
}); var rb = $.prototype, Ib = ra.prototype, xc = { getOffset: oa, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: oa, setCategories: oa,
    setTitle: oa
}, bc = { isRadial: !0, defaultRadialGaugeOptions: { labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2 }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 },
    showLastLabel: !1, title: { x: 4, text: null, rotation: 90 }
}, setOptions: function (a) { a = this.options = u(this.defaultOptions, this.defaultRadialOptions, a); a.plotBands || (a.plotBands = []) }, getOffset: function () { rb.getOffset.call(this); this.chart.axisOffset[this.side] = 0; this.center = this.pane.center = Ub.getCenter.call(this.pane) }, getLinePath: function (a, b) {
    var c = this.center; b = l(b, c[2] / 2 - this.offset); return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, { start: this.startAngleRad, end: this.endAngleRad, open: !0,
        innerR: 0
    })
}, setAxisTranslation: function () { rb.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0) }, beforeSetTickPositions: function () { this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0) }, setAxisSize: function () {
    rb.setAxisSize.call(this); this.isRadial && (this.center = this.pane.center =
ha.CenteredSeriesMixin.getCenter.call(this.pane), this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * l(this.sector, 1) / 2)
}, getPosition: function (a, b) { return this.postTranslate(this.isCircular ? this.translate(a) : 0, l(this.isCircular ? b : this.translate(a), this.center[2] / 2) - this.offset) }, postTranslate: function (a, b) { var c = this.chart, d = this.center; a = this.startAngleRad + a; return { x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b} }, getPlotBandPath: function (a,
b, c) {
    var d = this.center, e = this.startAngleRad, f = d[2] / 2, g = [l(c.outerRadius, "100%"), c.innerRadius, l(c.thickness, 10)], h = /%$/, k, n = this.isCircular; "polygon" === this.options.gridLineInterpolation ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (n || (g[0] = this.translate(a), g[1] = this.translate(b)), g = Ga(g, function (a) { h.test(a) && (a = A(a, 10) * f / 100); return a }), "circle" !== c.shape && n ? (a = e + this.translate(a), b = e + this.translate(b)) : (a = -Math.PI / 2, b = 1.5 * Math.PI, k = !0), d = this.chart.renderer.symbols.arc(this.left +
d[0], this.top + d[1], g[0], g[0], { start: a, end: b, innerR: l(g[1], g[0] - g[2]), open: k })); return d
}, getPlotLinePath: function (a, b) {
    var c = this, d = c.center, e = c.chart, f = c.getPosition(a), g, h, k; c.isCircular ? k = ["M", d[0] + e.plotLeft, d[1] + e.plotTop, "L", f.x, f.y] : "circle" === c.options.gridLineInterpolation ? (a = c.translate(a)) && (k = c.getLinePath(0, a)) : (v(e.xAxis, function (a) { a.pane === c.pane && (g = a) }), k = [], a = c.translate(a), d = g.tickPositions, g.autoConnect && (d = d.concat([d[0]])), b && (d = [].concat(d).reverse()), v(d, function (b, c) {
        h = g.getPosition(b,
a); k.push(c ? "L" : "M", h.x, h.y)
    })); return k
}, getTitlePosition: function () { var a = this.center, b = this.chart, c = this.options.title; return { x: b.plotLeft + a[0] + (c.x || 0), y: b.plotTop + a[1] - { high: .5, middle: .25, low: 0}[c.align] * a[2] + (c.y || 0)} }
}; s(rb, "init", function (a, b, c) {
    var d = b.angular, e = b.polar, f = c.isX, g = d && f, h, k; k = b.options; var n = c.pane || 0; if (d) { if (q(this, g ? xc : bc), h = !f) this.defaultRadialOptions = this.defaultRadialGaugeOptions } else e && (q(this, bc), this.defaultRadialOptions = (h = f) ? this.defaultRadialXOptions : u(this.defaultYAxisOptions,
this.defaultRadialYOptions)); a.call(this, b, c); g || !d && !e || (a = this.options, b.panes || (b.panes = []), this.pane = n = b.panes[n] = b.panes[n] || new Pb(W(k.pane)[n], b, this), n = n.options, b.inverted = !1, k.chart.zoomType = null, this.startAngleRad = b = (n.startAngle - 90) * Math.PI / 180, this.endAngleRad = k = (l(n.endAngle, n.startAngle + 360) - 90) * Math.PI / 180, this.offset = a.offset || 0, (this.isCircular = h) && c.max === D && k - b === 2 * Math.PI && (this.autoConnect = !0))
}); s(Ib, "getPosition", function (a, b, c, d, e) {
    var f = this.axis; return f.getPosition ? f.getPosition(c) :
a.call(this, b, c, d, e)
}); s(Ib, "getLabelPosition", function (a, b, c, d, e, f, g, h, k) {
    var n = this.axis, m = f.y, r = f.align, p = (n.translate(this.pos) + n.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360; n.isRadial ? (a = n.getPosition(this.pos, n.center[2] / 2 + l(f.distance, -25)), "auto" === f.rotation ? d.attr({ rotation: p }) : null === m && (m = n.chart.renderer.fontMetrics(d.styles.fontSize).b - d.getBBox().height / 2), null === r && (r = n.isCircular ? 20 < p && 160 > p ? "left" : 200 < p && 340 > p ? "right" : "center" : "center", d.attr({ align: r })), a.x += f.x, a.y += m) : a = a.call(this,
b, c, d, e, f, g, h, k); return a
}); s(Ib, "getMarkPath", function (a, b, c, d, e, f, g) { var h = this.axis; h.isRadial ? (a = h.getPosition(this.pos, h.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, f, g); return b }); Y.arearange = u(Y.area, { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }, states: { hover: { halo: !1}} });
    K.arearange = Q(K.area, { type: "arearange", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "low", getSegments: function () { var a = this; v(a.points, function (b) { a.options.connectNulls || null !== b.low && null !== b.high ? null === b.low && null !== b.high && (b.y = b.high) : b.y = null }); U.prototype.getSegments.call(this) }, translate: function () {
        var a = this.yAxis; K.area.prototype.translate.apply(this); v(this.points, function (b) {
            var c = b.low, d = b.high, e = b.plotY; null === d && null === c ? b.y = null : null === c ? (b.plotLow =
b.plotY = null, b.plotHigh = a.translate(d, 0, 1, 0, 1)) : null === d ? (b.plotLow = e, b.plotHigh = null) : (b.plotLow = e, b.plotHigh = a.translate(d, 0, 1, 0, 1))
        })
    }, getSegmentPath: function (a) {
        var b, c = [], d = a.length, e = U.prototype.getSegmentPath, f, g; g = this.options; var h = g.step; for (b = HighchartsAdapter.grep(a, function (a) { return null !== a.plotLow }); d--; ) f = a[d], null !== f.plotHigh && c.push({ plotX: f.plotX, plotY: f.plotHigh }); a = e.call(this, b); h && (!0 === h && (h = "left"), g.step = { left: "right", center: "center", right: "left"}[h]); c = e.call(this, c);
        g.step = h; g = [].concat(a, c); c[0] = "L"; this.areaPath = this.areaPath.concat(a, c); return g
    }, drawDataLabels: function () {
        var a = this.data, b = a.length, c, d = [], e = U.prototype, f = this.options.dataLabels, g = f.align, h, k = this.chart.inverted; if (f.enabled || this._hasPointLabels) {
            for (c = b; c--; ) h = a[c], h.y = h.high, h._plotY = h.plotY, h.plotY = h.plotHigh, d[c] = h.dataLabel, h.dataLabel = h.dataLabelUpper, h.below = !1, k ? (g || (f.align = "left"), f.x = f.xHigh) : f.y = f.yHigh; e.drawDataLabels && e.drawDataLabels.apply(this, arguments); for (c = b; c--; ) h = a[c],
h.dataLabelUpper = h.dataLabel, h.dataLabel = d[c], h.y = h.low, h.plotY = h._plotY, h.below = !0, k ? (g || (f.align = "right"), f.x = f.xLow) : f.y = f.yLow; e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
        } f.align = g
    }, alignDataLabel: function () { K.column.prototype.alignDataLabel.apply(this, arguments) }, getSymbol: oa, drawPoints: oa
    }); Y.areasplinerange = u(Y.arearange); K.areasplinerange = Q(K.arearange, { type: "areasplinerange", getPointSpline: K.spline.prototype.getPointSpline }); (function () {
        var a = K.column.prototype; Y.columnrange =
u(Y.column, Y.arearange, { lineWidth: 1, pointRange: null }); K.columnrange = Q(K.arearange, { type: "columnrange", translate: function () { var b = this, c = b.yAxis, d; a.translate.apply(b); v(b.points, function (a) { var f = a.shapeArgs, g = b.options.minPointLength, h; a.tooltipPos = null; a.plotHigh = d = c.translate(a.high, 0, 1, 0, 1); a.plotLow = a.plotY; h = d; a = a.plotY - d; a < g && (g -= a, a += g, h -= g / 2); f.height = a; f.y = h }) }, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: oa, pointAttrToOptions: a.pointAttrToOptions, drawPoints: a.drawPoints, drawTracker: a.drawTracker,
    animate: a.animate, getColumnMetrics: a.getColumnMetrics
})
    })(); Y.gauge = u(Y.line, { dataLabels: { enabled: !0, defer: !1, y: 15, borderWidth: 1, borderColor: "silver", borderRadius: 3, crop: !1, style: { fontWeight: "bold" }, verticalAlign: "top", zIndex: 2 }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 }); var yc = { type: "gauge", pointClass: Q(Ea, { setState: function (a) { this.state = a } }), angular: !0, drawGraph: oa, fixedBox: !0, forceDL: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
        var a = this.yAxis, b = this.options,
c = a.center; this.generatePoints(); v(this.points, function (d) {
    var e = u(b.dial, d.dial), f = A(l(e.radius, 80)) * c[2] / 200, g = A(l(e.baseLength, 70)) * f / 100, h = A(l(e.rearLength, 10)) * f / 100, k = e.baseWidth || 3, n = e.topWidth || 1, m = b.overshoot, r = a.startAngleRad + a.translate(d.y, null, null, null, !0); m && "number" === typeof m ? (m = m / 180 * Math.PI, r = Math.max(a.startAngleRad - m, Math.min(a.endAngleRad + m, r))) : !1 === b.wrap && (r = Math.max(a.startAngleRad, Math.min(a.endAngleRad, r))); r = 180 * r / Math.PI; d.shapeType = "path"; d.shapeArgs = { d: e.path || ["M",
-h, -k / 2, "L", g, -k / 2, f, -n / 2, f, n / 2, g, k / 2, -h, k / 2, "z"], translateX: c[0], translateY: c[1], rotation: r
    }; d.plotX = c[0]; d.plotY = c[1]
})
    }, drawPoints: function () {
        var a = this, b = a.yAxis.center, c = a.pivot, d = a.options, e = d.pivot, f = a.chart.renderer; v(a.points, function (b) { var c = b.graphic, e = b.shapeArgs, n = e.d, m = u(d.dial, b.dial); c ? (c.animate(e), e.d = n) : b.graphic = f[b.shapeType](e).attr({ stroke: m.borderColor || "none", "stroke-width": m.borderWidth || 0, fill: m.backgroundColor || "black", rotation: e.rotation }).add(a.group) }); c ? c.animate({ translateX: b[0],
            translateY: b[1]
        }) : a.pivot = f.circle(0, 0, l(e.radius, 5)).attr({ "stroke-width": e.borderWidth || 0, stroke: e.borderColor || "silver", fill: e.backgroundColor || "black" }).translate(b[0], b[1]).add(a.group)
    }, animate: function (a) { var b = this; a || (v(b.points, function (a) { var d = a.graphic; d && (d.attr({ rotation: 180 * b.yAxis.startAngleRad / Math.PI }), d.animate({ rotation: a.shapeArgs.rotation }, b.options.animation)) }), b.animate = null) }, render: function () {
        this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex,
this.chart.seriesGroup); U.prototype.render.call(this); this.group.clip(this.chart.clipRect)
    }, setData: function (a, b) { U.prototype.setData.call(this, a, !1); this.processData(); this.generatePoints(); l(b, !0) && this.chart.redraw() }, drawTracker: Wa && Wa.drawTrackerPoint
    }; K.gauge = Q(K.line, yc); Y.boxplot = u(Y.column, { fillColor: "#FFFFFF", lineWidth: 1, medianWidth: 2, states: { hover: { brightness: -.3} }, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>' },
        whiskerLength: "50%", whiskerWidth: 2
    }); K.boxplot = Q(K.column, { type: "boxplot", pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high", pointAttrToOptions: { fill: "fillColor", stroke: "color", "stroke-width": "lineWidth" }, drawDataLabels: oa, translate: function () { var a = this.yAxis, b = this.pointArrayMap; K.column.prototype.translate.apply(this); v(this.points, function (c) { v(b, function (b) { null !== c[b] && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1)) }) }) }, drawPoints: function () {
        var a =
this, b = a.points, c = a.options, d = a.chart.renderer, e, f, g, h, k, n, m, r, p, s, q, B, y, C, F, J, O, w, u, R, M, da, E = !1 !== a.doQuartiles, G = parseInt(a.options.whiskerLength, 10) / 100; v(b, function (b) {
    p = b.graphic; M = b.shapeArgs; q = {}; C = {}; J = {}; da = b.color || a.color; b.plotY !== D && (e = b.pointAttr[b.selected ? "selected" : ""], O = M.width, w = fa(M.x), u = w + O, R = I(O / 2), f = fa(E ? b.q1Plot : b.lowPlot), g = fa(E ? b.q3Plot : b.lowPlot), h = fa(b.highPlot), k = fa(b.lowPlot), q.stroke = b.stemColor || c.stemColor || da, q["stroke-width"] = l(b.stemWidth, c.stemWidth, c.lineWidth),
q.dashstyle = b.stemDashStyle || c.stemDashStyle, C.stroke = b.whiskerColor || c.whiskerColor || da, C["stroke-width"] = l(b.whiskerWidth, c.whiskerWidth, c.lineWidth), J.stroke = b.medianColor || c.medianColor || da, J["stroke-width"] = l(b.medianWidth, c.medianWidth, c.lineWidth), J["stroke-linecap"] = "round", m = q["stroke-width"] % 2 / 2, r = w + R + m, s = ["M", r, g, "L", r, h, "M", r, f, "L", r, k], E && (m = e["stroke-width"] % 2 / 2, r = fa(r) + m, f = fa(f) + m, g = fa(g) + m, w += m, u += m, B = ["M", w, g, "L", w, f, "L", u, f, "L", u, g, "L", w, g, "z"]), G && (m = C["stroke-width"] % 2 / 2, h += m,
k += m, y = ["M", r - R * G, h, "L", r + R * G, h, "M", r - R * G, k, "L", r + R * G, k]), m = J["stroke-width"] % 2 / 2, n = I(b.medianPlot) + m, F = ["M", w, n, "L", u, n], p ? (b.stem.animate({ d: s }), G && b.whiskers.animate({ d: y }), E && b.box.animate({ d: B }), b.medianShape.animate({ d: F })) : (b.graphic = p = d.g().add(a.group), b.stem = d.path(s).attr(q).add(p), G && (b.whiskers = d.path(y).attr(C).add(p)), E && (b.box = d.path(B).attr(e).add(p)), b.medianShape = d.path(F).attr(J).add(p)))
})
    }
    }); Y.errorbar = u(Y.boxplot, { color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
        whiskerWidth: null
    }); K.errorbar = Q(K.boxplot, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: K.arearange ? K.arearange.prototype.drawDataLabels : oa, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || K.column.prototype.getColumnMetrics.call(this) } }); Y.waterfall = u(Y.column, { lineWidth: 1, lineColor: "#333", dashStyle: "dot", borderColor: "#333", states: { hover: { lineWidthPlus: 0}} }); K.waterfall =
Q(K.column, { type: "waterfall", upColorProp: "fill", pointArrayMap: ["low", "y"], pointValKey: "y", init: function (a, b) { b.stacking = !0; K.column.prototype.init.call(this, a, b) }, translate: function () {
    var a = this.yAxis, b, c, d, e, f, g, h, k, n, m; b = this.options.threshold; K.column.prototype.translate.apply(this); k = n = b; d = this.points; c = 0; for (b = d.length; c < b; c++) e = d[c], f = e.shapeArgs, g = this.getStack(c), m = g.points[this.index + "," + c], isNaN(e.y) && (e.y = this.yData[c]), h = G(k, k + e.y) + m[0], f.y = a.translate(h, 0, 1), e.isSum ? (f.y = a.translate(m[1],
0, 1), f.height = a.translate(m[0], 0, 1) - f.y) : e.isIntermediateSum ? (f.y = a.translate(m[1], 0, 1), f.height = a.translate(n, 0, 1) - f.y, n = m[1]) : k += g.total, 0 > f.height && (f.y += f.height, f.height *= -1), e.plotY = f.y = I(f.y) - this.borderWidth % 2 / 2, f.height = G(I(f.height), .001), e.yBottom = f.y + f.height, f = e.plotY + (e.negative ? f.height : 0), this.chart.inverted ? e.tooltipPos[0] = a.len - f : e.tooltipPos[1] = f
}, processData: function (a) {
    var b = this.yData, c = this.points, d, e = b.length, f, g, h, k, n, m; g = f = h = k = this.options.threshold || 0; for (m = 0; m < e; m++) n =
b[m], d = c && c[m] ? c[m] : {}, "sum" === n || d.isSum ? b[m] = g : "intermediateSum" === n || d.isIntermediateSum ? b[m] = f : (g += n, f += n), h = Math.min(g, h), k = Math.max(g, k); U.prototype.processData.call(this, a); this.dataMin = h; this.dataMax = k
}, toYData: function (a) { return a.isSum ? 0 === a.x ? null : "sum" : a.isIntermediateSum ? 0 === a.x ? null : "intermediateSum" : a.y }, getAttribs: function () {
    K.column.prototype.getAttribs.apply(this, arguments); var a = this.options, b = a.states, c = a.upColor || this.color, a = ha.Color(c).brighten(.1).get(), d = u(this.pointAttr),
e = this.upColorProp; d[""][e] = c; d.hover[e] = b.hover.upColor || a; d.select[e] = b.select.upColor || c; v(this.points, function (a) { 0 < a.y && !a.color && (a.pointAttr = d, a.color = c) })
}, getGraphPath: function () { var a = this.data, b = a.length, c = I(this.options.lineWidth + this.borderWidth) % 2 / 2, d = [], e, f, g; for (g = 1; g < b; g++) f = a[g].shapeArgs, e = a[g - 1].shapeArgs, f = ["M", e.x + e.width, e.y + c, "L", f.x, e.y + c], 0 > a[g - 1].y && (f[2] += e.height, f[5] += e.height), d = d.concat(f); return d }, getExtremes: oa, getStack: function (a) {
    var b = this.yAxis.stacks, c = this.stackKey;
    this.processedYData[a] < this.options.threshold && (c = "-" + c); return b[c][a]
}, drawGraph: U.prototype.drawGraph
}); Y.bubble = u(Y.scatter, { dataLabels: { formatter: function () { return this.point.z }, inside: !0, style: { color: "white", textShadow: "0px 0px 3px black" }, verticalAlign: "middle" }, marker: { lineColor: null, lineWidth: 1 }, minSize: 8, maxSize: "20%", states: { hover: { halo: { size: 5}} }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0 }); var zc = Q(Ea, { haloPath: function () {
    return Ea.prototype.haloPath.call(this,
this.shapeArgs.r + this.series.options.states.hover.halo.size)
}
}); K.bubble = Q(K.scatter, { type: "bubble", pointClass: zc, pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], bubblePadding: !0, pointAttrToOptions: { stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor" }, applyOpacity: function (a) { var b = this.options.marker, c = l(b.fillOpacity, .5); a = a || b.fillColor || this.color; 1 !== c && (a = Ka(a).setOpacity(c).get("rgba")); return a }, convertAttribs: function () {
    var a = U.prototype.convertAttribs.apply(this,
arguments); a.fill = this.applyOpacity(a.fill); return a
}, getRadii: function (a, b, c, d) { var e, f, g, h = this.zData, k = [], n = "width" !== this.options.sizeBy; f = 0; for (e = h.length; f < e; f++) g = b - a, g = 0 < g ? (h[f] - a) / (b - a) : .5, n && 0 <= g && (g = Math.sqrt(g)), k.push(ja.ceil(c + g * (d - c)) / 2); this.radii = k }, animate: function (a) { var b = this.options.animation; a || (v(this.points, function (a) { var d = a.graphic; a = a.shapeArgs; d && a && (d.attr("r", 1), d.animate({ r: a.r }, b)) }), this.animate = null) }, translate: function () {
    var a, b = this.data, c, d, e = this.radii; K.scatter.prototype.translate.call(this);
    for (a = b.length; a--; ) c = b[a], d = e ? e[a] : 0, c.negative = c.z < (this.options.zThreshold || 0), d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = { x: c.plotX, y: c.plotY, r: d }, c.dlBox = { x: c.plotX - d, y: c.plotY - d, width: 2 * d, height: 2 * d }) : c.shapeArgs = c.plotY = c.dlBox = D
}, drawLegendSymbol: function (a, b) { var c = A(a.itemStyle.fontSize) / 2; b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({ zIndex: 3 }).add(b.legendGroup); b.legendSymbol.isMarker = !0 }, drawPoints: K.column.prototype.drawPoints, alignDataLabel: K.column.prototype.alignDataLabel
});
    $.prototype.beforePadding = function () {
        var a = this, b = this.len, c = this.chart, d = 0, e = b, f = this.isXAxis, g = f ? "xData" : "yData", h = this.min, k = {}, n = ja.min(c.plotWidth, c.plotHeight), m = Number.MAX_VALUE, r = -Number.MAX_VALUE, p = this.max - h, s = b / p, q = []; this.tickPositions && (v(this.series, function (b) {
            var d = b.options; !b.bubblePadding || !b.visible && c.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, q.push(b), f && (v(["minSize", "maxSize"], function (a) { var b = d[a], c = /%$/.test(b), b = A(b); k[a] = c ? n * b / 100 : b }), b.minPxSize = k.minSize,
b = b.zData, b.length && (m = l(d.zMin, ja.min(m, ja.max(J(b), !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE))), r = l(d.zMax, ja.max(r, da(b))))))
        }), v(q, function (a) { var b = a[g], c = b.length, n; f && a.getRadii(m, r, k.minSize, k.maxSize); if (0 < p) for (; c--; ) "number" === typeof b[c] && (n = a.radii[c], d = Math.min((b[c] - h) * s - n, d), e = Math.max((b[c] - h) * s + n, e)) }), q.length && 0 < p && l(this.options.min, this.userMin) === D && l(this.options.max, this.userMax) === D && (e -= b, s *= (b + d - e) / b, this.min += d / s, this.max += e / s))
    }; (function () {
        function a(a, b,
c) { a.call(this, b, c); this.chart.polar && (this.closeSegment = function (a) { var b = this.xAxis.center; a.push("L", b[0], b[1]) }, this.closedStacks = !0) } function b(a, b) {
    var c = this.chart, d = this.options.animation, e = this.group, m = this.markerGroup, r = this.xAxis.center, p = c.plotLeft, s = c.plotTop; c.polar ? c.renderer.isSVG && (!0 === d && (d = {}), b ? (c = { translateX: r[0] + p, translateY: r[1] + s, scaleX: .001, scaleY: .001 }, e.attr(c), m && m.attr(c)) : (c = { translateX: p, translateY: s, scaleX: 1, scaleY: 1 }, e.animate(c, d), m && m.animate(c, d), this.animate =
null)) : a.call(this, b)
} var c = U.prototype, d = Ra.prototype, e; c.toXY = function (a) { var b, c = this.chart, d = a.plotX; b = a.plotY; a.rectPlotX = d; a.rectPlotY = b; d = (d / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360; 0 > d && (d += 360); a.clientX = d; b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b); a.plotX = a.polarPlotX = b.x - c.plotLeft; a.plotY = a.polarPlotY = b.y - c.plotTop }; c.orderTooltipPoints = function (a) { this.chart.polar && (a.sort(function (a, b) { return a.clientX - b.clientX }), a[0] && (a[0].wrappedClientX = a[0].clientX + 360, a.push(a[0]))) };
        K.area && s(K.area.prototype, "init", a); K.areaspline && s(K.areaspline.prototype, "init", a); K.spline && s(K.spline.prototype, "getPointSpline", function (a, b, c, d) {
            var e, m, r, p, s, l, q; this.chart.polar ? (e = c.plotX, m = c.plotY, a = b[d - 1], r = b[d + 1], this.connectEnds && (a || (a = b[b.length - 2]), r || (r = b[1])), a && r && (p = a.plotX, s = a.plotY, b = r.plotX, l = r.plotY, p = (1.5 * e + p) / 2.5, s = (1.5 * m + s) / 2.5, r = (1.5 * e + b) / 2.5, q = (1.5 * m + l) / 2.5, b = Math.sqrt(Math.pow(p - e, 2) + Math.pow(s - m, 2)), l = Math.sqrt(Math.pow(r - e, 2) + Math.pow(q - m, 2)), p = Math.atan2(s - m, p - e),
s = Math.atan2(q - m, r - e), q = Math.PI / 2 + (p + s) / 2, Math.abs(p - q) > Math.PI / 2 && (q -= Math.PI), p = e + Math.cos(q) * b, s = m + Math.sin(q) * b, r = e + Math.cos(Math.PI + q) * l, q = m + Math.sin(Math.PI + q) * l, c.rightContX = r, c.rightContY = q), d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, p || e, s || m, e, m], a.rightContX = a.rightContY = null) : c = ["M", e, m]) : c = a.call(this, b, c, d); return c
        }); s(c, "translate", function (a) { a.call(this); if (this.chart.polar && !this.preventPostTranslate) { a = this.points; for (var b = a.length; b--; ) this.toXY(a[b]) } }); s(c, "getSegmentPath",
function (a, b) { var c = this.points; this.chart.polar && !1 !== this.options.connectEnds && b[b.length - 1] === c[c.length - 1] && null !== c[0].y && (this.connectEnds = !0, b = [].concat(b, [c[0]])); return a.call(this, b) }); s(c, "animate", b); s(c, "setTooltipPoints", function (a, b) { this.chart.polar && q(this.xAxis, { tooltipLen: 360 }); return a.call(this, b) }); K.column && (e = K.column.prototype, s(e, "animate", b), s(e, "translate", function (a) {
    var b = this.xAxis, c = this.yAxis.len, d = b.center, e = b.startAngleRad, m = this.chart.renderer, r, p; this.preventPostTranslate =
!0; a.call(this); if (b.isRadial) for (b = this.points, p = b.length; p--; ) r = b[p], a = r.barX + e, r.shapeType = "path", r.shapeArgs = { d: m.symbols.arc(d[0], d[1], c - r.plotY, null, { start: a, end: a + r.pointWidth, innerR: c - l(r.yBottom, c) }) }, this.toXY(r), r.tooltipPos = [r.plotX, r.plotY], r.ttBelow = r.plotY > d[1]
}), s(e, "alignDataLabel", function (a, b, d, e, n, m) {
    this.chart.polar ? (a = b.rectPlotX / Math.PI * 180, null === e.align && (e.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === e.verticalAlign && (e.verticalAlign = 45 > a || 315 < a ? "bottom" :
135 < a && 225 > a ? "top" : "middle"), c.alignDataLabel.call(this, b, d, e, n, m)) : a.call(this, b, d, e, n, m)
})); s(d, "getIndex", function (a, b) { var c, d = this.chart, e; d.polar ? (e = d.xAxis[0].center, c = b.chartX - e[0] - d.plotLeft, d = b.chartY - e[1] - d.plotTop, c = 180 - Math.round(Math.atan2(c, d) / Math.PI * 180)) : c = a.call(this, b); return c }); s(d, "getCoordinates", function (a, b) {
    var c = this.chart, d = { xAxis: [], yAxis: [] }; c.polar ? v(c.axes, function (a) {
        var e = a.isXAxis, f = a.center, p = b.chartX - f[0] - c.plotLeft, f = b.chartY - f[1] - c.plotTop; d[e ? "xAxis" : "yAxis"].push({ axis: a,
            value: a.translate(e ? Math.PI - Math.atan2(p, f) : Math.sqrt(Math.pow(p, 2) + Math.pow(f, 2)), !0)
        })
    }) : d = a.call(this, b); return d
})
    })(); q(ha, { Axis: $, Chart: qa, Color: Ka, Point: Ea, Tick: ra, Renderer: Za, Series: U, SVGElement: X, SVGRenderer: za, arrayMin: J, arrayMax: da, charts: sa, dateFormat: Ja, format: p, pathAnim: zb, getOptions: function () { return ga }, hasBidiBug: cc, isTouchDevice: ab, numberFormat: B, seriesTypes: K, setOptions: function (a) { ga = u(!0, ga, a); Jb(); return ga }, addEvent: aa, removeEvent: pa, createElement: ba, discardElement: Aa, css: N,
        each: v, extend: q, map: Ga, merge: u, pick: l, splat: W, extendClass: Q, pInt: A, wrap: s, svg: va, canvas: Ba, vml: !va && !Ba, product: "Highcharts 4.0.4", version: "/Highstock 2.0.4"
    })
})();
(function (q) {
    var u = q.getOptions(), A = u.plotOptions, V = q.seriesTypes, H = q.merge, ea = function () { }, P = q.each; A.funnel = H(A.pie, { animation: !1, center: ["50%", "50%"], width: "90%", neckWidth: "30%", height: "100%", neckHeight: "25%", reversed: !1, dataLabels: { connectorWidth: 1, connectorColor: "#606060" }, size: !0, states: { select: { color: "#C0C0C0", borderColor: "#000000", shadow: !1}} }); V.funnel = q.extendClass(V.pie, { type: "funnel", animate: ea, singularTooltips: !0, translate: function () {
        var q = function (p, s) {
            return /%$/.test(p) ? s * parseInt(p,
10) / 100 : parseInt(p, 10)
        }, u = 0, E = this.chart, w = this.options, A = w.reversed, W = E.plotWidth, l = E.plotHeight, N = 0, E = w.center, H = q(E[0], W), Q = q(E[1], l), B = q(w.width, W), y, s, p = q(w.height, l), O = q(w.neckWidth, W), C = q(w.neckHeight, l), F = p - C, q = this.data, J, da, la = "left" === w.dataLabels.position ? 1 : 0, Aa, ma, V, X, ra, $, qa; this.getWidthAt = s = function (s) { return s > p - C || p === C ? O : O + (p - C - s) / (p - C) * (B - O) }; this.getX = function (p, q) { return H + (q ? -1 : 1) * (s(A ? l - p : p) / 2 + w.dataLabels.distance) }; this.center = [H, Q, p]; this.centerX = H; P(q, function (p) { u += p.y });
        P(q, function (l) { qa = null; da = u ? l.y / u : 0; ma = Q - p / 2 + N * p; ra = ma + da * p; y = s(ma); Aa = H - y / 2; V = Aa + y; y = s(ra); X = H - y / 2; $ = X + y; ma > F ? (Aa = X = H - O / 2, V = $ = H + O / 2) : ra > F && (qa = ra, y = s(F), X = H - y / 2, $ = X + y, ra = F); A && (ma = p - ma, ra = p - ra, qa = qa ? p - qa : null); J = ["M", Aa, ma, "L", V, ma, $, ra]; qa && J.push($, qa, X, qa); J.push(X, ra, "Z"); l.shapeType = "path"; l.shapeArgs = { d: J }; l.percentage = 100 * da; l.plotX = H; l.plotY = (ma + (qa || ra)) / 2; l.tooltipPos = [H, l.plotY]; l.slice = ea; l.half = la; N += da })
    }, drawPoints: function () {
        var q = this, u = q.options, E = q.chart.renderer; P(q.data, function (w) {
            var A =
w.graphic, P = w.shapeArgs; A ? A.animate(P) : w.graphic = E.path(P).attr({ fill: w.color, stroke: u.borderColor, "stroke-width": u.borderWidth }).add(q.group)
        })
    }, sortByAngle: function (q) { q.sort(function (q, u) { return q.plotY - u.plotY }) }, drawDataLabels: function () { var q = this.data, u = this.options.dataLabels.distance, E, w, A, P = q.length, l, N; for (this.center[2] -= 2 * u; P--; ) A = q[P], w = (E = A.half) ? 1 : -1, N = A.plotY, l = this.getX(N, E), A.labelPos = [0, N, l + (u - 5) * w, N, l + u * w, N, E ? "right" : "left", 0]; V.pie.prototype.drawDataLabels.call(this) } 
    }); u.plotOptions.pyramid =
q.merge(u.plotOptions.funnel, { neckWidth: "0%", neckHeight: "0%", reversed: !0 }); q.seriesTypes.pyramid = q.extendClass(q.seriesTypes.funnel, { type: "pyramid" })
})(Highcharts);
(function (q) {
    var u = q.Chart, A = q.addEvent, V = q.removeEvent, H = q.createElement, ea = q.discardElement, P = q.css, R = q.merge, M = q.each, E = q.extend, w = Math.max, L = document, W = window, l = q.isTouchDevice, N = q.Renderer.prototype.symbols, ba = q.getOptions(), Q; E(ba.lang, { printChart: "Print chart", downloadPNG: "Download PNG image", downloadJPEG: "Download JPEG image", downloadPDF: "Download PDF document", downloadSVG: "Download SVG vector image", contextButtonTitle: "Chart context menu" }); ba.navigation = { menuStyle: { border: "1px solid #A0A0A0",
        background: "#FFFFFF", padding: "5px 0"
    }, menuItemStyle: { padding: "0 10px", background: "none", color: "#303030", fontSize: l ? "14px" : "11px" }, menuItemHoverStyle: { background: "#4572A5", color: "#FFFFFF" }, buttonOptions: { symbolFill: "#E0E0E0", symbolSize: 14, symbolStroke: "#666", symbolStrokeWidth: 3, symbolX: 12.5, symbolY: 10.5, align: "right", buttonSpacing: 3, height: 22, theme: { fill: "white", stroke: "none" }, verticalAlign: "top", width: 24}
    }; ba.exporting = { type: "image/png", url: "http://export.highcharts.com/", buttons: { contextButton: { menuClassName: "highcharts-contextmenu",
        symbol: "menu", _titleKey: "contextButtonTitle", menuItems: [{ textKey: "printChart", onclick: function () { this.print() } }, { separator: !0 }, { textKey: "downloadPNG", onclick: function () { this.exportChart() } }, { textKey: "downloadJPEG", onclick: function () { this.exportChart({ type: "image/jpeg" }) } }, { textKey: "downloadPDF", onclick: function () { this.exportChart({ type: "application/pdf" }) } }, { textKey: "downloadSVG", onclick: function () { this.exportChart({ type: "image/svg+xml" }) } }]
    }
    }
    }; q.post = function (l, q, s) {
        var p; l = H("form", R({ method: "post",
            action: l, enctype: "multipart/form-data"
        }, s), { display: "none" }, L.body); for (p in q) H("input", { type: "hidden", name: p, value: q[p] }, null, l); l.submit(); ea(l)
    }; E(u.prototype, { getSVG: function (l) {
        var y = this, s, p, O, C, F = R(y.options, l); L.createElementNS || (L.createElementNS = function (p, s) { return L.createElement(s) }); l = H("div", null, { position: "absolute", top: "-9999em", width: y.chartWidth + "px", height: y.chartHeight + "px" }, L.body); p = y.renderTo.style.width; C = y.renderTo.style.height; p = F.exporting.sourceWidth || F.chart.width ||
/px$/.test(p) && parseInt(p, 10) || 600; C = F.exporting.sourceHeight || F.chart.height || /px$/.test(C) && parseInt(C, 10) || 400; E(F.chart, { animation: !1, renderTo: l, forExport: !0, width: p, height: C }); F.exporting.enabled = !1; F.series = []; M(y.series, function (p) { O = R(p.options, { animation: !1, enableMouseTracking: !1, showCheckbox: !1, visible: p.visible }); O.isInternal || F.series.push(O) }); s = new q.Chart(F, y.callback); M(["xAxis", "yAxis"], function (p) {
    M(y[p], function (l, q) {
        var B = s[p][q], y = l.getExtremes(), C = y.userMin, y = y.userMax; !B || void 0 ===
C && void 0 === y || B.setExtremes(C, y, !0, !1)
    })
}); p = s.container.innerHTML; F = null; s.destroy(); ea(l); p = p.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g, " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g,
"\u00a0").replace(/&shy;/g, "\u00ad").replace(/<IMG /g, "<image ").replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/id=([^" >]+)/g, 'id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function (p) { return p.toLowerCase() }); return p = p.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'")
    }, exportChart: function (l,
y) { l = l || {}; var s = this.options.exporting, s = this.getSVG(R({ chart: { borderRadius: 0} }, s.chartOptions, y, { exporting: { sourceWidth: l.sourceWidth || s.sourceWidth, sourceHeight: l.sourceHeight || s.sourceHeight} })); l = R(this.options.exporting, l); q.post(l.url, { filename: l.filename || "chart", type: l.type, width: l.width || 0, scale: l.scale || 2, svg: s }, l.formAttributes) }, print: function () {
    var l = this, q = l.container, s = [], p = q.parentNode, O = L.body, C = O.childNodes; l.isPrinting || (l.isPrinting = !0, M(C, function (p, l) {
        1 === p.nodeType && (s[l] =
p.style.display, p.style.display = "none")
    }), O.appendChild(q), W.focus(), W.print(), setTimeout(function () { p.appendChild(q); M(C, function (p, l) { 1 === p.nodeType && (p.style.display = s[l]) }); l.isPrinting = !1 }, 1E3))
}, contextMenu: function (l, q, s, p, O, C, F) {
    var u = this, da = u.options.navigation, R = da.menuItemStyle, N = u.chartWidth, L = u.chartHeight, W = "cache-" + l, X = u[W], Q = w(O, C), $, ba, ea, Xa = function (p) { u.pointer.inClass(p.target, l) || ba() }; X || (u[W] = X = H("div", { className: l }, { position: "absolute", zIndex: 1E3, padding: Q + "px" }, u.container),
$ = H("div", null, E({ MozBoxShadow: "3px 3px 10px #888", WebkitBoxShadow: "3px 3px 10px #888", boxShadow: "3px 3px 10px #888" }, da.menuStyle), X), ba = function () { P(X, { display: "none" }); F && F.setState(0); u.openMenu = !1 }, A(X, "mouseleave", function () { ea = setTimeout(ba, 500) }), A(X, "mouseenter", function () { clearTimeout(ea) }), A(document, "mouseup", Xa), A(u, "destroy", function () { V(document, "mouseup", Xa) }), M(q, function (p) {
    if (p) {
        var s = p.separator ? H("hr", null, null, $) : H("div", { onmouseover: function () { P(this, da.menuItemHoverStyle) },
            onmouseout: function () { P(this, R) }, onclick: function () { ba(); p.onclick.apply(u, arguments) }, innerHTML: p.text || u.options.lang[p.textKey]
        }, E({ cursor: "pointer" }, R), $); u.exportDivElements.push(s)
    } 
}), u.exportDivElements.push($, X), u.exportMenuWidth = X.offsetWidth, u.exportMenuHeight = X.offsetHeight); q = { display: "block" }; s + u.exportMenuWidth > N ? q.right = N - s - O - Q + "px" : q.left = s - Q + "px"; p + C + u.exportMenuHeight > L && "top" !== F.alignOptions.verticalAlign ? q.bottom = L - p - Q + "px" : q.top = p + C - Q + "px"; P(X, q); u.openMenu = !0
}, addButton: function (l) {
    var y =
this, s = y.renderer, p = R(y.options.navigation.buttonOptions, l), u = p.onclick, C = p.menuItems, F, w, da = { stroke: p.symbolStroke, fill: p.symbolFill }, A = p.symbolSize || 12; y.btnCount || (y.btnCount = 0); y.exportDivElements || (y.exportDivElements = [], y.exportSVGElements = []); if (!1 !== p.enabled) {
        var M = p.theme, P = M.states, N = P && P.hover, P = P && P.select, L; delete M.states; u ? L = function () { u.apply(y, arguments) } : C && (L = function () { y.contextMenu(w.menuClassName, C, w.translateX, w.translateY, w.width, w.height, w); w.setState(2) }); p.text && p.symbol ?
M.paddingLeft = q.pick(M.paddingLeft, 25) : p.text || E(M, { width: p.width, height: p.height, padding: 0 }); w = s.button(p.text, 0, 0, L, M, N, P).attr({ title: y.options.lang[p._titleKey], "stroke-linecap": "round" }); w.menuClassName = l.menuClassName || "highcharts-menu-" + y.btnCount++; p.symbol && (F = s.symbol(p.symbol, p.symbolX - A / 2, p.symbolY - A / 2, A, A).attr(E(da, { "stroke-width": p.symbolStrokeWidth || 1, zIndex: 1 })).add(w)); w.add().align(E(p, { width: w.width, x: q.pick(p.x, Q) }), !0, "spacingBox"); Q += (w.width + p.buttonSpacing) * ("right" === p.align ?
-1 : 1); y.exportSVGElements.push(w, F)
    } 
}, destroyExport: function (l) { l = l.target; var q, s; for (q = 0; q < l.exportSVGElements.length; q++) if (s = l.exportSVGElements[q]) s.onclick = s.ontouchstart = null, l.exportSVGElements[q] = s.destroy(); for (q = 0; q < l.exportDivElements.length; q++) s = l.exportDivElements[q], V(s, "mouseleave"), l.exportDivElements[q] = s.onmouseout = s.onmouseover = s.ontouchstart = s.onclick = null, ea(s) } 
    }); N.menu = function (l, q, s, p) {
        return ["M", l, q + 2.5, "L", l + s, q + 2.5, "M", l, q + p / 2 + .5, "L", l + s, q + p / 2 + .5, "M", l, q + p - 1.5, "L", l + s,
q + p - 1.5]
    }; u.prototype.callbacks.push(function (l) { var q, s = l.options.exporting, p = s.buttons; Q = 0; if (!1 !== s.enabled) { for (q in p) l.addButton(p[q]); A(l, "destroy", l.destroyExport) } })
})(Highcharts);
(function (q) {
    function u() { return !!this.points.length } function A() { this.hasData() ? this.hideNoData() : this.showNoData() } var V = q.seriesTypes, H = q.Chart.prototype, ea = q.getOptions(), P = q.extend; P(ea.lang, { noData: "No data to display" }); ea.noData = { position: { x: 0, y: 0, align: "center", verticalAlign: "middle" }, attr: {}, style: { fontWeight: "bold", fontSize: "12px", color: "#60606a"} }; V.pie && (V.pie.prototype.hasData = u); V.gauge && (V.gauge.prototype.hasData = u); V.waterfall && (V.waterfall.prototype.hasData = u); q.Series.prototype.hasData =
function () { return void 0 !== this.dataMax && void 0 !== this.dataMin }; H.showNoData = function (q) { var u = this.options; q = q || u.lang.noData; u = u.noData; this.noDataLabel || (this.noDataLabel = this.renderer.label(q, 0, 0, null, null, null, null, null, "no-data").attr(u.attr).css(u.style).add(), this.noDataLabel.align(P(this.noDataLabel.getBBox(), u.position), !1, "plotBox")) }; H.hideNoData = function () { this.noDataLabel && (this.noDataLabel = this.noDataLabel.destroy()) }; H.hasData = function () {
    for (var q = this.series, u = q.length; u--; ) if (q[u].hasData() &&
!q[u].options.isInternal) return !0; return !1
}; H.callbacks.push(function (u) { q.addEvent(u, "load", A); q.addEvent(u, "redraw", A) })
})(Highcharts);
(function (q) {
    function u(l, q, s) { return "rgba(" + [Math.round(l[0] + (q[0] - l[0]) * s), Math.round(l[1] + (q[1] - l[1]) * s), Math.round(l[2] + (q[2] - l[2]) * s), l[3] + (q[3] - l[3]) * s].join() + ")" } var A = function () { }, V = q.getOptions(), H = q.each, ea = q.extend, P = q.format, R = q.pick, M = q.wrap, E = q.Chart, w = q.seriesTypes, L = w.pie, W = w.column, l = HighchartsAdapter.fireEvent, N = HighchartsAdapter.inArray, ba = []; ea(V.lang, { drillUpText: "\u25c1 Back to {series.name}" }); V.drilldown = { activeAxisLabelStyle: { cursor: "pointer", color: "#0d233a", fontWeight: "bold",
        textDecoration: "underline"
    }, activeDataLabelStyle: { cursor: "pointer", color: "#0d233a", fontWeight: "bold", textDecoration: "underline" }, animation: { duration: 500 }, drillUpButton: { position: { align: "right", x: -10, y: 10}}
    }; q.SVGRenderer.prototype.Element.prototype.fadeIn = function (l) { this.attr({ opacity: .1, visibility: "inherit" }).animate({ opacity: R(this.newOpacity, 1) }, l || { duration: 250 }) }; E.prototype.addSeriesAsDrilldown = function (l, q) { this.addSingleSeriesAsDrilldown(l, q); this.applyDrilldown() }; E.prototype.addSingleSeriesAsDrilldown =
function (l, q) {
    var s = l.series, p = s.xAxis, u = s.yAxis, C; C = l.color || s.color; var w, J = [], E = [], P; P = s.levelNumber || 0; q = ea({ color: C }, q); w = N(l, s.points); H(s.chart.series, function (l) { l.xAxis === p && (J.push(l), E.push(l.userOptions), l.levelNumber = l.levelNumber || P) }); C = { levelNumber: P, seriesOptions: s.userOptions, levelSeriesOptions: E, levelSeries: J, shapeArgs: l.shapeArgs, bBox: l.graphic.getBBox(), color: C, lowerSeriesOptions: q, pointOptions: s.options.data[w], pointIndex: w, oldExtremes: { xMin: p && p.userMin, xMax: p && p.userMax, yMin: u &&
u.userMin, yMax: u && u.userMax
    }
    }; this.drilldownLevels || (this.drilldownLevels = []); this.drilldownLevels.push(C); C = C.lowerSeries = this.addSeries(q, !1); C.levelNumber = P + 1; p && (p.oldPos = p.pos, p.userMin = p.userMax = null, u.userMin = u.userMax = null); s.type === C.type && (C.animate = C.animateDrilldown || A, C.options.animation = !0)
}; E.prototype.applyDrilldown = function () {
    var l = this.drilldownLevels, q; l && 0 < l.length && (q = l[l.length - 1].levelNumber, H(this.drilldownLevels, function (l) {
        l.levelNumber === q && H(l.levelSeries, function (p) {
            p.levelNumber ===
q && p.remove(!1)
        })
    })); this.redraw(); this.showDrillUpButton()
}; E.prototype.getDrilldownBackText = function () { var l = this.drilldownLevels; if (l && 0 < l.length) return l = l[l.length - 1], l.series = l.seriesOptions, P(this.options.lang.drillUpText, l) }; E.prototype.showDrillUpButton = function () {
    var l = this, q = this.getDrilldownBackText(), s = l.options.drilldown.drillUpButton, p, u; this.drillUpButton ? this.drillUpButton.attr({ text: q }).align() : (u = (p = s.theme) && p.states, this.drillUpButton = this.renderer.button(q, null, null, function () { l.drillUp() },
p, u && u.hover, u && u.select).attr({ align: s.position.align, zIndex: 9 }).add().align(s.position, !1, s.relativeTo || "plotBox"))
}; E.prototype.drillUp = function () {
    for (var q = this, u = q.drilldownLevels, s = u[u.length - 1].levelNumber, p = u.length, w = q.series, C = w.length, F, J, E, A, P = function (p) { var l; H(w, function (s) { s.userOptions === p && (l = s) }); l = l || q.addSeries(p, !1); l.type === J.type && l.animateDrillupTo && (l.animate = l.animateDrillupTo); p === F.seriesOptions && (E = l) }; p--; ) if (F = u[p], F.levelNumber === s) {
        u.pop(); J = F.lowerSeries; if (!J.chart) for (; C--; ) if (w[C].options.id ===
F.lowerSeriesOptions.id) { J = w[C]; break } J.xData = []; H(F.levelSeriesOptions, P); l(q, "drillup", { seriesOptions: F.seriesOptions }); E.type === J.type && (E.drilldownLevel = F, E.options.animation = q.options.drilldown.animation, J.animateDrillupFrom && J.animateDrillupFrom(F)); E.levelNumber = s; J.remove(!1); E.xAxis && (A = F.oldExtremes, E.xAxis.setExtremes(A.xMin, A.xMax, !1), E.yAxis.setExtremes(A.yMin, A.yMax, !1))
    } this.redraw(); 0 === this.drilldownLevels.length ? this.drillUpButton = this.drillUpButton.destroy() : this.drillUpButton.attr({ text: this.getDrilldownBackText() }).align();
    ba.length = []
}; W.prototype.supportsDrilldown = !0; W.prototype.animateDrillupTo = function (l) {
    if (!l) {
        var q = this, s = q.drilldownLevel; H(this.points, function (p) { p.graphic.hide(); p.dataLabel && p.dataLabel.hide(); p.connector && p.connector.hide() }); setTimeout(function () { H(q.points, function (p, l) { var q = l === (s && s.pointIndex) ? "show" : "fadeIn", u = "show" === q ? !0 : void 0; p.graphic[q](u); if (p.dataLabel) p.dataLabel[q](u); if (p.connector) p.connector[q](u) }) }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0)); this.animate =
A
    } 
}; W.prototype.animateDrilldown = function (l) { var q = this, s = this.chart.drilldownLevels, p = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1].shapeArgs, u = this.chart.options.drilldown.animation; l || (H(s, function (l) { q.userOptions === l.lowerSeriesOptions && (p = l.shapeArgs) }), p.x += this.xAxis.oldPos - this.xAxis.pos, H(this.points, function (l) { l.graphic && l.graphic.attr(p).animate(l.shapeArgs, u); l.dataLabel && l.dataLabel.fadeIn(u) }), this.animate = null) }; W.prototype.animateDrillupFrom = function (l) {
    var w = this.chart.options.drilldown.animation,
s = this.group, p = this; H(p.trackerGroups, function (l) { if (p[l]) p[l].on("mouseover") }); delete this.group; H(this.points, function (p) { var C = p.graphic, F = q.Color(p.color).rgba, J = q.Color(l.color).rgba, E = function () { C.destroy(); s && (s = s.destroy()) }; C && (delete p.graphic, w ? C.animate(l.shapeArgs, q.merge(w, { step: function (l, p) { "start" === p.prop && 4 === F.length && 4 === J.length && this.attr({ fill: u(F, J, p.pos) }) }, complete: E })) : (C.attr(l.shapeArgs), E())) })
}; L && ea(L.prototype, { supportsDrilldown: !0, animateDrillupTo: W.prototype.animateDrillupTo,
    animateDrillupFrom: W.prototype.animateDrillupFrom, animateDrilldown: function (l) {
        var w = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], s = this.chart.options.drilldown.animation, p = w.shapeArgs, O = p.start, C = (p.end - O) / this.points.length, F = q.Color(w.color).rgba; l || (H(this.points, function (l, w) {
            var y = q.Color(l.color).rgba; l.graphic.attr(q.merge(p, { start: O + w * C, end: O + (w + 1) * C }))[s ? "animate" : "attr"](l.shapeArgs, q.merge(s, { step: function (l, p) {
                "start" === p.prop && 4 === F.length && 4 === y.length && this.attr({ fill: u(F,
y, p.pos)
                })
            } 
            }))
        }), this.animate = null)
    } 
}); q.Point.prototype.doDrilldown = function (q) { for (var u = this.series.chart, s = u.options.drilldown, p = (s.series || []).length, w; p-- && !w; ) s.series[p].id === this.drilldown && -1 === N(this.drilldown, ba) && (w = s.series[p], ba.push(this.drilldown)); l(u, "drilldown", { point: this, seriesOptions: w }); w && (q ? u.addSingleSeriesAsDrilldown(this, w) : u.addSeriesAsDrilldown(this, w)) }; M(q.Point.prototype, "init", function (l, u, s, p) {
    var w = l.call(this, u, s, p), C = u.chart, F = (l = u.xAxis && u.xAxis.ticks[p]) &&
l.label; w.drilldown ? (q.addEvent(w, "click", function () { w.doDrilldown() }), F && (F.basicStyles || (F.basicStyles = q.merge(F.styles)), F.addClass("highcharts-drilldown-axis-label").css(C.options.drilldown.activeAxisLabelStyle).on("click", function () { H(F.ddPoints, function (l) { l.doDrilldown && l.doDrilldown(!0) }); C.applyDrilldown() }), F.ddPoints || (F.ddPoints = []), F.ddPoints.push(w))) : F && F.basicStyles && (F.styles = {}, F.css(F.basicStyles)); return w
}); M(q.Series.prototype, "drawDataLabels", function (l) {
    var q = this.chart.options.drilldown.activeDataLabelStyle;
    l.call(this); H(this.points, function (l) { if (l.drilldown && l.dataLabel) l.dataLabel.attr({ "class": "highcharts-drilldown-data-label" }).css(q).on("click", function () { l.doDrilldown() }) })
}); var Q, V = function (l) { l.call(this); H(this.points, function (l) { l.drilldown && l.graphic && l.graphic.attr({ "class": "highcharts-drilldown-point" }).css({ cursor: "pointer" }) }) }; for (Q in w) w[Q].prototype.supportsDrilldown && M(w[Q].prototype, "drawTracker", V)
})(Highcharts);
(function (q) {
    var u = q.getOptions().plotOptions, A = q.pInt, V = q.pick, H = q.each, ea; u.solidgauge = q.merge(u.gauge, { colorByPoint: !0 }); ea = { initDataClasses: function (u) { var A = this, M = this.chart, E, w = 0, L = this.options; this.dataClasses = E = []; H(u.dataClasses, function (H, l) { var N; H = q.merge(H); E.push(H); H.color || ("category" === L.dataClassColor ? (N = M.options.colors, H.color = N[w++], w === N.length && (w = 0)) : H.color = A.tweenColors(q.Color(L.minColor), q.Color(L.maxColor), l / (u.dataClasses.length - 1))) }) }, initStops: function (u) {
        this.stops =
u.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; H(this.stops, function (u) { u.color = q.Color(u[1]) })
    }, toColor: function (q, u) {
        var A, E = this.stops, w, L = this.dataClasses, H, l; if (L) for (l = L.length; l--; ) { if (H = L[l], w = H.from, E = H.to, (void 0 === w || q >= w) && (void 0 === E || q <= E)) { A = H.color; u && (u.dataClass = l); break } } else {
            this.isLog && (q = this.val2lin(q)); A = 1 - (this.max - q) / (this.max - this.min); for (l = E.length; l-- && !(A > E[l][0]); ); w = E[l] || E[l + 1]; E = E[l + 1] || w; A = 1 - (E[0] - A) / (E[0] - w[0] || 1); A = this.tweenColors(w.color, E.color,
A)
        } return A
    }, tweenColors: function (q, u, A) { var E = 1 !== u.rgba[3] || 1 !== q.rgba[3]; return 0 === q.rgba.length || 0 === u.rgba.length ? "none" : (E ? "rgba(" : "rgb(") + Math.round(u.rgba[0] + (q.rgba[0] - u.rgba[0]) * (1 - A)) + "," + Math.round(u.rgba[1] + (q.rgba[1] - u.rgba[1]) * (1 - A)) + "," + Math.round(u.rgba[2] + (q.rgba[2] - u.rgba[2]) * (1 - A)) + (E ? "," + (u.rgba[3] + (q.rgba[3] - u.rgba[3]) * (1 - A)) : "") + ")" } 
    }; q.seriesTypes.solidgauge = q.extendClass(q.seriesTypes.gauge, { type: "solidgauge", bindAxes: function () {
        var u; q.seriesTypes.gauge.prototype.bindAxes.call(this);
        u = this.yAxis; q.extend(u, ea); u.options.dataClasses && u.initDataClasses(u.options); u.initStops(u.options)
    }, drawPoints: function () {
        var u = this, H = u.yAxis, M = H.center, E = u.options, w = u.chart.renderer; q.each(u.points, function (L) {
            var W = L.graphic, l = H.startAngleRad + H.translate(L.y, null, null, null, !0), N = A(V(E.radius, 100)) * M[2] / 200, ba = A(V(E.innerRadius, 60)) * M[2] / 200, Q = H.toColor(L.y, L), B; "none" !== Q && (B = L.color, L.color = Q); !1 === E.wrap && (l = Math.max(H.startAngleRad, Math.min(H.endAngleRad, l))); var l = 180 * l / Math.PI, y = l / (180 /
Math.PI), s = H.startAngleRad, l = Math.min(y, s), y = Math.max(y, s); y - l > 2 * Math.PI && (y = l + 2 * Math.PI); N = { x: M[0], y: M[1], r: N, innerR: ba, start: l, end: y }; W ? (ba = N.d, W.attr({ fill: L.color }).animate(N, { step: function (l, s) { W.attr("fill", ea.tweenColors(q.Color(B), q.Color(Q), s.pos)) } }), N.d = ba) : L.graphic = w.arc(N).attr({ stroke: E.borderColor || "none", "stroke-width": E.borderWidth || 0, fill: L.color, "sweep-flag": 0 }).add(u.group)
        })
    }, animate: null
    })
})(Highcharts);
(function (q) {
    var u = q.Axis, A = q.Chart, V = q.Color, H = q.Legend, ea = q.LegendSymbolMixin, P = q.Series, R = q.SVGRenderer, M = q.getOptions(), E = q.each, w = q.extend, L = q.extendClass, W = q.merge, l = q.pick, N = q.numberFormat, ba = q.seriesTypes, Q = q.wrap, B = function () { }, y = q.ColorAxis = function () { this.isColorAxis = !0; this.init.apply(this, arguments) }; w(y.prototype, u.prototype); w(y.prototype, { defaultColorAxisOptions: { lineWidth: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, color: "gray",
        width: .01
    }, labels: { overflow: "justify" }, minColor: "#EFEFFF", maxColor: "#003875", tickLength: 5
    }, init: function (l, p) { var q = "vertical" !== l.options.legend.layout, w; w = W(this.defaultColorAxisOptions, { side: q ? 2 : 1, reversed: !q }, p, { isX: q, opposite: !q, showEmpty: !1, title: null, isColor: !0 }); u.prototype.init.call(this, l, w); p.dataClasses && this.initDataClasses(p); this.initStops(p); this.isXAxis = !0; this.horiz = q; this.zoomEnabled = !1 }, tweenColors: function (l, p, q) {
        var u = 1 !== p.rgba[3] || 1 !== l.rgba[3]; return (u ? "rgba(" : "rgb(") + Math.round(p.rgba[0] +
(l.rgba[0] - p.rgba[0]) * (1 - q)) + "," + Math.round(p.rgba[1] + (l.rgba[1] - p.rgba[1]) * (1 - q)) + "," + Math.round(p.rgba[2] + (l.rgba[2] - p.rgba[2]) * (1 - q)) + (u ? "," + (p.rgba[3] + (l.rgba[3] - p.rgba[3]) * (1 - q)) : "") + ")"
    }, initDataClasses: function (l) {
        var p = this, q = this.chart, u, w = 0, y = this.options, A = l.dataClasses.length; this.dataClasses = u = []; this.legendItems = []; E(l.dataClasses, function (l, s) {
            var B; l = W(l); u.push(l); l.color || ("category" === y.dataClassColor ? (B = q.options.colors, l.color = B[w++], w === B.length && (w = 0)) : l.color = p.tweenColors(V(y.minColor),
V(y.maxColor), 2 > A ? .5 : s / (A - 1)))
        })
    }, initStops: function (l) { this.stops = l.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; E(this.stops, function (l) { l.color = V(l[1]) }) }, setOptions: function (l) { u.prototype.setOptions.call(this, l); this.options.crosshair = this.options.marker; this.coll = "colorAxis" }, setAxisSize: function () {
        var l = this.legendSymbol, p = this.chart, q, u, w; l && (this.left = q = l.attr("x"), this.top = u = l.attr("y"), this.width = w = l.attr("width"), this.height = l = l.attr("height"), this.right = p.chartWidth - q -
w, this.bottom = p.chartHeight - u - l, this.len = this.horiz ? w : l, this.pos = this.horiz ? q : u)
    }, toColor: function (l, p) { var q, u = this.stops, w, y = this.dataClasses, B, A; if (y) for (A = y.length; A--; ) { if (B = y[A], w = B.from, u = B.to, (void 0 === w || l >= w) && (void 0 === u || l <= u)) { q = B.color; p && (p.dataClass = A); break } } else { this.isLog && (l = this.val2lin(l)); q = 1 - (this.max - l) / (this.max - this.min || 1); for (A = u.length; A-- && !(q > u[A][0]); ); w = u[A] || u[A + 1]; u = u[A + 1] || w; q = 1 - (u[0] - q) / (u[0] - w[0] || 1); q = this.tweenColors(w.color, u.color, q) } return q }, getOffset: function () {
        var l =
this.legendGroup, p = this.chart.axisOffset[this.side]; l && (u.prototype.getOffset.call(this), this.axisGroup.parentGroup || (this.axisGroup.add(l), this.gridGroup.add(l), this.labelGroup.add(l), this.added = !0), this.chart.axisOffset[this.side] = p)
    }, setLegendColor: function () { var l, p = this.options; l = this.horiz ? [0, 0, 1, 0] : [0, 0, 0, 1]; this.legendColor = { linearGradient: { x1: l[0], y1: l[1], x2: l[2], y2: l[3] }, stops: p.stops || [[0, p.minColor], [1, p.maxColor]]} }, drawLegendSymbol: function (q, p) {
        var u = q.padding, w = q.options, y = this.horiz,
A = l(w.symbolWidth, y ? 200 : 12), B = l(w.symbolHeight, y ? 12 : 200), E = l(w.labelPadding, y ? 16 : 30), w = l(w.itemDistance, 10); this.setLegendColor(); p.legendSymbol = this.chart.renderer.rect(0, q.baseline - 11, A, B).attr({ zIndex: 1 }).add(p.legendGroup); p.legendSymbol.getBBox(); this.legendItemWidth = A + u + (y ? w : E); this.legendItemHeight = B + u + (y ? E : 0)
    }, setState: B, visible: !0, setVisible: B, getSeriesExtremes: function () { var l; this.series.length && (l = this.series[0], this.dataMin = l.valueMin, this.dataMax = l.valueMax) }, drawCrosshair: function (l,
p) { var q = !this.cross, w = p && p.plotX, y = p && p.plotY, A, B = this.pos, E = this.len; p && (A = this.toPixels(p.value), A < B ? A = B - 2 : A > B + E && (A = B + E + 2), p.plotX = A, p.plotY = this.len - A, u.prototype.drawCrosshair.call(this, l, p), p.plotX = w, p.plotY = y, !q && this.cross && this.cross.attr({ fill: this.crosshair.color }).add(this.labelGroup)) }, getPlotLinePath: function (l, p, q, w, y) {
    return y ? this.horiz ? ["M", y - 4, this.top - 6, "L", y + 4, this.top - 6, y, this.top, "Z"] : ["M", this.left, y, "L", this.left - 6, y + 6, this.left - 6, y - 6, "Z"] : u.prototype.getPlotLinePath.call(this,
l, p, q, w)
}, update: function (l, p) { E(this.series, function (l) { l.isDirtyData = !0 }); u.prototype.update.call(this, l, p); this.legendItem && (this.setLegendColor(), this.chart.legend.colorizeItem(this, !0)) }, getDataClassLegendSymbols: function () {
    var l = this, p = this.chart, q = this.legendItems, u = p.options.legend, y = u.valueDecimals, A = u.valueSuffix || "", H; q.length || E(this.dataClasses, function (u, C) {
        var L = !0, M = u.from, P = u.to; H = ""; void 0 === M ? H = "< " : void 0 === P && (H = "> "); void 0 !== M && (H += N(M, y) + A); void 0 !== M && void 0 !== P && (H += " - ");
        void 0 !== P && (H += N(P, y) + A); q.push(w({ chart: p, name: H, options: {}, drawLegendSymbol: ea.drawRectangle, visible: !0, setState: B, setVisible: function () { L = this.visible = !L; E(l.series, function (l) { E(l.points, function (l) { l.dataClass === C && l.setVisible(L) }) }); p.legend.colorizeItem(this, L) } }, u))
    }); return q
}, name: ""
    }); E(["fill", "stroke"], function (l) { HighchartsAdapter.addAnimSetter(l, function (p) { p.elem.attr(l, y.prototype.tweenColors(V(p.start), V(p.end), p.pos)) }) }); Q(A.prototype, "getAxes", function (l) {
        var p = this.options.colorAxis;
        l.call(this); this.colorAxis = []; p && new y(this, p)
    }); Q(H.prototype, "getAllItems", function (l) { var p = [], q = this.chart.colorAxis[0]; q && (q.options.dataClasses ? p = p.concat(q.getDataClassLegendSymbols()) : p.push(q), E(q.series, function (l) { l.options.showInLegend = !1 })); return p.concat(l.call(this)) }); q = { pointAttrToOptions: { stroke: "borderColor", "stroke-width": "borderWidth", fill: "color", dashstyle: "dashStyle" }, pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"], optionalAxis: "colorAxis", trackerGroups: ["group",
"markerGroup", "dataLabelsGroup"], getSymbol: B, parallelArrays: ["x", "y", "value"], colorKey: "value", translateColors: function () { var l = this, p = this.options.nullColor, q = this.colorAxis, u = this.colorKey; E(this.data, function (w) { var y = w[u]; if (y = null === y ? p : q && void 0 !== y ? q.toColor(y, w) : w.color || l.color) w.color = y }) } 
    }; Q(R.prototype, "buildText", function (l, p) { var q = p.styles && p.styles.HcTextStroke; l.call(this, p); q && p.applyTextStroke && p.applyTextStroke(q) }); R.prototype.Element.prototype.applyTextStroke = function (l) {
        var p =
this.element, q, u; l = l.split(" "); q = p.getElementsByTagName("tspan"); u = p.firstChild; this.ySetter = this.xSetter; E([].slice.call(q), function (q, w) { var y; 0 === w && (q.setAttribute("x", p.getAttribute("x")), null !== (w = p.getAttribute("y")) && q.setAttribute("y", w)); y = q.cloneNode(1); y.setAttribute("stroke", l[1]); y.setAttribute("stroke-width", l[0]); y.setAttribute("stroke-linejoin", "round"); p.insertBefore(y, u) })
    }; M.plotOptions.heatmap = W(M.plotOptions.scatter, { animation: !1, borderWidth: 0, nullColor: "#F8F8F8", dataLabels: { formatter: function () { return this.point.value },
        verticalAlign: "middle", crop: !1, overflow: !1, style: { color: "white", fontWeight: "bold", HcTextStroke: "1px rgba(0,0,0,0.5)"}
    }, marker: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" }, states: { normal: { animation: !0 }, hover: { brightness: .2}}
    }); ba.heatmap = L(ba.scatter, W(q, { type: "heatmap", pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, supportsDrilldown: !0, getExtremesFromAll: !0, init: function () {
        ba.scatter.prototype.init.apply(this, arguments); this.pointRange = this.options.colsize || 1; this.yAxis.axisPointRange =
this.options.rowsize || 1
    }, translate: function () {
        var l = this.options, p = this.xAxis, q = this.yAxis; this.generatePoints(); E(this.points, function (u) { var w = (l.colsize || 1) / 2, y = (l.rowsize || 1) / 2, A = Math.round(p.len - p.translate(u.x - w, 0, 1, 0, 1)), w = Math.round(p.len - p.translate(u.x + w, 0, 1, 0, 1)), B = Math.round(q.translate(u.y - y, 0, 1, 0, 1)), y = Math.round(q.translate(u.y + y, 0, 1, 0, 1)); u.plotX = (A + w) / 2; u.plotY = (B + y) / 2; u.shapeType = "rect"; u.shapeArgs = { x: Math.min(A, w), y: Math.min(B, y), width: Math.abs(w - A), height: Math.abs(y - B)} }); this.translateColors();
        this.chart.hasRendered && E(this.points, function (l) { l.shapeArgs.fill = l.options.color || l.color })
    }, drawPoints: ba.column.prototype.drawPoints, animate: B, getBox: B, drawLegendSymbol: ea.drawRectangle, getExtremes: function () { P.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; P.prototype.getExtremes.call(this) } 
    }))
})(Highcharts); 
