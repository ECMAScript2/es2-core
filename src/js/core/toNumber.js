goog.provide( 'core.toNumber' );
goog.provide( 'core.toFiniteNumber' );

goog.require( 'core.isNumber' );
goog.require( 'core.isString' );
goog.require( 'core.isFiniteNumber' );

/**
 * 値が数値化可能なら数値化する
 * Infinity, -Infinity もあり得る
 * 
 * 但し、' 1 ', '1.', '1.0', '01', '1e3' は数値化しない
 * 
 * JavaScript イディオム集
 *   https://nmi.jp/archives/488
 *
 * JavaScriptの+演算子の謎挙動に迫る
 *   https://nmi.jp/archives/476
 *   +[3] === 3 なのに注意！
 * 
 * @param {*} val 
 * @return {number} */
core.toNumber = function( val ){
    if( core.isNumber( val ) ){
        return /**  @type {number} */ (val);
    };
    if( core.isString( val ) ){
        return '' + ( +val ) === val ? ( +val ) : NaN;
    };
    return NaN;
};

/**
 * 値が数値化可能なら数値化する
 * 
 * 但し、' 1 ', '1.', '1.0', '01', '1e3', 'Infinity' は数値化しない
 * 
 * @param {*} val 
 * @return {number} */
core.toFiniteNumber = function( val ){
    var num = core.toNumber( val );

    return core.isFiniteNumber( num ) ? num : NaN;
};
