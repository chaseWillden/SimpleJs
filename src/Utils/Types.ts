import Simple from "../Simple";
import SimpleElement from "../Dom/SimpleElement";

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
  
  /**
   * Check if value is a simple
   * @param val 
   */
  static IsSimple(val: any) {
    return val instanceof Simple;
  }

  /**
   * Check if value is a SimpleElement
   * @param val 
   */
  static IsSimpleElement(val: any) {
    return val instanceof SimpleElement;
  }

  /**
   * Is number
   * @param val
   */
  static IsNumber(val: any) {
    return typeof val === 'number';
  }

  /**
   * Is input element
   * @param val
   */
  static IsInputEle(val: any) {
    return val instanceof HTMLInputElement;
  }
}