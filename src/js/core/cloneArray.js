goog.provide( 'core.cloneArray' );

/**
 * より速いメソッドが欲しい場合は、ブラウザ判定と組み合わせたライブラリを使用すること
 * 
 * https://uupaa.hatenadiary.org/entry/20100116/1263640217
 * Array.concatで配列のクローン(コピー)を作成する
 *   Array.slice() でも配列のクローンは作れますが
 *   Array.slice() よりも Array.concat() のほうが速く、Chrome4では倍違いますよ。
 *   Firefoxだと10%遅くなるケースもありますが
 * 
 * shallow copy
 * 
 * @param {!Array | !Arguments | !HTMLCollection | !NodeList} ary
 * @return {!Array}
 */
core.cloneArray = function( ary ){
    var ret = [], i = 0, l = ary.length;

    for( ; i < l; ++i ){
        ret[ i ] = ary[ i ];
    };
    return ret;
};
