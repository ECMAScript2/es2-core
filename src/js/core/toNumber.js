goog.provide( 'core.toNumber' );
goog.provide( 'core.toFiniteNumber' );

goog.require( 'core.isBoolean' );
goog.require( 'core.isString' );
goog.require( 'core.isFiniteNumber' );

/**
 * 値が数値化可能なら数値化する
 * Infinity, -Infinity もあり得る
 * 
 * 但し、' 1 ', '1.', '1.0', '01', '1e3' は数値化しない
 * 
 * @param {*} val 
 * @return {number} */
core.toNumber = function( val ){
    if( core.isBoolean( val ) || val == null ){
        return NaN;
    };
    if( core.isString( val ) && '' + ( + val ) !== val ){
        return NaN;
    };
    return + val;
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
