import Types from '../Utils/Types'
import Logging from '../Utils/Logging'

export default class SimpleElement {

	ele: HTMLElement;
	children: SimpleElement[] = [];

	constructor(options: SimpleElement | HTMLElement){
		if (options instanceof SimpleElement) {
			this.ele = options.ele;
		}
		else if (Types.IsHtmlElement(options)) {
			this.ele = options;
		}
		else {
			Logging.Error('Unexpected type');
		}
	}

	/**
	 * Get value if an input
	 */
	getValue(){
		if (this.ele instanceof HTMLInputElement){
			return this.ele.value;
		}
		return '';
	}

	/**
	 * Append string as text
	 * @param {string} val [description]
	 */
	appendString(val: string) {
		this.ele.innerText += val;
	}

	/**
	 * Append a child to the DOM
	 * @param {SimpleElement} child [description]
	 */
	appendChild(child: SimpleElement | SimpleElement[]) {
		if (Types.IsArray(child)) {
			for (let i = 0; i < (child as SimpleElement[]).length; i++){
				this.ele.appendChild(child[i].ele);
				this.children.push((child[i] as SimpleElement));
			}
		}
		else if (Types.IsHtmlElement((child as SimpleElement).ele)) {
			this.ele.appendChild((child as SimpleElement).ele)
			this.children.push((child as SimpleElement));
		}
	}

	/**
	 * Create a new SimpleElement from a tag
	 * @param {string} name [description]
	 */
	static FromTag(name: string): SimpleElement {
		if (Types.IsString(name)) {
			const eles = document.querySelectorAll(name as string);

			if (eles.length > 1) {
				Logging.Warn('Found multiple elements with the tag "' + name + '", using the first');
			}

			return new SimpleElement(eles[0] as HTMLElement);
		}
		else {
			Logging.Error('Expected a tag name');
		}
	}

	/**
	 * Create new simple element from tag name
	 * @param  {string}        tagName [description]
	 * @return {SimpleElement}         [description]
	 */
	static Create(tagName: string): SimpleElement {
		const ele = document.createElement(tagName);
		return new SimpleElement(ele);
	}
}