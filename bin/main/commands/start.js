import chalk from 'chalk';
import {
	Parser,
	Tokenizer,
	Compiler,
	MemoryManager,
	Draw,
	SIMPLE_IMPORTS
} from '@munezero/floparser';

import * as fs from 'fs';

const ENCODER = new TextEncoder();

const execute = async (glue, module, moduleName, procedureName) => {
	let key;
	for (const [iKey, value] of Object.entries(glue.procedures)) {
		const { name, path } = value;
		if (name === procedureName && path === moduleName) {
			key = iKey;
			break;
		}
	}
	if (key) {
		const memory = new WebAssembly.Memory({
			initial: 128
		});

		const state = MemoryManager(memory);

		const drawer = Draw(memory);

		const descriptionImports = Object.freeze({
			imports: {
				memory: memory,
				alloc: state.alloc,
				dealloc: state.dealloc,
				merge: state.merge,
				save: state.save,
				undo: state.undo,
				undoPenultimate: state.undoPenultimate,
				draw: drawer.receiveParams
			}
		});

		const moduleCompiled = await WebAssembly.compile(module);
		const moduleInstance = await WebAssembly.instantiate(moduleCompiled, descriptionImports);

		const procedure = moduleInstance.exports[key];
		if (procedure) {
			procedure();
		}
	}
};

export const start = async (path, procedure) => {
	try{
	const filePath = `${process.cwd()}/${path}`;
	let content = fs.readFileSync(filePath, 'utf8');

	const pathArraySize = path.split('/').length;
	const moduleFullName = path.split('/')[pathArraySize - 1];

	let regex = /\.flo$/;
	const moduleName = moduleFullName.replace(regex, '');

	const failures = [];
	let representation = null;

	const tokenizer = new Tokenizer();

	const parser = Parser.create({
		path: moduleName,
		imports: SIMPLE_IMPORTS
	});

	parser.on(Parser.EVENT_FAIL, (failure) => {
		failures.push(failure);
		representation = null;
	});

	parser.on(Parser.EVENT_DONE, (data) => {
		representation = data;
	});

	tokenizer.on('token', (position, array, index, length) => {
		parser.feed(position, array, index, length);
	});

	tokenizer.feed(ENCODER.encode(content));

	tokenizer.done();

	parser.done();

	if (representation) {
		const compilerOptions = Object.freeze({
			memory: true,
			draws: true
		});
		console.log(chalk.greenBright("Code parsing successful..."))
		console.log(chalk.green("Onwards to compiling..."))

		const [glue, module] = Compiler.compile(representation, compilerOptions);

		console.log(chalk.greenBright("Code compilation successful..."))
		console.log(chalk.green("Onwards to running...\n"))
		await execute(glue, module, moduleName, procedure);
	} else {

		failures.forEach(failure => {
			console.log("\n")
			console.log(chalk.redBright("Error: "+failure.message.split('\n').join(' ')))
			const {message, ..._} = failure;
			console.log(_)
		});

	}
}
catch(e){
	console.log(chalk.red("Error Occurred: ", e.message))
}
};
