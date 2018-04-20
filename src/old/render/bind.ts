import { getValue } from '../dom/element'

export function __bindWithShared__(simple: any, Simple: any){
	if (!(simple instanceof Simple)) {
		throw new Error('Unable to bind with ' + simple);
	}

	const initValue = getValue(simple.el);
	simple.shared = initValue;
	
	if (simple.el instanceof HTMLInputElement) {
		const el : HTMLInputElement = simple.el;
		el.addEventListener('keydown', function(e: Event){
			simple.shared = el.value;
			simple.__rerenderListeners__();
		})
	}
}