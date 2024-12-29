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

function sortByImportance(lines) {
	return lines
		.map((line) => ({
			original: line,
			Importance: line.match(/[\!]+$|[?]+$/)?.[0]?.length || 0,
		}))
		.sort((a, b) => b.Importance - a.Importance)
		.map((obj) => obj.original);
}

function parseLine(input) {
	let lexer = new Lexer(input);
	let tokens = lexer.tokenize();

	let parser = new Parser(tokens);
	let fullAst = parser.parse();

	let evaluator = new Evaluator();
	let output = evaluator.evaluate(fullAst[0], fullAst[1]);

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
		}
	});
}

async function main() {
	while (true) {
		const file = readFile("helloWorld.dream");
		const sortedFile = sortByImportance(file);
		writeBuild(sortedFile);
		break;
	}
}
main();
