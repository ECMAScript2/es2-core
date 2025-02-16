goog.provide( 'core.deepEqual' );

goog.require( 'core.isArray' );
goog.require( 'core.isObject' );
goog.require( 'core.isNaN' );

/**
 * 
 * @param {*} val1 
 * @param {*} val2 
 * @return {boolean} */
core.deepEqual = function( val1, val2 ){
    function equal( val1, val2 ){
        var result = false, i, l, done;

        if( val1 === val2 || core.isNaN( val1 ) && core.isNaN( val2 ) ){
            result = true;
        } else {
            if( core.isArray( val1 ) && core.isArray( val2 ) ){
                result = true;
                val1 = /** @type {!Array} */ (val1);
                val2 = /** @type {!Array} */ (val2);
                l = val1.length;
                if( l !== val2.length ){
                    result = false;
                } else {
                    for( i = 0; i < l; ++i ){
                        if( !equal( val1[ i ], val2[ i ] ) ){
                            result = false;
                            break;
                        };
                    };
                };
            } else if( core.isObject( val1 ) && core.isObject( val2 ) ){
                result = true;
                done = {};
                for( i in val1 ){
                    if( !equal( val1[ i ], val2[ i ] ) ){
                        result = false;
                        break;
                    } else {
                        done[ i ] = true;
                    };
                };
                if( result ){
                    for( i in val2 ){
                        if( !done[ i ] ){
                            result = false;
                            break;
                        };
                    };
                };
            };
        };
        return result;
    };
    return equal( val1, val2 );
};
