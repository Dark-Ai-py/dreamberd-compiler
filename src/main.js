const fs = require("fs");
const readline = require("readline");
const { Lexer } = require("./lexer");
const { Parser } = require("./Parser");
const { Evaluator } = require("./Evaluator");

//make the terminal interface
async function getStdin() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question("> ", (input) => {
			rl.close();
			resolve(input);
		});
	});
}

//run the main code

function readFile(path) {
	try {
		const res = fs.readFileSync(path, { encoding: "utf8" });
		return res.replace("\r", "").split("\n");
	} catch (error) {
		console.log(`File fetch Error: ${error}`);
	}
}

function parseLine(input, variables) {
	let lexer = new Lexer();
	let tokens = lexer.tokenize(input);

	let parser = new Parser(tokens);
	let ast = parser.parse();

	let evaluator = new Evaluator(variables);
	let output = evaluator.evaluate(ast);
	let variable = evaluator.variables;

	return [output, variable];
}

async function main() {
	let showTokens = false;

	while (true) {
		const input = await getStdin();
		//commands when using the terminal
		/* if (input === "#quit") {
			console.log("Exiting");
			break;
		} else if (input === "#clear") {
			console.clear();
			process.stdout.write("> ");
			continue;
		} else if (input === "#tokens") {
			showTokens = !showTokens;
			console.log(showTokens ? "Showing tokens" : "Hiding tokens");
			continue;
		} */
		const file = readFile("helloWorld.dream");
		let variables = [];
		for (let i = 0; i < file.length; i++) {
			let parsedOutput = parseLine(file[i], variables);
			console.log(parsedOutput[0]);
			variables.push(parsedOutput[1]);
		}

		break;
	}
}
main();
