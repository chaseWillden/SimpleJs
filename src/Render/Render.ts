import Simple from '../Simple'
import SimpleElement from '../Dom/SimpleElement'
import Types from '../Utils/Types'

/**
 * A renderer is only in charge of its node and all children nodes
 */
export default class Render{

	simple: Simple;
	data: any;

	constructor(simple: Simple){
		this.simple = simple;
	}

	/**
	 * Construct tree from children nodes
	 * @return {SimpleElement} [description]
	 */
	constructTree(): SimpleElement{
		const children = this.simple.render();
		const el = this.simple.el;
		el.appendChild(children);
		return el;
	}

	/**
	 * Render the tree
	 */
	init(){
		this.data = this.simple.getData();
		this.checkIfSimpleAndRender();
		this.checkIfStringAndRender();
	}

	/**
	 * Check if data is a string and set the values
	 */
	private checkIfStringAndRender(){
		if (Types.IsString(this.data)) {
			const matched = this.data.match(/__SIMPLE__::([0-9]+)/g);

			if (!matched) {
				return this.simple.el.appendString(this.data);
			}

			this.replaceKeyWithValue(matched);
			this.simple.el.appendString(this.data);
		}
	}

	/**
	 * Replace key with value
	 * @param {string[]} matched [description]
	 */
	private replaceKeyWithValue(matched: string[]){
		for (let i = 0; i < matched.length; i++) {
			const match = matched[i];
			const simple = Simple.__getFromCache(match);
			if (!simple) continue;
			const value = simple.el.getValue();
			var regex = new RegExp(match, 'g');
			this.data = this.data.replace(regex, value);
		}
	}

	/**
	 * Check if a simple object and render
	 */
	private checkIfSimpleAndRender(){
		if (this.data instanceof Simple) {
			const children = this.data.render();
			this.simple.el.appendChild(children);
		}
	}
}