goog.provide( 'core.deepCopy' );

goog.require( 'core.isArray' );
goog.require( 'core.isObject' );

/**
 * @template T
 * @param {T} source
 * @return {T} */
core.deepCopy = function( source ){
    /**
     * @param {!Array} ary 
     * @param {!Array} crt 
     * @return {!Array.<number>} */
    function copyPrimitivesAndListUncopiedIndexes( ary, crt ){
        var indexList = [], l = ary.length, i = 0, j = -1, val;

        for( ; i < l; ++i ){
            val = ary[ i ];
            if( core.isObject( val ) ){
                indexList[ ++j ] = i;
            } else {
                crt[ i ] = val;
            };
        };
        return indexList;
    };
    /**
     * @param {!Object} obj 
     * @param {!Object} crt 
     * @return {!Array.<string>} */
    function copyPrimitivesAndListUncopiedKeys( obj, crt ){
        var keyList = [], j = -1, key, val;

        for( key in obj ){
            val = obj[ key ];
            if( core.isObject( val ) ){
                keyList[ ++j ] = key;
            } else {
                crt[ key ] = val;
            };
        };
        return keyList;
    };

    var depthX3       = 0,
        isArray       = core.isArray( source ),
        ret           = isArray ? [] : {},
        indexesOrKeys = isArray
                        ? copyPrimitivesAndListUncopiedIndexes( /** @type {!Array}  */ (source), /** @type {!Array}  */ (ret) )
                      : core.isObject( source )
                        ? copyPrimitivesAndListUncopiedKeys(    /** @type {!Object} */ (source), /** @type {!Object} */ (ret) )
                        : null,
        torioList, src, crt, indexOrKey, _src, _crt, _idxOrKeys;

    if( indexesOrKeys === null ){
        return source;
    };

    torioList = [
        indexesOrKeys, // Array.<number> | Array.<string>
        src = source,
        crt = ret
    ];

    while( 0 <= depthX3 ){
        indexOrKey = indexesOrKeys.shift();

        if( indexOrKey != null ){
            _src    = src[ indexOrKey ];
            isArray = core.isArray( _src );
            _crt    = crt[ indexOrKey ] = isArray ? [] : {};
            _idxOrKeys = isArray
                       ? copyPrimitivesAndListUncopiedIndexes( /** @type {!Array}  */ (_src), /** @type {!Array}  */ (_crt) )
                       : copyPrimitivesAndListUncopiedKeys(    /** @type {!Object} */ (_src), /** @type {!Object} */ (_crt) );
            if( _idxOrKeys.length ){
                depthX3 += 3;
                torioList.push( indexesOrKeys = _idxOrKeys, src = _src, crt = _crt );
            };
        } else {
            torioList.length = depthX3;
            depthX3      -= 3;
            indexesOrKeys = torioList[ depthX3 + 0 ];
            src           = torioList[ depthX3 + 1 ];
            crt           = torioList[ depthX3 + 2 ];
        };
    };
    return ret;
};
