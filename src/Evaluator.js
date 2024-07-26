const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
} = require("./expressionTypes");

class Evaluator {
	#ast;
	#operations;
	constructor(ast) {
		this.#ast = ast;
		this.#operations = {
			"+": (a, b) => a + b,
			"-": (a, b) => a - b,
			"*": (a, b) => a * b,
			"/": (a, b) => a / b,
		};
	}

	evaluate(ast) {
		if (ast instanceof ParenthesisedExpression) {
			ast = ast.expression;
		}

		if (ast instanceof BinaryExpression) {
			const a = this.evaluate(ast.a);
			const b = this.evaluate(ast.b);
			const operator = ast.operatorToken.tokenValue;
			if (this.#operations[operator]) {
				return this.#operations[operator](a, b).toPrecision(4); //cap the decimal place to thousandths
			} else {
				console.log(`Evaluator Error: Unsupported operator: ${operator}`);
			}
		} else if (ast.tokenType === "number") {
			return parseFloat(ast.tokenValue);
		} else {
			console.log(`Evaluator Error: Unsupported Syntax Node: ${ast.tokenType}`);
		}
	}
}
exports.Evaluator = Evaluator;
