goog.provide( 'core' );
goog.provide( 'core.isNullOrUndefined' );
goog.provide( 'core.isString' );
goog.provide( 'core.isNumericString' );
goog.provide( 'core.isFiniteNumericString' );
goog.provide( 'core.isNumber' );
goog.provide( 'core.isFiniteNumber' );
goog.provide( 'core.isNaN' );
goog.provide( 'core.isBoolean' );
goog.provide( 'core.isObject' );
goog.provide( 'core.isArray' );
goog.provide( 'core.isFunction' );
goog.provide( 'core.isDate' );
goog.provide( 'core.isRegExp' );

/** @const */
var core = {};

/**
 * type detection
 * https://uupaa.hatenadiary.org/entry/20091006/1254926477
 */

/**
 * @param {*} val 
 * @return {boolean} */
core.isNullOrUndefined = function( val ){
    return val == null;
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isString = function( val ){
    return val === '' + val;
};

/**
 * 'NaN', ' 1 ', '1.', '1.0', '01', '1e3' を除外
 *
 * @param {*} val 
 * @return {boolean} */
core.isNumericString = function( val ){
    return ( + val ) + '' === val && core.isNumber( + val );
};

/**
 * 'NaN', ' 1 ', '1.', '1.0', '01', '1e3', 'Infinity' を除外
 * @param {*} val
 * @return {boolean} */
core.isFiniteNumericString = function( val ){
    return core.isNumericString( val ) && core.isFiniteNumber( + val );
};

/**
 * NaN は false を返す
 * @param {*} val 
 * @return {boolean} */
core.isNumber = function( val ){
    return val === + val;
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isFiniteNumber = function( val ){
    if( core.isNumber( val ) ){
        /** @suppress {checkTypes} */
        val = val - val === 0; // <= Infinity - Infinity = NaN
        return val;
    };
    return false;
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isNaN = function(val){
    return val !== val;
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isBoolean = function( val ){
    return !!val === val;
};

/**
 * Array, Date などを含む点に注意
 * 
 * @param {*} val 
 * @return {boolean} */
core.isObject = function( val ){
    return !!val && ( typeof val === 'object' );
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isArray = function( val ){
    return !!val && val.constructor === Array;
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isFunction = function( val ){
    return !!val && val.constructor === Function;
};

/**
 * @param {*} val 
 * @return {boolean} */
core.isDate = function( val ){
    return !!val && val.constructor === Date;
};

/**
 * `RegExp` を未実装の環境がある mobile ie4
 * 
 * @param {*} val 
 * @return {boolean} */
core.isRegExp = function( val ){
    return !!val && val.constructor === core._globalThis.RegExp;
};

/**
 * @private
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis
 * 
 * @const {!Window | !WorkerGlobalScope} */
core._globalThis = typeof window !== 'undefined'
                   ? window
                 : typeof self   !== 'undefined'
                   ? self
                 : typeof global !== 'undefined'
                   ? global
                   : this;
