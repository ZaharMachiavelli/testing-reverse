(e, t, n) => {
    "use strict";
    var r = n(595318);
    Object.defineProperty(t, "__esModule", {
        value: !0,
    }),
        (t.default = void 0);
    var i = n(418987),
        a = n(724976),
        o = r(n(143589)),
        s = n(323389);
    const l = "16505361212@c.us",
        u = ["name", "short", "notify"];
    class c {
        constructor(e, t) {
            let { intentionallyUsePrivateConstructor: n } = t;
            if (!n)
                throw new Error(
                    "You should use WidFactory.createWid() instead of the Wid constructor. If you absolutely must use the constructor, pass {intentionallyUsePrivateConstructor: true} as a second parameter."
                );
            const r = (0, s.validateAndGetParts)(e);
            if (null == r)
                throw (
                    (__LOG__(2)`Invalid wid: ${e}`,
                    new Error("wid error: invalid wid"))
                );
            const i = [],
                a = r.userPart,
                o = r.devicePart,
                l = r.serverPart.toLowerCase();
            let serverConfig;
            switch (l) {
                case "s.whatsapp.net":
                    serverConfig = "c.us";
                    break;
                default:
                    serverConfig = l;
            }
            if (((this.server = serverConfig), null == a))
                throw (
                    (__LOG__(
                        2
                    )`wid represents server and should not be used: ${e}`,
                    new Error(
                        "wid error: wid represents server and should not be used"
                    ))
                );
            if (((this.user = a), i.push(this.user), null != o)) {
                if ("c.us" !== this.server && "lid" !== this.server)
                    throw (
                        (__LOG__(
                            2
                        )`wrong server for wid with device present: ${e}`,
                        new Error(
                            "wid error: wrong server for wid with device present"
                        ))
                    );
                const t = parseInt(o, 10);
                t && (i.push(":"), i.push(t), (this.device = t));
            }
            i.push("@"),
                i.push(this.server),
                (this._serialized = i.join(""));
        }
        getUserPartForLog() {
            if (this.isGroup()) {
                const e = this.user.split("-");
                if (2 === e.length) {
                    const [t, n] = e;
                    return `${t.slice(-4)}-${n}`;
                }
            }
            return this.user.slice(-4);
        }
        toString(e) {
            if (e) {
                let t, n;
                const r =
                    e.legacy && "c.us" === this.server
                        ? "s.whatsapp.net"
                        : this.server;
                e.formatFull
                    ? ((n = `:${this.device || 0}`), (t = ".0"))
                    : (n =
                          null != this.device && 0 !== this.device
                              ? `:${this.device}`
                              : "");
                const i = e.forLog
                    ? this.getUserPartForLog()
                    : this.user;
                if (
                    e.formatFull ||
                    (e.legacy && "c.us" === this.server) ||
                    e.forLog
                )
                    return [i, t, n, "@", r].join("");
            }
            return this._serialized;
        }
        toLogString() {
            return this.toString({
                forLog: !0,
                legacy: !1,
            });
        }
        toJid() {
            return this.toString({
                legacy: !0,
            });
        }
        getJidServer() {
            return "c.us" === this.server
                ? i.WA_USER_JID_SUFFIX
                : this.server;
        }
        getSignalAddress() {
            const e =
                    null != this.device && 0 !== this.device
                        ? `:${this.device}`
                        : "",
                t = this.isLid() ? "@lid" : "";
            return [this.user, e, t].join("");
        }
        getDeviceId() {
            const e = this.device;
            return null == e ? 0 : e;
        }
        equals(e) {
            return e instanceof c && this.toString() === e.toString();
        }
        isLessThan(e) {
            return e instanceof c && this.toString() < e.toString();
        }
        isGreaterThan(e) {
            return e instanceof c && this.toString() > e.toString();
        }
        isCompanion() {
            return (
                null != this.device &&
                this.device !== i.DEFAULT_DEVICE_ID
            );
        }
        isSameAccount(e) {
            return this.server === e.server && this.user === e.user;
        }
        isUser() {
            return "c.us" === this.server || "lid" === this.server;
        }
        isLid() {
            return "lid" === this.server;
        }
        isUserNotPSA() {
            return this.isUser() && !this.isPSA();
        }
        isBroadcast() {
            return "broadcast" === this.server;
        }
        isOfficialBizAccount() {
            return this.toString() === l;
        }
        isEligibleForUSync() {
            return this.isUser() && !this.isPSA();
        }
        isGroup() {
            return "g.us" === this.server;
        }
        isGroupCall() {
            return "call" === this.server;
        }
        isServer() {
            return (
                "server" === this.user.toLowerCase() &&
                "c.us" === this.server
            );
        }
        isPSA() {
            return "0" === this.user && "c.us" === this.server;
        }
        isIAS() {
            return (
                "16508638904" === this.user && "c.us" === this.server
            );
        }
        isStatusV3() {
            return (
                "status" === this.user.toLowerCase() &&
                "broadcast" === this.server
            );
        }
        isSupportAccount() {
            return (0, o.default)(this.user);
        }
        isNewsletter() {
            return "newsletter" === this.server;
        }
        toJSON() {
            return this.toString();
        }
        static isXWid(e, t) {
            return (0, a.isString)(t)
                ? t.split("@")[1] === e
                : t instanceof c
                ? t.server === e
                : (void 0 !== t &&
                      __LOG__(
                          2
                      )`wid:isXWid called on nonstring: + ${String(t)}`,
                  !1);
        }
        static isUser(e) {
            return c.isXWid("c.us", e) || c.isXWid("lid", e);
        }
        static isLid(e) {
            return c.isXWid("lid", e);
        }
        static isBroadcast(e) {
            return c.isXWid("broadcast", e);
        }
        static isGroup(e) {
            return c.isXWid("g.us", e);
        }
        static isNewsletter(e) {
            return c.isXWid("newsletter", e);
        }
        static isGroupCall(e) {
            return c.isXWid("call", e);
        }
        static isWid(e) {
            return (0, a.isString)(e)
                ? (0, s.validateWid)(e)
                : e instanceof c;
        }
        static canBeWid(e) {
            return !e || !u.includes(e);
        }
        static isServer(e) {
            return (0, a.isString)(e)
                ? "server@c.us" === e.toLowerCase()
                : e instanceof c && e.isServer();
        }
        static isPSA(e) {
            return (0, a.isString)(e)
                ? "0@c.us" === e.toLowerCase()
                : e instanceof c && e.isPSA();
        }
        static isIAS(e) {
            return (0, a.isString)(e)
                ? "16508638904@c.us" === e.toLowerCase()
                : e instanceof c && e.isIAS();
        }
        static isStatusV3(e) {
            return (0, a.isString)(e)
                ? e.toLowerCase() === i.STATUS_JID
                : e instanceof c && e.isStatusV3();
        }
        static isSupportAccount(e) {
            return (0, a.isString)(e)
                ? (0, o.default)(e.split("@")[0])
                : e instanceof c && e.isSupportAccount();
        }
        static isOfficialBizAccount(e) {
            return (0, a.isString)(e)
                ? e.toLowerCase() === l
                : e instanceof c && e.isOfficialBizAccount();
        }
        static isEligibleForUSync(e) {
            return this.isUser(e) && !this.isPSA(e);
        }
        static user(e) {
            return (0, a.isString)(e)
                ? e.split("@")[0]
                : e instanceof c
                ? e.user
                : void 0;
        }
        static equals(e, t) {
            return e instanceof c || t instanceof c
                ? e instanceof c && e.equals(t)
                : e === t;
        }
        static isLessThan(e, t) {
            return (
                e instanceof c &&
                t instanceof c &&
                e.toString() < t.toString()
            );
        }
        static isGreaterThan(e, t) {
            return (
                e instanceof c &&
                t instanceof c &&
                e.toString() > t.toString()
            );
        }
    }
    t.default = c;
};
