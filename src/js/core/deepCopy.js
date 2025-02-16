goog.provide( 'core.deepCopy' );

goog.require( 'core.isArray' );
goog.require( 'core.isObject' );

/**
 * @param {T} val
 * @return {T}
 * @template T */
core.deepCopy = function( val ){
    function copy( val ){
        var ret = val, i, l;

        if( core.isArray( val ) ){
            val = /** @type {!Array} */ (val);
            ret = [];
            for( i = 0, l = val.length; i < l; ++i ){
                ret[ i ] = copy( val[ i ] );
            };
        } else if( core.isObject( val ) ){
            ret = {};
            for( i in val ){
                ret[ i ] = copy( val[ i ] );
            };
        };
        return ret;
    };
    return copy( val );
};
