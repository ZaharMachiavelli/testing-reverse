export default _module323389 = {
    Domains: undefined,
    validateAndGetParts: validateAndGetParts,
    validateWid: validateWid,
}


function validateAndGetParts(e) {
    if (null == e)
        return null;
    const t = e.match(/(.*)@(.*)/);
    if (null == t)
        return "call" === e || "s.whatsapp.net" === e ? {
            serverPart: e
        } : null;
    const n = t[1]
      , i = r.cast(t[2]);
    if (null == i)
        return __LOG__(3)`validateAndGetParts: Domain not supported`,
        null;
    const a = n.match(d[t[2]]);
    if (!a)
        return null;
    switch (i) {
    case r.BROADCAST:
        return {
            serverPart: r.BROADCAST,
            userPart: a[1]
        };
    case r.CALL:
        return {
            serverPart: r.CALL,
            userPart: a[1]
        };
    case r.G_US:
        return {
            serverPart: r.G_US,
            userPart: a[1]
        };
    case r.NEWSLETTER:
        return {
            serverPart: r.NEWSLETTER,
            userPart: a[1]
        };
    case r.C_US:
        return {
            serverPart: r.C_US,
            userPart: a[1],
            devicePart: a[3]
        };
    case r.S_WHATSAPP_NET:
        return {
            serverPart: r.S_WHATSAPP_NET,
            userPart: a[1],
            devicePart: a[3]
        };
    case r.LID:
        return {
            serverPart: r.LID,
            userPart: a[1],
            devicePart: a[3]
        };
    case r.MSGR:
        return {
            serverPart: r.LID,
            userPart: a[1],
            devicePart: a[2]
        }
    }
    return null
}

function validateWid(e) {
    if (null == e)
            return !1;
        const t = e.match(/(.*)@(.*)/);
        if (null == t)
            return "call" === e || "s.whatsapp.net" === e;
        const n = t[1]
          , r = t[2];
        if (null == d[r])
            return !1;
        return d[r].test(n)
}


// 323389:  (e,t,n)=>{
//     "use strict";
//     Object.defineProperty(t, "__esModule", {
//         value: !0
//     }),
//     t.Domains = void 0,
//     t.validateAndGetParts = function(e) {
//         if (null == e)
//             return null;
//         const t = e.match(/(.*)@(.*)/);
//         if (null == t)
//             return "call" === e || "s.whatsapp.net" === e ? {
//                 serverPart: e
//             } : null;
//         const n = t[1]
//           , i = r.cast(t[2]);
//         if (null == i)
//             return __LOG__(3)`validateAndGetParts: Domain not supported`,
//             null;
//         const a = n.match(d[t[2]]);
//         if (!a)
//             return null;
//         switch (i) {
//         case r.BROADCAST:
//             return {
//                 serverPart: r.BROADCAST,
//                 userPart: a[1]
//             };
//         case r.CALL:
//             return {
//                 serverPart: r.CALL,
//                 userPart: a[1]
//             };
//         case r.G_US:
//             return {
//                 serverPart: r.G_US,
//                 userPart: a[1]
//             };
//         case r.NEWSLETTER:
//             return {
//                 serverPart: r.NEWSLETTER,
//                 userPart: a[1]
//             };
//         case r.C_US:
//             return {
//                 serverPart: r.C_US,
//                 userPart: a[1],
//                 devicePart: a[3]
//             };
//         case r.S_WHATSAPP_NET:
//             return {
//                 serverPart: r.S_WHATSAPP_NET,
//                 userPart: a[1],
//                 devicePart: a[3]
//             };
//         case r.LID:
//             return {
//                 serverPart: r.LID,
//                 userPart: a[1],
//                 devicePart: a[3]
//             };
//         case r.MSGR:
//             return {
//                 serverPart: r.LID,
//                 userPart: a[1],
//                 devicePart: a[2]
//             }
//         }
//         return null
//     }
//     ,
//     t.validateWid = function(e) {
//         if (null == e)
//             return !1;
//         const t = e.match(/(.*)@(.*)/);
//         if (null == t)
//             return "call" === e || "s.whatsapp.net" === e;
//         const n = t[1]
//           , r = t[2];
//         if (null == d[r])
//             return !1;
//         return d[r].test(n)
//     }
//     ;
//     const r = n(76672)({
//         BROADCAST: "broadcast",
//         CALL: "call",
//         C_US: "c.us",
//         G_US: "g.us",
//         LID: "lid",
//         MSGR: "msgr",
//         S_WHATSAPP_NET: "s.whatsapp.net",
//         NEWSLETTER: "newsletter"
//     });
//     t.Domains = r;
//     const i = /[0-9]{1,2}/
//       , a = /0/
//       , o = /[1-9][0-9]{0,19}/
//       , s = /(?!10)[1-9][0-9]{4,19}/
//       , l = new RegExp(`^(${s.source}[-]${/[1-9][0-9]{9}/.source}$|^${o.source})$`)
//       , u = new RegExp(`^(${o.source}$|${["status", "location", "chat"].map((e=>"^" + e + "$")).join("|")})`,"i")
//       , c = new RegExp(`^(0$|^${s.source})([.]${a.source})?(?:[:](${i.source}))?$`)
//       , d = {
//         broadcast: u,
//         call: /^([0-9a-f]{18,32})$/i,
//         "c.us": c,
//         "g.us": l,
//         lid: new RegExp(`^(${/[1-9][0-9]{0,14}/.source})([.]${a.source})?(?:[:](${i.source}))?$`),
//         msgr: new RegExp(`^(${o.source})(?:[:](${/[1-9][0-9]{0,2}/.source}))?$`),
//         "s.whatsapp.net": c,
//         newsletter: new RegExp(`^(${o.source})$`)
//     }
// }