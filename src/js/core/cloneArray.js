goog.provide( 'core.cloneArray' );

/**
 * より速いメソッドが欲しい場合は、ブラウザ判定と組み合わせたライブラリを使用すること
 * 
 * Array.concatで配列のクローン(コピー)を作成する
 *   https://uupaa.hatenadiary.org/entry/20100116/1263640217
 *   Array.slice() でも配列のクローンは作れますが
 *   Array.slice() よりも Array.concat() のほうが速く、Chrome4では倍違いますよ。
 *   Firefoxだと10%遅くなるケースもありますが
 * 
 * shallow copy
 * 
 * 高速化の観点から new Array(100) を使わない方が良い理由
 *   https://nmi.jp/2019-06-09-The-reason-you-should-avoid-new-array-100
 *   プロパティアクセスは「穴あき配列(Holey Array)」が出来るので V8 の JIT で不利…
 * 
 * @param {!Array | !Arguments | !HTMLCollection | !NodeList} ary
 * @return {!Array}
 */
core.cloneArray = function( ary ){
    var ret = [], i = ary.length;

    for( ; i; ){
        ret[ --i ] = ary[ i ];
    };
    return ret;
};
