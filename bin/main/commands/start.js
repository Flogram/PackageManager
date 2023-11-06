import * as chalk from 'chalk';
import {
	Parser,
	Tokenizer,
	Compiler,
	MemoryManager,
	Draw,
	SIMPLE_IMPORTS
} from '@munezero/floparser';

import * as fs from 'fs';

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
		failures = failures.push(failure);
		representation = null;
	});

	parser.on(Parser.EVENT_DONE, (data) => {
		representation = data;
	});

	tokenizer.on('token', (position, array, index, length) => {
		parser.feed(position, array, index, length);
	});

	tokenizer.feed(ENCODER.encode(value));

	tokenizer.done();

	parser.done();

	if (representation) {
		const compilerOptions = Object.freeze({
			memory: true,
			draws: true
		});

		const [glue, module] = Compiler.compile(representation, compilerOptions);
		await execute(glue, module, moduleName, procedure);
	} else {
		console.log(failures);
	}
};
