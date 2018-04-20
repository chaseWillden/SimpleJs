var objectConstructor = ({}).constructor;

/**
 * Determine if an object is a string
 * @param {any} val [description]
 */
export function isString(val: any){
	return typeof val === 'string';
}

/**
 * Determine if an object is an array
 * @param {any} val [description]
 */
export function isArray(val: any){
	return Array.isArray(val);
}

/**
 * Is an object
 * @param {any} val [description]
 */
export function isObject(val: any){
	return val && val.constructor === objectConstructor;
}