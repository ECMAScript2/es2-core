goog.provide( 'core.toNumber' );

/**
 * @param {*} val 
 * @return {number} */
core.toNumber = function( val ){
    // Number("") === 0, parseFloat("0a") === 0 なので、ダブルチェックで数値文字列かを判断する
    if( Number( val ) === parseFloat( val ) ){
        return + val;
    };
    return NaN;
};
