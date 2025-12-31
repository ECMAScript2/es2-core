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
        }
    );
});
