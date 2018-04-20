import { isString, isArray, isObject } from './types'
import { createEl, appendToEl, clearChildren } from '../dom/element'
import Options from '../instance/options'
import { __bindWithShared__ } from './bind'
import Simple from '../instance/simple'

/**
 * Add the render method to the Simple object
 * @param {any} Simple [description]
 */
export function __initRender__(Simple: any){

	/**
	 * Get values from another rendered simple value
	 * @param {[type]} key [description]
	 */
	function getValuesFromRenderedSimples(key, parent: any){
		const simple = Simple.__cache__[key];
		if (simple) {
			if (!simple.__listenerLookup[parent.__key]) {
				simple.__listenerLookup[parent.__key] = parent;
				simple.__listeners.push(parent);
			}
			return simple.shared;
		}
	}

	/**
	 * Render item
	 * @param {any} data [description]
	 */
	function renderItem(data: any, parent: Simple){
		// Render a string
		if (isString(data)) {
			var matched = data.match(/Simple::[0-9]+/g);

			if (matched) {
				for (let i = 0; i < matched.length; i++) {
					const value = getValuesFromRenderedSimples(matched[i], parent);
					var regex = new RegExp(matched[i], 'g');
					data = data.replace(regex, value);
				}
			}

			let child = new Simple({type: '__text__', data: data, parent: parent});
			parent.__renderChild(child);
			return child;
		}
		// Render an array
		else if (isArray(data)) {
			let ul = new Simple({type: 'ul', parent: parent});
			for (let i = 0; i < data.length; i++){
				let li = new Simple({type: 'li', parent: ul, data: data[i]});
				ul.__renderChild(li);
			}
			return ul;
		}
		// Render an object
		else if (isObject(data)) {
			var keys = Object.keys(data);
			let children = [];
			for (let i = 0; i < keys.length; i++){
				const key = keys[i];
				const rendered = renderItem(data[key], parent);
				if (!rendered) {
					continue;
				}
				children.push(rendered);
			}
			return children
		}
		// Render another Simple object
		else if (data instanceof Simple) {
			return data;
		}
	}

	/**
	 * Internal parent renderer
	 */
	Simple.prototype.__render__ = function(){

		// Don't render more than needed
		if (!this.__marked) {
			return;
		}

		const options : Options = this.options;
		const el : HTMLElement = this.el;
		const type : string = options.type;

		if (!el && !type) {
			throw new Error('Invalid Simple element');
		}
		else if (!el && type && type === '__text__') {
			this.el = options.data;
		}
		else if (!el && type) {
			this.el = createEl(type);
			__bindWithShared__(this, Simple);
		}
		else{
			const data = options.data;
			let children = renderItem(data, this);	
			
			// Render to body
			this.__renderChild(children);
		}

		this.__marked = false;
		this.__rendered = true;
	}

	/**
	 * Rerender because child value changed
	 */
	Simple.prototype.__rerenderListeners__ = function(){
		for (let i = 0; i < this.__listeners.length; i++){
			this.__listeners[i].__marked = true;
			this.__listeners[i].__render__();
		}
	}
}