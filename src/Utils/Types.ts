var objectConstructor = ({}).constructor;

export default class Types {
	/**
	 * Check if an object is a string
	 * @param {any} val [description]
	 */
	static IsString(val: any) {
		return typeof val === 'string';
	}

	/**
	 * Check if an object is an array
	 * @param {any} val [description]
	 */
	static IsArray(val: any) {
		return Array.isArray(val);
	}

	/**
	 * Check if an object is an object
	 * @param {any} val [description]
	 */
	static IsObject(val: any){
		return val && val.constructor === objectConstructor;
	}

	/**
	 * Check if it's an html element
	 * @param {any} val [description]
	 */
	static IsHtmlElement(val: any) {
		return val instanceof HTMLElement;
	}
}