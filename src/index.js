import Simple from './Simple';

const input = new Simple({
	// type: 'input',
	data: 1
});

new Simple({
	root: 'root',
	// data: input,
	// data: 'This is a test ' + input
	// data: [
	// 	'This is a test',
	// 	'And another one',
	// 	'And another one'
	// ]
	data: {
		1: [
			'This is a test',
			'And another one',
			'And another one ' + input,
			'And yet another one ' + input
		],
		2: input
	}
	// data: {
	// 	1: [
	// 		'This is a test',
	// 		'This is another test',
	// 		'And another one ' + input
	// 	],
	// 	2: input
	// }
})

console.log(Simple.__getCache());
