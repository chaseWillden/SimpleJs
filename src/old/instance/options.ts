import Simple from './simple'

export default interface Options extends Object {
	root: string | HTMLElement;
	data: string;
	type: string;
	shared: any;
	parent: Simple;
}