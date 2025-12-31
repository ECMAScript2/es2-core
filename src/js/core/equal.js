goog.provide( 'core.equal' );

goog.require( 'core.isNaN' );

/**
 * 
 * @param {*} val1 
 * @param {*} val2 
 * @return {boolean} */
core.equal = function( val1, val2 ){
    return val1 === val2 || core.isNaN( val1 ) && core.isNaN( val2 );
};
