goog.provide( 'core.deepCopy' );
goog.provide( 'core.deepCopySafe' );

goog.require( 'core.isArray' );
goog.require( 'core.isObject' );

/**
 * @private
 * @param {!Array} ary 
 * @param {!Array} crt 
 * @return {!Array.<number>} */
function _copyPrimitivesAndListUncopiedIndexes( ary, crt ){
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
 * @private
 * @param {!Object} src 
 * @param {!Object} crt 
 * @return {!Array.<string>} */
function _copyPrimitivesAndListUncopiedKeys( src, crt ){
    var keyList = [], j = -1, key, val;

    for( key in src ){
        val = src[ key ];
        if( core.isObject( val ) ){
            keyList[ ++j ] = key;
        } else {
            crt[ key ] = val;
        };
    };
    return keyList;
};

/**
 * @template T
 * @param {T} source
 * @return {T} */
core.deepCopy = function( source ){
    var depthX3       = 0,
        isArray       = core.isArray( source ),
        ret           = isArray ? [] : {},
        indexesOrKeys = isArray
                        ? _copyPrimitivesAndListUncopiedIndexes( /** @type {!Array}  */ (source), /** @type {!Array}  */ (ret) )
                      : core.isObject( source )
                        ? _copyPrimitivesAndListUncopiedKeys(    /** @type {!Object} */ (source), /** @type {!Object} */ (ret) )
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
                       ? _copyPrimitivesAndListUncopiedIndexes( /** @type {!Array}  */ (_src), /** @type {!Array}  */ (_crt) )
                       : _copyPrimitivesAndListUncopiedKeys(    /** @type {!Object} */ (_src), /** @type {!Object} */ (_crt) );
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

/**
 * deepCopy with circular reference support
 * 
 * @template T
 * @param {T} source
 * @return {T} */
core.deepCopySafe = function( source ){
    /**
     * @param {*} src 
     * @return {*} */
    function getCircularCopy( src ){
        var i = visitedLen;

        while( i ){
            if( visitedSrc[ --i ] === src ){
                return visitedCrt[ i ];
            };
        };
    };

    var depthX3       = 0,
        isArray       = core.isArray( source ),
        ret           = isArray ? [] : {},
        indexesOrKeys = isArray
                        ? _copyPrimitivesAndListUncopiedIndexes( /** @type {!Array}  */ (source), /** @type {!Array}  */ (ret) )
                      : core.isObject( source )
                        ? _copyPrimitivesAndListUncopiedKeys(    /** @type {!Object} */ (source), /** @type {!Object} */ (ret) )
                        : null,
        visitedSrc    = [ source ],
        visitedCrt    = [ ret    ],
        visitedLen    = 1,
        torioList, src, crt, indexOrKey, _src, _crt, _idxOrKeys, circular;

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
            _src = src[ indexOrKey ];

            // ★ 循環参照チェック
            circular = getCircularCopy( _src );
            if( circular ){
                crt[ indexOrKey ] = circular;
            } else {
                isArray    = core.isArray( _src );
                _crt       = crt[ indexOrKey ] = isArray ? [] : {};
                _idxOrKeys = isArray
                        ? _copyPrimitivesAndListUncopiedIndexes( /** @type {!Array}  */ (_src), /** @type {!Array}  */ (_crt) )
                        : _copyPrimitivesAndListUncopiedKeys(    /** @type {!Object} */ (_src), /** @type {!Object} */ (_crt) );

                // ★ 新しいオブジェクトとして記録
                visitedSrc[ visitedLen ] = _src;
                visitedCrt[ visitedLen ] = _crt;
                visitedLen++;

                if( _idxOrKeys.length ){
                    depthX3 += 3;
                    torioList.push( indexesOrKeys = _idxOrKeys, src = _src, crt = _crt );
                };
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
