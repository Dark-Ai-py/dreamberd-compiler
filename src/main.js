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
	console.log(tokens);

	let parser = new Parser(tokens);
	let ast = parser.parse()[0];
	let extra = parser.parse()[1];
	console.log(ast);

	let evaluator = new Evaluator();
	let output = evaluator.evaluate(ast, extra);

	return output;
}
function writeBuild(content) {
	var fullOutput = ['const { Variable } = require("./jsBuildHelpers.js");'];
	for (let i = 0; i < content.length; i++) {
		let parsedOutput = parseLine(content[i]);
		fullOutput.push(parsedOutput);
	}
	var completeBuild = "";
	fullOutput.forEach((e) => {
		completeBuild = completeBuild + e + "\n";
	});

	const filePath = "./build.js";
	fs.writeFile(filePath, completeBuild, (err) => {
		if (err) {
			console.error("Error writing to file:", err);
		} else {
			console.log("File written successfully!");
		}
	});
}

async function main() {
	let showTokens = false;

	while (true) {
		//const input = await getStdin();
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
		writeBuild(file);
		break;
	}
}
main();
