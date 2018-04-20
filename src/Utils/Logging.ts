export default class Logging {
	
	/**
	 * Send a warning log message
	 * @param {string} msg [description]
	 */
	static Warn(msg: string){
		console.warn(msg);
	}

	/**
	 * Throw an error
	 * @param {string} msg [description]
	 */
	static Error(msg: string){
		throw new Error(msg);
	}
}