goog.provide( 'core.isRegExp' );

/**
 * `RegExp` を未実装の環境がある mobile ie4
 * 
 * @param {*} val 
 * @return {boolean} */
core.isRegExp = function( val ){
    var RegExp = _globalThis.RegExp;

    return !!val && !!RegExp && val.constructor === RegExp;
};

/**
 * @private
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis
 * 
 * @const {!Window | !WorkerGlobalScope} */
var _globalThis = typeof window !== 'undefined'
                    ? window
                : typeof self   !== 'undefined'
                    ? self
                : typeof global !== 'undefined'
                    ? global
                    : this;
