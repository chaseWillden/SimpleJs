import Options from './options'

export function __initProps__(Simple: any) {
	Simple.prototype.el = null;
	Simple.prototype.options = null;
	Simple.prototype.__key = null;
	Simple.prototype.__listeners = [];
	Simple.prototype.__listenerLookup = {};
	Simple.prototype.__marked = true;
	Simple.prototype.__rendered = false;
	Simple.prototype.__isSimple = true;
	Simple.prototype.__children = [];
}