const { resolve } = require("path");
const readline = require("readline");
const { Lexer } = require("./lexer");
const { Parser } = require("./Parser");

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

async function main() {
	let showTokens = false;

	while (true) {
		const input = await getStdin();
		if (input === "#quit") {
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
		}

		let lexer = new Lexer(input);
		let tokens = lexer.tokenize();
		let parser = new Parser(tokens);
		let ast = parser.parse();
		console.log(ast);

		if (showTokens == true) {
			console.log(tokens);
		}
	}
}
main();
