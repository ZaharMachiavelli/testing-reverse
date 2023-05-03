import _module595318 from "./modules/module595318";
import _module323389 from "./modules/module323389";
import _module418987 from "./modules/module418987";
import _module724976 from "./modules/module724976";

// <==== UTILS ====>

// добавим тайпгуард, чтобы точнее указать тип аргумента функции
// typescript позволяет создавать утверждающие функции
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
function eIsString(param: unknown): param is string {
    return m724976.isString(param);
}

// <==== ENDUTILS ====>

// Можно было не отделять .js от .ts и сделать модули сразу файлами .ts
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
    isString(firstParameter: any): firstParameter is string;
};

// там куча полей, вынес сюда только нужные для работы в этом модуле
type Module418987 = {
    WA_USER_JID_SUFFIX?: string;
    STATUS_JID?: string;
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


//многие аргументы статичных методов имели тип any, порой его лучше избегать, особенно если метод гарантирует проверку типа внутри себя
export default class Wid {
    public server: string;
    public user: string;
    public device: number;

    // Ответ на вопрос о типе данных в конце конструктора класса
    private _serialized: string; //так и не понял, какой тип имеет

    public constructor(
        firstParameter: any,
        usingPrivateConstructor: UsingPrivateConstructor
    ) {
        const { intentionallyUsePrivateConstructor: privateConstructor } =
            usingPrivateConstructor;

        if (!privateConstructor) {
            throw new Error(
                "You should use WidFactory.createWid() instead of the Wid constructor. If you absolutely must use the constructor, pass {intentionallyUsePrivateConstructor: true} as a second parameter."
            );
        }

        const validatedParts = m323389.validateAndGetParts(firstParameter);

        if (validatedParts == null) {
            throw new Error("wid error: invalid wid");
        }

        const configList: (string | number)[] = [];
    
        let { serverPart, userPart, devicePart } = validatedParts;
        serverPart = serverPart.toLowerCase();

        let serverConfig: string =
            serverPart == "s.whatsapp.net" ? "c.us" : serverPart;

        this.server = serverConfig;

        if (null == userPart) {
            throw new Error(
                "wid error: wid represents server and should not be used"
            );
        }

        this.user = userPart;
        configList.push(this.user);
        // devicePart, как я понял, может и не быть в объекте, поэтому просто проверка на null не подходит - лучше на "истинность"

        // devicePart == null является корректным решением т.к. JavaScript будет по разному воспринимать двойное и тройное сравнение:
        // undefined == null is true
        // undefined === null is false
        // https://dorey.github.io/JavaScript-Equality-Table/
        if (devicePart) {
            if (["c.us", "lid"].some((conf: string) => conf != this.server)) {
                throw new Error(
                    "wid error: wrong server for wid with device present"
                );
            }

            const deviceInt = parseInt(devicePart, 10);

            if (deviceInt) {
                configList.push(":");
                configList.push(deviceInt);
                this.device = deviceInt;
            }
            // вариант сверху просто привычнее
            // тут все правильно сделал, короткие варианты сложно воспринимать и читать, их всегда сводим к более стандартному виду
            // deviceInt && (configList.push(":"), configList.push(deviceInt), (this.device = t));
        }

        // Упустил три строчки кода
        // i.push("@"),
        // i.push(this.server),
        // this._serialized = i.join("")

        // Отсюда же можно было вывести тип данных для  this._serialized + дать корректное название для configList (configList это serialized)
        // configList.push("@");
        // configList.push(this.server);
        // this._serialized = configList.join("");
    }

    public getUserPartForLog(): string {
        if (this.isGroup()) {
            const nameData = this.user.split("-");

            if (2 === nameData.length) {
                const [t, n] = nameData;
                return `${t.slice(-4)}-${n}`;
            }
        }

        return this.user.slice(-4);
    }

    public toString(firstParameter?: ToStringType): string {
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
            ) {
                return [i, firstConfig, secondConfig, "@", domain].join("");
            }
        }

        return this._serialized;
    }

    public toLogString(): string {
        // return this.toString({
        //     forLog: !0,
        //     legacy: !1,
        // });
        return this.toString({
            forLog: true, //!0 = true
            legacy: false, //!1 = false
        });
    }

    public toJid(): string {
        return this.toString({
            legacy: true,
        });
    }

    public getJidServer(): string {
        return "c.us" === this.server
            ? m418987.WA_USER_JID_SUFFIX || ""
            : this.server;
    }

    public getSignalAddress(): string {
        const deviceSetting =
                null != this.device && 0 !== this.device
                    ? `:${this.device}`
                    : "",
            lidConfig = this.isLid() ? "@lid" : "";

        return [this.user, deviceSetting, lidConfig].join("");
    }

    public getDeviceId(): number {
        return this.device ?? 0;
    }

    public equals(elem: any): boolean {
        return elem instanceof Wid && this.toString() === elem.toString();
    }

    public isLessThan(elem: any): boolean {
        return elem instanceof Wid && this.toString() < elem.toString();
    }

    public isGreaterThan(elem: any): boolean {
        return elem instanceof Wid && this.toString() > elem.toString();
    }

    public isUser(): boolean {
        return "c.us" === this.server || "lid" === this.server;
    }

    public isLid(): boolean {
        return "lid" === this.server;
    }

    public isUserNotPSA(): boolean {
        return this.isUser() && !this.isPSA();
    }

    public isBroadcast(): boolean {
        return "broadcast" === this.server;
    }

    public isOfficialBizAccount(): boolean {
        return this.toString() === officialBizAccount;
    }

    public isEligibleForUSync(): boolean {
        return this.isUser() && !this.isPSA();
    }

    public isGroup(): boolean {
        return "g.us" === this.server;
    }

    public isGroupCall(): boolean {
        return "call" === this.server;
    }

    public isServer(): boolean {
        return "server" === this.user.toLowerCase() && "c.us" === this.server;
    }

    public isPSA(): boolean {
        return "0" === this.user && "c.us" === this.server;
    }

    public isIAS(): boolean {
        return "16508638904" === this.user && "c.us" === this.server;
    }

    public isStatusV3(): boolean {
        return (
            "status" === this.user.toLowerCase() && "broadcast" === this.server
        );
    }

    // isSupportAccount() {
    //     return (0, o.default)(this.user);
    // }
    public isNewsletter(): boolean {
        return "newsletter" === this.server;
    }

    public toJSON() {
        return this.toString();
    }

    //наименования можно извлечь исходя из сравнения, например wid.server === arg1 -> arg1 = server
    static isXWid(server: string, wid: unknown): boolean {
        return m724976.isString(wid)
            ? wid.split("@")[1] === server
            : wid instanceof Wid
            ? wid.server === server
            : false;
    }

    static isUser(wid: unknown): boolean {
        return Wid.isXWid("c.us", wid) || Wid.isXWid("lid", wid);
    }

    static isLid(wid: unknown): boolean {
        return Wid.isXWid("lid", wid);
    }

    static isBroadcast(wid: unknown): boolean {
        return Wid.isXWid("broadcast", wid);
    }

    static isGroup(wid: unknown): boolean {
        return Wid.isXWid("g.us", wid);
    }

    static isNewsletter(wid: unknown): boolean {
        return Wid.isXWid("newsletter", wid);
    }

    static isGroupCall(wid: unknown): boolean {
        return Wid.isXWid("call", wid);
    }

    static isWid(wid: unknown): boolean {
        return m724976.isString(wid) ? m323389.validateWid(wid) : wid instanceof Wid;
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

    static isEligibleForUSync(e: string | Wid): boolean {
        return this.isUser(e) && !this.isPSA(e);
    }

    static user(e: unknown): string | undefined {
        return m724976.isString(e)
            ? e.split("@")[0]
            : e instanceof Wid
            ? e.user
            : undefined;
    }

    static equals(first: unknown, second: unknown): boolean {
        return first instanceof Wid || second instanceof Wid
            ? first instanceof Wid && first.equals(second)
            : first === second;
    }

    static isLessThan(first: unknown, second: unknown): boolean {
        return (
            first instanceof Wid &&
            second instanceof Wid &&
            first.toString() < second.toString()
        );
    }

    static isGreaterThan(first: unknown, second: unknown): boolean {
        return (
            first instanceof Wid &&
            second instanceof Wid &&
            first.toString() > second.toString()
        );
    }
}
