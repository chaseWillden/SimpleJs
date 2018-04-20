import Options from './options'

export default interface Simple {
	options: Options;
	__key: string;
	__listeners: Simple[];
	__listenerLookup: {[s: string] : Simple};
	__marked: boolean;
	__rendered: boolean;
	__isSimple: boolean;
	__renderChild: Function;
	__children: Simple[];
}