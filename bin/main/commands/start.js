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
import { BigIntegerTypes, FloatingPointTypes, SmallIntegerTypes, String, anArray } from '../utils/startUtils.js';

const ENCODER = new TextEncoder();

const stringToCharCodes = (str) => {
	return Array.from(str).map(character => character.charCodeAt(0));
  }

const checkInputs = async (procedureName, moduleName, representation, parameters, memory, state) => {
	const inputs = [];
	console.log(parameters);
	// console.log(representation);
	const procedureFound = await representation.code?.find(
		(procedure) => procedure.name === procedureName && procedure.path === moduleName
	);
	if (!procedureFound) {
		throw new Error(`Procedure ${procedureName} not found.`);
	}

	const { outputs } = procedureFound.description;
	if(outputs.length !== parameters.length){
		throw new Error(`Mismatching number of arguments passed to ${procedureName} during call. Expected ${outputs.length} arguments but got ${parameters.length}.`);
	}

	for (let index = 0; index < outputs.length; index++) {
		const element = outputs[index];
		if(SmallIntegerTypes.includes(element.data.name)){
			if(!/^-?\d+$/.test(parameters[index])){
				throw new Error(`Mismatching type of arguments passed to ${procedureName} during call. Expected ${element.data.name} but got ${typeof parameters[index]}.`);
			}
			inputs.push(parseInt(parameters[index])) 
		}
		else if(BigIntegerTypes.includes(element.data.name)){
			inputs.push(BigInt(parameters[index]))
		}
		else if(FloatingPointTypes.includes(element.data.name)){
			if(!/^[-+]?(\d*\.\d+|\d+\.\d*)([eE][-+]?\d+)?$/.test(parameters[index])){
				throw new Error(`Mismatching type of arguments passed to ${procedureName} during call. Expected ${element.data.name} but got ${typeof parameters[index]}.`);
			}
			inputs.push(parseFloat(parameters[index]))
		}
		else if(String ===  element.data.name){

			const encodedString = stringToCharCodes(parameters[index]);
			const memoryNumbers = new Int32Array(memory.buffer);

			const start = state.alloc(parameters[index].length*4);
			memoryNumbers.splice(start/4, encodedString.length, ...encodedString);

			inputs.push(start,encodedString.length);
		}
		else if(anArray ===  element.data.name){

			const encodedString = stringToCharCodes(parameters[index]);
			const memoryNumbers = new Int32Array(memory.buffer);

			const start = state.alloc(parameters[index].length*4);
			memoryNumbers.splice(start/4, encodedString.length, ...encodedString);
			
			inputs.push(start,encodedString.length);
		}
	}

	return inputs;
};

const execute = async (glue, module, moduleName, procedureName, representation, paramaters) => {
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

		const inputs = await checkInputs(procedureName, moduleName, representation, paramaters, memory, state);
		const moduleCompiled = await WebAssembly.compile(module);
		const moduleInstance = await WebAssembly.instantiate(moduleCompiled, descriptionImports);

		const procedure = moduleInstance.exports[key];
		if (procedure) {
			procedure(...inputs);
		}
	} else {
		throw new Error(`Procedure '${procedureName}' not found.`);
	}
};

export const start = async (path, procedure, params) => {
	try {
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
			console.log(chalk.greenBright('Code parsing successful...'));
			console.log(chalk.green('Onwards to compiling...'));

			const [glue, module] = Compiler.compile(representation, compilerOptions);

			console.log(chalk.greenBright('Code compilation successful...'));
			console.log(chalk.green('Onwards to running...\n'));
			await execute(glue, module, moduleName, procedure, representation, params.args);
		} else {
			failures.forEach((failure) => {
				console.log('\n');
				console.log(chalk.redBright('Error: ' + failure.message.split('\n').join(' ')));
				const { message, ..._ } = failure;
				console.log(_);
			});
		}
	} catch (e) {
		console.log(chalk.red('Error Occurred: ', e.message));
	}
};
