/**
 * Deeply get a value from an object via it's path.
 */
export declare function getIn(obj: any, key: string | string[], def?: any, p?: number): any;
/**
 * Deeply set a value from in object via it's path.
 * @see https://github.com/developit/linkstate
 */
export declare function setIn(obj: any, path: string, value: any): any;
/**
 * Recursively a set the same value for all keys and arrays nested object, cloning
 * @param object
 * @param value
 * @param visited
 * @param response
 */
export declare function setNestedObjectValues<T>(object: any, value: any, visited?: any, response?: any): T;
/** @private is the given object a Function? */
export declare const isFunction: (obj: any) => obj is Function;
/** @private is the given object an Object? */
export declare const isObject: (obj: any) => boolean;
/** @private is the given object an integer? */
export declare const isInteger: (obj: any) => boolean;
/** @private is the given object a string? */
export declare const isString: (obj: any) => obj is string;
/** @private is the given object a NaN? */
export declare const isNaN: (obj: any) => boolean;
/** @private Does a React component have exactly 0 children? */
export declare const isEmptyChildren: (children: any) => boolean;
/** @private is the given object/value a promise? */
export declare const isPromise: (value: any) => boolean;
/**
 * Transform Yup ValidationError to a more usable object
 */
export declare function yupToFormErrors(yupError: any): {};
/**
 * Validate a yup schema.
 */
export declare function validateYupSchema(values: any, schema: any, sync?: boolean, context?: {}): any;
