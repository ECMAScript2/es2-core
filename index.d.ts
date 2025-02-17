declare namespace core {
    function isNullOrUndefined(val):boolean;
    function isString(val:any):boolean;
    function isNumericString(val:any):boolean;
    function isNumber(val:any):boolean;
    function isFiniteNumber(val:any):boolean;
    function isNaN(val:any):boolean;
    function isBoolean(val:any):boolean;
    function isObject(val:any):boolean;
    function isArray(val:any):boolean;
    function isFunction(val:any):boolean;
    function isDate(val:any):boolean;
    function isRegExp(val:any):boolean;

    function cloneArray(ary:(Array<any> | IArguments | HTMLCollection | NodeList)):Array<any>;
    function dateToJSON(date:Date):string;
    function deepCopy(val:any):any;
    function deepEqual(val1:any, val2:any):boolean;
    function hasOwnProperty(obj:Object, property:string):boolean;
    function hasProperty(obj:Object, property:string):boolean;
    function toNumber(val:any):number;
}
