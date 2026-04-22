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

    test('circular-1',
        (t) => {
            var obj = {};
            obj.self = obj;

            t.deepEqual(
                core.deepEqualSafe(core.deepCopySafe(obj), obj),
                true
            );
        }
    );
    test('circular-2',
        (t) => {
            var obj = { a: {} };
            obj.a.b = obj;

            t.deepEqual(
                core.deepEqualSafe(core.deepCopySafe(obj), obj),
                true
            );
        }
    );
    test('circular-3',
        (t) => {
            var obj1 = { x: {} };
            obj1.x.y = obj1;

            var obj2 = { x: {} };
            obj2.x.y = obj2.x; // ← 循環の位置が違う

            t.deepEqual(
                core.deepEqualSafe(obj1, obj2),
                false
            );
        }
    );
    test('circular-4',
        (t) => {
            var obj1 = {};
            obj1.self = obj1;

            t.deepEqual(
                core.deepEqualSafe(obj1, { self: {} }),
                false
            );
        }
    );
    test('circular-5',
        (t) => {
            var obj = [];
            obj[0] = obj;

            t.deepEqual(
                core.deepEqualSafe(core.deepCopySafe(obj), obj),
                true
            );
            t.deepEqual(
                core.deepEqualSafe(obj, [[]]),
                false
            );
        }
    );
    test('circular-6',
        (t) => {
            var obj1 = [];
            obj1[0] = obj1;

            var obj2 = { 0: {} };
            obj2[0].x = obj2;

            t.deepEqual(
                core.deepEqualSafe(obj1, obj2),
                false
            );
        }
    );
    test('circular-7',
        (t) => {
            var obj = { a: { b: { c: {} } } };
            obj.a.b.c.loop = obj;

            t.deepEqual(
                core.deepEqualSafe(core.deepCopySafe(obj), obj),
                true
            );
        }
    );
    test('circular-8',
        (t) => {
            var obj1 = { a: { b: { c: {} } } };
            obj1.a.b.c.loop = obj1;

            var obj2 = { a: { b: { c: {} } } };
            obj2.a.b.c.loop = obj2.a; // ← 循環の位置が違う

            t.deepEqual(
                core.deepEqualSafe(obj1, obj2),
                false
            );
        }
    );
    test('circular-9',
        (t) => {
            var obj = { b: {}, c: {} };
            obj.b.x = obj;
            obj.c.y = obj;

            t.deepEqual(
                core.deepEqualSafe(core.deepCopySafe(obj), obj),
                true
            );
        }
    );
    test('circular-10',
        (t) => {
            var obj1 = { b: {}, c: {} };
            obj1.b.x = obj1;
            obj1.c.y = obj1;

            var obj2 = { b: {}, c: {} };
            obj2.b.x = obj2.b; // ← 循環の位置が違う
            obj2.c.y = obj2;

            t.deepEqual(
                core.deepEqualSafe(obj1, obj2),
                false
            );
        }
    );
    test('circular-11',
        (t) => {
            var obj = { a: 1, b: {} };
            obj.b.self = obj;

            t.deepEqual(
                core.deepEqualSafe(core.deepCopySafe(obj), obj),
                true
            );
        }
    );
});
