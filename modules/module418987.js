const module418987 = {

}

function generateModule() {
   
    module418987.WA_USER_JID_SUFFIX = module418987.WA_USER_DOMAIN = module418987.WA_SERVER_JID_SUFFIX = module418987.WA_NEWSLETTER_JID_DOMAIN = module418987.SURVEY_USER_JID = module418987.STATUS_JID = module418987.PSA_JID = module418987.MSGR_USER_JID_SUFFIX = module418987.MSGR_USER_DOMAIN = module418987.LID_SUFFIX = module418987.LID_DOMAIN = module418987.INTEROP_USER_JID_SUFFIX = module418987.INTEROP_DOMAIN = module418987.DEFAULT_DEVICE_ID = module418987.AUTHOR_SYSTEM = module418987.AUTHOR_ME = void 0,
    module418987.asChatJid = function(e) {
        return e === l ? null : e
    }
    ,
    module418987.asMulticastJid = function(e) {
        return null == U(e) ? e : null
    }
    ,
    module418987.asPhoneChatJid = function(e) {
        return e === l ? null : e
    }
    ,
    module418987.asStatusJid = function(e) {
        return e === l ? l : null
    }
    ,
    module418987.authorAsPhoneUserJid = function(e) {
        if (e === o || e === s)
            return null;
        if (!e.endsWith(E))
            return null;
        return e
    }
    ,
    module418987.authorAsUserJid = function(e) {
        if (e === o || e === s)
            return null;
        return e
    }
    ,
    module418987.authorToUserId = function(e, module418987) {
        return e === o || e === s ? module418987 : L(e)
    }
    ,
    module418987.createJidUtils = function(e) {
        let {platform: module418987} = e;
        const n = "msgr" === module418987 ? d : E;
        return {
            toUserJid: function(e) {
                return `${e}${n}`
            },
            getUserDomain: function() {
                return n
            },
            getGroupCallDomain: function() {
                return "@call"
            }
        }
    }
    ,
    module418987.defaultDeviceJidForUser = Q,
    module418987.defaultLidDeviceJidForLidUserJid = function(e) {
        return N(e, 0)
    }
    ,
    module418987.defaultMsgrDeviceJidForUser = function(e) {
        return `${R(e)}:0@msgr`
    }
    ,
    module418987.defaultPhoneDeviceJidForUser = function(e) {
        return `${R(e)}:0@s.whatsapp.net`
    }
    ,
    module418987.extractDeviceIDParts = D,
    module418987.extractDeviceId = w,
    module418987.extractFromJid = F,
    module418987.extractJidFromJidWithType = function(e) {
        return "phoneDevice" === e.jidType || "interopDevice" === e.jidType || "lidDevice" === e.jidType || "msgrDevice" === e.jidType ? e.deviceJid : "lidUser" === e.jidType || "interopUser" === e.jidType || "msgrUser" === e.jidType || "phoneUser" === e.jidType ? e.userJid : "group" === e.jidType ? e.groupJid : "status" === e.jidType ? e.statusJid : "call" === e.jidType ? e.callJid : "newsletter" === e.jidType ? e.newsletterJid : (e.jidType,
        e.broadcastJid)
    }
    ,
    module418987.extractPhoneUserJid = function(e) {
        return x(e)
    }
    ,
    module418987.extractUserId = L,
    module418987.extractUserJid = x,
    module418987.fullFormDeviceJidString = function(e) {
        const {user: module418987, agent: n="0", device: r="0", server: i} = B(e);
        return `${module418987}.${n}:${r}@${i}`
    }
    ,
    module418987.getGroupDomain = function() {
        return u
    }
    ,
    module418987.getMsgrUserDomain = function() {
        return d
    }
    ,
    module418987.getServerDomain = function() {
        return "@s.whatsapp.net"
    }
    ,
    module418987.getWhatsappUserDomain = function() {
        return E
    }
    ,
    module418987.groupIdFromJid = function(e) {
        if (e.endsWith(u))
            return e.slice(0, -u.length);
        throw (0,
        a.default)(`groupId called with non-group jid "${e}"`)
    }
    ,
    module418987.interpretAndValidateJid = Y,
    module418987.interpretAsDeviceId = function(e) {
        return e
    }
    ,
    module418987.interpretAsGroupJid = $,
    module418987.interpretAsNumber = function(e) {
        return e
    }
    ,
    module418987.interpretAsPhoneUserJid = function(e) {
        return e.endsWith(E) ? e : null
    }
    ,
    module418987.interpretAsUserJid = U,
    module418987.isAuthorMe = function(e) {
        return "@me" === e
    }
    ,
    module418987.isAuthorSystem = function(e) {
        return "@system" === e
    }
    ,
    module418987.isPrimaryDevice = function(e) {
        return 0 === w(e)
    }
    ,
    module418987.lidFromLidUserJid = G,
    module418987.lidOrPhoneFromUserJid = function(e) {
        if (e.endsWith(E))
            return k(e);
        if (e.endsWith(A))
            return G(e);
        throw (0,
        a.default)(`lidOrPhoneFromUserJid called with non phone or lid jid "${e}"`)
    }
    ,
    module418987.maybeSanitizeLogLineText = function(e) {
        if (!e.includes("@"))
            return e;
        return e.replace(M, V)
    }
    ,
    module418987.parseJidParts = B,
    module418987.phoneNumberFromJid = k,
    module418987.sanitizeJidForLogging = V,
    module418987.stripAgentIdFromPhoneDeviceJid = function(e) {
        const {user: module418987, device: n="0", server: r} = B(e);
        return `${module418987}:${n}@${r}`
    }
    ,
    module418987.switchOnChatJidType = z,
    module418987.switchOnJidType = function(e, module418987) {
        if (e === l)
            return module418987.status();
        return z(e, {
            interopUser: module418987.interopUser,
            phoneUser: module418987.phoneUser,
            msgrUser: module418987.msgrUser,
            lidUser: module418987.lidUser,
            group: module418987.group
        })
    }
    ,
    module418987.switchOnMsgrChatJidType = function(e, module418987) {
        if (e.endsWith(d))
            return module418987.user(e);
        if (null != $(e))
            return module418987.group(e);
        throw (0,
        a.default)(`Can not switch on chat jid ${e}`)
    }
    ,
    module418987.switchOnMulticastJidType = function(e, module418987) {
        if (e === l)
            return module418987.multicast(l);
        return q(e, {
            user: module418987.user,
            group: module418987.multicast
        })
    }
    ,
    module418987.switchOnPhoneChatJidType = q,
    module418987.switchOnPhoneJidType = function(e, module418987) {
        if (e === l)
            return module418987.status();
        return q(e, {
            user: module418987.user,
            group: module418987.group
        })
    }
    ,
    module418987.switchOnUserChatJidType = function(e, module418987) {
        return z(e, {
            lidUser: e=>module418987.user(e),
            interopUser: e=>module418987.user(e),
            msgrUser: e=>module418987.user(e),
            phoneUser: e=>module418987.user(e),
            group: e=>module418987.group(e)
        })
    }
    ,
    module418987.toBroadcastJid = function(e) {
        return `${e}@broadcast`
    }
    ,
    module418987.toDeviceJid = function(e, module418987) {
        return `${R(e)}:${module418987}${J(e)}`
    }
    ,
    module418987.toGroupJid = function(e) {
        if (e.endsWith(u))
            return e;
        return `${e}@g.us`
    }
    ,
    module418987.toLidDeviceJid = N,
    module418987.toLidUserJid = function(e) {
        return `${e}@lid`
    }
    ,
    module418987.toMsgrDeviceJid = function(e, module418987) {
        return `${R(e)}:${module418987}@msgr`
    }
    ,
    module418987.toMsgrUserJid = b,
    module418987.toNewsletterJid = function(e) {
        if (e.endsWith(S))
            return e;
        return `${e}@newsletter`
    }
    ,
    module418987.toPhoneDeviceJid = function(e, module418987) {
        return `${R(e)}:${module418987}@s.whatsapp.net`
    }
    ,
    module418987.toPhoneUserJid = function(e) {
        return `${e}@s.whatsapp.net`
    }
    ,
    module418987.unsafeCoerceToChatJid = function(e) {
        return e
    }
    ,
    module418987.unsafeCoerceToDeviceId = le,
    module418987.unsafeCoerceToDeviceJid = X,
    module418987.unsafeCoerceToGroupJid = se,
    module418987.unsafeCoerceToInteropDeviceJid = te,
    module418987.unsafeCoerceToInteropUserJid = ae,
    module418987.unsafeCoerceToLidDeviceJid = ne,
    module418987.unsafeCoerceToMsgrDeviceJid = ee,
    module418987.unsafeCoerceToMsgrUserJid = oe,
    module418987.unsafeCoerceToNewsletterJid = function(e) {
        return e
    }
    ,
    module418987.unsafeCoerceToPhoneDeviceJid = Z,
    module418987.unsafeCoerceToPhoneUserJid = ie,
    module418987.unsafeCoerceToUserJid = re,
    module418987.userIdFromJid = R,
    module418987.validateBroadcastJid = W,
    module418987.validateCallJid = function(e) {
        return P.test(e) ? e : null
    }
    ,
    module418987.validateChatJid = function(e) {
        return K(e) || H(e)
    }
    ,
    module418987.validateDeviceJid = function(e) {
        if (module418987.test(e) || g.test(e) || _.test(e) || C.test(e))
            return e;
        if (v.test(e))
            return Q(e);
        return null
    }
    ,
    module418987.validateDomainJid = function(e) {
        return "s.whatsapp.net" === e || "g.us" === e ? e : null
    }
    ,
    module418987.validateGroupJid = H,
    module418987.validateMulticastJid = function(e) {
        return j(e) || H(e) || W(e) ? e : null
    }
    ,
    module418987.validateNewsletterJid = function(e) {
        return y.test(e) ? e : null
    }
    ,
    module418987.validateStatusJid = j,
    module418987.validateUserJid = K;
    var i = r(n(367420))
      , a = r(n(415227));
    module418987.DEFAULT_DEVICE_ID = 0;
    const o = "@me";
    module418987.AUTHOR_ME = o;
    const s = "@system";
    module418987.AUTHOR_SYSTEM = s;
    const l = "status@broadcast";
    module418987.STATUS_JID = l;
    module418987.PSA_JID = "0@s.whatsapp.net";
    const u = "@g.us"
      , c = /^([1-9][0-9]{0,19}|(?!10)[1-9][0-9]{4,19}-[1-9][0-9]{9})@g.us$/
      , d = "@msgr";
    module418987.MSGR_USER_DOMAIN = d;
    module418987.MSGR_USER_JID_SUFFIX = "msgr";
    const p = "@interop";
    module418987.INTEROP_DOMAIN = p;
    module418987.INTEROP_USER_JID_SUFFIX = "interop";
    const _ = /^([1-9][0-9]{0,2}-[1-9][0-9]{0,14}(:[0])?)@interop$/
      , f = /^([1-9][0-9]{0,2}-[1-9][0-9]{0,14}(:[0])?)@interop$/
      , g = /^([1-9][0-9]{0,19}(:[1-9][0-9]{0,2})?)@msgr$/
      , h = /^([1-9][0-9]{0,19})@msgr$/
      , m = /^([1-9][0-9]{0,19})(:0)?@msgr$/;
    module418987.WA_SERVER_JID_SUFFIX = "s.whatsapp.net";
    const E = "@s.whatsapp.net";
    module418987.WA_USER_DOMAIN = E;
    module418987.WA_USER_JID_SUFFIX = "s.whatsapp.net";
    const S = "@newsletter";
    module418987.WA_NEWSLETTER_JID_DOMAIN = S;
    const y = /^([1-9][0-9]{0,19})@newsletter$/
      , module418987 = /^(0|((?!10)[1-9][0-9]{4,19}(\.[0-9]{1,2})?(:[0-9]{1,2})))@s.whatsapp.net$/
      , v = /^(0|((?!10)[1-9][0-9]{4,19})(\.[0-9]{1,2})?)@s.whatsapp.net$/
      , A = "@lid";
    module418987.LID_DOMAIN = A;
    module418987.LID_SUFFIX = "lid";
    const I = /^([1-9][0-9]{0,14})@lid$/
      , C = /^([1-9][0-9]{0,14}(:[0-9]{1,2})?)@lid$/
      , O = /^(status|location|[1-9][0-9]{0,19})@broadcast$/
      , P = /^([0-9a-fA-F]{18,32})@call$/;
    module418987.SURVEY_USER_JID = "16505361212@s.whatsapp.net";
    const M = /([0-9a-zA-Z-:]+)@(g\.us|call|s\.whatsapp\.net|broadcast|msgr|lid)/g;
    function b(e) {
        return `${e}@msgr`
    }
    function R(e) {
        if (e.endsWith(E))
            return e.slice(0, -E.length);
        if (e.endsWith(d))
            return e.slice(0, -d.length);
        if (e.endsWith(p))
            return e.slice(0, -p.length);
        if (e.endsWith(A))
            return e.slice(0, -A.length);
        throw (0,
        a.default)(`userIdFromJid called with non-user jid "${e}"`)
    }
    function N(e, module418987) {
        return `${G(e)}:${module418987}@lid`
    }
    function L(e) {
        return e.split("@")[0]
    }
    function D(e) {
        const module418987 = e.split("@")[0].split(":")
          , n = module418987[0]
          , r = module418987[1];
        return {
            userId: n,
            deviceID: parseInt(r, 10)
        }
    }
    function w(e) {
        return D(e).deviceID
    }
    function k(e) {
        if (!e.endsWith(E))
            throw (0,
            a.default)(`phoneNumberFromJid called with non-user jid "${e}"`);
        return e.slice(0, -E.length)
    }
    function U(e) {
        return e.endsWith(E) || e.endsWith(p) || e.endsWith(d) || e.endsWith(A) ? e : null
    }
    function G(e) {
        if (!e.endsWith(A))
            throw (0,
            a.default)(`lidFromLidUserJid called with non-LidUserJid "${e}"`);
        return e.slice(0, -A.length)
    }
    function x(e) {
        const module418987 = e.split("@");
        let n = module418987[0];
        const r = module418987[1];
        return n = n.split(":")[0],
        n = n.split(".")[0],
        `${n}@${r}`
    }
    function B(e) {
        const [module418987,n] = e.split("@")
          , [r,i] = module418987.split(":")
          , [a,o] = r.split(".");
        return {
            user: a,
            device: i,
            agent: o,
            server: n
        }
    }
    function F(e) {
        switch (e.jidType) {
        case "interopUser":
        case "lidUser":
        case "msgrUser":
        case "phoneUser":
            return e.userJid;
        case "group":
            return e.groupJid;
        case "status":
            return e.statusJid;
        case "interopDevice":
        case "lidDevice":
        case "msgrDevice":
        case "phoneDevice":
            return e.deviceJid;
        case "broadcast":
            return e.broadcastJid;
        case "call":
            return e.callJid;
        case "newsletter":
            return e.newsletterJid;
        default:
            return (0,
            i.default)(e.jidType)
        }
    }
    function Y(e) {
        if (e === l)
            return {
                jidType: "status",
                statusJid: l
            };
        if (v.test(e))
            return {
                jidType: "phoneUser",
                userJid: e
            };
        if (f.test(e))
            return {
                jidType: "interopUser",
                userJid: e
            };
        if (h.test(e))
            return {
                jidType: "msgrUser",
                userJid: e
            };
        if (m.test(e)) {
            return {
                jidType: "msgrUser",
                userJid: b(e.substr(0, e.indexOf(":")))
            }
        }
        return module418987.test(e) ? {
            jidType: "phoneDevice",
            deviceJid: e
        } : _.test(e) ? {
            jidType: "interopDevice",
            deviceJid: e
        } : g.test(e) ? {
            jidType: "msgrDevice",
            deviceJid: e
        } : c.test(e) ? {
            jidType: "group",
            groupJid: e.endsWith(u) ? e : `${e}@g.us`
        } : O.test(e) ? {
            jidType: "broadcast",
            broadcastJid: e
        } : P.test(e) ? {
            jidType: "call",
            callJid: e
        } : I.test(e) ? {
            jidType: "lidUser",
            userJid: e
        } : C.test(e) ? {
            jidType: "lidDevice",
            deviceJid: e
        } : y.test(e) ? {
            jidType: "newsletter",
            newsletterJid: e
        } : {
            jidType: "unknown"
        }
    }
    function j(e) {
        return "status@broadcast" === e ? e : null
    }
    function K(e) {
        if (v.test(e) || f.test(e) || h.test(e) || I.test(e))
            return e;
        if (m.test(e)) {
            return b(e.substr(0, e.indexOf(":")))
        }
        return null
    }
    function W(e) {
        return O.test(e) ? e : null
    }
    function H(e) {
        return c.test(e) ? e : null
    }
    function V(e) {
        const module418987 = Y(e);
        return "unknown" === module418987.jidType ? e : "status" === module418987.jidType ? module418987.statusJid : (module418987.jidType,
        F(module418987).replace(/^([^@]*)([^@][^@][^@][^@])@(.*)$/, "...$2@$3"))
    }
    function $(e) {
        return e.endsWith(u) ? e : null
    }
    function z(e, module418987) {
        if (e.endsWith(E))
            return module418987.phoneUser(e);
        if (e.endsWith(d))
            return module418987.msgrUser(e);
        if (e.endsWith(p))
            return module418987.interopUser(e);
        if (e.endsWith(A))
            return module418987.lidUser(e);
        if (null != $(e))
            return module418987.group(e);
        throw (0,
        a.default)(`Can not switch on chat jid ${e}`)
    }
    function q(e, module418987) {
        if (e.endsWith(E))
            return module418987.user(e);
        if (null != $(e))
            return module418987.group(e);
        throw (0,
        a.default)(`Can not switch on chat jid ${e}`)
    }
    function J(e) {
        if (e.endsWith(E))
            return E;
        if (e.endsWith(d))
            return d;
        if (e.endsWith(A))
            return A;
        throw (0,
        a.default)(`userDomainFromJid called with non-user jid "${e}"`)
    }
    function Q(e) {
        return `${R(e)}:0${J(e)}`
    }
    function X(e) {
        return e
    }
    function Z(e) {
        return e
    }
    function ee(e) {
        return e
    }
    function te(e) {
        return e
    }
    function ne(e) {
        return e
    }
    function re(e) {
        return e
    }
    function ie(e) {
        return e
    }
    function ae(e) {
        return e
    }
    function oe(e) {
        return e
    }
    function se(e) {
        return e
    }
    function le(e) {
        return e
    }
}

generateModule();
export default module418987;