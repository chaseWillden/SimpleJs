import Options from './DataObjects/Options'
import Types from './Utils/Types'
import Logging from './Utils/Logging'
import SimpleElement from './Dom/SimpleElement'
import Render from './Render/Render'

const _cache: {[s: string] : Simple} = {};
let totalObjects = 0;

export default class Simple {

	el: SimpleElement = null;
	options: Options;
	children: string | Array<any> | {[s:any]:any};
	isRendered = false;
	renderedResults : SimpleElement;

	private key: string;
	private renderer: Render;

	constructor(options: Options){
		this.options = options || {} as Options;
		this.setRoot();
		this.setType();
		this.setKey();
		this.renderer = new Render(this);

		_cache[this.key] = this;

		this.renderer.init();
		this.isRendered = true;
	}

	/**
	 * Render the simple object
	 */
	render(): SimpleElement{
		if (this.isRendered) {
			return this.renderedResults || this.el;
		}

		this.renderedResults = this.renderer.constructTree();
		return this.renderedResults;
	}

	/**
	 * Shortcut method
	 */
	getData(){
		return this.options.data;
	}

	/**
	 * Override tostring
	 */
	toString(){
		return this.key;
	}

	private setKey(){
		this.key = '__SIMPLE__::' + totalObjects++;
	}

	/**
	 * Set type by node name
	 */
	private setType(){
		const type = this.options.type;
		if (Types.IsString(type)){
			this.el = SimpleElement.Create(type);
		}
	}

	/**
	 * Set the root element
	 */
	private setRoot(){
		const root = this.options.root;
		if (Types.IsString(root)) {
			this.el = SimpleElement.FromTag(root as string);
		}
		else if (Types.IsHtmlElement(root)) {
			this.el = new SimpleElement(root as HTMLElement);
		}
	}

	/**
	 * Really an exposed private method for debugging
	 */
	static __getCache(){
		return _cache;
	}

	/**
	 * Get simple from cache
	 * @param {string} name [description]
	 */
	static __getFromCache(name: string) {
		return _cache[name];
	}
}