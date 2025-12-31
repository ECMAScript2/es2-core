goog.provide( 'core.deepEqual' );

goog.require( 'core.isArray' );
goog.require( 'core.isObject' );
goog.require( 'core.equal' );

/**
 * JSON 相当のオブジェクトの一致をチェックする
 * ただし、プリミティブ値(undefined, NaN, Infinity, -Infinity)と
 * Object のメンバーと Array の内容もチェックする
 * 
 * @param {*} value1 
 * @param {*} value2 
 * @return {boolean} */
core.deepEqual = function( value1, value2 ){
    /**
     * @param {*} val1 
     * @param {*} val2 
     * @return {!Array.<number> | !Array.<string> | boolean | null} */
    function getUntestedValueIndexesOrKeys( val1, val2 ){
        /**
         * @param {!Object} obj 
         * @return {Array.<string>} */
        function toKeyList( obj ){
            var keyList = [], i = -1, key;

            for( key in obj ){
                keyList[ ++i ] = key;
            };
            return keyList.sort();
        };

        var indexesOrKeys = null,
            isAry1 = core.isArray( val1 ),
            isAry2 = core.isArray( val2 ),
            j = -1, l, keyList1, keyList2, i, key, val;

        if( isAry1 && isAry2 ){
            val1 = /** @type {!Array} */ (val1);
            val2 = /** @type {!Array} */ (val2);
            l    = val1.length;
            if( l === val2.length ){
                indexesOrKeys = [];
                for( i = 0; i < l; ++i ){
                    val = val1[ i ];
                    if( !core.equal( val, val2[ i ] ) ){
                        if( core.isObject( val ) ){
                            indexesOrKeys[ ++j ] = i;
                        } else {
                            indexesOrKeys = false;
                            break;
                        };
                    };
                };
            } else {
                indexesOrKeys = false;
            };
        } else if( isAry1 || isAry2 ){
            indexesOrKeys = false;
        } else if( core.isObject( val1 ) && core.isObject( val2 ) ){
            val1     = /** @type {!Object} */ (val1);
            val2     = /** @type {!Object} */ (val2);
            keyList1 = toKeyList( val1 );
            keyList2 = toKeyList( val2 );
            l        = keyList1.length;
            if( l === keyList2.length ){
                indexesOrKeys = [];
                for( i = 0; i < l; ++i ){
                    key = keyList1[ i ];
                    if( key !== keyList2[ i ] ){
                        indexesOrKeys = false;
                        break;
                    };
                    val = val1[ key ];
                    if( !core.equal( val, val2[ key ] ) ){
                        if( core.isObject( val ) ){
                            indexesOrKeys[ ++j ] = key;
                        } else {
                            indexesOrKeys = false;
                            break;
                        };
                    };
                };
            } else {
                indexesOrKeys = false;
            };
        };
        return indexesOrKeys;
    };

    var depthX3       = 0,
        indexesOrKeys = getUntestedValueIndexesOrKeys( value1, value2 ),
        result        = indexesOrKeys === null ? core.equal( value1, value2 ) : !!indexesOrKeys,
        torioList, obj1, obj2, indexOrKey, val1, val2;

    if( indexesOrKeys ){
        torioList = [
            indexesOrKeys, // Array.<number> | Array.<string>
            obj1 = value1,
            obj2 = value2
        ];

        while( 0 <= depthX3 && result ){
            indexOrKey = indexesOrKeys.pop();

            if( indexOrKey != null ){
                val1 = obj1[ indexOrKey ];
                val2 = obj2[ indexOrKey ];

                indexesOrKeys = getUntestedValueIndexesOrKeys( val1, val2 );
                if( indexesOrKeys ){
                    if( indexesOrKeys.length ){
                        depthX3 += 3;
                        torioList.push( indexesOrKeys, obj1 = val1, obj2 = val2 );
                    };
                } else {
                    result = false;
                };
            } else {
                torioList.length = depthX3;
                depthX3      -= 3;
                indexesOrKeys = torioList[ depthX3 + 0 ];
                obj1          = torioList[ depthX3 + 1 ];
                obj2          = torioList[ depthX3 + 2 ];
            };
        };
    };
    return result;
};
