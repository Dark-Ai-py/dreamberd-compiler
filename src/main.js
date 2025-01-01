const fs = require("fs");
const { Lexer } = require("./lexer");
const { Parser } = require("./Parser");
const { Evaluator } = require("./Evaluator");

//run the main code

function readFile(path) {
	try {
		let res = fs.readFileSync(path, { encoding: "utf8" });
		res = res.replaceAll("\r", "").split("\n");

		return res.filter((item) => item !== "");
	} catch (error) {
		console.error(`File fetch Error: ${error}`);
	}
}

function cleanUpFormating(content) {
	return content;
}

function parseLine(input) {
	try {
		if (!input) throw new Error("Input is required");

		let lexer = new Lexer(input);
		let tokens = lexer.tokenize();

		if (!tokens || tokens.length === 0) throw new Error("Tokenization failed");

		let parser = new Parser(tokens);
		let fullAst = parser.parse();

		if (!fullAst || fullAst.length !== 2) throw new Error("Parsing failed");

		let evaluator = new Evaluator();
		let output = evaluator.evaluate(fullAst[0], fullAst[1]);

		if (output === undefined) throw new Error("Evaluation failed");

		return output;
	} catch (error) {
		console.error(`Main Error: ${error.message}`);
		return null;
	}
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
			console.error(`Error writing to file: ${err}`);
		}
	});
}

async function main() {
	while (true) {
		const file = readFile("helloWorld.dream");
		const sortedFile = cleanUpFormating(file);
		writeBuild(sortedFile);
		break;
	}
}
main();
