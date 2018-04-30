import SimpleElement from "../Dom/SimpleElement";
import Simple from "../Simple";

export default interface Options {
	type?: string;
	root?: string | SimpleElement | HTMLElement | Simple;
	data?: any;
}