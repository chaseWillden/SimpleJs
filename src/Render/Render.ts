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
		this.checkIfObjectAndRender();
		this.checkIfArrayAndRender();
	}

	/**
	 * Check if its an object and render
	 */
	private checkIfObjectAndRender(){
		if (Types.IsObject(this.data)){
			this.simple.el = SimpleElement.Create('div');
			var keys = Object.keys(this.data);
			for (let i = 0; i < keys.length; i++){
				var child = this.data[keys[i]];
				var simple = new Simple({data: child});
				this.simple.addChild(simple);
			}
		}
	}

	/**
	 * Check if the data is an array and render each
	 * child
	 */
	private checkIfArrayAndRender(){
		if (Types.IsArray(this.data)){
			const ul = new Simple({type: 'ul'});
			for (let i = 0; i < this.data.length; i++){
				const li = new Simple({type: 'li'});
				const child = new Simple({data: this.data[i]});
				li.addChild(child);
				ul.addChild(li);
			}
			this.simple.addChild(ul);
		}
	}

	/**
	 * Check if data is a string and set the values
	 */
	private checkIfStringAndRender(){
		if (Types.IsString(this.data)) {
			const matched = this.data.match(/__SIMPLE__::([0-9]+)/g);

			if (!matched) {
				return this.simple.appendString(this.data);
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
			this.simple.addChild(this.data as Simple);
		}
	}
}