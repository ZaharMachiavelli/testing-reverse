import _module595318 from "./modules/module595318";
import _module323389 from "./modules/module323389";
import _module418987 from "./modules/module418987";
import _module724976 from "./modules/module724976";

// <==== UTILS ====>

// добавим тайпгуард, чтобы точнее указать тип аргумента функции
function eIsString(param: string | Wid): param is string {
    return m724976.isString(param);
}

// <==== ENDUTILS ====>

//  <==== MODULES ====>
type Module323389 = {
    Domains: undefined; // void 0
    validateAndGetParts: (
        firstParameter: any
    ) => { serverPart: string; userPart?: string; devicePart?: string } | null;
    validateWid: (firstParameter: any) => boolean;
};

type Module595318<T> = (firstParameter: T) => T;

type Module724976 = {
    isBoolean(firstParameter: any): boolean;
    isFunction(firstParameter: any): boolean;
    isNumber(firstParameter: any): boolean;
    isString(firstParameter: any): boolean;
};

// там куча полей, вынес сюда только нужные для работы в этом модуле
type Module418987 = {
    WA_USER_JID_SUFFIX: undefined | string;
    STATUS_JID: undefined | string;
};

// <==== ENDMODULES ====>

type UsingPrivateConstructor = {
    [key: string]: any;
    intentionallyUsePrivateConstructor: any;
};

type ToStringType = {
    forLog?: boolean;
    legacy?: boolean;
    formatFull?: any;
    [key: string]: any;
};

const officialBizAccount = "16505361212@c.us",
    widNames = ["name", "short", "notify"];

const m323389 = _module323389 as Module323389;
const m418987 = _module418987 as Module418987;
const m724976 = _module724976 as Module724976;

export default class Wid {
    server: string;
    user: string;
    device: number;
    private _serialized?: any; //так и не понял, какой тип имеет

    constructor(
        firstParameter: any,
        usingPrivateConstructor: UsingPrivateConstructor
    ) {
        const { intentionallyUsePrivateConstructor: privateConstructor } =
            usingPrivateConstructor;
        if (!privateConstructor)
            throw new Error(
                "You should use WidFactory.createWid() instead of the Wid constructor. If you absolutely must use the constructor, pass {intentionallyUsePrivateConstructor: true} as a second parameter."
            );

        const validatedParts = m323389.validateAndGetParts(firstParameter);
        if (validatedParts == null) throw new Error("wid error: invalid wid");

        const configList: (string | number)[] = [];
        let { serverPart, userPart, devicePart } = validatedParts;
        serverPart = serverPart.toLowerCase();
        let serverConfig: string =
            serverPart == "s.whatsapp.net" ? "c.us" : serverPart;
        this.server = serverConfig;
        if (null == userPart)
            throw new Error(
                "wid error: wid represents server and should not be used"
            );
        this.user = userPart;
        configList.push(this.user);
        // devicePart, как я понял, может и не быть в объекте, поэтому просто проверка на null не подходит - лучше на "истинность"
        if (devicePart) {
            if (["c.us", "lid"].some((conf: string) => conf != this.server))
                throw new Error(
                    "wid error: wrong server for wid with device present"
                );
            const deviceInt = parseInt(devicePart, 10);
            if (deviceInt) {
                configList.push(":");
                configList.push(deviceInt);
                this.device = deviceInt;
            }
            // вариант сверху просто привычнее
            // deviceInt && (configList.push(":"), configList.push(deviceInt), (this.device = t));
        }
    }

    getUserPartForLog(): string {
        if (this.isGroup()) {
            const nameData = this.user.split("-");
            if (2 === nameData.length) {
                const [t, n] = nameData;
                return `${t.slice(-4)}-${n}`;
            }
        }
        return this.user.slice(-4);
    }

    toString(firstParameter?: ToStringType) {
        if (firstParameter) {
            let firstConfig: string = "",
                secondConfig: string = "";
            const domain =
                firstParameter.legacy && "c.us" === this.server
                    ? "s.whatsapp.net"
                    : this.server;
            firstParameter.formatFull
                ? ((secondConfig = `:${this.device || 0}`),
                  (firstConfig = ".0"))
                : (secondConfig =
                      null != this.device && 0 !== this.device
                          ? `:${this.device}`
                          : "");
            const i = firstParameter.forLog
                ? this.getUserPartForLog()
                : this.user;
            if (
                firstParameter.formatFull ||
                (firstParameter.legacy && "c.us" === this.server) ||
                firstParameter.forLog
            )
                return [i, firstConfig, secondConfig, "@", domain].join("");
        }
        return this._serialized;
    }
    toLogString(): string {
        // return this.toString({
        //     forLog: !0,
        //     legacy: !1,
        // });
        return this.toString({
            forLog: true, //!0 = true
            legacy: false, //!1 = false
        });
    }
    toJid(): string {
        return this.toString({
            legacy: true,
        });
    }
    getJidServer(): string {
        return "c.us" === this.server
            ? m418987.WA_USER_JID_SUFFIX || ""
            : this.server;
    }

    getSignalAddress(): string {
        const deviceSetting =
                null != this.device && 0 !== this.device
                    ? `:${this.device}`
                    : "",
            lidConfig = this.isLid() ? "@lid" : "";
        return [this.user, deviceSetting, lidConfig].join("");
    }
    getDeviceId(): number {
        const firstParameter = this.device;
        return null == this.device ? 0 : this.device;
    }

    equals(elem: any): boolean {
        return elem instanceof Wid && this.toString() === elem.toString();
    }
    isLessThan(elem: any): boolean {
        return elem instanceof Wid && this.toString() < elem.toString();
    }
    isGreaterThan(elem: any): boolean {
        return elem instanceof Wid && this.toString() > elem.toString();
    }
    isUser(): boolean {
        return "c.us" === this.server || "lid" === this.server;
    }
    isLid(): boolean {
        return "lid" === this.server;
    }
    isUserNotPSA(): boolean {
        return this.isUser() && !this.isPSA();
    }
    isBroadcast(): boolean {
        return "broadcast" === this.server;
    }
    isOfficialBizAccount(): boolean {
        return this.toString() === officialBizAccount;
    }
    isEligibleForUSync(): boolean {
        return this.isUser() && !this.isPSA();
    }
    isGroup(): boolean {
        return "g.us" === this.server;
    }
    isGroupCall(): boolean {
        return "call" === this.server;
    }
    isServer(): boolean {
        return "server" === this.user.toLowerCase() && "c.us" === this.server;
    }
    isPSA(): boolean {
        return "0" === this.user && "c.us" === this.server;
    }
    isIAS(): boolean {
        return "16508638904" === this.user && "c.us" === this.server;
    }
    isStatusV3(): boolean {
        return (
            "status" === this.user.toLowerCase() && "broadcast" === this.server
        );
    }
    // isSupportAccount() {
    //     return (0, o.default)(this.user);
    // }
    isNewsletter(): boolean {
        return "newsletter" === this.server;
    }
    toJSON() {
        return this.toString();
    }
    static isXWid(firstParameter: string, secondParameter: any): boolean {
        return m724976.isString(secondParameter)
            ? secondParameter.split("@")[1] === firstParameter
            : secondParameter instanceof Wid
            ? secondParameter.server === firstParameter
            : false;
    }
    static isUser(e: any): boolean {
        return Wid.isXWid("c.us", e) || Wid.isXWid("lid", e);
    }
    static isLid(e: any): boolean {
        return Wid.isXWid("lid", e);
    }
    static isBroadcast(e: any): boolean {
        return Wid.isXWid("broadcast", e);
    }

    static isGroup(e: any): boolean {
        return Wid.isXWid("g.us", e);
    }
    static isNewsletter(e: any): boolean {
        return Wid.isXWid("newsletter", e);
    }
    static isGroupCall(e: any): boolean {
        return Wid.isXWid("call", e);
    }
    static isWid(e: any): boolean {
        return m724976.isString(e) ? m323389.validateWid(e) : e instanceof Wid;
    }
    static canBeWid(e: string): boolean {
        return !e || !widNames.includes(e);
    }
    static isServer(e: string | Wid): boolean {
        if (eIsString(e)) return "server@c.us" === e.toLowerCase();
        return e.isServer();
    }
    static isPSA(e: string | Wid): boolean {
        if (eIsString(e)) return "0@c.us" === e.toLowerCase();
        return e.isPSA();
    }

    static isIAS(e: string | Wid): boolean {
        if (eIsString(e)) return "16508638904@c.us" === e.toLowerCase();
        return e.isIAS();
    }
    static isStatusV3(e: string | Wid): boolean {
        if (eIsString(e)) return m418987.STATUS_JID === e.toLowerCase();
        return e.isStatusV3();
    }
    // static isSupportAccount(e) {
    //     return (0, a.isString)(e)
    //         ? (0, o.default)(e.split("@")[0])
    //         : e instanceof c && e.isSupportAccount();
    // }
    static isOfficialBizAccount(e: string | Wid): boolean {
        if (eIsString(e)) return officialBizAccount === e.toLowerCase();
        return e.isOfficialBizAccount();
    }
    static isEligibleForUSync(e: any): boolean {
        return this.isUser(e) && !this.isPSA(e);
    }
    static user(e: any): string | undefined {
        return m724976.isString(e)
            ? e.split("@")[0]
            : e instanceof Wid
            ? e.user
            : undefined;
    }
    static equals(first: any, second: any): boolean {
        return first instanceof Wid || second instanceof Wid
            ? first instanceof Wid && first.equals(second)
            : first === second;
    }
    static isLessThan(first: any, second: any): boolean {
        return (
            first instanceof Wid &&
            second instanceof Wid &&
            first.toString() < second.toString()
        );
    }
    static isGreaterThan(first: any, second: any): boolean {
        return (
            first instanceof Wid &&
            second instanceof Wid &&
            first.toString() > second.toString()
        );
    }
}
