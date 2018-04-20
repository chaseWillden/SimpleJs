import { __init__ } from './init.ts'
import { __initProps__ } from './props.ts';
import { __initRender__ } from '../render'
import { __initChildren__ } from '../render/children'

function Simple(options){
	if (process.env.NODE_ENV !== 'production' && !(this instanceof Simple)){
		console.warn('Simple must be used with the new keyword');
	}

	this.__init__(options);
	this.__render__();
}

__init__(Simple);
__initProps__(Simple);
__initRender__(Simple);
__initChildren__(Simple);

// Static variables
Simple.__cache__ = {};

export default Simple;