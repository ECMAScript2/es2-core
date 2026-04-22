const test = require('ava');

const Compiler = require('google-closure-compiler').compiler;

const compiler = new Compiler({
    dependency_mode  : 'PRUNE',
    entry_point      : 'goog:core.all',
    js               : [
        './src/closure-primitives/base.js',
        './src/js/core.all.js',
        './src/js/core/cloneArray.js',
        './src/js/core/dateToJSON.js',
        './src/js/core/deepCopy.js',
        './src/js/core/deepEqual.js',
        './src/js/core/equal.js',
        './src/js/core/hasOwnProperty.js',
        './src/js/core/hasProperty.js',
        './src/js/core/is.js',
        './src/js/core/isRegExp.js',
        './src/js/core/toNumber.js'
    ],
    formatting       : 'PRETTY_PRINT',
    compilation_level: 'WHITESPACE_ONLY'
});

compiler.run((exitCode, stdOut, stdErr) => {
    if (stdErr) {
        console.log( exitCode, stdOut, stdErr, 'cc' );
        return;
    };

    const core = new Function( stdOut + ';; return core;' )();

    const obj = {
        a : { b : [ { c : null }, 1, 2 ], d : [] },
        d : 0,
        e : 'e',
        f : [ -1, '', null, {}, [ [ [] ] ] ]
    };
    const ary = [ 0, '', null, {}, [], { _: 1, 0: 0, 1: '' }, [ {}, [] ] ];

    test('isRegExp',
        (t) => {
            t.deepEqual(core.isRegExp(''), false);
            t.deepEqual(core.isRegExp(/a/), true);
        }
    );
    test('toNumber',
        (t) => {
            t.deepEqual(core.toNumber(1), 1);
            t.deepEqual(core.toNumber('1'), 1);
            t.deepEqual(core.toNumber('1.1'), 1.1);
            t.deepEqual(core.toNumber(''), NaN);
            t.deepEqual(core.toNumber('1 '), NaN);
            t.deepEqual(core.toNumber(' 1'), NaN);
            t.deepEqual(core.toNumber('1.0'), NaN);
            t.deepEqual(core.toNumber('1.'), NaN);
            t.deepEqual(core.toNumber('1e3'), NaN);
            t.deepEqual(core.toNumber('01'), NaN);
            t.deepEqual(core.toNumber('Infinity'), Infinity);
            t.deepEqual(core.toNumber('-Infinity'), -Infinity);
            t.deepEqual(core.toNumber(obj), NaN);
            t.deepEqual(core.toNumber(ary), NaN);
            t.deepEqual(core.toNumber(undefined), NaN);
            t.deepEqual(core.toNumber(null), NaN);
            t.deepEqual(core.toNumber(true), NaN);
            t.deepEqual(core.toNumber(false), NaN);
        }
    );
    test('toFiniteNumber',
        (t) => {
            t.deepEqual(core.toFiniteNumber('Infinity'), NaN);
            t.deepEqual(core.toFiniteNumber('-Infinity'), -NaN);
        }
    );
    test('deepCopy',
        (t) => {
            t.deepEqual(core.deepCopy(obj), obj);
            t.deepEqual(core.deepCopy(ary), ary);
            t.deepEqual(core.deepCopy(1), 1);
            t.deepEqual(core.deepCopy({}), {});
            t.deepEqual(core.deepCopy([]), []);
        }
    );
    test('deepEqual',
        (t) => {
            t.deepEqual(
                core.deepEqual(core.deepCopy(obj), { a : 2 }),
                false
            );
            t.deepEqual(
                core.deepEqual(core.deepCopy(obj), obj),
                true
            );
            t.deepEqual(
                core.deepEqual(ary, [ 0, '', null, {}, [], { _: 1, 0: 0, 1: '' }, [ [], {} ] ]),
                //                                                                  ^^^^^^
                false
            );
            t.deepEqual(
                core.deepEqual([], []),
                true
            );
            t.deepEqual(
                core.deepEqual([1], [2]),
                false
            );
            t.deepEqual(
                core.deepEqual(null, null),
                true
            );
            var o1 = { a : 1, b : 2 };
            var o2 = { c : o1, d: 0, e : o1 }
            t.deepEqual(
                core.deepEqual(o2, { c : o1, d : 0, e : { a : 1, b : 2 } }),
                true
            );
        }
    );
});
