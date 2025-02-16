goog.provide( 'core.hasProperty' );

/**
 * `if(name in obj)` が使えない IE ~5 用
 * @param {!Object} obj 
 * @param {string} property 
 * @return {boolean} */
core.hasProperty = function( obj, property ){
    if( obj[ property ] !== void 0 ){
        return true;
    };
    for( var k in obj ){
        if( k === property ) return true;
    };
    return false;
};
