import { isString, isArray } from '../render/types'

/**
 * Get element
 * @param {string} tagName [description]
 */
export function getElement(tagName: string){
	var el = document.getElementsByTagName(tagName);
	if (!el) throw new String('Element not found');
	if (el.length > 1) console.warn(`Multiple tags found with the name ${tagName}, using the first`);
	return el[0];
}

/**
 * Create a new html element
 * @param {string} tagName [description]
 */
export function createEl(tagName: string){
	return document.createElement(tagName);
}

/**
 * Append an element
 * @param {any} child [description]
 */
export function appendToEl(child: any, parent: HTMLElement){
	if (!child || !parent) {
		return;
	}
	
	if (isString(child)) {
		return parent.innerHTML += child;
	}
	else if (isArray(child)) {
		for (let i = 0; i < child.length; i++) {
			appendToEl(child[i], parent);
		}
	}
	else if (child instanceof HTMLElement){
		parent.appendChild(child);
	}
	else if (child.__isSimple) {
		appendToEl(child.el, parent);
	}
	else {
		throw new Error('Invalid child');
	}
}

/**
 * Get value
 * @param {HTMLElement} el [description]
 */
export function getValue(el: HTMLElement){
	if (el instanceof HTMLInputElement) {
		return el.value;
	}
}

/**
 * Empty out all children
 * @param {HTMLElement} el [description]
 */
export function clearChildren(el: HTMLElement){
	el.innerHTML = '';
}