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
	children: Array<Simple> = [];
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
  
  setValue(val: number) {
    if (!this.el) {
      throw new Error('Issues');
    }
    else {
      this.el.setValue(val);
    }
  }

	appendNumber(val: number){
		if (this.el) {
			this.el.appendString(val);
		}
		else {
			this.el = SimpleElement.Create('number');
			this.appendString(val);
		}
	}

	/**
	 * Append a string
	 * @param val 
	 */
	appendString(val: string | number){
		if (this.el) {
			this.el.appendString(val);
		}
		else {
			this.el = SimpleElement.Create('text');
			this.appendString(val);
		}
	}

	/**
	 * Add children
	 * @param simples 
	 */
	addChildren(simples: Simple[]){
		this.children = this.children.concat(simples);
		for (let i = 0; i < simples.length; i++){
			this.el.appendChild(simples[i].el);
		}
	}

	/**
	 * Add child to tree
	 * @param simple 
	 */
	addChild(simple: Simple){
		if (this.el && simple.el) {
      this.children.push(simple);
		  this.el.appendChild(simple.el);
    }
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

	/** 
	 * Set generated key
	 */
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
			
			if (this.options.data) {
				this.el.setValue(this.options.data);
			}
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
    else if (Types.IsSimpleElement(root)){
      this.el = root as SimpleElement;
    }
    else if (Types.IsSimple(root)) {
      const sim = root as Simple;
      this.el = sim.el;
      sim.children.push(this);
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