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
		let res = fs.readFileSync(path, { encoding: "utf8" });
		res = res.replaceAll("\r", "").split("\n");

		return res.filter((item) => item !== "");
	} catch (error) {
		console.log(`File fetch Error: ${error}`);
	}
}

function parseLine(input) {
	let lexer = new Lexer(input);
	let tokens = lexer.tokenize();

	let parser = new Parser(tokens);
	let ast = parser.parse();

	let evaluator = new Evaluator();
	let output = evaluator.evaluate(ast);

	return [output];
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
		console.log(file);

		for (let i = 0; i < file.length; i++) {
			let parsedOutput = parseLine(file[i]);
			console.log(parsedOutput[0]);
		}

		break;
	}
}
main();
