export default function(e,) {
    const t = (0,
    r.getABPropConfigValue)("in_app_support_v2_number_prefixes");
    if (null == t || "" === t)
        return !1;
    return t.split(",").some((t=>e.startsWith(t)))
}