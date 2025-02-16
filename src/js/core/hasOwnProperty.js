goog.provide( 'core.hasOwnProperty' );

goog.require( 'core.hasProperty' );

/**
 * Object.prototype.hasOwnProperty polyfill
 * 
 * @see https://outcloud.blogspot.com/2024/04/hasOwnProperty-polyfill.html
 * 
 * @param {!Object} obj 
 * @param {string} property 
 * @return {boolean} 
 */
core.hasOwnProperty = function( obj, property ){
    function _hasOwnProperty(instance, property, oPrototype){
        var __proto__ = getPrototypeOf(instance, oPrototype), instanceValue, defaultValue;

        if (!__proto__) {
            return core.hasProperty(instance, property);
        };
        defaultValue = __proto__[property];
        instanceValue = instance[property];

        return isNaN(instanceValue) !== isNaN(defaultValue)
                ? true
                : isNaN(instanceValue)
                    ? hasOwnPropIfNaN(__proto__, property, instance, oPrototype)
                    : instanceValue !== defaultValue
                        ? true
                        : core.hasProperty(__proto__, property)
                            ? hasOwnProp(__proto__, defaultValue, instanceValue, property, instance, oPrototype)
                            : core.hasProperty(instance, property);
    };
    function getPrototypeOf(instance, oPrototype) {
        if (instance.__proto__ !== void 0) {
            return instance.__proto__;
        };
        var __proto__;

        return instance === oPrototype
            ? null
            : instance === (__proto__ = instance.constructor.prototype)
                ? oPrototype
                : __proto__;
    };
    function isNaN(value) {
        return value !== value;
    };
    function hasOwnPropIfNaN(__proto__, property, instance, oPrototype) {
        var result, protoHasOwnProp = _hasOwnProperty(__proto__, property, oPrototype);

        __proto__[property] = true;
        result = isNaN(instance[property]);
        if (protoHasOwnProp) {
            __proto__[property] = NaN;
        } else {
            delete __proto__[property];
        };
        return result;
    };
    function hasOwnProp(__proto__, defaultValue, instanceValue, property, instance, oPrototype) {
        var result, protoHasOwnProp = _hasOwnProperty(__proto__, property, oPrototype);

        __proto__[property] = !defaultValue;
        result = instanceValue === instance[property];
        if (protoHasOwnProp) {
            __proto__[property] = defaultValue;
        } else {
            delete __proto__[property];
        };
        return result;
    };

    /* if(obj.hasOwnProperty){
        return obj.hasOwnProperty(property);
    }; */
    return _hasOwnProperty(obj, property, Object.prototype);
};
