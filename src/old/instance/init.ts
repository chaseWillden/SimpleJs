import { getElement } from '../dom'
import Options from './options'

export function __init__(Simple: any) {
	Simple.prototype.__init__ = function(options: Options) {
		if (typeof options.root === 'string') {
			this.el = getElement(options.root as string);
		}
		else {
			this.el = options.root;
		}

		this.options = options;
		this.__key = 'Simple::' + Object.keys(Simple.__cache__).length;
		Simple.__cache__[this.__key] = this;
	}

	Simple.prototype.toString = function(){
		return this.__key;
	}
}