var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { toPath, cloneDeep } from 'lodash';
import * as React from 'react';
/**
 * Deeply get a value from an object via it's path.
 */
export function getIn(obj, key, def, p) {
    if (p === void 0) { p = 0; }
    var path = toPath(key);
    while (obj && p < path.length) {
        obj = obj[path[p++]];
    }
    return obj === undefined ? def : obj;
}
/**
 * Deeply set a value from in object via it's path.
 * @see https://github.com/developit/linkstate
 */
export function setIn(obj, path, value) {
    var res = {};
    var resVal = res;
    var i = 0;
    var pathArray = toPath(path);
    for (; i < pathArray.length - 1; i++) {
        var currentPath = pathArray[i];
        var currentObj = getIn(obj, pathArray.slice(0, i + 1));
        if (resVal[currentPath]) {
            resVal = resVal[currentPath];
        }
        else if (currentObj) {
            resVal = resVal[currentPath] = cloneDeep(currentObj);
        }
        else {
            var nextPath = pathArray[i + 1];
            resVal = resVal[currentPath] =
                isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
        }
    }
    resVal[pathArray[i]] = value;
    return __assign({}, obj, res);
}
/**
 * Recursively a set the same value for all keys and arrays nested object, cloning
 * @param object
 * @param value
 * @param visited
 * @param response
 */
export function setNestedObjectValues(object, value, visited, response) {
    if (visited === void 0) { visited = new WeakMap(); }
    if (response === void 0) { response = {}; }
    for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
        var k = _a[_i];
        var val = object[k];
        if (isObject(val)) {
            if (!visited.get(val)) {
                visited.set(val, true);
                // In order to keep array values consistent for both dot path  and
                // bracket syntax, we need to check if this is an array so that
                // this will output  { friends: [true] } and not { friends: { "0": true } }
                response[k] = Array.isArray(val) ? [] : {};
                setNestedObjectValues(val, value, visited, response[k]);
            }
        }
        else {
            response[k] = value;
        }
    }
    return response;
}
// Assertions
/** @private is the given object a Function? */
export var isFunction = function (obj) {
    return typeof obj === 'function';
};
/** @private is the given object an Object? */
export var isObject = function (obj) {
    return obj !== null && typeof obj === 'object';
};
/** @private is the given object an integer? */
export var isInteger = function (obj) {
    return String(Math.floor(Number(obj))) === obj;
};
/** @private is the given object a string? */
export var isString = function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
};
/** @private is the given object a NaN? */
export var isNaN = function (obj) { return obj !== obj; };
/** @private Does a React component have exactly 0 children? */
export var isEmptyChildren = function (children) {
    return React.Children.count(children) === 0;
};
/** @private is the given object/value a promise? */
export var isPromise = function (value) {
    return isObject(value) && isFunction(value.then);
};
/**
 * Transform Yup ValidationError to a more usable object
 */
export function yupToFormErrors(yupError) {
    var errors = {};
    for (var _i = 0, _a = yupError.inner; _i < _a.length; _i++) {
        var err = _a[_i];
        if (!errors[err.path]) {
            errors = setIn(errors, err.path, err.message);
        }
    }
    return errors;
}
/**
 * Validate a yup schema.
 */
export function validateYupSchema(values, schema, sync, context) {
    if (sync === void 0) { sync = false; }
    if (context === void 0) { context = {}; }
    var validateData = {};
    for (var k in values) {
        if (values.hasOwnProperty(k)) {
            var key = String(k);
            validateData[key] = values[key] !== '' ? values[key] : undefined;
        }
    }
    return schema[sync ? 'validateSync' : 'validate'](validateData, {
        abortEarly: false,
        context: context
    });
}
//# sourceMappingURL=utils.js.map