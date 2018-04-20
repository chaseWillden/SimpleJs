import Simple from '../instance/simple'
import { isArray } from './types'
import { appendToEl } from '../dom/element'

export function __initChildren__(Simple: any){
	/**
	 * Render any children
	 * @param {Simple} child [description]
	 */
	Simple.prototype.__renderChild = function(child: Simple | Simple[]) {
		if (isArray(child)) {
			for (let i = 0; i < (child as Simple[]).length; i++) {
				this.__children.push(child[i]);
				appendToEl(child[i], this.el);
			}
		}
		else {
			this.__children.push(child);
			appendToEl(child, this.el);
		}
	}
}